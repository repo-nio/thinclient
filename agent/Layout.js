
var hoverElementClass = 'Hover';
var activeElementClass = 'Active';
var disabledElementClass = 'Disabled';
var disabledElementSourcePrefix = 'gray_';

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

function addSourcePrefix(control, prefix)
{
    var src = control.src;
    var pathSep = src.lastIndexOf('/') + 1;
    
    if(src.substring(pathSep, pathSep + prefix.length) == prefix)
        return;
        
    control.src = src.substring(0, pathSep) + prefix + src.substring(pathSep);
}

function removeSourcePrefix(control, prefix)
{
    var src = unescape(control.src);
    var pathSep = src.lastIndexOf('/') + 1;
    
    if(src.substring(pathSep, pathSep + prefix.length) != prefix)
        return;
        
    control.src = src.substring(0, pathSep) + src.substring(pathSep + prefix.length);
}

function FormatTime(milliseconds) 
{
    var sec = Math.floor(milliseconds/1000);
    //milliseconds = milliseconds % 1000
    //t = TimeThree(milliseconds)

    var min = Math.floor(sec/60);
    sec = sec % 60;
    //t = TimeTwo(sec) + ":" + t;
    t = TimeTwo(sec);

    var hr = Math.floor(min/60);
    min = min % 60;
    t = TimeTwo(min) + ":" + t;
    t = hr + ":" + t;
    
    //var day = Math.floor(hr/60);
    //hr = hr % 60;
    //t = TimeTwo(hr) + ":" + t;
    //t = day + ":" + t;

    return t;
}

function TimeTwo(x) {return ((x>9)?"":"0")+x}
function TimeThree(x) {return ((x>99)?"":"0")+((x>9)?"":"0")+x}
/*function FormatFloat(value, numDigitsAfterDecimal) 
{
    var _Value = 0;
    if (isNaN(value)) { _Value = 0 ;} else{  _Value = value; }
    
    var bNegative = false; var _ReturnValue = 0;
    var _Num = new Array();
    var i = 0;

    if (_Value < 0) { bNegative = true; _Value *= -1; }
    
    _Num = _Value.split(".");
    
    if(_Num.length < 1) _ReturnValue = 0;
    if(_Num.length >= 1) _ReturnValue = _Num[0];
    
    _ReturnValue += ".";
    var _ExtraNul = 0;
    if(_Num.length == 2)
    {
        var len = _Num[1].length;
        if (len >= numDigitsAfterDecimal)
        { 
            _ReturnValue += _Num[1].substring(0, numDigitsAfterDecimal - 1);
        }
        else
        {
            _ReturnValue += _Num[1];
            _ExtraNul = numDigitsAfterDecimal - len;
        }
    }
    else
    {
        _ExtraNul = len;
    }

    for (i = 0; i < _ExtraNul; i++)
    {
        _ReturnValue += "0";
    }
    
    return parseFloat(_ReturnValue);
}*/
function ChangeTrans(opacity, element) 
{
    var _Element = $(element);
    _Element.style.filter = "alpha(opacity=" + opacity + ")";
    _Element.style.opacity = (opacity / 100);
    _Element.style.MozOpacity = (opacity / 100);
    _Element.style.KhtmlOpacity = (opacity / 100);
}

function FadeOIEffect(element, opacStart, opacEnd, millisec) {
    //speed for each frame
    var speed = Math.round(millisec / 100);
    var timer = 0;

    //determine the direction for the blending, if start and end are the same nothing happens
    if(opacStart > opacEnd) {
        for(i = opacStart; i >= opacEnd; i--) {
            setTimeout("ChangeTrans(" + i + ",'" + element + "')",(timer * speed));
            timer++;
        }
    } else if(opacStart < opacEnd) {
        for(i = opacStart; i <= opacEnd; i++)
            {
            setTimeout("ChangeTrans(" + i + ",'" + element + "')",(timer * speed));
            timer++;
        }
    }
}