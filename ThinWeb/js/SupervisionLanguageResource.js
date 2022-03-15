//User const
//___________________
var const_PanelDetailHistorySize = 12;                  //How many items to be saved for the peak value history list
var const_PanelDetailHistoryInterval = 30;              //What is the time interval the peak values are recieved
var const_PanelDetailHistoryIntervalUnit = "s";       //What is the time value
var CrResource = CrResource;							//CrResource_Fr
var const_TimeZoneOffset = (new Date()).getTimezoneOffset() * -1;	//You can use a fix value in min or formula '(new Date()).getTimezoneOffset() * -1' to calculate the curret one.
//System const
//___________________
var const_Debug = false;
var const_DebugToolbar = false;
var const_FilterRowNoValue = true;                      //If one of the filter value can't be check does the item have to be displayd or not
var const_DefaultMode = false;                           //When false debug mode is active
var const_DefaultSplitChar = ";";                       //For the enums.model.style.list what is the char used by the supervision statemachine to split information
var const_Collapse = "img/listClosed.png";
var const_Expand = "img/listOpen.png";
var const_Checkbox_Check = "img/Checkbox_Check.png";
var const_Checkbox_Check_Mouseover = "img/Checkbox_Check_MouseOver.png";
var const_Checkbox_UnCheck = "img/Checkbox_UnCheck.png";
var const_Checkbox_UnCheck_Mouseover = "img/Checkbox_UnCheck_MouseOver.png";
var const_SkinEnabled = true;
var const_SkinDefault = "";
//System item id
//___________________
var const_WindowPanelDataTableId = "ListviewData";
var const_WindowPanelDetailTableId = "ListviewDetail";
var const_ColumnSelectionTableId = "ColumnSelectionTable";
var const_formCustomColumns = "formCustomColumns";
var const_GroupByTableId = "GroupByTable";
var const_GroupByRowIdent = "GroupById_";
var const_GroupByComboBox = "GroupByCombobox";
var const_GroupByTableList = "GroupBy_Form_Table_List";
var const_CustomId = "crid";
var const_DefaultGroupId = "#@Default";
//Lang
//___________________
//Buttons
var const_Btn_Add = "Add";
var const_Btn_Apply = "Apply";
var const_Btn_Cancel = "Cancel";
var const_Btn_Edit = "Edit";
var const_Btn_Evaluate = "Evaluate";
var const_Btn_Ok = "Ok";
var const_Btn_Remove = "Remove";
var const_Btn_Reset = "Reset";
var const_Btn_Save = "Save";
var const_Btn_Submit = "Submit";
var const_Btn_Help = "Help";
//Login screen  
var const_LOGIN_T1 = "Please enter your login name and password along with the telephony extension to use for voice contacts:";
var const_LOGIN_T2 = "Extension:";
var const_LOGIN_T3 = "Use the following identification";
var const_LOGIN_T4 = "Account:";
var const_LOGIN_T5 = "Password:";
var const_LOGIN_T6 = "Domain:";

var const_LOGIN_VALIDATION_T1 = "please input account to continue";
var const_LOGIN_VALIDATION_T2 = "username or password is invalid";
var const_LOGIN_VALIDATION_T3 = "network not working";

//Info
//___________________
var const_VersionManjor = "1";
var const_VersionMinor = "22";
var const_VersionBuild = "4";
var const_VersionRevision = "19";
var const_VersionDisplay = const_VersionManjor + "." + const_VersionMinor + '.' + const_VersionBuild + '.' + const_VersionRevision;
var const_VersionFull = const_VersionManjor + "." + const_VersionMinor + '.' + const_VersionBuild + '.' + const_VersionRevision;
//var const_VersionDisplay = const_VersionManjor + "." + const_VersionMinor + " (Build " + const_VersionBuild + ")";
/************************************
 * 									*
 * 				English				*
 * 									*
 ************************************/			
var CrResource = 
{
	HelpFile :
	{
		SupervisionGlobal : "Doc/Supervision/Supervisor.htm",
		Login : "Doc/Supervision/Supervisor.htm#_Toc184192049"
	},
	MainTable :
	{
		DefaultNoGroupValue : "Default",
		TableNoDataMessage : "No items to show",
		ExpandTooltip : "Open",	
		CollapseTooltip : "Close"		
	},
	ColumnSelectionForm:
	{
		_Title : "Column selection"
	},
	GroupByForm:
	{
		Title : "Group by",
		ComboboxTextNoneGrouping : "-None-",
		ComboboxText : "Choose field:",
		List : "Group List:"
	},
	ManualCallForm:
	{
		Title: "Manual call",
		StatusEnterNumber: "Enter number...",
		StatusWaiting: "Waiting..."
	},
	DetailPanel:
	{
		_Description : "Description",
		_Value : "Value",
		_Color : "Color",
		_Time : "Time",
		_Graph : "Graph",
		_Graph_DescriptionText  : "Description: shows the values of {0} in a graphical bar.",
		_Graph_DescriptionText_1  : "and"
	},
	CustomColumns:
	{
		Title : "User defined columns",
		cboNew : "New...",
		Name : "Name:",
		Description : "Description:",
		Style : "Style:",
		Visible : "Visible",
		VisibleInPanel : "Visible in panel",
		NewName : "Custom",
		NewDescription : "New custom column ",
		WRN_SelectColumn : "Please select a column to remove."
	},
	Common:
	{
        _Agent : "Agent", 
        _Inbound : "Inbound", 
        _Outbound : "Outbound", 
        _Queue : "Queue",
        _Team : "Team",
		_Campaign : "Campaign",
		_IsSaved : "Workspace is saved!",
		WRN_Save : "Do you want to save the changes.",
		LoadingMsg : "Loading..."
	},
	toolbar: {
		NavigatorToolStrip : //[ Alt, title]
		{
			navigatorLabel : ["Navigator toolbar", "Navigator toolbar"],
			sup_AgentWindow : ["Agent window", "Agent window"],
			sup_InboundWindow : ["Inbound window", "Inbound window"],
			sup_OutboundWindow : ["Outbound window", "Outbound window"],
			sup_QueueWindow : ["Queue window", "Queue window"],
			sup_TeamWindow : ["Team window", "Team window"],
			sup_CampaignWindow : ["Campaign window", "Campaign window"]
		},
		MainFileToolStrip : //[ Alt, title]
		{
			mainFilLabel : ["File toolbar", "File toolbar"],
			sup_Open : ["Open my workspaces", "Open my workspaces"],
			sup_Save : ["Save my workspace", "Save my workspace"],
			sup_Help : ["Documentation", "Documentation"]
		},
		VoiceToolStrip : //[ Alt, title]
		{
			voiceLabel : ["Manual call", "Manual call"],
			VoiceNewCall : ["New call", "New call"],
			VoiceHold : ["Hold call", "Hold call"],
			VoiceRetrieve : ["Retrieve call", "Retrieve call"],
			VoiceHangup : ["Hangup call", "Hangup call"]
		},
		MenuToolStrip : //[ Alt, title]
		{
			menuLabel : ["Options", "Options"],
			bntShowHideDetail : ["Show/Hide detail", "Show/Hide detail"],
			bntSelectionColumn : ["Show/Hide select columns", "Show/Hide select columns"],
			bntGroupByOption : ["Group options", "Group options"],
			bntCustomColumns : ["User defined columns", "User defined columns"]
		},
		SupervisionActionToolStrip : //[ Alt, title]
		{
			supervisionActionLabel : ["Supervision commands", "Supervision commands"],
			btnSupViewer :  ["View agent screen", "View agent screen"],
			bntSupListen : ["Listen", "Listen"],
			bntSupIntrude : ["Intrude", "Intrude"],
			bntSupRecording : ["Start/Stop recording", "Start/Stop recording"]
		}		
	},
	Dashboard:
	{	
		dsbAgentCount : "Number of agents:",
		dsbAgentActiveCount : "Number of active users:",
		dsbAgentTotalInPause : "Number of agents that are in the pause state:",
		dsbAgentTotalInWaiting : "Number of agents that are in the waiting state:",
		dsbAgentTotalOnline : "Number of agents that are in the online state:",
		dsbAgentTotalWrapup : "Number of agents that are in the wrap-up state:",
		
		dsbInboundCount : "Number of inbound activities:",
		dsbInboundTotalInIvr : "Total number of calls handled by the IVR:",
		dsbInboundTotalInQueue : "Total number of waiting calls:",
		dsbInboundTotalOnline : "Total number of online calls:",
		dsbInboundTotalWrapup : "Total number of calls in wrap-up:",
		dsbInboundTotalInOverflow : "Total number of calls in overflow:",
		dsbInboundTotalReceived : "Total number of received calls:",
		dsbInboundTotalHandledByAgent : "Total number of calls handled by agents:",
		
		dsbOutboundCount : "Number of outbound activities:",
		dsbOutboundInModePreview : "Number of activities in preview mode:",
		dsbOutboundInModeProgressive : "Number of activities in progressive mode:",
		dsbOutboundInModePredictive : "Number of activities in predictive mode:",
		dsbOutboundInModeOther : "Number of activities in other modes:",
		dsbOutboundInDailing : "Total number of lines that are dialled:",
		dsbOutboundInWaiting : "Total number of waiting calls:",
		dsbOutboundOnline : "Total number of online calls:",
		dsbOutboundTotalAbandoned : "Total number of abandoned calls:",
		dsbOutboundTotalDailed : "Total number of dialled calls:",
		
		dsbQueueCount : "Number of active queues:",
		dsbQueueInQueue : "Number of waiting contacts in queues:",
		dsbQueueTotalAbandoned : "Total abandoned contacts:",
		dsbQueueTotalProcessed : "Total processed contacts:"
	},
	Buttons :
	{
		_Add : "Add",
		_Apply : "Apply",
		_Cancel : "Cancel",
		_Edit : "Edit",
		_Evaluate : "Evaluate",
		_Ok : "Ok",
		_Remove : "Remove",
		_Reset : "Reset",
		_Save : "Save",
		_Submit : "Submit",
		_Help : "Help"
	},	
	LoginScreen: 
	{ 
		_T1 : "Please enter your login name and password along with the telephony extension to use for voice contacts:",
		_T2 : "Extension:",
		_T3 : "Use the following identification",
		_T4 : "User account:",
		_T5 : "Password:",
		_T6 : "Domain:",
		_T7 : "Choose your language:",
		Msg404 : "Password or username is incorrect."
	},
	colAgent:
	{
		Parameters:
		{
			AgentId : ["Agent id", "The internal guid (unique id) of the agent."],
			Account: ["Account", "The login name of the agent."],
		    Firstname : ["First name", "The first name of the agent."],
		    Lastname : ["Last name", "The last name of the agent."], 
		    SiteId : ["Site", "The site name to which the agent is connected to."],
		    Server : ["Server", "The server name to which the agent is connected to."],
		    TeamId : ["TeamId ", "The list of team(s) on which the agent has rights on."],
		    PauseId : ["PauseId", "The id of the current pause code."],
		    PauseDescription : ["Pause description", "The description of the current pause."],
		    Groupkey : ["Group", "The group name of the agent."],
		    Active :  ["Active", "Is agent deleted in the system."],
			LoginDateTime : ["Login time", "The start time of the agent session"],
			LoginDateTimeUtc : ["Login time utc", "The utc start time of the agent session"],
			Extension : ["Extension", "Current extansion of the user"],
			IpAddress : ["Ip", "Ip address of the user"]
		},
	    Realtime : 
	    {
	        StatusIndex : ["StateIndex", "The agent state as a number."],
	        Status : ["State", "The state of the agent."], 
	        StatusStartTime : ["State start", "The start time of the current agent state."],
	        VoiceState : ["Voice state", ""], 
	        VoiceAvailable : ["Voice available", "Is the agent ready for voice media."],
	        ChatState : ["Chat state", ""],
	        ChatAvailable : ["Chat available", "Is the agent ready for chat media."],
	        EmailState : ["Email state", ""],
	        EmailAvailable : ["Email available", "Is the agent ready for E-mail media."],
	        ListCurrentContactId : ["All contacts", "A list of all the contact ids of the agent."],
	        ActiveContactId : ["Active voice", "The active voice contact id."],
			PerQueWaiting : ["Q Waiting","Number of contacts waiting in the personnel queue of the user."],
			PerQueAbandoned : ["Q abandoned","Number of contacts abandoned in the personnel queue of the user."],
			PerQueProcessed : ["Q processed","Number of contacts processed in the personnel queue of the user."],
			PerQueEnQueue : ["Q queued","Number of contacts queued in the personnel queue of the user."]
	    },
	    History : 
	    {
	        Undefined : ["Undefined", "Number of occurrence in the undefined state."],
	        Pause : ["Pause occ.", "Number of occurrence in the pause state."], 
	        Off : ["Off occ.", "Number of occurrence in the off state."],
	        Waiting : ["Waiting occ.", "Number of occurrence in waiting state."], 
	        Wrapup : ["Wrap-up occ.", "Number of occurrence in the wrap-up state."],
	        WrapupInbound : ["In wrap-up", "Number of occurrence in inbound wrap-up."],
	        WrapupOutbound : ["Out wrap-up", "Number of occurrence in outbound wrap-up."],
	        WrapupEMail : ["E-mail wrap-up", "Number of occurrence in e-mail wrap-up."],
	        WrapupChat : ["Chat wrap-up", "Number of occurrence in chat wrap-up."],
	        Online : ["Online occ.", "Number of occurrence in the online state."],
	        HandelingInbound : ["In online", "Number of occurrence in inbound online."],
	        HandelingOutbound : ["Out online", "Number of occurrence in outbound online."],
	        HandelingEMail : ["E-mail online", "Number of occurrence in e-mail online."],	        
			HandelingChat : ["Chat online", "Number of occurrence in chat online."],
	        ContactHandled : ["Contacts handled", "Number of contacts handled."],
	        ContactInboundHandled : ["Contacts in handled", "Number of inbound calls handled."],
	        ContactOutboundHandled : ["Contacts out handled", "Number of outbound calls handled."],
	        ContactEMailHandled : ["Contacts e-mail handled", "Number of e-mails handled."],
	        ContactChatHandled : ["Contacts chat handled", "Number of chats handled."],
        	ContactMsgSend :  ["Msg send", "Message send by the agent."],
			ContactMsgReceived :  ["Msg Received", "Message received by the agent."],
	        UndefinedTime : ["Undefined time", "Time spent in the undefined state."],
	        PauseTime : ["Pause time", "Time spent in the pause state."],
	        OffTime : ["Off time", "Time spent in the off state."],
	        WaitingTime : ["Waiting time", "Time spent in the waiting state."],
	        WrapupStateTime : ["Wrapup time", "Time spent in the wrap-up state."],
	        WrapupInboundTime : ["In wrap-up", "Time spent in the inbound wrap-up state."],
	        WrapupOutboundTime : ["Out wrap-up", "Time spent in outbound wrap-up."],
	        WrapupEMailTime : ["E-mail wrap-up", "Time spent in e-mail wrap-up."],
	        WrapupChatTime : ["Chat wrap-up", "Time spent in chat wrap-up."],
	        OnlineTime : ["Online time", "Time spent in the online state."],
	        HandelingInboundTime : ["In online time", "Time spent in the inbound online."],
	        HandelingOutboundTime : ["Out online time", "Time spent in outbound online."],
	        HandelingEMailTime : ["E-mail online time", "Time spent in e-mail online."],
	        HandelingChatTime : ["Chat online time", "Time spent in chat online."],
	        ContactHandledTime : ["Contacts handled time", "Time spent for all handled contacts."],
	        ContactInboundHandledTime : ["Contacts in handled time", "Time spent for handled inbound calls."],
	        ContactOutboundHandledTime : ["Contacts out handled time", "Time spent for handled outbound calls."],
	        ContactEMailHandledTime : ["Contacts e-mail handled time", "Time spent for handled e-mails."],
	        ContactChatHandledTime : ["Contacts chat handled time", "Time spent for handled chats."],
	        Preview : ["Preview occ.", "Number of occurrence in the preview state."],
	        PreviewTime : ["Preview time", "Time spent in the preview state."],
			HistoryTimeGraph : ["HistoryTimeGraph", ""]
	    }
	},
	colInbound: {
		Parameters: {
			Id: ["Id", "The unique identifier of the inbound activity."],
			Description: ["Description", "Description of the activity."],
			GroupKey: ["Group", ""],
			CampaignId: ["CampaignId", "The campaign identifier."],
			CampaignName: ["Campaign", "The name of the campaign."],
			MediaType: ["Media", "Media type for this activity (Voice, E-mail, chat, ...)"],
			MediaTypeId: ["Media id", "Media type id for this activity"]
		},
		Realtime: {
			ActiveContacts: ["Active", "Number of active voice contacts."],
			SystemPreprocessing: ["System pre-processing", "Number of contacts in system pre-processing"],
			Closing : ["Closing", "Number of contact in closing"],
			Ivr: ["IVR", "Number of contacts in IVR."],
			Waiting: ["Waiting", "Number of contacts in waiting."],
			Online: ["Online", "Number of contacts online."],
			WrapUp: ["Wrap-up", "Number of contacts in wrap-up."],
			Overflowing: ["Overflow", "Contact with the overflow flag."],
			Transfer: ["Transfer", "Contacts in transfer."],
			MaxQueueTime: ["Max queue", "Longest waiting contact."],
			AgentInReady  : ["Ready agents", "The number of agents that our ready for this queue."],
        	ContactMsgSend :  ["Msg send", "Message send by the agent."],
			ContactMsgReceived :  ["Msg Received", "Message received by the agent."],			
			RealTimeGraph: ["RealTimeGraph", ""]
		},
		History: {
			Received: ["Received occ.", "Contacts received."],
			ReceivedTime: ["Received total time", "Time spent by all received contacts."],
			Closed: ["Closed occ.", "Contacts during closing hours."],
			ClosedTime: ["Closed total time", "Total time spent by contacts during closing time."],
			EndInSystemProcessing: ["End before IVR", "Contacts ended before IVR."],
			EndInSystemProcessingTime: ["End before IVR total time", "Total time spent by contacts that where ended before IVR."],
			EndInIvr: ["End in IVR", "Contacts ended in IVR."],
			EndInIvrTime: ["End in IVR total time", "Total time spent by contacts that ended in IVR."],
			IvrFinish: ["IVR success", "Contacts successful finished in the IVR."],
			IvrFinishTime: ["IVR success total time", "Total time spent by contacts that where successful finished in the IVR."],
			IvrAbandoned: ["IVR abandon", "Contacts abandon in the IVR."],
			IvrAbandonedTime: ["IVR abandon total time", "Total time spent by contacts abandon in the IVR."],
			Abandoned: ["Abandoned", "Contacts abandoned."],
			AbandonedTime: ["Abandoned total time", "Total time spent by abandon contacts."],
			HandledByAgent: ["Agent", "Contacts that went to an agent."],
			HandledByAgentTime: ["Agent total time", "Total time spent by contacts that went to an agent."],
			OverflowedCount: ["Overflow count", "How many time was the overflow triggered."],
			OverflowedContact: ["Overflow contacts", "How many contact had the overflow flag."],
			Waiting: ["Waiting", "Contacts that waited before going to an agent."],
			WaitingTime: ["Waiting total time", "Total time spent by contact that waited before going to an agent."],
			Direct: ["Direct", "Contacts that didn't wait before going to an agent."],
			DirectTime: ["Direct total time", "Total time spent by contact that didn't wait before going to an agent."],
			Transfer: ["Transfered", "Contacts that where transfer."],
			TransferTime: ["Transfered total time", "Total time spent by contacts that where transfer."],
        	ContactMsgSend :  ["Msg send", "Message send by the agent."],
			ContactMsgReceived :  ["Msg Received", "Message received by the agent."],
			HistoryGraph: ["HistoryGraph", ""]
		}
	},
	colOutbound :
	{
	    Parameters :
	    {
	        Mode : ["Dial mode", "Dialling mode for this activity."],
	        Id : ["Id", "The unique identifier of the outbound activity."], 
	        Description : ["Description", "Description of the activity."],
	        GroupKey : ["Group", ""], 
	        CampaignId : ["CampaignId", "The campaign identifier."],
	        CampaignName : ["Campaign", "The name of the campaign."],
			MediaType: ["Media", "Media type for this activity (Voice, E-mail, chat, ...)"],
			MediaTypeId: ["Media id", "Media type id for this activity"]
	    },
	    Realtime : 
	    {
	        SystemPreprocessing : ["Dialling", "Number of contacts in system pre-processing."],
			Closing : ["Closing", "Number of contact in closing"],			
	        Ivr : ["IVR", "Number of contacts in IVR."], 
	        Waiting : ["Waiting", "Number of contacts in waiting."],
	        Online : ["Online", "Number of contacts in online."], 
	        WrapUp : ["Wrap-up", "Number of contacts in wrap-up."],
			Overflowing: ["Overflow", "Contact with the overflow flag."],
			Transfer: ["Transfer", "Contacts in transfer."],
			Preview: ["Preview", "Contacts in preview."],
	        RealTimeGraph : ["RealTimeGraph", ""]
	    },  
	    History : 
	    {
	        Dialled : ["Dialled", "Contacts dialled."],
	        DialledTime : ["Dialled total time", "Total time spent by all the contacts."], 
	        EndInSystemProcessing : ["End in system", "Contacts ended in system pre-processing"],
	        EndInSystemProcessingTime : ["End in system total time", "Total time spent by contacts that where ended in system pre-processing."], 
	        EndInIvr : ["End in IVR", "Contacts ended in IVR."],
	        EndInIvrTime : ["End in IVR total time", "Total time spent by contacts that ended in IVR."],
			IvrFinish: ["IVR success", "Contacts successful finished in the IVR."],
			IvrFinishTime: ["IVR success total time", "Total time spent by contacts that where successful finished in the IVR."],
			IvrAbandoned: ["IVR abandon", "Contacts abandon in the IVR."],
			IvrAbandonedTime: ["IVR abandon total time", "Total time spent by contacts abandon in the IVR."],			
	        Abandoned : ["Abandoned", "Contacts abandoned."],
	        AbandonedTime : ["Abandoned total time", "Total time spent by abandon contacts."],
			OverflowedCount: ["Overflow count", "How many time was the overflow triggered."],
			OverflowedContact: ["Overflow contacts", "How many contact had the overflow flag."],
	        ToAgent : ["Agent", "Contacts that went to an agent."],
	        ToAgentTime : ["Agent total time", "Total time spent by contacts that went to an agent."],
	        Direct : ["Direct", "Contacts that didn't wait before going to an agent."],
	        DirectTime : ["Direct total time", "Total time spent by contact that didn't wait before going to an agent."],
	        Waiting : ["Waiting", "Contacts that waited before going to an agent."],
	        WaitingTime : ["Waiting total time", "Total time spent by contact that waited before going to an agent."],
			Transfer: ["Transfered", "Contacts that where transfer."],
			TransferTime: ["Transfered total time", "Total time spent by contacts that where transfer."],
	        ToAgentGraph : ["ToAgentGraph", ""],
	        HistoryGraph : ["HistoryGraph", ""]
	    },
		ContactListInfo :
		{
			ContactCount : ["Contact #","Number of contacts in the contact list"],
			ContactToDial : ["To dial","Number of contacts that can be dialled"],
			ContactNeverDialed : ["Never dialled","Number of contact that have never been dialled"],
			ContactCallbacks : ["Call backs","Number of contacts to call back"],
			ContactToRedial : ["To redial","Number of contacts to redial"],
			ContactToNotRedial : ["To not dial","Number of contact that will not be dialled"],
			ContactListGraph : ["Contact list graph",""]
		}		
	    
	},
	colQueue :  
	{
	    Parameters :
	    {
	        Id : ["Id", "The unique identifier of the queue."],
	        Description : ["Description", "Description of the queue."], 
	        GroupKey : ["Group", "The group name of the queue."]
	    },
	    Realtime : 
	    {
	        Waiting : ["Waiting", "Number of contacts waiting in this queue."],
	        MaxWaiting  : ["Max waiting", "The real time maximum waiting time."],
			AgentInReady  : ["Ready agents", "The number of agents that our ready for this queue."]
	    },
	    History : 
	    {
	        Received  : ["Queued", "Contact that where in the queue"],
	        ReceivedTime : ["Queued total time", "Total time spent by all the contacts in this queue."],	        
			Processed : ["Processed", "Contacts processed by the system."],
	        ProcessedTime : ["Processed total time", "Total time spent by processed contacts."],
	        ProcessedDirect : ["Processed direct", "Contacts processed by the system without waiting time."],
	        ProcessedDirectTime : ["Processed direct total time", "Total time spent by Processed Direct contacts."],
	        ProcessedWaiting : ["Processed waiting", "Contacts processed by the system with waiting time."],
	        ProcessedWaitingTime : ["Processed waiting total time", "Total time spent by Processed Waiting contacts."],
			ProcessedOverflow : ["Processed overflow", "Contacts processed by the system that went to overflow."], 
			ProcessedOverflowTime : ["Processed overflow total time", "Total time spent by processed contacts that went to overflow."], 
	        Abandoned : ["Abandoned", "Contacts abandoned."],
	        AbandonedTime : ["Abandoned total time", "Total time spent by abandon contacts."],
	        MaxQueueSize : ["Max in queue", "Maximum number of contacts in this queue at the same time."],
	        MaxWaitingTime : ["Max waiting time", "The maximum time a contact had to wait in the queue."],
	        HistoryGraph : ["HistoryGraph", ""]
	    }
	},
	colTeam :
	{
	    Parameters :
	    {
	        Id : ["Id", "The unique identifier of the team."],
	        Description : ["Description", "Description of the team."], 
	        Group : ["Group", "The group name of the team."],
	        Agents : ["Agents", "Number of agents in this team."], 
	        Queues : ["Queues", "Number of queues link with this team."], 
	        AgentsLogonGraph : ["AgentGraph", ""]
	    },
	    Realtime : 
	    {
	        AgentsLogon : ["Agents logon", "Number of agents currently logon that has rights for this team."],
	        AgentsInPause : ["AgentsInPause", "Number of agent that have rights on this team that are in pause state."], 
	        AgentsInWaiting : ["AgentsInWaiting", "Number of agent that have rights on this team that are in waiting state."],
	        AgentsOnline : ["AgentsOnline", "Number of agent that have rights on this team that are in online state."], 
	        AgentsInWrapup : ["AgentsInWrapup", "Number of agent that have rights on this team that are in wrap-up state."],
	        WaitingInQueue : ["WaitingInQueue", "Number of waiting contact in all the queues that are link with this team."],
	        RealTimeGraph : ["RealTimeGraph", ""]
	    }    
	},
	colCampaign :
	{
	    Parameters :
	    {
	        Id : ["Id", "The unique identifier of the campaign."],
	        Description : ["Description", "Description of the campaign."], 
	        Group : ["Group", "The group name of the campaign."],
	        Inbound : ["Inbound", ""], 
	        InboundCount : ["InboundCount", "Number of inbound activities for this campaign."],
	        Outbound : ["Outbound", ""], 
	        OutboundCount : ["OutboundCount", "Number of outbound activities for this campaign."]    
	    },
		ContactListInfo :
		{
			ContactCount : ["Contact #","Number of contacts in the contact list"],
			ContactToDial : ["To dial","Number of contacts that can be dialled"],
			ContactNeverDialed : ["Never dialled","Number of contact that have never been dialled"],
			ContactCallbacks : ["Call backs","Number of contacts to call back"],
			ContactToRedial : ["To redial","Number of contacts to redial"],
			ContactToNotRedial : ["To not dial","Number of contact that will not be dialled"]
		}				
	},
	colCommon: 
	{
	    Production : 
	    {
	        PositiveCount : ["Positive #", "Number of positive contact qualification"],
	        PositiveSum : ["Positive sum", "Sum of positive contact qualification value"],
	        NegativeCount : ["Negative #", "Number of negative contact qualification"],
	        NegativeSum : ["Negative sum", "Sum of negative contact qualification value"],
	        ArguedCount : ["Argued #", "Number of argued contact qualification"],
	        TotalQualified : ["Total qualified", "Number of contacts that received a contact qualification"],
	        TotalNotQualified : ["Total not qualified", "Number of contacts that didn't received a contact qualification"],
			DialingActionTime : ["Time dialling action", "The total time of the dialling action."],
			DialingActionPosTime : ["Time dialling action pos", "The total time of the dialling action for positive contacts."],
			DialingActionNegTime : ["Time dialling action neg", "The total time of the dialling action for negative contacts."],
			DialingActionArgTime : ["Time dialling action arg", "The total time of the dialling action for argued contacts."],
			OnlineActionTime : ["Time online action", "The total time of the online action."],
			OnlineActionPosTime : ["Time online action pos", "The total time of the online action for positive contacts."],
			OnlineActionNegTime : ["Time online action neg", "The total time of the online action for negative contacts."],
			OnlineActionArgTime : ["Time online action arg", "The total time of the online action for argued contacts."],
			OnHoldActionTime : ["Time on hold action", "The total time of the on hold action."],
			OnHoldActionPosTime : ["Time on hold action pos", "The total time of the on hold action for positive contacts."],
			OnHoldActionNegTime : ["Time on hold action neg", "The total time of the on hold action for negative contacts."],
			OnHoldActionArgTime : ["Time on hold action arg", "The total time of the on hold action for argued contacts."],
			WrapUpActionTime : ["Time wrap-up action", "The total time of the wrap-up action."],
			WrapUpActionPosTime : ["Time wrap-up action pos", "The total time of the wrap-up action for positive contacts."],
			WrapUpActionNegTime : ["Time wrap-up action neg", "The total time of the wrap-up action for negative contacts."],
			WrapUpActionArgTime : ["Time wrap-up action arg", "The total time of the wrap-up action for argued contacts."],
			CommunicationActionTime : ["Com time", "The total time of communication. (online action  + on hold action)"],
			CommunicationActionPosTime : ["Com time pos", "The total time of communication for positive contacts. (online action  + on hold action)"],
			CommunicationActionNegTime : ["Com time neg", "The total time of communication for negative contacts. (online action  + on hold action)"],
			CommunicationActionArgTime : ["Com time arg", "The total time of communication for argued contacts. (online action  + on hold action)"],
			WorkActionTime : ["Work time", "The total work time. (communication + wrap-up action)"],
			WorkActionPosTime : ["Work time pos", "The total work time for positive contacts. (communication + wrap-up action)"],
			WorkActionNegTime : ["Work time neg", "The total work time for negative contacts. (communication + wrap-up action)"],
			WorkActionArgTime : ["Work time arg", "The total work time for argued contacts. (communication + wrap-up action)"],
			CompletedContacts : ["Completed contacts", "Contact that are completed."],
			CompletedContactsTime : ["Completed contacts time", "Time spend for contact that are completed."],
			AvgArgComTime : ["Avg arg com time", "Average communication time for argued contacts."],
			AvgArgWorkTime : ["Avg arg work time", "Average work time for argued contacts."],
			AvgPosComTime : ["Avg pos com time", "Average communication time for positive contacts."],
			AvgPosWorkTime : ["Avg pos work time", "Average work time for positive contacts."],
			AvgNegComTime : ["Avg neg com time", "Average communication time for negative contacts."],
			AvgNegWorkTime : ["Avg neg work time", "Average work time for negative contacts."],			
	        RatioTotQual_Tot : ["TotQual/Tot", "Ratio of total qualified contacts against total contacts"],
	        RatioArg_Tot : ["Arg/Tot", "Ratio of argued contact against total contacts"],
	        RatioArg_TotQual : ["Arg/TotQual", "Ratio of argued contact against total qualified contacts"],
	        RatioPos_Tot : ["Pos/Tot", "Ratio of positive contact against total contacts"],
	        RatioPos_TotQual : ["Pos/totQual", "Ratio of positive contact against total qualified contacts"],
			RatioPos_Arg :	["Pos/Arg", "Ratio of positive contact against argued contacts"],
			RatioNeg_Tot: ["Neg/Tot", "Ratio of negative contact against total contacts"],
			RatioNeg_TotQual: ["Neg/TotQual", "Ratio of negative contact against total qualified contacts"],
			RationNeg_Arg: ["Neg/Arg", "Ratio of negative contact against total contacts"],
			AvgPosValue: ["Avg pos", "Average positive value"],
			AvgNegValue: ["Avg neg", "Average negative value"],
			sys_Reset : ["SystemReset", "Used by the system"],
			RatioTotQual_TotGraph: ["TotQual/Tot graph", "Graphical view ratio of total qualified contacts against total contacts"],
			RatioArg_TotQualGraph: ["Arg/TotQual graph", "Graphical view ratio of argued argued against total qualified contacts"],
			RatioPos_TotQualGraph: ["Pos/totQual graph", "Graphical view ratio of argued positive against total qualified contacts"],
			RatioNeg_TotQualGraph: ["Neg/TotQual graph", "Graphical view ratio of argued negative against total qualified contacts"]
	    }, 
	    PeriodProduction : 
	    {
	        PositiveCount : ["Positive # /H", "Number of positive contact qualification. Hour based."],
	        PositiveSum : ["Positive sum /H", "Sum of positive contact qualification value. Hour based."],
	        NegativeCount : ["Negative # /H", "Number of negative contact qualification. Hour based."],
	        NegativeSum : ["Negative sum /H", "Sum of negative contact qualification value. Hour based."],
	        ArguedCount : ["Argued # /H", "Number of argued contact qualification. Hour based."],
	        TotalQualified : ["Total qualified /H", "Number of contacts that received a contact qualification. Hour based."],
	        TotalNotQualified : ["Total not qualified /H", "Number of contacts that didn't received a contact qualification. Hour based."],
			DialingActionTime : ["Time dialling action /H", "The total time of the dialling action. Hour based."],
			DialingActionPosTime : ["Time dialling action pos /H", "The total time of the dialling action for positive contacts. Hour based."],
			DialingActionNegTime : ["Time dialling action neg /H", "The total time of the dialling action for negative contacts. Hour based."],
			DialingActionArgTime : ["Time dialling action arg /H", "The total time of the dialling action for argued contacts. Hour based."],
			OnlineActionTime : ["Time online action /H", "The total time of the online action. Hour based."],
			OnlineActionPosTime : ["Time online action pos /H", "The total time of the online action for positive contacts. Hour based."],
			OnlineActionNegTime : ["Time online action neg /H", "The total time of the online action for negative contacts. Hour based."],
			OnlineActionArgTime : ["Time online action arg /H", "The total time of the online action for argued contacts. Hour based."],
			OnHoldActionTime : ["Time on hold action /H", "The total time of the on hold action. Hour based."],
			OnHoldActionPosTime : ["Time on hold action pos /H", "The total time of the on hold action for positive contacts. Hour based."],
			OnHoldActionNegTime : ["Time on hold action neg /H", "The total time of the on hold action for negative contacts. Hour based."],
			OnHoldActionArgTime : ["Time on hold action arg /H", "The total time of the on hold action for argued contacts. Hour based."],
			WrapUpActionTime : ["Time wrap-up action /H", "The total time of the wrap-up action. Hour based."],
			WrapUpActionPosTime : ["Time wrap-up action pos /H", "The total time of the wrap-up action for positive contacts. Hour based."],
			WrapUpActionNegTime : ["Time wrap-up action neg /H", "The total time of the wrap-up action for negative contacts. Hour based."],
			WrapUpActionArgTime : ["Time wrap-up action arg /H", "The total time of the wrap-up action for argued contacts. Hour based."],
			CommunicationActionTime : ["Com time /H", "The total time of communication. (online action  + on hold action). Hour based."],
			CommunicationActionPosTime : ["Com time pos /H", "The total time of communication for positive contacts. (online action  + on hold action). Hour based."],
			CommunicationActionNegTime : ["Com time neg /H", "The total time of communication for negative contacts. (online action  + on hold action). Hour based."],
			CommunicationActionArgTime : ["Com time arg /H", "The total time of communication for argued contacts. (online action  + on hold action). Hour based."],
			WorkActionTime : ["Work time /H", "The total work time. (communication + wrap-up action). Hour based."],
			WorkActionPosTime : ["Work time pos /H", "The total work time for positive contacts. (communication + wrap-up action). Hour based."],
			WorkActionNegTime : ["Work time neg /H", "The total work time for negative contacts. (communication + wrap-up action). Hour based."],
			WorkActionArgTime : ["Work time arg /H", "The total work time for argued contacts. (communication + wrap-up action). Hour based."],
			CompletedContacts : ["Completed contacts", "Contact that are completed."],
			CompletedContactsTime : ["Completed contacts time", "Time spend for contact that are completed."],
			AvgArgComTime : ["Avg arg com time /H", "Average communication time for argued contacts. Hour based."],
			AvgArgWorkTime : ["Avg arg work time /H", "Average work time for argued contacts. Hour based."],
			AvgPosComTime : ["Avg pos com time /H", "Average communication time for positive contacts. Hour based."],
			AvgPosWorkTime : ["Avg pos work time /H", "Average work time for positive contacts. Hour based."],
			AvgNegComTime : ["Avg neg com time /H", "Average communication time for negative contacts. Hour based."],
			AvgNegWorkTime : ["Avg neg work time /H", "Average work time for negative contacts. Hour based."],
	        RatioTotQual_Tot : ["TotQual/Tot /H", "Ratio of total qualified contacts against total contacts. Hour based."],
	        RatioArg_Tot : ["Arg/Tot /H", "Ratio of argued contact against total contacts. Hour based."],
	        RatioArg_TotQual : ["Arg/TotQual /H", "Ratio of argued contact against total qualified contacts."],
	        RatioPos_Tot : ["Pos/Tot /H", "Ratio of positive contact against total contacts."],
	        RatioPos_TotQual : ["Pos/totQual /H", "Ratio of positive contact against total qualified contacts. Hour based."],
			RatioPos_Arg :	["Pos/Arg /H", "Ratio of positive contact against argued contacts. Hour based."],
			RatioNeg_Tot: ["Neg/Tot /H", "Ratio of negative contact against total contacts. Hour based."],
			RatioNeg_TotQual: ["Neg/TotQual /H", "Ratio of negative contact against total qualified contacts. Hour based."],
			RationNeg_Arg: ["Neg/Arg /H", "Ratio of negative contact against total contacts. Hour based."],
			AvgPosValue: ["Avg pos /H", "Average positive value. Hour based."],
			AvgNegValue: ["Avg neg /H", "Average negative value. Hour based."],
			sys_Reset : ["SystemReset", "Used by the system"],
			RatioTotQual_TotGraph: ["TotQual/Tot graph /H", "Graphical view ratio of total qualified contacts against total contacts. Hour based."],
			RatioArg_TotQualGraph: ["Arg/TotQual graph /H", "Graphical view ratio of argued argued against total qualified contacts. Hour based."],
			RatioPos_TotQualGraph: ["Pos/totQual graph /H", "Graphical view ratio of argued positive against total qualified contacts. Hour based."],
			RatioNeg_TotQualGraph: ["Neg/TotQual graph /H", "Graphical view ratio of argued negative against total qualified contacts. Hour based."]
	    }		
	}
}
/************************************
 * 									*
 * 				French				*
 * 									*
 ************************************/			
var CrResource_Fr = 
{
	HelpFile :
	{
		SupervisionGlobal : "Doc/Supervision_Fr/Supervisor.htm",
		Login : "Doc/Supervision_Fr/Supervisor.htm"
	},
	MainTable :
	{
		DefaultNoGroupValue : "Défault",
		TableNoDataMessage : "Rien à afficher",
		ExpandTooltip : "Ouvert",	
		CollapseTooltip : "Fermé"		
	},
	ColumnSelectionForm:
	{
		_Title : "Sélection de colonne"
	},
	GroupByForm:
	{
		Title : "Groupé par",
		ComboboxTextNoneGrouping : "N/A",
		ComboboxText : "Choix de champ:",
		List : "Liste de groupe:"
	},
	ManualCallForm:
	{
		Title: "Appel manuel",
		StatusEnterNumber: "Introduisez le numéro …",
		StatusWaiting: "En attente…"
	},
	DetailPanel:
	{
		_Description : "Description",
		_Value : "Valeur",
		_Color : "Couleur",
		_Time : "Temps",
		_Graph : "Graphique",
		_Graph_DescriptionText  : "Description:visualiser {0} en mode graphique",
		_Graph_DescriptionText_1  : "et"
	},
	CustomColumns:
	{
		Title : "Valeurs définies par l'utilisateur",
		cboNew : "Nouveau…",
		Name : "Nom:",
		Description : "Description:",
		Style : "Style:",
		Visible : "Visible",
		VisibleInPanel : "Visible dans le panel",
		NewName : "Spécifique",
		NewDescription : "Nouvelle colonne spécifique",
		WRN_SelectColumn : "Voulez-vous sauver les lodifications?"
	},
	Common:
	{
        _Agent : "Agent",
        _Inbound : "Entrant", 
        _Outbound : "Sortant", 
        _Queue : "Queue",
        _Team : "Team", 
		_Campaign : "Campagne",
		_IsSaved : "Espace de travail sauvé!",
		WRN_Save : "Voulez-vous sauver les lodifications?",
		LoadingMsg : "Loading..." //TO DO
	},	
	toolbar: {
		NavigatorToolStrip : //[ Alt, title]
		{
			navigatorLabel : ["Navigator toolbar", "Barre d'outils de navigation"], //TO DO
			sup_AgentWindow : ["Agent window", "Fenêtre agent"], //TO DO
			sup_InboundWindow : ["Inbound window", "Fenêtre activités entrantes"], //TO DO
			sup_OutboundWindow : ["Outbound window", "Fenêtre activités sortantes"], //TO DO
			sup_QueueWindow : ["Queue window", "Fenêtre de queues"], //TO DO
			sup_TeamWindow : ["Team window", "Fenêtre équipes"], //TO DO
			sup_CampaignWindow : ["Campaign window", "Fenêtre campagnes"] //TO DO
		},
		MainFileToolStrip : //[ Alt, title]
		{
			mainFilLabel : ["File toolbar", "Barre d'outils fichier"], //TO DO
			sup_Open : ["Open my workspaces", "Ouvrir mon espace de travail"], //TO DO
			sup_Save : ["Save my workspace", "Sauvegarder mon espace de travail"], //TO DO
			sup_Help : ["Documentation", "Documentation"] //TO DO
		},
		VoiceToolStrip : //[ Alt, title]
		{
			voiceLabel : ["Manual call", "Appel manuel"], //TO DO
			VoiceNewCall : ["New call", "Nouvel appel"], //TO DO
			VoiceHold : ["Hold call", "Mettre l'appel en attente"], //TO DO
			VoiceRetrieve : ["Retrieve call", "Reprendre l'appel"], //TO DO
			VoiceHangup : ["Hangup call", "Raccrocher"] //TO DO
		},
		MenuToolStrip : //[ Alt, title]
		{
			menuLabel : ["Options", "Options"], //TO DO
			bntShowHideDetail : ["Show/Hide detail", "Montrer/cacher les details"], //TO DO
			bntSelectionColumn : ["Show/Hide select columns", "Sélectionner les colonnes"], //TO DO
			bntGroupByOption : ["Group options", "Options de groupe"], //TO DO
			bntCustomColumns : ["User defined columns", "Colonnes définies par l'utilisateur"] //TO DO
		},
		SupervisionActionToolStrip : //[ Alt, title]
		{
			supervisionActionLabel : ["Supervision commands", "Commandes de supervision"], //TO DO
			btnSupViewer :  ["View agent screen", "View agent screen"], //TO DO
			bntSupListen : ["Listen", "Ecouter"], //TO DO
			bntSupIntrude : ["Intrude", "Intrude"], //TO DO
			bntSupRecording : ["Start/Stop recording", "Démarrer/arrêter l'enregistrement"] //TO DO
		}		
	},	
	Dashboard:
	{	
		dsbAgentCount : "Nombre d'agents:",
		dsbAgentActiveCount : "Nombre d'agents actifs:",
		dsbAgentTotalInPause : "Nombre d'agents en pause:",
		dsbAgentTotalInWaiting : "Nombre d'agents en attente:",
		dsbAgentTotalOnline : "Nombre d'agents en ligne:",
		dsbAgentTotalWrapup : "Nombre d'agents en état encodage:",
		
		dsbInboundCount : "Nombre d'activités entrantes:",
		dsbInboundTotalInIvr : "Nombre d'appels traités opar le SVI:",
		dsbInboundTotalInQueue : "Nombre total d'appels en attente:",
		dsbInboundTotalOnline : "Nombre total d'appels en ligne:",
		dsbInboundTotalWrapup : "Nombre total d'appels en mode encodage:",
		dsbInboundTotalInOverflow : "Nombre total d'appels en débordement:",
		dsbInboundTotalReceived : "Nombre total d'appels reçus:",
		dsbInboundTotalHandledByAgent : "Nombre total d'appels traités par un agent:",
		
		dsbOutboundCount : "Nombre d'activités sortantes:",
		dsbOutboundInModePreview : "Nombre d'activités en mode preview:",
		dsbOutboundInModeProgressive : "Nombre d'activités en mode progressif:",
		dsbOutboundInModePredictive : "Nombre d'activités en mode prédictif:",
		dsbOutboundInModeOther : "Nombre d'activités en d'autres modes:",
		dsbOutboundInDailing : "Nombre total de lignes appelées:",
		dsbOutboundInWaiting : "Nombre total d'appels en attente:",
		dsbOutboundOnline : "Nombre total d'appels en ligne:",
		dsbOutboundTotalAbandoned : "Nombre total d'appels abandonnés:",
		dsbOutboundTotalDailed : "Nombre total d'appels émis:",
		
		dsbQueueCount : "Nombre de queues actives:",
		dsbQueueInQueue : "Nombre de contacts en queue d'attente:",
		dsbQueueTotalAbandoned : "Nombre total de contacts abandonnés en queue:",
		dsbQueueTotalProcessed : "Nombre total de contacts traités:"
	},	
	Buttons :
	{
		_Add : "Ajout",
		_Apply : "Activer",
		_Cancel : "Annuler",
		_Edit : "Mise à jour",
		_Evaluate : "Evaluer",
		_Ok : "Ok",
		_Remove : "Oter",
		_Reset : "Reset",
		_Save : "Sauver",
		_Submit : "Soumettre",
		_Help : "Aide"
	},
	LoginScreen: 
	{ 
		_T1 : "Introduisez votre login, votre mot de passe et votre extension téléphonique:",
		_T2 : "Extension:",
		_T3 : "Utilisez l' identification suivante",
		_T4 : "Compte utilisateur:",
		_T5 : "Mot de passe:",
		_T6 : "Domaine:",
		_T7 : "Choose your language:", //TO DO
		Msg404 : "Password or username is incorrect."		
	},
	colAgent:
	{
		Parameters:
		{
			AgentId : ["Identifiant agent", "L'identifiant unique de l'agent"],
			Account: ["Utilisateur", "Le nom Utilisateur de l'agent"],
		    Firstname : ["Prénom", "Le prénom de l'agent"],
		    Lastname : ["Nom", "Le nom de l'agent"], 
		    SiteId : ["Site", "Le nom du site auquel l'agent est connecté"],
		    Server : ["Serveur", ""],
		    TeamId : ["Identifiant team", "La liste des teams dans lesquels l'agent est actif"],
		    PauseId : ["Identifiant pause", "L'identifiant du code pause actuel"],
		    PauseDescription : ["Description de la pause", "La dscription de la pause actuelle"],
		    Groupkey : ["Groupe", "Le nom du groupe de l'agent"],
		    Active :  ["Actif", ""],
			LoginDateTime : ["Temps démarrage session", "Temps démarrage de la session agent"],
			LoginDateTimeUtc : ["Temps  UTC  démarrage session", "Temps UTC démarrage de la session agent"],
			Extension : ["Extension", "Current extansion of the user"], //TO DO
			IpAddress : ["Ip", "Ip address of the user"] //TO DO
		},
	    Realtime : 
	    {
	        StatusIndex : ["Index etat", "Code numérique de l'état de l'agent"],
	        Status : ["Etat", "L'état de l'agent"], 
	        StatusStartTime : ["Etat start", "L'heure de début de l'actuel état de l'agent"],
	        VoiceState : ["Etat de la voix", ""], 
	        VoiceAvailable : ["Disponible pour la voix", "x"],
	        ChatState : ["Etat du chat", ""],
	        ChatAvailable : ["Disponible pour le chat", "L'agent est-il prêt pour le média chat"],
	        EmailState : ["Etat courriel", ""],
	        EmailAvailable : ["Disponible pour le courriel", "L'agent est-il prêt pour le média courriel"],
	        ListCurrentContactId : ["Tous contacts", "Identifiants de tous les contacts de l'agent"],
	        ActiveContactId : ["Voix Active", "Identifiant du contact voix actif de l'agent"],
			PerQueWaiting : ["Q Waiting","Number of contacts waiting in the personnel queue of the user."],//TO DO
			PerQueAbandoned : ["Q abandoned","Number of contacts abandoned in the personnel queue of the user."],//TO DO
			PerQueProcessed : ["Q processed","Number of contacts processed in the personnel queue of the user."],//TO DO
			PerQueEnQueue : ["Q queued","Number of contacts queued in the personnel queue of the user."]	//TO DO		
	    },
	    History : 
	    {
	        Undefined : ["Indéfini", "Nombre d'états indéfinis survenus"],
	        Pause : ["Nombre Pause ", "Nombre d'états pause survenus"], 
	        Off : ["Nombre Off ", "Nombre d'états non actif survenus"],
	        Waiting : ["Nombre attente", "Nombre d'états en attente survenus"], 
	        Wrapup : ["Nombre encodage", "Nombre d'états encodage survenus"],
	        WrapupInbound : ["Nombre encodage entr.", "Nombre d'états  encodage appels entrants survenus"],
	        WrapupOutbound : ["Nombre encodage sort.", "Nombre d'états encodage appels sortants  survenus"],
	        WrapupEMail : ["Nombre encodage courriel", "Nombre d'états encodage courriel  survenus"],
	        WrapupChat : ["Nombre encodage chat", "Nombre d'états encodage chat  survenus"],
	        Online : ["Nombre en ligne", "Nombre d'états en ligne survenus"],
	        HandelingInbound : ["Nombre entrants", "Nombre d'états appels entrants survenus"],
	        HandelingOutbound : ["Nombre sortants", "Nombre d'états appels sortants survenus"],
	        HandelingEMail : ["Nombre courriel", "Nombre d'états courriel survenus"],	        
			HandelingChat : ["Nombre chat", "Nombre d'états chat survenus"],
	        ContactHandled : ["Contacts traités", "Nombre de contacts traités"],
	        ContactInboundHandled : ["Contacts entrants traités", "Nombre de contacts entrants traités"],
	        ContactOutboundHandled : ["Contacts sortants traités", "Nombre de contacts sortants traités"],
	        ContactEMailHandled : ["Contacts courriel traités", "Nombre de contacts courriel traités "],
	        ContactChatHandled : ["Contacts chat traités", "Nombre de contacts chat traités "],
        	ContactMsgSend :  ["Msg send", "Message send by the agent."], //TO do
			ContactMsgReceived :  ["Msg Received", "Message received by the agent."], //TO do			
	        UndefinedTime : ["Temps indéfini", "Temps passé dans l'état indéfini."],
	        PauseTime : ["Temps de pause", "Temps passé dans l'état pause"],
	        OffTime : ["Temps non actif", "Temps passé dans l'état non actif"],
	        WaitingTime : ["Temps d'attente", "Temps passé dans l'état attente"],
	        WrapupStateTime : ["Temps d'encodage", "Temps passé dans l'état encodage"],
	        WrapupInboundTime : ["Temps encodage entr.", "Temps passé dans l'état encodage appels entrants"],
	        WrapupOutboundTime : ["Temps encodage sort.", "Temps passé dans l'état encodage appels sortants"],
	        WrapupEMailTime : ["Temps encodage courriel", "Temps passé dans l'état encodage courriels"],
	        WrapupChatTime : ["Temps encodage chat", "Temps passé dans l'état encodage chat"],
	        OnlineTime : ["Temps 'En ligne'", "Temps passé dans l'état en ligne"],
	        HandelingInboundTime : ["Temps 'En ligne' entr.", "Temps passé dans l'état en ligne appels entrants"],
	        HandelingOutboundTime : ["Temps 'En ligne' sort.", "Temps passé dans l'état en ligne appels sortants"],
	        HandelingEMailTime : ["Temps 'En ligne'  courriel", "Temps passé dans l'état en ligne courriel"],
	        HandelingChatTime : ["Temps 'En ligne' chat", "Temps passé dans l'état en ligne chat"],
	        ContactHandledTime : ["Temps contacts traités", "Temps passé au traitement de tous les contacts"],
	        ContactInboundHandledTime : ["Temps contacts entrants traités", "Temps passé au traitement de tous les contacts entrants "],
	        ContactOutboundHandledTime : ["Temps contacts sortants traités", "Temps passé au traitement de tous les contacts sortants"],
	        ContactEMailHandledTime : ["Temps contacts courriel traités", "Temps passé au traitement de tous les contacts courriel"],
	        ContactChatHandledTime : ["Temps contacts chat traités", "Temps passé au traitement de tous les contacts chat"],	 			
	        Preview : ["Preview occ.", "Number of occurrence in the preview state."],//TO do
	        PreviewTime : ["Preview time", "Time spent in the preview state."],//TO DO
			HistoryTimeGraph : ["Graph historique temps réel", ""]
	    }
	},
	colInbound: {
		Parameters: {
			Id: ["Identifiant", "L'identifiant unique de l'activité de réception."],
			Description: ["Description", "Description de l'activité."],
			GroupKey: ["Groupe", ""],
			CampaignId: ["Identifiant campagne", "L'identifiant de la campagne."],
			CampaignName: ["Campagne", "Le nom de la campagne."],
			MediaType: ["Media", "Media type for this activity"],//TO DO
			MediaTypeId: ["Media id", "Media type id for this activity"]//TO DO
		},
		Realtime: {
			ActiveContacts: ["Actifs", "Nombre de contacts voix actifs"],
			SystemPreprocessing: ["Preprocessing système", "Nombre de contacts en système preprocessing"],
			Closing : ["Fermeture", "Nombre de contacts en fermeture"],			
			Ivr: ["SVI", "Nombre de contacts dans le Serveur Multi-canal Interactif"],
			Waiting: ["En attente", "Nombre de contacts en attente"],
			Online: ["En ligne", "Nombre de contacts en ligne"],
			WrapUp: ["Encodage", "Nombre de contacts en encodage"],
			Overflowing: ["En débordement", "Nombre de contacts en débordement"], //TO DO
			Transfer: ["Transfer", "Contacts in transfer."], //TO DO
			MaxQueueTime: ["Max queue", "Longest waiting contact."], //TO DO
			AgentInReady  : ["Ready agents", "The number of agents that our ready for this queue."],// TO DO
        	ContactMsgSend :  ["Msg send", "Message send by the agent."], //to do
			ContactMsgReceived :  ["Msg Received", "Message received by the agent."], //todo			
			RealTimeGraph: ["Graphique temps réel", ""]
		},
		History: {
			Received: ["Contacts reçus", "Nombre de contacts reçus"],
			ReceivedTime: ["Temps total contacts reçus", "Temps passé sur tout les contacts reçus"],
			Closed: ["Contacts durant fermeture", "Nombre de contacts arrivés lors des heures de fermeture"],
			ClosedTime: ["Temps total durant fermeture", "Temps total  contacts arrivés lors des heures de fermeture"],
			EndInSystemProcessing: ["Raccrochés avant SVI", "Nombre de contacts raccrochés avant l'arrivée dans le SVI"],
			EndInSystemProcessingTime: ["Temps total raccr  Avant SVI", "Temps total  contacts raccrochés avant l'arrivée dans le SVI"],
			EndInIvr: ["Raccroché dans SVI", "Nombre de contacts abandonnés dans le SVI"],
			EndInIvrTime: ["Temps total Abandons  SVI", "Temps total des abandons dans le SVI"],
			IvrFinish: ["IVR success", "Contacts successful finished in the IVR."], //TO DO
			IvrFinishTime: ["IVR success total time", "Total time spent by contacts that where successful finished in the IVR."],//TO DO
			IvrAbandoned: ["IVR abandon", "Contacts abandon in the IVR."],//TO DO
			IvrAbandonedTime: ["IVR abandon total time", "Total time spent by contacts abandon in the IVR."],//TO DO
			Abandoned: ["Abandonnés", "Nombre de contacts abandonnés"],
			AbandonedTime: ["Temps total abandonnés", "Temps total des contacts abandonnés"],
			HandledByAgent: ["Agent", "Nombre de contacts transférés vers un agent"],
			HandledByAgentTime: ["Temps total agent", "Temps total des contacts transférés vers un agent"],
			OverflowedCount: ["Total Débordement", "Nombre de contacts en débordement"],//To do
			OverflowedContacts: ["Débordement", "T"], //To do
			Waiting: ["En attente", "Nombre de contacts mis en attente avant transfert vers  un agent"],
			WaitingTime: ["Temps total en attente", "Temps total de la mise en attente avant transfert vers  un agent"],
			Direct: ["Direct", "Nombre de contacts transférés vers un agent sans attente"],
			DirectTime: ["Temps total direct", "Temps total des contacts transférés vers un agent sans attente"],
			Transfer: ["Transfered", "Contacts that where transfer."], //TO DO
			TransferTime: ["Transfered total time", "Total time spent by contacts that where transfer."],//TO DO
        	ContactMsgSend :  ["Msg send", "Message send by the agent."], //to do
			ContactMsgReceived :  ["Msg Received", "Message received by the agent."], //todo
			HistoryGraph: ["Graphique historique ", ""]
		}
	},
	colOutbound :
	{
	    Parameters :
	    {
	        Mode : ["Mode d'appel", "Mode d'appel pour cette activité"],
	        Id : ["Id", "L'identifiant unique de l'activité d'émission d'appels"], 
	        Description : ["Description", "Description de l'activité."],
	        GroupKey : ["Group", ""], 
	        CampaignId : ["Id campagne", "L'identifiant de la campagne"],
	        CampaignName : ["Campagne", "Nom de la campagne"],
			MediaType: ["Media", "Media type for this activity"],//TO DO
			MediaTypeId: ["Media id", "Media type id for this activity"]//TO DO
	    },
	    Realtime : 
	    {
	        SystemPreprocessing : ["Dialling", "Nombre de contacts en pré-processing dans le sytème"],
	        Ivr : ["SVI", "Nombre de contacts dans le Serveur Multi-canal Interactif"], //TO DO
	        Waiting : ["En attente", "Nombre de contacts en attente"],
	        Online : ["En ligne", "Nombre de contacts en ligne"], 
	        WrapUp : ["Encodage", "Nombre de contacts en encodage"],
			Overflowing: ["En débordement", "Nombre de contacts en débordement"], //TO DO
			Transfer: ["Transfer", "Contacts in transfer."], //TO DO
			Preview: ["Prevue", "Nombre de contacts en prevue."],
	        RealTimeGraph : ["Graph temps réel", ""]
	    },  
	    History : 
	    {
	        Dialled : ["Appelés", "Contacts appelés"],
	        DialledTime : ["Temps total des appels émis", "Temps total de tous les contacts sortants"], 
	        EndInSystemProcessing : ["Abandons dans le système", "Nombre de contacts abandonnés dans le pré-processing"],
	        EndInSystemProcessingTime : ["Temps total des abandons", "Temps total des contacts abandonnés dans le pre-processing"], 
	        EndInIvr : ["Abandons SVI", "Nombre de contacts abandonnés dans le SVI"],
	        EndInIvrTime : ["Temps total abandon SVI", "Temps total des contacts abandonnés dans le SVI"],
			IvrFinish: ["IVR success", "Contacts successful finished in the IVR."], //TO DO
			IvrFinishTime: ["IVR success total time", "Total time spent by contacts that where successful finished in the IVR."],//TO DO
			IvrAbandoned: ["IVR abandon", "Contacts abandon in the IVR."],//TO DO
			IvrAbandonedTime: ["IVR abandon total time", "Total time spent by contacts abandon in the IVR."],//TO DO
			Abandoned : ["Abandons", "Nombre de contacts abandonnés"],
	        AbandonedTime : ["Temps total abandons", "Temps total des contacts abandonnés"],
			OverflowedCount: ["Total Débordement", "Nombre de contacts en débordement"],//To do
			OverflowedContacts: ["Débordement", "T"], //To do
	        ToAgent : ["Vers agent", "Nombre de contacts qui sont passés à un agent"],
	        ToAgentTime : ["Temps total vers agent", "Temps total des contacts passés à un agent"],
	        Direct : ["Direct", "Nombre de contacts sans en attente avant transfert à agent"],
	        DirectTime : ["Temps total direct", "Temps total des contacts sans attente avant transfert à agent"],
	        Waiting : ["En attente", "Nombre de contacts qui ont été mis en attente avant transfert vers l'agent"],
	        WaitingTime : ["Temps total en attente", "Temps total des contacts ayant été en attente avant transfert vers l'agent"],
			Transfer: ["Transfered", "Contacts that where transfer."],//TO DO
			TransferTime: ["Transfered total time", "Total time spent by contacts that where transfer."], //TO DO
	        ToAgentGraph : ["Graph vers agent", ""],
	        HistoryGraph : ["Graph historique", ""]
	    },
		ContactListInfo :
		{
			ContactCount : ["# contacts","Nombre de contacts"],
			ContactToDial : ["A appeler","Nombre de contacts à appeler"],
			ContactNeverDialed : ["Jamais appelés","Nombre de contacts jamais appelés"],
			ContactCallbacks : ["en mode call back","Nombre de contacts en mode call bac"],
			ContactToRedial : ["A rappeler","Nombre de contacts à rappeler"],
			ContactToNotRedial : ["A ne pas appeler","Nombre de contacts à ne pas appeler"],
			ContactListGraph : ["Contact list Graph",""]//TO DO
		}		
	},
	colQueue :  
	{
	    Parameters :
	    {
	        Id : ["Id", "Identifiant unique de la queue"],
	        Description : ["Description", "Description de la queue"], 
	        GroupKey : ["Groupe", "Nom du groupe de la queue"]
	    },
	    Realtime : 
	    {
	        Waiting : ["En attente", "Nombre de contacts en attente dans cette queue"],
	        MaxWaiting  : ["Attente max", "Durée de l'attente maximale en temps réel"],
			AgentInReady  : ["Ready agents", "The number of agents that our ready for this queue."] //To do
	    },
	    History : 
	    {
	        Received : ["En queue", "Nombre de contacts en queue"],
	        ReceivedTime : ["Temps total queue", "Temps total de tous les contacts dans cette queue"],
	        Processed : ["Traité", "Nombre de contacts traités par le système"],
	        ProcessedTime : ["Temps total traités", "Temps total des contacts traités par le système"],
	        ProcessedDirect : ["Traité direct", "Contacts processed by the system."],//TO DO
	        ProcessedDirectTime : ["Traité direct total time", "Total time spent by processed contacts."],//TO DO
	        ProcessedWaiting : ["Traité waiting", "Contacts processed by the system."],//TO DO
	        ProcessedWaitingTime : ["Temps total traités waiting", "Total time spent by processed contacts."],//TO DO
			ProcessedOverflow : ["Processed overflow", ""], //TO DO
			ProcessedOverflowTime : ["Processed overflow total time", ""], //TO DO
	        Abandoned : ["Abandons", "Nombre de contacts abandonnés"],
	        AbandonedTime : ["Temps toal abandons", "Temps total de tous les contacts abandonnés"],
	        MaxQueueSize : ["Max en queue", "Nombre  maximum de contacts simultanés dans cette queue"],
	        MaxWaitingTime : ["Temps max", "Le temps maximum qu' un contact est resté en attente dans cette queue"],
	        HistoryGraph : ["Graph historique", ""]		
	    }
	},
	colTeam :
	{
	    Parameters :
	    {
	        Id : ["Id", "L'identifiant unique du team"],
	        Description : ["Description", "Description du team."], 
	        Group : ["Groupe", "Le nom de groupe du team"],
	        Agents : ["Agents", "Le nombre d'agents dans ce team"], 
	        Queues : ["Queues", "Le nombre de queues en relation avec ce team"], 
	        AgentsLogonGraph : ["Graph agent", ""]
	    },
	    Realtime : 
	    {
	        AgentsLogon : ["Logon agents", "Nbre d'agents actuellement connectés qui ont des droits dans ce team"],
	        AgentsInPause : ["Agents en pause", "Nbre d'agents ayant des droits dans ce team et qui sont actuellement en pause"], 
	        AgentsInWaiting : ["Agents en attente", "Nbre d'agents ayant des droits dans ce team qui sont actuellement en attente"],
	        AgentsOnline : ["Agents en ligne", "Nbre d'agents ayant des droits dans ce team qui sont actuellement dans l'état 'En ligne'"], 
	        AgentsInWrapup : ["Agents en Enc", "Nbre d'agents ayant des droits dans ce team qui sont actuellement en encodage "],
	        WaitingInQueue : ["En attente dans queue", "Nbre de contacts en attente dans toutes les queues qui sont liées à ce team"],
	        RealTimeGraph : ["Graph temps réel", ""]
	        
	    }
	},
	colCampaign :
	{
	    Parameters :
	    {
	        Id : ["Id", "L'identifiant unique de la campagne"],
	        Description : ["Description", "Description de la campagne"], 
	        Group : ["Groupe", "Nom de groupe de la campagne"],
	        Inbound : ["Réception", "Nombre réception"], 
	        InboundCount : ["InboundCount", "Nombre d'activités en réception de cette campagne"],
	        Outbound : ["Emission", "Nombre émission"], 
	        OutboundCount : ["OutboundCount", "Nombre d'activités en émission de cette campagne"]
	    },
		ContactListInfo :
		{
			ContactCount : ["# contacts","Nombre de contacts"],
			ContactToDial : ["A appeler","Nombre de contacts à appeler"],
			ContactNeverDialed : ["Jamais appelés","Nombre de contacts jamais appelés"],
			ContactCallbacks : ["en mode call back","Nombre de contacts en mode call bac"],
			ContactToRedial : ["A rappeler","Nombre de contacts à rappeler"],
			ContactToNotRedial : ["A ne pas appeler","Nombre de contacts à ne pas appeler"] 
		}		
	},
	colCommon : 
	{
	    Production : 
	    {
	        PositiveCount : ["# Positifs", "Nombre de contacts qualifiés de manière positive"],
	        PositiveSum : ["Somme positifs", "Somme des valeurs des contacts qualifiés de manière positive"],
	        NegativeCount : ["# Négatifs", "Nombre de contacts qualifiés de manière négative"],
	        NegativeSum : ["Somme négatifs", "Somme des valeurs des contacts qualifiés de manière négative"],
	        ArguedCount : ["# Argumentés", "Nombre de contacts qualifiés argumentés"],
	        TotalQualified : ["Total qualifié", "Nombre de contacts qualifiés"],
	        TotalNotQualified : ["Total non qualifié", "Nombre de contacts non qualifiés"],
			DialingActionTime : ["Temps action dialling", "Temps rotal de l'action dialling"],
			DialingActionPosTime : ["Temps action dialling pos.", "Temps total de l'action de dialing pour les contacts positifs"],
			DialingActionNegTime : ["Temps action dialling nég.", "Temps total de l'action de dialing pour les contacts négatifs"],
			DialingActionArgTime : ["Temps action dialling arg.", "Temps total de l'action de dialing pour les contacts argumentés"],
			OnlineActionTime : ["Temps action en ligne", "Temps total de l'action en ligne"],
			OnlineActionPosTime : ["Temps action en ligne pos.", "Temps total de l'action  en ligne pour les contacts positifs"],
			OnlineActionNegTime : ["Temps action en ligne nég.", "Temps total de l'action en ligne pour les contacts négatifs"],
			OnlineActionArgTime : ["Temps action en ligne arg.", "Temps total de l'action en ligne pour les contacts argumentés"],
			OnHoldActionTime : ["Temps action en attente", "Temps rotal de l'action en attente"],
			OnHoldActionPosTime : ["Temps action en attente pos.", "Temps total de l'action  en attente pour les contacts positifs"],
			OnHoldActionNegTime : ["Temps action en attente nég.", "Temps total de l'action en attente pour les contacts négatifs"],
			OnHoldActionArgTime : ["Temps action en attente arg.", "Temps total de l'action en attente pour les contacts argumentés"],
			WrapUpActionTime : ["Temps action encodage", "Temps rotal de l'action encodage"],
			WrapUpActionPosTime : ["Temps action encodage pos.", "Temps total de l'action  encodage pour les contacts positifs"],
			WrapUpActionNegTime : ["Temps action encodage nég.", "Temps total de l'action encodage pour les contacts négatifs"],
			WrapUpActionArgTime : ["Temps action encodage arg.", "Temps total de l'action encodage pour les contacts argumentés"],
			CommunicationActionTime : ["Temps de communication", "Temps rotal de la communication"],
			CommunicationActionPosTime : ["Temps de communication pos.", "Temps total de la communication pour les contacts positifs (en ligne + en attente)"],
			CommunicationActionNegTime : ["Temps de communication nég.", "Temps total de la communication pour les contacts négatifs (en ligne + en attente)"],
			CommunicationActionArgTime : ["Temps de communication arg.", "Temps total de la communication pour les contacts argumentés (en ligne + en attente)"],
			WorkActionTime : ["Temps de travail", "Temps rotal de la travail"],
			WorkActionPosTime : ["Temps de travail pos.", "Temps total de travail pour les contacts positifs (communication + encodage)"],
			WorkActionNegTime : ["Temps de travail nég.", "Temps total de travail pour les contacts négatifs (communication + encodage)"],
			WorkActionArgTime : ["Temps de travail arg.", "Temps total de travail pour les contacts argumentés (communication + encodage)"],
			CompletedContacts : ["Completed contacts /H", "Contact that are completed."],//TO DO
			CompletedContactsTime : ["Completed contacts time /H", "Time spend for contact that are completed."],//TO DO
			AvgArgComTime : ["Temps comm. moyen  cont. Arg.", "Temps de communication moyen des contacts argumentés"],
			AvgArgWorkTime : ["Temps trav. moyen  cont. Arg.", "Temps de travail moyen des contacts argumentés"],
			AvgPosComTime : ["Temps comm. moyen  cont. pos.", "Temps de communication moyen des contacts positifs"],
			AvgPosWorkTime : ["Temps trav. moyen  cont. pos.", "Temps de travail moyen des contacts positifs"],
			AvgNegComTime : ["Temps comm. moyen  cont. nég.", "Temps de communication moyen des contacts négatifs"],
			AvgNegWorkTime : ["Temps trav. moyen  cont. nég.", "Temps de travail moyen des contacts négatifs"],				
	        RatioTotQual_Tot : ["Tot Qual/Tot", "Ratio contacts qualifiés / nombre total de contacts"],
	        RatioArg_Tot : ["Arg/Tot", "Ratio contacts argumentés / nombre total de contacts"],
	        RatioArg_TotQual : ["Arg/TotQual", "Ratio contacts argumentés / nombre total de contacts qualifiés"],
	        RatioPos_Tot : ["Pos/Tot", "Ratio contacts positifs / nombre total de contacts"],
	        RatioPos_TotQual : ["Pos/totQual", "Ratio contacts positifs / nombre total de contacts qualifiés"],
			RatioPos_Arg :	["Pos/Arg", "Ratio contacts positifs / nombre total de contacts argumentés"],
			RatioNeg_Tot: ["Nég/Tot", "Ratio contacts négatifs / nombre total de contacts"],
			RatioNeg_TotQual: ["Nég/TotQual", "Ratio contacts négatifs / nombre total de contacts qualifiés"],
			RationNeg_Arg: ["Nég/Arg", "Ratio contacts négatifs / nombre total de contacts argumentés"],
			AvgPosValue: ["Moyenne pos", "Valeur moyenne positive"],
			AvgNegValue: ["Moyenne nég", "Valeur moyenne négative"],
			sys_Reset : ["", ""],//TO DO
			RatioTotQual_TotGraph: ["Graph TotQual/Tot", "Vue graphique du ratio nombre de contacts qualifiés /  nombre total"],
			RatioArg_TotQualGraph: ["Graph Arg/TotQual", "Vue graphique du ratio nombre de contacts argumentés / nombre total qualifiés"],
			RatioPos_TotQualGraph: ["Graph Pos/totQual", "Vue graphique du ratio nombre de contacts positifs / nombre total qualifiés"],
			RatioNeg_TotQualGraph: ["Graph Nég/TotQual", "Vue graphique du ratio nombre de contacts négatifs / nombre total qualifiés"]
	    }, 
	    PeriodProduction : 
	    {
	        PositiveCount : ["# Positifs /H", "Nombre de contacts qualifiés de manière positive. Par heur."],
	        PositiveSum : ["Somme positifs /H", "Somme des valeurs des contacts qualifiés de manière positive. Par heur."],
	        NegativeCount : ["# Négatifs /H", "Nombre de contacts qualifiés de manière négative. Par heur."],
	        NegativeSum : ["Somme négatifs /H", "Somme des valeurs des contacts qualifiés de manière négative. Par heur."],
	        ArguedCount : ["# Argumentés /H", "Nombre de contacts qualifiés argumentés. Par heur."],
	        TotalQualified : ["Total qualifié /H", "Nombre de contacts qualifiés. Par heur."],
	        TotalNotQualified : ["Total non qualifié /H", "Nombre de contacts non qualifiés. Par heur."],
			DialingActionTime : ["Temps action dialling /H", "Temps rotal de l'action dialling. Par heur."],
			DialingActionPosTime : ["Temps action dialling pos. /H", "Temps total de l'action de dialing pour les contacts positifs. Par heur."],
			DialingActionNegTime : ["Temps action dialling nég. /H", "Temps total de l'action de dialing pour les contacts négatifs. Par heur."],
			DialingActionArgTime : ["Temps action dialling arg. /H", "Temps total de l'action de dialing pour les contacts argumentés. Par heur."],
			OnlineActionTime : ["Temps action en ligne /H", "Temps rotal de l'action en ligne. Par heur."],
			OnlineActionPosTime : ["Temps action en ligne pos. /H", "Temps total de l'action  en ligne pour les contacts positifs. Par heur."],
			OnlineActionNegTime : ["Temps action en ligne nég. /H", "Temps total de l'action en ligne pour les contacts négatifs. Par heur."],
			OnlineActionArgTime : ["Temps action en ligne arg. /H", "Temps total de l'action en ligne pour les contacts argumentés. Par heur."],
			OnHoldActionTime : ["Temps action en attente /H", "Temps rotal de l'action en attente. Par heur."],
			OnHoldActionPosTime : ["Temps action en attente pos. /H", "Temps total de l'action  en attente pour les contacts positifs. Par heur."],
			OnHoldActionNegTime : ["Temps action en attente nég. /H", "Temps total de l'action en attente pour les contacts négatifs. Par heur."],
			OnHoldActionArgTime : ["Temps action en attente arg. /H", "Temps total de l'action en attente pour les contacts argumentés. Par heur."],
			WrapUpActionTime : ["Temps action encodage /H", "Temps rotal de l'action encodage. Par heur."],
			WrapUpActionPosTime : ["Temps action encodage pos. /H", "Temps total de l'action  encodage pour les contacts positifs. Par heur."],
			WrapUpActionNegTime : ["Temps action encodage nég. /H", "Temps total de l'action encodage pour les contacts négatifs. Par heur."],
			WrapUpActionArgTime : ["Temps action encodage arg. /H", "Temps total de l'action encodage pour les contacts argumentés. Par heur."],
			CommunicationActionTime : ["Temps de communication /H", "Temps rotal de la communication. Par heur."],
			CommunicationActionPosTime : ["Temps de communication pos. /H", "Temps total de la communication pour les contacts positifs (en ligne + en attente). Par heur."],
			CommunicationActionNegTime : ["Temps de communication nég. /H", "Temps total de la communication pour les contacts négatifs (en ligne + en attente). Par heur."],
			CommunicationActionArgTime : ["Temps de communication arg. /H", "Temps total de la communication pour les contacts argumentés (en ligne + en attente). Par heur."],
			WorkActionTime : ["Temps de travail /H", "Temps rotal de la travail. Par heur."],
			WorkActionPosTime : ["Temps de travail pos. /H", "Temps total de travail pour les contacts positifs (communication + encodage). Par heur."],
			WorkActionNegTime : ["Temps de travail nég. /H", "Temps total de travail pour les contacts négatifs (communication + encodage). Par heur."],
			WorkActionArgTime : ["Temps de travail arg. /H", "Temps total de travail pour les contacts argumentés (communication + encodage). Par heur."],
			CompletedContacts : ["Completed contacts /H", "Contact that are completed."],//TO DO
			CompletedContactsTime : ["Completed contacts time /H", "Time spend for contact that are completed."],//TO DO
			AvgArgComTime : ["Temps comm. moyen  cont. Arg. /H", "Temps de communication moyen des contacts argumentés. Par heur."],
			AvgArgWorkTime : ["Temps trav. moyen  cont. Arg. /H", "Temps de travail moyen des contacts argumentés. Par heur."],
			AvgPosComTime : ["Temps comm. moyen  cont. pos. /H", "Temps de communication moyen des contacts positifs. Par heur."],
			AvgPosWorkTime : ["Temps trav. moyen  cont. pos. /H", "Temps de travail moyen des contacts positifs. Par heur."],
			AvgNegComTime : ["Temps comm. moyen  cont. nég. /H", "Temps de communication moyen des contacts négatifs. Par heur."],
			AvgNegWorkTime : ["Temps trav. moyen  cont. nég. /H", "Temps de travail moyen des contacts négatifs. Par heur."],			
	        RatioTotQual_Tot : ["Tot Qual/Tot /H", "Ratio contacts qualifiés / nombre total de contacts. Par heur."],
	        RatioArg_Tot : ["Arg/Tot /H", "Ratio contacts argumentés / nombre total de contacts. Par heur."],
	        RatioArg_TotQual : ["Arg/TotQual /H", "Ratio contacts argumentés / nombre total de contacts qualifiés. Par heur."],
	        RatioPos_Tot : ["Pos/Tot /H", "Ratio contacts positifs / nombre total de contacts. Par heur."],
	        RatioPos_TotQual : ["Pos/totQual /H", "Ratio contacts positifs / nombre total de contacts qualifiés. Par heur."],
			RatioPos_Arg :	["Pos/Arg /H", "Ratio contacts positifs / nombre total de contacts argumentés. Par heur."],
			RatioNeg_Tot: ["Nég/Tot /H", "Ratio contacts négatifs / nombre total de contacts. Par heur."],
			RatioNeg_TotQual: ["Nég/TotQual /H", "Ratio contacts négatifs / nombre total de contacts qualifiés. Par heur."],
			RationNeg_Arg: ["Nég/Arg /H", "Ratio contacts négatifs / nombre total de contacts argumentés. Par heur."],
			AvgPosValue: ["Moyenne pos /H", "Valeur moyenne positive. Par heur."],
			AvgNegValue: ["Moyenne nég /H", "Valeur moyenne négative. Par heur."],
			sys_Reset : ["", ""],//TO DO
			RatioTotQual_TotGraph: ["Graph TotQual/Tot /H", "Vue graphique du ratio nombre de contacts qualifiés /  nombre total. Par heur."],
			RatioArg_TotQualGraph: ["Graph Arg/TotQual /H", "Vue graphique du ratio nombre de contacts argumentés / nombre total qualifiés. Par heur."],
			RatioPos_TotQualGraph: ["Graph Pos/totQual /H", "Vue graphique du ratio nombre de contacts positifs / nombre total qualifiés. Par heur."],
			RatioNeg_TotQualGraph: ["Graph Nég/TotQual /H", "Vue graphique du ratio nombre de contacts négatifs / nombre total qualifiés. Par heur."]
	    }		
	}	
}
/************************************
 * 									*
 * 				Dutch				*
 * 									*
 ************************************/			
var CrResource_Nl = 
{
	HelpFile :
	{
		SupervisionGlobal : "Doc/Supervision/Supervisor.htm",
		Login : "Doc/Supervision/Supervisor.htm#_Toc184192049"
	},
	MainTable :
	{
		DefaultNoGroupValue : "Standaard",
		TableNoDataMessage : "Geen items in the lijst",
		ExpandTooltip : "Open",	
		CollapseTooltip : "Sluit"		
	},
	ColumnSelectionForm:
	{
		_Title : "Kolom selectie"
	},
	GroupByForm:
	{
		Title : "Groeperen op",
		ComboboxTextNoneGrouping : "-Geen-",
		ComboboxText : "Kies een veld:",
		List : "Groepen:"
	},
	ManualCallForm:
	{
		Title: "Handmatig bellen",
		StatusEnterNumber: "Kies nummer...",
		StatusWaiting: "Wachten..."
	},
	DetailPanel:
	{
		_Description : "Beschrijving",
		_Value : "Waarde",
		_Color : "Kleur",
		_Time : "Tijd",
		_Graph : "Grafiek",
		_Graph_DescriptionText  : "Beschrijving: toont de waarden van {0} in een grafische bar.",
		_Graph_DescriptionText_1  : "en"
	},
	CustomColumns:
	{
		Title : "Gebruiker gedefinieerde kolommen",
		cboNew : "Nieuw...",
		Name : "Naam:",
		Description : "Beschrijving:",
		Style : "Stijl:",
		Visible : "Zichtbaar",
		VisibleInPanel : "Zichtbaar in het paneel",
		NewName : "Aangepast",
		NewDescription : "Nieuw aangepaste kolom",
		WRN_SelectColumn : "Selecteer een kolom om te verwijderen."
	},
	Common:
	{
        _Agent : "Agenten", 
        _Inbound : "Inkomende", 
        _Outbound : "Uitgaande", 
        _Queue : "Wachtrij",
        _Team : "Team",
		_Campaign : "Campagne",
		_IsSaved : "Werkruimte is bewaard!",
		WRN_Save : "Wilt u de wijzigingen opslaan.",
		LoadingMsg : "Laden..."
	},
	toolbar: {
		NavigatorToolStrip : //[ Alt, title]
		{
			navigatorLabel : ["Navigator werkbalk", "Navigator werkbalk"],
			sup_AgentWindow : ["Agent venster", "Agent venster"],
			sup_InboundWindow : ["Inkomende venster", "Inkomende venster"],
			sup_OutboundWindow : ["Uitgaande venster", "Uitgaande venster"],
			sup_QueueWindow : ["Wachtrij venster", "Wachtrij venster"],
			sup_TeamWindow : ["Team venster", "Team venster"],
			sup_CampaignWindow : ["Campagne venster", "Campagne venster"]
		},
		MainFileToolStrip : //[ Alt, title]
		{
			mainFilLabel : ["Bestand werkbalk", "Bestand werkbalk"],
			sup_Open : ["Open mijn werkruimte", "Open mijn werkruimte"],
			sup_Save : ["Opslaan werkruimte", "Opslaan werkruimte"],
			sup_Help : ["Documentatie", "Documentatie"]
		},
		VoiceToolStrip : //[ Alt, title]
		{
			voiceLabel : ["Handmatig bellen", "Handmatig bellen"],
			VoiceNewCall : ["Nieuwe oproep", "Nieuwe oproep"],
			VoiceHold : ["Wachtstand", "Wachtstand"],
			VoiceRetrieve : ["Terug nemen", "Terug nemen"],
			VoiceHangup : ["Ophangen oproep", "Ophangen oproep"]
		},
		MenuToolStrip : //[ Alt, title]
		{
			menuLabel : ["Opties", "Opties"],
			bntShowHideDetail : ["Weergeven/verbergen detail", "Weergeven/verbergen detail"],
			bntSelectionColumn : ["Weergeven/verbergen selecteer kolommen", "Weergeven/verbergen selecteer kolommen"],
			bntGroupByOption : ["Groep opties", "Groep opties"],
			bntCustomColumns : ["Gebruiker gedefinieerde kolommen", "Gebruiker gedefinieerde kolommen"]
		},
		SupervisionActionToolStrip : //[ Alt, title]
		{
			supervisionActionLabel : ["Supervisie commando", "Supervisie commando"],
			btnSupViewer :  ["Bekijk agent scherm", "Bekijk agent scherm"],
			bntSupListen : ["Luisteren", "Luisteren"],
			bntSupIntrude : ["Indringen", "Indringen"],
			bntSupRecording : ["Start / Stop de opname", "Start / Stop de opname"]
		}		
	},
	Dashboard:
	{	
		dsbAgentCount : "Aantal gebruikers:",
		dsbAgentActiveCount : "Aantal actieve gebruikers:",
		dsbAgentTotalInPause : "Aantal agenten die in pauze zijn:",
		dsbAgentTotalInWaiting : "Aantal agenten die in wacht zijn:",
		dsbAgentTotalOnline : "Aantal agenten die in online zijn:",
		dsbAgentTotalWrapup : "Aantal agenten die in nabeltijd zijn:",
		
		dsbInboundCount : "Aantal inkomende activiteiten:",
		dsbInboundTotalInIvr : "Totaal aantal oproepen in IVR:",
		dsbInboundTotalInQueue : "Totaal aantal wachtende oproepen:",
		dsbInboundTotalOnline : "Totaal aantal online oproepen:",
		dsbInboundTotalWrapup : "Totaal aantal oproepen in nabeltijd:",
		dsbInboundTotalInOverflow : "Totaal aantal oproepen in overflow:",
		dsbInboundTotalReceived : "Totaal aantal ontvangen oproepen:",
		dsbInboundTotalHandledByAgent : "Totaal aantal oproepen behandeld door agenten:",
		
		dsbOutboundCount : "Aantal uitgaande activiteiten:",
		dsbOutboundInModePreview : "Aantal activiteiten in de preview-modus:",
		dsbOutboundInModeProgressive : "Aantal activiteiten in progressieve modus:",
		dsbOutboundInModePredictive : "Aantal activiteiten in predictive modus:",
		dsbOutboundInModeOther : "Aantal activiteiten in andere modi:",
		dsbOutboundInDailing : "Totaal aantal lijnen die worden gebeld:",
		dsbOutboundInWaiting : "Totaal aantal wachtende oproepen:",
		dsbOutboundOnline : "Totaal aantal online oproepen:",
		dsbOutboundTotalAbandoned : "Totaal aantal opgegeven oproepen:",
		dsbOutboundTotalDailed : "Totaal aantal geblede oproepen:",
		
		dsbQueueCount : "Aantal actieve wachtrijen:",
		dsbQueueInQueue : "Aantal aantal contacten in de wachtrij:",
		dsbQueueTotalAbandoned : "Totaal aantal opgegeven contacten:",
		dsbQueueTotalProcessed : "Totaal aantal verwerkte contacten:"
	},
	Buttons :
	{
		_Add : "Toevoegen",
		_Apply : "Toepassen",
		_Cancel : "Annuleren",
		_Edit : "Bewerken",
		_Evaluate : "Evalueer",
		_Ok : "Oke",
		_Remove : "Verwijderen",
		_Reset : "Reset",
		_Save : "bewaren",
		_Submit : "Oke",
		_Help : "Help"
	},	
	LoginScreen: 
	{ 
		_T1 : "Voer uw gebruikersaccount en wachtwoord in, samen met de telefonie-extensie voor spraak contacten:",
		_T2 : "Extensie:",
		_T3 : "Gebruik de volgende identificatie",
		_T4 : "Gebruikersaccount:",
		_T5 : "Wachtwoord:",
		_T6 : "Domein:",
		_T7 : "Kies uw taal:",
		Msg404 : "Wachtwoord of gebruikersaccount is onjuist."
	},
	colAgent:
	{
		Parameters:
		{
			AgentId : ["Agent ID", "De interne GUID (unieke id) van de agent."],
			Account: ["Account", "De login naam van de agent."],
		    Firstname : ["Voornaam", "De voornaam van de agent."],
		    Lastname : ["Achternaam", "De achternaam van de agent."], 
		    SiteId : ["Site", "De site naam waaraan de agent is aangesloten."],
		    Server : ["Server", "Naam van de server waarop de agent is aangesloten."],
		    TeamId : ["Team Id ", "De lijst van team(s) waarop de agent heeft rechten op."],
		    PauseId : ["Pauze Id", "De id van de huidige pauze code."],
		    PauseDescription : ["Pauze omschrijving", "De omschrijving van de huidige pauze."],
		    Groupkey : ["Groep", "De groep naam van de agent."],
		    Active :  ["Actief", "Is agent verwijderd in het systeem."],
			LoginDateTime : ["Inlog tijd", "De begintijd van de agent sessie."],
			LoginDateTimeUtc : ["Login UTC-tijd", "De UTC starttijd van de agent sessie."],
			Extension : ["Extensie", "Huidige extensie van de gebruiker."],
			IpAddress : ["Ip", "Ip adres van de gebruiker."]
		},
	    Realtime : 
	    {
	        StatusIndex : ["StateIndex", "The agent state as a number."],
	        Status : ["State", "The state of the agent."], 
	        StatusStartTime : ["State start", "The start time of the current agent state."],
	        VoiceState : ["Voice state", ""], 
	        VoiceAvailable : ["Voice available", "Is the agent ready for voice media."],
	        ChatState : ["Chat state", ""],
	        ChatAvailable : ["Chat available", "Is the agent ready for chat media."],
	        EmailState : ["Email state", ""],
	        EmailAvailable : ["Email available", "Is the agent ready for E-mail media."],
	        ListCurrentContactId : ["All contacts", "A list of all the contact ids of the agent."],
	        ActiveContactId : ["Active voice", "The active voice contact id."],
			PerQueWaiting : ["Q Waiting","Number of contacts waiting in the personnel queue of the user."],
			PerQueAbandoned : ["Q abandoned","Number of contacts abandoned in the personnel queue of the user."],
			PerQueProcessed : ["Q processed","Number of contacts processed in the personnel queue of the user."],
			PerQueEnQueue : ["Q queued","Number of contacts queued in the personnel queue of the user."]
	    },
	    History : 
	    {
	        Undefined : ["Undefined", "Number of occurrence in the undefined state."],
	        Pause : ["Pause occ.", "Number of occurrence in the pause state."], 
	        Off : ["Off occ.", "Number of occurrence in the off state."],
	        Waiting : ["Waiting occ.", "Number of occurrence in waiting state."], 
	        Wrapup : ["Wrap-up occ.", "Number of occurrence in the wrap-up state."],
	        WrapupInbound : ["In wrap-up", "Number of occurrence in inbound wrap-up."],
	        WrapupOutbound : ["Out wrap-up", "Number of occurrence in outbound wrap-up."],
	        WrapupEMail : ["E-mail wrap-up", "Number of occurrence in e-mail wrap-up."],
	        WrapupChat : ["Chat wrap-up", "Number of occurrence in chat wrap-up."],
	        Online : ["Online occ.", "Number of occurrence in the online state."],
	        HandelingInbound : ["In online", "Number of occurrence in inbound online."],
	        HandelingOutbound : ["Out online", "Number of occurrence in outbound online."],
	        HandelingEMail : ["E-mail online", "Number of occurrence in e-mail online."],	        
			HandelingChat : ["Chat online", "Number of occurrence in chat online."],
	        ContactHandled : ["Contacts handled", "Number of contacts handled."],
	        ContactInboundHandled : ["Contacts in handled", "Number of inbound calls handled."],
	        ContactOutboundHandled : ["Contacts out handled", "Number of outbound calls handled."],
	        ContactEMailHandled : ["Contacts e-mail handled", "Number of e-mails handled."],
	        ContactChatHandled : ["Contacts chat handled", "Number of chats handled."],
        	ContactMsgSend :  ["Msg send", "Message send by the agent."], //to do
			ContactMsgReceived :  ["Msg Received", "Message received by the agent."], //todo
	        UndefinedTime : ["Undefined time", "Time spent in the undefined state."],
	        PauseTime : ["Pause time", "Time spent in the pause state."],
	        OffTime : ["Off time", "Time spent in the off state."],
	        WaitingTime : ["Waiting time", "Time spent in the waiting state."],
	        WrapupStateTime : ["Wrapup time", "Time spent in the wrap-up state."],
	        WrapupInboundTime : ["In wrap-up", "Time spent in the inbound wrap-up state."],
	        WrapupOutboundTime : ["Out wrap-up", "Time spent in outbound wrap-up."],
	        WrapupEMailTime : ["E-mail wrap-up", "Time spent in e-mail wrap-up."],
	        WrapupChatTime : ["Chat wrap-up", "Time spent in chat wrap-up."],
	        OnlineTime : ["Online time", "Time spent in the online state."],
	        HandelingInboundTime : ["In online time", "Time spent in the inbound online."],
	        HandelingOutboundTime : ["Out online time", "Time spent in outbound online."],
	        HandelingEMailTime : ["E-mail online time", "Time spent in e-mail online."],
	        HandelingChatTime : ["Chat online time", "Time spent in chat online."],
	        ContactHandledTime : ["Contacts handled time", "Time spent for all handled contacts."],
	        ContactInboundHandledTime : ["Contacts in handled time", "Time spent for handled inbound calls."],
	        ContactOutboundHandledTime : ["Contacts out handled time", "Time spent for handled outbound calls."],
	        ContactEMailHandledTime : ["Contacts e-mail handled time", "Time spent for handled e-mails."],
	        ContactChatHandledTime : ["Contacts chat handled time", "Time spent for handled chats."],
	        Preview : ["Preview occ.", "Number of occurrence in the preview state."],
	        PreviewTime : ["Preview time", "Time spent in the preview state."],			
			HistoryTimeGraph : ["HistoryTimeGraph", ""]
	    }
	},
	colInbound: {
		Parameters: {
			Id: ["Id", "The unique identifier of the inbound activity."],
			Description: ["Description", "Description of the activity."],
			GroupKey: ["Group", ""],
			CampaignId: ["CampaignId", "The campaign identifier."],
			CampaignName: ["Campaign", "The name of the campaign."],
			MediaType: ["Media", "Media type for this activity (Voice, E-mail, chat, ...)"],
			MediaTypeId: ["Media id", "Media type id for this activity"]
		},
		Realtime: {
			ActiveContacts: ["Active", "Number of active voice contacts."],
			SystemPreprocessing: ["System pre-processing", "Number of contacts in system pre-processing"],
			Closing : ["Closing", "Number of contact in closing"],
			Ivr: ["IVR", "Number of contacts in IVR."],
			Waiting: ["Waiting", "Number of contacts in waiting."],
			Online: ["Online", "Number of contacts online."],
			WrapUp: ["Wrap-up", "Number of contacts in wrap-up."],
			Overflowing: ["Overflow", "Contact with the overflow flag."],
			Transfer: ["Transfer", "Contacts in transfer."],
			MaxQueueTime: ["Max queue", "Longest waiting contact."],
			AgentInReady  : ["Agenten klaar", "Het aantal agenten die klaar staan op deze wachtrij."],
        	ContactMsgSend :  ["Msg send", "Message send by the agent."], //to do
			ContactMsgReceived :  ["Msg Received", "Message received by the agent."], //todo
			RealTimeGraph: ["RealTimeGraph", ""]
		},
		History: {
			Received: ["Received occ.", "Contacts received."],
			ReceivedTime: ["Received total time", "Time spent by all received contacts."],
			Closed: ["Closed occ.", "Contacts during closing hours."],
			ClosedTime: ["Closed total time", "Total time spent by contacts during closing time."],
			EndInSystemProcessing: ["End before IVR", "Contacts ended before IVR."],
			EndInSystemProcessingTime: ["End before IVR total time", "Total time spent by contacts that where ended before IVR."],
			EndInIvr: ["End in IVR", "Contacts ended in IVR."],
			EndInIvrTime: ["End in IVR total time", "Total time spent by contacts that ended in IVR."],
			IvrFinish: ["IVR success", "Contacts successful finished in the IVR."],
			IvrFinishTime: ["IVR success total time", "Total time spent by contacts that where successful finished in the IVR."],
			IvrAbandoned: ["IVR abandon", "Contacts abandon in the IVR."],
			IvrAbandonedTime: ["IVR abandon total time", "Total time spent by contacts abandon in the IVR."],
			Abandoned: ["Abandoned", "Contacts abandoned."],
			AbandonedTime: ["Abandoned total time", "Total time spent by abandon contacts."],
			HandledByAgent: ["Agent", "Contacts that went to an agent."],
			HandledByAgentTime: ["Agent total time", "Total time spent by contacts that went to an agent."],
			OverflowedCount: ["Overflow count", "How many time was the overflow triggered."],
			OverflowedContact: ["Overflow contacts", "How many contact had the overflow flag."],
			Waiting: ["Waiting", "Contacts that waited before going to an agent."],
			WaitingTime: ["Waiting total time", "Total time spent by contact that waited before going to an agent."],
			Direct: ["Direct", "Contacts that didn't wait before going to an agent."],
			DirectTime: ["Direct total time", "Total time spent by contact that didn't wait before going to an agent."],
			Transfer: ["Transfered", "Contacts that where transfer."],
			TransferTime: ["Transfered total time", "Total time spent by contacts that where transfer."],
        	ContactMsgSend :  ["Msg send", "Message send by the agent."], //to do
			ContactMsgReceived :  ["Msg Received", "Message received by the agent."], //todo
			HistoryGraph: ["HistoryGraph", ""]
		}
	},
	colOutbound :
	{
	    Parameters :
	    {
	        Mode : ["Dial mode", "Dialling mode for this activity."],
	        Id : ["Id", "The unique identifier of the outbound activity."], 
	        Description : ["Description", "Description of the activity."],
	        GroupKey : ["Group", ""], 
	        CampaignId : ["CampaignId", "The campaign identifier."],
	        CampaignName : ["Campaign", "The name of the campaign."],
			MediaType: ["Media", "Media type for this activity (Voice, E-mail, chat, ...)"],
			MediaTypeId: ["Media id", "Media type id for this activity"]
	    },
	    Realtime : 
	    {
	        SystemPreprocessing : ["Dialling", "Number of contacts in system pre-processing."],
			Closing : ["Closing", "Number of contact in closing"],			
	        Ivr : ["IVR", "Number of contacts in IVR."], 
	        Waiting : ["Waiting", "Number of contacts in waiting."],
	        Online : ["Online", "Number of contacts in online."], 
	        WrapUp : ["Wrap-up", "Number of contacts in wrap-up."],
			Overflowing: ["Overflow", "Contact with the overflow flag."],
			Transfer: ["Transfer", "Contacts in transfer."],
			Preview: ["Preview", "Contacts in preview."],
	        RealTimeGraph : ["RealTimeGraph", ""]
	    },  
	    History : 
	    {
	        Dialled : ["Dialled", "Contacts dialled."],
	        DialledTime : ["Dialled total time", "Total time spent by all the contacts."], 
	        EndInSystemProcessing : ["End in system", "Contacts ended in system pre-processing"],
	        EndInSystemProcessingTime : ["End in system total time", "Total time spent by contacts that where ended in system pre-processing."], 
	        EndInIvr : ["End in IVR", "Contacts ended in IVR."],
	        EndInIvrTime : ["End in IVR total time", "Total time spent by contacts that ended in IVR."],
			IvrFinish: ["IVR success", "Contacts successful finished in the IVR."],
			IvrFinishTime: ["IVR success total time", "Total time spent by contacts that where successful finished in the IVR."],
			IvrAbandoned: ["IVR abandon", "Contacts abandon in the IVR."],
			IvrAbandonedTime: ["IVR abandon total time", "Total time spent by contacts abandon in the IVR."],			
	        Abandoned : ["Abandoned", "Contacts abandoned."],
	        AbandonedTime : ["Abandoned total time", "Total time spent by abandon contacts."],
			OverflowedCount: ["Overflow count", "How many time was the overflow triggered."],
			OverflowedContact: ["Overflow contacts", "How many contact had the overflow flag."],
	        ToAgent : ["Agent", "Contacts that went to an agent."],
	        ToAgentTime : ["Agent total time", "Total time spent by contacts that went to an agent."],
	        Direct : ["Direct", "Contacts that didn't wait before going to an agent."],
	        DirectTime : ["Direct total time", "Total time spent by contact that didn't wait before going to an agent."],
	        Waiting : ["Waiting", "Contacts that waited before going to an agent."],
	        WaitingTime : ["Waiting total time", "Total time spent by contact that waited before going to an agent."],
			Transfer: ["Transfered", "Contacts that where transfer."],
			TransferTime: ["Transfered total time", "Total time spent by contacts that where transfer."],
	        ToAgentGraph : ["ToAgentGraph", ""],
	        HistoryGraph : ["HistoryGraph", ""]
	    },
		ContactListInfo :
		{
			ContactCount : ["Contact #","Number of contacts in the contact list"],
			ContactToDial : ["To dial","Number of contacts that can be dialled"],
			ContactNeverDialed : ["Never dialled","Number of contact that have never been dialled"],
			ContactCallbacks : ["Call backs","Number of contacts to call back"],
			ContactToRedial : ["To redial","Number of contacts to redial"],
			ContactToNotRedial : ["To not dial","Number of contact that will not be dialled"],
			ContactListGraph : ["Contact list graph",""]
		}		
	    
	},
	colQueue :  
	{
	    Parameters :
	    {
	        Id : ["Id", "The unique identifier of the queue."],
	        Description : ["Description", "Description of the queue."], 
	        GroupKey : ["Group", "The group name of the queue."]
	    },
	    Realtime : 
	    {
	        Waiting : ["Waiting", "Number of contacts waiting in this queue."],
	        MaxWaiting  : ["Max waiting", "The real time maximum waiting time."],
			AgentInReady  : ["Agenten klaar", "Het aantal agenten die klaar staan op deze wachtrij."]
	    },
	    History : 
	    {
	        Received  : ["Queued", "Contact that where in the queue"],
	        ReceivedTime : ["Queued total time", "Total time spent by all the contacts in this queue."],	        
			Processed : ["Processed", "Contacts processed by the system."],
	        ProcessedTime : ["Processed total time", "Total time spent by processed contacts."],
	        ProcessedDirect : ["Processed direct", "Contacts processed by the system without waiting time."],
	        ProcessedDirectTime : ["Processed direct total time", "Total time spent by Processed Direct contacts."],
	        ProcessedWaiting : ["Processed waiting", "Contacts processed by the system with waiting time."],
	        ProcessedWaitingTime : ["Processed waiting total time", "Total time spent by Processed Waiting contacts."],
			ProcessedOverflow : ["Processed overflow", "Contacts processed by the system that went to overflow."], 
			ProcessedOverflowTime : ["Processed overflow total time", "Total time spent by processed contacts that went to overflow."], 
	        Abandoned : ["Abandoned", "Contacts abandoned."],
	        AbandonedTime : ["Abandoned total time", "Total time spent by abandon contacts."],
	        MaxQueueSize : ["Max in queue", "Maximum number of contacts in this queue at the same time."],
	        MaxWaitingTime : ["Max waiting time", "The maximum time a contact had to wait in the queue."],
	        HistoryGraph : ["HistoryGraph", ""]
	    }
	},
	colTeam :
	{
	    Parameters :
	    {
	        Id : ["Id", "The unique identifier of the team."],
	        Description : ["Description", "Description of the team."], 
	        Group : ["Group", "The group name of the team."],
	        Agents : ["Agents", "Number of agents in this team."], 
	        Queues : ["Queues", "Number of queues link with this team."], 
	        AgentsLogonGraph : ["AgentGraph", ""]
	    },
	    Realtime : 
	    {
	        AgentsLogon : ["Agents logon", "Number of agents currently logon that has rights for this team."],
	        AgentsInPause : ["AgentsInPause", "Number of agent that have rights on this team that are in pause state."], 
	        AgentsInWaiting : ["AgentsInWaiting", "Number of agent that have rights on this team that are in waiting state."],
	        AgentsOnline : ["AgentsOnline", "Number of agent that have rights on this team that are in online state."], 
	        AgentsInWrapup : ["AgentsInWrapup", "Number of agent that have rights on this team that are in wrap-up state."],
	        WaitingInQueue : ["WaitingInQueue", "Number of waiting contact in all the queues that are link with this team."],
	        RealTimeGraph : ["RealTimeGraph", ""]
	    }    
	},
	colCampaign :
	{
	    Parameters :
	    {
	        Id : ["Id", "The unique identifier of the campaign."],
	        Description : ["Description", "Description of the campaign."], 
	        Group : ["Group", "The group name of the campaign."],
	        Inbound : ["Inbound", ""], 
	        InboundCount : ["InboundCount", "Number of inbound activities for this campaign."],
	        Outbound : ["Outbound", ""], 
	        OutboundCount : ["OutboundCount", "Number of outbound activities for this campaign."]    
	    },
		ContactListInfo :
		{
			ContactCount : ["Contact #","Number of contacts in the contact list"],
			ContactToDial : ["To dial","Number of contacts that can be dialled"],
			ContactNeverDialed : ["Never dialled","Number of contact that have never been dialled"],
			ContactCallbacks : ["Call backs","Number of contacts to call back"],
			ContactToRedial : ["To redial","Number of contacts to redial"],
			ContactToNotRedial : ["To not dial","Number of contact that will not be dialled"]
		}				
	},
	colCommon: 
	{
	    Production : 
	    {
	        PositiveCount : ["Positive #", "Number of positive contact qualification"],
	        PositiveSum : ["Positive sum", "Sum of positive contact qualification value"],
	        NegativeCount : ["Negative #", "Number of negative contact qualification"],
	        NegativeSum : ["Negative sum", "Sum of negative contact qualification value"],
	        ArguedCount : ["Argued #", "Number of argued contact qualification"],
	        TotalQualified : ["Total qualified", "Number of contacts that received a contact qualification"],
	        TotalNotQualified : ["Total not qualified", "Number of contacts that didn't received a contact qualification"],
			DialingActionTime : ["Time dialling action", "The total time of the dialling action."],
			DialingActionPosTime : ["Time dialling action pos", "The total time of the dialling action for positive contacts."],
			DialingActionNegTime : ["Time dialling action neg", "The total time of the dialling action for negative contacts."],
			DialingActionArgTime : ["Time dialling action arg", "The total time of the dialling action for argued contacts."],
			OnlineActionTime : ["Time online action", "The total time of the online action."],
			OnlineActionPosTime : ["Time online action pos", "The total time of the online action for positive contacts."],
			OnlineActionNegTime : ["Time online action neg", "The total time of the online action for negative contacts."],
			OnlineActionArgTime : ["Time online action arg", "The total time of the online action for argued contacts."],
			OnHoldActionTime : ["Time on hold action", "The total time of the on hold action."],
			OnHoldActionPosTime : ["Time on hold action pos", "The total time of the on hold action for positive contacts."],
			OnHoldActionNegTime : ["Time on hold action neg", "The total time of the on hold action for negative contacts."],
			OnHoldActionArgTime : ["Time on hold action arg", "The total time of the on hold action for argued contacts."],
			WrapUpActionTime : ["Time wrap-up action", "The total time of the wrap-up action."],
			WrapUpActionPosTime : ["Time wrap-up action pos", "The total time of the wrap-up action for positive contacts."],
			WrapUpActionNegTime : ["Time wrap-up action neg", "The total time of the wrap-up action for negative contacts."],
			WrapUpActionArgTime : ["Time wrap-up action arg", "The total time of the wrap-up action for argued contacts."],
			CommunicationActionTime : ["Com time", "The total time of communication. (online action  + on hold action)"],
			CommunicationActionPosTime : ["Com time pos", "The total time of communication for positive contacts. (online action  + on hold action)"],
			CommunicationActionNegTime : ["Com time neg", "The total time of communication for negative contacts. (online action  + on hold action)"],
			CommunicationActionArgTime : ["Com time arg", "The total time of communication for argued contacts. (online action  + on hold action)"],
			WorkActionTime : ["Work time", "The total work time. (communication + wrap-up action)"],
			WorkActionPosTime : ["Work time pos", "The total work time for positive contacts. (communication + wrap-up action)"],
			WorkActionNegTime : ["Work time neg", "The total work time for negative contacts. (communication + wrap-up action)"],
			WorkActionArgTime : ["Work time arg", "The total work time for argued contacts. (communication + wrap-up action)"],
			CompletedContacts : ["Completed contacts", "Contact that are completed."],
			CompletedContactsTime : ["Completed contacts time", "Time spend for contact that are completed."],
			AvgArgComTime : ["Avg arg com time", "Average communication time for argued contacts."],
			AvgArgWorkTime : ["Avg arg work time", "Average work time for argued contacts."],
			AvgPosComTime : ["Avg pos com time", "Average communication time for positive contacts."],
			AvgPosWorkTime : ["Avg pos work time", "Average work time for positive contacts."],
			AvgNegComTime : ["Avg neg com time", "Average communication time for negative contacts."],
			AvgNegWorkTime : ["Avg neg work time", "Average work time for negative contacts."],			
	        RatioTotQual_Tot : ["TotQual/Tot", "Ratio of total qualified contacts against total contacts"],
	        RatioArg_Tot : ["Arg/Tot", "Ratio of argued contact against total contacts"],
	        RatioArg_TotQual : ["Arg/TotQual", "Ratio of argued contact against total qualified contacts"],
	        RatioPos_Tot : ["Pos/Tot", "Ratio of positive contact against total contacts"],
	        RatioPos_TotQual : ["Pos/totQual", "Ratio of positive contact against total qualified contacts"],
			RatioPos_Arg :	["Pos/Arg", "Ratio of positive contact against argued contacts"],
			RatioNeg_Tot: ["Neg/Tot", "Ratio of negative contact against total contacts"],
			RatioNeg_TotQual: ["Neg/TotQual", "Ratio of negative contact against total qualified contacts"],
			RationNeg_Arg: ["Neg/Arg", "Ratio of negative contact against total contacts"],
			AvgPosValue: ["Avg pos", "Average positive value"],
			AvgNegValue: ["Avg neg", "Average negative value"],
			sys_Reset : ["SystemReset", "Used by the system"],
			RatioTotQual_TotGraph: ["TotQual/Tot graph", "Graphical view ratio of total qualified contacts against total contacts"],
			RatioArg_TotQualGraph: ["Arg/TotQual graph", "Graphical view ratio of argued argued against total qualified contacts"],
			RatioPos_TotQualGraph: ["Pos/totQual graph", "Graphical view ratio of argued positive against total qualified contacts"],
			RatioNeg_TotQualGraph: ["Neg/TotQual graph", "Graphical view ratio of argued negative against total qualified contacts"]
	    }, 
	    PeriodProduction : 
	    {
	        PositiveCount : ["Positive # /H", "Number of positive contact qualification. Hour based."],
	        PositiveSum : ["Positive sum /H", "Sum of positive contact qualification value. Hour based."],
	        NegativeCount : ["Negative # /H", "Number of negative contact qualification. Hour based."],
	        NegativeSum : ["Negative sum /H", "Sum of negative contact qualification value. Hour based."],
	        ArguedCount : ["Argued # /H", "Number of argued contact qualification. Hour based."],
	        TotalQualified : ["Total qualified /H", "Number of contacts that received a contact qualification. Hour based."],
	        TotalNotQualified : ["Total not qualified /H", "Number of contacts that didn't received a contact qualification. Hour based."],
			DialingActionTime : ["Time dialling action /H", "The total time of the dialling action. Hour based."],
			DialingActionPosTime : ["Time dialling action pos /H", "The total time of the dialling action for positive contacts. Hour based."],
			DialingActionNegTime : ["Time dialling action neg /H", "The total time of the dialling action for negative contacts. Hour based."],
			DialingActionArgTime : ["Time dialling action arg /H", "The total time of the dialling action for argued contacts. Hour based."],
			OnlineActionTime : ["Time online action /H", "The total time of the online action. Hour based."],
			OnlineActionPosTime : ["Time online action pos /H", "The total time of the online action for positive contacts. Hour based."],
			OnlineActionNegTime : ["Time online action neg /H", "The total time of the online action for negative contacts. Hour based."],
			OnlineActionArgTime : ["Time online action arg /H", "The total time of the online action for argued contacts. Hour based."],
			OnHoldActionTime : ["Time on hold action /H", "The total time of the on hold action. Hour based."],
			OnHoldActionPosTime : ["Time on hold action pos /H", "The total time of the on hold action for positive contacts. Hour based."],
			OnHoldActionNegTime : ["Time on hold action neg /H", "The total time of the on hold action for negative contacts. Hour based."],
			OnHoldActionArgTime : ["Time on hold action arg /H", "The total time of the on hold action for argued contacts. Hour based."],
			WrapUpActionTime : ["Time wrap-up action /H", "The total time of the wrap-up action. Hour based."],
			WrapUpActionPosTime : ["Time wrap-up action pos /H", "The total time of the wrap-up action for positive contacts. Hour based."],
			WrapUpActionNegTime : ["Time wrap-up action neg /H", "The total time of the wrap-up action for negative contacts. Hour based."],
			WrapUpActionArgTime : ["Time wrap-up action arg /H", "The total time of the wrap-up action for argued contacts. Hour based."],
			CommunicationActionTime : ["Com time /H", "The total time of communication. (online action  + on hold action). Hour based."],
			CommunicationActionPosTime : ["Com time pos /H", "The total time of communication for positive contacts. (online action  + on hold action). Hour based."],
			CommunicationActionNegTime : ["Com time neg /H", "The total time of communication for negative contacts. (online action  + on hold action). Hour based."],
			CommunicationActionArgTime : ["Com time arg /H", "The total time of communication for argued contacts. (online action  + on hold action). Hour based."],
			WorkActionTime : ["Work time /H", "The total work time. (communication + wrap-up action). Hour based."],
			WorkActionPosTime : ["Work time pos /H", "The total work time for positive contacts. (communication + wrap-up action). Hour based."],
			WorkActionNegTime : ["Work time neg /H", "The total work time for negative contacts. (communication + wrap-up action). Hour based."],
			WorkActionArgTime : ["Work time arg /H", "The total work time for argued contacts. (communication + wrap-up action). Hour based."],
			CompletedContacts : ["Completed contacts", "Contact that are completed."],
			CompletedContactsTime : ["Completed contacts time", "Time spend for contact that are completed."],
			AvgArgComTime : ["Avg arg com time /H", "Average communication time for argued contacts. Hour based."],
			AvgArgWorkTime : ["Avg arg work time /H", "Average work time for argued contacts. Hour based."],
			AvgPosComTime : ["Avg pos com time /H", "Average communication time for positive contacts. Hour based."],
			AvgPosWorkTime : ["Avg pos work time /H", "Average work time for positive contacts. Hour based."],
			AvgNegComTime : ["Avg neg com time /H", "Average communication time for negative contacts. Hour based."],
			AvgNegWorkTime : ["Avg neg work time /H", "Average work time for negative contacts. Hour based."],
	        RatioTotQual_Tot : ["TotQual/Tot /H", "Ratio of total qualified contacts against total contacts. Hour based."],
	        RatioArg_Tot : ["Arg/Tot /H", "Ratio of argued contact against total contacts. Hour based."],
	        RatioArg_TotQual : ["Arg/TotQual /H", "Ratio of argued contact against total qualified contacts."],
	        RatioPos_Tot : ["Pos/Tot /H", "Ratio of positive contact against total contacts."],
	        RatioPos_TotQual : ["Pos/totQual /H", "Ratio of positive contact against total qualified contacts. Hour based."],
			RatioPos_Arg :	["Pos/Arg /H", "Ratio of positive contact against argued contacts. Hour based."],
			RatioNeg_Tot: ["Neg/Tot /H", "Ratio of negative contact against total contacts. Hour based."],
			RatioNeg_TotQual: ["Neg/TotQual /H", "Ratio of negative contact against total qualified contacts. Hour based."],
			RationNeg_Arg: ["Neg/Arg /H", "Ratio of negative contact against total contacts. Hour based."],
			AvgPosValue: ["Avg pos /H", "Average positive value. Hour based."],
			AvgNegValue: ["Avg neg /H", "Average negative value. Hour based."],
			sys_Reset : ["SystemReset", "Used by the system"],
			RatioTotQual_TotGraph: ["TotQual/Tot graph /H", "Graphical view ratio of total qualified contacts against total contacts. Hour based."],
			RatioArg_TotQualGraph: ["Arg/TotQual graph /H", "Graphical view ratio of argued argued against total qualified contacts. Hour based."],
			RatioPos_TotQualGraph: ["Pos/totQual graph /H", "Graphical view ratio of argued positive against total qualified contacts. Hour based."],
			RatioNeg_TotQualGraph: ["Neg/TotQual graph /H", "Graphical view ratio of argued negative against total qualified contacts. Hour based."]
	    }		
	}
}