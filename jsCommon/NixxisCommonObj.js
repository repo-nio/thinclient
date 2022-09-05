//*************************
// --> Border
//*************************
function BorderFrame(name, parent)
{
	var mySelf = this;
	this.txParent = typeof parent != 'undefined' ? parent : window.document.body;
	this.txName = typeof name != 'undefined' ? name : "";
	this.txTitle = "";
	this.constWorkspaceId = "NixxisBorderWorkSpace_";
	OnToolboxResize.Add(this, mySelf.Resize);
	
	this.Dispose = function()
	{
		this.txParent = null;
		this.txName = null;
		this.txTitle = null;
		this.constWorkspaceId = null;
		try {
			OnToolboxResize.Remove(this, mySelf.Resize);
		} 
		catch (e) {
			;
		}
		mySelf = null;
	}
}
BorderFrame.prototype.Resize = function()
{
	var _Element =$(this.txName + "NixxisBorderMiddleCenter");
	var _Height = this.txParent.clientHeight - $(this.txName + "NixxisBorderBottom").clientHeight - $(this.txName + "NixxisBorderTop").clientHeight;
	//alert(_Height);
	_Element.style.height = _Height + "px";
}
BorderFrame.prototype.setTitle = function(title)
{
	this.txTitle = title;
}
BorderFrame.prototype.Show = function()
{	
	var _BODY = "";
	_BODY =  '<table class="NixxisBorder" cellpadding="0" cellspacing="0">'
	_BODY += '	<tr id="' + this.txName + 'NixxisBorderTop" class="NixxisBorderTop">'
	_BODY += '		<td class="NixxisBorderTopLeft"><div class="NixxisBorderFill">&nbsp;</div></td>'
	_BODY += '		<td class="NixxisBorderTopCenter">'
	_BODY += '			<table class="NixxisBorder" cellpadding="0" cellspacing="0">'
	_BODY += '				<tr>'
	_BODY += '					<td class="NixxisBorderTopCenterLeft"><div class="NixxisBorderTopCenterLeftFill">&nbsp;</div></td>'
	_BODY += '					<td class="NixxisBorderTopTitle">' + this.txTitle + '</td>'
	_BODY += '					<td class="NixxisBorderTopCenter">&nbsp;</td>'
	_BODY += '				</tr>'
	_BODY += '			</table>'
	_BODY += '		</td>'
	_BODY += '		<td class="NixxisBorderTopRight"><div class="NixxisBorderFill">&nbsp;</div></td>'
	_BODY += '	</tr>'
	_BODY += '	<tr class="NixxisBorderMiddle">'
	_BODY += '		<td class="NixxisBorderMiddleLeft">&nbsp;</td>'
	_BODY += '		<td id="' + this.txName + 'NixxisBorderMiddleCenter" class="NixxisBorderMiddleCenter">'
	_BODY += '			<div id="' + this.constWorkspaceId + this.txName + '" class="NixxisBorderWorkSpace">'
	_BODY += '			</div>' 
	_BODY += '		</td>'
	_BODY += '		<td class="NixxisBorderMiddleRight">&nbsp;</td>'
	_BODY += '	</tr>'
	_BODY += '	<tr id="' + this.txName + 'NixxisBorderBottom" class="NixxisBorderBottom">'
	_BODY += '		<td class="NixxisBorderBottomLeft">&nbsp;</td>'
	_BODY += '		<td class="NixxisBorderBottomCenter">&nbsp;</td>'
	_BODY += '		<td class="NixxisBorderBottomRight">&nbsp;</td>'
	_BODY += '	</tr>'
	_BODY += '</table>'
	
	this.txParent.innerHTML = _BODY;
	this.Resize();
}
BorderFrame.prototype.getWorkspace = function()
{
	//if ()
	var _Item = $(this.constWorkspaceId + this.txName);
	return _Item;
}
//*************************
// --> Manuel call form
//*************************
function crGetCallNumberForm ()
{
    this.crForm;
    this.DialPadBtn = new Array(); 
    this.Dialing = false;
    this.txClientLink;
    this.txIcon = null;
    this.txTxtPhone = null;
}
crGetCallNumberForm.prototype.Create = function()
{
    this.crForm = new toolboxForm("MCall");
    this.crForm.txParent = document.body;
    this.crForm.txSize = new toolboxSize(260, 265);
    this.crForm.txLocation = new toolboxPoint(1, 50);
    this.crForm.txMoveMin = new toolboxPoint(1, 50);
    this.crForm.txMoveMax = new toolboxPoint(document.body.clientWidth, document.body.clientHeight);
    this.crForm.setTitle(CrResource.newContactForm.title);
    this.crForm.Show();
    this.crForm.setResizeble(false);
    this.crForm.setVisibility(false);

    this.DrawForm();
    this.crForm.setUserBackground(true, "#3b393c", "url('img/ManualCall_Background.png')", [["background-repeat","repeat-x"]])
}
crGetCallNumberForm.prototype.DrawForm = function()
{
    if(!this.crForm) return;
    
    var _BODY;
    _BODY = '<div class="MCallCont">';
    _BODY += '    <table class="MCallLayout" cellpadding="0" cellspacing="0">';
    _BODY += '        <tr>';
    _BODY += '            <td>';
    _BODY += '                <table id="MCallActionbar" class="MCallActionbar"  cellpadding="0" cellspacing="0">';  
    _BODY += '                    <tr> ';  
    _BODY += '                        <td id="MCallNumber" class="MCallNumber" rowspan="2" >';
    _BODY += '                              <div class="MCDisplay">';
    _BODY += '                                  <div id="MCText" class="MCText"></div>';
    _BODY += '                                  <input id="MCNum" class="MCNum" type="text" MAXLENGTH="100"/>';
	//_BODY += '                                  <input id="MCNum" class="MCNum" type="text" onkeypress="javascript: return telephoneKeys(event);"/>';
    _BODY += '                              </div>'; 
    _BODY += '                         </td>'; 
    _BODY += '                        <td id="MCallDialPad_Dial"></td>';
    _BODY += '                    </tr>';
    _BODY += '                    <tr> ';  
    _BODY += '                        <td id="MCallDialPad_Clear"></td>';
    _BODY += '                    </tr>';    
    _BODY += '                </table>'; 
    _BODY += '            </td>';
    _BODY += '        </tr>';
    _BODY += '        <tr>';
    _BODY += '            <td class="MCallLayoutPadCell">';
    _BODY += '                <table id="MCallDialPad" class="MCallDialPad" cellpadding="0" cellspacing="0">';
    _BODY += '                    <tr> ';
    _BODY += '                        <td id="MCallDialPad_1" class="MCallDialPadCell"> </td>';
    _BODY += '                        <td id="MCallDialPad_2" class="MCallDialPadCell"> </td>';
    _BODY += '                        <td id="MCallDialPad_3" class="MCallDialPadCell"> </td>';
    _BODY += '                    </tr>';
    _BODY += '                    <tr> ';
    _BODY += '                        <td id="MCallDialPad_4" class="MCallDialPadCell"> </td>';
    _BODY += '                        <td id="MCallDialPad_5" class="MCallDialPadCell"> </td>';
    _BODY += '                        <td id="MCallDialPad_6" class="MCallDialPadCell"> </td>';
    _BODY += '                    </tr>';
    _BODY += '                    <tr> ';
    _BODY += '                        <td id="MCallDialPad_7" class="MCallDialPadCell"> </td>';
    _BODY += '                        <td id="MCallDialPad_8" class="MCallDialPadCell"> </td>';
    _BODY += '                        <td id="MCallDialPad_9" class="MCallDialPadCell"> </td>';
    _BODY += '                    </tr>';
    _BODY += '                    <tr> ';
    _BODY += '                        <td id="MCallDialPad_Star" class="MCallDialPadCell"> </td>';
    _BODY += '                        <td id="MCallDialPad_0" class="MCallDialPadCell"> </td>';
    _BODY += '                        <td id="MCallDialPad_Hash" class="MCallDialPadCell"> </td>';
    _BODY += '                    </tr>';                                    
    _BODY += '                </table>';
    _BODY += '            </td>';
    _BODY += '        </tr>';
    _BODY += '        <tr>';
    _BODY += '            <td></td>';
    _BODY += '        </tr>';
    _BODY += '    </table>';
    _BODY += '</div>';
    
    var _ThisObj = this;

    this.crForm.txWorkArea[1].innerHTML = _BODY;
    this.txTxtPhone = $("MCNum");
    
    this.CreateButton('0', function() { _ThisObj.ButtonClick('0'); });
    this.CreateButton('1', function() { _ThisObj.ButtonClick('1'); });
    this.CreateButton('2', function() { _ThisObj.ButtonClick('2'); });
    this.CreateButton('3', function() { _ThisObj.ButtonClick('3'); });
    this.CreateButton('4', function() { _ThisObj.ButtonClick('4'); });
    this.CreateButton('5', function() { _ThisObj.ButtonClick('5'); });
    this.CreateButton('6', function() { _ThisObj.ButtonClick('6'); });
    this.CreateButton('7', function() { _ThisObj.ButtonClick('7'); });
    this.CreateButton('8', function() { _ThisObj.ButtonClick('8'); });
    this.CreateButton('9', function() { _ThisObj.ButtonClick('9'); });
    this.CreateButton('Star', function() { _ThisObj.ButtonClick('Star'); });
    this.CreateButton('Hash', function() { _ThisObj.ButtonClick('Hash'); });
    
    var _Key;
    _Key = "Dial";
    this.DialPadBtn[_Key] = new toolboxButton("btnMCallDialPad_Dial", "Dial", function() { _ThisObj.ButtonDial(); });
    this.DialPadBtn[_Key].txAbsolute = false;
    this.DialPadBtn[_Key].txParent = $('MCallDialPad_Dial');
    this.DialPadBtn[_Key].txButtonType = txEnum.BtnType.PictureBtn;
    this.DialPadBtn[_Key].txImage         = new toolboxImage(CrResource.newContactForm.buttonDial[0] , new toolboxSize(80, 37));
    this.DialPadBtn[_Key].txImageOver     = new toolboxImage(CrResource.newContactForm.buttonDial[1], new toolboxSize(80, 37));
    this.DialPadBtn[_Key].txImageFocus    = new toolboxImage(CrResource.newContactForm.buttonDial[2], new toolboxSize(80, 37));
    this.DialPadBtn[_Key].txImageDisabled = new toolboxImage(CrResource.newContactForm.buttonDial[3], new toolboxSize(80, 37));    
    this.DialPadBtn[_Key].txAlt = "Dial";
    this.DialPadBtn[_Key].txTitle = "Dial";      
    this.DialPadBtn[_Key].Show();
    
    //this.txClientLink.commands["VoiceHangup"].linkItem(this.DialPadBtn);
    
    //onclick = new Function('__activeClientLinks["' + this.txClientLink.connection.connectionId + '"].commands["' + VoiceHangup + '"].execute();' );
    
    _Key = "Clear";
    this.DialPadBtn[_Key] = new toolboxButton("btnMCallDialPad_Clear", "Clear", function() { _ThisObj.ButtonClear(); });
    this.DialPadBtn[_Key].txAbsolute = false;
    this.DialPadBtn[_Key].txParent = $('MCallDialPad_Clear');
    this.DialPadBtn[_Key].txButtonType = txEnum.BtnType.PictureBtn;
    this.DialPadBtn[_Key].txImage         = new toolboxImage(CrResource.newContactForm.buttonClear[0], new toolboxSize(80, 37));
    this.DialPadBtn[_Key].txImageOver     = new toolboxImage(CrResource.newContactForm.buttonClear[1], new toolboxSize(80, 37));
    this.DialPadBtn[_Key].txImageFocus    = new toolboxImage(CrResource.newContactForm.buttonClear[2], new toolboxSize(80, 37));
    this.DialPadBtn[_Key].txImageDisabled = new toolboxImage(CrResource.newContactForm.buttonClear[3], new toolboxSize(80, 37)); 
    this.DialPadBtn[_Key].txAlt = "Clear";
    this.DialPadBtn[_Key].txTitle = "Clear";       
    this.DialPadBtn[_Key].Show();
    
    this.setStatus(CrResource.newContactForm.statusEnterNumber);
}
crGetCallNumberForm.prototype.CreateButton = function(key, onclickFn)
{
    this.DialPadBtn[key] = new toolboxButton("btnMCallDialPad_" + key, key, onclickFn);
    this.DialPadBtn[key].txAbsolute = false; 
    this.DialPadBtn[key].txParent = $('MCallDialPad_' + key);
    this.DialPadBtn[key].txButtonType = txEnum.BtnType.PictureBtn;
    this.DialPadBtn[key].txImage         = new toolboxImage("img\\btnPad_" + key + ".png", new toolboxSize(80, 37));
    this.DialPadBtn[key].txImageOver     = new toolboxImage("img\\btnPadOver_" + key + ".png", new toolboxSize(80, 37));
    this.DialPadBtn[key].txImageFocus    = new toolboxImage("img\\btnPad_" + key + ".png", new toolboxSize(80, 37));
    this.DialPadBtn[key].txImageDisabled = new toolboxImage("img\\btnPad_" + key + ".png", new toolboxSize(80, 37));
    if (isNaN(parseInt(key)))
    {
        this.DialPadBtn[key].txAlt = key;
        this.DialPadBtn[key].txTitle = key;
    } else
    {
        this.DialPadBtn[key].txAlt = "Number " + key;
        this.DialPadBtn[key].txTitle = "Number " + key;
    }
    this.DialPadBtn[key].Show()           
}
crGetCallNumberForm.prototype.ButtonClick = function(key)
{
    var _Element = $('MCNum');
    var _Key = key;
    if (key == 'Star') _Key = '*';
    if (key == 'Hash') _Key = '#';
    _Element.value += _Key;
}
crGetCallNumberForm.prototype.ButtonClear = function()
{
    var _Element = $('MCNum');
    _Element.value = '';
}
crGetCallNumberForm.prototype.ButtonDial = function()
{
    if (!this.txClientLink) return;

    this.setConnected();
    var _Element = $('MCNum');
    if(!_Element) return;
    
	//TO DO return _Element.value;
    this.txClientLink.commands.VoiceNewCall.execute(_Element.value);
}
crGetCallNumberForm.prototype.Show = function()
{
    if (this.crForm.txVisible) { this.crForm.setVisibility(false); }
    else { this.crForm.setVisibility(true); }
}
crGetCallNumberForm.prototype.setConnected = function()
{
    //this.txIcon.src = "Img\\tbVoice_MCallConnected.png";
    //this.txTxtPhone.disabled = true;
    //removeElementClass(this.txTxtPhone, "Connecting");
    //addElementClass(this.txTxtPhone, "Connected");
    //this.crForm.setVisibility(false);
    this.setStatus(CrResource.newContactForm.statusWaiting);
    
}
crGetCallNumberForm.prototype.setConnecting = function()
{
    
}
crGetCallNumberForm.prototype.setDisconnected = function()
{
    //this.txIcon.src = "Img\\tbVoice_MCall.png";
    //this.txTxtPhone.disabled = false;
    //removeElementClass(this.txTxtPhone, "Connecting");
    //removeElementClass($(this.txTxtPhone), "Connected");
    this.setStatus(CrResource.newContactForm.statusEnterNumber);
    
}
crGetCallNumberForm.prototype.setStatus = function(text)
{
      $("MCText").innerHTML = text;
}
//*************************
// --> New call dialog
//*************************
var crNewCallDialog =
{
	crLink : null, //ContactId
	crCmd: null, //Command to execut
	crClientLink : null,
	crWindow: null, //The form of the dialing pad
	crDialPadBtn: new Array(), //contains all the button on the form
	crDialing: false,
	crIcon: null,
    crTxtPhone: null, //The textbox where the phone number will be
	crInt_OpenWindow : null, //Bool to see if the from already exists
	crNumToCall: null, //If this is fill then this will be the default num
	
	Call : function(link, cmd, clientlink)
	{
		debugger;

		crNewCallDialog.crLink = link;
		crNewCallDialog.crCmd = cmd;
		crNewCallDialog.crClientLink = clientlink;

		if (crNewCallDialog.crWindow)
			crNewCallDialog.crInt_OpenWindow = false;
		else
			crNewCallDialog.crInt_OpenWindow = true;
		
		if(crNewCallDialog.crInt_OpenWindow)
			crNewCallDialog.Show();
		else
		{
			addElementClass($('dial-pad'), 'active');
			addElementClass($('backdrop'), 'active');
		}		
		
		if (crNewCallDialog.crNumToCall) 
		{
			$("MCNum").value = crNewCallDialog.crNumToCall;
			crNewCallDialog.crNumToCall = null;
		}
		
		$("MCNum").focus();		
	},
	Clear : function()
	{
		crNewCallDialog.crLink = null;
		crNewCallDialog.crCmd = null;	
		crNewCallDialog.crWindow = null;
		crNewCallDialog.crClientLink = null;
		crNewCallDialog.crDialPadBtn = new Array();
		crNewCallDialog.crTxtPhone = null;
	},
	Close : function()
	{
		crNewCallDialog.Clear();
		$Del("MCall");
	},
	KeyPress : function(e)
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
	    else if (keycode == 13) crNewCallDialog.ButtonDial(); //Enter key
		
	    return false;
	},
	Show : function()
	{
		debugger;

	    crNewCallDialog.crWindow = new toolboxForm("MCall");
	    crNewCallDialog.crWindow.txParent = document.body;
	    crNewCallDialog.crWindow.Show();
		crNewCallDialog.crWindow.onFormExit = crNewCallDialog.Close;
	    
	    var _BODY;	    

		_BODY += '<div class="modal manulDialerCustom" id="dial-pad">';
		_BODY += '	<div class="modal-header">';
		_BODY += '		<h4>Manual Dialing...</h4>';
		_BODY += '	</div>';
		_BODY += '	<div class="modal-content dial">';
		_BODY += '		<div class="d-flex">';
		_BODY += '			<input id="MCNum" class="MCNum" type="text" MAXLENGTH="100"/>';
		_BODY += '			<button id="MCallDialPad_Clear" style ="margin: 0px -2px 0px 0px;">';
		_BODY += '				<img src="./assets/icons/Agent_AddressBookEntryType_Agent_Off_25.png" alt="icon" />';
		_BODY += '			</button>';
		_BODY += '			<button id="MCallDialPad_Dial">';
		_BODY += '				<img src="./assets/icons/Agent_Command_ReadyVoice_50.png" alt="icon" />';
		_BODY += '			</button>';
		_BODY += '		</div>';
		_BODY += '		<div class="buttons">';
		_BODY += '			<button id="MCallDialPad_1" class="btn-3">1</button>';
		_BODY += '			<button id="MCallDialPad_2" class="btn-3">2</button>';
		_BODY += '			<button id="MCallDialPad_3" class="btn-3">3</button>';
		_BODY += '			<button id="MCallDialPad_4" class="btn-3">4</button>';
		_BODY += '			<button id="MCallDialPad_5" class="btn-3">5</button>';
		_BODY += '			<button id="MCallDialPad_6" class="btn-3">6</button>';
		_BODY += '			<button id="MCallDialPad_7" class="btn-3">7</button>';
		_BODY += '			<button id="MCallDialPad_8" class="btn-3">8</button>';
		_BODY += '			<button id="MCallDialPad_9" class="btn-3">9</button>';
		_BODY += '			<button id="MCallDialPad_Star" class="btn-3">*</button>';
		_BODY += '			<button id="MCallDialPad_0" class="btn-3">0</button>';
		_BODY += '			<button id="MCallDialPad_Hash" class="btn-3">#</button>';
		_BODY += '		</div>';
		_BODY += '	</div>';
		_BODY += '	<div class="modal-footer">';
		_BODY += '		<button id ="MCallDialPad_Close">Close</button>';
		_BODY += '	</div>';
		_BODY += '</div>';

		
	    crNewCallDialog.crWindow.txWorkArea[1].innerHTML = _BODY;
		crNewCallDialog.crTxtPhone = $("MCNum");
	    
		// debugger;
	    crNewCallDialog.CreateButton('0', function() { crNewCallDialog.ButtonClick('0'); });
	    crNewCallDialog.CreateButton('1', function() { crNewCallDialog.ButtonClick('1'); });
	    crNewCallDialog.CreateButton('2', function() { crNewCallDialog.ButtonClick('2'); });
	    crNewCallDialog.CreateButton('3', function() { crNewCallDialog.ButtonClick('3'); });
	    crNewCallDialog.CreateButton('4', function() { crNewCallDialog.ButtonClick('4'); });
	    crNewCallDialog.CreateButton('5', function() { crNewCallDialog.ButtonClick('5'); });
	    crNewCallDialog.CreateButton('6', function() { crNewCallDialog.ButtonClick('6'); });
	    crNewCallDialog.CreateButton('7', function() { crNewCallDialog.ButtonClick('7'); });
	    crNewCallDialog.CreateButton('8', function() { crNewCallDialog.ButtonClick('8'); });
	    crNewCallDialog.CreateButton('9', function() { crNewCallDialog.ButtonClick('9'); });
	    crNewCallDialog.CreateButton('Star', function() { crNewCallDialog.ButtonClick('Star'); });
	    crNewCallDialog.CreateButton('Hash', function() { crNewCallDialog.ButtonClick('Hash'); });
	    
	    var _Key;
	    _Key = "Dial";
	    crNewCallDialog.crDialPadBtn[_Key] = new toolboxButton("btnMCallDialPad_Dial", "Dial", function() { crNewCallDialog.ButtonDial(); });
	    crNewCallDialog.crDialPadBtn[_Key].txAbsolute = false;
	    crNewCallDialog.crDialPadBtn[_Key].txParent = $('MCallDialPad_Dial');
	    
		crNewCallDialog.crDialPadBtn[_Key].txAlt = "Dial";
	    crNewCallDialog.crDialPadBtn[_Key].txTitle = "Dial";      
	    crNewCallDialog.crDialPadBtn[_Key].Show();
	    
	    _Key = "Clear";
	    crNewCallDialog.crDialPadBtn[_Key] = new toolboxButton("btnMCallDialPad_Clear", "Clear", function() { crNewCallDialog.ButtonClear(); });
	    crNewCallDialog.crDialPadBtn[_Key].txAbsolute = false;
	    crNewCallDialog.crDialPadBtn[_Key].txParent = $('MCallDialPad_Clear');
	    
		crNewCallDialog.crDialPadBtn[_Key].txAlt = "Clear";
	    crNewCallDialog.crDialPadBtn[_Key].txTitle = "Clear";
	    crNewCallDialog.crDialPadBtn[_Key].Show();

		_Key = "Close";
	    crNewCallDialog.crDialPadBtn[_Key] = new toolboxButton("btnMCallDialPad_Close", "Close", function() { crNewCallDialog.ButtonClose(); });
	    crNewCallDialog.crDialPadBtn[_Key].txAbsolute = false;
	    crNewCallDialog.crDialPadBtn[_Key].txParent = $('MCallDialPad_Close');
	    
		crNewCallDialog.crDialPadBtn[_Key].txAlt = "Close";
	    crNewCallDialog.crDialPadBtn[_Key].txTitle = "Close";      
	    crNewCallDialog.crDialPadBtn[_Key].Show();

		addElementClass($('dial-pad'), 'active');
		addElementClass($('backdrop'), 'active');
	    
	    this.setStatus(CrResource.newContactForm.statusEnterNumber);		
	},
	CreateButton: function(key, onclickFn)
	{
		// debugger;
	    var button = new toolboxButton("btnMCallDialPad_" + key, key, onclickFn);		
		
	    button.txAbsolute = false;
	    button.txParent = $('MCallDialPad_' + key);
		button.txSize = new toolboxSize(button.txParent.clientWidth,button.txParent.clientHeight);		
		
	    if (isNaN(parseInt(key)))
	    {
	        button.txAlt = key;
	        button.txTitle = key;
	    } else
	    {
	        button.txAlt = "Number " + key;
	        button.txTitle = "Number " + key;
	    }
	    button.Show() 
		crNewCallDialog.crDialPadBtn[key] = button;          
	},
	ButtonClick : function(key)
	{
	    var _Element = $('MCNum');
	    var _Key = key;
	    if (key == 'Star') _Key = '*';
	    if (key == 'Hash') _Key = '#';
	    _Element.value += _Key;
	},
	ButtonDial : function()
	{
		removeElementClass($('dial-pad'), 'active');
		removeElementClass($('backdrop'), 'active');

	    if (!crNewCallDialog.crClientLink) return;
	
		debugger;
	    //this.setConnected();
	    var _Element = $('MCNum');
	    if(!_Element) return;
	    
		try
		{
			__activeClientLinks[crNewCallDialog.crLink].commands[crNewCallDialog.crCmd].execute(_Element.value);
			//__activeClientLinks['/*[link]*/'].commands['/*[cmd]*/'].execute('" + document.getElementById('txtDestination').value + "')";
	    	//crNewCallDialog.crClientLink.commands[crNewCallDialog.crCmd].execute(_Element.value);
			//crNewCallDialog.crClientLink.commands.VoiceNewCall(_Element.value);
		} catch(e) 
		{
			var i = 0;
			i++;
		}
		crNewCallDialog.Close();
	},	
	ButtonClear : function()
	{
	    var _Element = $('MCNum');
	    _Element.value = '';
	},	
	Init_Callback : function(listbox, window)
	{
		crStatusWindow.crWindow = typeof window != 'undefined' ? window : crStatusWindow.crWindow;
		crStatusWindow.crWindowListBox = typeof listbox != 'undefined' ? listbox : null;
		
		if (this.crAutoFocus) crStatusWindow.crWindow.focus();
		if  (crStatusWindow.crInt_OpenWindow) crStatusWindow.AddMsg(crStatusWindow.crInt_Msg);
	},
	setStatus : function(text)
	{
     	// $("MCText").innerHTML = text;
	},
	ButtonClose : function()
	{
		debugger;
		
		removeElementClass($('dial-pad'), 'active');
		removeElementClass($('backdrop'), 'active');
		removeElementClass($('VoiceNewCall'), 'active');

	    // var _Element = $('MCNum');
	    // _Element.value = '';
	},
}







//*************************
// --> Status window
//*************************
var crStatusWindow =
{
	crUrl : "StatusWindow.htm",
	crWindowListBox : null,
	crWindow : null,
	crAutoCreate : true,
	crAutoFocus : true,
	crInt_OpenWindow : null,
	crInt_Msg : "",
	
	AddMsg : function(msg)
	{
		if (crStatusWindow.crWindowListBox) {
			crStatusWindow.crInt_OpenWindow = false;
		}
		else {
			crStatusWindow.crInt_OpenWindow = true;
			crStatusWindow.crInt_Msg = msg;
		}
		
		if (crStatusWindow.crAutoCreate) crStatusWindow.Show();
		if (!crStatusWindow.crWindowListBox) return;
		
		if (!crStatusWindow.crInt_OpenWindow) {
			crStatusWindow.crWindow.AddMessage(msg);
		}
		
		crStatusWindow.crInt_OpenWindow = null;
		crStatusWindow.crInt_Msg = "";
	},
	Clear : function()
	{
	
	},
	Close : function()
	{
		crStatusWindow.crWindowListBox = null;
		crStatusWindow.crWindow = null;
	},
	Show : function()
	{		
		var _Features = "left=0,top=0,height=120 ,width=800, toolbar=no, location=no,directories=no,status=no,menubar=no,scrollbars=no,copyhistory=no,resizable=yes";
		var WindowLocation = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + crStatusWindow.crUrl;
		
		if (crStatusWindow.crWindow == null) 
		{
			crStatusWindow.crWindow = window.open(WindowLocation, "Status", _Features);
		}
		else 
		{
			crStatusWindow.crWindow.focus();
		}
	},
	Init_Callback : function(listbox, window)
	{
		crStatusWindow.crWindow = typeof window != 'undefined' ? window : crStatusWindow.crWindow;
		crStatusWindow.crWindowListBox = typeof listbox != 'undefined' ? listbox : null;
		
		if (this.crAutoFocus) crStatusWindow.crWindow.focus();
		if  (crStatusWindow.crInt_OpenWindow) crStatusWindow.AddMsg(crStatusWindow.crInt_Msg);
	}
}

//*************************
// --> Chat spy window
//*************************
var crChatSpyWindow =
{
	crUrl : "SupChatListenWindow.htm",
	crWindowListBox : null,
	crWindow : null,
	crAgentId : null,
	crAutoCreate : true,
	crAutoFocus : true,
	crInt_OpenWindow : null,
	crInt_Msg : "",
	
	AddMsg : function(msg)
	{
		////debugger;
		if (crChatSpyWindow.crWindowListBox) {
			crChatSpyWindow.crInt_OpenWindow = false;
		}
		else {
			crChatSpyWindow.crInt_OpenWindow = true;
			crChatSpyWindow.crInt_Msg = msg;
		}
		
		if (crChatSpyWindow.crAutoCreate) crChatSpyWindow.Show();
		////debugger;
		if (!crChatSpyWindow.crWindowListBox) return;
		
		if (!crChatSpyWindow.crInt_OpenWindow) 
		{
			crChatSpyWindow.SendMsgToWindow(msg);
		}
		
		crChatSpyWindow.crInt_OpenWindow = null;
		crChatSpyWindow.crInt_Msg = "";
	},
	SendMsgToWindow : function(msgInfo)
	{
		////debugger;
		var Parts = msgInfo;	
		var flags = Parts.length > 3 ? this.Type = Parts[3] :  0;
			
        var MessageInfo = 
        {
            type : Parts.length > 0 ? this.Type = Parts[0] :  2,           
            from : Parts.length > 1 ? this.Type = Parts[1] :  '',
            to : Parts.length > 2 ? this.Type = Parts[2] :  '',
			flags : flags,
            text : Parts.length > 4 ? this.Type = unescape(Parts[4]) :  '',
			
            fromMySelf : ((flags & 1) != 0),
            fromAgent : ((flags & 2) != 0),
            toMySelfOnly : ((flags & 4) != 0),
            toAgentOnly : ((flags & 8) != 0)
        }
		/*
		MsgTypes:
		Enter: 0,
	    Leave: 1,
	    Say: 2,
	    Whisper: 3,
	    Activate: 4,
	    Wait: 5
	    */
		
		if(MessageInfo.type == 2)
    	{
            if(MessageInfo.to == "")
                crChatSpyWindow.crWindow.MsgFromAgent(MessageInfo.text, "Agent");
            else
                crChatSpyWindow.crWindow.MsgToAgent(MessageInfo.text, "Client");
        }
        else if (MessageInfo.type == 1)
        {
			crChatSpyWindow.crWindow.MsgInfo(MessageInfo.text, MessageInfo.from);
        }
        else
        {
			crChatSpyWindow.crWindow.MsgInfo(MessageInfo.text, MessageInfo.from);
        }		
		//crChatSpyWindow.crWindow.AddMessage(msgInfo);
	},
	
	Clear : function()
	{
		////debugger;
		crChatSpyWindow.crWindowListBox = null;
		crChatSpyWindow.crWindow = null;
		crChatSpyWindow.crAgentId = null;	
	},
	
	Close : function()
	{
		////debugger;
		if (crChatSpyWindow.crWindow) 
		{
			crChatSpyWindow.crWindow.close();
			crChatSpyWindow.Clear();
		}
	},
	Show : function()
	{
		////debugger;
		var _Features = "left=0,top=0,height=500 ,width=800, toolbar=no, location=no,directories=no,status=no,menubar=no,scrollbars=no,copyhistory=no,resizable=yes";
		var WindowLocation = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + crChatSpyWindow.crUrl;
		
		if (crChatSpyWindow.crWindow)
			crChatSpyWindow.crWindow.focus(); 
		else
			crChatSpyWindow.crWindow = window.open(WindowLocation, "Status", _Features);
	},
	Init_Callback : function(listbox, window)
	{
		////debugger;
		crChatSpyWindow.crWindow = typeof window != 'undefined' ? window : crChatSpyWindow.crWindow;
		crChatSpyWindow.crWindowListBox = typeof listbox != 'undefined' ? listbox : null;
		
		if (this.crAutoFocus) crChatSpyWindow.crWindow.focus();
		if  (crChatSpyWindow.crInt_OpenWindow) crChatSpyWindow.AddMsg(crChatSpyWindow.crInt_Msg);
	}
}
//*************************
// --> Loading screen
//*************************
function addElementClass(control, className)
{
	// debugger;

    var lst;

	if(control != null && control.className == "NixxisButton")
	{
		if(control.parentNode != null && (control.parentNode.tagName == 'div' || control.parentNode.tagName == 'DIV'))
		{			
			control = control.parentNode;

			if(control.parentNode != null && (control.parentNode.tagName =='button' || control.parentNode.tagName =='BUTTON'))
			{
				control = control.parentNode;

				if(className?.toLowerCase() == 'disabled')
				{
					// control.disabled = true;
					control.setAttribute(className, '');
				}
				else
					joinClass_V3(control, className);

				return;
			}
		}
		else
		{
			if(control.parentNode != null && (control.parentNode.tagName =='button' || control.parentNode.tagName =='BUTTON'))
			{
				control = control.parentNode;

				if(className?.toLowerCase() == 'disabled')
				{
					// control.disabled = true;
					control.setAttribute(className, '');
				}
				else
					joinClass_V3(control, className);

				return;
			}
		}		
	}
    
    joinClass_V3(control, className);
}
function joinClass_V3(control, className)
{
	if(control.className) lst = control.className.split(' '); else lst = new Array();

	if(lst == null || lst.length == 0)
	{
		control.className = className;
	}
	else
	{
		for(var i = 0; i < lst.length; i++) 
		{
			if(lst[i] != null && lst[i]?.toLowerCase() == className?.toLowerCase()) return;
		
			lst.push(className);
			control.className = lst.join(' ');
		}
	}
}

function getDIVParentForNixxisButton(control)
{
	if(control != null && control.className == "NixxisButton")
	{
		if(control.parentNode != null && (control.parentNode.tagName == 'div' || control.parentNode.tagName == 'DIV'))
		{			
			control = control.parentNode;

			if(control.parentNode != null && (control.parentNode.tagName =='button' || control.parentNode.tagName =='BUTTON'))
			{
				return control.parentNode;
			}
		}
		else
		{
			if(control.parentNode != null && (control.parentNode.tagName =='button' || control.parentNode.tagName =='BUTTON'))
			{
				return control.parentNode;
			}
		}
	}
	else return control;
}

function removeElementClass(control, className)
{
    var lst;
    
	if(control != null && control.className == "NixxisButton")
	{
		if(control.parentNode != null && (control.parentNode.tagName == 'div' || control.parentNode.tagName == 'DIV'))
		{
			control = control.parentNode;

			if(control.parentNode != null && (control.parentNode.tagName =='button' || control.parentNode.tagName =='BUTTON'))
			{
				control = control.parentNode;				
				
				if(className?.toLowerCase() == 'disabled')
				{
					// control.disabled = false;
					control.removeAttribute(className);
				}
				else
					removeClass_V3(control, className);

				return;
			}			
		}
		else
		{
			if(control.parentNode != null && (control.parentNode.tagName =='button' || control.parentNode.tagName =='BUTTON'))
			{
				control = control.parentNode;				
				
				if(className?.toLowerCase() == 'disabled')
				{
					// control.disabled = false;
					control.removeAttribute(className);
				}
				else
					removeClass_V3(control, className);

				return;
			}
		}
	}

	removeClass_V3(control, className);
}
function removeClass_V3(control, className)
{
	if(control.className) lst = control.className.split(' '); else return;
    for(var i = 0; i < lst.length; i++)
	{
		if(lst[i] == className)
		{			
			// control.className = lst.slice(0,i).concat(lst.slice(i+1)).join(' ');
			// break;

			control.className = control.className.replace(' ' + className,'');
		}
	}
}
var crLoadingScreen =
{
	crLoadingDiv : null,
	isVisible : false,
	crLoadingMsg: "Loading",
	Init : function ()
	{
		//// COMMENTED V3; DO NOT SHOW OLD LOADING


		// var el = document.createElement("DIV");
		// el.className = "NixxisLoading HideLoading";
		// el.style.height = window.document.body.clientHeight;
		// el.style.width = window.document.body.clientWidth;
		// crLoadingScreen.crLoadingDiv = el;
		// el.innerHTML = '<center style="margin-top:'+ window.document.body.clientHeight/2 +'px">' + crLoadingScreen.crLoadingMsg + '</br><img src="img/Loading_Image.gif" alt="Loading icon" width="500"/></center>';
		// window.document.body.appendChild(el);
	},
	Visible : function (bool)
	{
		//// COMMENTED V3; DO NOT SHOW OLD LOADING

		// if (bool)
		// {
		// 	removeElementClass(crLoadingScreen.crLoadingDiv, "HideLoading");
		// }
		// else
		// {
		// 	addElementClass(crLoadingScreen.crLoadingDiv, "HideLoading");
		// }
		// crLoadingScreen.isVisible = bool;
	}
}

//*************************/
// --> Mail - Forwarding
//*************************/
var crMailForDlg =

{
	crLink : null, //ContactId
	crCmd: null, //Command to execut
	crClientLink : null,
	crWindow: null, //The form of the dialing pad
	crButtonOk : null,
	crButtonCancel : null,
	crContactId : null,
	crInt_OpenWindow : null, //Bool to see if the from already exists
	
	Show : function(link, cmd, clientlink, contactid)
	
	{
		crMailForDlg.crLink = link;
		crMailForDlg.crCmd = cmd;
		crMailForDlg.crClientLink = clientlink;
		crMailForDlg.crContactId = contactid;
		
		if (crMailForDlg.crWindow)
			crMailForDlg.crInt_OpenWindow = false;
		else
			crMailForDlg.crInt_OpenWindow = true;
		
		if(crMailForDlg.crInt_OpenWindow)
			crMailForDlg.Create();
		
		$("frmMailForward").focus();
	},
	Clear : function()
	{
		crMailForDlg.crWindow = null;
		crMailForDlg.crButtonOk = null;
		crMailForDlg.crButtonCancel = null;
		crMailForDlg.crLink = null;
		crMailForDlg.crCmd = null;
		crMailForDlg.crClientLink = null;
		crMailForDlg.crContactId = null;	
	},
	Close : function()
	{
		crMailForDlg.Clear();
		$Del("frmMailForward");
	},
	Create : function()
	{
		$Del("frmMailForward");
	
		var obj = crMailForDlg;
	    obj.crWindow = new toolboxForm("frmMailForward");
	    obj.crWindow.txParent = document.body;
	    obj.crWindow.txSize = new toolboxSize(475, 211);
	    obj.crWindow.txLocation = new toolboxPoint(1, 50);
	    obj.crWindow.txMoveMin = new toolboxPoint(1, 50);
	    obj.crWindow.txMoveMax = new toolboxPoint(document.body.clientWidth, document.body.clientHeight);
	    obj.crWindow.setTitle("Forward Mail");
	    obj.crWindow.Show();
	    obj.crWindow.setResizeble(false);
		obj.crWindow.onFormExit = obj.Close;
	    //crNewCallDialog.crWindow.setVisibility(false);		
		
	    var _BODY;
	    _BODY = '<div class="MFCont">';
	    _BODY += '    <table class="MFLayout" cellpadding="0" cellspacing="0">';
	    _BODY += '        <tr>';
	    _BODY += '            <td rowspan="6" style="vertical-align:top; background-image: url(img/LoginMain_Background.png);">';
	    _BODY += '					<img src="img/MailForwardLogo.png" alt="Logo nixxis"/>';
	    _BODY += '			  </td>';
	    _BODY += '            <td colspan="3">Please enter the mail destination:</td>';
	    _BODY += '        </tr>';
	    _BODY += '        <tr>';
	    _BODY += '            <td>Destination:</td>';
	    _BODY += '            <td colspan="2"><input id="MFDestination" class="MFTxt" type="text" MAXLENGTH="200"/></td>';		
	    _BODY += '        </tr>';	
	    _BODY += '        <tr>';
	    _BODY += '            <td></td>';
	    _BODY += '            <td colspan="2"><div id="MFbtnSpam"></td>';		
	    _BODY += '        </tr>';			
	    _BODY += '        <tr>';
	    _BODY += '            <td>Hold until:</td>';
	    _BODY += '            <td colspan="2">';
	    _BODY += '				<select id="MFHoldHour" class="MFSelect"></select>h';
	    _BODY += '				<select id="MFHoldMin" class="MFSelect"></select>m';
		_BODY += '				<select id="MFHoldSec" class="MFSelect"></select>s';
	    _BODY += '			  </td>';		
	    _BODY += '        </tr>';		
	    _BODY += '        <tr>';
	    _BODY += '            <td></td>';
	    _BODY += '            <td colspan="2"><input id="MFSendNow" class="MFSendNow" type="checkbox" />Send current response now</td>';		
	    _BODY += '        </tr>';
	    _BODY += '        <tr>';
	    _BODY += '            <td></td>';
	    _BODY += '            <td><div id="MFbtnOk"></div></td>';
	    _BODY += '            <td><div id="MFbtnCancel"></div></td>';
	    _BODY += '        </tr>';
	    _BODY += '    </table>';
	    _BODY += '</div>';
	    obj.crWindow.txWorkArea[1].innerHTML = _BODY;
	    
		var el = $('MFHoldHour');
		for (var i = 0; i < 72; i++) 
		{
        	var option = document.createElement('option');
        	option.innerHTML = i;
        	option.value = '-1';
        	el.appendChild(option); 
		}
		var el = $('MFHoldMin');
		for (var i = 0; i < 60; i++) 
		{
        	var option = document.createElement('option');
        	option.innerHTML = i;
        	option.value = '-1';
        	el.appendChild(option); 
		}
		var el = $('MFHoldSec');
		for (var i = 0; i < 60; i++) 
		{
        	var option = document.createElement('option');
        	option.innerHTML = i;
        	option.value = '-1';
        	el.appendChild(option); 
		}
		
		var button = null;
	    button = new toolboxButton("name_MFbtnOk", "Ok", function() { crMailForDlg.OnClick_btnOk(); });
	    button.txAbsolute = false;
	    button.txParent = $('MFbtnOk');  
	    button.Show();
		obj.crButtonOk = button;
		
		button = new toolboxButton("name_MFbtnCancel", "Cancel", function() { crMailForDlg.OnClick_btnCancel(); });
	    button.txAbsolute = false;
	    button.txParent = $('MFbtnCancel');  
	    button.Show();
		obj.crButtonOk = button;

		button = new toolboxButton("name_MFbtnSpam", "Spam", function() { crMailForDlg.OnClick_btnSpam(); });
	    button.txAbsolute = false;
	    button.txParent = $('MFbtnSpam');  
	    button.Show();
		obj.crButtonOk = button;
	},
	OnClick_btnOk : function(key)
	{
	    if (!crMailForDlg.crClientLink) return;
		
		////debugger;
		
	    //this.setConnected();
	    var destination = $('MFDestination');
	    if(!destination) return;
		destination = destination.value;
		if(destination == "" || destination == null) return;
				
		var holdHour = $('MFHoldHour');
		if(!holdHour) holdHour = 0;
		else holdHour = holdHour.value;
		
		if(holdHour < 0) holdHour = 0;
		
		var holdMin = $('MFHoldMin');
		if(!holdMin) holdMin = 0;
		else holdMin = holdMin.value;
		
		if(holdMin < 0) holdMin = 0;
		
		var holdSec = $('MFHoldSec');
		if(!holdSec) holdSec = 0;
		else holdSec = holdSec.value;
		
		if(holdSec < 0) holdSec = 0;
		
		var delay = (holdHour * 3600) + (holdMin * 60) + parseInt(holdSec);
			    
		var sendNow = $('MFSendNow');
		if(!sendNow) sendNow = true;
		else sendNow = sendNow.checked;	
		
		try
		{
			__activeClientLinks[crMailForDlg.crLink].commands[crMailForDlg.crCmd].execute(destination, crMailForDlg.crContactId, delay, sendNow);
		} catch(e) 
		{

		}
		crMailForDlg.Close();
	},
	OnClick_btnCancel : function()
	{
		crMailForDlg.Close();
	},
	OnClick_btnSpam : function()
	{
		try
		{
			__activeClientLinks[crMailForDlg.crLink].commands[crMailForDlg.crCmd].execute('@SPAM', crMailForDlg.crContactId, 0, false);
		} catch(e) 
		{

		}
		crMailForDlg.Close();
	}
}