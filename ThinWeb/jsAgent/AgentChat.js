function ChatWindow(name, parent)
{
	var mySelf = this;

	this.id_Border = "__ChatBorder__";
	this.txParent = typeof parent != 'undefined' ? parent : window.document.body;
	this.txName = typeof name != 'undefined' ? name : "";
	this.txTitle = "Chat";
	this.txBorderPanel;
	this.txHistoryList;
	this.txCustomerPrefix = "";
	this.OnChatCustomerMsgReceived = new toolboxMulticastDelegate();
	this.OnChatSendMsg = new toolboxMulticastDelegate();
	
	OnToolboxResize.Add(this, mySelf.Resize);
	
}
ChatWindow.prototype.setTitle = function(title)
{
	this.txTitle = title;
	if (this.txBorderPanel.txTitle) 
		this.txBorderPanel.txTitle = title;
}
ChatWindow.prototype.Show = function()
{
	var _BODY = '';
	_BODY +=  '<table id="NixxisChatLayoutTable' + this.txName + '" class="NixxisChatLayoutTable" cellpadding="0" cellspacing="0">';
	_BODY +=  '	<tr>';
	_BODY +=  '		<td id="NixxisChatMsgHistoryCell' + this.txName + '" class="NixxisChatMsgHistoryCell">';
	_BODY +=  '		</td>';
	_BODY +=  '	</tr>';
	_BODY +=  '	<tr><td id="NixxisChatFreeSpace' + this.txName + '" class="NixxisChatFreeSpace">&nbsp;</td></tr>';
	_BODY +=  '	<tr>';
	_BODY +=  '		<td id="NixxisChatMsgCell' + this.txName + '" class="NixxisChatMsgCell">';
	_BODY +=  '			<div class="NixxisContainer">';
	_BODY +=  '				<table class="NixxisChatMsgTableLayout" cellpadding="0" cellspacing="0">';
	_BODY +=  '					<tr>';
	_BODY +=  '						<td class="NixxisChatMsgTextCell"><textarea id="NixxisChatMsgToSend' + this.txName + '" class="NixxisChatMsgToSend" name="ChatMsgToSend"></textarea></td>';
	_BODY +=  '						<td class="NixxisChatMsgSendCell"><input id="NixxisChatMsgBtnSend' + this.txName + '" class="NixxisChatMsgBtnSend" type="button" value="Send"/></td>';
	_BODY +=  '					</tr>';
	_BODY +=  '				</table>';
	_BODY +=  '			</div>';
	_BODY +=  '		</td>';
	_BODY +=  '	</tr>';
	_BODY +=  '</table>';

	this.txBorderPanel = new BorderFrame(this.id_Border + this.txName, this.txParent);
	this.txBorderPanel.setTitle(this.txTitle);
	this.txBorderPanel.Show();

	var _Work = this.txBorderPanel.getWorkspace();
	_Work.innerHTML = _BODY;
		
	this.txHistoryList = new toolboxListbox("ListBox1")	
	this.txHistoryList.txParent = $('NixxisChatMsgHistoryCell' + this.txName);
	this.txHistoryList.txBoxCss = "NixxisChatBox";
	this.txHistoryList.Show();

	var mySelf = this;
	var btnSend = $("NixxisChatMsgBtnSend" + this.txName);
	var txtMsg = $("NixxisChatMsgToSend" + this.txName);
	btnSend.onclick = function ()
	{
		var _Msg = $("NixxisChatMsgToSend" + mySelf.txName).value;
		mySelf.OnChatSendMsg.Invoke(_Msg);
		$("NixxisChatMsgToSend" + mySelf.txName).value = "";
	};
	txtMsg.onkeypress = function (e)
	{
		var keycode;
	    if (window.event) keycode = window.event.keyCode;
	    else if (e) keycode = e.which;
	    else return true;

	    if (keycode == 13)
	       {
	           btnSend.onclick();
	           return false;
	       }
	    else
	       return true;

	};
}
ChatWindow.prototype.AddAgentMsg = function(msg)
{
	var _Date = new Date();
	
	if (!this.txHistoryList) 
		return;
	
	var _Item = new toolboxListboxItem();
	_Item.txIcon = new toolboxImage("img/Chat_AgentMsg.png", new toolboxSize(36, 36));
	_Item.txText = this.DisplayMessage("<SPAN style='color: gray'>[" + _Date.getHours() + ":" + _Date.getMinutes() + ":" + _Date.getSeconds() + "] Agent </SPAN> <br/>" +  msg);
	_Item.txTextCss = "NixxisChatBoxAgentText";
	_Item.txDoHover = false;
	_Item.txItemCss = "NixxisChatPBoxItem";
	this.txHistoryList.txList.Add(_Item);
	
	//window.setTimeout("timerChatAnswer();", 5000, "javascript");
}
ChatWindow.prototype.AddCustomerMsg = function(msg, from)
{
	var _Date = new Date();
	
	if (!this.txHistoryList) 
		return;
		
	var _Item = new toolboxListboxItem();
	//_Item.txIcon = new toolboxImage("img/Chat_AgentMsg.jpg", new toolboxSize(38,30));
	_Item.txText = this.DisplayMessage("<SPAN style='color: gray'>[" + _Date.getHours() + ":" + _Date.getMinutes() + ":" + _Date.getSeconds() + "] " + from + " </SPAN> <br/><strong>" +  msg + "</strong>");
	_Item.txTextCss = "NixxisChatBoxCustomerText";
	_Item.txDoHover = false;
	_Item.txItemCss = "NixxisChatPBoxItem";
	this.txHistoryList.txList.Add(_Item);
	
	this.OnChatCustomerMsgReceived.Invoke();
}
ChatWindow.prototype.AddLeaveMsg = function(msg, from)
{
	var _Date = new Date();
	
	if (!this.txHistoryList) 
		return;
		
	var _Item = new toolboxListboxItem();
	_Item.txText = this.DisplayMessage("<SPAN>[" + _Date.getHours() + ":" + _Date.getMinutes() + ":" + _Date.getSeconds() + "] " + from + ":  <strong>" +  msg + "</strong></SPAN>");
	_Item.txTextCss = "NixxisChatLeaveMsg";
	_Item.txDoHover = false;
	_Item.txItemCss = "NixxisChatPBoxItem";
	this.txHistoryList.txList.Add(_Item);
	
	this.OnChatCustomerMsgReceived.Invoke();
}
ChatWindow.prototype.DisplayMessage = function(msg)
{
	//debugger;
	var _Msg = msg;
	
	_Msg = _Msg.replace('{__agentName}', "Agent");
	//_Msg = _Msg.replace('{__year}', this.txCustomerPrefix);
	//_Msg = _Msg.replace('{__month}', this.txCustomerPrefix);
	//_Msg = _Msg.replace('{__day}', this.txCustomerPrefix);
	//_Msg = _Msg.replace('{__hours}', this.txCustomerPrefix);
	//_Msg = _Msg.replace('{__min}', this.txCustomerPrefix);
	//_Msg = _Msg.replace('{__sec}', this.txCustomerPrefix);
	
	return _Msg;
}
ChatWindow.prototype.Resize = function()
{	
	var _Height = this.txBorderPanel.getWorkspace().clientHeight - $('NixxisChatMsgCell' + this.txName).clientHeight - $('NixxisChatFreeSpace' + this.txName).clientHeight;
	//alert ("ChatWindow(" + this.txName + ") resize height:" + _Height);	
	$('NixxisChatMsgHistoryCell' + this.txName).style.height = _Height + "px";		
}
ChatWindow.prototype.setText = function(text)
{
	var _Input = $("NixxisChatMsgToSend" + this.txName);
	_Input.value += text;
}
/*
var _txMsg = ["Hello. I need some flight information please."];
var _tsCounter = 0;
function timerChatAnswer()
{
	if(_tsCounter == 1) return;
	
	//window._ChatWindow.AddCustomerMsg(_txMsg[_tsCounter]);
	window._ChatWindow.AddCustomerMsg(NixxisContactLink.demo.GetChatMsg());
	
	_tsCounter++;
}*/
