function crManuelCallForm ()
{
    this.crForm;
    this.DialPadBtn = new Array(); 
    this.Dialing = false;
    this.txClientLink;
    this.txIcon = null;
    this.txTxtPhone = null;
}

crManuelCallForm.prototype.Create = function()
{
    this.crForm = new toolboxForm("MCall");
    this.crForm.txParent = document.body;
    this.crForm.txSize = new toolboxSize(260, 265);
    this.crForm.txLocation = new toolboxPoint(1, 50);
    this.crForm.txMoveMin = new toolboxPoint(1, 50);
    this.crForm.txMoveMax = new toolboxPoint(document.body.clientWidth, document.body.clientHeight);
    this.crForm.setTitle(CrResource.ManualCallForm.Title);
    this.crForm.Show();
    this.crForm.setResizeble(false);
    this.crForm.setVisibility(false);

    this.DrawForm();
    this.crForm.setUserBackground(true, "#3b393c", "url('img/ManualCall_Background.png')", [["background-repeat","repeat-x"]])
}

crManuelCallForm.prototype.DrawForm = function()
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
    _BODY += '                                  <input id="MCNum" class="MCNum" type="text" onkeypress="javascript: return telephoneKeys(event);"/>';
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
    this.DialPadBtn[_Key].txImage         = new toolboxImage("img\\btnPad_Dial.png", new toolboxSize(80, 37));
    this.DialPadBtn[_Key].txImageOver     = new toolboxImage("img\\btnPadOver_Dial.png", new toolboxSize(80, 37));
    this.DialPadBtn[_Key].txImageFocus    = new toolboxImage("img\\btnPad_Dial.png", new toolboxSize(80, 37));
    this.DialPadBtn[_Key].txImageDisabled = new toolboxImage("img\\btnPad_Dial.png", new toolboxSize(80, 37));    
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
    this.DialPadBtn[_Key].txImage         = new toolboxImage("img\\btnPad_Clear.png", new toolboxSize(80, 37));
    this.DialPadBtn[_Key].txImageOver     = new toolboxImage("img\\btnPadOver_Clear.png", new toolboxSize(80, 37));
    this.DialPadBtn[_Key].txImageFocus    = new toolboxImage("img\\btnPad_Clear.png", new toolboxSize(80, 37));
    this.DialPadBtn[_Key].txImageDisabled = new toolboxImage("img\\btnPad_Clear.png", new toolboxSize(80, 37)); 
    this.DialPadBtn[_Key].txAlt = "Clear";
    this.DialPadBtn[_Key].txTitle = "Clear";       
    this.DialPadBtn[_Key].Show();
    
    this.setStatus(CrResource.ManualCallForm.StatusEnterNumber);
}

crManuelCallForm.prototype.CreateButton = function(key, onclickFn)
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
crManuelCallForm.prototype.ButtonClick = function(key)
{
    var _Element = $('MCNum');
    var _Key = key;
    if (key == 'Star') _Key = '*';
    if (key == 'Hash') _Key = '#';
    _Element.value += _Key;
}
crManuelCallForm.prototype.ButtonClear = function()
{
    var _Element = $('MCNum');
    _Element.value = '';
}
crManuelCallForm.prototype.ButtonDial = function()
{
    if (!this.txClientLink) return;

    this.setConnected();
    var _Element = $('MCNum');
    if(!_Element) return;
    
    this.txClientLink.commands.VoiceNewCall.execute(_Element.value);
}
crManuelCallForm.prototype.Show = function()
{
    if (this.crForm.txVisible) { this.crForm.setVisibility(false); }
    else { this.crForm.setVisibility(true); }
}
crManuelCallForm.prototype.setConnected = function()
{
    //this.txIcon.src = "Img\\tbVoice_MCallConnected.png";
    //this.txTxtPhone.disabled = true;
    //removeElementClass(this.txTxtPhone, "Connecting");
    //addElementClass(this.txTxtPhone, "Connected");
    //this.crForm.setVisibility(false);
    this.setStatus(CrResource.ManualCallForm.StatusWaiting);
    
}
crManuelCallForm.prototype.setConnecting = function()
{
    
}
crManuelCallForm.prototype.setDisconnected = function()
{
    //this.txIcon.src = "Img\\tbVoice_MCall.png";
    //this.txTxtPhone.disabled = false;
    //removeElementClass(this.txTxtPhone, "Connecting");
    //removeElementClass($(this.txTxtPhone), "Connected");
    this.setStatus(CrResource.ManualCallForm.StatusEnterNumber);
    
}

crManuelCallForm.prototype.setStatus = function(text)
{
      $("MCText").innerHTML = text;
}