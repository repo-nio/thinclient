/*
 *File version : 1.22.0.1 
 */
var crDebugWindow = null;
function dbgStartWindow()
{
	if(crDebugWindow) return;
			    
	crDebugWindow = new crDebugForm();
	crDebugWindow.Create();
	
	try 
	{
		if (ClientLink) 
		{
			ClientLink.debugDiv = document.getElementById('tstDiv');
		}
	}
	catch(e) {}
}
function dbgHideWindow()
{
	if(!crDebugWindow) return
	crDebugWindow.Show();
}
function dbgStopWindow()
{
	try { crDebugWindow.Dispose(); }
	catch (e) {}
	crDebugWindow = null;
	
	try 
	{
		if (ClientLink) 
		{
			ClientLink.debugDiv = null;
		}
	}
	catch(e) {}
}
function DebugLog(text)
{
	if(!crDebugWindow) return;
	crDebugWindow.Log(text);
}
function Debug() { debugger; }
function SetDebug(bool)
{
	if(bool) { $('DebugToolStrip').style.display = "inline"; }
	else { $('DebugToolStrip').style.display = "none"; }
}

//
//dbg form
//
function crDebugForm ()
{
    this.crForm;
    this.Buttons = new Array();
}

crDebugForm.prototype.Create = function()
{
    this.crForm = new toolboxForm("dbgWindow");
    this.crForm.txParent = document.body;
    this.crForm.txSize = new toolboxSize(260, 265);
    this.crForm.txLocation = new toolboxPoint(100, 100);
    this.crForm.txMoveMin = new toolboxPoint(1, 1);
    this.crForm.txMoveMax = new toolboxPoint(document.body.clientWidth, document.body.clientHeight);
    this.crForm.setTitle("Debug window");
    this.crForm.Show();
    this.crForm.setResizeble(true);
    this.crForm.setVisibility(true);
    this.crForm.OnResize = this.Resize;
    this.DrawForm();
    this.crForm.setUserBackground(true, "black")
}

crDebugForm.prototype.DrawForm = function()
{
    if(!this.crForm) return;
    
    var _BODY = "";
    _BODY += '<div id="dbgContainer" class="dbgContainer">';
    _BODY += '    <table class="dbgLayoutTable" cellpadding="0" cellspacing="0">';
    _BODY += '        <tr class="dbgButtonsLayoutRow">';
    _BODY += '            <td> ';
    _BODY += '                <div class="dbgButtonDiv">';
    _BODY += '                    <table cellpadding="0" cellspacing="0">';
    _BODY += '                        <tr>';
    _BODY += '                            <td id="dbgButtonClear"></td>';
    _BODY += '                            <td id="dbgButtonClose"></td>';
    _BODY += '                        </tr>';
    _BODY += '                    </table>';
    _BODY += '                </div> ';
    _BODY += '            </td>';
    _BODY += '        </tr>';
    _BODY += '        <tr class="dbgDisplayLayoutRow">';
    _BODY += '            <td class="dbgDisplayLayoutCell"> <div id="dbgDisplayDiv" class="dbgDisplayDiv"> <div id="tstDiv" class="tstDiv"> </div> </div> </td>';
    _BODY += '        </tr>';
    _BODY += '        <tr class="dbgEvalLayoutRow">';
    _BODY += '            <td class="dbgEvalLayoutCell">'; 
    _BODY += '                <div class="dbgEvalDiv">';
    _BODY += '                    <table class="dbgEvalTable" cellpadding="0" cellspacing="0">';
    _BODY += '                        <tr>';
    _BODY += '                            <td id="dbgEvalTextCell" class="dbgEvalTextCell"> <input id="dbgEvalText" type="text" value="" class="dbgEvalText" /> </td>';
    _BODY += '                            <td id="dbgEvalButtonCell" class="dbgEvalButtonCell"> </td>';
    _BODY += '                        </tr>';
    _BODY += '                    </table>';
    _BODY += '                </div> ';
    _BODY += '            </td>';
    _BODY += '        </tr>';
    _BODY += '    </table>';
    _BODY += '</div>';
    
    var _ThisObj = this;
    var _Key;
    
    this.crForm.txWorkArea[1].innerHTML = _BODY;   
    
    _Key = "Clear";
    this.Buttons[_Key] = new toolboxButton("dbgButton_Clear", "Clear", function() { _ThisObj.Clear(); });
    this.Buttons[_Key].txAbsolute = false;
    this.Buttons[_Key].txParent = $('dbgButtonClear');
    //_BtnReset.txIcon = new toolboxImage("img\\btnIcon_Cancel.png", new toolboxSize(16, 16));   
    this.Buttons[_Key].Show();

    _Key = "Close";
    this.Buttons[_Key] = new toolboxButton("dbgButton_Close", "Close", function() { _ThisObj.Close(); });
    this.Buttons[_Key].txAbsolute = false;
    this.Buttons[_Key].txParent = $('dbgButtonClose');
    //_BtnReset.txIcon = new toolboxImage("img\\btnIcon_Cancel.png", new toolboxSize(16, 16));   
    this.Buttons[_Key].Show();

    _Key = "Eval";
    this.Buttons[_Key] = new toolboxButton("dbg_EvalButtonCell", "Eval", function() { _ThisObj.Eval(); });
    this.Buttons[_Key].txAbsolute = false;
    this.Buttons[_Key].txParent = $('dbgEvalButtonCell');
    //_BtnReset.txIcon = new toolboxImage("img\\btnIcon_Cancel.png", new toolboxSize(16, 16));   
    this.Buttons[_Key].Show();
	
	$('tstDiv').crLinkEvents = false;
	$('tstDiv').crEndBatch = false;
	$('tstDiv').crChatSpy = true;
	$('tstDiv').crError = true;
}
crDebugForm.prototype.Resize = function(height)
{
    var _Height = height - 30 - 30;
    $('tstDiv').style.height = _Height + 'px';
	
	var w = $('dbgContainer').clientWidth;
	w = w - 40;
	$('dbgDisplayDiv').style.width = w + "px";
	//$('tstDiv').style.width = w + "px";
}
crDebugForm.prototype.Clear = function()
{
    $('tstDiv').innerHTML = '&nbsp;';
}
crDebugForm.prototype.Close = function()
{
    this.crForm.setVisibility(false);
}
crDebugForm.prototype.Eval = function()
{
    
}
crDebugForm.prototype.Log = function(text)
{
    var debugDate = new Date();
    var _Element = $('tstDiv');
    //"<BR />"
    var _Br;
    if ((_Element.innerHTML == "") || (_Element.innerHTML == " ")) 
    { _Br = ""; }
    else if ((_Element.innerHTML.toLowerCase().substr(-6) == "<br />") || (_Element.innerHTML.toLowerCase().substr(-4) == "<br>"))
    { _Br = ""; }
    else 
    { _Br = "<BR />"; }

    _Element.innerHTML = _Element.innerHTML + _Br + debugDate.getTime() + " " + text + "<BR />";
    //Newest on top _Element.innerHTML = debugDate.getTime() + " " + text + _Br +  _Element.innerHTML;
    var _Scroll = $("dbgDisplayDiv");
    _Scroll.scrollTop = _Scroll.scrollHeight;
}
crDebugForm.prototype.Show = function()
{
    if (this.crForm.txVisible) { this.crForm.setVisibility(false); }
    else { this.crForm.setVisibility(true); }
}
crDebugForm.prototype.Dispose = function()
{
    this.crForm.Dispose();
    this.crForm = null; 
}
