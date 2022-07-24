var hoverElementClass = 'Hover';
var activeElementClass = 'Active';
var disabledElementClass = 'Disabled';
var disabledElementSourcePrefix = '';
var toggleOnElementSourceSuffix = '_toggle';

function disableToolStrip(toolstrip)
{
	for(var i = 0; i < toolstrip.childNodes.length; i++)
    {
        if(toolstrip.childNodes[i].className)
        {
            if(toolstrip.childNodes[i].className == "NixxisButton")
            {
                disableToolStripItem($(toolstrip.childNodes[i].id));
            }
        }
		disableToolStrip(toolstrip.childNodes[i])
    }	
}
function disableToolStripItem(toolstripItem)
{
	addSourcePrefix(toolstripItem, disabledElementSourcePrefix);
}
function toggleOnToolStripItem(toolstripItem)
{
	addSourceSuffix(toolstripItem, toggleOnElementSourceSuffix);
}
function toggleOffToolStripItem(toolstripItem)
{
	removeSourceSuffix(toolstripItem, toggleOnElementSourceSuffix);
}
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
    for(var i = 0; i < lst.length; i++) 
	{
		if(lst[i] == className) 
		{ 
			control.className = lst.slice(0,i).concat(lst.slice(i+1)).join(' '); 
			// break;
		}
	}
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

function addSourceSuffix(control, suffix)
{
    var src = unescape(control.src);
    var ext = ""; 
	
	if(src.length > 4)
		ext = src.substring(src.length - 4, src.length);
	
    if(src.substring(src.length - ext.length - suffix.length, src.length) == (suffix + ext))
        return;
        
    control.src = src.substring(0, src.length - ext.length) + suffix + ext;
}

function removeSourceSuffix(control, suffix)
{
    var src = unescape(control.src);
    var ext = ""; 
	
	if(src.length > 4)
		ext = src.substring(src.length - 4, src.length);
	
    if(src.substring(src.length - ext.length - suffix.length, src.length) != (suffix + ext))
        return;
        
    control.src = src.substring(0, src.length - ext.length - suffix.length) + ext;
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

function setDefaultToolbarLayout(element, fnOnclick)
{
    var _Onclick = typeof fnOnclick != 'undefined' ? fnOnclick : new Function('window.alert("please configure onclick")');  
    element.onclick = _Onclick;
    element.onmouseover = function() { addElementClass(this, hoverElementClass); };
    element.onmouseout = function() { removeElementClass(this, hoverElementClass); };
}
function setToolStripLanguage(toolStrip)
{
	var _List = toolStrip.getElementsByTagName('img');
	var _MsgList = CrResource.toolbar[toolStrip.id];
	var len = _List.length;
	
	for(var i = 0; i < len; i++)
	{
		if (_List[i].id)
		{
			_List[i].alt = typeof _MsgList[_List[i].id] != 'undefined' ? _MsgList[_List[i].id][0] : _List[i].alt;
			_List[i].title = typeof _MsgList[_List[i].id] != 'undefined' ? _MsgList[_List[i].id][1] : _List[i].title;
		}
	}
}
function setToolStripLanguage_V3(toolStrip)
{
	var _List = toolStrip.getElementsByTagName('span');
	var _MsgList = CrResource.toolbar[toolStrip.id];
	var len = _List.length;
	
	for(var i = 0; i < len; i++)
	{
		if (_List[i].id)
		{
			_List[i].textContent=typeof _MsgList[_List[i].id] != 'undefined' ? _MsgList[_List[i].id][0] : _List[i].textContent;
			_List[i].title=typeof _MsgList[_List[i].id] != 'undefined' ? _MsgList[_List[i].id][0] : _List[i].textContent;
		}
	}
}
function setToolStripConfiguration(toolStrip)
{
	// debugger;
	var _List = toolStrip.getElementsByTagName('img');
	var _ButtonOptionList = const_ToolbarConfig[toolStrip.id + 'Buttons'];
	var _ToolbarOptionList = const_ToolbarConfig[toolStrip.id];
	
	if (_ToolbarOptionList) 
	{
		var len = _List.length;
		for (var i = 0; i < len; i++) 
		{
			if (_List[i].id) 
			{
				if (typeof(_ButtonOptionList[_List[i].id]) != 'undefined') 
				{
					_List[i].crVisible = _ButtonOptionList[_List[i].id];
					if (_ButtonOptionList[_List[i].id])
					{
						// // _List[i].style.display = 'inline';
						showHideNixxisButton_V3(_List[i],'inline');
					}
					else
					{
						// // _List[i].style.display = 'none';
						// showHideNixxisButton_V3(_List[i],'none');
					} 
				}
			}
		}
	}
	else
	{
		toolStrip.style.display = 'none'; 
	}
}
function showHideNixxisButton_V3(control, display)
{
	if(control != null && control.className == "NixxisButton")
	{
		if(control.parentNode != null && control.parentNode.tagName?.toLowerCase() == 'div')
		{			
			control = control.parentNode;

			if(control.parentNode != null && control.parentNode.tagName?.toLowerCase() =='button')
			{
				control = control.parentNode;

				if(display != 'inline')
					control.style.display = display;
			}
		}
	}
	else
	{
		control.style.display = display;
	}
}
function getDate(input)
{
	var _List = input.toString().split("|");
	
	if(_List.length != 6) return;

	try
	{
		var returnValue = new Date();
		 returnValue.setUTCFullYear(_List[0]);
		 returnValue.setMonth(_List[1] - 1);
		 returnValue.setUTCDate(_List[2]);
		 returnValue.setUTCHours(_List[3]);
		 returnValue.setUTCMinutes(_List[4]);
		 returnValue.setUTCSeconds(_List[5]);
		 
		return returnValue; //new Date(_List[0],_List[1] - 1,_List[2],_List[3],_List[4],_List[5]);
	}
	catch(e)
	{ return new Date(); }
}
/*
function LoadJavascriptScript(url)
{
	var scriptArry = document.getElementsByTagName("script");
	var load = true;
	if ((typeof scriptArry !== "undefined") && (scriptArry !== null))
	{
		for(j in scriptArry)
		{		
			if(scriptArry[j].src.lastIndexOf(url) + url.length == scriptArry[j].src.length) 
			{
				load = false;
				break;
			}
		}
	}
	if (load) document.write('<script type="text/javascript" src="'+ url +'"></script>');
}
*/
