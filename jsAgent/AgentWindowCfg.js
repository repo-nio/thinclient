var tabContacts;
var _NoTabPagePanel;
var _MsgCount=-1;
var _Msg = ["Hello. I need some flight information please.", "Hello. I want to book a flight."];
var _Test_ChatId = ""; 
var _CurrentContacts = [];

function GetChatMsg()
{
	_MsgCount++;
	return _Msg[_MsgCount];
}
function Init_Window()
{
	//Set propertygrid
	$("PropertyGridCat_Agent").onclick = PropertyGridAgent_onclick;
	$("PropertyGridCat_Agent").txVisible = true;
	
	$("PropertyGridCat_Queue").onclick = PropertyGridQueue_onclick;
	$("PropertyGridCat_Queue").txVisible = true;
	
	$("PropertyGridCat_Contact").onclick = PropertyGridContact_onclick;
	$("PropertyGridCat_Contact").txVisible = true;
	
	PropertyGridHeight();
	
	//$("PropertyGridList_Agent")
	//$("PropertyGridCatImg_Agent")
	
    //setInterval(checkForMessages, 200);
	
    //Agent tools
	setDefaultToolbarLayout($('CloseScript'),       function() { CloseScript(); });
	setDefaultToolbarLayout($('Selectqual'),       function() { dbgQualification(); });
	setDefaultToolbarLayout($('SearchMode'),       function() { dbgSearchMode(); });
	setDefaultToolbarLayout($('TeamSelection'),       function() { btnTeamSelection(); });
	setDefaultToolbarLayout($('AgentLogout'),       function() { btnMiniMode(); });

	var _TabPage;

    tabContacts = new toolboxTabControl("tabControlContacts");
	tabContacts.txRenderManager = toolboxTabControlNixxisRenderManager;

	_NoTabPagePanel = new crNoTabPagePanel(tabContacts.getNoTabPageWindow());
	_NoTabPagePanel.Show();
	_NoTabPagePanel.setUrl("CrAgentPause.htm");

    ClientLink.ContactAdded.Add(this, nixxislink_ConactAdded);
    ClientLink.ContactStateChanged.Add(this, nixxislink_ContactStateChanged);
	ClientLink.ContactRemoved.Add(this, nixxislink_ContactRemoved);
	ClientLink.ContactTopLabelChange.Add(this, nixxislink_ContactTopLabelChange);
	ClientLink.ContactBottomLabelChange.Add(this, nixxislink_ContactBottomLabelChange);
	ClientLink.ContactRequestAction.Add(this, nixxislink_ContactRequestAction);
	ClientLink.ChatReceivedMsg.Add(this, nixxislink_ChatReceivedMsg);
	ClientLink.AgentWarning.Add(this, nixxislink_AgentWarning);
	ClientLink.AgentQueueState.Add(this, nixxislink_AgentQueueState);
    ClientLink.commands.WaitForCall.stateChanged.Add(this, WaitFor_StateChanged);
    ClientLink.commands.Pause.stateChanged.Add(this, WaitFor_StateChanged);
	ClientLink.commands.WaitForMail.stateChanged.Add(this, WaitFor_StateChanged);
	ClientLink.commands.WaitForChat.stateChanged.Add(this, WaitFor_StateChanged);
	ClientLink.commands.VoiceHold.stateChanged.Add(this, VoiceHold_StateChanged);
	ClientLink.commands.VoiceRetrieve.stateChanged.Add(this, VoiceRetrieve_StateChanged);
	//ClientLink.commands.MailHangup.beforeOnClick.Add(this, MailHangup_beforeOnClick);
	ClientLink.commands.MailReply.beforeOnClick.Add(this, MailReply_beforeOnClick);
	ClientLink.commands.MailForward.beforeOnClick.Add(this, MailReply_beforeOnClick);
	
	PropertyGridHeight();
}
function DisposeClient()
{
	try
	{
		window.clearTimeout(DisplayDateTimeElapsed);
		
		// tabContacts.txRenderManager = null;
		// tabContacts.OnTabSelection = null;
		// tabContacts.OnDockChange = null;
		// tabContacts.txParent[txTabControlPart.selector] = null;
		// tabContacts.txParent[txTabControlPart.page] = null;
		// _NoTabPagePanel = null;
		_CurrentContacts = null;
		
	    ClientLink.ContactAdded.Remove(this, nixxislink_ConactAdded);
	    ClientLink.ContactStateChanged.Remove(this, nixxislink_ContactStateChanged);
		ClientLink.ContactRemoved.Remove(this, nixxislink_ContactRemoved);
		ClientLink.ContactTopLabelChange.Remove(this, nixxislink_ContactTopLabelChange);
		ClientLink.ContactBottomLabelChange.Remove(this, nixxislink_ContactBottomLabelChange);
		ClientLink.ContactRequestAction.Remove(this, nixxislink_ContactRequestAction);
			
		ClientLink.AgentWarning.Remove(this, nixxislink_AgentWarning);
		ClientLink.AgentQueueState.Remove(this, nixxislink_AgentQueueState);
	    ClientLink.commands.WaitForCall.stateChanged.Remove(this, WaitForCall_StateChanged);
		//ClientLink.commands.WaitForMail.stateChanged.Remove(this, WaitForMail_StateChanged);
		//ClientLink.commands.WaitForChat.stateChanged.Remove(this, WaitForChat_StateChanged);
		ClientLink.commands.VoiceHold.stateChanged.Remove(this, VoiceHold_StateChanged);
		ClientLink.commands.VoiceRetrieve.stateChanged.Remove(this, VoiceRetrieve_StateChanged);
	}
	catch(e) {}
}
function ClientConnect()
{
	// sessionStorage.setItem('reloadedOn', new Date());
    
	if(startdatetime == null) startdatetime = new Date();

	DebugLog("Nixxislink connect...");
	
    ClientLink.connect();	
	SetAgentInfoStat();
    DebugLog("Loading pause page...");
	crLoadingScreen.Visible(false);

	window.localStorage.setItem("NixxisAgentLoginUser", ClientLink.UserName + ";"+ ClientLink.Extension);
	debugger;
	window.localStorage.setItem("NixxisAgentLoginUser_History", ClientLink.UserAccount);
	window.localStorage.setItem("NixxisAgentLoginUserExtension_History", ClientLink.Extension);
	

	$('divAgentStatus').onclick = onAgentStatusClick;
	ShowHideVoiceToolStripIcons(false);
	ShowHideVoiceStatusToolStripIcons(false);
	// window.setTimeout(DisplayDateTimeElapsed, 1000);
	DisplayDateTimeElapsed();

	// debugger;
	if(!ClientLink.commands.WaitForCall.active)
	{
		removeElementClass($('Pause'), 'disabled');
		removeElementClass($('Info_AgentReadyVoiceIndication'), 'active');
		removeElementClass($('WaitForCall'), 'active');
		addElementClass($('Pause'), 'active');
	}
	else
	{
		removeElementClass($('Pause'), 'active');
		// addElementClass($('WaitForCall'), 'active');
		$('WaitForCall').click();
		addElementClass($('Info_AgentReadyVoiceIndication'), 'active');
	}

	// debugger;
	if(ClientLink.AgentId == null || ClientLink.AgentId == '')
	{
		location.reload();
	}
}

function ForceBreakOnAgentReload()
{
	debugger;

	if (window.performance) 
	{	  
	  console.info(performance.navigation.type);

	  if (performance.navigation.type == performance.navigation.TYPE_RELOAD) 
	  {
		console.info( "page reloaded" );
		debugger;
		try
		{			
			CloseScript();
			ClientLink.connection.executeCommand('3');
			removeElementClass($('WaitForCall'), 'active');
			$('WaitForCall').disabled = false;
			
		    // const sleep = ms => new Promise(r => setTimeout(r, 2000));

			// location.reload();
		}
		catch(e)
		{
			;
		}
	  }
	  else
	  {
		console.info( "CLOSED page" );
	  }
	}
}

function onAgentStatusClick()
{
	if($("Info_AgentReadyVoiceIndication").style.display == "none")
	{
		$("Info_AgentReadyVoiceIndication").style.display = "inline";

		$("Info_QueueWaitingHeader").textContent  = 'Waiting contacts:';
		$("Info_QueueWaiting").textContent  = '0';

		$("Info_QueueHighPriorityHeader").textContent  = 'Priority contacts:';
		$("Info_QueueHighPriority").textContent  = '0 - 0';

		$("Info_AgentStateHeader").textContent  = 'State:';
		$("Info_AgentState").textContent  = 'Break';

		$("Info_AgentSessionDurationHeader").textContent  = 'Duration:';

		$("Info_AgtName_Account").innerHTML  = $D(ClientLink.UserName)+' ('+$D(ClientLink.Extension)+')';
	}
}

var startdatetime;
function DisplayDateTimeElapsed()
{
	// debugger;

	if(startdatetime == null) startdatetime = new Date();

	var enddatetime = new Date();
	var timediff = enddatetime - startdatetime;
	
	var seconds=FormatTime(timediff);

	SetAgentInfoStat();
	
	if( ClientLink.UserLastWarning[0]?.includes("Session%20disconnected%20due%20to%20new%20login%20request"))
	{
		setSessionDisconnectedMessage('Session disconnected due to new login request');
	}
	else if($("Info_AgentReadyVoiceIndication").style.display != "none")
	{
		$("Info_AgentSessionDurationHeader").textContent = 'Duration:';
		$("Info_AgentSessionDuration").textContent = seconds;
	}

	setTimeout(DisplayDateTimeElapsed, 1000);
}

function setSessionDisconnectedMessage(msg)
{
	$("Info_QueueWaitingHeader").textContent  = msg;
	$("Info_QueueWaiting").textContent  = '';

	$("Info_QueueHighPriorityHeader").textContent  = '';
	$("Info_QueueHighPriority").textContent  = '';

	$("Info_AgentStateHeader").textContent  = '';
	$("Info_AgentState").textContent  = '';

	$("Info_AgentSessionDurationHeader").textContent  = '';
	$("Info_AgentSessionDuration").textContent  = '';

	$("Info_AgtName_Account").textContent  = '';

	$("Info_AgentReadyVoiceIndication").style.display = "none";
}

function defaultSetAgentInfoLabels()
{
	$("Info_QueueWaitingHeader").textContent  = 'Waiting contacts:';
	$("Info_QueueWaiting").textContent  = '0';

	$("Info_QueueHighPriorityHeader").textContent  = 'Priority contacts:';
	$("Info_QueueHighPriority").textContent  = '0 - 0';

	$("Info_AgentStateHeader").textContent  = 'State:';
	$("Info_AgentState").textContent  = 'Break';

	$("Info_AgentSessionDurationHeader").textContent  = 'Duration:';
	$("Info_AgtName_Account").textContent  = '';

	$("Info_AgentReadyVoiceIndication").style.display = "inline";
}

function pageResize()
{
	// DebugLog("pageResize. new body " + document.body.clientHeight + ". Toolbar " + $('NixxisAgentToolbarAreaRow').clientHeight + ". BottomRow " + $('NixxisDockBottomRow').clientHeight);

	// var _NewHeight = document.body.clientHeight - $('NixxisAgentToolbarAreaRow').clientHeight - $('NixxisDockBottomRow').clientHeight;
	// DebugLog("pageResize. new height " + _NewHeight); 
	// $('NixxisAgentWorkAreaRow').style.height = _NewHeight + "px";
	// $('NixxisDockLeft').style.height = _NewHeight + "px";
	// $('NixxisAgentContactAreaCell').style.height = _NewHeight + "px";
	// $('NixxisDockRight').style.height = _NewHeight + "px";
	
}
//**********************************************************
//--> < Event >

function PropertyGridAgent_onclick(e)
{
	if ($("PropertyGridCat_Agent").txVisible)
	{
		addElementClass($("PropertyGridList_Agent"), "ProListHide");
		$("PropertyGridCat_Agent").txVisible = false;	
		$("PropertyGridCatImg_Agent").src = "Img/DefaultSkin/Common_More.png";	
	}
	else
	{
		removeElementClass($("PropertyGridList_Agent"), "ProListHide");
		$("PropertyGridCat_Agent").txVisible = true;
		$("PropertyGridCatImg_Agent").src = "Img/DefaultSkin/Common_Less.png";
	}
	PropertyGridHeight();
}
function PropertyGridQueue_onclick(e)
{
	if ($("PropertyGridCat_Queue").txVisible)
	{
		addElementClass($("PropertyGridList_Queue"), "ProListHide");
		$("PropertyGridCat_Queue").txVisible = false;
		$("PropertyGridCatImg_Queue").src = "Img/DefaultSkin/Common_More.png";	
	}
	else
	{
		removeElementClass($("PropertyGridList_Queue"), "ProListHide");
		$("PropertyGridCat_Queue").txVisible = true;
		$("PropertyGridCatImg_Queue").src = "Img/DefaultSkin/Common_Less.png";
	}
	PropertyGridHeight();
}
function PropertyGridContact_onclick(e)
{
	if ($("PropertyGridCat_Contact").txVisible)
	{
		addElementClass($("PropertyGridList_Contact"), "ProListHide");
		$("PropertyGridCat_Contact").txVisible = false;
		$("PropertyGridCatImg_Contact").src = "Img/DefaultSkin/Common_More.png";	
	}
	else
	{
		removeElementClass($("PropertyGridList_Contact"), "ProListHide");
		$("PropertyGridCat_Contact").txVisible = true;
		$("PropertyGridCatImg_Contact").src = "Img/DefaultSkin/Common_Less.png";
	}
	PropertyGridHeight();
}
function PropertyGridHeight()
{
	var _Height = $("txPropertyGrid_AgentInfo").clientHeight; //+ $("txPropertyGridHelpContainer_AgentStat").clientHeight
	// $("txPropertyGridContainer_AgentInfo").style.height = _Height + "px";
}


function nixxislink_ConactAdded(contactInfo)
{
	debugger;

	if(_CurrentContacts)
	{
		for(var i = 0; i < _CurrentContacts.length; i++)
		{
			_CurrentContacts[i].isInUse = false;
		}
	}

	contactInfo.isInUse = true;
	_CurrentContacts.push(contactInfo);

	DebugLog("nixxislink_ConactAdded. Add contact " + contactInfo.Id);
	contactInfo.__AgentAction = "S";

	addVoiceStatus(contactInfo);
	setVoiceDisplayStatus();
	DisplayContactActivityDateTimeElapsed(contactInfo.Id , null);

	if (contactInfo.Media == "V") 
	{
		contactInfo.__ContactUpdate = true;
		// addElementClass($('VoiceToolStrip'),'active');
		ShowHideVoiceToolStripIcons(true);
		// addElementClass($('voiceStatusToolStrip'),'active');
		ShowHideVoiceStatusToolStripIcons(true);

		if(contactInfo.Context == 'Customer service')
		{
			addElementClass($('ExtendWrapup'),'active');
			removeElementClass($('CloseScript'),'active');
			$('ExtendWrapup').disabled = false;
			AgentStateOnline();
		}
		else
		{
			removeElementClass($('ExtendWrapup'),'active');
			removeElementClass($('CloseScript'),'active');
			$('ExtendWrapup').disabled = true;
			AgentStateWorking();
		}
	}
	else 
	{
		contactInfo.__ContactUpdate = false; 
	}
	
	// start tmp -->
	if (contactInfo.Media == "C") _Test_ChatId = contactInfo.Id;
	// <-- End tmp
	
	contactInfo.__LabelTop = "";
	if (contactInfo.Direction == "I") 
	{
		contactInfo.__LabelBottom = contactInfo.From;
		$('InfoContactOriginator_'+ contactInfo.Id).textContent = contactInfo.To;		
	}
	else 
	{
		contactInfo.__LabelBottom = contactInfo.To;
		$('InfoContactTo_'+ contactInfo.Id).textContent = contactInfo.To;
	}
	
	// debugger;

	// NewContact(contactInfo);
	
	SetAgentInfoStat();
	SetContactInfoBox(contactInfo.Id);

	$('contactViewerObject').style.display = "none";
	
	if(contactInfo.ScriptUrl)
	{
		$('NixxisAgent').src = contactInfo.ScriptUrl;
		$('NixxisAgent').style.display ='inline';
	}
	else
	{
		$('NixxisAgent').src = "about:blank";
		$('NixxisAgent').style.display ='none';
	}

	$("AgentLogout").disabled = true;
	$("SearchMode").disabled = true;
}
function addVoiceStatus(contactInfo)
{

	var voiceDIV = document.createElement('div');
	voiceDIV.id = 'voicestatus_' + contactInfo.Id;
	voiceDIV.className = 'status';	

	var _BODY = '';

	// _BODY += '<div class="status" id= "voicestatus_' + contactInfo.Id + '">';
	_BODY += '	<div>';
	_BODY += '		<img src="./assets/icons/Agent_MediaType_Outbound_25.png" alt="icon" />';
	_BODY += '	</div>';
	
	_BODY += '	<div>';
	_BODY += '		<ul id="voiceULControl_' + contactInfo.Id + '">';
	_BODY += '			<li class="row">';
	_BODY += '				<strong id="InfoContactActivity_' + contactInfo.Id + '"></strong>';
	_BODY += '				<span id="InfoContactStatusDuration_' + contactInfo.Id + '"></span>';
	_BODY += '			</li>';

	_BODY += '			<li class="row">';
	_BODY += '				<span >From:</span>';
	_BODY += '				<span id="InfoContactOriginator_' + contactInfo.Id + '"></span>';
	_BODY += '			</li>';

	_BODY += '			<li class="row">';
	_BODY += '				<span>To:</span>';
	_BODY += '				<span id="InfoContactTo_' + contactInfo.Id + '"></span>';
	_BODY += '			</li>';

	_BODY += '			<li class="row">';
	_BODY += '				<span>State:</span>';
	_BODY += '				<span id="InfoContactState_' + contactInfo.Id + '"></span>';
	_BODY += '			</li>';

	_BODY += '			<li class="row">';
	_BODY += '				<span>Customer:</span>';
	_BODY += '				<span id="InfoContactCustomer_' + contactInfo.Id + '"></span>';
	_BODY += '			</li>';

	_BODY += '		</ul>';
	_BODY += '	</div>';
	// _BODY += '</div>';

	voiceDIV.innerHTML = _BODY;
	voiceDIV.ContactInfo = contactInfo;
	voiceDIV.onclick = function(){voicestatus_clicked(this);}

	// $('voiceStatusInfoParent').innerHTML += _BODY;	
	$('voiceStatusInfoParent').appendChild(voiceDIV);

	// $('voicestatus_' + contactInfo.Id).ContactInfo = contactInfo;
	// $('voicestatus_' + contactInfo.Id).onclick = function(){voicestatus_clicked(this);}
}
function setVoiceDisplayStatus()
{
	addElementClass($('voiceStatusInfoParent'), 'statusparent');

	if(_CurrentContacts.length == 1)
	{
		removeElementClass($('voicestatus_'+_CurrentContacts[0].Id), 'small');
		removeElementClass($('voiceULControl_'+_CurrentContacts[0].Id), 'ULsmall');
		
		$('voicestatus_'+_CurrentContacts[0].Id).style = 'background-color: #00cffd; justify-content: center !important;';
	}
	else if(_CurrentContacts.length > 1)
	{
		for(var i = 0; i < _CurrentContacts.length; i++)
		{
			addElementClass($('voicestatus_'+_CurrentContacts[i].Id), 'small');
			addElementClass($('voiceULControl_'+_CurrentContacts[i].Id), 'ULsmall');

			$('voicestatus_'+_CurrentContacts[i].Id).style = 'background-color: #676767;';
		}
		
		$('voicestatus_'+_CurrentContacts[_CurrentContacts.length - 1].Id).style = 'background-color: #00cffd;';
		$('voicestatus_'+_CurrentContacts[_CurrentContacts.length - 1].Id).scrollIntoView(false);
	}
}
function voicestatus_clicked(sender)
{
	debugger;
	if(sender && sender.ContactInfo)
	{
		ClientLink.SetActiveContact(sender.ContactInfo);
		ClientLink.Contacts.Get(sender.ContactInfo.Id).__ContactUpdate = false;

		for(var i = 0; i < _CurrentContacts.length; i++)
		{
			_CurrentContacts[i].isInUse = false;
			$('voicestatus_' + _CurrentContacts[i].Id).style = 'background-color: #676767;';
		}

		$('voicestatus_' + sender.ContactInfo.Id).style = 'background-color: #00cffd;';
		sender.ContactInfo.isInUse = true;
	}
}
function nixxislink_ContactRemoved(contactInfo)
{
	debugger;

	defaultSetAgentInfoLabels();
	_CurrentContacts.pop(contactInfo);
    DebugLog("nixxislink_ContactRemoved. Remove contact " + contactInfo.Id);
	contactInfo.__AgentAction = "E";
	//contactInfo.__Panel.dispose();
	
	RemoveContact(contactInfo);
	$('voiceStatusInfoParent').removeChild($('voicestatus_'+contactInfo.Id));
	setVoiceDisplayStatus();

	//PurgeElement(contactInfo.__Panel);
	//contactInfo.__Panel = null;
	
	SetAgentInfoStat();
}
function nixxislink_ContactStateChanged(contactInfo)
{
    DebugLog("nixxislink_ContactStateChanged. contactId " + contactInfo.Id + ". State " + contactInfo.State + ". Media " + contactInfo.Media);
	                if(contactInfo.State == 'A')
						contactInfo.__AgentAction = "S";
	                if(contactInfo.State == 'P')
						contactInfo.__AgentAction = "P";						
	                if(contactInfo.State == 'C')
						contactInfo.__AgentAction = "O";
					if(contactInfo.State == 'D')
						contactInfo.__AgentAction = "W";
						
					if ((contactInfo.State == 'A' && !ClientLink.Contacts.ActiveContactId) || contactInfo.State == 'C' || contactInfo.State == 'P') {
						ClientLink.SetActiveContact(contactInfo);
						if (contactInfo.Media == "V")
							tabContacts.SelectTabPage(contactInfo.__TabId);
						
						try {
						//document.getElementById('Application').OnContactConnected(contactInfo);
						} 
						catch (e) {
							;
						}
					}
					else 
						if (contactInfo.State == 'D') {
							try 
							{
								if (contactInfo.Media == "M") 
								
								{
									DebugLog("nixxislink_ContactStateChanged. contactId " + contactInfo.Id + ". Disable edit mail.");
									contactInfo.__Panel.SetDisableReply();
								}
							//document.getElementById('Application').OnContactDisconnected(contactInfo);
							} 
							catch (e) {
								;
							}
							
							//ClientLink.TerminateContact(contactInfo);
						}
					////debugger;
					SetTabButtonClass($(toolboxTabControlNixxisRenderManager.txTab_TabButtonItem + contactInfo.__TabId), contactInfo.Id);
					SetAgentInfoStat();						
}
function nixxislink_ContactTopLabelChange(contactInfo, text)
{
	contactInfo.__LabelTop = text;
	DebugLog("nixxislink_ContactTopLabelChange. contact " + contactInfo.Id + ". Text:" + text);
	SetContactInfoBox(contactInfo.Id);
}
function nixxislink_ContactBottomLabelChange(contactInfo, text)
{
	contactInfo.__LabelBottom = text;
	DebugLog("nixxislink_ContactBottomLabelChange. contact " + contactInfo.Id + ". Text:" + text);
	SetContactInfoBox(contactInfo.Id);
}
function nixxislink_ContactRequestAction(contactInfo)
{
	contactInfo.__ContactUpdate = true;	
	SetTabButtonClass($(toolboxTabControlNixxisRenderManager.txTab_TabButtonItem + contactInfo.__TabId), contactInfo.Id);
}

function nixxislink_ChatReceivedMsg(contactId, customerIdent, msg)
{
	////debugger;
	//TO DO Check contact id
	var _Container = $(toolboxTabControlNixxisRenderManager.txTab_PageItem + contactId);
	_Container.firstChild.contentWindow._ChatWindow.AddCustomerMsg(msg)
	//ClientLink.SetContactRequestAction(contactId);
}
function nixxislink_AgentWarning(message)
{
	// debugger;

	DebugLog("nixxislink_AgentWarning. message:" + message);

	if(message != '')
	{
		setSessionDisconnectedMessage(decodeURIComponent(message));
	}
	else
	{
		$("Info_AgentSessionDurationHeader").textContent = 'Duration:';
		$("Info_AgentSessionDuration").textContent = '0:00:00';
	}	

	// crStatusWindow.AddMsg(message);
}
function nixxislink_AgentQueueState(state)
{
	// debugger;
	
	if($("Info_AgentReadyVoiceIndication").style.display != "none")
	{
		$("Info_QueueHighPriority").innerHTML = state[0] +' - '+ state[2];
		$("Info_QueueWaiting").innerHTML = state[1];
	}

	if(state[1] != null && state[1] != '' && state[1] != '0'
		&& state[0] != null && state[0] != '' && state[0] != '0') addElementClass($("divAgentStatus"),'highlight');
	else if(state[1] != null && state[1] != '' && state[1] != '0') addElementClass($("divAgentStatus"),'highlight');
	else 
	{
		removeElementClass($("divAgentStatus"),'highlight');
		removeElementClass($("divAgentStatus"),'highlightRed');
	}

	DebugLog("nixxislink_AgentQueueState. message:" + state);
}
function WaitFor_StateChanged(authorized, active)
{
	// debugger;

    DebugLog("WaitFor_StateChanged. authorized:" + authorized + ". active:" + active );
	
	if (!authorized) return;
	
	if(ClientLink.commands.WaitForCall.active)
	{
        DebugLog("Waiting Call");
		AgentStateWaiting();
	}
	else if(ClientLink.commands.Pause.active)
	{
		DebugLog("Pause");
		AgentStatePause();
	}
	else
	{
		// if(ClientLink.commands.WaitForMail.active)
		// {
	    //     DebugLog("Waiting Mail");
		// 	AgentStateWaiting();
		// }
		// else
		// {
		// 	if(ClientLink.commands.WaitForChat.active)
		// 	{
		//         DebugLog("Waiting Chat");
		// 		AgentStateWaiting();
		// 	}
		// 	else
		// 	{
		//         DebugLog("Pause");
		// 		AgentStatePause();
		// 	}
		// }
	}
    
	// SetAgentInfoStat();
}

function VoiceHold_StateChanged(authorized, active)
{
	DebugLog("VoiceHold_StateChanged. authorized:" + authorized + ". active:" + active );
	if (!authorized) return;
	if(active)
    {
        DebugLog("onhold");
		ClientLink.Contacts.Get(ClientLink.Contacts.ActiveContactId).__AgentAction = "H";
    }
    else
    {
        DebugLog("online");
		ClientLink.Contacts.Get(ClientLink.Contacts.ActiveContactId).__AgentAction = "O";
    }
}
function VoiceRetrieve_StateChanged(authorized, active)
{
	DebugLog("VoiceRetrieve_StateChanged. authorized:" + authorized + ". active:" + active );
	if (!authorized) return;
	if(active)
    {
        DebugLog("online");
		ClientLink.Contacts.Get(ClientLink.Contacts.ActiveContactId).__AgentAction = "O";
    }
    else
    {
        DebugLog("onhold");
		ClientLink.Contacts.Get(ClientLink.Contacts.ActiveContactId).__AgentAction = "H";
    }
}
function MailReply_beforeOnClick()
{
	var contactInfo = ClientLink.Contacts.Get(ClientLink.Contacts.ActiveContactId);
	var request, response;
	try 
	{
		////debugger;
		var msg = contactInfo.__Panel.GetReply2();
		if (window.XMLHttpRequest) { request = new XMLHttpRequest(); } // code for IE7+, Firefox, Chrome, Opera, Safari
		else { request = new ActiveXObject("Microsoft.XMLHTTP"); }// code for IE6, IE5
		request.open('POST', window.location.protocol + "//" + window.location.host + contactInfo.ContentLink + "response2" , false);
		request.send(msg);
		response = request.responseText;
		//contactInfo.__Panel.SetDisableReply();
	}
	catch(e){}	
}
function MailHangup_beforeOnClick()
{
	var contactInfo = ClientLink.Contacts.Get(ClientLink.Contacts.ActiveContactId);
	var request, response;
	try 
	{
		////debugger;
		var t = tabContacts.txTabPages.Items[ClientLink.Contacts.ActiveContactId].firstChild.contentWindow.GetEMailMsg();
		if (window.XMLHttpRequest) { request = new XMLHttpRequest(); } // code for IE7+, Firefox, Chrome, Opera, Safari
		else { request = new ActiveXObject("Microsoft.XMLHTTP"); }// code for IE6, IE5
		request.open('POST', window.location.protocol + "://" + window.location.host + contactInfo.ContentLink + "response" , false);
		request.send(msg);
		response = request.responseText;
	}
	catch(e){}	
}

function tabContacts_OnTabSelection(newKey, oldKey)
{
	// debugger;
	DebugLog("tabContacts_OnTabSelection. Current contact " + ClientLink.Contacts.ActiveContactId + ", new tab key " + newKey + ", old tab key" + oldKey );
	var newId = tabContacts.txTabPages.Items[newKey].txContactId;
	
	ClientLink.SetActiveContact(ClientLink.Contacts.Get(newId));
	ClientLink.Contacts.Get(newId).__ContactUpdate = false;
	SetTabButtonClass($(toolboxTabControlNixxisRenderManager.txTab_TabButtonItem + newKey), newId);
	if (oldKey != null)
	{
		var oldId = tabContacts.txTabPages.Items[oldKey].txContactId;
		ClientLink.Contacts.Get(oldId).__ContactUpdate = false;
		SetTabButtonClass($(toolboxTabControlNixxisRenderManager.txTab_TabButtonItem + oldKey), oldId);
	}	
	SetAgentInfoStat();
	
	DebugLog("tabContacts_OnTabSelection. New current active contact " + ClientLink.Contacts.ActiveContactId);
}
function tabContacts_OnDockChange(newDock, oldDock)
{
	for (key in tabContacts.txTabPages.Items)
	{
		var _Item = $(toolboxTabControlNixxisRenderManager.txTab_TabButtonItem + key);//tabContacts.txTabPages.Items[key].txTabButton;
		
		SetTabButtonClass(_Item, key);
	}
	var _CellContact=$("NixxisAgentContactAreaCell");
	removeElementClass(_CellContact, "DockContactAreaLeft");
	removeElementClass(_CellContact, "DockContactAreaRight");
	removeElementClass(_CellContact, "DockContactAreaBottom");
	
	switch(newDock)
	{
		case txEnum.Dock.Bottom :
			addElementClass(_CellContact, "DockContactAreaBottom");
			break;
		case txEnum.Dock.Left:
			addElementClass(_CellContact, "DockContactAreaLeft");
			break;
		default:
			addElementClass(_CellContact, "DockContactAreaRight");
			break;		
	}
}
//--> < Function >
function AgentStatePause()
{	
	// debugger;
	
	removeElementClass($('Info_AgentReadyVoiceIndication'), 'active');
	addElementClass($('Pause'), 'active');
	removeElementClass($('WaitForCall'), 'active');
	SetReadyBreakBasedOnAgentState('break');

	if(_CurrentContacts != null && _CurrentContacts.length > 0) return;

	if(crPauseCodePanel !=null && crPauseCodePanel.CurrentSelected !=null && crPauseCodePanel.CurrentSelected.childNodes !=null
		&& crPauseCodePanel.CurrentSelected.childNodes !='' && crPauseCodePanel.CurrentSelected.childNodes.length > 0)
	{
		$("Info_AgentState").textContent = 'Break - ' + crPauseCodePanel.CurrentSelected.childNodes[1].textContent;
	}
	else
		$("Info_AgentState").textContent = 'Break';
	
	startdatetime = new Date();
		
	// _NoTabPagePanel.setUrl("CrAgentPause.htm");	
}

const AGENT_WORKING = 'Working';
const AGENT_WAITING = 'Waiting (V)';
const AGENT_ONLINE = 'Online';

function AgentStateWorking()
{	
	// debugger;

	$("Info_AgentState").textContent = AGENT_WORKING;
	startdatetime = new Date();
	removeElementClass($('Info_AgentReadyVoiceIndication'), 'active');

	// _NoTabPagePanel.setUrl("CrAgentPause.htm");
}

function AgentStateWaiting()
{
	// debugger;
	
	addElementClass($('WaitForCall'), 'active');
	removeElementClass($('Pause'), 'active');
	SetReadyBreakBasedOnAgentState(AGENT_WAITING);

	if(_CurrentContacts != null && _CurrentContacts.length > 0) return;
	
	$("Info_AgentState").textContent = AGENT_WAITING;
	startdatetime = new Date();
	addElementClass($('Info_AgentReadyVoiceIndication'), 'active');

	// _NoTabPagePanel.setUrl("CrAgentWaiting.htm");	
}
function AgentStateOnline(contactInfo)
{
	$("Info_AgentState").textContent = AGENT_ONLINE;
	addElementClass($('Info_AgentReadyVoiceIndication'), 'active');

	startdatetime = new Date();
}
function SetReadyBreakBasedOnAgentState(state)
{
	debugger;

	const url = new URL(window.location.href);
	if(state == AGENT_WAITING) 
	{
		$('contactViewerObject').setAttribute("data", url.origin + "/agent/embed.html?agentstate=agentready");
	}
	else
	{		
		$('contactViewerObject').setAttribute("data", url.origin + "/agent/embed.html?agentstate=break");
	}
}
function CloseScript()
{
	debugger;

	ClientLink.TerminateContact(ClientLink.Contacts.Get(ClientLink.Contacts.ActiveContactId));
	SetAgentInfoStat();
}
function NewContact(contactInfo)
{
	//var _TabId = contactInfo.Id;
	debugger;

	var _TabPage = tabContacts.txTabPages.GetNextFreeTab(contactInfo.Media);
	if(!_TabPage)
	{
		_TabPage = new toolboxTabPage(tabContacts.txTabPages.Count());
		contactInfo.__TabId = _TabPage.txName;
		_TabPage.txContactId = contactInfo.Id;
		tabContacts.txTabPages.Add(_TabPage);
	}
	else
	{
		contactInfo.__Panel = _TabPage.txPanelInfo;
	}	
	_TabPage.txContactId = contactInfo.Id;
	_TabPage.txUserData = contactInfo.ContentLink;
	contactInfo.__TabId = _TabPage.txName;	
	tabContacts.txTabPages.Visible(_TabPage, true);
	//tabContacts.txTabPages.Visible(_TabPage, false);
	
	DebugLog("Tab added:" + contactInfo.__TabId);
}
function RemoveContact(contactInfo)
{
	debugger;	

	////debugger;
	// var key = contactInfo.__TabId;

	//T tabContacts.txTabPages.Remove(contactInfo.Id);	
	// tabContacts.txTabPages.Clear(key)
	// DebugLog("Tab removed:" + key);	

	if(_CurrentContacts.length > 0) 
	{
		var newId = _CurrentContacts[_CurrentContacts.length - 1].Id;
		ClientLink.SetActiveContact(ClientLink.Contacts.Get(newId));
		ClientLink.Contacts.Get(newId).__ContactUpdate = false;
		
		_CurrentContacts[_CurrentContacts.length - 1].isInUse = true;

		// if(_CurrentContacts[_CurrentContacts.length - 1].ScriptUrl)
		// {
			$('NixxisAgent').src = _CurrentContacts[_CurrentContacts.length - 1].ScriptUrl;
			$('NixxisAgent').style.display ='inline';	
		// }
		// else
		// {
		// 	$('NixxisAgent').src = "about:blank";
		// 	$('NixxisAgent').style.display ='none';	
		// }
	}
	else
	{
		_CurrentContacts = [];
		$('contactViewerObject').style.display = "inline";

		$('NixxisAgent').src = "about:blank";
		$('NixxisAgent').style.display ='none';

		// removeElementClass($('VoiceToolStrip'),'active');
		ShowHideVoiceToolStripIcons(false);
		// removeElementClass($('voiceStatusToolStrip'),'active');
		ShowHideVoiceStatusToolStripIcons(false);
		removeElementClass($('ExtendWrapup'),'active');
		$('ExtendWrapup').disabled = true;
		$('WaitForCall').disabled = false;
		$('SearchMode').disabled = false;
		$("AgentLogout").disabled = false;

		if($('contactViewerObject').agentState == 'ready') AgentStateWaiting();
		else AgentStatePause();
	}

	removeElementClass($('CloseScript'),'active');
	// WaitFor_StateChanged(true, true);
}
function ShowHideVoiceToolStripIcons(canDisplay)
{
	// debugger;

	var displayStyle ='display:none;';

	if(canDisplay) displayStyle ='';
	
	var allButtons = $('VoiceToolStrip').getElementsByTagName('button');;
		
	if(allButtons != null)
	{			
		for(var i = 0; i < allButtons.length; i++)
		{
			if(allButtons[i].id == 'ExtendWrapup') continue;

			allButtons[i].style = displayStyle;
		}
	}
}
function ShowHideVoiceStatusToolStripIcons(canDisplay)
{
	var displayStyle ='display:none;';

	if(canDisplay) displayStyle ='';
	
	$('voiceStatusInfoParent').style = displayStyle;
}
//**********************************************************
//**********************************************************
function GetContactState(state)
{
	switch (state) {
		case "A": return CrResource.ContactState.Alerting;
		case "C": return CrResource.ContactState.Connected;
		case "D": return CrResource.ContactState.Disconnected;
		case "P": return CrResource.ContactState.Preview;
		case "H": return CrResource.ContactState.Hold;
		default: return "";
	}
}
function $D(value)
{
	if (value == null) return "&nbsp;";
	if (!value) return "&nbsp;";
	if (value === "") return "&nbsp;";
	return value;
}
function SetAgentInfoStat()
{
	if($("Info_AgentReadyVoiceIndication").style.display != "none")
		$('Info_AgtName_Account').innerHTML = $D(ClientLink.UserName)+' ('+$D(ClientLink.Extension)+')';

	var _Contact;
	
	if (ClientLink.Contacts.ActiveContactId) 
	{
		// debugger;
			
		DebugLog("SetAgentInfoStat. Contact " + ClientLink.Contacts.ActiveContactId);
		_Contact = ClientLink.Contacts.Get(ClientLink.Contacts.ActiveContactId);
		if (_Contact)
		{
			$('InfoContactState_'+ _Contact.Id).innerHTML = $D(GetContactState(_Contact.State));
			$('InfoContactOriginator_'+ _Contact.Id).innerHTML = $D(_Contact.From);
			$('InfoContactActivity_'+ _Contact.Id).innerHTML = $D(_Contact.Context);
			$('InfoContactTo_'+ _Contact.Id).innerHTML = $D(_Contact.To);
			$('InfoContactCustomer_'+ _Contact.Id).innerHTML = $D(_Contact.Customer);

			if(_Contact.State == 'C') 
			{
				$('CloseScript').disabled = true;
				if(_Contact.__AgentAction = 'W') 
				{
					if($("Info_AgentState").textContent != AGENT_ONLINE && $("Info_AgentReadyVoiceIndication").style.display != "none") 
						AgentStateOnline();
				}
			}
			else 
			{
				$('CloseScript').disabled = false;
				if(_Contact.__AgentAction = 'W') 
				{
					if($("Info_AgentState").textContent != AGENT_WORKING && $("Info_AgentReadyVoiceIndication").style.display != "none")
						AgentStateWorking();
					
					removeElementClass($('ExtendWrapup'),'active');
				}
			}

			VoiceButtonsbehaviourWhenCallHold(_Contact.State);

			// stopDisplayContactActivityTimer = false;			
		}
		else
		{
			DebugLog("SetAgentInfoStat. Contact not found");
			$('InfoContactState_'+ ClientLink.Contacts.ActiveContactId).innerHTML = "&nbsp;";
			$('InfoContactOriginator_'+ ClientLink.Contacts.ActiveContactId).innerHTML = "&nbsp;";
			$('InfoContactActivity_'+ ClientLink.Contacts.ActiveContactId).innerHTML = "&nbsp;";
			$('InfoContactTo_'+ ClientLink.Contacts.ActiveContactId).innerHTML = "&nbsp;";
			$('InfoContactCustomer_'+ ClientLink.Contacts.ActiveContactId).innerHTML = "&nbsp;"
		}
	}
	else {
		// debugger;

		// stopDisplayContactActivityTimer = true;
		// contactActivityStartDatetime = null;

		DebugLog("SetAgentInfoStat. No active contact id");
		// $('Info_ContactState').innerHTML = "&nbsp;";
		// $('Info_ContactOriginator').innerHTML = "&nbsp;";
		// $('Info_ContactActivity').innerHTML = "&nbsp;";
		// $('Info_ContactTo').innerHTML = "&nbsp;";
		// $('Info_ContactCustomer').innerHTML = "&nbsp;"
	}
}


function VoiceButtonsbehaviourWhenCallHold(CurrentAction)
{
	// debugger;
	if(CurrentAction == 'D') $("VoiceHangup").disabled = true;
	else if(CurrentAction != 'P') $("VoiceHangup").disabled = (CurrentAction == 'H');
	
	$("CloseScript").disabled = (CurrentAction == 'H' || CurrentAction == 'C');
	$("SearchMode").disabled = (CurrentAction == 'H' || CurrentAction == 'C');
}

// -- > Display contact active duration


function DisplayContactActivityDateTimeElapsed(_ContactId, contactActivityStartDatetime)
{
	// debugger;

	if($("InfoContactStatusDuration_"+_ContactId) == null) return;

	if(contactActivityStartDatetime == null) contactActivityStartDatetime = new Date();
	
	var timediff = new Date() - contactActivityStartDatetime;
	
	var seconds = FormatTime(timediff);
	
	$("InfoContactStatusDuration_"+_ContactId).textContent = seconds;
	
	setTimeout(function() { DisplayContactActivityDateTimeElapsed(_ContactId, contactActivityStartDatetime); }, 1000);
}


//--> start Draw custom tab
function SetContactInfoBox(key)
{
	var _Contact = ClientLink.Contacts.Get(key);
	if (!_Contact) return;
	
	//var _Container = document.createElement("div");
	var _Container = $(toolboxTabControlNixxisRenderManager.txTab_TabButtonLabel + _Contact.__TabId);
	if (!_Container) return;

	_Contact.__LabelTop = _Contact.Context;
	_Container.innerHTML =_Contact.__LabelTop + "<br />" + _Contact.__LabelBottom;
}
function SetTabButtonClass(control, key)
{
	//if (!control) return;
	//if (!key) return;
	////debugger;
	var _Contact = ClientLink.Contacts.Get(key);
	//if (!_Contact) return;
	var _Tab = tabContacts.txTabPages.Items[_Contact.__TabId];
	//if (!_Tab) return;
	
	DebugLog("SetTabButtonClass. contact " + key + " media " + _Contact.Media + " dock " + tabContacts.txDock + " agent action " + _Contact.__AgentAction);
	
	removeElementClass(control, "TabBtnActive");
	removeElementClass(control, "TabBtnNoActive");
	
	removeElementClass(control, "TabBtnBottomVoice");
	removeElementClass(control, "TabBtnBottomVoiceActive");
	removeElementClass(control, "TabBtnBottomVoiceHover");
	removeElementClass(control, "TabBtnBottomMail");
	removeElementClass(control, "TabBtnBottomMailActive");
	removeElementClass(control, "TabBtnBottomMailHover");
	removeElementClass(control, "TabBtnBottomChat");
	removeElementClass(control, "TabBtnBottomChatActive");
	removeElementClass(control, "TabBtnBottomChatHover");
	
	removeElementClass(control, "TabBtnLeftVoice");
	removeElementClass(control, "TabBtnLeftVoiceActive");
	removeElementClass(control, "TabBtnLeftVoiceHover");
	removeElementClass(control, "TabBtnLeftVoiceAction");
	removeElementClass(control, "TabBtnLeftVoiceHold");
	removeElementClass(control, "TabBtnLeftVoiceHoldActive");
	removeElementClass(control, "TabBtnLeftVoiceHoldHover");
	removeElementClass(control, "TabBtnLeftVoiceHoldAction");
	removeElementClass(control, "TabBtnLeftVoiceWrapup");
	removeElementClass(control, "TabBtnLeftVoiceWrapupActive");
	removeElementClass(control, "TabBtnLeftVoiceWrapupHover");
	removeElementClass(control, "TabBtnLeftVoiceWrapupAction");
	
	removeElementClass(control, "TabBtnLeftMail");
	removeElementClass(control, "TabBtnLeftMailActive");
	removeElementClass(control, "TabBtnLeftMailHover");
	removeElementClass(control, "TabBtnLeftMailHold");
	removeElementClass(control, "TabBtnLeftMailHoldActive");
	removeElementClass(control, "TabBtnLeftMailHoldHover");
	removeElementClass(control, "TabBtnLeftMailWrapup");
	removeElementClass(control, "TabBtnLeftMailWrapupActive");
	removeElementClass(control, "TabBtnLeftMailWrapupHover");
	
	removeElementClass(control, "TabBtnLeftChat");
	removeElementClass(control, "TabBtnLeftChatActive");
	removeElementClass(control, "TabBtnLeftChatHover");
	removeElementClass(control, "TabBtnLeftChatAction");
	removeElementClass(control, "TabBtnLeftChatHold");
	removeElementClass(control, "TabBtnLeftChatHoldActive");
	removeElementClass(control, "TabBtnLeftChatHoldHover");
	removeElementClass(control, "TabBtnLeftChatHoldAction");
	removeElementClass(control, "TabBtnLeftChatWrapup");
	removeElementClass(control, "TabBtnLeftChatWrapupActive");
	removeElementClass(control, "TabBtnLeftChatWrapupHover");
	removeElementClass(control, "TabBtnLeftChatWrapupAction");
		
	removeElementClass(control, "TabBtnRightVoice");
	removeElementClass(control, "TabBtnRightVoiceActive");
	removeElementClass(control, "TabBtnRightVoiceHover");
	removeElementClass(control, "TabBtnRightMail");
	removeElementClass(control, "TabBtnRightMailActive");
	removeElementClass(control, "TabBtnRightMailHover");
	removeElementClass(control, "TabBtnRightChat");
	removeElementClass(control, "TabBtnRightChatActive");
	removeElementClass(control, "TabBtnRightChatHover");

	if (_Tab.txActive)
	{
		addElementClass(control, "TabBtnActive");
	}
	else{addElementClass(control, "TabBtnNoActive");}
					
	switch (_Contact.Media)
	{
		case "V" :
			switch(tabContacts.txDock)
			{
				case txEnum.Dock.Bottom:
					if (_Tab.txActive) 
					{
						addElementClass(control, "TabBtnBottomVoiceActive");
						control.onmouseover = null; //function(){ ; }
						control.onmouseout = null; //function(){ ; }
					}
					else 
					{
						addElementClass(control, "TabBtnBottomVoice");
						control.onmouseover = function(){ addElementClass(control, "TabBtnBottomVoiceHover"); }
						control.onmouseout = function(){ removeElementClass(control, "TabBtnBottomVoiceHover"); }	
					}						
					break;
				case txEnum.Dock.Left:
					if (_Tab.txActive) 
					{
						switch (_Contact.__AgentAction) 
						{
							case "H":
							case "P":
								addElementClass(control, "TabBtnLeftVoiceHoldActive");
								control.onmouseover = null; //function(){ ; }
								control.onmouseout = null; //function(){ ; }
								break;
							case "W":
								addElementClass(control, "TabBtnLeftVoiceWrapupActive");
								control.onmouseover = null; //function(){ ; }
								control.onmouseout = null; //function(){ ; }
								break;
							case "S": 
							case "0": 
							default:
								addElementClass(control, "TabBtnLeftVoiceActive");
								control.onmouseover = null; //function(){ ; }
								control.onmouseout = null; //function(){ ; }
								break;
						}						
					}
					else 
					{
						if (_Contact.__ContactUpdate) {
							switch (_Contact.__AgentAction) {
								case "H":
								case "P":
									addElementClass(control, "TabBtnLeftVoiceHoldAction");
									control.onmouseover = function(){
										addElementClass(control, "TabBtnLeftVoiceHoldHover");
									}
									control.onmouseout = function(){
										removeElementClass(control, "TabBtnLeftVoiceHoldHover");
									}
									break;
								case "W":
									addElementClass(control, "TabBtnLeftVoiceWrapupAction");
									control.onmouseover = function(){
										addElementClass(control, "TabBtnLeftVoiceWrapupHover");
									}
									control.onmouseout = function(){
										removeElementClass(control, "TabBtnLeftVoiceWrapupHover");
									}
									break;
								case "S":
								case "0":
								default:
									addElementClass(control, "TabBtnLeftVoiceAction");
									control.onmouseover = function(){
										addElementClass(control, "TabBtnLeftVoiceHover");
									}
									control.onmouseout = function(){
										removeElementClass(control, "TabBtnLeftVoiceHover");
									}
									break;
							}						
						}
						else {
							switch (_Contact.__AgentAction) {
								case "H":
								case "P":
									addElementClass(control, "TabBtnLeftVoiceHold");
									control.onmouseover = function(){
										addElementClass(control, "TabBtnLeftVoiceHoldHover");
									}
									control.onmouseout = function(){
										removeElementClass(control, "TabBtnLeftVoiceHoldHover");
									}
									break;
								case "W":
									addElementClass(control, "TabBtnLeftVoiceWrapup");
									control.onmouseover = function(){
										addElementClass(control, "TabBtnLeftVoiceWrapupHover");
									}
									control.onmouseout = function(){
										removeElementClass(control, "TabBtnLeftVoiceWrapupHover");
									}
									break;
								case "S":
								case "0":
								default:
									addElementClass(control, "TabBtnLeftVoice");
									control.onmouseover = function(){
										addElementClass(control, "TabBtnLeftVoiceHover");
									}
									control.onmouseout = function(){
										removeElementClass(control, "TabBtnLeftVoiceHover");
									}
									break;
							}
						}						
					}					
					break;
				default:
					if (_Tab.txActive) 
					{
						addElementClass(control, "TabBtnRightVoiceActive");
						control.onmouseover = null; //function(){ ; }
						control.onmouseout = null; //function(){ ; }
					}
					else 
					{
						addElementClass(control, "TabBtnRightVoice");
						control.onmouseover = function(){ addElementClass(control, "TabBtnRightVoiceHover"); }
						control.onmouseout = function(){ removeElementClass(control, "TabBtnRightVoiceHover"); }	
					}						
					break;				
			}
			break;
		case "M" :
			switch(tabContacts.txDock)
			{
				case txEnum.Dock.Bottom:
					if (_Tab.txActive) 
					{
						addElementClass(control, "TabBtnBottomMailActive");
						control.onmouseover = null; //function(){ ; }
						control.onmouseout = null; //function(){ ; }
					}
					else 
					{
						addElementClass(control, "TabBtnBottomMail");
						control.onmouseover = function(){ addElementClass(control, "TabBtnBottomMailHover"); }
						control.onmouseout = function(){ removeElementClass(control, "TabBtnBottomMailHover"); }	
					}						
					break;
				case txEnum.Dock.Left:
					if (_Tab.txActive) 
					{
						switch (_Contact.__AgentAction) 
						{
							case "H":
								addElementClass(control, "TabBtnLeftMailHoldActive");
								control.onmouseover = null; //function(){ ; }
								control.onmouseout = null; //function(){ ; }
								break;
							case "W":
								addElementClass(control, "TabBtnLeftMailWrapupActive");
								control.onmouseover = null; //function(){ ; }
								control.onmouseout = null; //function(){ ; }
								break;
							case "S": 
							case "0": 
							default:
								addElementClass(control, "TabBtnLeftMailActive");
								control.onmouseover = null; //function(){ ; }
								control.onmouseout = null; //function(){ ; }
								break;
						}							
					}
					else 
					{
						addElementClass(control, "TabBtnLeftMail");
						control.onmouseover = function(){ addElementClass(control, "TabBtnLeftMailHover"); }
						control.onmouseout = function(){ removeElementClass(control, "TabBtnLeftMailHover"); }
						switch (_Contact.__AgentAction) 
						{
							case "H":
								addElementClass(control, "TabBtnLeftMailHold");
								control.onmouseover = function(){ addElementClass(control, "TabBtnLeftMailHoldHover"); }
								control.onmouseout = function(){ removeElementClass(control, "TabBtnLeftMailHoldHover"); }	
								break;
							case "W":
								addElementClass(control, "TabBtnLeftMailWrapup");
								control.onmouseover = function(){ addElementClass(control, "TabBtnLeftMailWrapupHover"); }
								control.onmouseout = function(){ removeElementClass(control, "TabBtnLeftMailWrapupHover"); }	
								break;
							case "S": 
							case "0": 
							default:
								addElementClass(control, "TabBtnLeftMail");
								control.onmouseover = function(){ addElementClass(control, "TabBtnLeftMailHover"); }
								control.onmouseout = function(){ removeElementClass(control, "TabBtnLeftMailHover"); }	
								break;
						}						
					}						
					break;
				default:
					if (_Tab.txActive) 
					{
						addElementClass(control, "TabBtnRightMailActive");
						control.onmouseover = null; //function(){ ; }
						control.onmouseout = null; //function(){ ; }
					}
					else 
					{
						addElementClass(control, "TabBtnRightMail");
						control.onmouseover = function(){ addElementClass(control, "TabBtnRightMailHover"); }
						control.onmouseout = function(){ removeElementClass(control, "TabBtnRightMailHover"); }	
					}						
					break;				
			}		
			break;
		default:
			switch(tabContacts.txDock)
			{
				case txEnum.Dock.Bottom:
					if (_Tab.txActive) 
					{
						addElementClass(control, "TabBtnBottomChatActive");
						control.onmouseover = null; //function(){ ; }
						control.onmouseout = null; //function(){ ; }
					}
					else 
					{
						addElementClass(control, "TabBtnBottomChat");
						control.onmouseover = function(){ addElementClass(control, "TabBtnBottomChatHover"); }
						control.onmouseout = function(){ removeElementClass(control, "TabBtnBottomChatHover"); }	
					}						
					break;
				case txEnum.Dock.Left:
					if(_Tab.txActive)
					{
						switch (_Contact.__AgentAction) 
						{
							case "H":
								addElementClass(control, "TabBtnLeftChatHoldActive");
								control.onmouseover = null; //function(){ ; }
								control.onmouseout = null; //function(){ ; }
								break;
							case "W":
								addElementClass(control, "TabBtnLeftChatWrapupActive");
								control.onmouseover = null; //function(){ ; }
								control.onmouseout = null; //function(){ ; }
								break;
							case "S": 
							case "0": 
							default:
								addElementClass(control, "TabBtnLeftChatActive");
								control.onmouseover = null; //function(){ ; }
								control.onmouseout = null; //function(){ ; }
								break;
						}						
					}
					else
					{
						if (_Contact.__ContactUpdate) 
						{
							switch (_Contact.__AgentAction) 
							{
								case "H":
									addElementClass(control, "TabBtnLeftChatHoldAction");
									control.onmouseover = function(){
										addElementClass(control, "TabBtnLeftChatHoldHover");
									}
									control.onmouseout = function(){
										removeElementClass(control, "TabBtnLeftChatHoldHover");
									}
									break;
								case "W":
									addElementClass(control, "TabBtnLeftChatWrapupAction");
									control.onmouseover = function(){
										addElementClass(control, "TabBtnLeftChatWrapupHover");
									}
									control.onmouseout = function(){
										removeElementClass(control, "TabBtnLeftChatWrapupHover");
									}
									break;
								case "S":
								case "0":
								default:
									addElementClass(control, "TabBtnLeftChatAction");
									control.onmouseover = function(){
										addElementClass(control, "TabBtnLeftChatHover");
									}
									control.onmouseout = function(){
										removeElementClass(control, "TabBtnLeftChatHover");
									}
									break;
							}
						}
						else {
							switch (_Contact.__AgentAction) {
								case "H":
									addElementClass(control, "TabBtnLeftChatHold");
									control.onmouseover = function(){
										addElementClass(control, "TabBtnLeftChatHoldHover");
									}
									control.onmouseout = function(){
										removeElementClass(control, "TabBtnLeftChatHoldHover");
									}
									break;
								case "W":
									addElementClass(control, "TabBtnLeftChatWrapup");
									control.onmouseover = function(){
										addElementClass(control, "TabBtnLeftChatWrapupHover");
									}
									control.onmouseout = function(){
										removeElementClass(control, "TabBtnLeftChatWrapupHover");
									}
									break;
								case "S":
								case "0":
								default:
									addElementClass(control, "TabBtnLeftChat");
									control.onmouseover = function(){
										addElementClass(control, "TabBtnLeftChatHover");
									}
									control.onmouseout = function(){
										removeElementClass(control, "TabBtnLeftChatHover");
									}
									break;
							}
						}								
					}
		
					break;
				default:
					if (_Tab.txActive) 
					{
						addElementClass(control, "TabBtnRightChatActive");
						control.onmouseover = null; //function(){ ; }
						control.onmouseout = null; //function(){ ; }
					}
					else 
					{
						addElementClass(control, "TabBtnRightChat");
						control.onmouseover = function(){ addElementClass(control, "TabBtnRightChatHover"); }
						control.onmouseout = function(){ removeElementClass(control, "TabBtnRightChatHover"); }	
					}	
					break;				
			}		
			break;
	} 	
}
function SetTabPage(control, key)
{
	////debugger;
	var _NewPanel;
	var _Contact = ClientLink.Contacts.Get(key);
	
	switch (_Contact.Media)
	{
		case "V" :
			_NewPanel = new crVoicePanel(control, key);
			break;
		case "M" :
			_NewPanel = new crMailPanel(control, key);
			break;
		default:
			_NewPanel = new crChatPanel(control, key, _Contact.ContentLink);
			break;
	}
	if(_NewPanel)
	{
		tabContacts.txTabPages.Items[_Contact.__TabId].txType = _Contact.Media;
		tabContacts.txTabPages.Items[_Contact.__TabId].txPanelInfo = _NewPanel;
		_Contact.__Panel = _NewPanel;
		_NewPanel.Show();	
	}	
}
//toolboxTabControlDefaultRenderManager
//________________________________________________
var toolboxTabControlNixxisRenderManager = 
{
	txTab_SelectorContainer: "_Selector_",
	txTab_SelectorList: "_TabList_",
	txTab_SelectorItem: "_TabItem_",
	txTab_PageContainer: "_PageContainer_",
	txTab_PageItem: "_PageItem_",
	txTab_NoTabPage : "_NoPage_",
	txTab_TabButtonItem: "__TabButton__",
	txTab_TabButtonInfoBox: "__TabBtnInfo__",
	txTab_TabButtonLabel: "__TabBtnLabel__",
		
    Init : function(control)
    {
		//var control = new toolboxTabControl("");
		
		//Basic structur
     	toolboxTabControlNixxisRenderManager.DrawPageContainer(control);
		toolboxTabControlNixxisRenderManager.DrawTabButtonContainer(control);
		//Drawn tab
		var _Tabs = control.txTabPages.Items;
		var _Obj;
		for(_Obj in _Tabs)
		{
			toolboxTabControlNixxisRenderManager.DrawTab(_Tabs[_Obj]);
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
		//_Main.innerHTML = "&nbsp;";
		
		
		var _NoTabContainer = document.createElement('div');
		_NoTabContainer.id =  this.txTab_NoTabPage + _Id;
		_NoTabContainer.className = "txTabControlNoTabPage";
		_Main.appendChild(_NoTabContainer);
		
		control.txParent[txTabControlPart.page].appendChild(_Main);
    },
	DrawTab : function(tab)
	{
		if (!tab) return;
		
		toolboxTabControlNixxisRenderManager.DrawPage(tab);
		toolboxTabControlNixxisRenderManager.DrawTabButton(tab);
	},
	TabVisible : function(tab)
	{
		removeElementClass(tab.txTabPage, 'TabPageHide');	
		removeElementClass(tab.txTabButton, 'TabButtonHide');
				
		if(tab.txType == 'C')
			tab.txTabPage.txPanel.SetContact(tab.txContactId, tab.txUserData);
		else 
			tab.txTabPage.txPanel.SetContact(tab.txContactId);
		//--ContentLink	
		tab.txInUse = true;

	},	
	ClearTab : function(tab)
	{
		////debugger;
		var _Container = $(toolboxTabControlNixxisRenderManager.txTab_TabButtonLabel + tab.txName);
		_Container.innerHTML = "";
		
		var _Element = $(toolboxTabControlNixxisRenderManager.txTab_PageItem + tab.txName);
		tab.txTabPage.txPanel.Clear();
		addElementClass(tab.txTabPage, 'TabPageHide');	
		addElementClass(tab.txTabButton, 'TabButtonHide');
		tab.txInUse = false;
		
	},	
	RemoveTab : function(tab)
	{
		////debugger;
		
		var _Element = $(this.txTab_SelectorItem + tab.txName); 
		_Element.parentNode.removeChild(_Element);
		
		_Element = $(this.txTab_PageItem + tab.txName); 
		_Element.parentNode.removeChild(_Element);
		
		_Element = null;
	},
    DrawTabButton : function(tab)
    {
		var _Id = tab.txName;
		
		var _Item = document.createElement("li");
		_Item.id = this.txTab_SelectorItem + _Id;
		_Item.className = "txTabControlTabButton";
		//TabButtonHover
		var _Container = document.createElement("div");
		_Container.className = "NixxisContactTabButton";
		_Container.id = this.txTab_TabButtonItem + _Id;
		
		var _InfoBox = document.createElement("div");
		_InfoBox.className = "NixxisContactTabButtonInfobox";
		
		//SetContactInfoBox(_InfoBox, _Id);
			
		var _Label = document.createElement("div");
		_Label.className = "NixxisContactTabButtonInfoboxInner";
		_Label.id = this.txTab_TabButtonLabel + _Id;
		_Label.innerHTML = "&nbsp;";
		_InfoBox.appendChild(_Label);
	
		_Container.appendChild(_InfoBox);
		
		SetTabButtonClass(_Container, tab.txContactId);
		_Item.appendChild(_Container);
		
		
		$(this.txTab_SelectorList + tab.txParent.txParent.txName).appendChild(_Item);
		
		tab.txParent.txParent.txCustomTabButtonDraw(tab);
		tab.txTabButton = _Item;
		tab.txInUse = true;
    },
    DrawPage : function(tab)
    {
        var _Id = tab.txName;
		
		var _Item = document.createElement("div");
		_Item.id = this.txTab_PageItem	+ _Id;
		_Item.className = "txTabControlPage";
		 
		SetTabPage(_Item, tab.txContactId);
		//addElementClass(_Item, 'TabPageHide')
		tab.txParent.txParent.txContainer[txTabControlPart.page].appendChild(_Item);
		tab.txTabPage = _Item;
		tab.txInUse = true;
    },	
    UpdateSelector : function()
    {
        
    }
}
//<-- stop Draw custom tab
//**********************************************************
//**********************************************************
//--> start debug code
function SetDebug(bool)
{
    if(bool) { $('DebugToolStrip').style.display = "inline"; }
    else { $('DebugToolStrip').style.display = "none"; }
}
function Debug() { //debugger; 
}
function dbgDomainShow() { window.alert("CrAgent: " + document.domain); }
function dbgDomainChange() { document.domain = "tommobiel"; }
function dbgAccessFrame() { $('Application').contentWindow.dbgDomainShow(); } 
function dbgChangeFrameUri() 
{ 
    var loc = 'http://tommobiel/Agent/SampleScript.html?CustomerId=SUPRD&ContactId=464111515abb47ceb7aebc0d3f276d10';
    //var loc = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'SampleScript.htm?CustomerId=SUPRD&ContactId=464111515abb47ceb7aebc0d3f276d10';
    $('Application').src = loc; 
}
function dbgUserFunction()
{
    $('Application').setAttribute("ContactId", "464111515abb47ceb7aebc0d3f276d10");
}
//?CustomerId=SUPRD&ContactId=464111515abb47ceb7aebc0d3f276d10
var lastId = "";
function checkForMessages()
{ 
    if(location.hash != lastId)
    { 
        lastId = location.hash; 
        alert("Message CrAgent: " + lastId); 
    } 
}		    
function dbgTestSendHashMsg()
{
    var iwin;
    if(navigator.userAgent.indexOf("Safari") != -1){
        iwin = frames['Application'];
    }else{
        iwin = $('Application').contentWindow;
    }
    iwin.location = "http://tommobiel/AgentApp/SampleScript.htm#uiForAgentMessage_" + (new Date()).getTime();	    
}
function setDefaultToolbarLayout(element, fnOnclick)
{
    var _Onclick = typeof fnOnclick != 'undefined' ? fnOnclick : new Function('window.alert("please configure onclick")');  
    element.onclick = _Onclick;
    element.onmouseover = function() { addElementClass(this, hoverElementClass); };
    element.onmouseout = function() { removeElementClass(this, hoverElementClass); };
}
//Debug window
var crDebugWindow = null;
function dbgStartWindow()
{
    if(crDebugWindow) return;
    
    crDebugWindow = new crDebugForm();
    crDebugWindow.Create();
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
}
function DebugLog(text)
{
    if(!crDebugWindow) return;
    crDebugWindow.Log(text);
}
var _dbg = 10;
function dbgTabAdd()
{
	_dbg++;
	var _TabId = "Contact" + _dbg;
	_ContactList[_TabId] = new ContactInfo();
	var _Test = _dbg % 3;
	if (_Test == 0) _ContactList[_TabId].MediaType = "Chat";
	else if (_Test == 1) _ContactList[_TabId].MediaType = "Voice";
	else _ContactList[_TabId].MediaType = "Mail";
	
	var _TabPage = new toolboxTabPage(_TabId);
	tabContacts.txTabPages.Add(_TabPage);	
	DebugLog("Tab added:" + _TabId);
}
function dbgTabRemove()
{
	if (_dbg <= 10) return;
	
	var _TabId = "Contact" + _dbg;
	tabContacts.txTabPages.Remove(_TabId);
	_dbg--;
	DebugLog("Tab removed:" + _TabId);
}
function dbgTabPosLeft()
{
	DebugLog("Tab selector position left");
	
	var _Element = $('ContactTabSelector');
	$('NixxisDockLeftTabButtonCell').appendChild(_Element);
	removeElementClass(_Element, 'DockBottom');
	removeElementClass(_Element, 'DockRight');

	removeElementClass($('NixxisDockLeftCell'), "HideDL");
	addElementClass($('NixxisDockRightCell'), "HideDR");
	addElementClass($('NixxisDockBottomRow'), "HideDB");
	tabContacts.SetDock(txEnum.Dock.Left);
	pageResize();
}
function dbgTabPosBottom()
{
	DebugLog("Tab selector position bottom");
	
	var _Element = $('ContactTabSelector');
	$('NixxisDockBottom').appendChild(_Element);
	addElementClass(_Element, 'DockBottom');
	removeElementClass(_Element, 'DockRight');
	
	addElementClass($('NixxisDockLeftCell'), "HideDL");
	addElementClass($('NixxisDockRightCell'), "HideDR");
	removeElementClass($('NixxisDockBottomRow'), "HideDB");

	tabContacts.SetDock(txEnum.Dock.Bottom);
		
	pageResize();
}
function dbgTabPosRight()
{
	DebugLog("Tab selector position right");
	
	var _Element = $('ContactTabSelector');
	$('NixxisDockRight').appendChild(_Element);
	removeElementClass(_Element, 'DockBottom');
	addElementClass(_Element, 'DockRight');
		
	addElementClass($('NixxisDockLeftCell'), "HideDL");
	removeElementClass($('NixxisDockRightCell'), "HideDR");
	addElementClass($('NixxisDockBottomRow'), "HideDB");
	tabContacts.SetDock(txEnum.Dock.Right);
	pageResize();
}
function tabContacts_OnTabAdd(item)
{
	alert(item);
	
}
var _CounterSW = 0;
function debugStatusWindow()
{
	_CounterSW++;
	// crStatusWindow.AddMsg("This is message " + _CounterSW);
}
function dbgAddChatContact()
{
	ClientLink.loadData("SimulateChat");
}
function dbgAddEMailContact()
{
	ClientLink.loadData("SimulateMail");
}

function VoiceRecordSetStartStop()
{
	// debugger;
	addElementClass($("ExtendWrapup"),'active');

	if($('VoiceRecord').className) lst = $('VoiceRecord').className.split(' '); else lst = new Array();

	var CanStartrecording = false;

	if(lst == null || lst.length == 0) CanStartrecording = false;
	else
	{
		for(var i = 0; i < lst.length; i++) 
		{
			if(lst[i] != null && lst[i]?.toLowerCase() == 'active') 
			{
				if(CanStartrecording == true)
				{
					removeElementClass($('VoiceRecord'),'active');
					CanStartrecording = false;
					break;
				}

				CanStartrecording = true;
			}
		}
	}

	if(CanStartrecording)
	{
		$('VoiceRecord').childNodes[3].innerText = "Stop Recording";
		$('VoiceRecord').childNodes[3].title = "Stop Recording";
	}
	else
	{
		$('VoiceRecord').childNodes[3].innerText = "Record"
		$('VoiceRecord').childNodes[3].title = "Record";
	}
}

function dbgFunction()
{
	//debugger;
	//alert(ClientLink.getAttachments('4d0cb4de70314da39186075cd91ad119'));
	//alert(ClientLink.getQualifications('4d0cb4de70314da39186075cd91ad119'));
	//var dte = new Date('August 25, 2008 0:0:0');
	//alert(ClientLink.getAgendaByContact('00000000000000000000000000000000',dte.getTime(), ''));
	//crPauseCodePanel.Show(ClientLink.PauseCodes);
	//crTeamSelectPanel.Show(ClientLink.TeamList);
	//7585e9ec251645f3b838bde12e404c4c
	
	//var x = ClientLink.getContactHistory("7585e9ec251645f3b838bde12e404c4c");
	//var x = ClientLink.getContactHistory(ClientLink.Contacts.ActiveContactId);
	
	
	ClientLink.Contacts.Get(ClientLink.Contacts.ActiveContactId).HistoryList.BuildList(ClientLink.getContactHistory(ClientLink.Contacts.ActiveContactId));
	////debugger;
}
function dbgSearchMode()
{
	//ClientLink.getQualifications('df6c41f0b24f43ecb558d498f00c934d'));
	// debugger;
	
	crSearchModePanel.Show(ClientLink.SearchModeCampLst);
}
function dbgQualification()
{
	// debugger;
	//ClientLink.getQualifications('df6c41f0b24f43ecb558d498f00c934d'));
	var Q = new QualificationInfo(ClientLink);
	var info = ClientLink.Contacts.Get(ClientLink.Contacts.ActiveContactId);
	var actList = info.Activity.split('.');
	var List = Q.FromActivityId(actList[0]);
	//var response = this.ClientLink.getPredefinedTexts('4d0cb4de70314da39186075cd91ad119');
	//alert("PreText:" + response);
	//var responseAtt = this.ClientLink.getAttachments('4d0cb4de70314da39186075cd91ad119');
	//alert("Att:" + responseAtt);

	if(! $('ExtendWrapup').disabled) addElementClass($('ExtendWrapup'), 'active');
	crQualPanel.Show(List);
}
var dbgMsg = ["Msg1", "Msg2", "Msg3"];
var dbgMsgCount = -1;
function dbgChatReceiveMsg()
{
	dbgMsgCount++;
	if (dbgMsgCount >= dbgMsg.length) dbgMsgCount = 0;
	
	ClientLink.ChatReceivedMsg.Invoke(_Test_ChatId, "Tom demo", dbgMsg[dbgMsgCount]);
	//ChatReceivedMsg
}
function btnTeamSelection()
{
	// debugger;
	
	crTeamSelectPanel.Show(ClientLink.TeamList);
}
//<-- stop debug code
//**********************************************************
function ContactTabButton(tab)
{
        var _Selector = document.createElement('div');
		var _Id = tab.txName;
		
		_Selector.id = "_TabSelect_" + _Id;
		_Selector.className = "txTabControlSelector";
		_Selector.onmouseover = function(){ addElementClass(_Selector, "TabHover"); }
		_Selector.onmouseout = function(){ removeElementClass(_Selector, "TabHover"); }
		_Selector.innerHTML = _Id;
	
}


function btnMiniMode()
{
	// debugger;

	crAgentLogout.Show();
}
