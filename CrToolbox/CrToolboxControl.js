//_____________________________
//Toolbox Control
//---------------
//This file contains all the function use for creating controls.
//But not the controls it self. (and no drawn of things to)
//  *Dimensions:
//      -toolboxPoint           the X,Y coordinat of a control
//      -toolboxSize            the widht and the height of a control
//  *Containers:
//      -toolboxImage           Represent an image
//_____________________________
//Enums
//_____________________________
var txEnum =
{
    BtnType :
    {
        'DefaultBtn' : 0,
        'PictureBtn' : 1
    },
    Location : 
    {   
        'Right' : 1,
        'Center': 2,
        'Left'  : 3
    },
	Dock :
	{
		'Top' 	: 1,
		'Right' : 2,
		'Left' 	: 3,
		'Bottom': 4
	}  
}
var txTabControlPart = 
{
    'selector' : 0,
    'page' : 1
}

var HTML_TB_Enums =
{
    ButtonTypes :
    {
        'DefaultButton' : 0,
        'PictureButton' : 1,
        'Button'        : 2  //Compatibelty with HTML_Button
    },
    Location : 
    {   
        'Right' : 1,
        'Center': 2,
        'Left'  : 3
    },
    skin :
    {
        'UserDefined'   : 0,
        'Default'       : 1,
        'White'         : 2
    }
}

//Compatibelty with HTML_Button
function GetSkinExt(skin)
{
    switch(skin)
    {
        case HTML_TB_Enums.skin.Default:
            this.SkinExt = '';
            this.SkinId = HTML_TB_Enums.skin.Default;
            break;     
        case HTML_TB_Enums.skin.White:
            this.SkinExt = 'White';
            this.SkinId = HTML_TB_Enums.skin.White;
            break;                 
        default:
            this.SkinExt = skin;
            this.SkinId = HTML_TB_Enums.skin.UserDefined;
            break;                 
    }
    
    return this;
}
//_____________________________
//Dimensions
//_____________________________
function toolboxPoint(x, y)
{
    this.X  = typeof x  != 'undefined' ? x : 0;
    this.Y  = typeof y  != 'undefined' ? y : 0;
}
function toolboxSize(width, height)
{
    this.Width  = typeof width  != 'undefined' ? width : 0;
    this.Height = typeof height != 'undefined' ? height : 0;
}
//_____________________________
//Containers
//_____________________________
function toolboxImage(url, size, location)
{
    this.txURL      = typeof url  != 'undefined' ? url : "";
    this.txShow     = typeof show  != 'undefined' ? show : false;
    this.txSize     = typeof size  != 'undefined' ? size : new toolboxSize();
    this.txLocation = typeof location  != 'undefined' ? location : HTML_TB_Enums.Location.Left;
	this.txImg		= null;
}
toolboxImage.prototype.Create = function()
{
        var _txIconImg = document.createElement("img");
        _txIconImg.src = this.txURL; 
        //_txIconImg.alt = "";
        _txIconImg.style.width = this.txSize.Width;
        _txIconImg.style.height = this.txSize.Height;
        _txIconImg.style.border = "none";       
		this.txImg = _txIconImg;   
        return _txIconImg;    
}
toolboxImage.prototype.getImg = function()
{
        return this.txImg;    
}
toolboxImage.prototype.setUrl = function(url)
{
	if (!this.txImg) return;
	
	this.txImg.src = url;
}
//_____________________________
//Resize
//_____________________________
var OnToolboxResize = new toolboxMulticastDelegate();
function toolboxOnWindowResize()
{
	OnToolboxResize.Invoke();
}
window.onresize = toolboxOnWindowResize;
//_____________________________
//function object
//_____________________________
function findPos(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
	}
	//console.log("curleft:", curleft, ".curtop:", curtop);
	return [curleft,curtop];
}
//_____________________________
//Slider object
//_____________________________
var txSlider = {
    obj : null,
    init : function(o, oRoot, hMode, minVal, maxVal)
        {
            o.onmousedown = txSlider.start;
            findPos(o);
            o.root = oRoot && oRoot != null ? oRoot : o ;
            o.hMode = hMode ? true : false;
            o.minVal = typeof minVal != 'undefined' ? minVal : null;
            o.maxVal = typeof maxVal != 'undefined' ? maxVal : null;
            o.root.onSlideStart	= new Function();
            o.root.onSlideEnd	= new Function();
        },

    start : function(e)
        {
            //var _d;
            var o = txSlider.obj = this;
            e = txSlider.fixE(e);
            var pos = findPos(o);
            var y = pos[1];
            var x = pos[0];
            o.root.style.left = pos[0] + "px";
            o.root.style.top = pos[1] + "px";            
            o.lastMouseX	= e.clientX;
            o.lastMouseY	= e.clientY;
            o.startX	= e.clientX;
            o.startY	= e.clientY;
            o.root.onSlideStart(x, y);
            if (o.hMode)
            {
                if (o.minVal != null)	o.minMouse	= e.clientX - x + o.minVal;
                if (o.maxVal != null)	o.maxMouse	= o.minMouse + o.maxVal - o.minVal;
            }
            else
            {
                if (o.minVal != null)	o.minMouse	= e.clientY - y + o.minVal;
                if (o.maxVal != null)	o.maxMouse	= o.minMouse + o.maxVal - o.minVal;
            }
            o.style.position = "absolute";            
            document.onmousemove = txSlider.drag;
            document.onmouseup = txSlider.end;
        },
    drag : function(e)
        {
            e = txSlider.fixE(e);
            var o = txSlider.obj;
            var ey	= e.clientY;
            var ex	= e.clientX;
            var y = parseInt(o.root.style.top);
            var x = parseInt(o.root.style.left);
            var nx, ny;
            if(o.hMode)
            {
                if (o.minVal != null) ex = Math.max(ex, o.minMouse);
                if (o.maxVal != null) ex = Math.min(ex, o.maxMouse);
                
            }
            else
            {
                if (o.minVal != null) ey = Math.max(ey, o.minMouse);
                if (o.maxVal != null) ey = Math.min(ey, o.maxMouse);
            }
            nx = x + ex - o.lastMouseX;
            ny = y + ey - o.lastMouseY;
            if(o.hMode) { txSlider.obj.root.style["left"] = nx + "px"; }
            else { txSlider.obj.root.style["top"] = ny + "px"; }
            txSlider.obj.lastMouseX	= ex;
            txSlider.obj.lastMouseY	= ey;
            return false;
        },
        
    end : function(e)
        {
            ////debugger;
            var o = txSlider.obj;
            var _Size = o.hMode ? (parseInt(o.root.style.left) - o.startX) : (parseInt(o.root.style.top) - o.startY);
            document.onmousemove = null;
            document.onmouseup   = null;   
            txSlider.obj.root.style["position"] = "static";
            o.root.onSlideEnd(_Size, o);
            txSlider.obj = null;
        },

    fixE : function(e)
        {
            if (typeof e == 'undefined') e = window.event;
            if (typeof e.layerX == 'undefined') e.layerX = e.offsetX;
            if (typeof e.layerY == 'undefined') e.layerY = e.offsetY;
            return e;
        }
};
