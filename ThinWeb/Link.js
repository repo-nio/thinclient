/*
 *File version : 1.22.0.1 
 */
function OBJNAME(n) { '';return n; }
function NixxisCreateConnection(owner)
{
    var testObject = null;
    
    if((window.XMLHttpRequest) && (testObject = (new XMLHttpRequest())))
    { 
        owner.connection.newRequest = function() { return new XMLHttpRequest(); };
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
                    owner.connection.newRequest = new Function('return new ActiveXObject("' + testNames[i] + '");');
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
        owner.connection.newRequest = function() { return null; };
    }

    owner.connection.links = [null, null, null];
    owner.connection.eventLink = 0;
    owner.connection.eventSequence = 0;
    owner.connection.eventRepeat = 0;
    owner.connection.eventTimer = null;
    owner.connection.pollTimer = null;

    owner.connection.close = function() 
                                {
                                    this.stopEvents();
                                }

    owner.connection.open = function() 
                                {
                                    var response;
                                    
                                    this.stopEvents();
                                    response = this.executeCommand('~connect');
                                    this.pollTimer = window.setTimeout('__activeClientLinks["' + this.connectionId + '"].connection.' + OBJNAME('pollEvents') + '()', 100, 'javascript');
                                    
                                    return response;
                                }

    owner.connection.executeCommand = function(commandCode, parameters) 
                                {
                                    var data = '', response = null;
                                    
                                    for(var i = 1; i < arguments.length; i++)
                                    {
                                        if(arguments[i] != null && arguments[i] != 'undefined')
                                            data += escape(arguments[i].toString()) + '\n';
                                    }
/*
                                    if(this.eventTimer)
                          	          {
                                        window.clearTimeout(this.eventTimer);
                                        this.eventTimer = null;
                                    }

                                    if(this.pollTimer)
                                    {
                                        window.clearTimeout(this.pollTimer);
                                        this.pollTimer = null;
                                    }
*/
                                    if(!this.links[2])
                                    {
                                        this.links[2] = this.newRequest();
                                    }
                                    
                                    for(var retry = 0; retry < 3; retry++)
                                    {
                                        if(this.clientLink.debugDiv && this.clientLink.debugDiv.crLinkEvents)
                                                this.clientLink.debugDiv.innerHTML = this.clientLink.debugDiv.innerHTML + '&nbsp; Exec(' + commandCode.toString()+'),'+retry.toString();

                                        try
                                        {
                                            this.links[2].open('POST', this.baseLocation + '?fmt=uri&action=' + commandCode.toString(), false);
                                            this.links[2].send(data);
                                            
                                            response = this.links[2].responseText;
                                            break;
                                        }
                                        catch(e)
                                        {
                                            try
                                            {
                                                this.links[2].abort();
                                            }
                                            catch(e2)
                                            {
                                                ;
                                            }
                                        }
                                    }

                                    if(response && response.length > 0)
                                    {
                                        if(this.clientLink.debugDiv && this.clientLink.debugDiv.crLinkEvents)
                                            this.clientLink.debugDiv.innerHTML = this.clientLink.debugDiv.innerHTML + '<br>' + response;
                                            
                                        var lst = response.split('\r\n');

                                        for(var i = 0; i < lst.length; i++)
                                        {
                                            var pos = lst[i].indexOf('=');
                                            
											if (this.clientLink.debugDiv && this.clientLink.debugDiv.crLinkEvents) 
											{
												this.clientLink.debugDiv.innerHTML = this.clientLink.debugDiv.innerHTML + '&nbsp; <br/> executeCommand.processEvents: I=' + i + ". Lengte: " + lst.length + ". value:" + lst[i];
											}
                                            if(pos > 0)
                                            {
                                                var key = lst[i].substring(0, pos);
                                                var value = lst[i].substring(++pos);
                                                
                                                if(key == 'event')
                                                {
                                                    var vals = value.split('&').slice(1);

                                                    for(var j = 0; j < vals.length; j++)
                                                        vals[j] = unescape(vals[j]);

                                                    this.clientLink.processEvent(vals);
                                                }
                                            }
                                        }
                                    }

                                    return response;
                                };

    owner.connection.pollEvents = function()
                                {
                                    if(this.eventTimer)
                                    {
                                        window.clearTimeout(this.eventTimer);
                                        this.eventTimer = null;
                                    }
                                    if(this.pollTimer)
                                    {
                                        window.clearTimeout(this.pollTimer);
                                        this.pollTimer = null;
                                    }
                                    
                                    try
                                    {
                                        this.links[this.eventLink].abort();
                                    }
                                    catch(e)
                                    {
                                        ;
                                    }
                                    
                                    if(++this.eventLink > 1) 
                                        this.eventLink = 0;

                                    if(this.clientLink.debugDiv && this.clientLink.debugDiv.crLinkEvents)
                                            this.clientLink.debugDiv.innerHTML = this.clientLink.debugDiv.innerHTML + '&nbsp; PEvts';

                                    if(!this.links[this.eventLink])
                                        this.links[this.eventLink] = this.newRequest();
                                        
                                    this.eventTimer = window.setTimeout('__activeClientLinks["' + this.connectionId + '"].connection.' + OBJNAME('restartEvents') + '()', 60000, 'javascript');
                                    
                                    this.links[this.eventLink].onreadystatechange = this.eventStateChanged;
                                    this.links[this.eventLink].open('GET', this.baseLocation + '__events?to=10&seq=' + this.eventSequence.toString() + '&rpt=' + (++this.eventRepeat).toString(), true);
                                    this.links[this.eventLink].send(null);
                                };

    owner.connection.stopEvents = function()
                                {
                                    if(this.eventTimer)
                                    {
                                        window.clearTimeout(this.eventTimer);
                                        this.eventTimer = null;
                                    }
                                    if(this.pollTimer)
                                    {
                                        window.clearTimeout(this.pollTimer);
                                        this.pollTimer = null;
                                    }
                                    
                                    for(var i = 0; i < 2; i++)
                                    {
                                        if(this.links[i])
                                        {
                                            try
                                            {
                                                this.links[this.eventLink].abort();
                                            }
                                            catch(e)
                                            {
                                                ;
                                            }
                                            
                                            this.links[i] = null;
                                        }
                                    }

                                    if(this.clientLink.debugDiv && this.clientLink.debugDiv.crLinkEvents)
                                            this.clientLink.debugDiv.innerHTML = this.clientLink.debugDiv.innerHTML + '&nbsp;SEvts';
                                };

    owner.connection.restartEvents = function()
                                {
                                    this.stopEvents();

                                    if(this.clientLink.debugDiv && this.clientLink.debugDiv.crLinkEvents)
                                            this.clientLink.debugDiv.innerHTML = this.clientLink.debugDiv.innerHTML + '&nbsp;AEvts<br> AbrtPl';

                                    this.pollTimer = window.setTimeout('__activeClientLinks["' + this.connectionId + '"].connection.' + OBJNAME('pollEvents') + '()', 500, 'javascript');
                                };
                                
    owner.connection.eventStateChanged = new Function('__activeClientLinks["' + owner.connection.connectionId + '"].connection.' + OBJNAME('processEvents') + '()');
    
    owner.connection.processEvents = function()
                                {
                                    if(this.pollTimer)
                                    {
                                        window.clearTimeout(this.pollTimer);
                                        this.pollTimer = null;
                                    }
                                    
                                    if(this.links[this.eventLink].readyState == 4)
                                    {
                                        var badContent = true;
                                        
                                        if(this.eventTimer != null)
                                        {
                                            window.clearTimeout(this.eventTimer);
                                            this.eventTimer = null;
                                        }

                                        if(this.clientLink.debugDiv && this.clientLink.debugDiv.crLinkEvents)
                                            this.clientLink.debugDiv.innerHTML = this.clientLink.debugDiv.innerHTML + '&nbsp;Evt ' + this.links[this.eventLink].status.toString();

                                        if(this.links[this.eventLink].status == 0)
                                        {
                                            this.restartEvents();
                                            return;
                                        }

                                        try
                                        {
                                            if(this.links[this.eventLink].status == 200 || this.links[this.eventLink].status == 1223 || this.links[this.eventLink].status == 0)
                                            {
                                                var res = this.links[this.eventLink].responseText;
                                                
                                                badContent = false;
												var itemPro = false; //TOM
                                                if(res.length > 0)
                                                {
                                                    var lst = res.split('\r\n');

                                                    for(var i = 0; i < lst.length; i++)
                                                    {
                                                        var seq = parseInt(lst[i], 10);
                                                        
														if (this.clientLink.debugDiv && this.clientLink.debugDiv.crLinkEvents) 
														{
															this.clientLink.debugDiv.innerHTML = this.clientLink.debugDiv.innerHTML + '&nbsp; <br/> processEvents 1: I=' + i + ". Lengte: " + lst.length + ". value(escaped):" + unescape(lst[i]);
														}
											
                                                        if(seq > this.eventSequence)
                                                        {
                                                            var vals = lst[i].split('&').slice(1);

                                                            for(var j = 0; j < vals.length; j++)
                                                                vals[j] = unescape(vals[j]);

                                                            this.eventSequence = seq;
                                                            this.eventRepeat = 0;
															itemPro = true;//TOM
                                                            this.clientLink.processEvent(vals);
                                                        }
                                                    }
													this.clientLink.processEvent(["99",""])
                                                }
                                            }
                                            else if(this.links[this.eventLink].status == 204 || this.links[this.eventLink].status == 1223)
                                            {
                                                badContent = false;
                                            }
                                        }
                                        catch(e)
                                        {
                                            ;
                                        }

                                        if(badContent)
                                        {
                                            this.pollTimer = window.setTimeout('__activeClientLinks["' + this.connectionId + '"].connection.' + OBJNAME('pollEvents') + '()', 5000, 'javascript');
                                        }
                                        else
                                        {
                                            if(this.clientLink.debugDiv && this.clientLink.debugDiv.crLinkEvents)
                                                    this.clientLink.debugDiv.innerHTML = this.clientLink.debugDiv.innerHTML + '<br> PrcPl';

                                            this.pollTimer = window.setTimeout('__activeClientLinks["' + this.connectionId + '"].connection.' + OBJNAME('pollEvents') + '()', 100, 'javascript');
                                        }
                                    }
                                    else
                                    {
                                        if(this.clientLink.debugDiv && this.clientLink.debugDiv.crLinkEvents)
                                            this.clientLink.debugDiv.innerHTML = this.clientLink.debugDiv.innerHTML + '&nbsp; RS' + this.links[this.eventLink].readyState.toString();                                    
                                    }
                                };
                                
}

function NixxisCreateCommands(owner)
{


    owner.commands = new Object();

    owner.commands.newCommand = function(clientLink, commandCode, executeCode)
                                {

                                    var enabledSrc, disabledSrc;

                                    this.clientLink = clientLink;
                                    this.commandCode = commandCode;
                                    this.authorized = true;
                                    this.active = false;
                                    this.linkedItem = null;
                                    this.stateChanged = new MulticastDelegate();
                                    this.beforeOnClick = new MulticastDelegate();
									
                                    if(arguments.length > 2)
                                    {
                                        this.execute = executeCode;
                                    }
                                    else
                                    {
                                        this.execute = function() 
										{ 
											if(!this.authorized) return null; 
											try
											{
												this.beforeOnClick.Invoke();
											}
											catch(e) {}
											return this.clientLink.connection.executeCommand(this.commandCode); 
										};
                                    }
                                    
                                    this.linkItem = function(newLinkedItem)
                                                    {
                                                        this.linkedItem = newLinkedItem;
                                                        
                                                        this.linkedItem.onclick = new Function('__activeClientLinks["' + this.clientLink.connection.connectionId + '"].commands["' + this.clientLink.codes.commandCodes[this.commandCode] + '"].execute();' );
                                                        this.linkedItem.onmouseover = function() { addElementClass(this, hoverElementClass); };
                                                        this.linkedItem.onmouseout = function() { removeElementClass(this, hoverElementClass); };

                                                        if(this.linkedItem.src)
                                                        {
                                                            disabledSrc = new Image();
                                                            disabledSrc.src = this.linkedItem.src;
                                                            enabledSrc = new Image();
                                                            enabledSrc.src = this.linkedItem.src;
                                                            
                                                            if(this.linkedItem.src.substring(0, disabledElementSourcePrefix.length) == disabledElementSourcePrefix)
                                                            { removeSourcePrefix(enabledSrc, disabledElementSourcePrefix); }
                                                            else
                                                            { addSourcePrefix(disabledSrc, disabledElementSourcePrefix); }
                                                        }
                                                    };

                                    this.setState = function(isAuthorized, isActive, forceUpdate)
                                                    {
                                                        if(isAuthorized != this.authorized || isActive != this.active || (arguments.length > 2 && forceUpdate))
                                                        {
                                                            this.authorized = isAuthorized;
                                                            this.active = isActive;
                                                            
                                                            if(this.linkedItem)
                                                            {
                                                                try
                                                                {
                                                                    if(this.authorized)
                                                                    {
                                                                        //if(this.linkedItem.isDisabled) this.linkedItem.isDisabled = false;
                                                                        //if(this.linkedItem.src) removeSourcePrefix(this.linkedItem, disabledElementSourcePrefix);
                                                                        if(enabledSrc) this.linkedItem.src = enabledSrc.src;
                                                                        removeElementClass(this.linkedItem, disabledElementClass);
																		removeElementClass(this.linkedItem, hoverElementClass);
																		this.linkedItem.onmouseover = function() { addElementClass(this, hoverElementClass); };
                                                        				this.linkedItem.onmouseout = function() { removeElementClass(this, hoverElementClass); };
                                                                    }
                                                                    else
                                                                    {
                                                                        //if(this.linkedItem.isDisabled) this.linkedItem.isDisabled = true;
                                                                        //if(this.linkedItem.src) addSourcePrefix(this.linkedItem, disabledElementSourcePrefix);
                                                                        if(disabledSrc) this.linkedItem.src = disabledSrc.src;
                                                                        addElementClass(this.linkedItem, disabledElementClass);
																		removeElementClass(this.linkedItem, hoverElementClass);
																		this.linkedItem.onmouseover = function() { ; };
                                                        				this.linkedItem.onmouseout = function() { ; };
                                                                    }
                                                                    if(this.active)
                                                                    {
                                                                        addElementClass(this.linkedItem, activeElementClass);
                                                                    }
                                                                    else
                                                                    {
                                                                        removeElementClass(this.linkedItem, activeElementClass);
                                                                    }
                                                                }
                                                                catch(e)
                                                                {
                                                                    ;
                                                                }
                                                            }
                                                            
                                                            try
                                                            {
                                                                this.stateChanged.Invoke(this.authorized, this.active);
                                                            }
                                                            catch(e)
                                                            {
                                                                ;
                                                            }
                                                        }
                                                    };
                                };
}