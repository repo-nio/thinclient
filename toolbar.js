/*
 * version: build 17
 */
NixxisClientLink.prototype.codes = 
{
	agentQueueStates :
	{
		HighPriorityContacts : 0,
		WaitingContacts : 1
	},
    eventCodes : 
    { 
        '0' : 'CommandState', 
        '1' : 'ClientState', 
        '2' : 'ContactData', 
        '3' : 'ContactState',
        '4' : 'SupervisionData',
		'5' : 'SupervisionItem',
        '6' : 'AgentQueueState',
        '7' : 'AgentWarning',
		'8' : 'TeamsChanged',
		'10' : 'ChatSpyMessage',
		'99' : 'EndBatch',

        'CommandState' : 0, 
        'ClientState' : 1, 
        'ContactData' : 2, 
        'ContactState' : 3,
        'SupervisionData' : 4,
		'SupervisionItem' : 5,
        'AgentQueueState' : 6,
        'AgentWarning' : 7,
		'TeamsChanged' : 8,
		'ChatSpyMessage' : 10, 
		'EndBatch' : 99
    }, 
    commandCodes : 
    { 
        '0' : 'WaitForCall', 
        '1' : 'WaitForMail', 
        '2' : 'WaitForChat', 
        '3' : 'Pause', 
        '4' : 'ExtendWrapup', 
        '5' : 'RequestAssistance', 
        '6' : 'IdentifyCustomer', 
        '7' : 'Settopic', 
        '8' : 'StartScript', 
        '9' : 'LauchApplication', 
        '10' : 'TerminateContact', 
        '11' : 'VoiceHold', 
        '12' : 'VoiceRetrieve', 
        '13' : 'VoiceHangup', 
        '14' : 'VoiceNewCall', 
        '15' : 'VoiceTransfer', 
        '16' : 'VoiceForward', 
        '17' : 'VoicePickup', 
        '18' : 'VoiceConference', 
        '19' : 'VoiceRecord', 
        '20' : 'VoiceListen', 
        '21' : 'MailNewMail', 
        '22' : 'MailReply', 
        '23' : 'MailReplySender', 
        '24' : 'MailForward', 
        '25' : 'ChatNewCall', 
        '26' : 'ChatHold', 
        '27' : 'ChatRetrieve', 
        '28' : 'ChatHangup',
		'29' : 'PriorityPickup', 
		'31' : 'ChatSpy',
		'32' : 'SearchMode',
        '999 ' : 'Custom',

        'WaitForCall' : 0, 
        'WaitForMail' : 1, 
        'WaitForChat' : 2, 
        'Pause' : 3, 
        'ExtendWrapup' : 4, 
        'RequestAssistance' : 5, 
        'IdentifyCustomer' : 6, 
        'SetTopic' : 7, 
        'StartScript' : 8, 
        'LauchApplication' : 9, 
        'TerminateContact' : 10, 
        'VoiceHold' : 11, 
        'VoiceRetrieve' : 12, 
        'VoiceHangup' : 13, 
        'VoiceNewCall' : 14, 
        'VoiceTransfer' : 15, 
        'VoiceForward' : 16, 
        'VoicePickup' : 17, 
        'VoiceConference' : 18, 
        'VoiceRecord' : 19, 
        'VoiceListen' : 20, 
        'MailNewMail' : 21, 
        'MailReply' : 22, 
        'MailReplySender' : 23, 
        'MailForward' : 24, 
        'ChatNewCall' : 25, 
        'ChatHold' : 26, 
        'ChatRetrieve' : 27, 
        'ChatHangup' : 28, 
		'PriorityPickup' : 29,
		'ChatSpy' : 31,
		'SearchMode': 32,
        'Custom' : 999 
    },
	infoCodes:
	{
		'0': 'SystemStatus',
		'1': 'Qualifications',
		'2': 'PredefinedTexts',
		'3': 'Attachments',
		'4': 'AgentsInfo',
		'5': 'ContactProperty',
		'6': 'AgentSubState',
		'7': 'AgentProperty',
		'8': 'SupervisionData',
		'9': 'ContextData',
		
		'SystemStatus': 0,
		'Qualifications':1,
		'PredefinedTexts':2,
		'Attachments':3,
		'AgentsInfo':4,
		'ContactProperty':5,
		'AgentSubState':6,
		'AgentProperty':7,
		'SupervisionData':8,
		'ContextData':9
	}
};

var __activeClientLinks = new Object();

function ContactInfo(media, id)
{
	this.EMailInsertTextEvent = new MulticastDelegate();
	this.EMailAddTextEvent = new MulticastDelegate();
	this.EMailClearTextEvent = new MulticastDelegate();
	
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
	this.HistoryList = new ContactHistoryList();
	//this.History.BuildList("1=20080730;Tom Lanckman;Voice 1;Voice\r\n2=20080731;Olivier Lambert;Support mail;Mail");
	this.Subject = null;
	this.Body = null;
	this.DateTime = null;
	this.UserData = null;
	this.AgentId = null;
	this.AgentAccount = null;
	this.SessionId = null;

    this.UpdateScript = function()
	{
		var _Value;
		this.ScriptUrl = unescape(this.Script);

// TEMP: OLI
        var cookies = document.cookie.split(";");
        var sessionId = null;
        for(var i = 0; i < cookies.length; i++)
        {
            if(cookies[i].substring(0,32)=="contactroutehttpserversessionid=")
            {
                var sep = cookies[i].indexOf(";");
                if(sep > 0)
                    sessionId = cookies[i].substring(32,sep);
                else
                    sessionId = cookies[i].substring(32);
                break;
            }
        }
		////debugger;
		try{this.ContentLink = this.ContentLink.replace(/\/~\//ig, "/~" + sessionId + "/");}
		catch(e){ this.ContentLink = null;}
		
		this.ScriptUrl = this.ScriptUrl.replace("/~/", "/~" + sessionId + "/");
	
// TEMP: OLI
		this.ScriptUrl = this.ScriptUrl.replace("{0}", (this.Customer == null) ? '' : this.Customer);
		this.ScriptUrl = this.ScriptUrl.replace("{1}", (this.Id == null) ? '' : this.Id);
		try{ _Value = this.Activity.split('.'); } catch(e) {_Value = [this.Activity]; }
		this.ScriptUrl = this.ScriptUrl.replace("{2}", ( _Value[0] == null) ? '' : _Value[0]);
		this.ScriptUrl = this.ScriptUrl.replace("{3}", (this.From == null) ? '' : this.From);
		this.ScriptUrl = this.ScriptUrl.replace("{4}", (this.To == null) ? '' : this.To);
		this.ScriptUrl = this.ScriptUrl.replace("{5}", (this.AgentId == null) ? '' : this.AgentId);
		this.ScriptUrl = this.ScriptUrl.replace("{6}", (this.ContactListId == null) ? '' : this.ContactListId);	
		this.ScriptUrl = this.ScriptUrl.replace("{7}", (this.AgentAccount == null) ? '' : this.AgentAccount);
		this.ScriptUrl = this.ScriptUrl.replace("{8}", (this.SessionId == null) ? '' : this.SessionId);
		try{ _Value = this.Campaign.split('.'); } catch(e) {_Value = [this.Campaign]; }
		this.ScriptUrl = this.ScriptUrl.replace("{9}", (_Value[0] == null) ? '' : _Value[0]);
		this.ScriptUrl = this.ScriptUrl.replace("{10}", (this.UUI == null) ? '' : escape(this.UUI));
	}
	
    if(arguments.length == 1 && media.length > 1)
    {
        var parts = media.split('&');        
        for(var i = 0; i < parts.length; i++)
        {
            var sep = parts[i].indexOf('=');

            if(sep > 0)
            {
                var key = parts[i].substring(0, sep).toLowerCase();
                var value = parts[i].substring(sep + 1);

                if(key == 'id')
                    this.Id =  unescape(value);
                else if(key == 'media')
                    this.Media = unescape(value);
                else if(key == 'state')
                    this.State = unescape(value);
                else if(key == 'from')
                    this.From = unescape(value);
                else if(key == 'to')
                    this.To = unescape(value);
                else if(key == 'uui')
                    this.UUI = unescape(value);
                else if(key == 'queue')
                    this.Queue = unescape(value);
                else if(key == 'direction')
                    this.Direction = unescape(value);
                else if(key == 'context')
                    this.Context = unescape(value);
                else if(key == 'activity')
                    this.Activity = unescape(value);
                else if(key == 'customer') //Add Tom
                    this.Customer = unescape(value);
                else if(key == 'script') //Add tom
                    this.Script = unescape(value);
                else if(key == 'activity') //Add tom
                    this.Activity = unescape(value);
                else if(key == 'campaign') //Add tom
                    this.Campaign = unescape(value);
				else if(key == 'body') //Add tom
                    this.Script = unescape(value);
                else if(key == 'subject') //Add tom
                    this.Activity = unescape(value);
                else if(key == 'datetime')
                    this.DateTime = unescape(value);
				else if (key == 'contentlink') 
					this.ContentLink = unescape(value);
				else if (key == 'contactlistid') 
					this.ContactListId = unescape(value);													
			}
			//Add tom
			this.UpdateScript();			
        }
    }
    else
    {
        this.Id = id;
    	this.Media = media;
    }
	
	this.Update = function(newInfo)
	            {
		            var Updated = false;
                    var IsPreview = false;
                    try { IsPreview = this.State == 'P' ? true : false; } catch (e) {}

		            if (newInfo.From != null && newInfo.From != this.From)
		            {
			            this.From = newInfo.From;
			            Updated = true;
		            }

		            if (newInfo.To != null && newInfo.To != this.To)
		            {
			            this.To = newInfo.To;
			            Updated = true;
		            }

		            if (newInfo.UUI != null && newInfo.UUI != this.UUI)
		            {
			            this.UUI = newInfo.UUI;
			            Updated = true;
		            }

		            if (newInfo.Queue != null && newInfo.Queue != this.Queue)
		            {
			            this.Queue = newInfo.Queue;
			            Updated = true;
		            }

		            if (newInfo.Direction != null && newInfo.Direction != this.Direction)
		            {
			            this.Direction = newInfo.Direction;
			            Updated = true;
		            }

		            if (newInfo.Context != null && newInfo.Context != this.Context)
		            {
			            this.Context = newInfo.Context;
			            Updated = true;
		            }

		            if (newInfo.Customer != null && newInfo.Customer != this.Customer)
		            {
			            this.Customer = newInfo.Customer;
			            Updated = true;
		            }
					//Add tom
		            if (newInfo.Script != null && newInfo.Script != this.Script)
		            {
			            this.Script = newInfo.Script;
			            Updated = true;
		            }

                    if (newInfo.Activity != null && newInfo.Activity != this.Activity)
                    {
	                    if(!IsPreview)
	                    {
	                        this.Activity = newInfo.Activity;
	                        Updated = true;
	                    }              
                    }

                    if (newInfo.Campaign != null && newInfo.Campaign != this.Campaign)
                    {
	                    if(!IsPreview)
	                    {
	                        this.Campaign = newInfo.Campaign;
	                        Updated = true;
	                    }
                    }

					if (newInfo.Body != null && newInfo.Body != this.Body)
		            {
			            this.Body = newInfo.Body;
			            Updated = true;
		            }

		            if (newInfo.Subject != null && newInfo.Subject != this.Subject)
		            {
			            this.Subject = newInfo.Subject;
			            Updated = true;
		            }

		            if (newInfo.DateTime != null && newInfo.DateTime != this.DateTime)
		            {
			            this.DateTime = newInfo.DateTime;
			            Updated = true;
		            }
					
					if (newInfo.ContentLink != null && newInfo.ContentLink != this.ContentLink)
		            {
						this.ContentLink = newInfo.ContentLink;
						Updated = true;
		            }
					
		            if (newInfo.ContactListId != null && newInfo.ContactListId != this.ContactListId)
		            {
			            this.ContactListId = newInfo.ContactListId;
			            Updated = true;
		            }
					
					if(Updated) { this.UpdateScript(); }
									

		            return Updated;
	            };
}

function ContactsList(link)
{
    var internalList = new Object();
    
	this.clientLink = link;
	this.ActiveContactId = null;

    this.Add = function(contactInfo)
            {
                internalList['_' + contactInfo.Id] = contactInfo;
				internalList['_' + contactInfo.Id].AgentAccount = this.clientLink.UserAccount;
				internalList['_' + contactInfo.Id].SessionId = this.clientLink.connection.sessionId;
            };

    this.Remove = function(contactInfo)
            {
                if(internalList['_' + contactInfo.Id])
                    delete internalList['_' + contactInfo.Id];
                if(this.ActiveContactId == contactInfo.Id)
                    this.ActiveContactId = null;
            };

    this.Get = function(id)
            {
                return internalList['_' + id];
            };

	this.SetActiveContactId = function(contactId)
		    {
			    if(contactId != this.ActiveContactId)
                {
                    if(!contactId)
                    {
			            this.ActiveContactId = contactId;
			            this.clientLink.SetActiveContact(null);
                    }
                    else
                    {
                        var contactInfo = internalList['_' + contactId];
                        
                        if(contactInfo)
                        {
				            this.ActiveContactId = contactId;
				            this.clientLink.SetActiveContact(contactInfo);
				        }
				    }
			    }
		    };

	this.ActiveContact = function()
			{
			    if(this.ActiveContactId == null)
			        return null;

				return internalList['_' + this.ActiveContactId];
			};

    this.SetActiveContact = function(contactInfo)
		    {
		        var newId;
		        
		        if(!contactInfo)
		            newId = null;
		        else
		            newId = contactInfo.Id;
		            
		        if(newId != this.ActiveContactId)
		        {
		            this.ActiveContactId = newId;

				    this.clientLink.SetActiveContact(contactInfo);
			    }
		    };
}

function NixxisClientLink(sessionId, baseLocation)
{
    var connected = false;
    var myself = this;
	this.nixxisTestMsg = function (text) { alert("You request msg: " + text + ". Domein: " + document.domain); }
	this.UserAccount = "";
	this.UserName = "";
	this.Description = "";
	this.Extension = "";	
	this.AgentId = "";
	this.UserLastWarning = "";
	this.UserQueueStates = new Array();
	this.UserQueueStates[this.codes.agentQueueStates.HighPriorityContacts] = 0;
	this.UserQueueStates[this.codes.agentQueueStates.WaitingContacts] = 0;		
	this.SearchModeCampLst = new SearchModeCampaignList();
	this.PauseCodes = new PauseCodeList();
	this.TeamList = new TeamList();
			
    if(document.getElementById('tstDiv'))
        this.debugDiv = document.getElementById('tstDiv');
        
    this.connection = new Object();
    
    this.connection.clientLink = this;
    this.connection.connectionId = (new Date()).valueOf().toString();
    __activeClientLinks[this.connection.connectionId] = this;
    
    if(sessionId)
    {
        this.connection.sessionId = sessionId;
    }
    else
    {
        var cookies = document.cookie.split(";");
        
        for(var i = 0; i < cookies.length; i++)
        {
            if(cookies[i].substring(0,32)=="contactroutehttpserversessionid=")
            {
                var sep = cookies[i].indexOf(";");
                if(sep > 0)
                    this.connection.sessionId = cookies[i].substring(32,sep);
                else
                    this.connection.sessionId = cookies[i].substring(32);
                break;
            }
        }
    }
    
    if(baseLocation)
    {
        this.connection.baseLocation = baseLocation;
    }
    else
    {
        var xhreqloc = document.location.href.substring(0, document.location.href.lastIndexOf('/') + 1);
        
        if(this.connection.sessionId)
        {
            var pos = xhreqloc.indexOf("/", xhreqloc.indexOf("://") + 3);
        
            this.connection.baseLocation = xhreqloc.substring(0, pos) + '/~' + this.connection.sessionId + xhreqloc.substring(pos);
        }
        else
        {
            this.connection.baseLocation = xhreqloc;
        }
    }
    /*
    var testObject = null;
    
    if((window.XMLHttpRequest) && (testObject = (new XMLHttpRequest())))
    { 
        this.connection.newRequest = function() { return new XMLHttpRequest(); };
    }
//<!IS_BROWSER IE IE5 IE6 IE7>
    else if(window.ActiveXObject)
    { 
        var testNames = ['Msxml2.ServerXMLHTTP', 'Microsoft.ServerXMLHTTP', 'Msxml2.XMLHTTP.6.0', 'Msxml2.XMLHTTP.5.0', 'Msxml2.XMLHTTP.4.0', 'Msxml2.XMLHTTP.3.0', 'Msxml2.XMLHTTP', 'Microsoft.XMLHTTP']; 

        for(var i = 0; i < testNames.length; i++)
        {
            try
            {
                if((testObject = new ActiveXObject(testNames[i])))
                {
                    this.connection.newRequest = new Function('return new ActiveXObject("' + testNames[i] + '");');
                    break;
                }
            }
            catch(e)
            {
                ;
            }
        }
        
        testNames = null;
    }
//<!IS_BROWSER>

    if(testObject)
    { 
        if(this.debugDiv)
        {
            for(testElement in testObject)
                this.debugDiv.innerHTML = this.debugDiv.innerHTML + 'Member: ' + testElement + ' ' + typeof testObject[testElement] + '<br />';
        }
        
        testObject = null;
    } 
    else
    {
        this.connection.newRequest = function() { return null; };
    }
*/
    this.eventTarget = window;
    
    this.dispose = function() 
                                {
                                    this.disconnect();
                                    __activeClientLinks[this.connection.connectionId] = null;
                                }

    var processCommandResponse = function(response)
                                {
                                    if(response)
                                    {
                                        var responseLines = response.split('\r\n');

										// debugger;
										
                                        for(var i = 0; i < responseLines.length; i++)
                                        {
											if(this.debugDiv)
												this.debugDiv.innerHTML = this.debugDiv.innerHTML + '<br/> processCommandResponse: ' + responseLines[i];

                                            var sep = responseLines[i].indexOf('=');
                                            
                                            if(sep > 0)
                                            {
                                                var key = responseLines[i].substring(0, sep).toLowerCase();
                                                var value = responseLines[i].substring(sep + 1);

                                                if(key == 'account')
                                                    myself.UserAccount = value;
                                                if(key == 'name')
                                                    myself.UserName = value;
												if(key == 'description')
													myself.Description = value;
												if(key == 'extension')
                                                    myself.Extension = value;
												if(key == 'agentid')
													myself.AgentId = value;
                                                if(key == 'contact')
                                                {
                                                    var contactInfo = new ContactInfo(value);
                                                    
                                                    myself.Contacts.Add(contactInfo);
                                                }
                                                else if(key == 'activecontact')
                                                {
                                                    myself.Contacts.ActiveContactId = value;
                                                }
												if (key == 'actions')
												{
													var list = value.split(' ');
													for (var j = 0; j < list.length; j++)
													{
														var items = list[j].split(',');
														var commandName = myself.codes.commandCodes[items[0]];
														if(myself.commands[commandName])
                                                			myself.commands[commandName].setState((parseInt(items[1]) != 0), (parseInt(items[2]) != 0));
													}
												}
												if(key.substr(0,'searchmode_'.length) == 'searchmode_')
												{
													////debugger;
													myself.SearchModeCampLst.Add(value);
												}
												else if(key.substr(0,'pausecode_'.length) == 'pausecode_')
												{
													////debugger;
													myself.PauseCodes.Add(key, value);
												}
												else if(key.substr(0,'event'.length) == 'event')
												{
													var eventlist = value.split('&');
													////debugger;
													if(eventlist.length > 2)
													{
														var firstVal = eventlist[0];
														var eventid = eventlist[1];
														if (eventid == 8) 
														{
															var teamdata = unescape(eventlist[2]).split(',');
															
															var lenj = teamdata.length;
															myself.TeamList.SetToUpdate();
															for (var j = 0; j < lenj; j = j + 3) 
															{
																if ((j + 2) >= lenj) 
																	break;
																myself.TeamList.AddUpdate(teamdata[j], unescape(teamdata[j + 2]), teamdata[j + 1])
															}
															myself.TeamList.RemoveItemsNotUpdated();
														}
													}
												}
                                            }
                                        }
                                    }
                                }

    this.connect = function(userId, password, extension) 
                                {
                                    if(!connected)
                                    {
                                        processCommandResponse(this.connection.open());
                                        connected = true;
                                    }
                                    
                                    if(arguments.length < 3)
                                        extension = null;
                                        
                                    //processCommandResponse(this.connection.executeCommand('~login', '\\' + userId + ':' + password, extension));
                                    
                                };
    this.login = function(userId, password, extension) 
                                {
                                    if(!connected)
                                    {
                                        processCommandResponse(this.connection.open());
                                        connected = true;
                                    }
                                    
                                    if(arguments.length < 3)
                                        extension = null;
                                        
                                    processCommandResponse(this.connection.executeCommand('~login', '\\' + userId + ':' + password, extension));
                                    
                                };
    this.disconnect = function()
                                {
									// debugger;
					if(connected)
					{
	                                    // processCommandResponse(this.connection.executeCommand('~logout'));
										
										
										this.connection.links[1].open('GET', this.connection.baseLocation + '?action=~disconnect', true);
										this.connection.links[1].send(null);

        	                            this.connection.close();
                	                    connected = false;										
					}
					expireActiveCookies('contactroutehttpserversessionid');
                                };
    this.saveData = function(key, value)
                                {
					if(connected)
					{
					                    this.connection.executeCommand('~savedata', key, value);
					}
                                };
    this.loadData = function(key)
                                {
					if(connected)
					{
					                    return this.connection.executeCommand('~loaddata', key);
					}
                                };
    this.newGuid = function()
    {
		if(connected)
		{
			return this.connection.executeCommand('~newguid');
		}
		else
		{
			return '';
		}
    };
	this.setQualification = function(contactId, qualificationId, callbackDateTime, callbackPhone)
	{
		if(connected)
		{
			if (!contactId) return null;
			return this.connection.executeCommand('~setinfo',this.codes.infoCodes.Qualifications , contactId, qualificationId, callbackDateTime, callbackPhone);
		}
	};
	this.getQualifications = function(activityId)
	{
		if(connected)
		{
			if (!activityId) return null;
			return this.connection.executeCommand('~getinfo',this.codes.infoCodes.Qualifications , activityId);
		}
	};
	this.getContactHistory = function(contactid)
	{
		if(connected)
		{
			if (!contactid) 
				return null;
				
			return this.connection.executeCommand('~getinfo',this.codes.infoCodes.ContextData , contactid, 100);
		}
	};
	this.getContactHistory2 = function(contactlistid)
	{
		if(connected)
		{
			if (!contactlistid) 
				return null;
				
			var request;
			var response = "";
			try 
			{
				request = new XMLHttpRequest();
				request.open('GET', "http://" + window.location.host + "/data/?action=remotedata&source=recording&exec=GetContactHistory&timeout=120&@contactListId=s,7585e9ec251645f3b838bde12e404c4c&@campaignId=s,df5e75fa320e451bbf96162e96203d27&@xmlMode=b,1", false);
				request.send();
				response = request.responseText;
			}
			catch(e) {}
		}
	};
	this.getPredefinedTexts = function(activityId)
	{
		if(connected)
		{
			if (!activityId) return null;
			var list = new PreDefTextList(activityId);
			list.BuildList(this.connection.executeCommand('~getinfo',this.codes.infoCodes.PredefinedTexts , activityId, true));
			return  list;
		}
	};
	this.getAttachments = function(activityId)
	{
		if(connected)
		{
			if (!activityId) return null;
			var list = new AttachmentList(activityId);
			list.BuildList(this.connection.executeCommand('~getinfo',this.codes.infoCodes.Attachments , activityId));
			return  list;
		}
	};
	this.getAgentsInfo = function()
	{
		if(connected)
		{
			return this.connection.executeCommand('~getinfo',this.codes.infoCodes.AgentsInfo);
		}
	};
	this.getAgendaByContact = function(contactId, dateTime, area)
	{
		if(connected)
		{
			if (!contactId) return null;
			return this.connection.executeCommand('getagendabycontact',contactId, dateTime, area);
		}
	};
	
	this.executeCommand = function()
	{
		if(connected)
		{			
			return this.connection.executeCommand.apply(this.connection, arguments);
		}		
	}
	this.storeAppointmentByContact = function(contactId, dateTime, duration, description, area)
	{
		if(connected)
		{
			if (!contactId) 
				return null;
			if (!description || description == '') 
				description = '-';
			
			return this.connection.executeCommand('StoreAppointmentByContact',contactId, dateTime, duration, description, area);
		}
	};
	this.cancelAppointmentByContact = function(contactId, appId)
	{
		if(connected)
		{
			if (!contactId) return null;
			return this.connection.executeCommand('CancelAppointmentByContact',contactId, appId);
		}
	};
	
	this.setContactProperty = function(contactId, propertyId, propertyValue)
	{
		if(connected)
		{
			if (!contactId) return null;
			return this.connection.executeCommand('~setinfo',this.codes.infoCodes.ContactProperty , contactId, propertyId, propertyValue);
		}
	};

	this.setActivateTeam = function(teamid, active)
	{
		if(connected)
		{
			if (!teamid) return null;
			return this.connection.executeCommand('~activateteam', null , teamid, active ? 1 : 0);
		}
	};	
    NixxisCreateConnection(this);
    NixxisCreateCommands(this);

    this.Contacts = new ContactsList(this);
    
    this.SetActiveContact = function(contactInfo)
                                {
                                    var newId = null;
                                    
                                    if(!contactInfo)
                                    {
                                        if(null != this.Contacts.ActiveContactId)
                                        {
                                            this.Contacts.ActiveContactId = null;
                                            newId = '';
                                        }
                                    }
                                    else
                                    {
                                        if(contactInfo.Id != this.Contacts.ActiveContactId)
                                        {
                                            this.Contacts.ActiveContactId = contactInfo.Id;
                                            newId = contactInfo.Id;
                                        }
                                    }
                                     
                                    if(newId)   
                                        this.connection.executeCommand('~activecontact', newId);
                                };

    this.TerminateContact = function(contactInfo)
                                {
                                    if(contactInfo)
                                    {
	                                    return this.connection.executeCommand(this.codes.commandCodes.TerminateContact, contactInfo.Id);
                                    }
                                };

    this.processEvent = function(values)
                                {
									// debugger;
									
                                	//if (this.debugDiv) 
									//{
										//this.debugDiv.innerHTML = this.debugDiv.innerHTML + '<br/> Eventid: ' + values[0];
										//this.debugDiv.innerHTML = this.debugDiv.innerHTML + '<br/> EventData: ' + values[1];
									//}
																			
                                    switch(parseInt(values[0]))
                                    {										
                                        case 0: // CommandState
                                            var params = values[1].split(',');
                                            var commandName = this.codes.commandCodes[params[0]];

                                        	if (this.debugDiv) 
											{
												for (var i = 0; i < values.length; i++)
												{
													this.debugDiv.innerHTML = this.debugDiv.innerHTML + '&nbsp; <br/> CommandState: I=' + i + ". " + commandName + '. ' + values[i] + ". Lengte: " + values.length;
												}
											}
											
                                            while(params.length < 3) params.push('0');
                                           
                                            if(this.commands[commandName])
                                                this.commands[commandName].setState((parseInt(params[1]) != 0), (parseInt(params[2]) != 0));
                                            break;
                                            
                                        case 2: // ContactData
                                        	//alert(values[1]);
											////debugger;
                                            var params = values[1].split('&');
                                            var contactInfo = new ContactInfo('V', '');
                                            
                                            for(i = 0; i < params.length; i++)
                                            {
                                                var sep = params[i].indexOf('=');
                                                
                                                if(sep > 0)
                                                {
                                                    var key = params[i].substring(0, sep).toLowerCase();
                                                    var value = params[i].substring(sep + 1);
                                                    var member;
                                                    
                                                    for(member in contactInfo)
                                                    {
                                                        if(member.toLowerCase() == key)
                                                        {
                                                            contactInfo[member] = unescape(value); //Tom
                                                            break;
                                                        }
                                                    }
                                                }
                                            }
											
											// Added oli!
											contactInfo.AgentId = this.AgentId;
                                            contactInfo.AgentAccount = this.UserAccount;
											contactInfo.SessionId = this.connection.sessionId;
											contactInfo.UpdateScript();
                                            var oldInfo = this.Contacts.Get(contactInfo.Id);
                                            
                                            if(!oldInfo)
                                            {
                                                this.Contacts.Add(contactInfo);
                                                
                                                try
                                                {
                                                    this.ContactAdded.Invoke(contactInfo);
                                                }
                                                catch(e)
                                                {
                                                    ;
                                                }
                                            }
                                            else
                                            {
                                                if(oldInfo.Update(contactInfo))
                                                {
                                                    try
                                                    {
                                                        this.ContactChanged.Invoke(oldInfo);
                                                    }
                                                    catch(e)
                                                    {
                                                        ;
                                                    }
                                                }
                                            }
                                            break;
                                            
                                        case 3: // ContactState
                                            var params = values[1].split(',');
                                            var contactInfo = this.Contacts.Get(params[0]);
                                            
                                            if(contactInfo)
                                            {
                                                if(params[1] != contactInfo.State)
                                                {
                                                    contactInfo.State = params[1];
                                                    
                                                    if(contactInfo.State != 'X')
                                                    {
                                                        try
                                                        {
                                                            this.ContactStateChanged.Invoke(contactInfo);
                                                        }
                                                        catch(e)
                                                        {
                                                            ;
                                                        }
                                                    }
                                                    else
                                                    {
                                                        this.Contacts.Remove(contactInfo);
                                                        
                                                        try
                                                        {
                                                            this.ContactRemoved.Invoke(contactInfo);
                                                        }
                                                        catch(e)
                                                        {
                                                            ;
                                                        }
                                                    }
                                                }
                                            }
                                            break;
                                            
                                        case 4: // SupervisionData
                                            try
                                            {
                                                this.SupervisionData.Invoke(values[1].split(','));
                                            }
                                            catch(e)
                                            {
                                            	if(this.debugDiv && this.debugDiv.crError)
                                                	this.debugDiv.innerHTML = this.debugDiv.innerHTML + '&nbsp; <br/>  SupervisionData error: ' + e.toString();

                                            }
                                            break;
                                            
                                        case 5: // SupervisionItem
                                            try
                                            {
                                                this.SupervisionItem.Invoke(values[1].split(','));
                                            }
                                            catch(e)
                                            {
                                            	if(this.debugDiv && this.debugDiv.crError)
                                                	this.debugDiv.innerHTML = this.debugDiv.innerHTML + '<br/> SupervisionItem error: ' + e.toString();

                                            }
                                            break;
										case 6: //AgentQueueState
											try
											{
												try{this.UserQueueStates = values[1].split(',');}
												catch(e){;}
										 		this.AgentQueueState.Invoke(values[1].split(','));	
											}
                                            catch(e)
                                            {
                                                if(this.debugDiv && this.debugDiv.crError)
                                                    this.debugDiv.innerHTML = this.debugDiv.innerHTML + '<br/> AgentQueueState error: ' + e.toString();

                                            }
										  break;
                                        case 7: //AgentWarning	
                                        	//this.debugDiv.innerHTML = this.debugDiv.innerHTML + '<br/> AgentWarning: ' + values;										
											try
											{
												this.UserLastWarning = values[1].split(',');
										 		this.AgentWarning.Invoke(values[1].split(','));	
											}
                                            catch(e)
                                            {
                                                if(this.debugDiv && this.debugDiv.crError)
                                                    this.debugDiv.innerHTML = this.debugDiv.innerHTML + '<br/> AgentWarning error: ' + e.toString();

                                            }
                                          	break;
                                        case 8: //TeamsChanged	
                                        	//this.debugDiv.innerHTML = this.debugDiv.innerHTML + '<br/> AgentWarning: ' + values;										
											try
											{
												if(this.debugDiv)
													this.debugDiv.innerHTML = this.debugDiv.innerHTML + '<br/> TeamsChanged: ' + values;
												
												////debugger;
												
												var eventid = values[0];
												var teamdata = unescape(values[1]).split(',');
												
												var lenj = teamdata.length;
												myself.TeamList.SetToUpdate();
												for (var j = 0; j < lenj; j = j + 3) 
												{
													if ((j + 2) >= lenj) break;
													myself.TeamList.AddUpdate(teamdata[j], unescape(teamdata[j + 2]), teamdata[j + 1])
												}
												myself.TeamList.RemoveItemsNotUpdated();
											}
                                            catch(e)
                                            {
                                                if(this.debugDiv && this.debugDiv.crError)
                                                    this.debugDiv.innerHTML = this.debugDiv.innerHTML + '<br/> TeamsChanged error: ' + e.toString();

                                            }
                                          	break;											
										case 10: //ChatSpyMessage 
                                            if(this.debugDiv && this.debugDiv.crChatSpy)
                                            	this.debugDiv.innerHTML = this.debugDiv.innerHTML + '<br/> ChatSpyMessage msg: ' + values[1].split(',');								
											try
											{
												this.ChatSpyMessage.Invoke(values[1].split(','));
											}
                                            catch(e)
                                            {
                                                if(this.debugDiv)
                                                    this.debugDiv.innerHTML = this.debugDiv.innerHTML + '<br/> ChatSpyMessage error: ' + e.toString();

                                            }
                                          	break;										
										case 99: //End Batch
											try
											{
										 		this.EndBatch.Invoke(values[1].split(','));	
											}
                                            catch(e)
                                            {
                                                if(this.debugDiv && this.debugDiv.crError)
                                                    this.debugDiv.innerHTML = this.debugDiv.innerHTML + '<br/> EndBatch error: ' + e.toString();

                                            }										
											break;
                                    }
                                };
                                
    this.ContactAdded = new MulticastDelegate();
    this.ContactChanged = new MulticastDelegate();
    this.ContactRemoved = new MulticastDelegate();
    this.ContactStateChanged = new MulticastDelegate();
    this.SupervisionData = new MulticastDelegate();
    this.SupervisionItem = new MulticastDelegate();
	this.AgentQueueState = new MulticastDelegate();
	this.AgentWarning = new MulticastDelegate();
	this.EndBatch = new MulticastDelegate();
	this.ChatSpyMessage = new MulticastDelegate();

	this.commands.WaitForCall = new this.commands.newCommand(this, this.codes.commandCodes.WaitForCall, function()	
	                            {
									// debugger;

	                                if(this.authorized)
	                                {
	                                    if(arguments.length == 0 || this.active != arguments[0])
	                                    {
	                                        if(this.active && !this.clientLink.commands.WaitForMail.active && !this.clientLink.commands.WaitForChat.active)
	                                        {
	                                        	// return this.clientLink.commands.Pause.execute();
	                                        }
	                                        else
	                                        {
		                                        return this.clientLink.connection.executeCommand(this.commandCode);
											}
	                                    }
	                                }
	                                
	                                return null;
	                            });
	this.commands.WaitForMail = new this.commands.newCommand(this, this.codes.commandCodes.WaitForMail, function()	
	                            {
	                                if(this.authorized)
	                                {
	                                    if(arguments.length == 0 || this.active != arguments[0])
	                                    {
	                                        if(this.active && !this.clientLink.commands.WaitForCall.active && !this.clientLink.commands.WaitForChat.active)
	                                        {
	                                        	return this.clientLink.commands.Pause.execute();
	                                        }
	                                        else
	                                        {
	                                        	return this.clientLink.connection.executeCommand(this.commandCode);
	                                        }
	                                    }
	                                }
	                                
	                                return null;
	                            });
	this.commands.WaitForChat = new this.commands.newCommand(this, this.codes.commandCodes.WaitForChat, function()	
	                            {
	                                if(this.authorized)
	                                {
	                                    if(arguments.length == 0 || this.active != arguments[0])
	                                    {
	                                        if(this.active && !this.clientLink.commands.WaitForCall.active && !this.clientLink.commands.WaitForMail.active)
	                                        {
	                                        	return this.clientLink.commands.Pause.execute();
	                                        }
	                                        else
	                                        {
	                                        	return this.clientLink.connection.executeCommand(this.commandCode);
											}
	                                    }
	                                }
	                                
	                                return null;
	                            });	
	this.commands.Pause = new this.commands.newCommand(this, this.codes.commandCodes.Pause, function()	
		                            {
										// debugger;

										// return this.clientLink.connection.executeCommand(this.commandCode);

	                                //if(this.authorized)
	                                //{
	                                    if(arguments.length == 0)
	                                    {											
											if (myself.PauseCodes.Count() > 0) 
											{
												try{crPauseCodePanel.Show(myself.PauseCodes);} catch(e){}
											}
											else 
											{
												return this.clientLink.connection.executeCommand(this.commandCode);
											}
	                                    }
										else if (arguments.length == 1)
										{
											return this.clientLink.connection.executeCommand(this.commandCode, arguments[0]);
										}
	                                //}
	                                
	                                return null;
	                            });					
	this.commands.ExtendWrapup = new this.commands.newCommand(this, this.codes.commandCodes.ExtendWrapup);		
	this.commands.RequestAssistance = new this.commands.newCommand(this, this.codes.commandCodes.RequestAssistance, function()
	{
		// debugger;
		this.clientLink.connection.executeCommand(this.commandCode);
		

		// this.clientLink.connection.links[1].open('GET', this.clientLink.connection.baseLocation + '?action=requestassistance', false);
		// this.clientLink.connection.links[1].open('GET', "http://" + window.location.host +  "/agent/?action=requestassistance", true);
		// this.clientLink.connection.links[1].send(null);
		

		// var request;
		// var response = "";
		// try 
		// {
		// 	request = new XMLHttpRequest();			
		// 	request.open('GET', "http://" + window.location.host + "/agent/?action=requestassistance",true);
			
		// 	request.send();
		// 	response = request.responseText;
		// }
		// catch(e) {}
	});
//	this.commands.VoiceNewCall = new this.commands.newCommand(this, this.codes.commandCodes.VoiceNewCall);		
	
	// this.commands.VoiceHold = new this.commands.newCommand(this, this.codes.commandCodes.VoiceHold);
	this.commands.VoiceHold = new this.commands.newCommand(this, this.codes.commandCodes.VoiceHold, function() 
	{
		addElementClass($("ExtendWrapup"),'active');
		// removeElementClass($("VoiceHold"),'active');
		this.clientLink.connection.executeCommand(this.commandCode);
	});

	
	// this.commands.VoiceRetrieve = new this.commands.newCommand(this, this.codes.commandCodes.VoiceRetrieve);		
	this.commands.VoiceRetrieve = new this.commands.newCommand(this, this.codes.commandCodes.VoiceRetrieve, function() 
	{
		addElementClass($("ExtendWrapup"),'active');
		removeElementClass($("VoiceRetrieve"),'active');
		removeElementClass($("VoiceHold"),'active');
		this.clientLink.connection.executeCommand(this.commandCode);
	});		
	
	// this.commands.VoiceTransfer = new this.commands.newCommand(this, this.codes.commandCodes.VoiceTransfer);
	this.commands.VoiceTransfer = new this.commands.newCommand(this, this.codes.commandCodes.VoiceTransfer, function() 
	{
		addElementClass($("ExtendWrapup"),'active');
		removeElementClass($("VoiceTransfer"),'active');
		this.clientLink.connection.executeCommand(this.commandCode);
	});
	
	
	//this.commands.VoiceForward = new this.commands.newCommand(this, this.codes.commandCodes.VoiceForward);
	
	// this.commands.VoiceConference = new this.commands.newCommand(this, this.codes.commandCodes.VoiceConference);
	this.commands.VoiceConference = new this.commands.newCommand(this, this.codes.commandCodes.VoiceConference, function() 
	{		
		addElementClass($("ExtendWrapup"),'active');
		// removeElementClass($("VoiceConference"),'active');
		this.clientLink.connection.executeCommand(this.commandCode);
	});	
	
	
	// this.commands.VoiceHangup = new this.commands.newCommand(this, this.codes.commandCodes.VoiceHangup);
	this.commands.VoiceHangup = new this.commands.newCommand(this, this.codes.commandCodes.VoiceHangup, function() 
	{		
		addElementClass($("ExtendWrapup"),'active');
		// removeElementClass($("VoiceHangup"),'active');
		this.clientLink.connection.executeCommand(this.commandCode);
	});	


	this.commands.VoiceRecord = new this.commands.newCommand(this, this.codes.commandCodes.VoiceRecord, function() 
                                {
									if(this.authorized)
                                    {
										VoiceRecordSetStartStop();
                            			this.clientLink.connection.executeCommand(this.commandCode, arguments[0], (this.active) ? 'False' : 'True');
                                    }
                                    return null;
                                });               
	this.commands.ChatSpy   = new this.commands.newCommand(this, this.codes.commandCodes.ChatSpy, function() 
                                {
									if(this.clientLink.debugDiv && this.clientLink.debugDiv.crChatSpy)
                                    	this.clientLink.debugDiv.innerHTML = this.clientLink.debugDiv.innerHTML + '<br/> ChatSpy authorized: ' + this.authorized + '. Arg count: ' + arguments.length;											

									if(this.authorized)
                                    {
	                                    if (arguments.length > 1 ) 
										{
											if(this.clientLink.debugDiv && this.clientLink.debugDiv.crChatSpy)
                                            	this.clientLink.debugDiv.innerHTML = this.clientLink.debugDiv.innerHTML + '<br/> ChatSpy Arg 0: ' + arguments[0] + '. Arg 1: ' + arguments[1];											
											
											this.clientLink.connection.executeCommand(this.commandCode, arguments[0], arguments[1]);
										}
                                    }
                                    return null;
                                }); 
	this.commands.SearchMode   = new this.commands.newCommand(this, this.codes.commandCodes.SearchMode, function() 
                                {
									

									if(this.clientLink.debugDiv && this.clientLink.debugDiv.crChatSpy)
                                    	this.clientLink.debugDiv.innerHTML = this.clientLink.debugDiv.innerHTML + '<br/> SearchMode authorized: ' + this.authorized + '. Arg count: ' + arguments.length;											

									if(this.authorized)
                                    {
	                                    if (arguments.length > 0 ) 
										{											
											this.clientLink.connection.executeCommand(this.commandCode, arguments[0]);
										}
                                    }
                                    return null;
                                }); 
	this.commands.VoiceListen = new this.commands.newCommand(this, this.codes.commandCodes.VoiceListen);		
	this.commands.MailNewMail = new this.commands.newCommand(this, this.codes.commandCodes.MailNewMail);
	this.commands.MailReply = new this.commands.newCommand(this, this.codes.commandCodes.MailReply);			
	this.commands.MailReplySender = new this.commands.newCommand(this, this.codes.commandCodes.MailReplySender);	
	this.commands.MailForward = new this.commands.newCommand(this, this.codes.commandCodes.MailForward, function()
								{
									if (this.authorized) 
									{
										////debugger;
										if (arguments.length > 2) 
										
										{
											this.beforeOnClick.Invoke();
											this.clientLink.connection.executeCommand(this.commandCode, arguments[0], arguments[1], arguments[2], arguments[3]);
										}
										else 
										{
											crMailForDlg.Show(this.clientLink.connection.connectionId, "MailForward", myself, this.clientLink.Contacts.ActiveContactId);
										}
									}
	                                return null;
								});		
	this.commands.ChatNewCall = new this.commands.newCommand(this, this.codes.commandCodes.ChatNewCall);		
	this.commands.ChatHold = new this.commands.newCommand(this, this.codes.commandCodes.ChatHold);			
	this.commands.ChatRetrieve = new this.commands.newCommand(this, this.codes.commandCodes.ChatRetrieve);		
	this.commands.ChatHangup = new this.commands.newCommand(this, this.codes.commandCodes.ChatHangup);		
	this.commands.PriorityPickup = new this.commands.newCommand(this, this.codes.commandCodes.PriorityPickup);
	this.commands.TerminateContact = new this.commands.newCommand(this, this.codes.commandCodes.TerminateContact, function()
	                            {
	                                if(this.authorized && this.clientLink.Contacts.ActiveContactId)
	                                {
	                                    return this.clientLink.connection.executeCommand(this.commandCode, this.clientLink.Contacts.ActiveContactId);
	                                }
	                                
	                                return null;
	                            });
	this.commands.VoiceForward = new this.commands.newCommand(this, this.codes.commandCodes.VoiceForward, function() 
	                            {
	                                if(this.authorized)
	                                {
										addElementClass($("ExtendWrapup"),'active');
										removeElementClass($("VoiceForward"),'active');
	                                    if(arguments.length > 0)
	                                    {
	                                        //window.alert(arguments[0]);
	                                        this.clientLink.connection.executeCommand(this.commandCode, arguments[0]);
	                                    }
	                                    else
	                                    {
	                                        //window.open(this.clientLink.newCallDialog + '?link=' + this.clientLink.connection.connectionId + '&cmd=VoiceNewCall', 'NewVoiceCall', 'height=200,width=400,dependent=1,toolbar=0,menubar=0,scrollbars=0,resizable=0,location=0,directories=0,status=0,dialog=1');
											crNewCallDialog.Call(this.clientLink.connection.connectionId, "VoiceForward", myself);
	                                    }
	                                }

	                                return null;
	                            });		
	this.commands.VoiceNewCall = new this.commands.newCommand(this, this.codes.commandCodes.VoiceNewCall, function() 
	                            {
	                                if(this.authorized)
	                                {
										if(arguments.length == 1)
	                                    {
	                                        //window.alert(arguments[0]);
	                                        this.clientLink.connection.executeCommand(this.commandCode, arguments[0]);
	                                    }
	                                    else if(arguments.length > 3)
	                                    {
	                                        //window.alert(arguments[0]);
	                                        this.clientLink.connection.executeCommand(this.commandCode, arguments[0], arguments[1], arguments[2], arguments[3]);
	                                    }
	                                    else
	                                    {
	                                        //window.open(this.clientLink.newCallDialog + '?link=' + this.clientLink.connection.connectionId + '&cmd=VoiceNewCall', 'NewVoiceCall', 'height=200,width=400,dependent=1,toolbar=0,menubar=0,scrollbars=0,resizable=0,location=0,directories=0,status=0,dialog=1');
											var _contactInfo = this.clientLink.Contacts.Get(this.clientLink.Contacts.ActiveContactId);
											if (_contactInfo) {
												if (_contactInfo.__AgentAction == "P") 
													crNewCallDialog.crNumToCall = _contactInfo.To;
											}
											crNewCallDialog.Call(this.clientLink.connection.connectionId, "VoiceNewCall", myself);
	                                    }
	                                }

	                                return null;
	                            });		
	
	this.linkToolStrip = function(toolStrip)
                                {
									//debugger;
                                    for(var i = 0; i < toolStrip.childNodes.length; i++)
                                    {
                                        if(toolStrip.childNodes[i].className)
                                        {
											//debugger;
                                            if(toolStrip.childNodes[i].className == "NixxisButton")
                                            {
                                                var cmdName = toolStrip.childNodes[i].id;

                                                if(this.commands[cmdName])
                                                {
                                                    this.commands[cmdName].linkItem(toolStrip.childNodes[i]);
                                                    this.commands[cmdName].setState(this.commands[cmdName].authorized, this.commands[cmdName].active, true);
                                                }
                                                
/*
                                                toolStrip.childNodes[i].onmousedown = function() { addElementClass(this, 'Pressed');
//<!IS_BROWSER IE5 IE6 IE7>
                                                                                    this.setCapture(); 
//<!IS_BROWSER>
                                                                                };
                                                toolStrip.childNodes[i].onmouseup = function() { removeElementClass(this, 'Pressed'); 
//<!IS_BROWSER IE5 IE6 IE7>
                                                                                    this.releaseCapture(); 
//<!IS_BROWSER>
                                                                                };
*/
                                            }
                                        }
                                    
                                        this.linkToolStrip(toolStrip.childNodes[i]);
                                    }
                                };


	this.linkToolStrip_V3 = function(toolStrip)
	{
		// debugger;
		for(var i = 0; i < toolStrip.childNodes.length; i++)
		{
			if(toolStrip.childNodes[i].className)
			{
				// debugger;

				var elementParent = toolStrip.childNodes[i];
				
				for(var j = 0; j < elementParent.childNodes.length; j++)
				{
					var elementChild = elementParent.childNodes[j];

					for(var k = 0; k < elementChild.childNodes.length; k++)
					{
						var currentnode = elementChild.childNodes[k];
						if(currentnode.className == "NixxisButton")
						{
							// debugger;

							var currentnodeParent = getDIVParentForNixxisButton(currentnode);
	
							var cmdName = currentnode.id;
		
							if(this.commands[cmdName])
							{
								// this.commands[cmdName].linkItem(currentnode);
								this.commands[cmdName].linkItem(currentnodeParent);
								this.commands[cmdName].setState(this.commands[cmdName].authorized, this.commands[cmdName].active, true);
							}
						}

						// this.linkToolStrip(toolStrip.childNodes[i]);
					}					
				}				
			}			
		}
	};
                                
    this.newCallDialog = 'newvoicecall.html';
	//New
	this.ChatReceivedMsg = new MulticastDelegate();
	this.ChatSendMsg = function (msg)
	{
		alert(msg);
	};
	this.ContactTopLabelChange = new MulticastDelegate();
	this.SetContactTopLabel = function(contactId, text)
		{
			if (!contactId) return;
			try
			{this.ContactTopLabelChange.Invoke(this.Contacts.Get(contactId), text);}
			catch(e)
			{;}
		};
	this.ContactBottomLabelChange = new MulticastDelegate();
	this.SetContactBottomLabel = function(contactId, text)
		{
			if (!contactId) return;
			try
			{this.ContactBottomLabelChange.Invoke(this.Contacts.Get(contactId), text);}
			catch(e)
			{;}
		};
	this.ContactRequestAction = new MulticastDelegate();
	this.SetContactRequestAction = function(contactId)
		{
			if (!contactId) return;
			try
			{this.ContactRequestAction.Invoke(this.Contacts.Get(contactId));}
			catch(e)
			{;}		
		};
}
//
//Qualification
//
function BaseQualificationItem(parameters)
{
	this.Id 				= parameters._Id;
	this.Parent 			= typeof parameters._Parent != 'undefined' ? parameters._Parent : null;
	this.Description 		= typeof parameters._Description != 'undefined' ? parameters._Description : null;
	this.DisplayOrder 		= typeof parameters._DisplayOrder != 'undefined' ? parameters._DisplayOrder : null;
	this.Argued 			= typeof parameters._Argued != 'undefined' ? parameters._Argued : null;
	this.Positive 			= typeof parameters._Positive != 'undefined' ? parameters._Positive : null;
	this.PositiveUpdatable	= typeof parameters._PositiveUpdatable != 'undefined' ? parameters._PositiveUpdatable : null;
	this.Action 			= typeof parameters._Action != 'undefined' ? parameters._Action : null;
	this.Children 			= new BaseQualificationList();
}
function BaseQualificationList()
{
	this.Items = new Array();
	
	this.Add = function(qualItem)
	{
		this.Items['_' + qualItem.Id] = qualItem;
	}
	
	this.Remove = function(qualItem)
	{
		if(this.Items['_' + qualItem.Id])
			delete this.Items['_' + qualItem.Id];
	}
	
	this.Get = function(qualItemdId)
	{
		if(this.Items['_' + qualItemdId])
			return this.Items['_' + qualItemdId];
	}

	this.Count = function()
	{
		var c = 0;
		
		for(key in this.Items)
		{
			c++;
		}
		
		return c;
	};
}

function QualActivityInfo(parameters)
{
	this.Id				= parameters._Id;
	this.Revision		= typeof parameters._Revision != 'undefined' ? parameters._Revision : null;
	this.QualificationId= typeof parameters._QualificationId != 'undefined' ? parameters._QualificationId : null;
}
function QualActivityInfoList()
{
	var items = new Array();
	
	this.Add = function(QualActivityInfo)	
	{
		items['_' + QualActivityInfo.Id] = QualActivityInfo;
	};
	
	this.Remove = function(activityId)
	{
		if(items['_' + activityId])
			delete items['_' + activityId];
	};
	
	this.Get = function(activityId)
	{
		if(items['_' + activityId])
			return items['_' + activityId];
		else
			return null;
	};
}
function QualificationInfo(link)
{
	this.BaseQualifications = new BaseQualificationList();
	this.ActivityReferences = new QualActivityInfoList();
	this.ClientLink = link;
	
	this.GetQualificationForId = function(qualItemdId)
	{
		var returnValue = BaseQualifications.Get(qualItemdId);
	};
	
	this.FromActivityId = function(activityId)
	{
		this.processQualificationResponse(activityId);
		
		return this.BaseQualifications.Get(this.ActivityReferences.Get(activityId).QualificationId);
	};
	
	this.processQualificationResponse = function(activityId)
	{
		var response = this.ClientLink.getQualifications(activityId);
		var rootEl = null;
		var rawList = new BaseQualificationList();
		if(response)
		{
			var qualItems = response.split('\r\n');
			for(var i = 0;i < qualItems.length; i++)
			{
				var sep = qualItems[i].indexOf('=');
				
				if(sep > 0)
                {
                	var key = qualItems[i].substring(0, sep).toLowerCase();
                    var value = qualItems[i].substring(sep + 1);

					if(key.toLowerCase() == "activityqualification")
					{
						var argu = value.split(';');
						
						activity = new QualActivityInfo({_Id : argu[0]});
						
						if (argu.length >1)
							activity.QualificationId = argu[1];
						else
							activity.QualificationId = null;
							
						if (argu.length >2)
							activity.Revision = parseInt(argu[2]);
						else
							activity.Revision = 0;
							
						this.ActivityReferences.Add(activity); 
					}
					else if (key.substring(0, 1) == "_")
					{
						var argu = value.split(';');
						
						var qualItem = new BaseQualificationItem(
						{
							_Id : key.substring(1),
							_Description : unescape(argu[9]),
							_Parent : argu[1],
							_DisplayOrder : parseInt(argu[0]),
							_Argued : (parseInt(argu[2]) > 0),
							_Positive : parseInt(argu[3]),
							_PositiveUpdatable : (parseInt(argu[4]) > 0),
							_Action : parseInt(argu[5])
						});
						if(!qualItem.Parent) rootEl = qualItem;
						rawList.Add(qualItem);
					}
				}
			}
			if (rawList.Count() < 1) return null;
			if (!rootEl) return null;
			
			rootEl.Children = this.FillBranch(rawList, rootEl);
			this.BaseQualifications.Add(rootEl);
		}
	};
	
	this.FillBranch = function(rawlist, parent)
	{
		var newList = new BaseQualificationList();
		for(key in rawlist.Items)
		{
			if(rawlist.Items[key].Parent == parent.Id)
				newList.Add(rawlist.Items[key]);
		}
		
		for (newKey in newList.Items)
		{
			newList.Items[newKey].Children = this.FillBranch(rawlist, newList.Items[newKey]);
		}
		
		return newList;
	};
}
//
//PreDef text
//
function PreDefTextItem(parameters)
{
	this.Id 			= parameters._Id;
	this.Description 	= typeof parameters._Description != 'undefined' ? parameters._Description : null;
	this.Text			= typeof parameters._Text != 'undefined' ? parameters._Text : null;
}
function PreDefTextList(activityId)
{
	this.Items = new Array();
	this.ActivityId = activityId;
	
	this.BuildList = function(rawData)
	{
		var items = rawData.split('\r\n');
		for (var i = 0; i < items.length; i++) 
		{
			sep = items[i].indexOf('=');
					
			if (sep > 0) 
			{
				var key = items[i].substring(0, sep).toLowerCase();
				var value = items[i].substring(sep + 1);
				var argu = value.split('&');
				var predefItem = new PreDefTextItem(
				{
					_Id : key,
					_Description : unescape(argu[0]),
					_Text : unescape(argu[1])
				});
				this.Add(predefItem);
			}
		}
	};
	
	this.Add = function(predefItem)
	{
		this.Items['_' + predefItem.Id] = predefItem;
	};
	
	this.Remove = function(predefItem)
	{
		if(this.Items['_' + predefItem.Id])
			delete this.Items['_' + predefItem.Id];
	};
	
	this.Get = function(predefItemId)
	{
		if(this.Items['_' + predefItemId])
			return this.Items['_' + predefItemId];
	};

	this.Count = function()
	{
		var c = 0;
		
		for(key in this.Items)
		{
			c++;
		}
		
		return c;
	};
}

function AttachmentItem(parameters)
{
	this.Id 			= parameters._Id;
	this.Description 	= typeof parameters._Description != 'undefined' ? parameters._Description : null;
}
function AttachmentList(activityId)
{
	this.Items = new Array();
	this.ActivityId = activityId;
	
	this.BuildList = function(rawData)
	{
		var items = rawData.split('\r\n');
		for (var i = 0; i < items.length; i++) 
		{
			sep = items[i].indexOf('=');
					
			if (sep > 0) 
			{
				var key = items[i].substring(0, sep).toLowerCase();
				var value = items[i].substring(sep + 1);
				var argu = value.split('&');
				var attItem = new AttachmentItem(
				{
					_Id : key,
					_Description : unescape(argu[0])
				});
				this.Add(attItem);
			}
		}
	};
	
	this.Add = function(attItem)
	{
		this.Items['_' + attItem.Id] = attItem;
	};
	
	this.Remove = function(attItem)
	{
		if(this.Items['_' + attItem.Id])
			delete this.Items['_' + attItem.Id];
	};
	
	this.Get = function(attItemId)
	{
		if(this.Items['_' + attItemId])
			return this.Items['_' + attItemId];
	};

	this.Count = function()
	{
		var c = 0;
		
		for(key in this.Items)
		{
			c++;
		}
		
		return c;
	};
}
//
//Searchmode
//
function SearchModeCampaignList()
{
	this.Children = new Array();
	
	this.Add = function(rawdata)	
	{
		var list = rawdata.split(',');
		if (list.length < 4) return;
		
		if(!this.Children[list[0]])
			this.Children[list[0]] = new SearchModeCampaignItem(list[0], unescape(list[1]));
		
		this.Children[list[0]].Add(list[2], unescape(list[3]));
	};
	
	this.Remove = function(id)
	{
		if(this.Children[id])
			delete this.Children[id];
	};
	
	this.Get = function(id)
	{
		if(this.Children[id])
			return this.Children[id];
		else
			return null;
	};
	this.Count = function()
	{
		var c = 0;
		
		for(key in this.Children)
		{
			c++;
		}
		
		return c;
	};	
}
function SearchModeCampaignItem(id, description)
{
	this.Id = id;
	this.Description = description;	
	this.Children = new Array();
	
	this.Add = function(id, description)	
	{
		this.Children[id] = new SearchModeActivityItem(id, description);
	};
	
	this.Remove = function(id)
	{
		if(this.Children[id])
			delete this.Children[id];
	};
	
	this.Get = function(id)
	{
		if(this.Children[id])
			return this.Children[id];
		else
			return null;
	};
	this.Count = function()
	{
		var c = 0;
		
		for(key in this.Children)
		{
			c++;
		}
		
		return c;
	};
}
function SearchModeActivityItem(id, description)
{
	this.Id = id;
	this.Description = description;	
	this.Children = new Array();
	
	this.Add = function(id, description)	
	{
		this.Children[id] = description;
	};
	
	this.Remove = function(id)
	{
		if(this.Children[id])
			delete this.Children[id];
	};
	
	this.Get = function(id)
	{
		if(this.Children[id])
			return this.Children[id];
		else
			return null;
	};
	this.Count = function()
	{
		var c = 0;
		
		for(key in this.Children)
		{
			c++;
		}
		
		return c;
	};
}
//
//Pause code
//
function PauseCodeList()
{
	this.Items = new Array();
	
	this.Add = function(key, value)	
	{
		////debugger;
		var id = key.substr('pausecode_'.length, key.length - 'pausecode_'.length);
		var val = value
		
		if(!this.Items['_' + id])
			this.Items['_' + id] = new PauseCodeItem(id, unescape(val));
	};
	
	this.Remove = function(id)
	{
		if(this.Items['_' + id])
			delete this.Items['_' + id];
	};
	
	this.Get = function(id)
	{
		if(this.Items['_' + id])
			return this.Items['_' + id];
		else
			return null;
	};
	this.Count = function()
	{
		var c = 0;
		
		for(key in this.Items)
		{
			c++;
		}
		
		return c;
	};	
}
function PauseCodeItem(id, description)
{
	this.Id = id;
	this.Description = description;
}
//
//TeamList
//
function TeamList()
{
	this.Items = new Array();
	
	this.SetToUpdate = function()
	{
		for(key in this.Items)
		{
			this.Items[key].Updated = false;
		}
	};
	
	this.AddUpdate = function(id, description, active)	
	{
		var desc = unescape(description);
		
		if(this.Items['_' + id])
		{
			this.Items['_' + id].Description = description;
			this.Items['_' + id].Active = active == 1 ? true : false;
		}
		else
			this.Items['_' + id] = new TeamItem(id, desc, active);
			
		this.Items['_' + id].Updated = true;
	};
	
	this.RemoveItemsNotUpdated = function()
	{
		var keys = new Array();
		
		for(key in this.Items)
		{
			keys[keys.length] = key;
		}
		
		var len = keys.length;
		for(var i = 0; i < len; i++)
		{
			if(!this.Items[keys[i]].Updated) this.Remove(keys[i]);
		}	
		
		try 
		{
			////debugger;
			if (document.getElementById("TeamSelection").crVisible) 
			{
				if (this.Count() > 0) 
				{
					document.getElementById("TeamSelection").style.display = "";
				}
				else 
				{
					document.getElementById("TeamSelection").style.display = "none";
				}
			}
		}
		catch(e){}
	};
		
	this.Remove = function(id)
	{
		if(this.Items['_' + id])
			delete this.Items['_' + id];
	};
	
	this.Get = function(id)
	{
		if(this.Items['_' + id])
			return this.Items['_' + id];
		else
			return null;
	};
	
	this.Count = function()
	{
		var c = 0;
		
		for(key in this.Items)
		{
			c++;
		}
		
		return c;
	};	
}
function TeamItem(id, description, active)
{
	this.Id = id;
	this.Description = description;
	this.Active = active == 1 ? true : false;
	this.Updated = true;
	this.NewValue = -1;
}
//
//HistoryList
//
function ContactHistoryItem(parameters)
{
	this.Id 			= parameters.Id;
	this.ContactTime 	= typeof parameters.ContactTime != 'undefined' ? parameters.ContactTime : "";
	this.LocalDateTime 	= typeof parameters.LocalDateTime != 'undefined' ? parameters.LocalDateTime : "";
	this.Agent			= typeof parameters.Agent != 'undefined' ? parameters.Agent : "";
	this.ActivityId		= typeof parameters.ActivityId != 'undefined' ? parameters.ActivityId : "";
	this.Activity		= typeof parameters.Activity != 'undefined' ? parameters.Activity : "";
	this.Media		= typeof parameters.Media != 'undefined' ? parameters.Media : "";
	this.Direction		= typeof parameters.Direction != 'undefined' ? parameters.Direction : "";
	this.SetupTime		= typeof parameters.SetupTime != 'undefined' ? parameters.SetupTime : "";
	this.ComTime		= typeof parameters.ComTime != 'undefined' ? parameters.ComTime : "";
	this.QueueTime		= typeof parameters.QueueTime != 'undefined' ? parameters.QueueTime : "";
	this.TalkTime		= typeof parameters.TalkTime != 'undefined' ? parameters.TalkTime : "";
	this.QualificationId		= typeof parameters.QualificationId != 'undefined' ? parameters.QualificationId : "";
	this.Qualification		= typeof parameters.Qualification != 'undefined' ? parameters.Qualification : "";
	this.QualifiedBy		= typeof parameters.QualifiedBy != 'undefined' ? parameters.QualifiedBy : "";
	this.QualifiedById		= typeof parameters.QualifiedById != 'undefined' ? parameters.QualifiedById : "";
	this.RecordingId		= typeof parameters.RecordingId != 'undefined' ? parameters.RecordingId : "";
	this.RecordingMarker		= typeof parameters.RecordingMarker != 'undefined' ? parameters.RecordingMarker : "";
	this.Sys_CurrentContactId		= typeof parameters.Sys_CurrentContactId != 'undefined' ? parameters.Sys_CurrentContactId : "";
}

function ContactHistoryList()
{
	this.Items = new Array();
	
	this.BuildList = function(doc)
	{
		this.Items = new Array();
		////debugger;
		if(doc == null)
			return;
		
		var xmlDoc;
		if (window.DOMParser)
		{
			parser=new DOMParser();
			xmlDoc=parser.parseFromString(doc,"text/xml");
		}
		else // Internet Explorer
		{
			xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async="false";
			xmlDoc.loadXML(doc);
		} 
		////debugger;
		var list = xmlDoc.getElementsByTagName("contextdata/history/contact");
		var icount = list.length;
		
		for (var i = 0; i < icount; i++) 
		{
			var c = list[i];
			
			var contactHistoItem = new ContactHistoryItem({Id : c.getAttribute("id")});
			
			var jcount = c.childNodes.length;
			for (var j = 0; j < jcount; j++) 
			{
				if(c.childNodes[j].nodeName.toLowerCase() == "contacttime")
				{
					contactHistoItem.ContactTime = c.childNodes[j].text;
				}
				else if(c.childNodes[j].nodeName.toLowerCase() == "localdatetime")
				{
					//TO DO convert to datetime
					//try{contactHistoItem.LocalDateTime = new Date(c.childNodes[j].nodeTypedValue);} catch(e) {}
					contactHistoItem.LocalDateTime = c.childNodes[j].text;
				}
				else if(c.childNodes[j].nodeName.toLowerCase() == "media")
				{
					contactHistoItem.Media = c.childNodes[j].text;
				}
				else if(c.childNodes[j].nodeName.toLowerCase() == "direction")
				{
					contactHistoItem.Direction = c.childNodes[j].text;
				}
				else if(c.childNodes[j].nodeName.toLowerCase() == "setupTime")
				{
					contactHistoItem.SetupTime = c.childNodes[j].text;
				}
				else if(c.childNodes[j].nodeName.toLowerCase() == "comTime")
				{
					contactHistoItem.ComTime = c.childNodes[j].text;
				}
				else if(c.childNodes[j].nodeName.toLowerCase() == "queueTime")
				{
					contactHistoItem.QueueTime = c.childNodes[j].text;
				}
				else if(c.childNodes[j].nodeName.toLowerCase() == "talkTime")
				{
					contactHistoItem.TalkTime = c.childNodes[j].text;
				}
				else if(c.childNodes[j].nodeName.toLowerCase() == "activity")
				{
					contactHistoItem.Activity = c.childNodes[j].text;
					contactHistoItem.Activity = c.childNodes[j].getAttribute("id");
				}
				else if(c.childNodes[j].nodeName.toLowerCase() == "qualification")
				{
					contactHistoItem.Qualification = c.childNodes[j].text;
					contactHistoItem.QualificationId = c.childNodes[j].getAttribute("id");
				}
				else if(c.childNodes[j].nodeName.toLowerCase() == "qualifiedby")
				{
					contactHistoItem.QualifiedBy = c.childNodes[j].text;
					contactHistoItem.QualifiedById = c.childNodes[j].getAttribute("id");
				}
				else if(c.childNodes[j].nodeName.toLowerCase() == "recording")
				{
					contactHistoItem.RecordingId = c.childNodes[j].text;
					contactHistoItem.RecordingMarker = c.childNodes[j].getAttribute("marker");
				}
			}	
			
			this.Add(contactHistoItem);	
					
			/*if (sep > 0) 
			{
				var key = items[i].substring(0, item).toLowerCase();
				var value = items[i].substring(sep + 1);
				var argu = value.split('&');
				var ContactHistoItem = new ContactHistoryItem(
				{
					Id : sep.getAttribute("id"),
					ContactTime : sep.selectNodes("ContactTime").length > 0 ? sep.selectNodes("Direction").value : "",
					LocalDateTime : sep.selectNodes("LocalDateTime").length > 0 ? sep.selectNodes("Direction").value : "",
					Agent : sep.selectNodes("Direction").length > 0 ? sep.selectNodes("Direction").value : "",
					ActivityId : sep.selectNodes("Direction").length > 0 ? sep.selectNodes("Direction").value : "",
					Activity : sep.selectNodes("Direction").length > 0 ? sep.selectNodes("Direction").value : "",
					Media : sep.selectNodes("Direction").length > 0 ? sep.selectNodes("Direction").value : "",
					Direction : sep.selectNodes("Direction").length > 0 ? sep.selectNodes("Direction").value : "",
					SetupTime : sep.selectNodes("Direction").length > 0 ? sep.selectNodes("Direction").value : "",
					ComTime : sep.selectNodes("Direction").length > 0 ? sep.selectNodes("Direction").value : "",
					QueueTime : sep.selectNodes("Direction").length > 0 ? sep.selectNodes("Direction").value : "",
					TalkTime : sep.selectNodes("Direction").length > 0 ? sep.selectNodes("Direction").value : "",
					QualificationId : sep.selectNodes("Direction").length > 0 ? sep.selectNodes("Direction").value : "",
					Qualification : sep.selectNodes("Direction").length > 0 ? sep.selectNodes("Direction").value : "",
					QualifiedBy : sep.selectNodes("Direction").length > 0 ? sep.selectNodes("Direction").value : "",
					QualifiedById : sep.selectNodes("Direction").length > 0 ? sep.selectNodes("Direction").value : "",
					RecordingId : sep.selectNodes("Direction").length > 0 ? sep.selectNodes("Direction").value : "",
					RecordingMarker : sep.selectNodes("Direction").length > 0 ? sep.selectNodes("Direction").value : "",
					Sys_CurrentContactId : sep.selectNodes("Direction").length > 0 ? sep.selectNodes("Direction").value : "",
				});*/
				
			//}
		}
	};
	
	this.Add = function(predefItem)
	{
		this.Items['_' + predefItem.Id] = predefItem;
	};
	
	this.Remove = function(predefItem)
	{
		if(this.Items['_' + predefItem.Id])
			delete this.Items['_' + predefItem.Id];
	};
	
	this.Get = function(predefItemId)
	{
		if(this.Items['_' + predefItemId])
			return this.Items['_' + predefItemId];
	};

	this.Count = function()
	{
		var c = 0;
		
		for(key in this.Items)
		{
			c++;
		}
		
		return c;
	};
}




