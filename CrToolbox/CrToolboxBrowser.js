//
//Web browser version and type
//
/*var xxWebBrowser = 
{
    IE:false, 
    NS:false, 
    OP:false, 
    SA:false, 
    FF:false, 
    Other:false,   
	Init: function()
	{
		if (navigator.userAgent.indexOf("Opera") >= 0) { xxWebBrowser.OP = true; }
		else if (navigator.userAgent.indexOf("Safari") >= 0) { xxWebBrowser.SA = true; }
		else if (navigator.userAgent.indexOf("MSIE") >= 0) { xxWebBrowser.IE = true; }
		else if (navigator.userAgent.indexOf("Netscape6/") >= 0) { xxWebBrowser.NS = true; }
		else if (navigator.userAgent.indexOf("Netscape7/") >= 0) { xxWebBrowser.NS = true; }
		else if (navigator.userAgent.indexOf("Navigator/9") >= 0) { xxWebBrowser.NS = true; }
		else if (navigator.userAgent.indexOf("Firefox/") >= 0) { xxWebBrowser.FF = true; }
		else if (navigator.userAgent.indexOf("Gecko") >= 0) { xxWebBrowser.NS = true; }
		else { xxWebBrowser.Other = true; }
	}
}
xxWebBrowser.Init();
*/


txWebBrowser = new toolboxWebBrowser();
function toolboxWebBrowser() 
{
    var i;
    this.IE    = false; //Internet Explorer
    this.NS    = false; //Netscape
    this.OP    = false; //Opera
    this.SA    = false; //Safari
    this.FF    = false; //Firefox
    this.Other = false; //Other browser
    
    this.OperaEngine    = false;
    this.GeckoEngine    = false;
    this.IeEngine       = false;
    this.KHtmlEngine    = false;
    this.type = null;  
    this.version = null;
    this.Engine = null;
    
    if ((i = navigator.userAgent.indexOf("Opera")) >= 0) {
    this.OP = true; this.OperaEngine = true;
    this.version = parseFloat(navigator.userAgent.substr(i + 6));
    this.type = "Opera"; this.Engine = "Opera";
    return;
    }
    if ((i = navigator.userAgent.indexOf("Safari")) >= 0) {
    this.SA = true; this.KHtmlEngine = true;
    this.version = parseFloat(navigator.userAgent.substr(i - 4));
    this.type = "Safari"; this.Engine = "KHtml";
    return;
    }    
    if ((i = navigator.userAgent.indexOf("MSIE")) >= 0) {
    this.IE = true; this.IeEngine = true;
    this.version = parseFloat(navigator.userAgent.substr(i + 4));
    this.type = "IE"; this.Engine = "Ie";
    return;
    }
    if ((i = navigator.userAgent.indexOf("Netscape6/")) >= 0) {
    this.NS = true; this.GeckoEngine = true;
    this.version = parseFloat(navigator.userAgent.substr(i + 10));
    this.type = "Netscape"; this.Engine = "Gecko";
    return;
    }
    if ((i = navigator.userAgent.indexOf("Netscape7/")) >= 0) {
    this.NS = true; this.GeckoEngine = true;
    this.version = parseFloat(navigator.userAgent.substr(i + 10));
    this.type = "Netscape"; this.Engine = "Gecko";
    return;
    }
    if ((i = navigator.userAgent.indexOf("Navigator/9")) >= 0) {
    this.NS = true; this.GeckoEngine = true;
    this.version = parseFloat(navigator.userAgent.substr(i + 10));
    this.type = "Netscape"; this.Engine = "Gecko";
    return;
    }    
    if ((i = navigator.userAgent.indexOf("Firefox/")) >= 0) {
    this.FF = true; this.GeckoEngine = true;
    this.version = parseFloat(navigator.userAgent.substr(i + 8));
    this.type = "Firefox"; this.Engine = "Gecko";
    return;
    }
    if ((i = navigator.userAgent.indexOf("Gecko")) >= 0) {
    this.NS = true; this.GeckoEngine = true;
    this.version = 6.1;
    this.type = "Gecko Engine"; this.Engine = "Gecko";
    return;
    }
    //other
    this.Other = true; //this.GeckoEngine = true;
    this.version = null;
    this.type = "Other"; this.Engine = "";
}
//
//function to get the dimensions of the web browser (window height, window width, window top, window left)
//

function toolboxBrowserDimensions(bool)
{
    this.txHeight = -1;
    this.txWidth = -1;
    this.txTop = -1;
    this.txLeft = -1;
    this.txOffset = new Array();
    this.txOffset["Default"] = ["0", "0", "0", "0"]; //[Height, width, top, left]
    this.txInit = false;
    if(bool) this.Init();
}
toolboxBrowserDimensions.prototype.Init = function()
{
    if(txWebBrowser.IE)
    {
        this.SetOffset();                
    }
    this.txInit = true;
}
toolboxBrowserDimensions.prototype.SetOffset = function(key, features)
{
    if(txWebBrowser.IE)
    {        
        var _Url = "about:blank";
        var _Key = typeof key  != 'undefined' ? key : 'Default';
        var _Features = typeof features  != 'undefined' ? features : '';
        var _FixH = 200; var _FixW = 320; var _FixT = 100; var _FixL = 100;
        var _Win;
        if (!_Features) { _Win = window.open("CrToolbox/CrToolboxBrowserBlank.htm", "toolboxBrowserDimensions"); }
        else { _Win = window.open("CrToolbox/CrToolboxBrowserBlank.htm", "toolboxBrowserDimensions", _Features); }
        _Win.resizeTo(_FixW, _FixH);
        _Win.moveTo(_FixL, _FixT);
        var _t = 0; var _l = 0; var _h = 0; var _w = 0;
        try
        {
            var _t = _FixT - _Win.screenTop;
            var _l = _FixL - _Win.screenLeft;
            var _h = _FixH - _Win.document.documentElement.offsetHeight;
            var _w = _FixW - _Win.document.documentElement.offsetWidth;
            _Win.close();
        }
        catch(e)
        {
            try
            {
                var _t = _FixT - _Win.screenTop;
                var _l = _FixL - _Win.screenLeft;
                var _h = _FixH - _Win.document.documentElement.offsetHeight;
                var _w = _FixW - _Win.document.documentElement.offsetWidth;
                _Win.close(); 
            }  
            catch(e) 
            {
                try { _Win.close(); } catch (e) { ; }
            }
        }
        this.txOffset[_Key] = [_h, _w, _t, _l];
    }
    else
    {
        this.txOffset[_Key] = ["0", "0", "0", "0"];
    }
}
toolboxBrowserDimensions.prototype.Alert = function(key)
{
    var _Key = typeof key  != 'undefined' ? key : 'Default';
    var _Val = this.txOffset[_Key];
    //TO DO: check way sometimes this can't be found if(!_Val) window.alert("Don't now the key.");
    window.alert("[Key: " + _Key + "].OffsetHeight: " + _Val[0] + ".OffsetWidth: " + _Val[1] + ".OffsetTop: " + _Val[2] + ".OffsetLeft: " + _Val[3]);
}
//TO DO: Calculation for opera are not correct had to be checked.
toolboxBrowserDimensions.prototype.GetDimensions = function(win, key)
{
    var _Key = typeof key  != 'undefined' ? key : 'Default';
    var _Win = typeof win  != 'undefined' ? win : window;
    var _w, _h, _l, _t;
    var _Val = this.txOffset[_Key];
    //TO DO: check way sometimes this can't be found if(!_Val) window.alert("Don't now the key.");
    
    if(txWebBrowser.IE)
    {
        _h = _Win.document.documentElement.offsetHeight + _Val[0];
        _w = _Win.document.documentElement.offsetWidth + _Val[1];
        _t = _Win.screenTop + _Val[2];
        _l = _Win.screenLeft + _Val[3];
    }else if(txWebBrowser.FF || txWebBrowser.NS)
    {
        _h = _Win.outerHeight;
        _w = _Win.outerWidth;
        _t = _Win.screenY;
        _l = _Win.screenX;
    }else if(txWebBrowser.SA)
    {
        _h = _Win.outerHeight;
        _w = _Win.outerWidth;
        _t = _Win.screenTop;
        _l = _Win.screenLeft;
    }else if(txWebBrowser.OP)
    {
        _h = _Win.outerHeight;
        _w = _Win.outerWidth;
        _t = _Win.screenTop;
        _l = _Win.screenLeft;
    }else
    {
        _h = _Win.outerHeight;
        _w = _Win.outerWidth;
        _t = _Win.screenX === undefined ? _Win.screenLeft : _Win.screenX;
        _l = _Win.screenY === undefined ? _Win.screenTop : _Win.screenY;
    } 
    this.txHeight = _h;
    this.txWidth = _w;
    this.txTop = _t;
    this.txLeft = _l;
        
    return [_h, _w, _t, _l];
}

//
//Language
//

var txLanguage =
{
	user : 'en',
	browser : 'en',
	os : 'en',
	language : '',
	Init: function ()
	{
		if(window.navigator.language)
		{
			txLanguage.browser = window.navigator.language;
			txLanguage.os = window.navigator.language;
			txLanguage.user = window.navigator.language;
		}
		if (window.navigator.browserLanguage)
		{
			if (!window.navigator.language) txLanguage.browser = window.navigator.browserLanguage;
			txLanguage.os = window.navigator.browserLanguage;
			txLanguage.user = window.navigator.browserLanguage;
		}			
		if (window.navigator.systemLanguage)
		{
			if (!window.navigator.language && !window.navigator.browserLanguage) txLanguage.browser = window.navigator.systemLanguage;
			txLanguage.os = window.navigator.systemLanguage;
			txLanguage.user = window.navigator.systemLanguage;
		}
		if (window.navigator.userLanguage)
		{
			if (!window.navigator.language && !window.navigator.browserLanguage && !window.navigator.systemLanguage) txLanguage.browser = window.navigator.userLanguage;
			if (!window.navigator.systemLanguage) txLanguage.os = window.navigator.userLanguage;
			txLanguage.user = window.navigator.userLanguage;
		}	
	}
}
txLanguage.Init();
