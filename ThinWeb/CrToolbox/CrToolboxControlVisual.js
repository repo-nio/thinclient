/*
____________________________
Toolbox visual Control
----------------------
This file contains all the controls, that can be used.
  	-User controls:
      	+toolboxButton          						Button control
		+toolboxTabControl								Tab control
			toolboxTabPages								Tabpage list object
			toolboxTabPage								Tabpage item object
			toolboxTabControlDefaultRenderManager		The default render for the tab control
		+toolboxPropertyGrid							Property grid control
			toolboxPropertyGridCategory					Property grid category list object
			toolboxPropertyGridCategoryItem				Property grid category item object
			toolboxPropertyGridPropertyItem				Property grid property item object
			toolboxPropertyGridDefaultRenderManager		The default render for the property grid
	-User Panels:
    	+toolboxForm    
_____________________________
User controls
_____________________________
*/
function toolboxButton(name, text, onclick)
{
    this.txLocation = new toolboxPoint();
    this.txSize     = new toolboxSize();
    this.txName     = typeof name       != 'undefined' ? name : "";
    this.txText     = typeof text       != 'undefined' ? text : "";
    this.txOnClick  = typeof onclick    != 'undefined' ? onclick : new Function('window.alert("this button does not have onclick")');
    this.txTooltip  = "";
    this.txParent   = window.document.body;
    this.txButtonType = txEnum.BtnType.DefaultBtn;
    this.txIcon     = new toolboxImage();
    this.txAbsolute = true;
    this.txAutoSize = true;
    this.txEnabled  = true;
    //Picture type button
    this.txButtonImage  = null;
    this.txImage        = new toolboxImage();
    this.txImageOver    = new toolboxImage();
    this.txImageFocus   = new toolboxImage();
    this.txImageDisabled= new toolboxImage(); 
    this.txAlt = "";
    this.txTitle = "";
    //Private
    this.txContainer;   //a
    this.txButtonLayout; //table
    this.txIconImg;//img    
    this.txContTitle;
    this.txContIcon;
}
toolboxButton.prototype.setOnClick = function(fnOnClick)
{
    if (!fnOnClick) return;
    
    this.txOnClick = fnOnClick;
    this.txContainer.onclick = this.txOnClick;
}
toolboxButton.prototype.Show = function()
{
    if (this.txButtonType == txEnum.BtnType.DefaultBtn)
    {
        this.DrawnDefaultButton();
    } else if (this.txButtonType == txEnum.BtnType.PictureBtn)
    {
        this.DrawnPictureButton();
    }
}
toolboxButton.prototype.Refresh = function()
{
    if (this.txButtonType == txEnum.BtnType.DefaultBtn)
    {
        this.RefreshDefaultButton();
    } else if (this.txButtonType == txEnum.BtnType.PictureBtn)
    {
        this.RefreshPictureButton();
    }
}
toolboxButton.prototype.setEnabled = function(bool)
{
    if (this.txEnabled == bool) return;
    
    if (this.txButtonType == txEnum.BtnType.DefaultBtn)
    {
        var len = this.txButtonLayout.rows[0].cells.length;
        if (bool) 
        { 
            removeElementClass(this.txButtonLayout.rows[0].cells[0], "DisLeft"); 
            for(var i = 1; i < len - 1; i++)
            { 
                removeElementClass(this.txButtonLayout.rows[0].cells[i], "DisBody");
            }
            removeElementClass(this.txButtonLayout.rows[0].cells[len - 1], "DisRight");
            this.txContainer.onclick = this.txOnClick;
            this.txEnabled = true; 
        } 
        else 
        { 
            addElementClass(this.txButtonLayout.rows[0].cells[0], "DisLeft"); 
            for(var i = 1; i < len - 1; i++)
            { 
                addElementClass(this.txButtonLayout.rows[0].cells[i], "DisBody");
            }
            addElementClass(this.txButtonLayout.rows[0].cells[len - 1], "DisRight");
            this.txContainer.onclick = function() { }; 
            this.txEnabled = false; 
        }  
    }
    else
    {
        if (bool) 
        { 
            this.txButtonImage.src = this.txImage.txURL;
            this.txContainer.onclick = this.txOnClick;
            this.txEnabled = true; 
        }
        else
        {
            this.txButtonImage.src = this.txImageDisabled.txURL;
            this.txContainer.onclick = function() { }; 
            this.txEnabled = false;         
        }
    }
}
toolboxButton.prototype.DrawnDefaultButton = function()
{
    var _Row; var _Cell; var _Img; var _tmpDiv;
    //Container because of the foucs (you don't have it on a table)
    this.txContainer = document.createElement("a");
    this.txContainer.id = this.txName;
    this.txContainer.className = "HTML_Button";
    if (this.txAbsolute) this.txContainer.style.position = "absolute"; 
    if (!this.txAutoSize) this.txContainer.style.overflow = "hidden";
    this.txContainer.style.width = this.txSize.Width;
    this.txContainer.style.height = this.txSize.Height;
    this.txContainer.style.left = this.txLocation.X;
    this.txContainer.style.top = this.txLocation.Y;
    
    this.txParent.appendChild(this.txContainer);
    //Main button table
    _Table = document.createElement("table");
    _Table.className = "HTML_Button";
    _Table.cellPadding = "0";
    _Table.cellSpacing = "0";
    this.txButtonLayout = _Table;
    this.txContainer.appendChild(_Table);
    
    var _btnRow; var _btnLeft; var _btnBody; var _btnRight;
    var _btnIcon;
    _btnRow = _Table.insertRow(-1);
    _btnLeft = _btnRow.insertCell(-1); _btnLeft.className = "BtnLeft";
    //_btnLeft.innerHTML = "&nbsp;";
    _tmpDiv = document.createElement("div");
    _tmpDiv.style.height = "5px";
    _tmpDiv.style.width = "5px";
    _btnLeft.appendChild(_tmpDiv);
    _btnIcon = _btnRow.insertCell(-1); _btnIcon.className = "BtnBody";
    
    if (this.txIcon.txShow && this.txIcon.txLocation == txEnum.Location.Left)
    {         
        this.txContIcon = this.txIcon.Create();
        _btnIcon.appendChild(this.txContIcon);               
    }
    
    _btnBody = _btnRow.insertCell(-1); _btnBody.className = "BtnBody";
    this.txContTitle = _btnBody;
    this.txContTitle.innerHTML = this.txText;

    if (this.txIcon.txShow && this.txIcon.txLocation == txEnum.Location.Right)
    {
        this.txContIcon = this.txIcon.Create();
        _btnIcon.appendChild(this.txContIcon);                  
    }
        
    _btnRight = _btnRow.insertCell(-1);  _btnRight.className = "BtnRight";
    _btnRight.innerHTML = "&nbsp;";
    
    _btnRow.onmouseover = function() { addElementClass(_btnLeft, "ActLeft"); addElementClass(_btnBody, "ActBody"); addElementClass(_btnRight, "ActRight"); addElementClass(_btnIcon, "ActBody"); };      
    _btnRow.onmouseout = function() { removeElementClass(_btnLeft, "ActLeft"); removeElementClass(_btnBody, "ActBody"); removeElementClass(_btnRight, "ActRight"); removeElementClass(_btnIcon, "ActBody"); };      
    this.txContainer.onfocus = function() { addElementClass(_btnLeft, "TabLeft"); addElementClass(_btnBody, "TabBody"); addElementClass(_btnRight, "TabRight"); addElementClass(_btnIcon, "TabBody"); };
    this.txContainer.onblur = function() { try { removeElementClass(_btnLeft, "TabLeft"); removeElementClass(_btnBody, "TabBody"); removeElementClass(_btnRight, "TabRight"); removeElementClass(_btnIcon, "TabBody"); } catch(e) { ; } };
    this.txContainer.onclick = this.txOnClick;
    this.txContainer.href = "javascript:{}";
}
toolboxButton.prototype.RefreshDefaultButton = function()
{
    this.txContTitle.innerHTML = this.txText;
    this.txContIcon.src = this.txIcon.txURL;
    this.txContainer.onclick = this.txOnClick;
}
toolboxButton.prototype.DrawnPictureButton = function()
{
    var _Row; var _Cell; var _Img;
    //Container because of the foucs (you don't have it on a table)
    this.txContainer = document.createElement("a");
    this.txContainer.id = this.txName;
    this.txContainer.className = "HTML_Button";
    if (this.txAbsolute) this.txContainer.style.position = "absolute"; 
    if (!this.txAutoSize) this.txContainer.style.overflow = "hidden";
    this.txContainer.style.width = this.txSize.Width;
    this.txContainer.style.height = this.txSize.Height;
    this.txContainer.style.left = this.txLocation.X;
    this.txContainer.style.top = this.txLocation.Y;
    
    this.txParent.appendChild(this.txContainer);
    
    var _ThisObj = this;
    this.txButtonImage = this.txImage.Create();
    this.txButtonImage.alt = this.txAlt;
    this.txButtonImage.title = this.txTitle;
    this.txContainer.appendChild(this.txButtonImage);

    this.txContainer.onmouseover = function() { if (_ThisObj.txEnabled) { _ThisObj.txButtonImage.src = _ThisObj.txImageOver.txURL; } };
    this.txContainer.onmouseout = function() { if (_ThisObj.txEnabled) { _ThisObj.txButtonImage.src = _ThisObj.txImage.txURL; } };
    this.txContainer.onfocus = function() { if (_ThisObj.txEnabled) { _ThisObj.txButtonImage.src = _ThisObj.txImageFocus.txURL; } };
    this.txContainer.onblur = function() { if (_ThisObj.txEnabled) { _ThisObj.txButtonImage.src = _ThisObj.txImage.txURL; } };
    this.txContainer.onclick = this.txOnClick;
    this.txContainer.href = "javascript:{}";
}
toolboxButton.prototype.RefreshPictureButton = function()
{
    if (this.txEnabled) 
    { this.txButtonImage.src = this.txImageDisabled.txURL; }
    else 
    { this.txButtonImage.src = this.txImage.txURL; }
    this.txContainer.onclick = this.txOnClick;
}
//<------------------------------------------------------------------------------------------------------------->
//<------------------------------------------------------------------------------------------------------------->
var txControlsFrom = new Array();
function toolboxForm(name)
{
    this.txParent = window.document.body;
    this.txName     = typeof name       != 'undefined' ? name : "";
    this.txLocation = new toolboxPoint();
    this.txSize     = new toolboxSize(250, 300);
    this.txMoveMin  = new toolboxPoint(this.txParent.offsetLeft, this.txParent.offsetTop);
    this.txMoveMax  = new toolboxPoint(this.txParent.clientWidth - 10, this.txParent.clientHeight - 10);
    //this.txHorMode  = typeof bSwapHorzRef   != 'undefined' ? bSwapHorzRef : null ;
    //this.txVerMode  = typeof bSwapVertRef   != 'undefined' ? bSwapVertRef : null ;
    //this.txXMapper  = typeof fXMapper       != 'undefined' ? fXMapper : null;
    //this.txYMapper  = typeof fYMapper       != 'undefined' ? fYMapper : null;
    this.txTitlebarExitButton = null;
    this.txVisible = false;
    this.txDocked = false;
    this.txResizeble = true
	this.txScroll = false;
    this.txFocus = true;
    this.txUseUserBackground = false;
    this.txUserBackgroundColor;
    this.txUserBackgroundImage;
    this.setDefaultBackground();
    //Private 
    this.txContainer = document.createElement("div");
    this.txControlHash = txControlsFrom.length;
    txControlsFrom[this.txControlHash] = this.txContainer;
    //Form Layout
    //      [[L][[DIV work area]][R]]     0.Title
    //      [[L][[DIV work area]][R]]     1.Work space
    //      [[L][Border bottom  ][R]]     2.Bottom
    this.txBlockLayout = new Array();
    this.txBorderLayout = new Array();
    this.txWorkArea = new Array();
    this.txBlockLayout[0]   = document.createElement("div");
    this.txBlockLayout[1]   = document.createElement("div");
    this.txBlockLayout[2]   = document.createElement("div");
    this.txBorderLayout[0]  = document.createElement("table");
    this.txBorderLayout[1]  = document.createElement("table");
    this.txBorderLayout[2]  = document.createElement("table");
    this.txWorkArea[0]      = document.createElement("div");
    this.txWorkArea[1]      = document.createElement("div");
    this.txResizeElement    = document.createElement("div");
    //Events
    this.OnClick = new Function(); 
    this.OnFocus = new Function();
    this.OnExit = new Function();
	this.onFormExit = new Function();
    this.OnResize = new Function(); 
}
toolboxForm.prototype.setDefaultBackground = function()
{
    this.txUserBackgroundColor = "#e0dfe3";
    this.txUserBackgroundImage = new toolboxImage("CrToolbox/HTML_Form/Background.png");
}
toolboxForm.prototype.setUserBackground = function(bool, color, image, parameters)
{
    var _Color = typeof color != 'undefined' ? color : false;
    var _Image = typeof image != 'undefined' ? image : false;
    var _Parameter = typeof parameters != 'undefined' ? parameters : false;

    if (bool)
    {
        this.txUseUserBackground = true;
        if (_Color) 
        {
            this.txUserBackgroundColor = _Color;
        }
        this.txBlockLayout[1].style.backgroundColor = this.txUserBackgroundColor;

        if (_Image)
        {   
            this.txUserBackgroundImage = new toolboxImage(_Image);
            this.txBlockLayout[1].style.backgroundImage = this.txUserBackgroundImage.txURL;
        }
        else this.txBlockLayout[1].style.backgroundImage = "none";
        
        
        if (_Parameter)
        {
            var len = _Parameter.length;
            for (var i = 0; i < len; i++) 
            { 
                this.txBlockLayout[1].style[_Parameter[i][0]] = _Parameter[i][1]; 
            }
        }
    }
    else
    {
        this.txUseUserBackground = false;
        this.setDefaultBackground();
        this.txBlockLayout[1].style.backgroundColor = this.txUserBackgroundColor;
        this.txBlockLayout[1].style.backgroundImage = this.backgroundImage.txURL;        
    }
}
toolboxForm.prototype.setVisibility = function(bool)
{
    if (bool) { removeElementClass(this.txContainer, 'Hide'); this.txVisible = true; } 
    else { addElementClass(this.txContainer, 'Hide'); this.txVisible = false; }
}
toolboxForm.prototype.setTitle = function(title) { this.txWorkArea[0].innerHTML = title; }
toolboxForm.prototype.setVisibilityExitButton = function(bool)
{
    if (bool) { removeElementClass(this.txTitlebarExitButton, 'Hide'); this.txVisible = true; } 
    else { addElementClass(this.txTitlebarExitButton, 'Hide'); this.txVisible = false; }
}
toolboxForm.prototype.setResizeble = function(bool)
{
    if (bool) { removeElementClass(this.txResizeElement, 'HideResize'); this.txResizeble = true; } 
    else { addElementClass(this.txResizeElement, 'HideResize'); this.txResizeble = false; }
}
toolboxForm.prototype.setScroll = function(bool)
{
	this.txScroll = bool;
    if (this.txScroll)
		this.txWorkArea[1].style.overflow = "auto";
	else
		this.txWorkArea[1].style.overflow = "hidden";
}
toolboxForm.prototype.Dock = function(bool)
{
    if (bool) { removeElementClass(this.txContainer, 'Drag'); this.txDocked = true; } 
    else { addElementClass(this.txContainer, 'Drag'); this.txDocked = false; }    
}
toolboxForm.prototype.SetFocus = function()
{
    for (var i = 0; i < txControlsFrom.length; i++)
    {
        if (txControlsFrom[i].id == this.id)
        {   txControlsFrom[i].style.zIndex = 10;
            removeElementClass(txControlsFrom[i].txForm.txBorderLayout[0].rows[0].cells[0], 'NofocusBLT');
            removeElementClass(txControlsFrom[i].txForm.txBorderLayout[0].rows[0].cells[1], 'NofocusBT');
            removeElementClass(txControlsFrom[i].txForm.txBorderLayout[0].rows[0].cells[2], 'NofocusExitbtn');
            removeElementClass(txControlsFrom[i].txForm.txBorderLayout[0].rows[0].cells[3], 'NofocusBRT');
            removeElementClass(txControlsFrom[i].txForm.txBorderLayout[1].rows[0].cells[0], 'NofocusBL');
            removeElementClass(txControlsFrom[i].txForm.txBorderLayout[1].rows[0].cells[2], 'NofocusBR');
            removeElementClass(txControlsFrom[i].txForm.txBorderLayout[2].rows[0].cells[0], 'NofocusBLB');
            removeElementClass(txControlsFrom[i].txForm.txBorderLayout[2].rows[0].cells[1], 'NofocusBB');
            removeElementClass(txControlsFrom[i].txForm.txBorderLayout[2].rows[0].cells[2], 'NofocusBRB');
            txControlsFrom[i].txForm.txFocus = true; txControlsFrom[i].txForm.txTitlebarExitButton.txForm = true;
        } else
        {   txControlsFrom[i].style.zIndex = 2;
            addElementClass(txControlsFrom[i].txForm.txBorderLayout[0].rows[0].cells[0], 'NofocusBLT');
            addElementClass(txControlsFrom[i].txForm.txBorderLayout[0].rows[0].cells[1], 'NofocusBT');
            addElementClass(txControlsFrom[i].txForm.txBorderLayout[0].rows[0].cells[2], 'NofocusExitbtn');
            addElementClass(txControlsFrom[i].txForm.txBorderLayout[0].rows[0].cells[3], 'NofocusBRT');            
            addElementClass(txControlsFrom[i].txForm.txBorderLayout[1].rows[0].cells[0], 'NofocusBL');
            addElementClass(txControlsFrom[i].txForm.txBorderLayout[1].rows[0].cells[2], 'NofocusBR');
            addElementClass(txControlsFrom[i].txForm.txBorderLayout[2].rows[0].cells[0], 'NofocusBLB');
            addElementClass(txControlsFrom[i].txForm.txBorderLayout[2].rows[0].cells[1], 'NofocusBB');
            addElementClass(txControlsFrom[i].txForm.txBorderLayout[2].rows[0].cells[2], 'NofocusBRB');
            txControlsFrom[i].txForm.txFocus = false; txControlsFrom[i].txForm.txTitlebarExitButton.txForm = false;
        }
    }
}
toolboxForm.prototype.Dispose = function()
{
    try 
    {
        this.txContainer.parentNode.removeChild(this.txContainer);                
    } catch (e) { ; }   
}
toolboxForm.prototype.Show = function()
{
    this.DrawnForm();
    addElementClass(this.txContainer, 'Drag');
    this.setVisibility(true);      
}
toolboxForm.prototype.Resize = function()
{
    var _Height = parseInt(this.txForm.txContainer.clientHeight) - parseInt(this.txForm.txBlockLayout[0].clientHeight) - parseInt(this.txForm.txBlockLayout[2].clientHeight);
    this.txForm.txBlockLayout[1].style.height = _Height + "px";
    this.txForm.txBorderLayout[1].style.height = _Height + "px";  
    this.txForm.txWorkArea[1].style.height = _Height + "px";
    this.txForm.OnResize(_Height);
}
toolboxForm.prototype.DrawnForm = function()
{
    var _Row, _Cell;
    //Container element
    this.txContainer.id = this.txName; 
    this.txContainer.className = "txForm";
    this.txContainer.style.height = this.txSize.Height;
    this.txContainer.style.width = this.txSize.Width;
    this.txContainer.style.top = this.txLocation.Y;
    this.txContainer.style.left = this.txLocation.X;
    this.txContainer.style.zIndex = 2;
    this.txContainer.txForm = this;
    this.txContainer.onclick = this.SetFocus;
    this.txParent.appendChild(this.txContainer);
    // --> Blocks
    this.txBlockLayout[0].id = "txFormBlockHeader"; this.txBlockLayout[0].className = "txFormBlockHeader";
    this.txBlockLayout[1].id = "txFormBlockWorkSpace"; this.txBlockLayout[1].className = "txFormBlockWorkSpace";
    this.txBlockLayout[2].id = "txFormBlockBottom"; this.txBlockLayout[2].className = "txFormBlockBottom";
    //Top section
    this.txBorderLayout[0].id = "txFormBorderHeader"; this.txBorderLayout[0].className = "txFormBorderHeader";
    this.txBorderLayout[0].cellSpacing = "0"; this.txBorderLayout[0].cellPadding = "0";
    _Row = this.txBorderLayout[0].insertRow(-1); _Cell = _Row.insertCell(-1); _Cell.className = "Border_Left_Top";
    _Cell = _Row.insertCell(-1); _Cell.className = "Top";
        this.txWorkArea[0].id = "HTML_Form_TitleElement"; this.txWorkArea[0].className = "txFormHeaderElement";
        _Cell.appendChild(this.txWorkArea[0]);
        this.setExitButton();
    _Cell = _Row.insertCell(-1); _Cell.className = "Border_Right_Top";
    this.txBlockLayout[0].appendChild(this.txBorderLayout[0]);
    //Midden section
    this.txBorderLayout[1].id = "txFormBorderWorkSpace"; this.txBorderLayout[1].className = "txFormBorderWorkSpace";
    this.txBorderLayout[1].cellSpacing = "0"; this.txBorderLayout[1].cellPadding = "0";
    _Row = this.txBorderLayout[1].insertRow(-1); _Cell = _Row.insertCell(-1); _Cell.className = "Border_Left";
    _Cell = _Row.insertCell(-1); _Cell.className = "Midden";
        this.txWorkArea[1].id = "txFormWorkSpaceElement"; this.txWorkArea[1].className = "txFormWorkSpaceElement";
		this.txWorkArea[1].txFromObj = this;
        _Cell.appendChild(this.txWorkArea[1]);
     _Cell = _Row.insertCell(-1); _Cell.className = "Border_Right";
     this.txBlockLayout[1].appendChild(this.txBorderLayout[1]);
    //Bottom section
    this.txBorderLayout[2].id = "txFormBorderBottom"; this.txBorderLayout[2].className = "txFormBorderBottom";
    this.txBorderLayout[2].cellSpacing = "0"; this.txBorderLayout[2].cellPadding = "0";
    _Row = this.txBorderLayout[2].insertRow(-1);  _Cell = _Row.insertCell(-1); _Cell.className = "Border_Left_Bottom";
    _Cell = _Row.insertCell(-1); _Cell.className = "Bottom"; _Cell.innerHTML = "&nbsp;";  
    _Cell = _Row.insertCell(-1); _Cell.className = "Border_Right_Bottom";
    this.txBlockLayout[2].appendChild(this.txBorderLayout[2]);
    
    this.txContainer.appendChild(this.txBlockLayout[0]);
    this.txContainer.appendChild(this.txBlockLayout[1]);
    this.txContainer.appendChild(this.txBlockLayout[2]);
    // --> Work space height
    var _Height = parseInt(this.txContainer.clientHeight) - parseInt(this.txBlockLayout[0].clientHeight) - parseInt(this.txBlockLayout[2].clientHeight);
    this.txBlockLayout[1].style.height = _Height + "px";
    this.txBorderLayout[1].style.height = _Height + "px";  
    this.txWorkArea[1].style.height = _Height + "px";  
    //this.WorkArea[1].style.height = "100%"; //because IE is adding the margin to the total height. this works in FF en IE
    // --> ResizeElement
    this.txResizeElement.id = "HTML_Form_ResizeElement"; this.txResizeElement.className = "txFormResizeElement";
    this.txContainer.appendChild(this.txResizeElement);
    // --> Drag function
    //(o, oRoot, minX, maxX, minY, maxY, bSwapHorzRef, bSwapVertRef, fXMapper, fYMapper)
    DragDiv.init(this.txContainer, this.txContainer, this.txMoveMin.X, this.txMoveMax.X, this.txMoveMin.Y, this.txMoveMax.Y);
    this.txContainer.onDragResize = this.Resize;
}
toolboxForm.prototype.setExitButton = function()
{
    var _Cell;
    _Cell = this.txBorderLayout[0].rows[0].insertCell(-1);
    _Cell.id = this.Id + "_ExitButton"; _Cell.className = "txFormExitButton";
    var _ThisObj = this;
    _Cell.onmouseover = function() { if (_ThisObj.txFocus) { addElementClass(_ThisObj.txTitlebarExitButton, 'ExitButtonHover'); } else { addElementClass(_ThisObj.txTitlebarExitButton, 'NofocusExitbtn_Mouseover'); } };
    _Cell.onmouseout = function() { if (_ThisObj.txFocus) { removeElementClass(_ThisObj.txTitlebarExitButton, 'ExitButtonHover'); } else { removeElementClass(_ThisObj.txTitlebarExitButton, 'NofocusExitbtn_Mouseover'); } };
    _Cell.onclick = function() 
    { 
        try
        {
            _ThisObj.setVisibility(false);
            _ThisObj.onFormExit();
			_ThisObj.OnExit();
        }
        catch (e)
        { 
            _ThisObj.setVisibility(false);
        }
    };
     
    this.txTitlebarExitButton = _Cell;    
}
//<------------------------------------------------------------------------------------------------------------->
//<------------------------------------------------------------------------------------------------------------->
//toolbox form button panel
//________________________________________________
function toolboxFormButtonPanel(name, parent)
{
	var mySelf = this;
	this.txParent = typeof parent != 'undefined' ? parent : null;
	this.txName = typeof name != 'undefined' ? name : "";
	this.txWorkSpace = null;
	this.txButtonSpace = null;
	this.txMenuSpace = null;
	this.txScroll = true;
	this.txControls = new Array();
	this.txsysControls = this;
	this.txbuttonBar = null;
	
	this.hasMenuRow = false;
	//this.hasWorkRow = true;
	//this.hasButtonRow = true;
	
	this.Resize = function(newHeight)
	{
		//debugger;
		/*var _Height = newHeight - parseInt(this.txsysControls.txButtonSpace.style.height);
		if (this.txsysControls.hasMenuRow)
			_Height = _Height - parseInt(this.txsysControls.txMenuSpace.style.height);
			
		this.txsysControls.txWorkSpace.style.height = _Height + "px";*/
		
		var _Height = newHeight - parseInt(mySelf.txButtonSpace.clientHeight);
		if (mySelf.hasMenuRow)
			_Height = _Height - parseInt(mySelf.txMenuSpace.clientHeight);
			
		//mySelf.txWorkSpace.style.height = _Height + "px";
		mySelf.txWorkSpace.style.height = "245px";
	}
}

toolboxFormButtonPanel.prototype.AddButton = function(id, text, onclick)
    {
        var buttonBar = $(this.txName + "_ButtonBarTable");
        var row; var cell; var img;
        if (!buttonBar)
        {
            buttonBar = document.createElement("table");
            buttonBar.id = this.txName + "_ButtonBarTable";
            buttonBar.className = "txBtnPanelButtonBar";
            buttonBar.cellPadding = "0"; buttonBar.cellSpacing = "0";
			
            this.txButtonSpace.appendChild(buttonBar);
            row = buttonBar.insertRow(-1);
        }
        if (!row) row = buttonBar.rows[0];
        
        cell = row.insertCell(-1);
        cell.id = id; //cell.className = 'ButtonCell';
        var index = this.txControls.length;
        var newButton = new toolboxButton(id, text, onclick);
		newButton.txParent = cell;
		newButton.txAbsolute = false; 
        newButton.Show();
		this.txControls[index] = newButton;
    } 
toolboxFormButtonPanel.prototype.Show = function()
{
	//debugger;
	this.DrawnPanel();
	if (this.txParent) 
	{
		this.txParent.style.hasLayout = true;
		this.txParent.hasLayout = true;
		if (this.txParent.txFromObj) 
		{
			this.txParent.txFromObj.OnResize = this.Resize;
			this.txParent.txFromObj.txsysControls = this;
			//this.Resize(parseInt(this.txParent.style.height));
			this.Resize(this.txParent.clientHeight);
		}
		else
			this.Resize(this.txParent.clientHeight);
	}
}
toolboxFormButtonPanel.prototype.setScroll = function(bool)
{
	this.txScroll = bool;
    if (this.txScroll)
		this.txWorkSpace.style.overflow = "auto";
	else
		this.txWorkSpace.style.overflow = "hidden";
}
toolboxFormButtonPanel.prototype.DrawnPanel = function()
{
	 var layout = document.createElement("table");
	 layout.cellSpacing = "0"; layout.cellPadding = "0";
	 layout.className = "txPanelBtn";
	 var row, cell, space;
	 
	 row = layout.insertRow(-1);
	 row.className = "txBtnPanelRow";
	 cell = row.insertCell(-1);
	 cell.className = "txBtnPanelWorkSpaceCell";
	 space = document.createElement("div");
	 space.className = "txBtnPaneWorkSpace";
	 cell.appendChild(space);
	 this.txWorkSpace = space;
	 this.txWorkSpace.innerHTML = "a";
	 
	 if(this.hasMenuRow)
	 {
		row = layout.insertRow(-1);
		 row.className = "txBtnPanelRow";
		 cell = row.insertCell(-1);
		 cell.className = "txBtnPanelMenuSpaceCell";
		 space = document.createElement("div");
		 space.className = "txBtnPaneMenuSpace";
		 cell.appendChild(space);
		 this.txMenuSpace = space;
	 }
	 
	 row = layout.insertRow(-1);
	 row.className = "txBtnPanelRow";
	 cell = row.insertCell(-1);
	 cell.className = "txBtnPanelButtonSpaceCell";
	 space = document.createElement("div");
	 space.className = "txBtnPaneButtonSpace";
	 cell.appendChild(space);
	 this.txButtonSpace = space;
	 
	 this.txParent.appendChild(layout);
	 
}
//<------------------------------------------------------------------------------------------------------------->
//TabControl
//________________________________________________
function toolboxTabControl(name)
{
    //For now the object needs the place of the selector and page control. If it is needed that the object is build complete it has to be made
    //this.txParent = window.document.body;
    this.txName     = typeof name       != 'undefined' ? name : "";
    this.txVisible = true;  
    //this.txLocation = new toolboxPoint();
    //this.txSize     = new toolboxSize(250, 300);
    //Private 
    this.txRenderManager    = toolboxTabControlDefaultRenderManager;
    this.txTabPages         = new toolboxTabPages(this);
	this.txSelectedTabPage = null;
	
    this.txParent = new Array();
    this.txParent[txTabControlPart.selector] = null;
    this.txParent[txTabControlPart.page] = null;
    this.txContainer = new Array();
    this.txContainer[txTabControlPart.selector] = document.createElement("div");
    this.txContainer[txTabControlPart.page] = document.createElement("div");
 	//Public
	this.txDock = txEnum.Dock.Left;
	this.txCustomTabButtonDraw = new Function();
    //Events
    this.OnTabPageChange    = new Function(); 
    this.OnTabPageAdded     = new Function();
	this.OnDockChange		= new Function();
	this.OnTabSelection		= new Function();
}
toolboxTabControl.prototype.SelectTabPage = function(key)
{
	//alert("OnClick tab:" + key);
	//debugger;
	var _NewKey = key;
	var _OldKey = null;
	
	if (this.txSelectedTabPage != null ) {
		if (this.txSelectedTabPage.txName == _NewKey) 
			return;
	}
	
	for(indexId in this.txTabPages.Items ) 
	{
		if(indexId == key)
		{
			removeElementClass(this.txTabPages.Items[indexId].txTabPage, 'TabPageHide');
		}
		else
		{
			addElementClass(this.txTabPages.Items[indexId].txTabPage, 'TabPageHide');
		}
	}
	
	if (this.txSelectedTabPage)
	{
		_OldKey = this.txSelectedTabPage.txName;
		this.txSelectedTabPage.txActive = false;
	}
	this.txSelectedTabPage = this.txTabPages.Items[_NewKey];
	this.txSelectedTabPage.txActive = true;
	this.OnTabSelection(_NewKey, _OldKey);
}
toolboxTabControl.prototype.getNoTabPageWindow = function()
{
	return $(this.txRenderManager.txTab_NoTabPage + this.txName);
}
toolboxTabControl.prototype.setNoTabPageVisibility = function()
{
	var _Control = $(this.txRenderManager.txTab_NoTabPage + this.txName);
	if (this.txTabPages.CountInUse() == 0)
	{
		removeElementClass(_Control, 'Hide');
	}	
	else
	{
		addElementClass(_Control, 'Hide');		
	}
}
toolboxTabControl.prototype.SetNewTabPage = function()
{
	//debugger;
	this.setNoTabPageVisibility();
	if (this.txTabPages.CountInUse() > 0) 
	{
		for(key in this.txTabPages.Items ) 
		{ 
			if (this.txTabPages.Items[key].txInUse) 
			{
				this.SelectTabPage(key);
				break;
			} 
		}
	}
}
toolboxTabControl.prototype.Show = function()
{
    this.txRenderManager.Init(this);
}
toolboxTabControl.prototype.SetDock = function(dock)
{
	if (!dock)return;
	if (dock == this.txDock) return;
	
	var _List = $('_TabList_' + this.txName);
	
	removeElementClass(_List, "DockRight");
	removeElementClass(_List, "DockLeft");
	removeElementClass(_List, "DockTop");
	removeElementClass(_List, "DockBottom");
	switch(dock)
	{
		case txEnum.Dock.Top:
			addElementClass(_List, "DockTop");		
			break;
		case txEnum.Dock.Right:
			addElementClass(_List, "DockRight");
			//this.SetDockRight();
			break;
		case txEnum.Dock.Left:
			addElementClass(_List, "DockLeft");
			//this.SetDockLeft();
			break;
		case txEnum.Dock.Bottom:
			addElementClass(_List, "DockBottom");
			//this.SetDockBottom();
			break;
		default:
			break;			
	}
	for (key in this.txTabPages.Items)
	{
		var _Item = this.txTabPages.Items[key].txTabButton;
		this.SetTabClassName(_Item, dock);
	}	
	var _OldDock = this.txDock;
	this.txDock = dock;
	this.OnDockChange(this.txDock, _OldDock);
}
toolboxTabControl.prototype.SetTabClassName = function(item, dock)
{
	if (!item) return;
	var _Dock = typeof dock != 'undefined' ? dock : this.txDock;
	
	removeElementClass(item, "DockTabbtnLeft");
	removeElementClass(item, "DockTabbtnTop");
	removeElementClass(item, "DockTabbtnBottom");
	removeElementClass(item, "DockTabbtnRight");
		
	switch(_Dock)
	{
		case txEnum.Dock.Left:
			addElementClass(item, "DockTabbtnLeft");
			break;
		case txEnum.Dock.Right:
			addElementClass(item, "DockTabbtnRight");
			break;
		case txEnum.Dock.Bottom:
			addElementClass(item, "DockTabbtnBottom");
			break;
		default:
			addElementClass(item, "DockTabbtnTop");
			break;
	}
}
//TabPages
//________________________________________________
function toolboxTabPages(parent)
{
    //For inherits
    this.Items = new Array();
	//Class data
	this.txParent = typeof parent != 'undefined' ? parent : null;
}
toolboxTabPages.inheritsFrom( CollectionBaseClass );
toolboxTabPages.prototype.Count = function()
{
	var _ReturnValue = 0;
	var _Items = this.Items;
	for(key in _Items ) { _ReturnValue++; }
	return _ReturnValue;
}
toolboxTabPages.prototype.CountInUse = function()
{
	var _ReturnValue = 0;
	var _Items = this.Items;
	for(key in _Items ) { if(_Items[key].txInUse) _ReturnValue++; }
	return _ReturnValue;
}
toolboxTabPages.prototype.GetNextFreeTab = function(type)
{
	var _ReturnValue = null;
	var _Items = this.Items;
	for(key in _Items ) 
	{
		if (_Items[key].txType == type) 
		{
			if (!_Items[key].txInUse) 
			{
				_ReturnValue = _Items[key];
				break;
			}
		}
	}
	return _ReturnValue;
}
toolboxTabPages.prototype.Add = function(item)
{
	if(!item) return false;
	if(this.Items[item.txName]) return false;
	
	item.txParent = this;
	//this.AddItem(item, item.txName);
	this.txParent.txRenderManager.DrawTab(this.AddItem(item, item.txName));
	this.txParent.setNoTabPageVisibility();
	item.txTabButton.onclick = function() { item.txParent.txParent.SelectTabPage(item.txName); }
	this.txParent.SetTabClassName(item.txTabButton, this.txParent.txDock);
	if (this.CountInUse() == 1) this.txParent.SelectTabPage(item.txName);
	//this.txParent.OnTabPageAdded(item);
}
//New
toolboxTabPages.prototype.Visible = function(item, bool)
{
	if(!item) return false;
	//T if(!bool) return false;
		
	this.txParent.txRenderManager.TabVisible(item);
	this.txParent.setNoTabPageVisibility();
	item.txTabButton.onclick = function() { item.txParent.txParent.SelectTabPage(item.txName); }
	this.txParent.SetTabClassName(item.txTabButton, this.txParent.txDock);
	if (this.CountInUse() == 1) this.txParent.SelectTabPage(item.txName);
	this.txParent.OnTabPageAdded(item);
}
//New
toolboxTabPages.prototype.Clear = function(key)
{
	if(!this.Items[key]) return;
	
	this.txParent.txRenderManager.ClearTab(this.Items[key]);
	//this.Items[key].txTabButton.onclick = null;
	this.Items[key]
	if (this.txParent.txSelectedTabPage)
	{
		if (this.txParent.txSelectedTabPage.txName == key)
		{
			this.txParent.txSelectedTabPage = null;
		}
	}
	this.txParent.SetNewTabPage();
}
toolboxTabPages.prototype.Remove = function(key)
{
	if(!this.Items[key]) return;
	
	this.txParent.txRenderManager.RemoveTab(this.Items[key]);
	this.Items[key].txParent = null;
	this.Items[key].txTabButton.onclick = null;
	
	PurgeElement(this.Items[key].txTabButton);
	this.Items[key].txTabButton = null;
	PurgeElement(this.Items[key].txTabPage);
	this.Items[key].txTabPage = null;
	
	this.RemoveItem(key);
	if (this.txParent.txSelectedTabPage)
	{
		if (this.txParent.txSelectedTabPage.txName == key)
		{
			this.txParent.txSelectedTabPage = null;
		}
	}
	this.txParent.SetNewTabPage();
}
//TabPage
//________________________________________________
function toolboxTabPage(name, parent)
{
    this.txName         = typeof name != 'undefined' ? name : "";
    this.txActive       = false;
    this.txTabPage     	= null;
	this.txTabButton   	= null;
	this.txInUse		= false;
	this.txIsVisible	= false;
	this.txType			= null;
    this.txDisplayIndex = null;
	this.txParent		= typeof parent != 'undefined' ? parent : null;
	this.txContactId	= null;
	this.txUserData 	= null;
}
//toolboxTabControlDefaultRenderManager
//________________________________________________
var toolboxTabControlDefaultRenderManager = 
{
	txTab_SelectorContainer: "_Selector_",
	txTab_SelectorList: "_TabList_",
	txTab_SelectorItem: "_TabItem_",
	txTab_PageContainer: "_Page_",
	
    Init : function(control)
    {
		//var control = new toolboxTabControl("");
		
		//Basic structur
     	toolboxTabControlDefaultRenderManager.DrawPageContainer(control);
		toolboxTabControlDefaultRenderManager.DrawTabButtonContainer(control);
		//Drawn tab
		var _Tabs = control.txTabPages.Items;
		var _Obj;
		for(_Obj in _Tabs)
		{
			toolboxTabControlDefaultRenderManager.DrawTab(_Tabs[_Obj]);
		}
		
    },
    DrawTabButtonContainer : function(control)
    {
		//var control = new toolboxTabControl("");
		
		var _Main = control.txContainer[txTabControlPart.selector]
		var _Id = control.txName;
		
		_Main.id = this.txTab_SelectorContainer + _Id;
		_Main.className = "txTabControlContainerSelector";
		/*_Main.innerHTML = "&nbsp;";*/
		var _Ul = document.createElement('ul');
		_Ul.id = this.txTab_SelectorList + _Id;
		_Ul.className ='txTabControlSelectorList';
		
		_Main.appendChild(_Ul);

		control.txParent[txTabControlPart.selector].appendChild(_Main);        
    },
    DrawPageContainer : function(control)
    {
		//var control = new toolboxTabControl("");
		
		var _Main = control.txContainer[txTabControlPart.page]
		var _Id = control.txName;
		
		_Main.id = this.txTab_PageContainer + _Id;
		_Main.className = "txTabControlContainerPage";
		_Main.innerHTML = "&nbsp;";
		
		var _NoTabContainer = document.createElement('div');
		//_NoTabContainer.id =  
		control.txParent[txTabControlPart.page].appendChild(_Main);
    },
	DrawTab : function(tab)
	{
		if (!tab) return;
		
		toolboxTabControlDefaultRenderManager.DrawPage(tab);
		toolboxTabControlDefaultRenderManager.DrawTabButton(tab);
	},
	RemoveTab : function(tab)
	{
		var _Element = $(this.txTab_SelectorItem + tab.txName); 
		
		_Element.parentNode.removeChild(_Element);
		
	},
    DrawTabButton : function(tab)
    {
		var _Id = tab.txName;
		
		var _Item = document.createElement("li");
		_Item.id = this.txTab_SelectorItem + _Id;
		_Item.className = "txTabControlTabButton";
		//TabButtonHover
		var _Div = document.createElement("div");
		_Div.className = "txTabControlDefaultButton";
		
		_Div.innerHTML = tab.txName;
		_Div.onmouseover = function(){ addElementClass(_Div, "TabButtonHover"); }
		_Div.onmouseout = function(){ removeElementClass(_Div, "TabButtonHover"); }
		
		_Item.appendChild(_Div);
		$(this.txTab_SelectorList + tab.txParent.txParent.txName).appendChild(_Item);
		
		tab.txParent.txParent.txCustomTabButtonDraw(tab);
		tab.txTabButton = _Item;
    },
    DrawPage : function(tab)
    {
        
    },	
    UpdateSelector : function()
    {
        
    }

}

//<------------------------------------------------------------------------------------------------------------->
//<------------------------------------------------------------------------------------------------------------->
//Property grid
//________________________________________________
function toolboxPropertyGrid(name)
{
	this.txParent = window.document.body;
    this.txName     = typeof name       != 'undefined' ? name : "";
    this.txLocation = new toolboxPoint();
    this.txSize     = new toolboxSize(250, 300);
	this.txAbsolute = true;
	this.txCategory = new toolboxPropertyGridCategory();
	
}
//Property grid category
//________________________________________________
function toolboxPropertyGridCategory()
{
    //For inherits
    this.Items = new Array();
	//Class data
	this.txParent;
	
	this.Add = function(item)
	{
		if(!item) return false;
		
		this.AddItems();
	}
}
toolboxPropertyGridCategory.inheritsFrom( CollectionBaseClass );
//Property grid category item
//________________________________________________
function toolboxPropertyGridCategoryItem()
{
    //For inherits
    this.Items = new Array();
	//Class data
	this.txName
	this.txParent;
}
toolboxPropertyGridCategoryItem.inheritsFrom( CollectionBaseClass );
//Property grid property item
//________________________________________________
function toolboxPropertyGridPropertyItem()
{
	this.txName;
	this.txProperty;
	this.txValue;
	this.txParent;	
}

//Default RenderManager
//________________________________________________

var toolboxPropertyGridDefaultRenderManager =
{
	
}
//<------------------------------------------------------------------------------------------------------------->
// List box
//________________________________________________
function toolboxListbox(name)
{
	//var mySelf = this;
	this.txParent = window.document.body;
    this.txName     = typeof name != 'undefined' ? name : "";
    this.txLocation = new toolboxPoint();
    this.txSize     = new toolboxSize(250, 300);
	this.txAbsolute = true;
	this.txList	= new toolboxListboxItems(this);
	this.txRenderManager = toolboxListBoxDefaultRenderManager;
	this.txAutoScroll = false;
	//this.txMouseOverClass = "";
	//this.txItemParClass = "";
	//this.txItemNoneParClass = "";
	this.txBoxCss = "";
	this.txOnClick = new toolboxMulticastDelegate();
	//this.txHoverCss = "";
	
	//this.OnResize = function()
	//{
		//debugger;	
	//	mySelf.txRenderManager.Resize(mySelf);
	//}
	//OnToolboxResize.Add(this, this.OnResize);
}
toolboxListbox.prototype.Show = function()
{
    this.txRenderManager.Init(this);
}

//List box items
//________________________________________________
function toolboxListboxItems(parent)
{
    //For inherits
    this.Items = new Array();
	//Class data
	this.txParent = typeof parent != 'undefined' ? parent : "";
	
	this.Add = function(item)
	{
		if(!item) return false;
		
		item.txParent = this;
		
		this.txParent.txRenderManager.DrawItem(this.AddItem(item));
	}
}
toolboxListboxItems.inheritsFrom( CollectionBaseClass );
//List box item
//________________________________________________
function toolboxListboxItem(parent)
{
	this.txIdent;
	this.txText;
	this.txIcon = new toolboxImage();
	this.txParent = typeof parent != 'undefined' ? parent : "";	
	this.txIconCss = "";
	this.txTextCss = "";
	this.txItemCss ="";
	this.txDoHover = true;
	this.txDoOnClick = true;
	this.txOnClick = new Function('');
	this.txData = "";
}

//Default RenderManager
//________________________________________________

var toolboxListBoxDefaultRenderManager =
{
	txListBox_ScrollContainer : "_ListBScrollContainer_",
	txListBox_ListContainer : "_ListBListContainer_",
	txListBox_List : "_ListBList_",
	txListBox_Item : "_ListBItem_",
	txListBox_ItemContainer : "_ListBItemContainer_",
	txListBox_ItemLayoutTable : "_ListBItemLayoutTable_",
	txListBox_ItemCellIcon : "_ListBItemCellIcon_",
	txListBox_ItemCellText : "_ListBItemCellText_",
	
    Init : function(control)
    {
		var _Scroll = document.createElement("div");
		var _Id = control.txName;
		
		_Scroll.id = this.txListBox_ScrollContainer + _Id;
		_Scroll.className = "txListBoxScrollContainer";
		
		var _ListCont = document.createElement("div");
		_ListCont.id = this.txListBox_ListContainer + _Id;
		_ListCont.className = "txListBoxListContainer " + control.txBoxCss;
		
		var _List = document.createElement("ul");
		_List.id = this.txListBox_List + _Id;
		_List.className = "txListBoxList"; 
		
		_ListCont.appendChild(_List);
		_Scroll.appendChild(_ListCont);
		control.txParent.appendChild(_Scroll);
    },
	
	Resize : function(listbox)
	{
		//debugger;
		var _Id = this.txListBox_ListContainer + listbox.txName;
		var obj = $(_Id);
		var w = obj.clientWidth - 2;
		obj.style.width = w + "px";
		var h = obj.clientHeight - 3;
		obj.clientHeight = h + "px";
	},
	
	DrawItem : function(item)
	{
		var _Id = item.txParent.txParent.txName + "_" + item.txParent.Items.length;
		var _Item = document.createElement("li");
		_Item.id = toolboxListBoxDefaultRenderManager.txListBox_Item + _Id;
		_Item.className = "txListBoxItem";

		var _ItemCont = document.createElement("div");
		_ItemCont.id = toolboxListBoxDefaultRenderManager.txListBox_ItemContainer + _Id;
		_ItemCont.className = "txListBoxItemContainer " + item.txItemCss;
		if (item.txDoHover) 
		{
			//var _tmpCss = 'HoverListBoxItem ' + item.txParent.txParent.txHoverCss;
			_ItemCont.onmouseover = function(){addElementClass(this, 'HoverListBoxItem'); };
			_ItemCont.onmouseout = function(){ removeElementClass(this, 'HoverListBoxItem'); };
		}
	
		
		var _Table = document.createElement("table");
		_Table.id = this.txListBox_ItemLayoutTable + _Id;
		_Table.className = 'txListBoxItemLayout';
		_Table.cellPadding = "0";
        _Table.cellSpacing = "0";
		_ItemCont.appendChild(_Table);
		
		var icon;
		var row, cell;
		var _ItemValue;
		row = _Table.insertRow(-1);
		cell = row.insertCell(-1);
		
		if(item.txIcon.txLocation == HTML_TB_Enums.Location.Left)
		 {
		 	cell.id = this.txListBox_ItemCellIcon + _Id;
			cell.className = "txListBoxItemCellIcon " + item.txIconCss;
			icon = item.txIcon.Create();
			cell.appendChild(icon);
			
			cell = row.insertCell(-1);
			cell.id = this.txListBox_ItemCellText + _Id;
			cell.className = "txListBoxItemCellText " + item.txTextCss;
			cell.innerHTML = item.txText;
			_ItemValue = cell;
			if (item.txDoHover) 
			{
				//var _tmpCss = 'HoverListBoxItem ' + item.txParent.txParent.txHoverCss;
				cell.onmouseover = function(){ addElementClass(this, 'HoverListBoxItem'); };
				cell.onmouseout = function(){ removeElementClass(this, 'HoverListBoxItem'); };
			}			
		 }
		 else
		 {
			cell.id = this.txListBox_ItemCellText + _Id;
			cell.className = "txListBoxItemCellText " + item.txTextCss;
			cell.innerHTML = item.txText;
			_ItemValue = cell;
			if (item.txDoHover) 
			{
				//var _tmpCss = 'HoverListBoxItem ' + item.txParent.txParent.txHoverCss;
				cell.onmouseover = function(){ addElementClass(this, 'HoverListBoxItem'); };
				cell.onmouseout = function(){ removeElementClass(this, 'HoverListBoxItem'); };
			}
						
			cell = row.insertCell(-1);
			cell.id = this.txListBox_ItemCellIcon + _Id;
			cell.className = "txListBoxItemCellIcon " + item.txIconCss;
			icon = item.txIcon.Create();
			cell.appendChild(icon);
		 }
		 _ItemValue.txData = item.txData;		 
		if (item.txDoOnClick)
		{
			_ItemCont.onclick = function() 
			{
				item.txParent.txParent.txOnClick.Invoke(_ItemValue.innerHTML, _ItemValue.txData);
			}
		}
 
		_Item.appendChild(_ItemCont);
		
		$(this.txListBox_List + item.txParent.txParent.txName).appendChild(_Item);
		
		var _Scroll = $(this.txListBox_ScrollContainer + item.txParent.txParent.txName);
    	_Scroll.scrollTop = _Scroll.scrollHeight;
	}
}

//<------------------------------------------------------------------------------------------------------------->
//<----------------------------- End new items ----------------------------------------------------------------->
//<------------------------------------------------------------------------------------------------------------->
//<--
// TO DO: mouseover removes the act flag from the button when it has de focus
// TO DO: mouseover is possible on when something has focus
// TO THINK: maybe an other effect for focus and the mouse over.
function HTML_Button(owner, name, text, onclick, tooltip)
{
    if (typeof owner != 'undefined')    { this.OwnerElement = $(owner) }    else { return; }
    if (typeof name != 'undefined')     { this.Name = name}                 else { return; }
    this.Id         = this.Name;
    this.Text       = typeof text       != 'undefined' ? text : "";
    this.Type       = typeof buttonType != 'undefined' ? buttonType : HTML_TB_Enums.ButtonTypes.Button;   
    this.fnOnclick  = typeof onclick    != 'undefined' ? onclick : new Function('window.alert("this button does not have onclick")');   
    this.Tooltip    = typeof tooltip    != 'undefined' ? tooltip : null;
    this.SetSkin(HTML_TB_Enums.skin.Default);
    this.Focus = false;
    this.IsEnabled = true;
    var ButtonLayout;
}

HTML_Button.prototype = 
{
    Show : function()
    {
        this.DrawButton();
    },
    
    setEnabled : function(bool)
    {
        if (this.IsEnabled == bool) return;
        if (bool) 
        { 
            removeElementClass(this.ButtonLayout.rows[0].cells[0], "DisLeft"); 
            removeElementClass(this.ButtonLayout.rows[0].cells[1], "DisBody"); 
            removeElementClass(this.ButtonLayout.rows[0].cells[2], "DisRight");
            this.Container.onclick = this.fnOnclick;
            this.IsEnabled = true; 
        } 
        else 
        { 
            addElementClass(this.ButtonLayout.rows[0].cells[0], "DisLeft"); 
            addElementClass(this.ButtonLayout.rows[0].cells[1], "DisBody"); 
            addElementClass(this.ButtonLayout.rows[0].cells[2], "DisRight");
            this.Container.onclick = function() { }; 
            this.IsEnabled = false; 
        }    
    },
    
    SetSkin : function(skin)
    {
        var _Return = GetSkinExt(skin)
        
        this.SkinExt = _Return.SkinExt;
        this.SkinId = _Return.SkinId;
    },
    
    DrawButton : function()
    {
        var _Row; var _Cell; var _Img;
        //Container because of the foucs (you don't have it on a table)
        this.Container = document.createElement("a");
        this.Container.id = this.Name;
        this.Container.className = "HTML_Button" + this.SkinExt;
        this.OwnerElement.appendChild(this.Container);
        //Main button table
        _Table = document.createElement("table");
        _Table.className = "HTML_Button" + this.SkinExt;
        _Table.cellPadding = "0";
        _Table.cellSpacing = "0";
        this.ButtonLayout = _Table;
        this.Container.appendChild(_Table);
        
        var _btnRow; var _btnLeft; var _btnBody; var _btnRight;
        _btnRow = _Table.insertRow(-1);
        _btnLeft = _btnRow.insertCell(-1); _btnLeft.className = "BtnLeft";
        addElementClass(_btnLeft, "V1")
        _btnLeft.innerHTML = "&nbsp;";
        
        _btnBody = _btnRow.insertCell(-1); _btnBody.className = "BtnBody";
        _btnBody.innerHTML = this.Text;
        
        _btnRight = _btnRow.insertCell(-1);  _btnRight.className = "BtnRight";
        _btnRight.innerHTML = "&nbsp;";
        
        _btnRow.onmouseover = function() { addElementClass(_btnLeft, "ActLeft"); addElementClass(_btnBody, "ActBody"); addElementClass(_btnRight, "ActRight"); };      
        _btnRow.onmouseout = function()  { removeElementClass(_btnLeft, "ActLeft"); removeElementClass(_btnBody, "ActBody"); removeElementClass(_btnRight, "ActRight"); };      
        this.Container.onfocus = function() { addElementClass(_btnLeft, "TabLeft"); addElementClass(_btnBody, "TabBody"); addElementClass(_btnRight, "TabRight");};
        this.Container.onblur = function() { removeElementClass(_btnLeft, "TabLeft"); removeElementClass(_btnBody, "TabBody"); removeElementClass(_btnRight, "TabRight");};
        //this.Container.onfocus = function() { addElementClass(_btnLeft, "ActLeft"); addElementClass(_btnBody, "ActBody"); addElementClass(_btnRight, "ActRight");};
        //this.Container.onblur = function() { removeElementClass(_btnLeft, "ActLeft"); removeElementClass(_btnBody, "ActBody"); removeElementClass(_btnRight, "ActRight");};
        this.Container.onclick = this.fnOnclick;
        this.Container.href = "javascript:{}";

    }
}
//BUTTON Collection class
//***********************
function HTML_Buttons() //Collection of buttons
{
    //For inherits
    this.Items = new Array();
    this.Keys = new Array();
}
HTML_Buttons.inheritsFrom( CollectionClass );
HTML_Buttons.prototype.Add = function(owner, name, text, onclick, tooltip)
{
    return this.AddItem(new HTML_Button(owner, name, text, onclick, tooltip), name);
}

//___________________________________________________________________________________
//FORM
//______
var txHTMLFroms_Array = new Array();
function HTML_Form(owner, id, height, width, minX, maxX, minY, maxY, bSwapHorzRef, bSwapVertRef, fXMapper, fYMapper)
{
    if (typeof owner != 'undefined')    { this.OwnerElement = $(owner) }    else { return; }
    if (typeof id != 'undefined')       { this.Id = id}                     else { return; }
    this.txHeight   = typeof height         != 'undefined' ? height : 300;
    this.txWidth    = typeof width          != 'undefined' ? width : 250;
    this.txHorMode  = typeof bSwapHorzRef   != 'undefined' ? bSwapHorzRef : null ;
    this.txVerMode  = typeof bSwapVertRef   != 'undefined' ? bSwapVertRef : null ;
    this.txMinX	    = typeof minX           != 'undefined' ? minX : this.OwnerElement.offsetLeft;
    this.txMinY	    = typeof minY           != 'undefined' ? minY : this.OwnerElement.offsetTop;
    this.txMaxX	    = typeof maxX           != 'undefined' ? maxX : this.OwnerElement.clientWidth;
    this.txMaxY	    = typeof maxY           != 'undefined' ? maxY : this.OwnerElement.clientHeight;
    this.txXMapper  = typeof fXMapper       != 'undefined' ? fXMapper : null;
    this.txYMapper  = typeof fYMapper       != 'undefined' ? fYMapper : null;
    this.setSkin(HTML_TB_Enums.skin.Default);
    this.Buttons = new HTML_Buttons();
    //--> Create container div
    this.MainContainer = document.createElement("div");
    this.ArrayIndex = txHTMLFroms_Array.length;
    txHTMLFroms_Array[txHTMLFroms_Array.length] = this.MainContainer;
    //Form Layout
    //[[L][[DIV work area]][R]]     0.Title
    //[[L][[DIV work area]][R]]     1.Work space
    //[[L][[DIV work area]][R]]     2.Button bar
    this.BlockLayout = new Array();
    this.BlockLayout[0] = document.createElement("div");
    this.BlockLayout[1] = document.createElement("div");
    this.BlockLayout[2] = document.createElement("div");
    this.BorderLayout = new Array();
    this.BorderLayout[0] = document.createElement("table");
    this.BorderLayout[1] = document.createElement("table");
    this.BorderLayout[2] = document.createElement("table");
    this.WorkArea = new Array();
    this.WorkArea[0] = document.createElement("div");
    this.WorkArea[1] = document.createElement("div");
    this.WorkArea[2] = document.createElement("div");
    this.ResizeElement =  document.createElement("div");
    //--> Class data
    this.TitlebarExitButton = null;
    this.IsVisible = false;
    this.IsDocked = false;
    this.IsResizeble = true
    this.IsFocus = false;
    this.OnClick = new Function(); 
    this.OnFocus = new Function();
    this.OnExit = new Function(); 
}

HTML_Form.prototype = 
{
    setTitle : function(title) { this.WorkArea[0].innerHTML = title; },
    setSkin : function(skin) 
    { 
        var _Return = GetSkinExt(skin); 
        this.SkinExt = _Return.SkinExt; 
        this.SkinId = _Return.SkinId; 
    }, 
    setVisibility : function(bool)
    {
        if (bool) { removeElementClass(this.MainContainer, 'Hide'); this.IsVisible = true; } 
        else { addElementClass(this.MainContainer, 'Hide'); this.IsVisible = false; }
    },
    setVisibilityExitButton : function(bool)
    {
        if (bool) { removeElementClass(this.TitlebarExitButton, 'Hide'); this.IsVisible = true; } 
        else { addElementClass(this.TitlebarExitButton, 'Hide'); this.IsVisible = false; }
    },
    setResizeble : function(bool)
    {
        if (bool) { removeElementClass(this.ResizeElement, 'HideResize'); this.IsResizeble = true; } 
        else { addElementClass(this.ResizeElement, 'HideResize'); this.IsResizeble = false; }
    },    
    Show : function()
    {
        this.Init();
        addElementClass(this.MainContainer, 'Drag');
        this.setVisibility(true);      
    },
    Dock : function(bool)
    {
        if (bool) { removeElementClass(this.MainContainer, 'Drag'); this.IsDocked = true; } 
        else { addElementClass(this.MainContainer, 'Drag'); this.IsDocked = false; }    
    },
    SetFocus : function()
    {
        for (var i = 0; i < txHTMLFroms_Array.length; i++)
        {
            if (txHTMLFroms_Array[i].id == this.id)
            {   txHTMLFroms_Array[i].style.zIndex = 10;
                removeElementClass(txHTMLFroms_Array[i].Form.BorderLayout[0].rows[0].cells[0], 'NofocusBLT');
                removeElementClass(txHTMLFroms_Array[i].Form.BorderLayout[0].rows[0].cells[1], 'NofocusBT');
                removeElementClass(txHTMLFroms_Array[i].Form.BorderLayout[0].rows[0].cells[2], 'NofocusExitbtn');
                removeElementClass(txHTMLFroms_Array[i].Form.BorderLayout[0].rows[0].cells[3], 'NofocusBRT');
                removeElementClass(txHTMLFroms_Array[i].Form.BorderLayout[1].rows[0].cells[0], 'NofocusBL');
                removeElementClass(txHTMLFroms_Array[i].Form.BorderLayout[1].rows[0].cells[2], 'NofocusBR');
                removeElementClass(txHTMLFroms_Array[i].Form.BorderLayout[2].rows[0].cells[0], 'NofocusBLB');
                removeElementClass(txHTMLFroms_Array[i].Form.BorderLayout[2].rows[0].cells[1], 'NofocusBB');
                removeElementClass(txHTMLFroms_Array[i].Form.BorderLayout[2].rows[0].cells[2], 'NofocusBRB');
                txHTMLFroms_Array[i].Form.IsFocus = true; txHTMLFroms_Array[i].Form.TitlebarExitButton.IsFocus = true;
            } else
            {   txHTMLFroms_Array[i].style.zIndex = 1;
                addElementClass(txHTMLFroms_Array[i].Form.BorderLayout[0].rows[0].cells[0], 'NofocusBLT');
                addElementClass(txHTMLFroms_Array[i].Form.BorderLayout[0].rows[0].cells[1], 'NofocusBT');
                addElementClass(txHTMLFroms_Array[i].Form.BorderLayout[0].rows[0].cells[2], 'NofocusExitbtn');
                addElementClass(txHTMLFroms_Array[i].Form.BorderLayout[0].rows[0].cells[3], 'NofocusBRT');            
                addElementClass(txHTMLFroms_Array[i].Form.BorderLayout[1].rows[0].cells[0], 'NofocusBL');
                addElementClass(txHTMLFroms_Array[i].Form.BorderLayout[1].rows[0].cells[2], 'NofocusBR');
                addElementClass(txHTMLFroms_Array[i].Form.BorderLayout[2].rows[0].cells[0], 'NofocusBLB');
                addElementClass(txHTMLFroms_Array[i].Form.BorderLayout[2].rows[0].cells[1], 'NofocusBB');
                addElementClass(txHTMLFroms_Array[i].Form.BorderLayout[2].rows[0].cells[2], 'NofocusBRB');
                txHTMLFroms_Array[i].Form.IsFocus = false; txHTMLFroms_Array[i].Form.TitlebarExitButton.IsFocus = false;
            }
        }
    },
    Resize : function()
    {
        var _Height = parseInt(this.Form.MainContainer.clientHeight) - parseInt(this.Form.BlockLayout[0].clientHeight) - parseInt(this.Form.BlockLayout[2].clientHeight);
        this.Form.BlockLayout[1].style.height = _Height + "px";
        this.Form.BorderLayout[1].style.height = _Height + "px";  
        this.Form.WorkArea[1].style.height = _Height + "px";         
    },    
    Init : function()
    {
        var _Row, _Cell;
        //MainContainer element
        this.MainContainer.id = this.Id; this.MainContainer.className = "HTML_Form" + this.SkinExt;
        this.MainContainer.style.height = this.txHeight;
        this.MainContainer.style.width = this.txWidth;
        this.MainContainer.style.top = this.txMinY;
        this.MainContainer.style.left = this.txMinX;
        this.MainContainer.Form = this;
        this.MainContainer.onclick = this.SetFocus;
        this.OwnerElement.appendChild(this.MainContainer);
        // --> Blocks
        this.BlockLayout[0].id = "HTML_Form_BlockDrag"; this.BlockLayout[0].className = "HTML_Form_BlockDrag" + this.SkinExt;
        this.BlockLayout[1].id = "HTML_Form_BlockWorkSpace"; this.BlockLayout[1].className = "HTML_Form_BlockWorkSpace" + this.SkinExt;
        this.BlockLayout[2].id = "HTML_Form_BlockButtonbar"; this.BlockLayout[2].className = "HTML_Form_BlockButtonbar" + this.SkinExt;
        //Top section
        this.BorderLayout[0].id = "HTML_Form_BorderDrag"; this.BorderLayout[0].className = "HTML_Form_BorderDrag" + this.SkinExt;
        this.BorderLayout[0].cellSpacing = "0"; this.BorderLayout[0].cellPadding = "0";
        _Row = this.BorderLayout[0].insertRow(-1); _Cell = _Row.insertCell(-1); _Cell.className = "Border_Left_Top" + this.SkinExt;  
        _Cell = _Row.insertCell(-1); _Cell.className = "Top" + this.SkinExt;
            this.WorkArea[0].id = "HTML_Form_TitleElement"; this.WorkArea[0].className = "HTML_Form_TitleElement" + this.SkinExt;
            _Cell.appendChild(this.WorkArea[0]);
            this.addExitButton();
        _Cell = _Row.insertCell(-1); _Cell.className = "Border_Right_Top" + this.SkinExt;
        this.BlockLayout[0].appendChild(this.BorderLayout[0]);
        //Midden section
        this.BorderLayout[1].id = "HTML_Form_BorderWorkSpace"; this.BorderLayout[1].className = "HTML_Form_BorderWorkSpace" + this.SkinExt;
        this.BorderLayout[1].cellSpacing = "0"; this.BorderLayout[1].cellPadding = "0";
        _Row = this.BorderLayout[1].insertRow(-1); _Cell = _Row.insertCell(-1); _Cell.className = "Border_Left" + this.SkinExt;   
        _Cell = _Row.insertCell(-1); _Cell.className = "Midden" + this.SkinExt;
            this.WorkArea[1].id = "HTML_Form_WorkSpaceElement"; this.WorkArea[1].className = "HTML_Form_WorkSpaceElement" + this.SkinExt;  
            _Cell.appendChild(this.WorkArea[1]);
         _Cell = _Row.insertCell(-1); _Cell.className = "Border_Right" + this.SkinExt;
         this.BlockLayout[1].appendChild(this.BorderLayout[1]);
        //Bottom section
        this.BorderLayout[2].id = "HTML_Form_BorderButtonbar"; this.BorderLayout[2].className = "HTML_Form_BorderButtonbar" + this.SkinExt;
        this.BorderLayout[2].cellSpacing = "0"; this.BorderLayout[2].cellPadding = "0";
        _Row = this.BorderLayout[2].insertRow(-1);  _Cell = _Row.insertCell(-1); _Cell.className = "Border_Left_Bottom" + this.SkinExt;  
        _Cell = _Row.insertCell(-1); _Cell.className = "Bottom" + this.SkinExt;
            this.WorkArea[2].id = "HTML_Form_ButtonBarElement"; this.WorkArea[2].className = "HTML_Form_Buttonbar" + this.SkinExt;  
            _Cell.appendChild(this.WorkArea[2]);    
        _Cell = _Row.insertCell(-1); _Cell.className = "Border_Right_Bottom" + this.SkinExt;
        this.BlockLayout[2].appendChild(this.BorderLayout[2]);
        
        this.MainContainer.appendChild(this.BlockLayout[0]);
        this.MainContainer.appendChild(this.BlockLayout[1]);
        this.MainContainer.appendChild(this.BlockLayout[2]);
//debugger;
        // --> Work space height
        var _Height = parseInt(this.MainContainer.clientHeight) - parseInt(this.BlockLayout[0].clientHeight) - parseInt(this.BlockLayout[2].clientHeight);
        this.BlockLayout[1].style.height = _Height + "px";
        this.BorderLayout[1].style.height = _Height + "px";  
        this.WorkArea[1].style.height = _Height + "px";  
        //this.WorkArea[1].style.height = "100%"; //because IE is adding the margin to the total height. this works in FF en IE
        // --> ResizeElement
        this.ResizeElement.id = "HTML_Form_ResizeElement"; this.ResizeElement.className = "HTML_Form_ResizeElement" + this.SkinExt;    
        this.MainContainer.appendChild(this.ResizeElement);
        // --> Drag function
        //(o, oRoot, minX, maxX, minY, maxY, bSwapHorzRef, bSwapVertRef, fXMapper, fYMapper)
        DragDiv.init(this.MainContainer, this.MainContainer, this.txMinX, this.txMaxX, this.txMinY, this.txMaxY, this.txHorMode, this.txVerMode, this.txXMapper, this.txYMapper);
        this.MainContainer.onDragResize = this.Resize;
    },
    
    addExitButton : function()
    {
        //if (!this.Titlebar) return;
        //if (this.Titlebar.rows.length < 1) return;
        
        var _Cell;
        _Cell = this.BorderLayout[0].rows[0].insertCell(-1);
        _Cell.id = this.Id + "_ExitButton"; _Cell.className = "ExitButton" + this.SkinExt;
        _Cell.onmouseover = function() { if (this.IsFocus) { addElementClass(this, 'ExitButtonHover'); } else { addElementClass(this, 'NofocusExitbtn_Mouseover'); } };
        _Cell.onmouseout = function() { if (this.IsFocus) { removeElementClass(this, 'ExitButtonHover'); } else { removeElementClass(this, 'NofocusExitbtn_Mouseover'); } };
        _Cell.onclick = function() 
        { 
            var _Form;
            try
            {
                _Form = this.offsetParent.offsetParent.Form; 
                _Form.setVisibility(false);
                _Form.OnExit();
            }
            catch (e)
            {
                _Form = this.offsetParent.parentNode.parentNode.Form; 
                _Form.setVisibility(false);
                _Form.OnExit();
            }
        };
         
        this.TitlebarExitButton = _Cell;    
    },
        
    AddButton : function(id, text, onclick, skin)
    {
        var _Skin = typeof skin != 'undefined' ? skin : this.SkinId;
        var _ButtonBar = $(this.Id + "_ButtonBarTable");
        var _Row; var _Cell; var _Img;
        if (!_ButtonBar)
        {
            _ButtonBar = document.createElement("table");
            _ButtonBar.id = this.Id + "_ButtonBarTable";
            _ButtonBar.className = "HTML_Form_ButtonBar" + this.SkinExt;
            
            this.WorkArea[2].appendChild(_ButtonBar);
            _ButtonBar.cellPadding = "0";
            _ButtonBar.cellSpacing = "0";
            _Row = _ButtonBar.insertRow(-1);
        }
        if (!_Row) _Row = _ButtonBar.rows[0];
        
        _Cell = _Row.insertCell(-1);
        _Cell.id = id; _Cell.className = 'ButtonCell' + this.SkinExt;
        
        var _NewButtonIndex = this.Buttons.Add(_Cell, this.Id + "_" + id, text, onclick);
        _NewButtonIndex.SetSkin(_Skin);
        _NewButtonIndex.Show();
    }      
}
//___________________________________________________________________________________
//ToolStrip
//_________
function HTML_ToolStrip(owner, id)
{
    this.OwnerElement = owner;
    this.Id = id;
}
HTML_ToolStrip.prototype = 
{
    Show : function()
    {
        this.Show
    }
}

//___________________________________________________________________________________
//DragDiv
//_______
var txDragElementId = "HTML_Form_TitleElement";
var txResizeElementId = "HTML_Form_ResizeElement";
var DragDiv = {
    defaultWindow : null,
    obj : null,
    init : function(o, oRoot, minX, maxX, minY, maxY, bSwapHorzRef, bSwapVertRef, fXMapper, fYMapper)
        {
            //console.log("drag init");
            o.onmousedown	= DragDiv.start;
            o.hmode			= bSwapHorzRef ? false : true ;
            o.vmode			= bSwapVertRef ? false : true ;
            o.root = oRoot && oRoot != null ? oRoot : o ;
            if (o.hmode  && isNaN(parseInt(o.root.style.left  ))) o.root.style.left   = "0px";
            if (o.vmode  && isNaN(parseInt(o.root.style.top   ))) o.root.style.top    = "0px";
            if (!o.hmode && isNaN(parseInt(o.root.style.right ))) o.root.style.right  = "0px";
            if (!o.vmode && isNaN(parseInt(o.root.style.bottom))) o.root.style.bottom = "0px";
            o.minX	= typeof minX != 'undefined' ? minX : null;
            o.minY	= typeof minY != 'undefined' ? minY : null;
            o.maxX	= typeof maxX != 'undefined' ? maxX : null;
            o.maxY	= typeof maxY != 'undefined' ? maxY : null;
            o.xMapper = fXMapper ? fXMapper : null;
            o.yMapper = fYMapper ? fYMapper : null;
            o.root.onDragStart	= new Function();
            o.root.onDragEnd	= new Function();
            o.root.onDrag		= new Function();
            o.root.onDragResize = new Function();
            o.IsDrag = false;
            o.IsResize = false;
        },

    start : function(e)
        {
            var _d;
			try 
            {
				$Del("txMoveContainer");
                //_d = $("txMoveContainer");
                //_d.parentNode.removeChild(_d);                
            } catch (err) { ; }
			
            var o = DragDiv.obj = this;
            //if (e.layerY > 27) return false;
            var _Action = "";
            //debugger;
            //console.log("Drag start");
            if (o.IsDrag || o.IsResize)
            {
                if (o.IsDrag) _Action = 'Drag';
                if (o.IsResize) _Action = 'Resize';
            } else
            {
                if (e)
                { if (e.target.id == txDragElementId) _Action = 'Drag'; } else
                { if (window.event.srcElement.id == txDragElementId) _Action = 'Drag'; }  //For IE 7
                if (!_Action)
                { if (e)
                    { if (e.target.id == txResizeElementId) _Action = 'Resize'; } else
                    { if (window.event.srcElement.id == txResizeElementId) _Action = 'Resize'; } //For IE 7 }
                }              
            }
            if (_Action)
            {
    //            console.log("Drag start action: " + _Action);
                e = DragDiv.fixE(e);
                
                var y = parseInt(o.vmode ? o.root.style.top  : o.root.style.bottom);
                var x = parseInt(o.hmode ? o.root.style.left : o.root.style.right );
                o.root.onDragStart(x, y);
                o.lastMouseX	= e.clientX;
                o.lastMouseY	= e.clientY;
                if (o.hmode) 
                {
                    if (o.minX != null)	o.minMouseX	= e.clientX - x + o.minX;
                    if (o.maxX != null)	o.maxMouseX	= o.minMouseX + o.maxX - o.minX;
                } else 
                {
                    if (o.minX != null) o.maxMouseX = -o.minX + e.clientX + x;
                    if (o.maxX != null) o.minMouseX = -o.maxX + e.clientX + x;
                }
                if (o.vmode) 
                {
                    if (o.minY != null)	o.minMouseY	= e.clientY - y + o.minY;
                    if (o.maxY != null)	o.maxMouseY	= o.minMouseY + o.maxY - o.minY;
                } else 
                {
                    if (o.minY != null) o.maxMouseY = -o.minY + e.clientY + y;
                    if (o.maxY != null) o.minMouseY = -o.maxY + e.clientY + y;
                }

                _d = document.createElement("DIV");
                _d.id = "txMoveContainer";
                _d.style.backgroundColor = "transparent"; //"transparent";
                _d.style.position = "absolute";
                _d.style.zIndex = 1;
                _d.style.left = o.minX;
                _d.style.top = o.minY;
                _d.style.height = o.maxY - o.minY;
                _d.style.width = o.maxX - o.minX;
                                    
                if (_Action == 'Drag')
                {
                    document.body.appendChild(_d);
                    o.IsDrag = true;
                    document.onmousemove = DragDiv.drag;
                    document.onmouseup = DragDiv.end;
                }
                else if (_Action == 'Resize')
                {
                    document.body.appendChild(_d);
                    o.IsResize = true;
                    document.onmousemove = DragDiv.resize;
                    document.onmouseup = DragDiv.end;                        
                }
                return false;
            }
        },
    resize : function(e)
        {
            //console.log("Drag resize before: ", e);
            e = DragDiv.fixE(e); 
            var o = DragDiv.obj;
            //console.log("Drag resize:", e);
//            console.log("Drag resize object o:", o);
            var ey	= e.clientY;
            var ex	= e.clientX;
            var y = parseInt(o.root.style.height ? o.root.style.height : o.root.clientHeight);
            var x = parseInt(o.root.style.width ? o.root.style.width : o.root.clientWidth);
            //console.log("Drag x y:", x, y);
            var nx, ny;
            /*
            if (o.minX != null) ex = o.hmode ? Math.max(ex, o.minMouseX) : Math.min(ex, o.maxMouseX);
            if (o.maxX != null) ex = o.hmode ? Math.min(ex, o.maxMouseX) : Math.max(ex, o.minMouseX);
            if (o.minY != null) ey = o.vmode ? Math.max(ey, o.minMouseY) : Math.min(ey, o.maxMouseY);
            if (o.maxY != null) ey = o.vmode ? Math.min(ey, o.maxMouseY) : Math.max(ey, o.minMouseY);*/

            nx = x + (ex - o.lastMouseX);
            ny = y + (ey - o.lastMouseY);
            if (o.xMapper)		nx = o.xMapper(y)
            else if (o.yMapper)	ny = o.yMapper(x) 
            //console.log("Drag nx ny:", nx, ny); 
            DragDiv.obj.root.style["width"] = nx + "px";
            DragDiv.obj.root.style["height"] = ny + "px"; 
            DragDiv.obj.lastMouseX	= ex;
            DragDiv.obj.lastMouseY	= ey;
            DragDiv.obj.root.onDragResize(nx, ny);                                                                                   
        },
    drag : function(e)
        {
            //console.log("Drag event before fix:", e);
            e = DragDiv.fixE(e);
            //console.log("Drag event:", e);
            var o = DragDiv.obj;
            var ey	= e.clientY;
            var ex	= e.clientX;
            var y = parseInt(o.vmode ? o.root.style.top  : o.root.style.bottom);
            var x = parseInt(o.hmode ? o.root.style.left : o.root.style.right );
            var nx, ny;
            if (o.minX != null) ex = o.hmode ? Math.max(ex, o.minMouseX) : Math.min(ex, o.maxMouseX);
            if (o.maxX != null) ex = o.hmode ? Math.min(ex, o.maxMouseX) : Math.max(ex, o.minMouseX);
            if (o.minY != null) ey = o.vmode ? Math.max(ey, o.minMouseY) : Math.min(ey, o.maxMouseY);
            if (o.maxY != null) ey = o.vmode ? Math.min(ey, o.maxMouseY) : Math.max(ey, o.minMouseY);
            nx = x + ((ex - o.lastMouseX) * (o.hmode ? 1 : -1));
            ny = y + ((ey - o.lastMouseY) * (o.vmode ? 1 : -1));
            if (o.xMapper)		nx = o.xMapper(y)
            else if (o.yMapper)	ny = o.yMapper(x)
            DragDiv.obj.root.style[o.hmode ? "left" : "right"] = nx + "px";
            DragDiv.obj.root.style[o.vmode ? "top" : "bottom"] = ny + "px";
            DragDiv.obj.lastMouseX	= ex;
            DragDiv.obj.lastMouseY	= ey;
            DragDiv.obj.root.onDrag(nx, ny);
            return false;
        },
        
    end : function()
        {
            try { DragDiv.obj.Form.SetFocus();} catch(error) {;}
            var _d 
            try 
            {
				$Del("txMoveContainer");
                //_d = $("txMoveContainer");
                //_d.parentNode.removeChild(_d);                
            } catch (e) { ; }
            
            document.onmousemove = null;
            document.onmouseup   = null;
            DragDiv.obj.IsDrag = false;
            DragDiv.obj.IsResize = false;            
            DragDiv.obj.root.onDragEnd(	parseInt(DragDiv.obj.root.style[DragDiv.obj.hmode ? "left" : "right"]), 
            parseInt(DragDiv.obj.root.style[DragDiv.obj.vmode ? "top" : "bottom"]));
            DragDiv.obj = null;
        },

    fixE : function(e)
        {
            if (typeof e == 'undefined') e = window.event;
            if (typeof e.layerX == 'undefined') e.layerX = e.offsetX;
            if (typeof e.layerY == 'undefined') e.layerY = e.offsetY;
            return e;
        }
};

//___________________________________________________________________________________
//Header
//______

var HTML_Header =  {
    setHeader : function (header, text)
    {
        if (!header) return;
        header.className = 'HTML_Header';
        header.onmouseover = function(){ addElementClass(this, 'HTML_Header_Mouseover'); };
        header.onmouseout = function() { removeElementClass(this, 'HTML_Header_Mouseover'); };
        header.innerHTML = text;
    }
}; 