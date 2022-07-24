
var xhreq;
var xhreqloc = '';
var xhreqtpe = 'none';
var xhreqseq = 0;
var xhreqqueue = new Array()

//<!IS_BROWSER IE IE5 IE6 IE7>
var xhevt = null;
//<!IS_BROWSER_ELSE>
var xhevt = new Array();
var xhevtact = 0;
//<!IS_BROWSER>
var xhevtloc = '';
var xhevttpe = 'none';
var xhevtseq = 0;
var xhevtrpt = 0;
var xhevtsnd = Date();
//<!IS_BROWSER_NOT IE IE5 IE6 IE7>
var xhevttmr = null;
//<!IS_BROWSER>
var xhevttry = null;
var xhevtqueue = new Array()

var XHRBuilder = null;
var XHRType = 'None';
var XHRSession = null;

function onxhResponse()
{
    if(xhreq.readyState == 4)
    {
        var res = xhreq.responseText;
        
        if(res.length > 0)
        {
            var lst = res.split('&');

            window.alert(res);

            for(var i = 0; i < lst.length; i++)
            {
                vals = lst[i].split('=');
                
                window.alert(vals[0] + ' is ' + unescape(vals[1]));
            }
        }

        xhreq.open('GET', document.location.href + '?o=' + (++xhreqseq).toString(), true);
//        xhreq.setRequestHeader('cookie', 'contactroutehttpserversessionid='+XHRSession);
        xhreq.send(null);
    }
}

//<!IS_BROWSER_NOT IE IE5 IE6 IE7>
function onxhTimeout()
{
    try
    {
        if(xhevttry != null)
            window.clearTimer(xhevttry);
    }
    catch(e)
    {
        ;
    }
    
    xhevttmr = null;
    
    document.getElementById('tstDiv').innerHTML = document.getElementById('tstDiv').innerHTML + '<br>Timeout detected at ' + Date().toString();
    
    try
    {
        xhevt[0].abort();
    }
    catch(e)
    {
        ;
    }
    
    try
    {
        xhevt[1].abort();
    }
    catch(e)
    {
        ;
    }
    
    xhevt[0] = XHRBuilder();
    xhevt[1] = XHRBuilder();

    xhevttry = window.setTimeout('xhEvtTry()', 5000, 'javascript');
}
//<!IS_BROWSER>

function xhEvtTry()
{
    xhevttry = null;

    var request = xhevtloc + '?to=5&seq=' + xhevtseq.toString() + '&rpt=' + (++xhevtrpt).toString();
    
//<!IS_BROWSER IE IE5 IE6 IE7>
    try
    {
        xhevt.abort();
    }
    catch(e)
    {
        ;
    }
    xhevt.onreadystatechange = onxhEvent;
        
    xhevt.open('GET', request, true);
//    xhevt.setRequestHeader('cookie', 'contactroutehttpserversessionid='+XHRSession);
    xhevt.send(null);
//<!IS_BROWSER_ELSE>
    try
    {
        xhevt[xhevtact].abort();
    }
    catch(e)
    {
        ;
    }
    if(++xhevtact > 1) 
        xhevtact = 0;

    xhevttmr = window.setTimeout('onxhTimeout()', 50000, 'javascript');

    xhevt[xhevtact].onreadystatechange = onxhEvent;
        
    xhevt[xhevtact].open('GET', request, true);
//    xhevt[xhevtavt].setRequestHeader('cookie', 'contactroutehttpserversessionid='+XHRSession);
    xhevt[xhevtact].send(null);
//<!IS_BROWSER>

    xhevtsnd = Date();
}

function onxhEvent()
{
//    //debugger;
//<!IS_BROWSER IE IE5 IE6 IE7>
    if(xhevt.readyState == 4)
//<!IS_BROWSER_ELSE>
    if(xhevt[xhevtact].readyState == 4)
//<!IS_BROWSER>
    {
        var badContent = true;
        
//<!IS_BROWSER_NOT IE IE5 IE6 IE7>
        if(xhevttmr != null)
        {
            window.clearInterval(xhevttmr);
            xhevttmr = null;
        }
//<!IS_BROWSER>

        try
        {
//<!IS_BROWSER IE IE5 IE6 IE7>
            if(xhevt.status == 200 || xhevt.status == 1223)
            {
                var res = xhevt.responseText;
//<!IS_BROWSER_ELSE>
            if(xhevt[xhevtact].status == 200)
            {
                var res = xhevt[xhevtact].responseText;
//<!IS_BROWSER>
                
                if(res.length > 0)
                {
                    var lst = res.split('\r\n');

                    badContent = false;

                    for(var i = 0; i < lst.length; i++)
                    {
                        var seq = parseInt(lst[i], 10);
                            
                        if(seq > xhevtseq)
                        {
                            var vals = lst[i].split('&').slice(1);

                            for(var j = 0; j < vals.length; j++)
                                vals[j] = unescape(vals[j]);

                            xhevtseq = seq;
                            xhevtrpt = 0;
                    document.getElementById('tstDiv').innerHTML = document.getElementById('tstDiv').innerHTML + '<br>---Event: ' + seq.toString() + ' - ' + vals.join(",");
                        }
                        //window.alert(vals[0] + ' is ' + unescape(vals[1]));
                        
                        if(document.onCommunicationEvent)
                            document.onCommunicationEvent(vals[0], unescape(vals[1]));
                    }
                }
                else
                {
//<!IS_BROWSER IE IE5 IE6 IE7>
                    if(xhevt.status == 1223)
                    {
                        badContent = false;
                    }
//<!IS_BROWSER>                
                    document.getElementById('tstDiv').innerHTML = document.getElementById('tstDiv').innerHTML + '<br>4';
                }
            }
//<!IS_BROWSER IE IE5 IE6 IE7>
            else if(xhevt.status == 204)
            {
//<!IS_BROWSER_ELSE>
            else if(xhevt[xhevtact].status == 204)
            {
//<!IS_BROWSER>
                badContent = false;

                document.getElementById('tstDiv').innerHTML = document.getElementById('tstDiv').innerHTML + '<br>4' + ' - No Event yet';
            }
            else
            {
//<!IS_BROWSER IE IE5 IE6 IE7>
                document.getElementById('tstDiv').innerHTML = document.getElementById('tstDiv').innerHTML + '<br>4' + ' - ' + xhevt.status.toString();
//<!IS_BROWSER_ELSE>
                document.getElementById('tstDiv').innerHTML = document.getElementById('tstDiv').innerHTML + '<br>4' + ' - ' + xhevt[xhevtact].status.toString();
//<!IS_BROWSER>
            }
        }
        catch(e)
        {
            ;
        }

        if(badContent)
        {
            xhevttry = window.setTimeout('xhEvtTry()', 10000, 'javascript');
        }
        else
        {
//<!IS_BROWSER IE IE5 IE6 IE7>
            xhEvtTry();
//<!IS_BROWSER_ELSE>
            xhevttry = window.setTimeout('xhEvtTry()', 100, 'javascript');
//<!IS_BROWSER>
        }
    }
    else
    {
//<!IS_BROWSER IE IE5 IE6 IE7>
        document.getElementById('tstDiv').innerHTML = document.getElementById('tstDiv').innerHTML + '<br>' + xhevt.readyState.toString();
//<!IS_BROWSER_ELSE>
        document.getElementById('tstDiv').innerHTML = document.getElementById('tstDiv').innerHTML + '<br>' + xhevt[xhevtact].readyState.toString();
//<!IS_BROWSER>
    }
}

function sendCommand(cmd)
{
/*    xhreqqueue = xhreqqueue.concat(xhreqqueue, (++xhreqseq).toString(), cmd);

    if(xhreq.readystate == 4)
    {
        xhreq.open('POST', xhreqloc + '?t=cmd&o=' + (++xhreqseq).toString(), true);
//        xhreq.setRequestHeader('cookie', 'contactroutehttpserversessionid='+XHRSession);
        xhreq.send(xhreqqueue.join('\r\n'));
    }
    else
    {
    ;
    }
*/
    var data = '';
    
    for(var i = 1; i < arguments.length; i++)
        data += arguments[i] + '\r\n';
        
    xhreq.open('POST', xhreqloc + '?action=' + cmd, false);
//        xhreq.setRequestHeader('cookie', 'contactroutehttpserversessionid='+XHRSession);
    xhreq.send(data);
    
}

function initCommunication()
{
    var testObject = null; 
//debugger;
    var cookies = document.cookie.split(";");
    for(var i = 0; i < cookies.length; i++)
    {
        if(cookies[i].substring(0,32)=="contactroutehttpserversessionid=")
        {
            var sep = cookies[i].indexOf(";");
            if(sep > 0)
                XHRSession=cookies[i].substring(32,sep);
            else
                XHRSession=cookies[i].substring(32);
            break;
        }
    }
    if((window.XMLHttpRequest) && (testObject = (new XMLHttpRequest())))
    { 
        XHRBuilder = function() { return new XMLHttpRequest(); };
        XHRType = 'XHR';
    }
//<!IS_BROWSER IE IE5 IE6 IE7>
    else if(window.ActiveXObject)
    { 
        var testNames = ['Msxml2.ServerXMLHTTP', 'Microsoft.ServerXMLHTTP', 'Msxml2.XMLHTTP.6.0', 'Msxml2.XMLHTTP.5.0', 'Msxml2.XMLHTTP.4.0', 'Msxml2.XMLHTTP.3.0', 'Msxml2.XMLHTTP', 'Microsoft.XMLHTTP']; 

        for(var i = 0; i < testNames.length; i++)
        {
            try
            {
                if((testObject = new ActiveXObject(testNames[i])))
                {
                    XHRBuilder = new Function('return new ActiveXObject("' + testNames[i] + '");');
                    XHRType = 'M' + testNames[i].charAt(1);
                    
                    testNames = testNames[i].split('.');
                    for(i = 1; i < 3 && i < testNames.length; i++) XHRType = XHRType + testNames[i].charAt(0);
                    
                    break;
                }
            }
            catch(e)
            {
            }
        }
        
        testNames = null;
    }
//<!IS_BROWSER>

    if(!testObject)
    { 
        XHRBuilder = new Function('return null;');
    } 
    else
    {
        testObject = null;
    }

    window.alert('-- ' + XHRType);

    try
    {
        xhreq = XHRBuilder();
//<!IS_BROWSER IE IE5 IE6 IE7>
        xhevt = XHRBuilder();
//<!IS_BROWSER_ELSE>
        xhevt[0] = XHRBuilder();
        xhevt[1] = XHRBuilder();
//<!IS_BROWSER>
    }
    catch(e)
    {
        ;
    }
    
//<!IS_BROWSER IE IE5 IE6 IE7>
    if(xhreq == null || xhevt == null)
//<!IS_BROWSER_ELSE>
    if(xhreq == null || xhevt[0] == null || xhevt[1] == null)
//<!IS_BROWSER>
    {
        window.location.href = "incompatible.html";
    }
    else
    {
        var pos;
        
        xhreqloc = document.location.href.substring(0, document.location.href.lastIndexOf('/') + 1);

        pos = xhreqloc.indexOf("/", xhreqloc.indexOf("://") + 3);
        
        xhreqloc = xhreqloc.substring(0, pos) + '/~' + XHRSession + xhreqloc.substring(pos);
        
        xhevtloc = xhreqloc + '__events';

        xhreq.open('GET', xhreqloc + '?action=~js', false);
//        xhreq.setRequestHeader('cookie', 'contactroutehttpserversessionid='+XHRSession);
        xhreq.send(null);

        if(xhreq.status != 200)
        {
            window.location.href = "requesterror.html";
        }
        else
        {
            xhEvtTry();
        }
    }
}

