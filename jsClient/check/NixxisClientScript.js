/*
 * File version : 1.20.4.10
 */
var ExternalFn = null;
var txWeb =
{
    IE : false, //Internet Explorer
	NS : false, //Netscape
	OP : false, //Opera
	SA : false, //Safari
	FF : false, //Firefox
	Other : false, //Other browser
	Init : function()
	{
		if (navigator.userAgent.indexOf("Opera") >= 0) { this.OP = true; }
		else if (navigator.userAgent.indexOf("Safari") >= 0) { this.SA = true;}    
		else if (navigator.userAgent.indexOf("MSIE") >= 0) { this.IE = true; }
		else if (navigator.userAgent.indexOf("Netscape6/") >= 0) { this.NS = true; }
		else if (navigator.userAgent.indexOf("Netscape7/") >= 0) { this.NS = true; }
		else if (navigator.userAgent.indexOf("Navigator/9") >= 0) { this.NS = true; }    
		else if (navigator.userAgent.indexOf("Firefox/") >= 0) { this.FF = true; }
		else if (navigator.userAgent.indexOf("Gecko") >= 0) { this.NS = true; }
		else { this.Other = true; }
	}		
}
txWeb.Init();
function externalContactInfo()
{
    this.Id = null;
	this.Media = ' ';
	this.State = ' ';
	this.From = null;
	this.To = null;
	this.UUI = null;
	this.ContentLink = null;
	this.Queue = null;
	this.Direction = null;
	this.Context = null;
	this.Customer = null;
	this.ContactListId = null;
	this.Script = null;
	this.ScriptUrl = null;
	this.Activity = null;
	this.Campaign =null;
	this.Subject = null;
	this.Body = null;
	this.DateTime = null;
	this.UserData = null;
	this.AgentId = null;
	this.AgentAccount = null;
	this.SessionId = null;
}
var NixxisContactLink = 
{
    clientLink : null,
    owner :  null,
    contactId: null,
	contactlistId: null,
	activityId: null,
	contactInfo : null,
	isWin : true,
    Init : function()
    {
		if (txWeb.FF) {
			try {
				document.domain = document.domain.substring(document.domain.lastIndexOf('.', document.domain.lastIndexOf('.') - 1) + 1);
			} 
			catch (e) {
				;
			}
			//alert("Ff Script: " + document.domain);
		}
		var _winExt = true;

		try 
		{
			window.external.setBrowserLocking(true);
		}
		catch(e)
		{
			_winExt = false;
			NixxisContactLink.isWin = false;
		}

		if (_winExt)
		{
			ExternalFn = window.external;
			NixxisContactLink.contactId = window.external.ContactId;
			NixxisContactLink.contactInfo = new externalContactInfo();
			NixxisContactLink.contactInfo.Activity = window.external.Activity;
			
var _Location = window.document.URL;
			
			var _Parameters = _Location.substring(_Location.indexOf('?') + 1, _Location.length);
			
			//_Parameters = window.location.search.substring(1);
			var _Values = _Parameters.split("&");
				for (var i = 0; i < _Values.length; i++) 
				{
					
					var _Pair = _Values[i].split("=");

					//Contactlist id
					if (_Pair[0].toLowerCase() == "ctlid") {
						NixxisContactLink.contactlistId = _Pair[1];
					}
					if (_Pair[0].toLowerCase() == "id") {
						NixxisContactLink.contactlistId = _Pair[1];
					}
					if (_Pair[0].toLowerCase() == "diallerreference") {
						NixxisContactLink.contactlistId = _Pair[1];
					}					

				}
			//NixxisContactLink.contactInfo.Activity = "12ZSD21EDD12";
			//alert('ContactId:' + NixxisContactLink.contactId);
		}
		else 
		{
			////debugger;
			
			//Test
			//var t = '/*ContactId*/';
			var _Location = window.document.URL;
			
			var _Parameters = _Location.substring(_Location.indexOf('?') + 1, _Location.length);
			
			//_Parameters = window.location.search.substring(1);
			var _Values = _Parameters.split("&");
			
			var prnt = window;
			var _SearchParent = true;
			var _CountParent = 0;
			while (_SearchParent && _CountParent < 20) {
				_CountParent++;
				try {
					if (prnt.ClientLink) {
						NixxisContactLink.clientLink = prnt.ClientLink;
						NixxisContactLink.owner = prnt;
						_SearchParent = false;
					}
					else {
						if (prnt.__crContactId) {
							NixxisContactLink.contactId = prnt.__crContactId;
						}
						prnt = prnt.parent;
					}
				} 
				catch (e) {
					;
				}
			}
			try
			{
				////debugger;
				
				for (var i = 0; i < _Values.length; i++) 
				{
					
					var _Pair = _Values[i].split("=");
					//Contact Ident
					if (!NixxisContactLink.contactId) 
					{
						if (_Pair[0].toLowerCase() == "contactid") 
						{
							NixxisContactLink.contactId = _Pair[1];
						}
						if (_Pair[0].toLowerCase() == "ctid") 
						{
							NixxisContactLink.contactId = _Pair[1];
						}
						if (_Pair[0].toLowerCase() == "conversationid") 
						{
							NixxisContactLink.contactId = _Pair[1];
						}
					}
					//Contactlist id
					if (_Pair[0].toLowerCase() == "ctlid") {
						NixxisContactLink.contactlistId = _Pair[1];
					}
					if (_Pair[0].toLowerCase() == "id") {
						NixxisContactLink.contactlistId = _Pair[1];
					}
					if (_Pair[0].toLowerCase() == "diallerreference") {
						NixxisContactLink.contactlistId = _Pair[1];
					}					
					//Activity id
					if (_Pair[0].toLowerCase() == "aid") {
						NixxisContactLink.activityId = _Pair[1];
					}
					if (_Pair[0].toLowerCase() == "activityid") {
						NixxisContactLink.activityId = _Pair[1];
					}
				}
				
				ExternalFn = NixxisContactLink.Cmd;
				if (NixxisContactLink.clientLink.Contacts) NixxisContactLink.contactInfo = NixxisContactLink.clientLink.Contacts.Get(NixxisContactLink.contactId);
			}
			catch (e) {}
		}
    },
    agent :
    {
        UserName    : function () { if (!NixxisContactLink.clientLink) return "Jane Doe"; return NixxisContactLink.clientLink.UserName; },
        UserAccount : function () { if (!NixxisContactLink.clientLink) return "100"; return NixxisContactLink.clientLink.UserAccount; },
		Description : function () { if (!NixxisContactLink.clientLink) return "100, Jane Doe"; return NixxisContactLink.clientLink.Description; },
		nixxisTestMsg : function () { if (!NixxisContactLink.clientLink) return; return NixxisContactLink.clientLink.nixxisTestMsg("Hello"); }
    },
	demo :
	{
		GetChatMsg : function(text) { if (!NixxisContactLink.owner) return; return NixxisContactLink.owner.GetChatMsg(); }
	},
    commands :
    {
	    WaitForCall : function()
		{
			ExternalFn.WaitForCall();
		},
		SetContactTopLabel : function(text)
		{
			ExternalFn.SetContactTopLabel(text);
		},
		SetContactBottomLabel : function(text)
		{
			ExternalFn.SetContactBottomLabel(text);
		},
		SetContactRequestAction : function()
		{
			ExternalFn.SetContactRequestAction();
		},
		terminateContact : function() 
		{
			ExternalFn.terminateContact(); 
		},
		voicetransfer : function() 
		{
			ExternalFn.voicetransfer(); 
		},
		voicehold : function() 
		{
			ExternalFn.voicehold(); 
		},
		voicenewcall : function(destination) 
		{
			ExternalFn.voicenewcall.execute(destination); 
		},
		redial : function(destination, contactlistId, activityId) 
		{
			ExternalFn.redial(destination, contactlistId, activityId); 
		},
		voiceforward : function(destination) 
		{ 
			ExternalFn.voiceforward.execute(destination); 
		},
		voicehangup : function(destination) 
		{ 
			ExternalFn.voicehangup.execute(); 
		},
		terminateContactAndGoReady : function() 
		{
			ExternalFn.terminateContactAndGoReady();
		},
		getPredefinedTexts : function()
		{
			return ExternalFn.getPredefinedTexts();
		},
		getAttachments : function()
		{
			return ExternalFn.getAttachments();
		},
		startRecording : function()
       	{
        	ExternalFn.startRecording();
        },
        stopRecording : function()
      	{
			ExternalFn.stopRecording();
		}
	},
	Qualification : 
	{
		setQualification: function(qualificationId, callbackDateTime, callbackPhone)
		{
			if (NixxisContactLink.isWin) 
				window.external.executeCommand('~setinfo', 1, NixxisContactLink.contactId, qualificationId, callbackDateTime, callbackPhone);
			else 
				ExternalFn.setQualification(qualificationId, callbackDateTime, callbackPhone);

		},
		getQualification: function(activityId)
		{
			if (NixxisContactLink.isWin) 
			{
				if (typeof(activityId) == 'undefined') 
				{
					var actList = NixxisContactLink.contactInfo.Activity.split('.');
					return window.external.executeCommand('~getinfo', 1, actList[0]);
				}
				else
					return window.external.executeCommand('~getinfo', 1, activityId);
				
			}
			else 
				return ExternalFn.getQualification(activityId);
		}
	},
	Contact :
	{
		getStat : function()
		{
			if (!NixxisContactLink.contactInfo) return;
			return NixxisContactLink.contactInfo.State;
		}
	},
	Agenda:
	{
		AppId : "",
		AppDateMs : 0,
		AppDate : null,
		AppUtcDate : null,
		AppMember : "",
		DefaultArea : "",
		getAgendaByContact : function(dateTime, area)
		{
			if (NixxisContactLink.isWin) 
				return window.external.executeCommand('getagendabycontact',NixxisContactLink.contactId, dateTime, area);
			else 
				return ExternalFn.getAgendaByContact(dateTime, area);
		},
		storeAppointmentByContact : function(dateTime, duration, description, area)
		{
			var timeZoneOffset = 60;
			var OneSeconde = 1000;
			var OneMinute = 60 * OneSeconde;
			
			//if (!NixxisContactLink.clientLink) return false;
			NixxisContactLink.Agenda.AppId = "";
			NixxisContactLink.Agenda.AppDateMs = 0;
			NixxisContactLink.Agenda.AppDate = null;
			NixxisContactLink.Agenda.AppUtcDate = null;
			NixxisContactLink.Agenda.AppMember = "";
			var rtn = "";
			if (NixxisContactLink.isWin)
				rtn = window.external.executeCommand('StoreAppointmentByContact',NixxisContactLink.contactId, dateTime, duration, description, area);
			else
				rtn = ExternalFn.storeAppointmentByContact(dateTime, duration, description, area);
			
			//alert("rtn: " + rtn);
			if (rtn != "")
			{
				var list = rtn.split(';');
				NixxisContactLink.Agenda.AppDateMs = parseInt(list[1]);
				//NixxisContactLink.Agenda.AppDate = new Date (NixxisContactLink.Agenda.AppDateMs + (OneMinute * timeZoneOffset));
				NixxisContactLink.Agenda.AppDate = new Date (NixxisContactLink.Agenda.AppDateMs);
				NixxisContactLink.Agenda.AppUtcDate = new Date (NixxisContactLink.Agenda.AppDateMs);
				NixxisContactLink.Agenda.AppId = list[0];
				if (list.length > 2) NixxisContactLink.Agenda.AppMember = list[2];
				return true;
			}
			return false;
		},
		cancelAppointment : function()
		{
			//if (!NixxisContactLink.clientLink) return;
			if (!NixxisContactLink.Agenda.AppId) return;
			NixxisContactLink.Agenda.AppId = "";
			NixxisContactLink.Agenda.AppDateMs = 0;
			NixxisContactLink.Agenda.AppDate = null;
			NixxisContactLink.Agenda.AppUtcDate = null;
			NixxisContactLink.Agenda.AppMember = "";
			if (NixxisContactLink.isWin) 
				return window.external.executeCommand('CancelAppointmentByContact',NixxisContactLink.contactId, NixxisContactLink.Agenda.AppId);
			else 
				return ExternalFn.cancelAppointmentByContact();
		},
		cancelAppointmentById : function(id)
		{
			//if (!NixxisContactLink.clientLink) return;
			if (!id) return;
			if (NixxisContactLink.Agenda.AppId == id) 
			{
				NixxisContactLink.Agenda.AppId = "";
				NixxisContactLink.Agenda.AppDateMs = 0;
				NixxisContactLink.Agenda.AppDate = null;
				NixxisContactLink.Agenda.AppUtcDate = null;
				NixxisContactLink.Agenda.AppMember = "";
			}
			if (NixxisContactLink.isWin) 
				return window.external.executeCommand('CancelAppointmentByContact',NixxisContactLink.contactId, id);
			else 
				return NixxisContactLink.clientLink.cancelAppointmentByContact(id);
		},
		SelectApp : new Function()
	},
	Email :
	{
		InsertText: function(text)
		{
			ExternalFn.mailInsertText(text);
		},
		AddText: function(text)
		{
			ExternalFn.mailAddText(text);
		},
		ClearText: function()
		{
			ExternalFn.mailClearText();
		}
	},
	//you can't use these commands directly
	Cmd :
	{
		executeCommand : function()
		{
			if (!NixxisContactLink.clientLink) return;
			return  NixxisContactLink.clientLink.executeCommand();
		},
		//Phone commands
	    WaitForCall : function() { if (!NixxisContactLink.clientLink) return; NixxisContactLink.clientLink.commands.WaitForCall.execute(); },
		terminateContact : function() { if (!NixxisContactLink.clientLink) return; NixxisContactLink.clientLink.TerminateContact(NixxisContactLink.clientLink.Contacts.Get(NixxisContactLink.contactId)); },
		voicetransfer : function() { if (!NixxisContactLink.clientLink) return; NixxisContactLink.clientLink.commands.VoiceTransfer.execute(); },
		voicehold : function() { if (!NixxisContactLink.clientLink) return; NixxisContactLink.clientLink.commands.VoiceHold.execute(); },
		voicenewcall : function(destination) { if (!NixxisContactLink.clientLink) return; NixxisContactLink.clientLink.commands.VoiceNewCall.execute(destination); },
		redial : function(destination, contactlistId, activityId) 
		{ 
			if (!NixxisContactLink.clientLink) return; 
			var lsid = contactlistId == null ? '' : contactlistId;
			var acid = activityId == null ? '' : activityId;

			NixxisContactLink.clientLink.commands.VoiceNewCall.execute(destination, NixxisContactLink.contactId, "LsId=" + lsid, "AcId=" + acid);  
		},
		voiceforward : function(destination) { if (!NixxisContactLink.clientLink) return; NixxisContactLink.clientLink.commands.VoiceForward.execute(destination); },
		voicehangup : function(destination) { if (!NixxisContactLink.clientLink) return; NixxisContactLink.clientLink.commands.VoiceHangup.execute(); },
		terminateContactAndGoReady : function() 
		{
			if (!NixxisContactLink.clientLink) return;
			NixxisContactLink.clientLink.commands.WaitForCall.execute();
			NixxisContactLink.clientLink.TerminateContact(NixxisContactLink.clientLink.Contacts.Get(NixxisContactLink.contactId)); 
		},
		//Info commands
		getPredefinedTexts : function()
		{
			if (!NixxisContactLink.clientLink) return;
			var actList = NixxisContactLink.contactInfo.Activity.split('.');
			return NixxisContactLink.clientLink.getPredefinedTexts(actList[0]);
		},
		getAttachments : function()
		{
			if (!NixxisContactLink.clientLink) return;
			var actList = NixxisContactLink.contactInfo.Activity.split('.');
			return NixxisContactLink.clientLink.getAttachments(actList[0]); 
		},		
		//Interface commands
		SetContactTopLabel : function(text) { if (!NixxisContactLink.clientLink) return; NixxisContactLink.clientLink.SetContactTopLabel(NixxisContactLink.contactId, text); },
		SetContactBottomLabel : function(text) { if (!NixxisContactLink.clientLink) return; NixxisContactLink.clientLink.SetContactBottomLabel(NixxisContactLink.contactId, text); },
		SetContactRequestAction : function() { if (!NixxisContactLink.clientLink) return; NixxisContactLink.clientLink.SetContactRequestAction(NixxisContactLink.contactId); },
		//Agent commands
		startRecording : function() { if (!NixxisContactLink.clientLink) return; NixxisContactLink.clientLink.connection.executeCommand(NixxisContactLink.clientLink.codes.commandCodes.VoiceRecord, 'True', NixxisContactLink.contactId); },
        stopRecording : function() { if (!NixxisContactLink.clientLink) return; NixxisContactLink.clientLink.connection.executeCommand(NixxisContactLink.clientLink.codes.commandCodes.VoiceRecord, 'False', NixxisContactLink.contactId); },
        UserName : function () { if (!NixxisContactLink.clientLink) return; return NixxisContactLink.clientLink.UserName; },
        UserAccount : function () { if (!NixxisContactLink.clientLink) return; return NixxisContactLink.clientLink.UserAccount; },
		Description : function () { if (!NixxisContactLink.clientLink) return; return NixxisContactLink.clientLink.Description; },
		//Qualification
		setQualification: function(qualificationId, callbackDateTime, callbackPhone)
		{
			if (!NixxisContactLink.clientLink) return;
			NixxisContactLink.clientLink.setQualification(NixxisContactLink.contactId, qualificationId, callbackDateTime, callbackPhone);
		},
		getQualification : function (activityId) 
		{
			if (!NixxisContactLink.clientLink) return;
			if (typeof(activityId) == 'undefined') 
			{
				var actList = NixxisContactLink.contactInfo.Activity.split('.');
				return NixxisContactLink.clientLink.getQualifications(actList[0]);
			}
			else
				return NixxisContactLink.clientLink.getQualifications(activityId);
		},
		//Agenda
		getAgendaByContact: function(dateTime, area)
		{
			if (!NixxisContactLink.clientLink) 
				return;
			return NixxisContactLink.clientLink.getAgendaByContact(NixxisContactLink.contactId, dateTime, area);
		},
		storeAppointmentByContact : function(dateTime, duration, description, area) 
		{ 
				if (!NixxisContactLink.clientLink) return;
				return NixxisContactLink.clientLink.storeAppointmentByContact(NixxisContactLink.contactId, dateTime, duration, description, area);
		},
		cancelAppointment: function()
		{

				if (!NixxisContactLink.clientLink) 
					return;
				return NixxisContactLink.clientLink.cancelAppointmentByContact(NixxisContactLink.contactId, NixxisContactLink.Agenda.AppId);
		},
		cancelAppointmentById: function(id)
		{
			if (!NixxisContactLink.clientLink) 
				return;
			return NixxisContactLink.clientLink.cancelAppointmentByContact(NixxisContactLink.contactId, id);
		},
		//E-mail
		mailInsertText: function(text) 
		{ 	
			if (!NixxisContactLink.clientLink) 
				return;
			NixxisContactLink.contactInfo.EMailInsertTextEvent.Invoke(text);
		},
		mailAddText: function(text) 
		{ 		
			if (!NixxisContactLink.clientLink) 
				return;
			NixxisContactLink.contactInfo.EMailAddTextEvent.Invoke(text);
		},
		mailClearText: function()
		{
			if (!NixxisContactLink.clientLink) 
				return;
			NixxisContactLink.contactInfo.EMailClearTextEvent.Invoke();
		}		
	}
};