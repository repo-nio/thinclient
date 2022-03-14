// JScript File
var SupConfig =
{
    //
    //Var
    //
    MainWin     : null,
    ModelWin    : null,
    GetCurrentConfig : function(win)
    {
        this.ModelWin = typeof win != 'undefined' ? win : window;
        if(!this.ModelWin.SuperModel) return "No Model present";
        
        this.MainWin = this.ModelWin;
        var _Win = this.ModelWin;
        while(_Win.frameElement)
        {        
            this.MainWin = _Win.parent;
            _Win = _Win.parent;
        }    
    },
    //
    //Save supervision
    //
    Get : function(win)
    {
		var _XmlStr = "";
		try 
		{
			//txXml.txPrint = true;
			this.GetCurrentConfig(win);
			this.GetWindowGeneralSettings();
			
			//Create Xml string
			
			_XmlStr += txXml.XmlOpenTag("NCS_SupervisionWorkspace", [["version", const_VersionFull], ["UserId", "xdsedssdedseed"]])
			//_XmlStr += txXml.XmlOpenTag("General");
			//_XmlStr += txXml.XmlCloseTag("General");
			_XmlStr += txXml.XmlOpenTag("NCS_NavigatorWindow");
			_XmlStr += txXml.SerializeXml(this.MainWin.txWinSettings, 'General')
			_XmlStr += txXml.XmlCloseTag("NCS_NavigatorWindow");
			var _Model = this.ModelWin.SuperModel;
			var lenI = _Model.SuperItems.length;
			for (var i = 0; i < lenI; i++) 
			{
				var lenJ = _Model.SuperItems[i].Window.length;
				for (var j = 0; j < lenJ; j++) 
				{
					_XmlStr += txXml.XmlOpenTag("NCS_View", [["type", Enums.model.types[_Model.SuperItems[i].Window[j].Key]]]);
					_XmlStr += txXml.SerializeXml(_Model.SuperItems[i].Window[j].txWinSettings, 'General')
					_XmlStr += txXml.SerializeXml(_Model.SuperItems[i].Window[j].ColumnDef, 'ColumnDef');
					_XmlStr += txXml.SerializeXml(_Model.SuperItems[i].Window[j].GroupByList, 'GroupByList');
					_XmlStr += txXml.XmlCloseTag("NCS_View");
				}
			}
			_XmlStr += txXml.XmlCloseTag("NCS_SupervisionWorkspace");
		}
		catch(e)
		{
			//TO DO debugger;
			
		}
        return _XmlStr;
    },
    GetWindowGeneralSettings : function()
    {
        //var _XmlStr = ""
        this.GetWindowSettings(this.MainWin);
        //_XmlStr += txXml.SerializeXml(this.MainWin.txWinSettings, 'NavigatorWindow')
        
        var _Model = this.ModelWin.SuperModel;
        var lenI = _Model.SuperItems.length;
        for(var i = 0; i < lenI; i++)
        {
            var lenJ = _Model.SuperItems[i].Window.length;
            for(var j = 0; j < lenJ; j++)
            {
                this.GetWindowSettings(_Model.SuperItems[i].Window[j], "NixxisView");
            }
        }
    },
    GetWindowSettings: function(win, key)
    {
        var _Key = typeof key  != 'undefined' ? key : 'Default';
        var _WinSettings = new GeneralWindowSettings();
        win.txWinSettings = _WinSettings;
        _WinSettings.Get(win, _Key);    
    },
    SetViews: function(win)
    {
        
    },
    //
    //Load config back
    //
    Set : function(xmlString, win)
    {
        this.GetCurrentConfig(win);
        
        var _XmlDoc = txXml.XmlStringReader(xmlString);
        var _ArrElems; var _Elem;
        var _Obj;
        //Navigator window
        _ArrElems = _XmlDoc.getElementsByTagName('NCS_NavigatorWindow');
        
        if (_ArrElems.length > 0 )
        {
            _Elem = _ArrElems[0].getElementsByTagName('General');
            if (_Elem.length > 0 )
            { 
                _Obj = this.DeserializeObject(_Elem[0]);
                this.MainWin.txWinSettings = _Obj;
                this.MainWin.txWinSettings.Set(this.MainWin);
            }
        }
        //
        //Supervision views
        //
        _ArrElems = _XmlDoc.getElementsByTagName("NCS_View");
        var _Type;
        var _Model = this.ModelWin.SuperModel;
        var len = _ArrElems.length;
        for (var i = 0; i < len; i++)
        {
            _Type = _ArrElems[i].getAttribute('type');
            var _TypeIndex = Enums.model.types[_Type];
            var _General;
            var _Columns;
            var _Grouping;
            _Elem = _ArrElems[i].getElementsByTagName('General');
            if (_Elem.length > 0 ) { _General = this.DeserializeObject(_Elem[0]); }            
            _Elem = _ArrElems[i].getElementsByTagName('ColumnDef');
            if (_Elem.length > 0 ) { _Columns = this.DeserializeObject(_Elem[0]); }            
            _Elem = _ArrElems[i].getElementsByTagName('GroupByList');
            if (_Elem.length > 0 ) { _Grouping = this.DeserializeObject(_Elem[0]); } 
                        
            this.ModelWin.CreateNewWindow(_TypeIndex, _Columns, _Grouping, _General);


        }
        var t = 0;
        t++;
    },
    SetWindowSettings: function(win, config)
    {
        var _WinSettings = new GeneralWindowSettings();
        //var len = config.childNodes.length;
        //for(var i = 
        
        /*var _Obj = 
        _WinSettings.Point = 
        
        win.txWinSettings = _WinSettings;
        _WinSettings.Set(win); */   
    },
    DeserializeObject: function(objXML)
    {
        if (!objXML) return null;
        var _IsArray = false;
        var _Obj; var _VarName; var _Value; var _ArrayIndex;
        var _Type = objXML.getAttribute('type');
        try { eval("_Obj = new " + _Type + "();"); }
        catch(e) { return null;}
        if (_Type == "Array") _IsArray = true;
        
        //console.log("Deserialize obj. Type:" + _Type);
        
        var len = objXML.childNodes.length;
        for (var i = 0; i < len; i++)
        {
            _Type = objXML.childNodes[i].getAttribute('type');
            _VarName = objXML.childNodes[i].tagName;

            //console.log("Deserialize obj parameter. Type:" + _Type + "; Name:" + _VarName);
            //try 
            //{
                if (_IsArray)
                {
                    _ArrayIndex = parseInt(_VarName.substring(4));
                    if (_Type == "string")
                    { 
                        if ( objXML.childNodes[i].firstChild) { _Value = objXML.childNodes[i].firstChild.data; }
                        else { _Value = ""; }
                        eval("_Obj[_ArrayIndex] = _Value;");
                    }
                    else if (_Type == "number")   
                    {
                        _Value = objXML.childNodes[i].firstChild.data;
                        eval("_Obj[_ArrayIndex] = parseInt(_Value);");
                    }
                    else if (_Type == "boolean")
                    { 
                        _Value = objXML.childNodes[i].firstChild.data;
						if (_Value.toLowerCase() == "true") _Value = true; 
						else _Value = false;

                        eval("_Obj[_ArrayIndex] = _Value;");
                    }
                    else 
                    {
                        _Value = this.DeserializeObject(objXML.childNodes[i]);
                        eval("_Obj[_ArrayIndex] = _Value;");
                    }
                }                 
                else if (_Type == "string")
                { 
                    if ( objXML.childNodes[i].firstChild) { _Value = objXML.childNodes[i].firstChild.data; }
                    else { _Value = ""; }
                    eval("_Obj." + _VarName + " = _Value;");
                }
                else if (_Type == "number")   
                {
                    _Value = objXML.childNodes[i].firstChild.data;
                    eval("_Obj." + _VarName + " = parseInt(_Value);");
                }
                else if (_Type == "boolean")
                { 
                    _Value = objXML.childNodes[i].firstChild.data;
					if (_Value.toLowerCase() == "true") _Value = true; 
					else _Value = false;                    
                    eval("_Obj." + _VarName + " = _Value;");
                }
                else 
                {
                    _Value = this.DeserializeObject(objXML.childNodes[i]);
                    eval("_Obj." + _VarName + " = _Value;");
                }   
            //}
            //catch(e) { }            
        }
        //console.log("Deserialize return obj:" , _Obj);
        return _Obj;
    }
}

function GeneralWindowSettings()
{
    //this.txWindow   = typeof win != 'undefined' ? win : null;
    this.Point  = new toolboxPoint();
    this.Size   = new toolboxSize();
    this.Title  = null;   
}

GeneralWindowSettings.prototype.Get = function(win, key)
{
    var _Key = typeof key  != 'undefined' ? key : 'Default';
    var _Val = txDimensions.GetDimensions(win, _Key);
    this.Point.X = _Val[3];
    this.Point.Y = _Val[2];
    this.Size.Height = _Val[0];
    this.Size.Width = _Val[1];
    
    this.Title = win.document.title;
}

GeneralWindowSettings.prototype.Set = function(win)
{
    win.moveTo(this.Point.X, this.Point.Y);
    //win.moveTo(this.Point.X, this.Point.Y);
    win.resizeTo(this.Size.Width, this.Size.Height);
    //win.resizeTo(this.Size.Width, this.Size.Height);
    win.document.title = this.Title;
}