//Toolbar settings
var const_ToolbarConfig =
{
	AgentToolStrip : true,
	AgentToolStripButtons :
	{
		WaitForCall : true,
		WaitForMail : true,
		WaitForChat : true,
		TeamSelection :false,
		Pause : true,
		PriorityPickup : true,
		CloseScript : true,
		Selectqual : true,
		SearchMode : true
	},
	VoiceToolStrip : true,
	VoiceToolStripButtons :
	{
		VoiceNewCall : true,
		VoiceHold : true,
		VoiceRetrieve : true,
		VoiceTransfer : true,
		VoiceConference : true,
		VoiceForward : true,
		VoiceHangup : true	
	},
	MailToolStrip : true,
	MailToolStripButtons :
	{
		MailReply : true,
		MailForward : true
	},
	ChatToolStrip : true,
	ChatToolStripButtons :
	{
		ChatHold : true,
		ChatRetrieve : true,
		ChatHangup : true,
		VoiceTransfer : true,
		VoiceConference : true,
		VoiceForward : true,
		VoiceHangup : true	
	}
}
//System var
var const_Debug = false;
var const_DebugToolbar = false;
var const_WaitingScreenV2 = false;
//Info
//___________________
var const_AgentVersionManjor = "1";
var const_AgentVersionMinor = "22";
var const_AgentVersionBuild = "4";
var const_AgentVersionRevision = "31";
//var const_AgentVersionDisplay = const_AgentVersionManjor + "." + const_AgentVersionMinor + '.' + const_AgentVersionBuild + '.' + const_AgentVersionRevision;
var const_AgentVersionDisplay = "3.0"; 
var const_AgentVersionFull = const_AgentVersionManjor + "." + const_AgentVersionMinor + '.' + const_AgentVersionBuild;
//User
var CrResource = CrResource;
var PerviewDirectDial = false;
/************************************
 * 									*
 * 				English				*
 * 									*
 ************************************/
/*
 * tooltips: [ Alt, title]
 * button img : [default, mouseover, focus, disabled]
 */	
var CrResource = 
{
	ContactState: 
	{
		Alerting : "Alerting",
		Connected : "Connected",
		Disconnected : "Disconnected",
		Preview : "Preview"
	},
	Common : 
	{
		LoadingMsg : "Loading..."
	},
	newContactForm : 
	{
		title : "Manual call",
		buttonDial : ["img\\btnPad_Dial.png", "img\\btnPadOver_Dial.png", "img\\btnPad_Dial.png", "img\\btnPad_Dial.png"],
		buttonClear : ["img\\btnPad_Clear.png", "img\\btnPadOver_Clear.png", "img\\btnPad_Clear.png", "img\\btnPad_Clear.png"],
		statusEnterNumber: "Enter number...",
		statusWaiting: "Waiting..."		
	},
	QualificationForm : 
	{
		title : "Choose qualification"
	},
	pagePause : 
	{
		_T1 : "Agent is currently in pause",
		_T2 : "Click on ready to start working"
	},
	pageWaiting : 
	{
		_T1 : "Waiting for contact"
	},
	contactTab : 
	{
		buttonDestination : "Dest:",
		buttonOriginator : "Orig:"
	},
	toolbar: 
	{
		AgentToolStrip : 
		{
			//[ Alt, title]
			agentLabel : ["Agent commands", "Agent commands"],
			WaitForCall : ["Ready", "Ready"],
			WaitForMail : ["Wait for mail", "Wait for mail"],
			WaitForChat : ["Wait for chat", "Wait for chat"],
			TeamSelection : ["Team selection", "Team selection"],
			Pause : ["Break","Break"],
			PriorityPickup : ["Priority pickup","Priority pickup"],
			CloseScript : ["Quit","Quit"],
			Selectqual : ["Select qualification","Select qualification"],
			SearchMode : ["Search Mode","Search Mode"],
			
			VoiceNewCall : ["Manual dial", "Manual dial"], //Added V3
			AgentLogout : ["Quit", "Quit"], //Added V3
			SendAlert : ["Send alert", "Send alert"], //Added V3
			Pickup : ["Contact Pickup", "Contact Pickup"], //Added V3
		},
		VoiceToolStrip : 
		{
			//[ Alt, title]
			voiceLabel : ["Voice commands" ,"Voice commands"],
			VoiceNewCall : ["New call", "New call"],
			VoiceHold : ["Hold call", "Hold call"],
			VoiceRetrieve : ["Retrieve call", "Retrieve call"],
			VoiceTransfer : ["Transfer call", "Transfer call"],
			VoiceConference : ["Conference call", "Conference call"],
			VoiceForward : ["Forward call", "Forward call"],
			VoiceHangup : ["Hang up call", "Hang up call"]
		},
		MailToolStrip : 
		{
			//[ Alt, title]
			mailLabel : ["Mail commands" ,"Mail commands"],
			MailNewMail : ["New mail", "New mail"],
			MailReply : ["Reply mail", "Reply mail"],
			MailForward : ["Forward mail", "Forward mail"]
		},
		ChatToolStrip : 
		{
			//[ Alt, title]
			chatLabel : ["Chat commands" ,"Chat commands"],
			ChatNewChat : ["New chat", "New chat"],
			ChatHold : ["Hold chat", "Hold chat"],
			ChatRetrieve : ["Retrieve chat", "Retrieve chat"],
			ChatHangup : ["Close chat", "Close chat"]
		}
		
	},
	infoBox :
	{
		title : "Info",
		titleAgt : " Agent information",
		titleQueue : " Queue information",
		titleContact : " Contact information",
		agtName : "Name",
		agtAccount : "Account",
		queueWaiting : "Waiting",
		queuePriority : "Priority",
		contactState : "State",
		contactTo : "From",
		contactFrom : "To"
	}	
}

/************************************
 * 									*
 * 				French				*
 * 									*
 ************************************/
var CrResource_Fr = 
{
	ContactState: 
	{
		Alerting : "Alerting", //TO DO
		Connected : "Connected", //TO DO
		Disconnected : "Disconnected", //TO DO
		Preview : "Preview" //TO DO
	},
      Common : 
      {
            LoadingMsg : "Chargement..."
      },
      newContactForm : 
      {
            title : "Appel manuel",
            buttonDial : ["img\\btnPad_Dial.png", "img\\btnPadOver_Dial.png", "img\\btnPad_Dial.png", "img\\btnPad_Dial.png"],
            buttonClear : ["img\\btnPad_Clear.png", "img\\btnPadOver_Clear.png", "img\\btnPad_Clear.png", "img\\btnPad_Clear.png"],
            statusEnterNumber: "Composer le numéro...",
            statusWaiting: "En attente..."        
      },
      QualificationForm : 
      {
            title : "Choisir la qualification"
      },
      pagePause : 
      {
            _T1 : "En pause",
            _T2 : "Cliquer sur ‘Prêt’ pour démarrer"
      },
      pageWaiting : 
      {
            _T1 : "En attente d’un contact "
      },
      contactTab : 
      {
            buttonDestination : "Dest:",
            buttonOriginator : "Orig:"
      },
      toolbar: 
      {
            AgentToolStrip : 
            {
                  //[ Alt, title]
                  agentLabel : ["Commandes agent", " Commandes agent"],
                  WaitForCall : ["Prêt pour appel", "Prêt pour appel"],
                  WaitForMail : ["Prêt pour mail", "Prêt pour mail"],
                  WaitForChat : ["Prêt pour chat", "Prêt pour chat"],
				  TeamSelection : ["Select active teams", "Select active teams"], //TO DO
                  Pause : ["Pause","Pause"],
                  PriorityPickup : ["Vip","Vip"],
                  CloseScript : ["Fermer le script ","Fermer le script"],
                  Selectqual : ["Choisir la qualification","Choisir la qualification"],
			SearchMode : ["SearchMode","SearchMode"]
            },
            VoiceToolStrip : 
            {
                  //[ Alt, title]
                  voiceLabel : ["Commandes voix" ,"Commandes voix"],
                  VoiceNewCall : ["Nouvel appel", "Nouvel appel"],
                  VoiceHold : ["Mettre en attente", "Mettre en attente"],
                  VoiceRetrieve : ["Reprendre", "Reprendre"],
                  VoiceTransfer : ["Transférer", "Transférer"],
                  VoiceConference : ["Conférence", "Conférence"],
                  VoiceForward : ["Renvoyer", "Renvoyer"],
                  VoiceHangup : ["Raccrocher", "Raccrocher"]
            },
            MailToolStrip : 
            {
                  //[ Alt, title]
                  mailLabel : ["Commandes mail" ,"Commandes mail"],
                  MailNewMail : ["Nouveau mail", "Nouveau mail"],
                  MailReply : ["Répondre", "Répondre"],
                  MailForward : ["Renvoyer", "Renvoyer"]
            },
            ChatToolStrip : 
            {
                  //[ Alt, title]
                  chatLabel : ["Commandes chat" ,"Commandes chat"],
                  ChatNewChat : ["Nouveau chat", "Nouveau chat"],
                  ChatHold : ["Mettre en attente", "Mettre en attente"],
                  ChatRetrieve : ["Reprendre", "Reprendre"],
                  ChatHangup : ["Terminer", "Terminer"]
            }
            
      },
      infoBox :
      {
            title : "Info",
            titleAgt : " Information agent",
            titleQueue : " Information file",
            titleContact : " Information contact",
            agtName : "Nom",
            agtAccount : "Compte",
            queueWaiting : "Attente",
            queuePriority : "VIP",
            contactState : "Etat",
            contactTo : "De",
            contactFrom : "A"
      }     
}

/************************************
 * 									*
 * 				Dutch				*
 * 									*
 ************************************/
/*
 * tooltips: [ Alt, title]
 * button img : [default, mouseover, focus, disabled]
 */	
var CrResource_Nl = 
{
	ContactState: 
	{
		Alerting : "Waarschuwen",
		Connected : "Verbonden",
		Disconnected : "Verbroken",
		Preview : "Voorbeeld "
	},	
	Common : 
	{
		LoadingMsg : "Laden..."
	},
	newContactForm : 
	{
		title : "Manual call",
		buttonDial : ["img\\btnPad_Dial.png", "img\\btnPadOver_Dial.png", "img\\btnPad_Dial.png", "img\\btnPad_Dial.png"],
		buttonClear : ["img\\btnPad_Clear.png", "img\\btnPadOver_Clear.png", "img\\btnPad_Clear.png", "img\\btnPad_Clear.png"],
		statusEnterNumber: "Enter number...",
		statusWaiting: "Waiting..."		
	},
	QualificationForm : 
	{
		title : "Kies kwalificatie"
	},
	pagePause : 
	{
		_T1 : "Agent is momenteel in pauze",
		_T2 : "Klik op klaar om te gaan werken"
	},
	pageWaiting : 
	{
		_T1 : "Wachten op contacten"
	},
	contactTab : 
	{
		buttonDestination : "Dest:",
		buttonOriginator : "Orig:"
	},
	toolbar: 
	{
		AgentToolStrip : 
		{
			//[ Alt, title]
			agentLabel : ["Agent commando's", "Agent commando's"],
			WaitForCall : ["Wachten voor oproepen", "Wachten voor oproepen"],
			WaitForMail : ["Wachten op mails", "Wachten op mails"],
			WaitForChat : ["Wachten voor chatten", "Wachten voor chatten"],
			TeamSelection : ["Mogelijke teams", "Mogelijke teams"],
			Pause : ["Pauze","Pauze"],
			PriorityPickup : ["Vip","Vip"],
			CloseScript : ["Sluiten script","Sluiten script"],
			Selectqual : ["Selecteer kwalificatie","Selecteer kwalificatie"],
			SearchMode : ["SearchMode","SearchMode"]
		},
		VoiceToolStrip : 
		{
			//[ Alt, title]
			voiceLabel : ["Spraak commando's", "Spraak commando's"],
			VoiceNewCall : ["Nieuwe oproep", "Nieuwe oproep"],
			VoiceHold : ["Wachtstand", "Wachtstand"],
			VoiceRetrieve : ["Terug nemen", "Terug nemen"],
			VoiceTransfer : ["Onmiddellijk doorsturen oproep", "Onmiddellijk doorsturen oproep"],
			VoiceConference : ["Conference oproep", "Conference oproep"],
			VoiceForward : ["Doorsturen oproep", "Doorsturen oproep"],
			VoiceHangup : ["Ophangen oproep", "Ophangen oproep"]
		},
		MailToolStrip : 
		{
			//[ Alt, title]
			mailLabel : ["Mail commando's" ,"Mail commando's"],
			MailNewMail : ["Nieuwe mail", "Nieuwe mail"],
			MailReply : ["Antwoorden mail", "Antwoorden mail"],
			MailForward : ["Doorsturen mail", "Doorsturen mail"]
		},
		ChatToolStrip : 
		{
			//[ Alt, title]
			chatLabel : ["Chat commando's" ,"Chat commando's"],
			ChatNewChat : ["Nieuwe chat", "Nieuwe chat"],
			ChatHold : ["Wachtstand", "Wachtstand"],
			ChatRetrieve : ["Terug nemen chat", "Terug nemen chat"],
			ChatHangup : ["Ophangen chat", "Ophangen chat"]
		}
		
	},
	infoBox :
	{
		title : "Info",
		titleAgt : " Agent informatie",
		titleQueue : " Wachtrij informatie",
		titleContact : " Contact informatie",
		agtName : "Naam",
		agtAccount : "Account",
		queueWaiting : "Wachten",
		queuePriority : "Prioriteit",
		contactState : "Toestand ",
		contactTo : "Aan",
		contactFrom : "Van"
	}	
}
