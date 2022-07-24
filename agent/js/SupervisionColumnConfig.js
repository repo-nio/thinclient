// JScript File


SupervisionModel.prototype =
{
    SetColumnDescription : function(type)
    {
         if (!type) return;
       
        var _Type = type;
        if (isNaN(_Type)) _Type = this.TypeNameToIndex(_Type);
        if (_Type == -1) return;

        switch(_Type)
        {
            case Enums.model.model.types.Agent:
                this.SetColumnDescriptionAgent();
                break;
            case Enums.model.types.Inbound:
                this.SetColumnDescriptionInbound();
                break;
            case Enums.model.types.Outbound:
                this.SetColumnDescriptionOutbound();
                break;
            case Enums.model.types.Queue:
                this.SetColumnDescriptionQueue();
                break;
            case Enums.model.types.team:
                this.SetColumnDescriptionTeam();
                break;
            case Enums.model.types.campaign:
                this.SetColumnDescriptionCampaign();
                break;
        }
    },
    
    SetColumnDescriptionAgent : function()
    {
        var _List = this.SuperItems[Enums.model.types.Agent]
        var _ColumnDef; var _ColumnLength = 0;
        var _Info;
        var _Def;
        if (_List == undefined) return;

        //Filters
        //_______
        //(index, name, type, style, visible, visibleInDetailPanel, detailDispalyType, columnInfo)
        
        //(id, typeIndex, itemIndex, operator, value, originator, name, description)
        
		_List.DefaultFilterOnRow.Add('System1', Agent.Realtime.StatusIndex, Enums.operators.E, '0', Enums.filterOriginator.System, 'Undefined state');
        
		_List.DefaultGroupBy = new GroupByListCollection(Agent.Parameters.Groupkey);
        _List.DefaultGroupBy.Active = true; 
            
        //Parameters
        //__________        
        _List.DefaultColumnDef[Enums.model.keys.Parameters] = new ColumnHeaderDescription();
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.Parameters];

        _ColumnDef.Add(
		{ 
			_fullIndex : Agent.Parameters.AgentId,
			_text : CrResource.colAgent.Parameters.AgentId,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.Detail
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Agent.Parameters.Account,
			_text : CrResource.colAgent.Parameters.Account,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_detailDispalyType: Enums.column.panel.Detail
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Agent.Parameters.Firstname,
			_text : CrResource.colAgent.Parameters.Firstname,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.Detail
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Agent.Parameters.Lastname,
			_text : CrResource.colAgent.Parameters.Lastname,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.Detail
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Agent.Parameters.SiteId,
			_text : CrResource.colAgent.Parameters.SiteId,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.Detail
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Agent.Parameters.Server,
			_text : CrResource.colAgent.Parameters.Server,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_visible: false,
			_visibleInDetailPanel: false,
			_visibleForUser: false,
			_detailDispalyType: Enums.column.panel.Detail
		});
        _Info = new ListViewInfo(Agent.Parameters.TeamId); 
        _Info.Add(Team.Parameters.Description, CrResource.colTeam.Parameters.Description[0]);
        _ColumnDef.Add(
		{ 
			_fullIndex : Agent.Parameters.TeamId,
			_text : CrResource.colAgent.Parameters.TeamId,
			_type: Enums.column.type.List,
			_style: Enums.column.style.Count,
			_detailDispalyType: Enums.column.panel.List,
			_visible: false,
			_columnInfo: _Info,
			_listItems: _Info,
			_columnGroupByInfon: new ColumnGroupByInformation(true, Team.Parameters.Description)
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Agent.Parameters.PauseId,
			_text : CrResource.colAgent.Parameters.PauseId,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.Detail
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Agent.Parameters.PauseDescription,
			_text : CrResource.colAgent.Parameters.PauseDescription,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.Detail
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Agent.Parameters.Groupkey,
			_text : CrResource.colAgent.Parameters.Groupkey,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.Detail
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Agent.Parameters.Active,
			_text : CrResource.colAgent.Parameters.Active,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_visible: false,
			_visibleInDetailPanel: false,
			_visibleForUser: false,
			_detailDispalyType: Enums.column.panel.Detail
		});        
        _ColumnDef.Add(
		{ 
			_fullIndex : Agent.Parameters.LoginDateTime,
			_text : CrResource.colAgent.Parameters.LoginDateTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.Detail
		});  
        _ColumnDef.Add(
		{ 
			_fullIndex : Agent.Parameters.LoginDateTimeUtc,
			_text : CrResource.colAgent.Parameters.LoginDateTimeUtc,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.Detail
		});
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.Parameters.IpAddress,
			_text : CrResource.colAgent.Parameters.IpAddress,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.Detail
		});  
        _ColumnDef.Add(
		{ 
			_fullIndex : Agent.Parameters.Extension,
			_text : CrResource.colAgent.Parameters.Extension,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_detailDispalyType: Enums.column.panel.Detail
		});	
        //Realtime
        //________       
        _List.DefaultColumnDef[Enums.model.keys.RealTime] = new ColumnHeaderDescription();
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.RealTime];
        
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.Realtime.StatusIndex,
			_text : CrResource.colAgent.Realtime.StatusIndex,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,
			_visibleForUser: false,
			_detailDispalyType: Enums.column.panel.Detail
		});
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.Realtime.Status,
			_text : CrResource.colAgent.Realtime.Status,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_detailDispalyType: Enums.column.panel.Detail
		});
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.Realtime.StatusStartTime,
			_text : CrResource.colAgent.Realtime.StatusStartTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.DateTime,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.Detail
		});
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.Realtime.VoiceState,
			_text : CrResource.colAgent.Realtime.VoiceState,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.Detail
		});
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.Realtime.VoiceAvailable,
			_text : CrResource.colAgent.Realtime.VoiceAvailable,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.Detail
		});
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.Realtime.ChatState,
			_text : CrResource.colAgent.Realtime.ChatState,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.Detail
		});
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.Realtime.ChatAvailable,
			_text : CrResource.colAgent.Realtime.ChatAvailable,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.Detail
		});
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.Realtime.EmailState,
			_text : CrResource.colAgent.Realtime.EmailState,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.Detail
		});
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.Realtime.EmailAvailable,
			_text : CrResource.colAgent.Realtime.EmailAvailable,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.Detail
		});
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.Realtime.ListCurrentContactId,
			_text : CrResource.colAgent.Realtime.ListCurrentContactId,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.Detail
		});
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.Realtime.ActiveContactId,
			_text : CrResource.colAgent.Realtime.ActiveContactId,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.Detail
		});
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.Realtime.PerQueWaiting,
			_text : CrResource.colAgent.Realtime.PerQueWaiting,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.Detail
		});
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.Realtime.PerQueAbandoned,
			_text : CrResource.colAgent.Realtime.PerQueAbandoned,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.Detail
		});
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.Realtime.PerQueProcessed,
			_text : CrResource.colAgent.Realtime.PerQueProcessed,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.Detail
		});
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.Realtime.PerQueEnQueue,
			_text : CrResource.colAgent.Realtime.PerQueEnQueue,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.Detail
		});		
        //History
        //_______    
         _List.DefaultColumnDef[Enums.model.keys.History] = new ColumnHeaderDescription();
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.History];
        
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.History.Undefined,
			_text : CrResource.colAgent.History.Undefined,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,
			_visibleForUser: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.History.Pause,
			_text : CrResource.colAgent.History.Pause,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		        
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.History.Off,
			_text : CrResource.colAgent.History.Off,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,
			_visibleForUser: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		        
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.History.Waiting,
			_text : CrResource.colAgent.History.Waiting,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.History.Wrapup,
			_text : CrResource.colAgent.History.Wrapup,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
        _ColumnDef.Add(
		{ 
			_fullIndex : Agent.History.WrapupInbound,
			_text : CrResource.colAgent.History.WrapupInbound,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.History.WrapupOutbound,
			_text : CrResource.colAgent.History.WrapupOutbound,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
        _ColumnDef.Add(
		{ 
			_fullIndex : Agent.History.WrapupEMail,
			_text : CrResource.colAgent.History.WrapupEMail,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.History.WrapupChat,
			_text : CrResource.colAgent.History.WrapupChat,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.History.Online,
			_text : CrResource.colAgent.History.Online,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.History.HandelingInbound,
			_text : CrResource.colAgent.History.HandelingInbound,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.History.HandelingOutbound,
			_text : CrResource.colAgent.History.HandelingOutbound,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.History.HandelingEMail,
			_text : CrResource.colAgent.History.HandelingEMail,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.History.HandelingChat,
			_text : CrResource.colAgent.History.HandelingChat,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.History.ContactHandled,
			_text : CrResource.colAgent.History.ContactHandled,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,		
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.History.ContactInboundHandled,
			_text : CrResource.colAgent.History.ContactInboundHandled,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.History.ContactOutboundHandled,
			_text : CrResource.colAgent.History.ContactOutboundHandled,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.History.ContactEMailHandled,
			_text : CrResource.colAgent.History.ContactEMailHandled,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.History.ContactChatHandled,
			_text : CrResource.colAgent.History.ContactChatHandled,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});	
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.History.ContactMsgSend,
			_text : CrResource.colAgent.History.ContactMsgSend,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});	//New
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.History.ContactMsgReceived,
			_text : CrResource.colAgent.History.ContactMsgReceived,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});	//New
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.History.UndefinedTime,
			_text : CrResource.colAgent.History.UndefinedTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_visibleForUser: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.History.PauseTime,
			_text : CrResource.colAgent.History.PauseTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.History.OffTime,
			_text : CrResource.colAgent.History.OffTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_visibleForUser: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.History.WaitingTime,
			_text : CrResource.colAgent.History.WaitingTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.History.WrapupStateTime,
			_text : CrResource.colAgent.History.WrapupStateTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.History.WrapupInboundTime,
			_text : CrResource.colAgent.History.WrapupInboundTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.History.WrapupOutboundTime,
			_text : CrResource.colAgent.History.WrapupOutboundTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.History.WrapupEMailTime,
			_text : CrResource.colAgent.History.WrapupEMailTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.History.WrapupChatTime,
			_text : CrResource.colAgent.History.WrapupChatTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.History.OnlineTime,
			_text : CrResource.colAgent.History.OnlineTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.History.HandelingInboundTime,
			_text : CrResource.colAgent.History.HandelingInboundTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.History.HandelingOutboundTime,
			_text : CrResource.colAgent.History.HandelingOutboundTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.History.HandelingEMailTime,
			_text : CrResource.colAgent.History.HandelingEMailTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.History.HandelingChatTime,
			_text : CrResource.colAgent.History.HandelingChatTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{
			_fullIndex : Agent.History.ContactHandledTime,
			_text : CrResource.colAgent.History.ContactHandledTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
		_ColumnDef.Add(
		{
			_fullIndex : Agent.History.ContactInboundHandledTime,
			_text : CrResource.colAgent.History.ContactInboundHandledTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
		_ColumnDef.Add(
		{
			_fullIndex : Agent.History.ContactOutboundHandledTime,
			_text : CrResource.colAgent.History.ContactOutboundHandledTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
		_ColumnDef.Add(
		{
			_fullIndex : Agent.History.ContactEMailHandledTime,
			_text : CrResource.colAgent.History.ContactEMailHandledTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
		_ColumnDef.Add(
		{
			_fullIndex : Agent.History.ContactChatHandledTime,
			_text : CrResource.colAgent.History.ContactChatHandledTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
		_ColumnDef.Add(
		{
			_fullIndex : Agent.History.Preview,
			_text : CrResource.colAgent.History.Preview,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
		_ColumnDef.Add(
		{
			_fullIndex : Agent.History.PreviewTime,
			_text : CrResource.colAgent.History.PreviewTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});				
        _Info = new InlineGraphInfo();
        _Info.Add(Agent.History.PauseTime,        crGraphColor['pause'], CrResource.colAgent.History.PauseTime[0], 'Agent_HistoryGraph_Pause');
        _Info.Add(Agent.History.WaitingTime,      crGraphColor['waiting'], CrResource.colAgent.History.WaitingTime[0], 'Agent_HistoryGraph_Waiting');
        _Info.Add(Agent.History.OnlineTime,       crGraphColor['online'], CrResource.colAgent.History.OnlineTime[0], 'Agent_HistoryGraph_Online');
        _Info.Add(Agent.History.WrapupStateTime,  crGraphColor['wrapup'], CrResource.colAgent.History.WrapupStateTime[0], 'Agent_HistoryGraph_WrapUp');
		_Info.Add(Agent.History.PreviewTime,      crGraphColor['preview'], CrResource.colAgent.History.PreviewTime[0], 'Agent_HistoryGraph_Preview');
		_ColumnDef.Add(
		{ 
			_fullIndex : Agent.History.HistoryTimeGraph,
			_text : CrResource.colAgent.History.HistoryTimeGraph,
			_type: Enums.column.type.Graph,
			_style: Enums.column.style.GraphBar,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.Graph,
			_columnInfo: _Info,
			_graphItems : _Info
		});		
        //Production
        //__________    
         _List.DefaultColumnDef[Enums.model.keys.Production] = new ColumnHeaderDescription();
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.Production];

		this.SetColumnTypeProduction(_ColumnDef, Agent.Production, CrResource.colCommon.Production);
        //Period Production
        //__________    
         _List.DefaultColumnDef[Enums.model.keys.PeriodProduction] = new ColumnHeaderDescription();
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.PeriodProduction];

		this.SetColumnTypeProduction(_ColumnDef, Agent.PeriodProduction, CrResource.colCommon.PeriodProduction);
				
 		//ContactListInfo
        //_______________    
        _List.DefaultColumnDef[Enums.model.keys.ContactListInfo] = new ColumnHeaderDescription();
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.ContactListInfo];
				
        //SystemColumns
        //_____________________         
        _List.DefaultColumnDef[Enums.model.keys.SystemColumns] = new ColumnHeaderDescription();
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.SystemColumns];

        //UserColumns
        //_____________________         
        _List.DefaultColumnDef[Enums.model.keys.UserColumns] = new ColumnHeaderDescription();
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.UserColumns];
        
		_ColumnDef.Add(
		{ 
			_fullIndex: [Enums.model.types.Agent, Enums.model.keys.UserColumns, 0],
			_text: ["Full agent name","Full agent name"],
			_type: Enums.column.type.Formula,
			_style: Enums.column.style.Text,
			_detailDispalyType: Enums.column.panel.Detail,
			_visible: false,
			_visibleInDetailPanel: false,			
			_formula: "this.GetValueOf(Agent.Parameters.Firstname) + ' ' + this.GetValueOf(Agent.Parameters.Lastname);"
		});	
		_ColumnDef.Add(
		{ 
			_fullIndex: [Enums.model.types.Agent, Enums.model.keys.UserColumns, 1],
			_text: ["Avg waiting time","Average waiting time of the agent"],
			_type: Enums.column.type.Formula,
			_style: Enums.column.style.Time,
			_detailDispalyType: Enums.column.panel.Detail,
			_formula: "this.GetValueOf(Agent.History.WaitingTime) / this.GetValueOf(Agent.History.Waiting);"
		});	
    },
 
    SetColumnDescriptionInbound : function()
    {
        var _List = this.SuperItems[Enums.model.types.Inbound]
        var _ColumnDef;
        var _Info;
        
        if (_List == undefined) return;

        //Filters
        //_______
        //_List.FilterOnRow.Add(Enums.model.keys.RealTime, Enums.agent.realtime.StateIndex, Enums.operators.E, '0', Enums.filterOriginator.System, 'Undefined state');
        _List.DefaultGroupBy = new GroupByListCollection(Inbound.Parameters.CampaignName);
        _List.DefaultGroupBy.Active = true; 
        
        //Parameters
        //_______          
        _List.DefaultColumnDef[Enums.model.keys.Parameters] = new ColumnHeaderDescription();
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.Parameters];
        
		_ColumnDef.Add(
		{ 
			_fullIndex : Inbound.Parameters.Id,
			_text : CrResource.colInbound.Parameters.Id,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.Detail
		});
		_ColumnDef.Add(
		{ 
			_fullIndex : Inbound.Parameters.Description,
			_text : CrResource.colInbound.Parameters.Description,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_detailDispalyType: Enums.column.panel.Detail
		});
		_ColumnDef.Add(
		{ 
			_fullIndex : Inbound.Parameters.GroupKey,
			_text : CrResource.colInbound.Parameters.GroupKey,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_visible: false,
			_visibleInDetailPanel: false,
			_visibleForUser: false,
			_detailDispalyType: Enums.column.panel.Detail
		});
		_ColumnDef.Add(
		{ 
			_fullIndex : Inbound.Parameters.CampaignId,
			_text : CrResource.colInbound.Parameters.CampaignId,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.Detail
		});
		_ColumnDef.Add(
		{ 
			_fullIndex : Inbound.Parameters.CampaignName,
			_text : CrResource.colInbound.Parameters.CampaignName,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_visible: false,		
			_detailDispalyType: Enums.column.panel.Detail
		});
		_ColumnDef.Add(
		{ 
			_fullIndex : Inbound.Parameters.MediaType,
			_text : CrResource.colInbound.Parameters.MediaType,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_detailDispalyType: Enums.column.panel.Detail
		});
		_ColumnDef.Add(
		{ 
			_fullIndex : Inbound.Parameters.MediaTypeId,
			_text : CrResource.colInbound.Parameters.MediaTypeId,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.Detail
		});		
        
        //Realtime
        //_______          
        _List.DefaultColumnDef[Enums.model.keys.RealTime] = new ColumnHeaderDescription();
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.RealTime];
        
		_ColumnDef.Add(
		{ 
			_fullIndex : Inbound.Realtime.ActiveContacts,
			_text : CrResource.colInbound.Realtime.ActiveContacts,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
		_ColumnDef.Add(
		{ 
			_fullIndex : Inbound.Realtime.Closing,
			_text : CrResource.colInbound.Realtime.Closing,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
        _ColumnDef.Add(
		{ 
			_fullIndex : Inbound.Realtime.SystemPreprocessing,
			_text : CrResource.colInbound.Realtime.SystemPreprocessing,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			/*_visible: false,
			_visibleInDetailPanel: false,
			_visibleForUser: false,*/
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Inbound.Realtime.Ivr,
			_text : CrResource.colInbound.Realtime.Ivr,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Inbound.Realtime.Waiting,
			_text : CrResource.colInbound.Realtime.Waiting,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Inbound.Realtime.Online,
			_text : CrResource.colInbound.Realtime.Online,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Inbound.Realtime.WrapUp,
			_text : CrResource.colInbound.Realtime.WrapUp,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Inbound.Realtime.Overflowing,
			_text : CrResource.colInbound.Realtime.Overflowing,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Inbound.Realtime.Transfer,
			_text : CrResource.colInbound.Realtime.Transfer,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Inbound.Realtime.MaxQueueTime,
			_text : CrResource.colInbound.Realtime.MaxQueueTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Timer,
			_detailDispalyType: Enums.column.panel.Detail
		});	
		_ColumnDef.Add(
		{ 
			_fullIndex : Inbound.Realtime.ContactMsgSend,
			_text : CrResource.colInbound.Realtime.ContactMsgSend,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});	//New
		_ColumnDef.Add(
		{ 
			_fullIndex : Inbound.Realtime.ContactMsgReceived,
			_text : CrResource.colInbound.Realtime.ContactMsgReceived,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});	//New
        _ColumnDef.Add(
		{ 
			_fullIndex : Inbound.Realtime.AgentInReady,
			_text : CrResource.colInbound.Realtime.AgentInReady,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
        _Info = new InlineGraphInfo();
        _Info.Add(Inbound.Realtime.Ivr,         crGraphColor['ivr'], CrResource.colInbound.Realtime.Ivr[0], 'Inbound_RealTimeGraph_Ivr');
        _Info.Add(Inbound.Realtime.Waiting,     crGraphColor['waiting'], CrResource.colInbound.Realtime.Waiting[0], 'Inbound_RealTimeGraph_Waiting');
        _Info.Add(Inbound.Realtime.Online,      crGraphColor['online'], CrResource.colInbound.Realtime.Online[0], 'Inbound_RealTimeGraph_Online');
        _Info.Add(Inbound.Realtime.WrapUp,      crGraphColor['wrapup'], CrResource.colInbound.Realtime.WrapUp[0], 'Inbound_RealTimeGraph_Wrapup');
        _Info.Add(Inbound.Realtime.Overflowing, crGraphColor['overflow'], CrResource.colInbound.Realtime.Overflowing[0], 'Inbound_RealTimeGraph_Overflowing');
		_ColumnDef.Add(
		{ 
			_fullIndex : Inbound.Realtime.RealTimeGraph,
			_text : CrResource.colInbound.Realtime.RealTimeGraph,
			_type: Enums.column.type.Graph,
			_style: Enums.column.style.GraphBar,
			_detailDispalyType: Enums.column.panel.Graph,
			_columnInfo: _Info,
			_graphItems : _Info				
		});
		
        //History
        //_______  
        _List.DefaultColumnDef[Enums.model.keys.History] = new ColumnHeaderDescription();
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.History];
        

        _ColumnDef.Add(
		{ 
			_fullIndex : Inbound.History.Received,
			_text : CrResource.colInbound.History.Received,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
        _ColumnDef.Add(
		{ 
			_fullIndex : Inbound.History.ReceivedTime,
			_text : CrResource.colInbound.History.ReceivedTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
        _ColumnDef.Add(
		{ 
			_fullIndex : Inbound.History.Closed,
			_text : CrResource.colInbound.History.Closed,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
        _ColumnDef.Add(
		{ 
			_fullIndex : Inbound.History.ClosedTime,
			_text : CrResource.colInbound.History.ClosedTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
        _ColumnDef.Add(
		{ 
			_fullIndex : Inbound.History.EndInSystemProcessing,
			_text : CrResource.colInbound.History.EndInSystemProcessing,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
        _ColumnDef.Add(
		{ 
			_fullIndex : Inbound.History.EndInSystemProcessingTime,
			_text : CrResource.colInbound.History.EndInSystemProcessingTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
        _ColumnDef.Add(
		{ 
			_fullIndex : Inbound.History.EndInIvr,
			_text : CrResource.colInbound.History.EndInIvr,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
        _ColumnDef.Add(
		{ 
			_fullIndex : Inbound.History.EndInIvrTime,
			_text : CrResource.colInbound.History.EndInIvrTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Inbound.History.IvrFinish,
			_text : CrResource.colInbound.History.IvrFinish,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
        _ColumnDef.Add(
		{ 
			_fullIndex : Inbound.History.IvrFinishTime,
			_text : CrResource.colInbound.History.IvrFinishTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Inbound.History.IvrAbandoned,
			_text : CrResource.colInbound.History.IvrAbandoned,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
        _ColumnDef.Add(
		{ 
			_fullIndex : Inbound.History.IvrAbandonedTime,
			_text : CrResource.colInbound.History.IvrAbandonedTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Inbound.History.Abandoned,
			_text : CrResource.colInbound.History.Abandoned,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
        _ColumnDef.Add(
		{ 
			_fullIndex : Inbound.History.AbandonedTime,
			_text : CrResource.colInbound.History.AbandonedTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
        _ColumnDef.Add(
		{ 
			_fullIndex : Inbound.History.HandledByAgent,
			_text : CrResource.colInbound.History.HandledByAgent,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
        _ColumnDef.Add(
		{ 
			_fullIndex : Inbound.History.HandledByAgentTime,
			_text : CrResource.colInbound.History.HandledByAgentTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
        _ColumnDef.Add(
		{ 
			_fullIndex : Inbound.History.OverflowedCount,
			_text : CrResource.colInbound.History.OverflowedCount,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
        _ColumnDef.Add(
		{ 
			_fullIndex : Inbound.History.OverflowedContact,
			_text : CrResource.colInbound.History.OverflowedContact,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
        _ColumnDef.Add(
		{ 
			_fullIndex : Inbound.History.Waiting,
			_text : CrResource.colInbound.History.Waiting,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
        _ColumnDef.Add(
		{ 
			_fullIndex : Inbound.History.WaitingTime,
			_text : CrResource.colInbound.History.WaitingTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
        _ColumnDef.Add(
		{ 
			_fullIndex : Inbound.History.Direct,
			_text : CrResource.colInbound.History.Direct,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
        _ColumnDef.Add(
		{ 
			_fullIndex : Inbound.History.DirectTime,
			_text : CrResource.colInbound.History.DirectTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : Inbound.History.Transfer,
			_text : CrResource.colInbound.History.Transfer,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
        _ColumnDef.Add(
		{ 
			_fullIndex : Inbound.History.TransferTime,
			_text : CrResource.colInbound.History.TransferTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory
		});	
		_ColumnDef.Add(
		{ 
			_fullIndex : Inbound.History.ContactMsgSend,
			_text : CrResource.colInbound.History.ContactMsgSend,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});	//New
		_ColumnDef.Add(
		{ 
			_fullIndex : Inbound.History.ContactMsgReceived,
			_text : CrResource.colInbound.History.ContactMsgReceived,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});	//New
        _Info = new InlineGraphInfo();
        _Info.Add(Inbound.History.EndInIvr,       crGraphColor['ivr'], CrResource.colInbound.History.EndInIvr[0],      'Inbound_HistoryGraph_Ivr');
        _Info.Add(Inbound.History.Abandoned,      crGraphColor['waiting'], CrResource.colInbound.History.Waiting[0],  'Inbound_HistoryGraph_Waiting');
        _Info.Add(Inbound.History.HandledByAgent, crGraphColor['online'], CrResource.colInbound.History.HandledByAgent[0],   'Inbound_HistoryGraph_Online');
        //_Info.Add(Inbound.History.Overflowed,     crGraphColor['overflow'], CrResource.colInbound.History.Overflowed[0], 'Inbound_HistoryGraph_Overflowed');
        _ColumnDef.Add(
		{ 
			_fullIndex : Inbound.History.HistoryGraph,
			_text : CrResource.colInbound.History.HistoryGraph,
			_type: Enums.column.type.Graph,
			_style: Enums.column.style.GraphBar,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.Graph,
			_columnInfo: _Info,
			_graphItems : _Info				
		});		
		
		//Production
        //__________    
         _List.DefaultColumnDef[Enums.model.keys.Production] = new ColumnHeaderDescription();
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.Production];

		this.SetColumnTypeProduction(_ColumnDef, Inbound.Production, CrResource.colCommon.Production);

        //Period Production
        //__________    
         _List.DefaultColumnDef[Enums.model.keys.PeriodProduction] = new ColumnHeaderDescription();
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.PeriodProduction];

		this.SetColumnTypeProduction(_ColumnDef, Inbound.PeriodProduction, CrResource.colCommon.PeriodProduction);
				
 		//ContactListInfo
        //_______________    
        _List.DefaultColumnDef[Enums.model.keys.ContactListInfo] = new ColumnHeaderDescription();
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.ContactListInfo];
				
		//SystemColumns
        //_____________________         
        _List.DefaultColumnDef[Enums.model.keys.SystemColumns] = new ColumnHeaderDescription();
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.SystemColumns];

        //UserColumns
        //_____________________         
        _List.DefaultColumnDef[Enums.model.keys.UserColumns] = new ColumnHeaderDescription();
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.UserColumns];
		
		_ColumnDef.Add(
		{ 
			_fullIndex: [Enums.model.types.Inbound, Enums.model.keys.UserColumns, 0],
			_text: ["Postive/WorkTime","Amount of postive contact against the total working time of the agents."],
			_type: Enums.column.type.Formula,
			_style: Enums.column.style.Text,
			_detailDispalyType: Enums.column.panel.Detail,
			_decimalPlace: 2,
			_formula: "(this.GetValueOf(Inbound.PeriodProduction.PositiveCount) / ((this.GetValueOf(Inbound.PeriodProduction.OnlineActionTime) + this.GetValueOf(Inbound.PeriodProduction.OnHoldActionTime) + this.GetValueOf(Inbound.PeriodProduction.WrapUpActionTime)) / 3600000)).toFixed(2);"
		});			
    },
    
    SetColumnDescriptionOutbound : function()
    {
        var _List = this.SuperItems[Enums.model.types.Outbound]
        var _ColumnDef;
        var _Info;
        
        if (_List == undefined) return;

        //Filters
        //_______
        //_List.FilterOnRow.Add(Enums.model.keys.RealTime, Enums.agent.realtime.StateIndex, Enums.operators.E, '0', Enums.filterOriginator.System, 'Undefined state');
        _List.DefaultGroupBy = new GroupByListCollection(Outbound.Parameters.CampaignName);
        _List.DefaultGroupBy.Active = true; 
        
        //Parameters
        //_______          
        _List.DefaultColumnDef[Enums.model.keys.Parameters] = new ColumnHeaderDescription();
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.Parameters];
        
		_ColumnDef.Add(
		{ 
			_fullIndex : Outbound.Parameters.Mode,
			_text : CrResource.colOutbound.Parameters.Mode,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_detailDispalyType: Enums.column.panel.Detail
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Outbound.Parameters.Id,
			_text : CrResource.colOutbound.Parameters.Id,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.Detail
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Outbound.Parameters.Description,
			_text : CrResource.colOutbound.Parameters.Description,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_detailDispalyType: Enums.column.panel.Detail
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Outbound.Parameters.GroupKey,
			_text : CrResource.colOutbound.Parameters.GroupKey,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_visible: false,
			_visibleInDetailPanel: false,
			_visibleForUser: false,
			_detailDispalyType: Enums.column.panel.Detail
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Outbound.Parameters.CampaignId,
			_text : CrResource.colOutbound.Parameters.CampaignId,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.Detail
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Outbound.Parameters.CampaignName,
			_text : CrResource.colOutbound.Parameters.CampaignName,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_visible: false,
			_detailDispalyType: Enums.column.panel.Detail
		});
		_ColumnDef.Add(
		{ 
			_fullIndex : Outbound.Parameters.MediaType,
			_text : CrResource.colOutbound.Parameters.MediaType,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_detailDispalyType: Enums.column.panel.Detail
		});
		_ColumnDef.Add(
		{ 
			_fullIndex : Outbound.Parameters.MediaTypeId,
			_text : CrResource.colOutbound.Parameters.MediaTypeId,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.Detail
		});			
        //Realtime
        //_______          
        _List.DefaultColumnDef[Enums.model.keys.RealTime] = new ColumnHeaderDescription();
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.RealTime];
        
		_ColumnDef.Add(
		{ 
			_fullIndex : Outbound.Realtime.SystemPreprocessing,
			_text : CrResource.colOutbound.Realtime.SystemPreprocessing,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
		_ColumnDef.Add(
		{ 
			_fullIndex : Outbound.Realtime.Closing,
			_text : CrResource.colOutbound.Realtime.Closing,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,				
			_detailDispalyType: Enums.column.panel.FieldHistory
		});				
        _ColumnDef.Add(
		{ 
			_fullIndex : Outbound.Realtime.Ivr,
			_text : CrResource.colOutbound.Realtime.Ivr,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,	
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Outbound.Realtime.Waiting,
			_text : CrResource.colOutbound.Realtime.Waiting,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Outbound.Realtime.Online,
			_text : CrResource.colOutbound.Realtime.Online,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Outbound.Realtime.WrapUp,
			_text : CrResource.colOutbound.Realtime.WrapUp,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Outbound.Realtime.Transfer,
			_text : CrResource.colOutbound.Realtime.Transfer,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,				
			_detailDispalyType: Enums.column.panel.FieldHistory
		});			
        _ColumnDef.Add(
		{ 
			_fullIndex : Outbound.Realtime.Overflowing,
			_text : CrResource.colOutbound.Realtime.Overflowing,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,				
			_detailDispalyType: Enums.column.panel.FieldHistory
		});			
        _ColumnDef.Add(
		{ 
			_fullIndex : Outbound.Realtime.Preview,
			_text : CrResource.colOutbound.Realtime.Preview,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: true,
			_visibleInDetailPanel: true,				
			_detailDispalyType: Enums.column.panel.FieldHistory
		});

        _Info = new InlineGraphInfo();
        _Info.Add(Outbound.Realtime.Ivr,          crGraphColor['ivr'], CrResource.colOutbound.Realtime.Ivr[0],        'Outbound_RealTimeGraph_Ivr');
        _Info.Add(Outbound.Realtime.Waiting,      crGraphColor['waiting'], CrResource.colOutbound.Realtime.Waiting[0],    'Outbound_RealTimeGraph_Waiting');
        _Info.Add(Outbound.Realtime.Online,       crGraphColor['online'], CrResource.colOutbound.Realtime.Online[0],     'Outbound_RealTimeGraph_Online');
        _Info.Add(Outbound.Realtime.WrapUp,       crGraphColor['wrapup'], CrResource.colOutbound.Realtime.WrapUp[0],    'Outbound_RealTimeGraph_Wrapup');
        _Info.Add(Outbound.Realtime.Overflowing,  crGraphColor['overflow'], CrResource.colOutbound.Realtime.Overflowing[0],   'Outbound_RealTimeGraph_Overflowing');
        _ColumnDef.Add(
		{ 
			_fullIndex : Outbound.Realtime.RealTimeGraph,
			_text : CrResource.colOutbound.Realtime.RealTimeGraph,
			_type: Enums.column.type.Graph,
			_style: Enums.column.style.GraphBar,
			_detailDispalyType: Enums.column.panel.Graph,			
			_columnInfo: _Info,
			_graphItems : _Info			
		});
    
        //History
        //_______      
         _List.DefaultColumnDef[Enums.model.keys.History] = new ColumnHeaderDescription();
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.History];
		
		_ColumnDef.Add(
		{ 
			_fullIndex : Outbound.History.Dialled,
			_text : CrResource.colOutbound.History.Dialled,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Outbound.History.DialledTime,
			_text : CrResource.colOutbound.History.DialledTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Outbound.History.EndInSystemProcessing,
			_text : CrResource.colOutbound.History.EndInSystemProcessing,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Outbound.History.EndInSystemProcessingTime,
			_text : CrResource.colOutbound.History.EndInSystemProcessingTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Outbound.History.EndInIvr,
			_text : CrResource.colOutbound.History.EndInIvr,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Outbound.History.EndInIvrTime,
			_text : CrResource.colOutbound.History.EndInIvrTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Outbound.History.IvrFinish,
			_text : CrResource.colInbound.History.IvrFinish,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
        _ColumnDef.Add(
		{ 
			_fullIndex : Outbound.History.IvrFinishTime,
			_text : CrResource.colInbound.History.IvrFinishTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Outbound.History.IvrAbandoned,
			_text : CrResource.colInbound.History.IvrAbandoned,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
        _ColumnDef.Add(
		{ 
			_fullIndex : Outbound.History.IvrAbandonedTime,
			_text : CrResource.colInbound.History.IvrAbandonedTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
        _ColumnDef.Add(
		{ 
			_fullIndex : Outbound.History.Abandoned,
			_text : CrResource.colOutbound.History.Abandoned,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Outbound.History.AbandonedTime,
			_text : CrResource.colOutbound.History.AbandonedTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Outbound.History.OverflowCount,
			_text : CrResource.colOutbound.History.OverflowedCount,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Outbound.History.OverflowContact,
			_text : CrResource.colOutbound.History.OverflowedContact,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Outbound.History.ToAgent,
			_text : CrResource.colOutbound.History.ToAgent,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Outbound.History.ToAgentTime,
			_text : CrResource.colOutbound.History.ToAgentTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Outbound.History.Direct,
			_text : CrResource.colOutbound.History.Direct,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Outbound.History.DirectTime,
			_text : CrResource.colOutbound.History.DirectTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Outbound.History.Waiting,
			_text : CrResource.colOutbound.History.Waiting,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Outbound.History.WaitingTime,
			_text : CrResource.colOutbound.History.WaitingTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Outbound.History.Transfer,
			_text : CrResource.colOutbound.History.Transfer,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Outbound.History.TransferTime,
			_text : CrResource.colOutbound.History.TransferTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
        _Info = new InlineGraphInfo();
        _Info.Add(Outbound.History.Direct,    crGraphColor['online'], CrResource.colOutbound.History.Direct[0],   'Outbound_HistoryGraph_Direct');
        _Info.Add(Outbound.History.Waiting,   crGraphColor['waiting'], CrResource.colOutbound.History .Waiting[0],  'Outbound_HistoryGraph_Waiting');
        _ColumnDef.Add(
		{ 
			_fullIndex : Outbound.History.ToAgentGraph,
			_text : CrResource.colOutbound.History.ToAgentGraph,
			_type: Enums.column.type.Graph,
			_style: Enums.column.style.GraphBar,
			_detailDispalyType: Enums.column.panel.Graph,
			_visible: false,
			_visibleInDetailPanel: false,			
			_columnInfo: _Info,
			_graphItems : _Info
		});
        _Info = new InlineGraphInfo();
        _Info.Add(Outbound.History.EndInIvr,  crGraphColor['ivr'], CrResource.colOutbound.History.EndInIvr[0], 'Outbound_HistoryGraph_EndInIvr');
        _Info.Add(Outbound.History.Abandoned, crGraphColor['waiting'], CrResource.colOutbound.History.Abandoned[0],'Outbound_HistoryGraph_Abandoned');
        _Info.Add(Outbound.History.ToAgent,   crGraphColor['online'], CrResource.colOutbound.History.ToAgent[0],  'Outbound_HistoryGraph_ToAgent');
        //_Info.Add(Outbound.History.Overflow,  crGraphColor['overflow'], CrResource.colOutbound.History.Overflow[0], 'Outbound_HistoryGraph_Overflow');
        _ColumnDef.Add(
		{ 
			_fullIndex : Outbound.History.HistoryGraph,
			_text : CrResource.colOutbound.History.HistoryGraph,
			_type: Enums.column.type.Graph,
			_style: Enums.column.style.GraphBar,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.Graph,
			_columnInfo: _Info,
			_graphItems : _Info			
		});

        //Production
        //__________    
         _List.DefaultColumnDef[Enums.model.keys.Production] = new ColumnHeaderDescription();
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.Production];

		this.SetColumnTypeProduction(_ColumnDef, Outbound.Production, CrResource.colCommon.Production);
        
		//Period Production
        //__________    
         _List.DefaultColumnDef[Enums.model.keys.PeriodProduction] = new ColumnHeaderDescription();
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.PeriodProduction];

		this.SetColumnTypeProduction(_ColumnDef, Outbound.PeriodProduction, CrResource.colCommon.PeriodProduction);
				
 		//ContactListInfo
        //_______________    
        _List.DefaultColumnDef[Enums.model.keys.ContactListInfo] = new ColumnHeaderDescription();
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.ContactListInfo];
        
		_ColumnDef.Add(
		{ 
			_fullIndex : Outbound.ContactListInfo.ContactCount,
			_text : CrResource.colOutbound.ContactListInfo.ContactCount,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_detailDispalyType: Enums.column.panel.Detail
		});	
		_ColumnDef.Add(
		{ 
			_fullIndex : Outbound.ContactListInfo.ContactToDial,
			_text : CrResource.colOutbound.ContactListInfo.ContactToDial,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_detailDispalyType: Enums.column.panel.Detail
		});	
		_ColumnDef.Add(
		{ 
			_fullIndex : Outbound.ContactListInfo.ContactNeverDialed,
			_text : CrResource.colOutbound.ContactListInfo.ContactNeverDialed,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_detailDispalyType: Enums.column.panel.Detail
		});	
		_ColumnDef.Add(
		{ 
			_fullIndex : Outbound.ContactListInfo.ContactCallbacks,
			_text : CrResource.colOutbound.ContactListInfo.ContactCallbacks,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_detailDispalyType: Enums.column.panel.Detail
		});	
		_ColumnDef.Add(
		{ 
			_fullIndex : Outbound.ContactListInfo.ContactToRedial,
			_text : CrResource.colOutbound.ContactListInfo.ContactToRedial,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_detailDispalyType: Enums.column.panel.Detail
		});	
		_ColumnDef.Add(
		{ 
			_fullIndex : Outbound.ContactListInfo.ContactToNotRedial,
			_text : CrResource.colOutbound.ContactListInfo.ContactToNotRedial,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_detailDispalyType: Enums.column.panel.Detail
		});		
        _Info = new InlineGraphInfo();
        _Info.Add(Outbound.ContactListInfo.ContactNeverDialed,    crGraphColor['NeverDialed'], 	CrResource.colCampaign.ContactListInfo.ContactNeverDialed[0], 'Outbound_cliGraph_NeverDialed');
        _Info.Add(Outbound.ContactListInfo.ContactToRedial,     	crGraphColor['Redial'],CrResource.colCampaign.ContactListInfo.ContactToRedial[0], 'Outbound_cliGraph_Redial');
        _Info.Add(Outbound.ContactListInfo.ContactCallbacks,      crGraphColor['Callback'], CrResource.colCampaign.ContactListInfo.ContactCallbacks[0], 'Outbound_cliGraph_Callback');
        _Info.Add(Outbound.ContactListInfo.ContactToNotRedial,	crGraphColor['NotRedial'], CrResource.colCampaign.ContactListInfo.ContactToNotRedial[0], 'Outbound_cliGraph_NotRedial');
		_ColumnDef.Add(
		{ 
			_fullIndex : Outbound.ContactListInfo.ContactListGraph,
			_text : CrResource.colOutbound.ContactListInfo.ContactListGraph,
			_type: Enums.column.type.Graph,
			_style: Enums.column.style.GraphBar,
			_detailDispalyType: Enums.column.panel.Graph,
			_columnInfo: _Info,
			_graphItems : _Info				
		});		
        //SystemColumns
        //_____________________         
        _List.DefaultColumnDef[Enums.model.keys.SystemColumns] = new ColumnHeaderDescription();
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.SystemColumns];

        //UserColumns
        //_____________________         
        _List.DefaultColumnDef[Enums.model.keys.UserColumns] = new ColumnHeaderDescription();
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.UserColumns];
		
		_ColumnDef.Add(
		{ 
			_fullIndex: [Enums.model.types.Outbound, Enums.model.keys.UserColumns, 0],
			_text: ["Postive/WorkTime","Amount of postive contact against the total working time of the agents. (Online + Wrapup)"],
			_type: Enums.column.type.Formula,
			_style: Enums.column.style.Float,
			_detailDispalyType: Enums.column.panel.Detail,
			_formula: "this.GetValueOf(Outbound.PeriodProduction.PositiveCount) / (this.GetValueOf(Outbound.PeriodProduction.WorkActionTime)/1000);"
		});	
		_ColumnDef.Add(
		{ 
			_fullIndex: [Enums.model.types.Outbound, Enums.model.keys.UserColumns, 1],
			_text: ["PositiveCount","PositiveCount"],
			_type: Enums.column.type.Formula,
			_style: Enums.column.style.Text,
			_detailDispalyType: Enums.column.panel.Detail,
			_formula: "this.GetValueOf(Outbound.PeriodProduction.PositiveCount);"
		});	
		_ColumnDef.Add(
		{ 
			_fullIndex: [Enums.model.types.Outbound, Enums.model.keys.UserColumns, 2],
			_text: ["PositiveTime","WorkActionTime"],
			_type: Enums.column.type.Formula,
			_style: Enums.column.style.Time,
			_detailDispalyType: Enums.column.panel.Detail,
			_formula: "this.GetValueOf(Outbound.PeriodProduction.WorkActionTime);"
		});			
    },
    
    SetColumnDescriptionQueue : function()
    {
        var _List = this.SuperItems[Enums.model.types.Queue]
        var _ColumnDef; 
        var _Info;
        
        if (_List == undefined) return;

        //Filters
        //_______
        //_List.FilterOnRow.Add(Enums.model.keys.RealTime, Enums.agent.realtime.StateIndex, Enums.operators.E, '0', Enums.filterOriginator.System, 'Undefined state');
        _List.DefaultGroupBy = new GroupByListCollection(Queue.Parameters.GroupKey);
        _List.DefaultGroupBy.Active = true; 
        
        //Parameters
        //_______           
        _List.DefaultColumnDef[Enums.model.keys.Parameters] = new ColumnHeaderDescription();
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.Parameters];
		
        _ColumnDef.Add(
		{ 
			_fullIndex : Queue.Parameters.Id,
			_text : CrResource.colQueue.Parameters.Id,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.Detail
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Queue.Parameters.Description,
			_text : CrResource.colQueue.Parameters.Description,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_detailDispalyType: Enums.column.panel.Detail
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Queue.Parameters.GroupKey,
			_text : CrResource.colQueue.Parameters.GroupKey,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_visible: false,
			_detailDispalyType: Enums.column.panel.Detail
		});

        //Realtime
        //_______           
        _List.DefaultColumnDef[Enums.model.keys.RealTime] = new ColumnHeaderDescription();
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.RealTime];
        
		_ColumnDef.Add(
		{ 
			_fullIndex : Queue.Realtime.Waiting,
			_text : CrResource.colQueue.Realtime.Waiting,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Queue.Realtime.MaxWaiting,
			_text : CrResource.colQueue.Realtime.MaxWaiting,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Queue.Realtime.AgentInReady,
			_text : CrResource.colQueue.Realtime.AgentInReady,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        //History
        //_______       
         _List.DefaultColumnDef[Enums.model.keys.History] = new ColumnHeaderDescription();
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.History];
        
		_ColumnDef.Add(
		{ 
			_fullIndex : Queue.History.Received,
			_text : CrResource.colQueue.History.Received ,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Queue.History.ReceivedTime,
			_text : CrResource.colQueue.History.ReceivedTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Queue.History.Processed,
			_text : CrResource.colQueue.History.Processed,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Queue.History.ProcessedTime,
			_text : CrResource.colQueue.History.ProcessedTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
		_ColumnDef.Add(
		{ 
			_fullIndex : Queue.History.ProcessedDirect,
			_text : CrResource.colQueue.History.ProcessedDirect,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Queue.History.ProcessedDirectTime,
			_text : CrResource.colQueue.History.ProcessedDirectTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Queue.History.ProcessedWaiting,
			_text : CrResource.colQueue.History.ProcessedWaiting,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Queue.History.ProcessedWaitingTime,
			_text : CrResource.colQueue.History.ProcessedWaitingTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});	
		_ColumnDef.Add(
		{ 
			_fullIndex : Queue.History.ProcessedOverflow,
			_text : CrResource.colQueue.History.ProcessedOverflow,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Queue.History.ProcessedOverflowTime,
			_text : CrResource.colQueue.History.ProcessedOverflowTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});	
        _ColumnDef.Add(
		{ 
			_fullIndex : Queue.History.Abandoned,
			_text : CrResource.colQueue.History.Abandoned,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Queue.History.AbandonedTime,
			_text : CrResource.colQueue.History.AbandonedTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Queue.History.MaxQueueSize,
			_text : CrResource.colQueue.History.MaxQueueSize,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Queue.History.MaxWaitingTime,
			_text : CrResource.colQueue.History.MaxWaitingTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _Info = new InlineGraphInfo();
        _Info.Add(Queue.History.Abandoned,    crGraphColor['waiting'],   'Abandoned',    'Queue_HistoryGraph_Abandoned');
        _Info.Add(Queue.History.Processed,    crGraphColor['online'],   'Processed',    'Queue_HistoryGraph_Processed');
        _ColumnDef.Add(
		{ 
			_fullIndex : Queue.History.HistoryGraph,
			_text : CrResource.colQueue.History.HistoryGraph,
			_type: Enums.column.type.Graph,
			_style: Enums.column.style.GraphBar,
			_detailDispalyType: Enums.column.panel.Graph,
			_columnInfo: _Info,
			_graphItems : _Info				
		});
        //Production
        //__________    
         _List.DefaultColumnDef[Enums.model.keys.Production] = new ColumnHeaderDescription();
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.Production];		
        
        //Period Production
        //__________    
         _List.DefaultColumnDef[Enums.model.keys.PeriodProduction] = new ColumnHeaderDescription();
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.PeriodProduction];
	
 		//ContactListInfo
        //_______________    
        _List.DefaultColumnDef[Enums.model.keys.ContactListInfo] = new ColumnHeaderDescription();
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.ContactListInfo];
				
        //SystemColumns
        //_____________________         
        _List.DefaultColumnDef[Enums.model.keys.SystemColumns] = new ColumnHeaderDescription();
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.SystemColumns];

        //UserColumns
        //_____________________         
        _List.DefaultColumnDef[Enums.model.keys.UserColumns] = new ColumnHeaderDescription();
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.UserColumns];
    },
    
    SetColumnDescriptionTeam : function()
    {
        var _List = this.SuperItems[Enums.model.types.team]
        var _ColumnDef;
        var _Info
        
        if (_List == undefined) return;

        //Filters
        //_______
        //_List.FilterOnRow.Add(Enums.model.keys.RealTime, Enums.agent.realtime.StateIndex, Enums.operators.E, '0', Enums.filterOriginator.System, 'Undefined state');
        _List.DefaultGroupBy = new GroupByListCollection(Team.Parameters.Group);
        _List.DefaultGroupBy.Active = true; 
        
        //Parameters
        //__________              
        _List.DefaultColumnDef[Enums.model.keys.Parameters] = new ColumnHeaderDescription();
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.Parameters];

        _ColumnDef.Add(
		{ 
			_fullIndex : Team.Parameters.Id,
			_text : CrResource.colTeam.Parameters.Id,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.Detail
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Team.Parameters.Description,
			_text : CrResource.colTeam.Parameters.Description,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_detailDispalyType: Enums.column.panel.Detail
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Team.Parameters.Group,
			_text : CrResource.colTeam.Parameters.Group,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_visible: false,
			_detailDispalyType: Enums.column.panel.Detail
		});
        _Info = new ListViewInfo(Team.Parameters.Agents); 
        _Info.Add(Agent.Parameters.Account, CrResource.colAgent.Parameters.Account[0]);
        _Info.Add(Agent.Parameters.Firstname, CrResource.colAgent.Parameters.Firstname[0]);
        _Info.Add(Agent.Parameters.Lastname, CrResource.colAgent.Parameters.Lastname[0]);
        _ColumnDef.Add(
		{ 
			_fullIndex : Team.Parameters.Agents,
			_text : CrResource.colTeam.Parameters.Agents,
			_type: Enums.column.type.List,
			_style: Enums.column.style.Count,
			_detailDispalyType: Enums.column.panel.List,
			_columnInfo: _Info,
			_columnGroupByInfon: new ColumnGroupByInformation(true, Agent.Parameters.Account),
			_listItems: _Info
		});
        _Info = new ListViewInfo(Team.Parameters.Queues); 
        _Info.Add(Queue.Parameters.Description, CrResource.colQueue.Parameters.Description[0]);
        _ColumnDef.Add(
		{ 
			_fullIndex : Team.Parameters.Queues,
			_text : CrResource.colTeam.Parameters.Queues,
			_type: Enums.column.type.List,
			_style: Enums.column.style.Count,
			_detailDispalyType: Enums.column.panel.List,
			_columnInfo: _Info,
			_columnGroupByInfon: new ColumnGroupByInformation(true, Queue.Parameters.Description),
			_listItems: _Info
		});
        _Info = new InlineGraphInfo();
        _Info.Add(Team.Parameters.Agents,     crGraphColor['pause'], CrResource.colTeam.Parameters.Agents[0],  'team_parameter_Agents');
        _Info.Add(Team.Realtime.AgentsLogon,  crGraphColor['online'], CrResource.colTeam.Realtime.AgentsLogon[0],  'team_realtime_AgentsLogon');
        _ColumnDef.Add(
		{ 
			_fullIndex : Team.Parameters.AgentsLogonGraph,
			_text : CrResource.colTeam.Parameters.AgentsLogonGraph,
			_type: Enums.column.type.Graph,
			_style: Enums.column.style.GraphBar,
			_columnInfo: _Info,
			_graphItems: _Info,
			_visible: false,
			_detailDispalyType: Enums.column.panel.Graph
		});
        //Realtime
        //________              
        _List.DefaultColumnDef[Enums.model.keys.RealTime] = new ColumnHeaderDescription();
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.RealTime];

		_ColumnDef.Add(
		{ 
			_fullIndex : Team.Realtime.AgentsLogon,
			_text : CrResource.colTeam.Realtime.AgentsLogon,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_detailDispalyType: Enums.column.panel.Detail
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Team.Realtime.AgentsInPause,
			_text : CrResource.colTeam.Realtime.AgentsInPause,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_detailDispalyType: Enums.column.panel.Detail
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Team.Realtime.AgentsInWaiting,
			_text : CrResource.colTeam.Realtime.AgentsInWaiting,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_detailDispalyType: Enums.column.panel.Detail
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Team.Realtime.AgentsOnline,
			_text : CrResource.colTeam.Realtime.AgentsOnline,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_detailDispalyType: Enums.column.panel.Detail
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Team.Realtime.AgentsInWrapup,
			_text : CrResource.colTeam.Realtime.AgentsInWrapup,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_detailDispalyType: Enums.column.panel.Detail
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : Team.Realtime.WaitingInQueue,
			_text : CrResource.colTeam.Realtime.WaitingInQueue,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_detailDispalyType: Enums.column.panel.Detail
		});
        
        _Info = new InlineGraphInfo();
        _Info.Add(Team.Realtime.AgentsInPause,    crGraphColor['pause'], CrResource.colTeam.Realtime.AgentsInPause[0],    'team_realtime_AgentsInPause');
        _Info.Add(Team.Realtime.AgentsInWaiting,  crGraphColor['waiting'], CrResource.colTeam.Realtime.AgentsInWaiting[0],  'team_realtime_AgentsInWaiting');
        _Info.Add(Team.Realtime.AgentsOnline,     crGraphColor['online'], CrResource.colTeam.Realtime.AgentsOnline[0],     'team_realtime_AgentsOnline');
        _Info.Add(Team.Realtime.AgentsInWrapup,   crGraphColor['wrapup'], CrResource.colTeam.Realtime.AgentsInWrapup[0],   'team_realtime_AgentsInWrapup');
        _ColumnDef.Add(
		{ 
			_fullIndex : Team.Realtime.RealTimeGraph,
			_text : CrResource.colTeam.Realtime.RealTimeGraph,
			_type: Enums.column.type.Graph,
			_style: Enums.column.style.GraphBar,
			_detailDispalyType: Enums.column.panel.Graph,
			_columnInfo: _Info,
			_graphItems: _Info			
		});
        //History
        //_______      
        _List.DefaultColumnDef[Enums.model.keys.History] = new ColumnHeaderDescription();    
        //Production
        //__________    
         _List.DefaultColumnDef[Enums.model.keys.Production] = new ColumnHeaderDescription();
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.Production];
        
		this.SetColumnTypeProduction(_ColumnDef, Team.Production, CrResource.colCommon.Production);

        //Period Production
        //__________    
         _List.DefaultColumnDef[Enums.model.keys.PeriodProduction] = new ColumnHeaderDescription();
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.PeriodProduction];

		this.SetColumnTypeProduction(_ColumnDef, Team.PeriodProduction, CrResource.colCommon.PeriodProduction);
				
 		//ContactListInfo
        //_______________    
        _List.DefaultColumnDef[Enums.model.keys.ContactListInfo] = new ColumnHeaderDescription();
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.ContactListInfo];
				
        //SystemColumns
        //_____________________         
        _List.DefaultColumnDef[Enums.model.keys.SystemColumns] = new ColumnHeaderDescription();
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.SystemColumns];

        //UserColumns
        //_____________________         
        _List.DefaultColumnDef[Enums.model.keys.UserColumns] = new ColumnHeaderDescription();
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.UserColumns];
		
    },
    
    SetColumnDescriptionCampaign : function()
    {
        var _List = this.SuperItems[Enums.model.types.campaign]
        var _ColumnDef; 
        var _Info;
        
        if (_List == undefined) return;

        //Filters
        //_______
        //_List.FilterOnRow.Add(Enums.model.keys.RealTime, Enums.agent.realtime.StateIndex, Enums.operators.E, '0', Enums.filterOriginator.System, 'Undefined state');
        _List.DefaultGroupBy = new GroupByListCollection(Campaign.Parameters.Group);
        _List.DefaultGroupBy.Active = true; 
        
        //Parameters
        //_______         
        _List.DefaultColumnDef[Enums.model.keys.Parameters] = new ColumnHeaderDescription(this);
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.Parameters];
        
		_ColumnDef.Add(
		{ 
			_fullIndex : Campaign.Parameters.Id,
			_text : CrResource.colCampaign.Parameters.Id,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.Detail
		});	
        _ColumnDef.Add(
		{ 
			_fullIndex : Campaign.Parameters.Description,
			_text : CrResource.colCampaign.Parameters.Description,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_detailDispalyType: Enums.column.panel.Detail
		});	
        _ColumnDef.Add(
		{ 
			_fullIndex : Campaign.Parameters.Group,
			_text : CrResource.colCampaign.Parameters.Group,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_visible: false,
			_detailDispalyType: Enums.column.panel.Detail
		});	
        _ColumnDef.Add(
		{ 
			_fullIndex : Campaign.Parameters.Inbound,
			_text : CrResource.colCampaign.Parameters.Inbound,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.Detail
		});	
        _ColumnDef.Add(
		{ 
			_fullIndex : Campaign.Parameters.InboundCount,
			_text : CrResource.colCampaign.Parameters.InboundCount,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_detailDispalyType: Enums.column.panel.Detail
		});	
        _ColumnDef.Add(
		{ 
			_fullIndex : Campaign.Parameters.Outbound,
			_text : CrResource.colCampaign.Parameters.Outbound,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Text,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.Detail
		});	
        _ColumnDef.Add(
		{ 
			_fullIndex : Campaign.Parameters.OutboundCount,
			_text : CrResource.colCampaign.Parameters.OutboundCount,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_detailDispalyType: Enums.column.panel.Detail
		});	

        //Realtime
        //_______         
        _List.DefaultColumnDef[Enums.model.keys.RealTime] = new ColumnHeaderDescription(this);

        //History
        //_______         
        _List.DefaultColumnDef[Enums.model.keys.History] = new ColumnHeaderDescription(this);    
        //Production
        //__________    
         _List.DefaultColumnDef[Enums.model.keys.Production] = new ColumnHeaderDescription(this);
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.Production];
        
		this.SetColumnTypeProduction(_ColumnDef, Campaign.Production, CrResource.colCommon.Production);

        //Period Production
        //__________    
         _List.DefaultColumnDef[Enums.model.keys.PeriodProduction] = new ColumnHeaderDescription();
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.PeriodProduction];

		this.SetColumnTypeProduction(_ColumnDef, Campaign.PeriodProduction, CrResource.colCommon.PeriodProduction);
		       
 		//ContactListInfo
        //_______________    
        _List.DefaultColumnDef[Enums.model.keys.ContactListInfo] = new ColumnHeaderDescription();
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.ContactListInfo];
			
		_ColumnDef.Add(
		{ 
			_fullIndex : Campaign.ContactListInfo.ContactCount,
			_text : CrResource.colCampaign.ContactListInfo.ContactCount,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_detailDispalyType: Enums.column.panel.Detail
		});	
		_ColumnDef.Add(
		{ 
			_fullIndex : Campaign.ContactListInfo.ContactToDial,
			_text : CrResource.colCampaign.ContactListInfo.ContactToDial,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_detailDispalyType: Enums.column.panel.Detail
		});	
		_ColumnDef.Add(
		{ 
			_fullIndex : Campaign.ContactListInfo.ContactNeverDialed,
			_text : CrResource.colCampaign.ContactListInfo.ContactNeverDialed,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_detailDispalyType: Enums.column.panel.Detail
		});	
		_ColumnDef.Add(
		{ 
			_fullIndex : Campaign.ContactListInfo.ContactCallbacks,
			_text : CrResource.colCampaign.ContactListInfo.ContactCallbacks,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_detailDispalyType: Enums.column.panel.Detail
		});	
		_ColumnDef.Add(
		{ 
			_fullIndex : Campaign.ContactListInfo.ContactToRedial,
			_text : CrResource.colCampaign.ContactListInfo.ContactToRedial,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_detailDispalyType: Enums.column.panel.Detail
		});	
		_ColumnDef.Add(
		{ 
			_fullIndex : Campaign.ContactListInfo.ContactToNotRedial,
			_text : CrResource.colCampaign.ContactListInfo.ContactToNotRedial,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Numeric,
			_detailDispalyType: Enums.column.panel.Detail
		});		
        //SystemColumns
        //_____________________         
        _List.DefaultColumnDef[Enums.model.keys.SystemColumns] = new ColumnHeaderDescription();
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.SystemColumns];

        //UserColumns
        //_____________________         
        _List.DefaultColumnDef[Enums.model.keys.UserColumns] = new ColumnHeaderDescription();
        _ColumnDef = _List.DefaultColumnDef[Enums.model.keys.UserColumns];
    },                

	SetColumnTypeProduction : function(columnDef, indexList, textList)
	{
        _ColumnDef = columnDef;
        
        _ColumnDef.Add(
		{ 
			_fullIndex : indexList.PositiveCount,
			_text : textList.PositiveCount,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Float,		
			_detailDispalyType: Enums.column.panel.FieldHistory,
			_decimalPlace: 0
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : indexList.PositiveSum,
			_text : textList.PositiveSum,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Float,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory,
			_decimalPlace: 0
		});
		_ColumnDef.Add(
		{ 
			_fullIndex : indexList.NegativeCount,
			_text : textList.NegativeCount,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Float,		
			_detailDispalyType: Enums.column.panel.FieldHistory,
			_decimalPlace: 0
		});
		_ColumnDef.Add(
		{ 
			_fullIndex : indexList.NegativeSum,
			_text : textList.NegativeSum,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Float,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory,
			_decimalPlace: 0
		});
		_ColumnDef.Add(
		{ 
			_fullIndex : indexList.ArguedCount,
			_text : textList.ArguedCount,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Float,		
			_detailDispalyType: Enums.column.panel.FieldHistory,
			_decimalPlace: 0
		});
		_ColumnDef.Add(
		{ 
			_fullIndex : indexList.TotalQualified,
			_text : textList.TotalQualified,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Float,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory,
			_decimalPlace: 0
		});
		_ColumnDef.Add(
		{ 
			_fullIndex : indexList.TotalNotQualified,
			_text : textList.TotalNotQualified,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Float,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory,
			_decimalPlace: 0
		});
		_ColumnDef.Add(
		{ 
			_fullIndex : indexList.DialingActionTime,
			_text : textList.DialingActionTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : indexList.DialingActionPosTime,
			_text : textList.DialingActionPosTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : indexList.DialingActionNegTime,
			_text : textList.DialingActionNegTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : indexList.DialingActionArgTime,
			_text : textList.DialingActionArgTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : indexList.OnlineActionTime,
			_text : textList.OnlineActionTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : indexList.OnlineActionPosTime,
			_text : textList.OnlineActionPosTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
		_ColumnDef.Add(
		{ 
			_fullIndex : indexList.OnlineActionNegTime,
			_text : textList.OnlineActionNegTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : indexList.OnlineActionArgTime,
			_text : textList.OnlineActionArgTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : indexList.OnHoldActionTime,
			_text : textList.OnHoldActionTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : indexList.OnHoldActionPosTime,
			_text : textList.OnHoldActionPosTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : indexList.OnHoldActionNegTime,
			_text : textList.OnHoldActionNegTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : indexList.OnHoldActionArgTime,
			_text : textList.OnHoldActionArgTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : indexList.WrapUpActionTime,
			_text : textList.WrapUpActionTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : indexList.WrapUpActionPosTime,
			_text : textList.WrapUpActionPosTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : indexList.WrapUpActionNegTime,
			_text : textList.WrapUpActionNegTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : indexList.WrapUpActionArgTime,
			_text : textList.WrapUpActionArgTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : indexList.CommunicationActionTime,
			_text : textList.CommunicationActionTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : indexList.CommunicationActionPosTime,
			_text : textList.CommunicationActionPosTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : indexList.CommunicationActionNegTime,
			_text : textList.CommunicationActionNegTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : indexList.CommunicationActionArgTime,
			_text : textList.CommunicationActionArgTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : indexList.WorkActionTime,
			_text : textList.WorkActionTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : indexList.WorkActionPosTime,
			_text : textList.WorkActionPosTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : indexList.WorkActionNegTime,
			_text : textList.WorkActionNegTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
		_ColumnDef.Add(
		{ 
			_fullIndex : indexList.WorkActionArgTime,
			_text : textList.WorkActionArgTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});	
		_ColumnDef.Add(
		{ 
			_fullIndex : indexList.CompletedContacts,
			_text : textList.CompletedContacts,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
		_ColumnDef.Add(
		{ 
			_fullIndex : indexList.CompletedContactsTime,
			_text : textList.CompletedContactsTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});	
		_ColumnDef.Add(
		{ 
			_fullIndex : indexList.AvgArgComTime,
			_text : textList.AvgArgComTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : indexList.AvgArgWorkTime,
			_text : textList.AvgArgWorkTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : indexList.AvgPosComTime,
			_text : textList.AvgPosComTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : indexList.AvgPosWorkTime,
			_text : textList.AvgPosWorkTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : indexList.AvgNegComTime,
			_text : textList.AvgNegComTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});		
		_ColumnDef.Add(
		{ 
			_fullIndex : indexList.AvgNegWorkTime,
			_text : textList.AvgNegWorkTime,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Time,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});				
		_ColumnDef.Add(
		{ 
			_fullIndex : indexList.RatioTotQual_Tot,
			_text : textList.RatioTotQual_Tot,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Percent,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : indexList.RatioArg_Tot,
			_text : textList.RatioArg_Tot,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Percent,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : indexList.RatioArg_TotQual,
			_text : textList.RatioArg_TotQual,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Percent,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
		_ColumnDef.Add(
		{ 
			_fullIndex : indexList.RatioPos_Tot,
			_text : textList.RatioPos_Tot,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Percent,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : indexList.RatioPos_TotQual,
			_text : textList.RatioPos_TotQual,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Percent,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : indexList.RatioPos_Arg,
			_text : textList.RatioPos_Arg,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Percent,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
		_ColumnDef.Add(
		{ 
			_fullIndex : indexList.RatioNeg_Tot,
			_text : textList.RatioNeg_Tot,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Percent,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : indexList.RatioNeg_TotQual,
			_text : textList.RatioNeg_TotQual,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Percent,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : indexList.RationNeg_Arg,
			_text : textList.RationNeg_Arg,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Percent,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
		_ColumnDef.Add(
		{ 
			_fullIndex : indexList.AvgPosValue,
			_text : textList.AvgPosValue,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Float,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : indexList.AvgNegValue,
			_text : textList.AvgNegValue,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Float,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory
		});
        _ColumnDef.Add(
		{ 
			_fullIndex : indexList.sys_Reset,
			_text : textList.sys_Reset,
			_type: Enums.column.type.Value,
			_style: Enums.column.style.Float,
			_visible: false,
			_visibleInDetailPanel: false,
			_visibleForUser: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory
		});	
		_Info = new InlineGraphInfo();
        _Info.Add(indexList.RatioTotQual_Tot, crGraphColor['percent'], textList.RatioTotQual_Tot[0], 'Campaign_ProductionGraph_TQC_T');
        _ColumnDef.Add(
		{ 
			_fullIndex : indexList.RatioTotQual_TotGraph,
			_text : textList.RatioTotQual_TotGraph,
			_type: Enums.column.type.GraphPercent,
			_style: Enums.column.style.GraphBar,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory,
			_columnInfo: _Info,
			_graphItems : _Info
		});
		_Info = new InlineGraphInfo();
        _Info.Add(indexList.RatioArg_TotQual, crGraphColor['percent'], textList.RatioArg_TotQual[0], 'Campaign_ProductionGraph_A_TQC');
        _ColumnDef.Add(
		{ 
			_fullIndex : indexList.RatioArg_TotQualGraph,
			_text : textList.RatioArg_TotQualGraph,
			_type: Enums.column.type.GraphPercent,
			_style: Enums.column.style.GraphBar,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory,
			_columnInfo: _Info,
			_graphItems : _Info
		});
		_Info = new InlineGraphInfo();
        _Info.Add(indexList.RatioPos_TotQual, crGraphColor['percent'], textList.RatioPos_TotQual[0], 'Campaign_ProductionGraph_P_TQC');
        _ColumnDef.Add(
		{ 
			_fullIndex : indexList.RatioPos_TotQualGraph,
			_text : textList.RatioPos_TotQualGraph,
			_type: Enums.column.type.GraphPercent,
			_style: Enums.column.style.GraphBar,
			_visible: false,
			_visibleInDetailPanel: false,
			_detailDispalyType: Enums.column.panel.FieldHistory,
			_columnInfo: _Info,
			_graphItems : _Info			
		});
		_Info = new InlineGraphInfo();
        _Info.Add(indexList.RatioNeg_TotQual, crGraphColor['percent'], textList.RatioNeg_TotQual[0], 'Campaign_ProductionGraph_N_TQC');
        _ColumnDef.Add(
		{ 
			_fullIndex : indexList.RatioNeg_TotQualGraph,
			_text : textList.RatioNeg_TotQualGraph,
			_type: Enums.column.type.GraphPercent,
			_style: Enums.column.style.GraphBar,
			_visible: false,
			_visibleInDetailPanel: false,			
			_detailDispalyType: Enums.column.panel.FieldHistory,
			_columnInfo: _Info,
			_graphItems : _Info			
		});			
	}
}