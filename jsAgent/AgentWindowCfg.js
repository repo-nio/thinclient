var tabContacts;
var _NoTabPagePanel;
var _MsgCount=-1;
var _Msg = ["Hello. I need some flight information please.", "Hello. I want to book a flight."];
var _Test_ChatId = ""; 

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
	// debugger;
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
	// debugger;
	var cleanedmsg = msg;
	
	if(msg)
	{
		var msgArr = msg.split(',');

		if(msgArr && msgArr.length > 3) cleanedmsg = (msgArr[1] + ',' + msgArr[2]).formatString(msgArr.slice(3, msgArr.length));
		else if(msgArr && msgArr.length > 2) cleanedmsg = msgArr[1].formatString(msgArr.slice(2, msgArr.length));
	}

	$("Info_QueueWaitingHeader").textContent  = cleanedmsg;
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

String.prototype.formatString = function (args) 
{
	return this.replace(/{([0-9]+)}/g, function (match, index) 
	{
		// check if the argument is present
		return typeof args[index] == 'undefined' ? match : args[index];
	});
};

function defaultSetAgentInfoLabels()
{
	// debugger;
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

	contactInfo.isInUse = true;

	DebugLog("nixxislink_ConactAdded. Add contact " + contactInfo.Id);
	contactInfo.__AgentAction = "S";

	addVoiceStatus(contactInfo);
	setVoiceDisplayStatus();
	DisplayContactActivityDateTimeElapsed(contactInfo , null);

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
		}
		else
		{
			removeElementClass($('ExtendWrapup'),'active');
			removeElementClass($('CloseScript'),'active');
			$('ExtendWrapup').disabled = true;
		}
		RefreshLastAgentState();
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
	$('contactViewerObject').parentNode.style.overflow = '';
	
	DisplayScriptURLs(contactInfo);	

	$("AgentLogout").disabled = true;
	// $("SearchMode").disabled = true;
	VoiceButtonsbehaviourWhenCallHold(contactInfo);	
}

function addVoiceStatus(contactInfo)
{
	// debugger;

	var chilrens = $('voiceStatusToolStrip').children;

    if(chilrens)
    {       
        for(var i = 0; i < chilrens.length; i++)
        {
            var child = chilrens[i];
            
			if(child && child.className?.includes('active')) removeElementClass($(child.id),'active');
        }
    }

	var voiceDIV = document.createElement('div');
	voiceDIV.id = 'voicestatus_' + contactInfo.Id;
	voiceDIV.className = 'status cardBoxLayer active';	

	var _BODY = '';

	if(contactInfo.Direction == 'I')
		_BODY += '	<div id="InfoContactImage"><img src="./assets/icons/Agent_MediaType_Outbound_25.png" alt="icon" style="transform: rotate(180deg);" /></div>';
	else 
		_BODY += '	<div id="InfoContactImage"><img src="./assets/icons/Agent_MediaType_Outbound_25.png" alt="icon" /></div>';
	
		_BODY += '	<div>';
		_BODY += '		<div class="row d-flex cardBoxRow">';
		_BODY += '			<div><strong id="InfoContactActivity_' + contactInfo.Id + '"></strong></div>';
		_BODY += '			<div>&nbsp;<span id="InfoContactStatusDuration_' + contactInfo.Id + '"></span></div>';
		_BODY += '		</div>';
		_BODY += '		<div class="row d-flex cardBoxRow">';
		_BODY += '			<div><span>From:&nbsp;</span></div>';
		_BODY += '			<div><span id="InfoContactOriginator_' + contactInfo.Id + '"></span></div>';
		_BODY += '		</div>';
		_BODY += '		<div class="row d-flex cardBoxRow">';
		_BODY += '			<div><span>To:&nbsp;</span></div>';
		_BODY += '			<div><span id="InfoContactTo_' + contactInfo.Id + '"></span></div>';
		_BODY += '		</div>';
		_BODY += '		<div class="row d-flex cardBoxRow">';
		_BODY += '			<div><span>State:&nbsp;</span></div>';
		_BODY += '			<div><span id="InfoContactState_' + contactInfo.Id + '"></span></div>';
		_BODY += '		</div>';
		_BODY += '		<div class="row d-flex cardBoxRow">';
		_BODY += '			<div><span>Customer:&nbsp;</span></div>';
		_BODY += '			<div><span id="InfoContactCustomer_' + contactInfo.Id + '"></span></div>';
		_BODY += '		</div>';
		_BODY += '	</div>';

	voiceDIV.innerHTML = _BODY;
	voiceDIV.ContactInfo = contactInfo;
	voiceDIV.onclick = function(){voicestatus_clicked(this);}
		
	$('voiceStatusToolStrip').appendChild(voiceDIV);

	SetRecordDisplayBasedOnActiveContactStatus(false);
	SetWidthOfBoxActiveContactVoiceStatusToolStrip();
	SetZindexOfActiveContactsVoiceStatusToolStrip();

	var imgTag = $('voiceStatusToolStrip').getElementsByTagName('img');
	if(imgTag) imgTag[imgTag.length - 1].src = 'assets/icons/Agent_MediaType_Outbound_50.png';
}

function ResizeFirstActiveContact(canViewFullBox)
{
	return;	
}

function voicestatus_clicked(sender)
{
	debugger;

	var chilrens = $('voiceStatusToolStrip').children;

    if(chilrens)
    {       
        for(var i = 0; i < chilrens.length; i++)
        {
            var child = chilrens[i];
            
			if(child && child.className?.includes('active')) removeElementClass($(child.id),'active');
        }
    }

	addElementClass($(sender.id),'active');

	if(sender && sender.ContactInfo)
	{
		ClientLink.SetActiveContact(sender.ContactInfo);
		ClientLink.Contacts.Get(sender.ContactInfo.Id).__ContactUpdate = false;

		var contctlst = ClientLink.Contacts.GetAll();
		var contctlstKeys =  Object.keys(contctlst);		

		for(var i = 0; i < contctlstKeys.length; i++)
		{
			if(contctlstKeys[i].indexOf('_') == 0) contctlstKeys[i] = contctlstKeys[i].slice(1,contctlstKeys[i].length);

			var conct = ClientLink.Contacts.Get(contctlstKeys[i]);
			conct.isInUse = false;
			// $('InfoContactState_'+ conct.Id).innerHTML = $D(GetContactState(conct.State));
		}

		SetQualificationIconShowHideBasedONActivity(sender.ContactInfo);
		SetRecordDisplayBasedOnActiveContactStatus(sender.ContactInfo.RecordInProgress);
		sender.ContactInfo.isInUse = true;

		// DisplayScriptURLs(sender.ContactInfo);
		VoiceButtonsbehaviourWhenCallHold(sender.ContactInfo);
		ShowActiveContactScriptURLs(sender.ContactInfo);
		SetWidthOfBoxActiveContactVoiceStatusToolStrip();
		SetZindexOfActiveContactsVoiceStatusToolStrip();

		// debugger;
		var imgTag = sender.getElementsByTagName('img');
		if(imgTag) imgTag[0].src = 'assets/icons/Agent_MediaType_Outbound_50.png';
	}
}


function SetWidthOfBoxActiveContactVoiceStatusToolStrip()
{
	// debugger;
    var chilrens = document.querySelectorAll('#voiceStatusToolStrip')[0].children;

    if(chilrens)
    {
		var childrenLength = chilrens.length;

		var parentOffsetHeight = document.querySelectorAll('#voiceStatusToolStrip')[0].offsetHeight;
		parentOffsetHeight = parentOffsetHeight - 5;

		var offsetFactor = 3.25;
        if(chilrens.length == 2) offsetFactor = 1.4;
        else if (chilrens.length > 2) offsetFactor = (1.4 + (0.4 * (chilrens.length - 2)));

		var childOffsetHeight = ((parentOffsetHeight / childrenLength) / (childrenLength / offsetFactor));

        var parentWidth = 100; // 100 %
        var widthOffset = 4;
        var childWidth = (parentWidth - (childrenLength * widthOffset));

        var ival = 3;

		var childIndex = 0;
		for(var i = 0; i < childrenLength; i++)
        {
            var child = chilrens[i];
			if(child.tagName.toLowerCase() != 'div') continue;
            if(child.className?.includes('active')) childIndex = i;
			
			var imgTag = child.getElementsByTagName('img');
			if(imgTag)
			{
				if(childrenLength > 2) imgTag[0].src = 'assets/icons/Agent_MediaType_Outbound_25.png';
				else imgTag[0].src = 'assets/icons/Agent_MediaType_Outbound_50.png';
			}
        }

		if(childrenLength > 2) childOffsetHeight = childOffsetHeight -1;

        for(var i = 0; i < chilrens.length; i++)
        {
            var child = chilrens[i];
            if(child.tagName.toLowerCase() != 'div') continue;

            if(childrenLength == 1) 
			{
				child.style.height = 'calc(100% - 10px)';
				child.style.fontSize = '13px';

				// debugger;
				var spanTags = child.getElementsByTagName('span');
				if(spanTags)
				{
					var span = Array.from(spanTags).filter(aa=>aa.id?.includes('InfoContactStatusDuration_'));
					if(span) span[0].style.fontSize = '14px';
				}
			}
            else if(childrenLength == 2) 
			{
				child.style.height = 'calc(50% - 10px)';
				child.style.fontSize = '10.5px';
				child.style.width = 98 + '%';
				child.style.marginLeft = 1 + '%';

				var spanTags = child.getElementsByTagName('span');
				if(spanTags)
				{
					var span = Array.from(spanTags).filter(aa=>aa.id?.includes('InfoContactStatusDuration_'));
					if(span) span[0].style.fontSize = '11.5px';
				}
			}
            else
            {
				child.style.fontSize = '9.5px';

				if(i < childIndex)
                {
                    child.style.width = childWidth + '%';
                    
                    child.style.marginLeft = ((parentWidth - childWidth)/2) + '%';
                    childWidth = childWidth + widthOffset;
                }
                else if(i > childIndex)
                {
                    child.style.width = childWidth + '%';
                    
                    child.style.marginLeft = ((parentWidth - childWidth)/2) + '%';
                    childWidth = childWidth - widthOffset;
                }

				var spanTags = child.getElementsByTagName('span');
				if(spanTags)
				{
					var span = Array.from(spanTags).filter(aa=>aa.id?.includes('InfoContactStatusDuration_'));
					if(span) span[0].style.fontSize = '9.5px';
				}
            }
                        
            child.style.top = ival + '%';
            ival = ival + childOffsetHeight;
        }
    }

	SetPaddingBetweenActiveContacts();
}

function SetZindexOfActiveContactsVoiceStatusToolStrip()
{
	// debugger;

    var chilrens = document.querySelectorAll('#voiceStatusToolStrip')[0].children;
    var childIndex = 0;

    if(chilrens)
    {       
        for(var i = 0; i < chilrens.length; i++)
        {
            var child = chilrens[i];
			if(child.tagName.toLowerCase() != 'div') continue;
            if(child.className?.includes('active')) 
            {
                childIndex = i;
                child.style.zIndex = 99;
            }
        }

        if(childIndex > 0)
        {
            for(var i = 0; i < chilrens.length; i++)
            {
                var child = chilrens[i];
				if(child.tagName.toLowerCase() != 'div') continue;

                if(i < childIndex) child.style.zIndex = 99 - (childIndex - i);                
                if(i > childIndex) child.style.zIndex = 99 - (childIndex + i);
            }
        }
    }
}

function SetPaddingBetweenActiveContacts()
{
	// debugger;
	var child = document.querySelectorAll('#voiceStatusToolStrip')[0];
	var chilrens = child.getElementsByClassName('row d-flex cardBoxRow');
	var chilLength = child.children.length;
	var paddingToAssign = '0px';

	if(chilLength == 1) paddingToAssign = '4px';
	// else if(chilLength == 2) paddingToAssign = '0.5px';

	for(var i = 0; i < chilrens.length; i++)
	{
		if(chilrens[i]) chilrens[i].style.paddingBottom = paddingToAssign;
	}
}

function setVoiceDisplayStatus()
{
	// debugger;

	var contctlst = ClientLink.Contacts.GetAll();
	var contctlstKeys =  Object.keys(contctlst);

	if(contctlstKeys && contctlstKeys.length > 0)
	{
		for(var i = 0; i < contctlstKeys.length; i++)
		{
			if(contctlstKeys[i].indexOf('_') == 0) contctlstKeys[i] = contctlstKeys[i].slice(1,contctlstKeys[i].length);

			var conct = ClientLink.Contacts.Get(contctlstKeys[i]);			

			$('InfoContactOriginator_'+ conct.Id).innerHTML = $D(conct.From);
			$('InfoContactActivity_'+ conct.Id).innerHTML = $D(conct.Context);
			$('InfoContactTo_'+ conct.Id).innerHTML = $D(conct.To);
			$('InfoContactCustomer_'+ conct.Id).innerHTML = $D(conct.Customer);
			// $('InfoContactState_'+ conct.Id).innerHTML = $D(GetContactState(conct.State));
		}
		
		var conct = null;
		if(ClientLink.Contacts.ActiveContactId)
		{
			conct = ClientLink.Contacts.Get(ClientLink.Contacts.ActiveContactId);
		}
		else
		{
			var icount = contctlstKeys.length - 1;
			if(contctlstKeys[icount].indexOf('_') == 0) contctlstKeys[icount] = contctlstKeys[icount].slice(1,contctlstKeys[icount].length);
			conct = ClientLink.Contacts.Get(contctlstKeys[icount]);
		}

		SetQualificationIconShowHideBasedONActivity(conct);
	}
}

function SetQualificationIconShowHideBasedONActivity(currentContact)
{
	// debugger;
	var activitylist = null;
	try{ activitylist = currentContact.Activity.split('.'); } catch(e) {activitylist = [this.Activity]; }

	if(currentContact.Direction == 'I') $('Selectqual').disabled = false;
	else if(activitylist != null && activitylist.length > 0 && activitylist[0] != '') $('Selectqual').disabled = false;
	else $('Selectqual').disabled = true;
}

function nixxislink_ContactRemoved(contactInfo)
{
	debugger;

	// defaultSetAgentInfoLabels();
    DebugLog("nixxislink_ContactRemoved. Remove contact " + contactInfo.Id);
	contactInfo.__AgentAction = "E";
	
	RemoveContact(contactInfo);
	$('voiceStatusToolStrip').removeChild($('voicestatus_'+contactInfo.Id));
	setVoiceDisplayStatus();

	SetAgentInfoStat();
	SetWidthOfBoxActiveContactVoiceStatusToolStrip();
	SetZindexOfActiveContactsVoiceStatusToolStrip();
}
function nixxislink_ContactStateChanged(contactInfo)
{
	// debugger;
    DebugLog("nixxislink_ContactStateChanged. contactId " + contactInfo.Id + ". State " + contactInfo.State + ". Media " + contactInfo.Media);
	
	if(contactInfo.State == 'A')
		contactInfo.__AgentAction = "S";
	if(contactInfo.State == 'P')
		contactInfo.__AgentAction = "P";
	if(contactInfo.State == 'C')
		contactInfo.__AgentAction = "O";
	if(contactInfo.State == 'D')
		contactInfo.__AgentAction = "W";
		
	if ((contactInfo.State == 'A' && !ClientLink.Contacts.ActiveContactId) || contactInfo.State == 'C' || contactInfo.State == 'P') 
	{
		ClientLink.SetActiveContact(contactInfo);
		if (contactInfo.Media == "V")
			tabContacts.SelectTabPage(contactInfo.__TabId);
		
		try 
		{
			//document.getElementById('Application').OnContactConnected(contactInfo);
		} 
		catch (e) 
		{
			;
		}
	}
	else if (contactInfo.State == 'D') 
	{
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
	
	SetTabButtonClass($(toolboxTabControlNixxisRenderManager.txTab_TabButtonItem + contactInfo.__TabId), contactInfo.Id);

	// debugger;
	SetAgentInfoStat();
	VoiceButtonsbehaviourWhenCallHold(contactInfo);
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

	if(state[1] != null && state[1] != '' && state[1] != '0' && state[0] != null && state[0] != '' && state[0] != '0') 
	{
		// removeElementClass($("PriorityPickup"),'active');
		addElementClass($("divAgentStatus"),'highlight');
	}
	else if(state[1] != null && state[1] != '' && state[1] != '0')
	{
		// removeElementClass($("PriorityPickup"),'active');
		addElementClass($("divAgentStatus"),'highlight');
	}
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
	
	RefreshLastAgentState();
}

function VoiceHold_StateChanged(authorized, active)
{
	// debugger;
	
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

	setVoiceDisplayStatus();
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

const AGENT_WORKING = 'Working';
const AGENT_WAITING = 'Waiting (V)';
const AGENT_ONLINE = 'Online';

function AgentStateWaiting()
{
	// debugger;
	
	addElementClass($('WaitForCall'), 'active');
	removeElementClass($('Pause'), 'active');
	SetReadyBreakBasedOnAgentState(AGENT_WAITING);

	addElementClass($('Info_AgentReadyVoiceIndication'), 'active');
}
function AgentStatePause()
{	
	// debugger;
	
	removeElementClass($('Info_AgentReadyVoiceIndication'), 'active');
	addElementClass($('Pause'), 'active');
	removeElementClass($('WaitForCall'), 'active');
	SetReadyBreakBasedOnAgentState('break');

	if(crPauseCodePanel !=null && crPauseCodePanel.CurrentSelected !=null && crPauseCodePanel.CurrentSelected.childNodes !=null
		&& crPauseCodePanel.CurrentSelected.childNodes !='' && crPauseCodePanel.CurrentSelected.childNodes.length > 0)
	{
		return 'Break - ' + crPauseCodePanel.CurrentSelected.childNodes[1].textContent;
	}
	else
		return 'Break';
}
function AgentStateOnline(contactInfo)
{
	// debugger;
	if($("Info_AgentReadyVoiceIndication").style.display != "none") $("Info_AgentState").textContent = AGENT_ONLINE;
	addElementClass($('Info_AgentReadyVoiceIndication'), 'active');
}
function AgentStateWorking()
{	
	// debugger;

	if($("Info_AgentReadyVoiceIndication").style.display != "none") $("Info_AgentState").textContent = AGENT_WORKING;
	removeElementClass($('Info_AgentReadyVoiceIndication'), 'active');
}
function RefreshLastAgentState()
{
	// debugger;
	var NewAgentState = $("Info_AgentState").textContent;

	if(ClientLink.Contacts.GetAllCount() > 0) NewAgentState = AGENT_WORKING;
	else
	{
		if(ClientLink.commands.WaitForCall.active) 
		{
			AgentStateWaiting()
			NewAgentState = AGENT_WAITING;
			addElementClass($('WaitForCall'), 'active');
			removeElementClass($('Pause'), 'active');
		}
		else if(ClientLink.commands.Pause.active) 
		{
			NewAgentState = AgentStatePause();
			removeElementClass($('WaitForCall'), 'active');
			addElementClass($('Pause'), 'active');
		}
		else
		{

		}
	}

	var _resetDateTime = false;
	if(ClientLink.commands.WaitForCall.active) 
	{
		addElementClass($('WaitForCall'), 'active');
		removeElementClass($('Pause'), 'active');
		_resetDateTime = true;
	}
	else if(ClientLink.commands.Pause.active) 
	{
		removeElementClass($('WaitForCall'), 'active');
		addElementClass($('Pause'), 'active');
		_resetDateTime = true;
	}	

	var m_LastAgentState = $("Info_AgentState").textContent;

	if(NewAgentState != m_LastAgentState)
	{
		if(!m_LastAgentState.startsWith(NewAgentState)) m_LastAgentState = NewAgentState;
		
		SetLastAgentState(m_LastAgentState, new Date());
	}
}
function SetLastAgentState(description, startTime)
{
	var m_LastAgentState = $("Info_AgentState").textContent;

	if (m_LastAgentState != description && $("Info_AgentReadyVoiceIndication").style.display != "none") $("Info_AgentState").textContent = description;
	if (startdatetime != startTime) startdatetime = startTime;
}
function SetReadyBreakBasedOnAgentState(state)
{
	// debugger;
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

	removeElementClass($("CloseScript"),'active');
	ClientLink.TerminateContact(ClientLink.Contacts.Get(ClientLink.Contacts.ActiveContactId));
	SetAgentInfoStat();
}
function NewContact(contactInfo)
{
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
	
	DebugLog("Tab added:" + contactInfo.__TabId);
}
function RemoveContact(contactInfo)
{
	debugger;

	if(ClientLink.Contacts.GetAllCount() > 0) 
	{
		var contctlst = ClientLink.Contacts.GetAll();
		var contctlstKeys =  Object.keys(contctlst);

		var icount = contctlstKeys.length - 1;
		if(contctlstKeys[icount].indexOf('_') == 0) contctlstKeys[icount] = contctlstKeys[icount].slice(1,contctlstKeys[icount].length);
		var conct = ClientLink.Contacts.Get(contctlstKeys[icount]);

		var newId = conct.Id;
		ClientLink.SetActiveContact(ClientLink.Contacts.Get(newId));
		ClientLink.Contacts.Get(newId).__ContactUpdate = false;
		VoiceButtonsbehaviourWhenCallHold(ClientLink.Contacts.Get(newId));	
		
		conct.isInUse = true;

		addElementClass($('voicestatus_' + conct.Id),'active');
		// DisplayScriptURLs(conct);
		RemoveContactScriptURLs(contactInfo);
		ShowActiveContactScriptURLs(conct);
		var childActiveCount = ClientLink.Contacts.GetAllCount();
		var childActiveCountToConsider = (childActiveCount == 1);

		ResizeFirstActiveContact(childActiveCountToConsider);
	}
	else
	{
		$('contactViewerObject').style.display = "inline";
		$('contactViewerObject').parentNode.style.overflow = 'hidden';
		$('masterTab').style.display ='none';
		$('masterTab').innerHTML = '';
		
		// removeElementClass($('VoiceToolStrip'),'active');
		ShowHideVoiceToolStripIcons(false);
		// removeElementClass($('voiceStatusToolStrip'),'active');
		ShowHideVoiceStatusToolStripIcons(false);
		removeElementClass($('ExtendWrapup'),'active');
		$('ExtendWrapup').disabled = true;
		$('WaitForCall').disabled = false;
		$('SearchMode').disabled = false;
		$("AgentLogout").disabled = false;

		// if($('contactViewerObject').agentState == 'ready') AgentStateWaiting();
		// else AgentStatePause();
		RefreshLastAgentState();
	}

	removeElementClass($('CloseScript'),'active');
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
	return;

	var displayStyle ='display:none;';

	if(canDisplay) displayStyle ='';
	
	$('voiceStatusToolStrip').style = displayStyle;
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
			// debugger;
			// if($('InfoContactState_'+ _Contact.Id)) $('InfoContactState_'+ _Contact.Id).innerHTML = $D(GetContactState(_Contact.State));
			if($('InfoContactOriginator_'+ _Contact.Id)) $('InfoContactOriginator_'+ _Contact.Id).innerHTML = $D(_Contact.From);
			if($('InfoContactActivity_'+ _Contact.Id)) $('InfoContactActivity_'+ _Contact.Id).innerHTML = $D(_Contact.Context);
			if($('InfoContactTo_'+ _Contact.Id)) $('InfoContactTo_'+ _Contact.Id).innerHTML = $D(_Contact.To);
			if($('InfoContactCustomer_'+ _Contact.Id) )$('InfoContactCustomer_'+ _Contact.Id).innerHTML = $D(_Contact.Customer);
			 
			AgentStateWorking();

			if(_Contact.State == 'C' || _Contact.State == 'H') 
			{
				$('CloseScript').disabled = true;
			}
			else 
			{
				$('CloseScript').disabled = false;
			}	
		}
		else
		{
			DebugLog("SetAgentInfoStat. Contact not found");
			if($('InfoContactState_'+ ClientLink.Contacts.ActiveContactId)) $('InfoContactState_'+ ClientLink.Contacts.ActiveContactId).innerHTML = "&nbsp;";
			if($('InfoContactOriginator_'+ ClientLink.Contacts.ActiveContactId)) $('InfoContactOriginator_'+ ClientLink.Contacts.ActiveContactId).innerHTML = "&nbsp;";
			if($('InfoContactActivity_'+ ClientLink.Contacts.ActiveContactId)) $('InfoContactActivity_'+ ClientLink.Contacts.ActiveContactId).innerHTML = "&nbsp;";
			if($('InfoContactTo_'+ ClientLink.Contacts.ActiveContactId)) $('InfoContactTo_'+ ClientLink.Contacts.ActiveContactId).innerHTML = "&nbsp;";
			if($('InfoContactCustomer_'+ ClientLink.Contacts.ActiveContactId)) $('InfoContactCustomer_'+ ClientLink.Contacts.ActiveContactId).innerHTML = "&nbsp;"
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


function VoiceButtonsbehaviourWhenCallHold(contact)
{
	// debugger;

	var CurrentAction = contact.State;

	if(CurrentAction == 'D') $("VoiceHangup").disabled = true;
	else if(CurrentAction != 'P') $("VoiceHangup").disabled = (CurrentAction == 'H');
	
	$("CloseScript").disabled = (CurrentAction == 'H' || CurrentAction == 'C');

	if(contact && contact.Direction == "O") 
	{
		if(CurrentAction == 'H' || CurrentAction == 'C') $("SearchMode").disabled = false;
		else if(CurrentAction == 'P') $("SearchMode").disabled = true;
		else $("SearchMode").disabled = $("SearchMode").disabled;
	}
	else $("SearchMode").disabled = (CurrentAction == 'H' || CurrentAction == 'C');

	var contctlst = ClientLink.Contacts.GetAll();
	var contctlstKeys =  Object.keys(contctlst);		

	for(var i = 0; i < contctlstKeys.length; i++)
	{
		if(contctlstKeys[i].indexOf('_') == 0) contctlstKeys[i] = contctlstKeys[i].slice(1,contctlstKeys[i].length);
		var conct = ClientLink.Contacts.Get(contctlstKeys[i]);
		if(conct.State == 'P') 
		{
			$("SearchMode").disabled = true;
			return;
		}
	}
}

// -- > Display contact active duration


function DisplayContactActivityDateTimeElapsed(contactInfo, contactActivityStartDatetime)
{
	// debugger;

	if($("InfoContactStatusDuration_"+contactInfo.Id) == null) return;

	if(contactActivityStartDatetime == null) contactActivityStartDatetime = new Date();
	
	var timediff = new Date() - contactActivityStartDatetime;
	var seconds = FormatTime(timediff);
	$("InfoContactStatusDuration_" + contactInfo.Id).textContent = seconds;

	if(contactInfo.StateLastChangedDateTime && String(contactInfo.StateLastChangedDateTime).trim().length > 0)
	{
		var timediffStateChanged = new Date() - contactInfo.StateLastChangedDateTime;
		var secondsStateChanged = FormatTime(timediffStateChanged);	
		$('InfoContactState_'+ contactInfo.Id).innerHTML = $D(GetContactState(contactInfo.State)) + '   '+ String(secondsStateChanged);
	}
	else
	{
		$('InfoContactState_'+ contactInfo.Id).innerHTML = $D(GetContactState(contactInfo.State));
	}
	
	setTimeout(function() { DisplayContactActivityDateTimeElapsed(contactInfo, contactActivityStartDatetime); }, 1000);
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

	var activeContact = ClientLink.Contacts.Get(ClientLink.Contacts.ActiveContactId);

	if(activeContact)
	{
		activeContact.RecordInProgress = !activeContact.RecordInProgress;
		SetRecordDisplayBasedOnActiveContactStatus(activeContact.RecordInProgress);
	}
	else SetRecordDisplayBasedOnActiveContactStatus(false);
}

function SetRecordDisplayBasedOnActiveContactStatus(isRecording)
{
	// debugger;
	if(isRecording && isRecording == true)
	{
		addElementClass($('VoiceRecord'), 'active');
		$('VoiceRecord').childNodes[3].innerText = "Stop Recording";
		$('VoiceRecord').childNodes[3].title = "Stop Recording";
	}
	else
	{
		// stop record
		$('VoiceRecord').childNodes[3].innerText = "Record"
		$('VoiceRecord').childNodes[3].title = "Record";
		removeElementClass($('VoiceRecord'), 'active');
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
	// removeElementClass($('SearchMode'),'active');
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

function HideAllDialogModals()
{
	// debugger;

	if($('backdrop') &&  $('backdrop').className?.includes('active')) return;

	// Manual Dial
	if($('dial-pad')) removeElementClass($('dial-pad'), 'active');
	// if($('VoiceNewCall')) removeElementClass($('VoiceNewCall'), 'active');

	// search mode
	if($('search-mode')) removeElementClass($('search-mode'), 'active');

	// team selection 
	if($('team')) removeElementClass($('team'), 'active');
	// if($('TeamSelection')) removeElementClass($('TeamSelection'), 'active');

	// Agent Logout
	if($('AgentLogout')) removeElementClass($('AgentLogout'), 'active');
	if($('modalAgentLogout')) removeElementClass($('modalAgentLogout'), 'active');

	// Agent Reload Warning
	if($('modalAgentReloadWarning')) removeElementClass($('modalAgentReloadWarning'), 'active');

	// Select Quanlification
	if($('Select-qual')) removeElementClass($('Select-qual'), 'active');
	if($('Selectqual')) removeElementClass($('Selectqual'), 'active');

	// Break Reason
	if($('break-reason')) removeElementClass($('break-reason'), 'active');

	if($('backdrop')) removeElementClass($('backdrop'), 'active');
}

function DisplayScriptURLs(contactInfo)
{
	// debugger;
	var vals = contactInfo.ScriptUrl.split('|');
	$('masterTab').style.display ='block';
	// $('masterTab').innerHTML = '';
	$('contactViewerObject').style.display = "none";
	$('contactViewerObject').parentNode.style.overflow = '';

	if(vals !=null && vals.length > 0)
	{
		// "bin://Nixxis.Client.Agent.TabbedBrowser, NixxisAgentControl"
		if(vals[0] !=null && vals[0]?.includes('TabbedBrowser'))
		{
			var divTagBox = document.createElement('div');
			divTagBox.className = "tabBox";
			divTagBox.id = "tabBox" + contactInfo.Id;
			var ulTagBox = document.createElement('ul');

			var divTagURLBox = document.createElement('div');
			divTagURLBox.className = "tabCntBox";
			divTagURLBox.id = "tabCntBox" + contactInfo.Id;

			for(var j = 1; j < vals.length; j++)
			{
				var liTagBox = document.createElement('li');

				var spanTagBox = document.createElement('span');
				if(j == 1) spanTagBox.className = 'active';
				else spanTagBox.className = '';

				spanTagBox.id = 'spanTagBox' + j;
				spanTagBox.onclick = liTagBoxSelect_OnClick;

				if(vals[j] && vals[j].length > 30) spanTagBox.innerHTML = vals[j]?.substring(0,30) + '...';
				else spanTagBox.innerHTML = vals[j];

				liTagBox.appendChild(spanTagBox);
				ulTagBox.appendChild(liTagBox);

				var childdivTagURLBox = document.createElement('div');
				childdivTagURLBox.id = 'childdivTagURLBox' + j;
				childdivTagURLBox.className = "tabCnt";
				if(j == 1) childdivTagURLBox.style.display = 'contents';
				else childdivTagURLBox.style.display = 'none';

				var childIframeTagURLBox = GetNewIframe();
				childIframeTagURLBox.TabHeaderControl =  spanTagBox;
				childIframeTagURLBox.onload = LoadIframeTitleToTabTitle;

				childIframeTagURLBox.setAttribute("src",vals[j]);
				// childIframeTagURLBox.src = vals[j];

				childdivTagURLBox.appendChild(childIframeTagURLBox);
				divTagURLBox.appendChild(childdivTagURLBox);
			}

			divTagBox.appendChild(ulTagBox);
			$('masterTab').appendChild(divTagBox);
			$('masterTab').appendChild(divTagURLBox);
		}
		else
		{
			var childIframe = GetNewIframe();
			childIframe.id = 'NixxisAgent' + contactInfo.Id;
			// childIframe.tagName = 'NixxisAgent';

			if(contactInfo.ScriptUrl)
			{
				childIframe.src = contactInfo.ScriptUrl;
				childIframe.style.display = 'contents';
			}
			else
			{
				childIframe.src = "about:blank";
				childIframe.style.display = 'none';
			}

			$('masterTab').appendChild(childIframe);
		}

		ShowActiveContactScriptURLs(contactInfo);
	}
}

function LoadIframeTitleToTabTitle(sender)
{
	
	var iframe = sender.currentTarget;

	try
	{ 
		var doc1 = iframe.contentWindow.document; 
		if(doc1) console.log("doc1");
	}catch{}

	try
	{ 
		var doc2 = iframe.contentDocument; 
		if(doc2) console.log("doc2");
	}catch{}

	try
	{ 
		var doc3 = iframe.document;
		if(doc3) console.log("doc3");
	}catch{}
	
	// debugger;
	// if(iframe)
	// {
	// 	iframe.TabHeaderControl.innerHTML = 
	// }
}

function ShowActiveContactScriptURLs(conct)
{
	// debugger;
	// conct = ClientLink.Contacts.Get(ClientLink.Contacts.ActiveContactId);

	if(conct)
	{
		var tabBoxList = $('masterTab').getElementsByClassName("tabBox");

		if(tabBoxList && tabBoxList.length > 0)
		{
			for(var i = 0; i < tabBoxList.length; i++)
			{
				if(!tabBoxList[i].id) continue;

				if(tabBoxList[i].id == "tabBox" + conct.Id) tabBoxList[i].style.display ='block';				
				else tabBoxList[i].style.display ='none';
			}
		}

		var tabCntBoxList = $('masterTab').getElementsByClassName("tabCntBox");

		if(tabCntBoxList && tabCntBoxList.length > 0)
		{
			for(var i = 0; i < tabCntBoxList.length; i++)
			{
				if(!tabCntBoxList[i].id) continue;

				if(tabCntBoxList[i].id == "tabCntBox" + conct.Id) tabCntBoxList[i].style.display ='contents';				
				else tabCntBoxList[i].style.display ='none';
			}
		}

		var singleIframeList = $('masterTab').getElementsByTagName('iframe');

		if(singleIframeList && singleIframeList.length > 0)
		{
			for(var i = 0; i < singleIframeList.length; i++)
			{
				if(!singleIframeList[i].id) continue;

				if(singleIframeList[i].id == "NixxisAgent" + conct.Id) singleIframeList[i].style.display ='block';				
				else if(singleIframeList[i].id?.includes("NixxisAgent")) singleIframeList[i].style.display ='none';
			}
		}
	}
	else
	{

	}
}

function RemoveContactScriptURLs(conct)
{
	debugger;

	if(conct)
	{
		var tabBoxList = $('masterTab').getElementsByClassName("tabBox");

		if(tabBoxList && tabBoxList.length > 0)
		{
			for(var i = 0; i < tabBoxList.length; i++)
			{
				if(!tabBoxList[i].id) continue;

				if(tabBoxList[i].id == "tabBox" + conct.Id) 
				{
					// tabBoxList[i].Remove();
					$('masterTab').removeChild(tabBoxList[i]);
				}
			}
		}

		var tabCntBoxList = $('masterTab').getElementsByClassName("tabCntBox");

		if(tabCntBoxList && tabCntBoxList.length > 0)
		{
			for(var i = 0; i < tabCntBoxList.length; i++)
			{
				if(!tabCntBoxList[i].id) continue;

				if(tabCntBoxList[i].id == "tabCntBox" + conct.Id) 
				{
					// tabCntBoxList[i].Remove();
					$('masterTab').removeChild(tabCntBoxList[i]);
				}
			}
		}

		var singleIframeList = $('masterTab').getElementsByTagName('iframe');

		if(singleIframeList && singleIframeList.length > 0)
		{
			for(var i = 0; i < singleIframeList.length; i++)
			{
				if(!singleIframeList[i].id) continue;

				if(singleIframeList[i].id == "NixxisAgent" + conct.Id) 
				{
					// singleIframeList[i].Remove();
					$('masterTab').removeChild(singleIframeList[i]);
				}
			}
		}
	}
	else
	{

	}
}

function liTagBoxSelect_OnClick(sender)
{
	// debugger;	
	const spanList = $('masterTab').getElementsByTagName("span");
	const divList = $('masterTab').getElementsByTagName("div");

	if(spanList !=null && spanList.length > 0)
	{
		for(var j = 0; j < spanList.length; j++)
			spanList[j].className = '';
	}

	if(divList !=null && divList.length > 0)
	{
		for(var j = 0; j < divList.length; j++)
		{
			if(divList[j].id?.includes('childdivTagURLBox')) divList[j].style.display = 'none';
		}
	}
	
	var idNo = sender.currentTarget.id?.substring('spanTagBox'.length, sender.currentTarget.id.length);

	$('spanTagBox'+idNo).className = 'active';
	$('childdivTagURLBox'+idNo).style.display = 'contents';
}

function GetNewIframe()
{
	var childIframeTagURLBox = document.createElement('iframe');
	childIframeTagURLBox.allowtransparency = 'true';

	childIframeTagURLBox.frameborder='0';
	childIframeTagURLBox.height = '100%';
	childIframeTagURLBox.width = '100%';
	childIframeTagURLBox.style="border: 0px;";

	return childIframeTagURLBox;
}
