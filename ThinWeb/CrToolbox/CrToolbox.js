// JScript File
//Name: Toolbox
//Version : 1.22.1 build 1
//_____________________________
//Class functions
//_____________________________
Function.prototype.inheritsFrom = function( parentClassOrObject )
{ 
	if ( parentClassOrObject.constructor == Function ) 
	{ 
		//Normal Inheritance 
		this.prototype = new parentClassOrObject;
		this.prototype.constructor = this;
		this.prototype.parent = parentClassOrObject.prototype;
	}
	else 
	{ 
		//Pure Virtual Inheritance 
		this.prototype = parentClassOrObject;
		this.prototype.constructor = this;
		this.prototype.parent = parentClassOrObject;
	}
	return this;
}

Object.clone = function(obj) 
{
    if(typeof obj  != 'object') return obj;
    if(obj == null) return obj;
    
    var myNewObj;

    if(obj.constructor == Array) { myNewObj = new Array(); }
    else { myNewObj = new Object(); }
    
    for(var i in obj)
	    myNewObj[i] = Object.clone(obj[i]);
    
    myNewObj.constructor = obj.constructor;
    return myNewObj;
}
//_____________________________
//Shortcuts functions
//_____________________________
var const_txCustomId = "crid";
function $(element)
{
    if (typeof element == 'string') { element = document.getElementById(element);}
    return element;
}
function $Del(element)
{
	//debugger;
	var _d ;

	_d = $(element);
	if (_d)
	{
		try {_d.removeNode(true); } catch (e) {;}
		try {_d.parentNode.removeChild(_d); } catch (e) {;}
		try {window.document.body.removeChild(_d); } catch (e) {;}
	}
}
function $Window(element, window)
{
    if (typeof element == 'string') { element = window.document.getElementById(element);}
    return element;
}
function $cid(id, element)
{    
    if (typeof id != 'string') return;
    element = $(element);
    if (!element.rows) return;
    
    var _ReturnValue = new Array();
    
    for (var i = 0; i < element.rows.length; i++)
    {
        _Attribut = element.rows[i].attributes[const_txCustomId];
        _Value = typeof _Attribut != 'undefined' ? _Attribut.nodeValue : 'undefined';
        if (_Value == id) _ReturnValue[_ReturnValue.length] = element.rows[i];
    }
    return _ReturnValue;
}
function $CleanTable(table, startRow)
{
    var _StartRow = typeof startRow != 'undefined' ? startRow : 0;

    while (table.rows.length > _StartRow)
    {
        table.deleteRow(_StartRow);
    }
}
function GetDefaultWindow(WindowValue)
{
    var _Win = WindowValue;
    while(_Win.frameElement)
    {        
        _Win = _Win.parent;
    } 
    return _Win;
}
function PurgeElement(element) 
{
    var a = element.attributes;
    var i, l, n;
    
    if(a) 
    {
        l = a.length;
        
        for (i = 0; i < l; i++) 
        {
            n = a[i].name;

            if (typeof element[n] === 'function') 
            {
                element[n] = null;
            }
        }
    }
    
    a = element.childNodes;
    
    if(a)
    {
        l = a.length;
        
        for(i = 0; i < l; i++)
        {
            PurgeElement(a[i]);
        }
    }
}
//_____________________________
//usefull functions
//_____________________________
// JScript File
//---------------------------------------------------------------------------
//    Let's load some JavaScripts :
//---------------------------------------------------------------------------
function load_scriptJS(filename) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = filename;
  document.getElementsByTagName('head')[0].appendChild(script);
}
//---------------------------------------------------------------------------
//    Let's load some Stylesheets :
//---------------------------------------------------------------------------
function load_stylesheet(filename) {
  var css = document.createElement('link');
  css.rel = 'stylesheet';
  css.type = 'text/css';
  css.href = filename;
  document.body.appendChild(css);
}
//---------------------------------------------------------------------------
//    Bubble effect for iframe:
//---------------------------------------------------------------------------
function setClick(evt, win)
{
    if (!win) win = window;
    if (document.attachEvent)
    {
        win.document.attachEvent("onmousemove", handleClick);
    }
    else if (document.addEventListener)
    {
        win.document.addEventListener("mousemove", handleClick, false);
    }
    else 
    {
        var onclick=win.document.onclick;
        win.document.onmousemove = function()
        {
            handleClick(evt);
            onclick();
        }
    }
}
function handleClick(event)
{
    if (!event) event : window.event;
    alert(event.type);
}
//---------------------------------------------------------------------------
//    Style call manip:
//---------------------------------------------------------------------------
function addElementClass(control, className)
{
    var lst;
    
    if(control.className) lst = control.className.split(' '); else lst = new Array();
    for(var i = 0; i < lst.length; i++) if(lst[i] == className) return;
    lst.push(className);
    control.className = lst.join(' ');
}

function removeElementClass(control, className)
{
    var lst;
    
    if(control.className) lst = control.className.split(' '); else return;
    for(var i = 0; i < lst.length; i++) if(lst[i] == className) { control.className = lst.slice(0,i).concat(lst.slice(i+1)).join(' '); break; }
}
//---------------------------------------------------------------------------
//Encode and decode function
//---------------------------------------------------------------------------
function encode(textValue)
{
	return escape(textValue).replace("_", "##u005F");
}

function decode(textValue)
{
	return unescape(textValue.replace("##u005F", "_"));
}
//---------------------------------------------------------------------------
//    Date time helpers:
//---------------------------------------------------------------------------
var txOneSeconde = 1000;
var txOneMinute = 60 * txOneSeconde;
var txOneHour = 60 * txOneMinute;
var txOneDay = 24 * txOneHour;
var txOneWeek = 7 * txOneDay;
var DateObject = 
{
	AddTimeSpan : function(date, timeSpan)
	{
		var time = date.getTime();
		time+=timeSpan;
		return new Date(time);
	},
	SubstractTimeSpan : function(date, timeSpan)
	{
		var time = date.getTime();
		time-=timeSpan;
		return new Date(time);
	},
	GetCurrentTimeZoneOffset : function()
	{
		return (new Date()).getTimezoneOffset() * -1;
	}
}
//---------------------------------------------------------------------------
//    Disable selection on element:
//---------------------------------------------------------------------------
function disableSelection(target)
{
    if (typeof target.onselectstart!="undefined") //IE route
	    target.onselectstart=function(){return false}
    else if (typeof target.style.MozUserSelect!="undefined") //Firefox route
	    target.style.MozUserSelect="none"
    else //All other route (ie: Opera)
	    target.onmousedown=function(){return false}
    target.style.cursor = "default"
}
/*function enSelection(target)
{
    if (typeof target.onselectstart!="undefined") //IE route
	    target.onselectstart=function(){return true}
    else if (typeof target.style.MozUserSelect!="undefined") //Firefox route
	    target.style.MozUserSelect="normal"
    else //All other route (ie: Opera)
	    target.onmousedown=function(){return true}
    target.style.cursor = "default"
}*/
//<Form>
//______
//Info: set in all the input fields you want the enter on this function
//onkeypress="return submitEnter(this,event)"
function submitEnter(myfield,e)
{
    var keycode;
    if (window.event) keycode = window.event.keyCode;
    else if (e) keycode = e.which;
    else return true;

    if (keycode == 13)
       {
           myfield.form.submit();
           return false;
       }
    else
       return true;
}
function telephoneKeys(e)
{
    var keycode;
    if (window.event) keycode = window.event.keyCode;
    else if (e) keycode = e.which;
    else return true;
    
    //window.alert("KeyCode: " + keycode);
    
    if (keycode == 0) return true; //Special keys home, del, ...
    else if (keycode == 8) return true; // backspace
    else if (keycode == 35) return true; // Hash #
    else if (keycode == 42) return true; // star *
    else if (keycode >= 48 && keycode <= 57) return true; // numbers    
    
    return false;
}
function txTypeOf(obj)
{
	if(obj == null) debugger;
    if (obj.txType) 
    { return obj.txType; }
    else if (obj.constructor) 
    {
	    var _Type;
	    _Type = obj.constructor.toString().match(/function (\w*)/)[1];
	    if (_Type.replace(' ','') == '') _Type = 'n/a';			//Mozilla needs this
	    //if (theSerializer.Types.UseObjectsForUserDefined && ! (_Type in oc(['Array','Boolean','Date','Enumerator','Error','Function','Number','RegExp','String','VBArray'])) ) {
		//    strType = 'Object';
	    //}
	    return _Type;
    }
    else { return 'n/a'; }
}
//_____________________________
//toolbox XML
//_____________________________
var txXml = 
{
    // --> Serialization
    txDetph : -1,
    txPrint : false,
    SerializeXml : function(obj, name)   
    {
        this.txDetph++; var _ReturnValue = "";
        _ReturnValue += this.StartXml(obj, name);
        _ReturnValue += this.ObjectXml(obj);
        _ReturnValue += this.EndXml(name);
        this.txDetph--; return _ReturnValue;
    },
    StartXml : function(obj, name) { return this.XmlOpenTag(name, [["type", txTypeOf(obj)]]); },
    ObjectXml : function(obj)
    {
        var _ReturnValue = "";
        var att;
        for(att in obj)
        {
            if (typeof obj[att] == "string")        { _ReturnValue += this.XmlInlineTag(att, obj[att], [["type", typeof obj[att]]]); } 
            else if (typeof obj[att] == "number")   { _ReturnValue += this.XmlInlineTag(att, obj[att], [["type", typeof obj[att]]]); }
            else if (typeof obj[att] == "boolean")  { _ReturnValue += this.XmlInlineTag(att, obj[att], [["type", typeof obj[att]]]); }
            else if (att == "inheritsFrom") { ; }
            else if (typeof obj[att] == "object")   
            { 
                if(obj[att] === null)
                { _ReturnValue += this.XmlInlineTag(att, 'null', [["type", typeof obj[att]]]);}
                else if(obj[att].constructor == Array)
                { 
                    var att1;
                    _ReturnValue += this.StartXml(obj[att], att);
                    for(att1 in obj[att]) 
                    { 
                        if (typeof obj[att][att1] == "string")        { _ReturnValue += this.XmlInlineTag(att1, obj[att][att1], [["type", typeof obj[att][att1]]]); }
                        else if (typeof obj[att][att1] == "number")   { _ReturnValue += this.XmlInlineTag(att1, obj[att][att1], [["type", typeof obj[att][att1]]]); }
                        else if (typeof obj[att][att1] == "boolean")  { _ReturnValue += this.XmlInlineTag(att1, obj[att][att1], [["type", typeof obj[att][att1]]]); }
                        else if (att == "inheritsFrom") { ; }
                        else { _ReturnValue += this.SerializeXml(obj[att][att1], att1); }
                    }
                    _ReturnValue += this.EndXml(att); 
                }
                else 
                { _ReturnValue += this.SerializeXml(obj[att], att); }
            }
        }
        return _ReturnValue;
    },
    EndXml : function(name) { return this.XmlCloseTag(name); },    
    // --> XML Document functions
    XmlBuildAtt : function(attributs)
    {
        if(!attributs) return "";
        var len = attributs.length;
        var _ReturnValue = "";
        for (var i = 0; i < len; i++)
        {
            _ReturnValue += " " + attributs[i][0] + "='" + attributs[i][1] + "'";
        }
        return _ReturnValue;
    },
    XmlOpenTag : function(name, attributs)
    {
        var _Name = this.XmlNameCheck(name);
        var _ReturnValue = "";
        if (this.txPrint) { for(var i = 0; i < this.txDetph; i++) { _ReturnValue += "\t";} }
        _ReturnValue += "<" +  _Name + this.XmlBuildAtt(attributs) + ">";
        if (this.txPrint) { _ReturnValue += "\n"; }
        return _ReturnValue;
    },
    XmlCloseTag : function(name)
    {
        var _Name = this.XmlNameCheck(name);
        var _ReturnValue = "";
        if (this.txPrint) { for(var i = 0; i < this.txDetph; i++) { _ReturnValue += "\t";} }
        _ReturnValue += "</" +  _Name + ">";
        if (this.txPrint) { _ReturnValue += "\n"; }
        return _ReturnValue;
    },
    XmlInlineTag : function(name, value, attributs)
    {
        var _Name = this.XmlNameCheck(name);
        var _ReturnValue = "";
        if (this.txPrint) { for(var i = 0; i < this.txDetph; i++) { _ReturnValue += "\t";} }
        _ReturnValue += "<" + _Name + this.XmlBuildAtt(attributs) + ">" + this.XmlEscape(value) + "</" + _Name + ">";
        if (this.txPrint) { _ReturnValue += "\n"; }
        return _ReturnValue;    
    },
    // --> XML Helpers 
    XmlEscape : function(xml)
    {
        var _XML = "";
	    if(typeof xml == 'undefined') return;
	    if(xml == null) return;
	    
	    _XML = xml.toString();
	    //escape the sequence to render ok
	    var arrEscape = [['&', '&amp;'],['<', '&lt;'],['>', '&gt;']];
	    for (var i = 0; i<arrEscape.length; i++){
		    var r = new RegExp(arrEscape[i][0], 'gi');
		    _XML = _XML.replace(r, arrEscape[i][1]);
	    }
	    return _XML;
    },
    XmlNameCheck : function(obj)
    {
        if(isNaN(obj)) 
        { 
            return obj; 
        }
        else 
        { 
            return "Item" + obj.toString(); 
        }
    },
    //
    //XML reading function
    //
    XmlFileReader : function(xmlFile)
    {
        // code for IE
        var _Doc;
        if (window.ActiveXObject)
        {
            _Doc=new ActiveXObject("Microsoft.XMLDOM");
            _Doc.async="false";
            _Doc.load(xmlFile);
        }
        // code for Mozilla, Firefox, Opera, etc.
        else if (document.implementation && document.implementation.createDocument)
        {
            _Doc=document.implementation.createDocument("","",null);
            _Doc.load(xmlFile);
            //_Doc.onload=getmessage;
        }
        else {alert('Your browser cannot handle xml files');}
    
        if (_Doc) return _Doc.documentElement;
    },
    XmlStringReader : function(xmlString)
    {
        // code for IE
        var _Doc; var _Parser;
        if (window.ActiveXObject)
        {
            _Doc=new ActiveXObject("Microsoft.XMLDOM");
            _Doc.async="false";
            _Doc.loadXML(xmlString);
        }
        // code for Mozilla, Firefox, Opera, etc.
        else
        {
            _Parser=new DOMParser();
            _Doc=_Parser.parseFromString(xmlString,"text/xml");
        }

        if (_Doc) return _Doc.documentElement;
    }
}
//_____________________________
//Collection class
//_____________________________
//IndexBased collection
function CollectionClass()
{
    this.Items = new Array();
    this.Keys = new Array();
}

CollectionClass.prototype = 
{
    AddUniqueItem : function(item, key)
    {
        if (!item) return false;
        var _NewIndex = this.Items.length;
        
        var _Key;
        if (item.Key) { _Key = item.Key; }
        else { _Key = typeof key != 'undefined'? key : ""; }
        var _Check = this.IndexByKey(_Key);
        if(_Check >= 0) return this.Items[_Check];
        this.Items[_NewIndex] = item;
        this.Keys[_NewIndex] = _Key;
        
        return this.Items[_NewIndex];
    },
    
    AddItem : function(item, key)
    {
        if (!item) return false;
        var _NewIndex = this.Items.length;
        
        var _Key
        if (item.Key) { _Key = item.Key; }
        else { _Key = typeof key != 'undefined'? key : ""; }
        this.Items[_NewIndex] = item;
        this.Keys[_NewIndex] = _Key;
        
        return this.Items[_NewIndex];
    },
    AddRange : function(item)
    {
        if (!item) return false;
        
        var i; var len = item.length;
        for(i = 0; i < len; i++) { this.AddItem(item[i]); }
    },
    Clear : function()
    {
        this.Items = new Array();
        this.Keys = new Array();
    },
    ContainsByKey : function(key)
    {
        if(typeof key == 'undefined') return false;
        
        for (var i = 0; i < this.Keys.length; i++)
        {
            if (this.Keys[i] == key) return true;
        }
        return false;
    },
    IndexByKey : function(key)
    {
        if(typeof key == 'undefined') return -1;
        
        for (var i = 0; i < this.Keys.length; i++)
        {
            if (this.Keys[i] == key) return i;
        }
        return -1;    
    },
    Insert : function(index, item, key)
    {
        if (!index) return false;
        if (!item) return false;

        var _Key
        if (item.Key) { _Key = item.Key; }
        else { _Key = typeof key != 'undefined'? key : ""; }
        this.Items.splice(index, 0, item);
        this.Keys.splice(index, 0, _Key);
        
        return this.Items[index];
    },
    Remove : function(index)
    {
        if(typeof index == 'undefined') return;
        if(index > this.Items.length || index < 0 ) return;
        
        this.Items.splice(index, 1);
        this.Keys.splice(index, 1);
    },
    RemoveByKey : function(key)
    {
        if(typeof key == 'undefined') return;
        var _Index = this.IndexByKey(key);
        if(_Index < 0 ) return;
        
        this.Items.splice(_Index, 1);
        this.Keys.splice(_Index , 1);
    }
}

//Keybased and index based collection
function CollectionBaseClass()
{
    this.Items = new Array();
}
CollectionBaseClass.prototype.AddItem = function(item, key)
{
    if (!item) return false;
    if (!key) key = this.Items.length;

    if(this.Items[key]) return this.Items[key];
    this.Items[key] = item;
    
    return item;
}
CollectionBaseClass.prototype.AddRange = function(items, keys)
{
    if (!items) return false;
    
	//key = this.Items.length;
	
    var lenI = items.length;
    if (lenI == 0) return false;
        
    var i;
	var _Key;
    for(i = 0; i < lenI; i++) 
	{ 
		if(!keys[i]) _Key = this.Items.length;
		else _Key = keys[i];
		
		this.AddItem(items[i], _Key); 
	}
}
CollectionBaseClass.prototype.Clear = function()
{
    this.Items = new Array();
}
CollectionBaseClass.prototype.ContainsByKey = function(key)
{
    return this.Items[key] ? true : false;
}
CollectionBaseClass.prototype.RemoveItem = function(key)
{
    if(this.Items[key]) delete this.Items[key];
}

//Test Cross domain message
function sendMessage(test, frameId){
	var iwin;
    if(navigator.userAgent.indexOf("Safari") != -1){
        iwin = frames['Application'];
    }else{
        iwin = $('Application').contentWindow;
    }
    iwin.location = "http://zelto.com/ScriptApp/SampleScript.htm#uiMessage_" + (new Date()).getTime();
}
var lastId;
function checkForMessages(){
	if(location.hash != lastId){
		lastId = location.hash;
		console.log("Message: " + lastId);
		//document.getElementById("output").innerHTML = "Received message: " + lastId + ", total messages: " + numberPipeMessages + "<br>" + document.getElementById("output").innerHTML;
		
		//window.alert("Message: " + lastId);
	}
}

function toolboxMulticastDelegate()
{
    var members = new Array();
    
    this.Add = function(target, method)
                    {
                        for(var i = 0; i < members.length; i++)
                        {
                            if(members[i].target == target && members[i].method == method)
                            {
                                return;
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

