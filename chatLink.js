/*
 * File version : 1.22.0.2
 */
function OBJNAME(n) { '';return n; }

function chatLink(convId, sesId)
{
	this.conversationId = convId;
    this.sessionId = sesId;

    var myself = this;
    var testObject = null;
    var newRequest = null;
    var sendQueue = new Array();
    var timerId;
    var serviceLocation = '';
    var link;
    var lastHistory = 0;
    var checkTimer = 0;
    var loopTimer = 0;
    var transmitBody = '';
    var lastTransmit = 0;
    var isConnected = true;
    
    debugElement = null;
    
    serviceLocation = window.location.href;
    
    if(serviceLocation.indexOf('?')>0)
        serviceLocation = serviceLocation.substring(0, serviceLocation.indexOf('?') - 1);
    
    if(serviceLocation[serviceLocation.length - 1] == '/')
        serviceLocation = serviceLocation.substring(0, serviceLocation.length - 1);

	if(convId != null && convId != 'undefined')
	{
    	serviceLocation = serviceLocation + '?conversationId=' + convId;
    }
    
	if(sesId != null && sesId != 'undefined')
	{
		if(serviceLocation.indexOf('//')>0)
		{
			serviceLocation = serviceLocation.substring(0, serviceLocation.indexOf('/',serviceLocation.indexOf('//') + 2) + 1) + '~' + sesId + serviceLocation.substring(serviceLocation.indexOf('/',serviceLocation.indexOf('//') + 2) ,serviceLocation.indexOf('?')) + '?conversationId=' + convId;
		}
	}

    if((window.XMLHttpRequest) && (testObject = (new XMLHttpRequest())))
    { 
        newRequest = function() { return new XMLHttpRequest(); };
    }
    else if(window.ActiveXObject)
    { 
        var testNames = ['Msxml2.ServerXMLHTTP', 'Microsoft.ServerXMLHTTP', 'Msxml2.XMLHTTP.6.0', 'Msxml2.XMLHTTP.5.0', 'Msxml2.XMLHTTP.4.0', 'Msxml2.XMLHTTP.3.0', 'Msxml2.XMLHTTP', 'Microsoft.XMLHTTP']; 

        for(var i = 0; i < testNames.length; i++)
        {
            try
            {
                if((testObject = new ActiveXObject(testNames[i])))
                {
                    newRequest = new Function('return new ActiveXObject("' + testNames[i] + '");');
                    break;
                }
            }
            catch(e)
            {
                ;
            }
        }
        
        testNames = null;
    }

    if(testObject)
    { 
        testObject = null;
    } 
    else
    {
        newRequest = function() { return null; };
    }

    this.chatEventType =
	{
	    Enter: 0,
	    Leave: 1,
	    Say: 2,
	    Whisper: 3,
	    Activate: 4,
	    Wait: 5
	};
    
    this.setDebugElement = function(element) { debugElement = element; }
    
    
    this.begin = function (nickname)
    {
	    var request = newRequest();
		request.open('GET', serviceLocation + "?action=begin&responsetype=2&redirect=false&nickname=" + nickname, false);
		request.send();
		var response = request.responseText;
		var list = response.split("\n");
		this.conversationId = list[0];
		this.sessionId = list[1];
		serviceLocation = list[3] + '/?conversationId=' + this.conversationId ;
		
		sendQueue.push({ action: 'reset', body: '' });
    	window.setTimeout(loop, 1000);
    }
    
    function outputDebug(text)
    {
        if(debugElement) { try { debugElement.innerHTML = debugElement.innerHTML + text; debugElement.scrollTop = debugElement.scrollHeight;} catch(e) {;}}
    }
    
    function outputDebugLine(text)
    {
        if(debugElement) { try { debugElement.innerHTML = debugElement.innerHTML + text + '<br />'; debugElement.scrollTop = debugElement.scrollHeight;} catch(e) {;}}
    }
    
    function checkLink()
    {
        if(!link)
        {
            link = newRequest();
            link.onreadystatechange = eventStateChanged;
            
            outputDebugLine('Physical link object created');
        }
    }
    
    function doTransmit()
    {
        try
        {
            link.open('POST', serviceLocation + '&action=do&history=' + lastHistory.toString() + '&fmt=uri', true);
            link.send(transmitBody);

            outputDebugLine('Physical link request sent');
            
            return true;
        }
        catch(e)
        {
            try
            {
                link.abort();
            }
            catch(e2)
            {
                ;
            }

            link = null;
        }
        
        return false;
    }

    function flushSend()
    {
        if(sendQueue.length > 0)
        {
            while(sendQueue.length > 0)
            {
                var nextItem = sendQueue.shift();
                
                transmitBody = transmitBody + escape(nextItem.action + ':' + lastTransmit.toString() + ':' + nextItem.body) + '\n';
            }
        }
    }
    
    function processBodyLine(line)
    {
        var sep = line.indexOf(':');
        
        if(sep > 0)
        {
            var lineType = line.substr(0, sep).toLowerCase();
            var Parts = line.substr(++sep).split('&');
        
            for(var i = 0; i < Parts.length; i++)
                Parts[i] = unescape(Parts[i]);
            
            if(lineType == 'activate')
            {
                try
                {
                    myself.activateEvent.Invoke();
                }
                catch(e)
                {
                    outputDebugLine(e.message);
                }
            }
            if(lineType == 'wait')
            {
                try
                {
                    myself.waitEvent.Invoke(Parts[4]);
                }
                catch(e)
                {
                    outputDebugLine(e.message);
                }
            }
            if(lineType == 'history')
            {
                var index = parseInt(Parts[0]);
                
                if(index > lastHistory)
                {
                    lastHistory = index;

                    var intPart1 = 2;

                    try 
                    {
                        intPart1 = parseInt(Parts[1], 10);
                    }
                    catch (e)
                    { ; }

                    var flags = intPart1 >> 8;

                    var historyInfo = 
                    {
                        historyType : (intPart1 & 0x0f),
                        historyFlags : flags,
                        from : Parts[2],
                        to : Parts[3],
                        text : Parts[4],
                        fromMySelf : ((flags & 1) != 0),
                        fromAgent : ((flags & 2) != 0),
                        toMySelfOnly : ((flags & 4) != 0),
                        toAgentOnly : ((flags & 8) != 0)
                    }

                    var ownerDiv = document.getElementById('chatHistory');
                    
                    try
                    {
                        myself.historyLineEvent.Invoke(historyInfo);
                    }
                    catch(e)
                    {
                        outputDebugLine(e.message);
                    }
                    
                    if(historyInfo.historyType == 1)
                    {
				        try
				        {
				        	if(isConnected)
				        	{
				          		myself.disconnectEvent.Invoke();
				          		isConnected = false;
				           	}
				        }
				        catch(e)
				        {
				            outputDebugLine(e.message);
				        }
                    }
                }
            }
        }
    }
    
    function eventStateChanged()
    {
        checkLink();
        
        outputDebugLine('Physical link state changed to ' + link.readyState.toString());
        
        if(link.readyState == 4)
        {
            if(checkTimer != 0)
            {
                window.clearTimeout(checkTimer);
                checkTimer = 0;
            }

            if(transmitBody != '')
            {
                transmitBody = '';
                lastTransmit++;
            }

            try
            {
                outputDebugLine('Got response: -------------------------------------------');
                outputDebugLine(link.responseText);
                outputDebugLine('---------------------------------------------------------');

                if(link.status == 200)
                {
                    var Lines = link.responseText.split('\n');
                    
                    for(var i = 0; i < Lines.length; i++)
                    {
                        var Line = Lines[i].replace('\r', '');
                        
                        processBodyLine(Line);
                    }
                }
            }
            catch(e)
            {
                ;
            }
            
            try
            {
                link.abort();
                link = null;
            }
            catch(e)
            {
                ;
            }

            loopTimer = window.setTimeout(loop, myself.pollInterval);
        }
    }
    
    function loop()
    {
        loopTimer = 0;

        if(checkTimer != 0)
        {
            window.clearTimeout(checkTimer);
            checkTimer = 0;
        }
        
        flushSend();

        checkLink();

        if(doTransmit())
        {
            checkTimer = window.setTimeout(loopTimeout, myself.pollInterval + 5000);
        }
        else
        {
            window.setTimeout(loop, myself.pollInterval);
        }
    }
    
    function loopTimeout()
    {
        checkTimer = 0;
        
        try
        {
            link.abort();
        }
        catch(e)
        {
            ;
        }
        
        link = null;
        
        window.setTimeout(loop, 1000);
    }
    
    function flush()
    {
        if(loopTimer != 0)
        {
            window.clearTimeout(loopTimer);
        }
        
        loop();
    }
    
    this.send = function(text) 
    {
        sendQueue.push({ action: 'say', body: text });
        flush();
    }
    
    this.disconnect = function() 
    {
        sendQueue.push({ action: 'disconnect', body: '' });
        flush();
        try
        {
        	if(isConnected)
        	{
          		myself.disconnectEvent.Invoke();
          		isConnected = false;
           	}
        }
        catch(e)
        {
            outputDebugLine(e.message);
        }
    }
    
    this.pollInterval = 3000;
    
    this.historyLineEvent = new MulticastDelegate();
    this.activateEvent = new MulticastDelegate();
    this.waitEvent = new MulticastDelegate();
    this.disconnectEvent = new MulticastDelegate();
    
    if(convId != null && convId != 'undefined')
    {
    	sendQueue.push({ action: 'reset', body: '' });
    	window.setTimeout(loop, 1000);
    }
}


function MulticastDelegate()
{
    var members = new Array();
    
    this.Add = function()
                    {
                        var target, method;
                        
                        if(arguments.length == 1)
                        {
                            target = null;
                            method = arguments[0];
                            
                            for(var i = 0; i < members.length; i++)
                            {
                                if(members[i].target == null && members[i].method == method)
                                {
                                    return;
                                }
                            }
                            
                            
                        }
                        else
                        {
                            target = arguments[0];
                            method = arguments[1];
                            
                            for(var i = 0; i < members.length; i++)
                            {
                                if(members[i].target == target && members[i].method == method)
                                {
                                    return;
                                }
                            }
                        }
                        
                        members.push({'target':target, 'method':method});
                    };

    this.Remove = function(target, method)
                    {
                        for(var i = 0; i < members.length; i++)
                        {
                            if(members[i].target == target && (arguments.length < 2 || members[i].method == method))
                            {
                                var old = members.splice(i, 1);
                                
                                old[0].target = null;
                                old[0].method = null;
                                
                                break;
                            }
                        }
                    };

    this.Clear = function()
                    {
                        for(var i = 0; i < members.length; i++)
                        {
                            members[i].target = null;
                            members[i].method = null;
                        }
                        
                        members = new Array();
                    };
                    
    this.Invoke = function()
                    {
                        for(var i = 0; i < members.length; i++)
                        {
                            try
                            {
                                members[i].method.apply(members[i].target, arguments);
                            }
                            catch(e)
                            {
                                ;
                            }
                        }
                    };
}
