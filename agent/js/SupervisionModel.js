  /*****************************/
 /***** Supervision model *****/
/*****************************/
function SupervisionModel(parent)
{
//Class data
//__________
	this.Version = "";
	//this.crUtcRef = new Date();
	//this.crUtcOffset = 0;
	
    ////debugger;
    this.ParentElement = parent;
    this.DashboardWindow;
	this.DashboardUpdate = [true, true, true, true]; //[agent, inbound, outbound, queue];
    //Supervision List
    this.SuperItems = new Array();

    this.SuperItems[Enums.model.types.Agent] = new SupervisionList(Enums.model.types.Agent, this);
    this.SetColumnDescriptionAgent();

    this.SuperItems[Enums.model.types.Inbound] = new SupervisionList(Enums.model.types.Inbound, this);
    this.SetColumnDescriptionInbound();

    this.SuperItems[Enums.model.types.Outbound] = new SupervisionList(Enums.model.types.Outbound, this);
    this.SetColumnDescriptionOutbound();

    this.SuperItems[Enums.model.types.Queue] = new SupervisionList(Enums.model.types.Queue, this);
    this.SetColumnDescriptionQueue();

    this.SuperItems[Enums.model.types.team] = new SupervisionList(Enums.model.types.team, this);
    this.SetColumnDescriptionTeam();

    this.SuperItems[Enums.model.types.campaign] = new SupervisionList(Enums.model.types.campaign, this);
    this.SetColumnDescriptionCampaign();
    
    this.VisibleDashboard = new Array();
    this.VisibleDashboard[Enums.model.types.Agent] = true;
    this.VisibleDashboard[Enums.model.types.Inbound] = true;
    this.VisibleDashboard[Enums.model.types.Outbound] = true;
    this.VisibleDashboard[Enums.model.types.Queue] = true;
    
    //Init
    //______
    this.SetInitDisplayIndex = function()
        {
            var len = this.SuperItems.length;
            for (var i = 0; i < len; i++)
            {
                var _OffSet = 0;
                var _h = this.SuperItems[i].DefaultColumnDef;
                //_c.crStartDisplayIndex = _OffSet;
                var lenj = _h.length;
                for (var j = 0; j < lenj; j++)
                {
                    var _c = _h[j].Items;
                    _h[j].crStartDisplayIndex = _OffSet;
                    var lenk = _c.length;
                    for (var k = 0; k < lenk; k++)
                    {
						if (_c[k]) {
							_c[k].DisplayIndex = _OffSet;
							_OffSet++;
						}
						else
						{
							alert('>Supervisionmodel SetInitDisplayIndex: type ' + i + ' key ' + j +' column ' + k);
						}
                    }
                }
            }
        };
    this.SetInitDisplayIndex();
//Function for dashboard
//______________________

//Global function  
    this.DisplayDashboard = function()
        {
            if(arguments.length > 0)
                this.DashboardWindow = arguments[0];
                
            if (!this.DashboardWindow) return;
            this.InitDashboard();
            ////debugger;
            
            this.RefreshDashboardAgent();
            this.RefreshDashboardInbound();
            this.RefreshDashboardOutbound();
            this.RefreshDashboardQueue();
            
        };
	this.RefreshDashboard = function()
	{
		if (this.DashboardUpdate[0]) this.RefreshDashboardAgent();
        if (this.DashboardUpdate[1]) this.RefreshDashboardInbound();
        if (this.DashboardUpdate[2]) this.RefreshDashboardOutbound();
		if (this.DashboardUpdate[3]) this.RefreshDashboardQueue();
		
		this.DashboardUpdate = [false, false, false, false];
	};
    this.RefreshDashboardAgent = function()
        {
            if (!this.DashboardWindow) return;
            
            ////debugger;
            this.SetElementForDashboard("dsbAgentCount", this.SuperItems[Enums.model.types.Agent].Items.length);
			this.SetElementForDashboard("dsbAgentActiveCount", this.getActiveAgentCount());
    		//this.SetElementForDashboard("dsbAgentTotalInPause", CrResource.Dashboard.dsbAgentTotalInPause, this.GetAgentTotalInState(Enums.model.agentState.Pause));        
			this.SetElementForDashboard("dsbAgentTotalInPause", this.GetAgentTotalInState(Enums.model.agentState.Pause));
            this.SetElementForDashboard("dsbAgentTotalInWaiting", this.GetAgentTotalInState(Enums.model.agentState.Waiting));
            this.SetElementForDashboard("dsbAgentTotalOnline", this.GetAgentTotalInState(Enums.model.agentState.Online));
            this.SetElementForDashboard("dsbAgentTotalWrapup", this.GetAgentTotalInState(Enums.model.agentState.Wrapup));        
        };
    this.RefreshDashboardInbound = function()
        {
            if (!this.DashboardWindow) return;
            
            ////debugger;

            this.SetElementForDashboard("dsbInboundCount", this.SuperItems[Enums.model.types.Inbound].Items.length);
            this.SetElementForDashboard("dsbInboundTotalInIvr", this.GetTotalCount(Inbound.Realtime.Ivr));
            this.SetElementForDashboard("dsbInboundTotalInQueue", this.GetTotalCount(Inbound.Realtime.Waiting));
            this.SetElementForDashboard("dsbInboundTotalOnline", this.GetTotalCount(Inbound.Realtime.Online));
            this.SetElementForDashboard("dsbInboundTotalWrapup", this.GetTotalCount(Inbound.Realtime.WrapUp));
            this.SetElementForDashboard("dsbInboundTotalInOverflow", this.GetTotalCount(Inbound.Realtime.Overflowing));
            this.SetElementForDashboard("dsbInboundTotalReceived", this.GetTotalCount(Inbound.History.Received));
            this.SetElementForDashboard("dsbInboundTotalHandledByAgent", this.GetTotalCount(Inbound.History.HandledByAgent));
        };
    this.RefreshDashboardOutbound = function()
        {
            if (!this.DashboardWindow) return;
            
            ////debugger;
            var _Value = 0;
            this.SetElementForDashboard("dsbOutboundCount", this.SuperItems[Enums.model.types.Outbound].Items.length);
            this.SetElementForDashboard("dsbOutboundInModePreview", this.GetCountOutboundMode(Enums.model.outboundMode.Preview));
            this.SetElementForDashboard("dsbOutboundInModeProgressive", this.GetCountOutboundMode(Enums.model.outboundMode.Progressive));
            this.SetElementForDashboard("dsbOutboundInModePredictive", this.GetCountOutboundMode(Enums.model.outboundMode.Predictive));
            _Value = this.GetCountOutboundMode(Enums.model.outboundMode.Undefined);
            _Value += this.GetCountOutboundMode(Enums.model.outboundMode.CallbacksOnly);
            _Value += this.GetCountOutboundMode(Enums.model.outboundMode.Power);
            _Value += this.GetCountOutboundMode(Enums.model.outboundMode.Fixed);
            _Value += this.GetCountOutboundMode(Enums.model.outboundMode.RestrictedPower);
            this.SetElementForDashboard("dsbOutboundInModeOther", _Value);
            this.SetElementForDashboard("dsbOutboundInDailing", this.GetTotalCount(Outbound.Realtime.SystemPreprocessing));
            this.SetElementForDashboard("dsbOutboundInWaiting", this.GetTotalCount(Outbound.Realtime.Waiting));
            this.SetElementForDashboard("dsbOutboundOnline", this.GetTotalCount(Outbound.Realtime.Online));
            this.SetElementForDashboard("dsbOutboundTotalAbandoned", this.GetTotalCount(Outbound.History.Abandoned));
            this.SetElementForDashboard("dsbOutboundTotalDailed", this.GetTotalCount(Outbound.History.Dialled));
        
        };
    this.RefreshDashboardQueue = function()
        {
            if (!this.DashboardWindow) return;
            
            ////debugger;

            this.SetElementForDashboard("dsbQueueCount", this.SuperItems[Enums.model.types.Queue].Items.length);
            this.SetElementForDashboard("dsbQueueInQueue", this.GetTotalCount(Queue.Realtime.Waiting));
            this.SetElementForDashboard("dsbQueueTotalAbandoned", this.GetTotalCount(Queue.History.Abandoned));
            this.SetElementForDashboard("dsbQueueTotalProcessed", this.GetTotalCount(Queue.History.Processed));
        };                
    this.InitDashboard = function()
	{
		var el;		
		for(key in CrResource.Dashboard)
		{
	    	//The key
	        el = this.DashboardWindow.document.getElementById('key_' + key);
	            
	        if (el != null) 
	        {
	        	el.innerHTML = CrResource.Dashboard[key];
			}
	        //The value
	        el = this.DashboardWindow.document.getElementById('value_' + key);
	        ////debugger;
	        if (el != null)
	        { 
	        	el.innerHTML = 0;
	      	}
		}
	};
	this.SetElementForDashboard = function(elementId, value)
        {
            var el = this.DashboardWindow.document.getElementById('value_' + elementId);
            ////debugger;
            if (el != null) 
            { 
                if(el.innerHTML != value) el.innerHTML = value;
            }
        };
        
//Get data for dashboard AGENT   
	this.getActiveAgentCount = function()
		{
			var _ReturnValue = 0;
            var len = this.SuperItems[Enums.model.types.Agent].Items.length;
            for (var i = 0; i < len; i++)
            {
				var _Item = this.SuperItems[Enums.model.types.Agent].Items[i].Data[Agent.Realtime.StatusIndex[1]][Agent.Realtime.StatusIndex[2]];

				if ((_Item != 0) 
				  && (_Item != 7))
				{
                	_ReturnValue++;
                }
            }
            
            return _ReturnValue;
		};
    this.GetAgentTotalInState = function (agentState)
        {
            ////debugger;
            var _ReturnValue = 0;
            var len = this.SuperItems[Enums.model.types.Agent].Items.length;
            for (var i = 0; i < len; i++)
            {
				var _Item = this.SuperItems[Enums.model.types.Agent].Items[i].Data[Enums.model.keys.RealTime][0];
            	if (_Item)
                {
                	if (parseInt(_Item) == agentState)
                    {
                    	_ReturnValue++;
                   	}
              	}
            }
            return _ReturnValue;
        };
//Get data for dashboard OUTBOUND   
    this.GetCountOutboundMode = function (outboundMode)
        {
            ////debugger;
            var _ReturnValue = 0;
            var len = this.SuperItems[Enums.model.types.Outbound].Items.length;
            for (var i = 0; i < len; i++)
            {
				var _Item = this.SuperItems[Enums.model.types.Outbound].Items[i].Data[Enums.model.keys.Parameters][0];
            	if (_Item)
                {
                    if (_Item == Enums.model.outboundMode[outboundMode])
                    {
                    	_ReturnValue++;
                	}
                }
            }
            
            return _ReturnValue;
        };        
//Get data for dashboard GLOBAL
    this.GetTotalCount = function (item)
        {
			var _List =	this.SuperItems[item[0]];
		   	var _Key = item[1];
		   	var _Index = item[2];
                        
            var _ReturnValue = 0;
            
            for (var i = 0; i < _List.Items.length; i++)
            {
				var _Item = _List.Items[i].Data[_Key][_Index];
                if (_Item != undefined)
                {                        
                	_ReturnValue += parseInt(_Item);
            	}
        	}
            return _ReturnValue;
        };

//Global functions
//________________
    /*this.setConfig = function (key, value)
	{
		if (key == "RealTime") 
		{
			var tmpx = new Date();
			var tmpDate = new Date();
			crUtcRef = getDate(value);
			crUtcOffset = tmpDate.valueOf() - crUtcRef.valueOf();
			
			alert("Offset: " + crUtcOffset + "\nNew: " + crUtcRef.toString() + "\nOld: " + tmpx.toString() + "\nUTC\nNew: " + crUtcRef.toUTCString() + "\nOld: " + tmpx.toUTCString());
		}
	};*/
    this.TypeNameToIndex = function(typeName)
        {
            var _TypeName = typeName.toUpperCase();
          
            switch(_TypeName)
            {
                case 'AGENT':
                    return Enums.model.types.Agent;
                case 'INBOUND':
                    return Enums.model.types.Inbound;
                case 'OUTBOUND':
                    return Enums.model.types.Outbound;
                case 'QUEUE':
                    return Enums.model.types.Queue;
                case 'TEAM':
                    return Enums.model.types.team;
                case 'CAMPAIGN':
                    return Enums.model.types.campaign;
                default:
                    return -1;
            }
            return -1;
        };
//Data functions
//______________
    this.RemoveItem = function(type, id)
        {
            var _Type = type;
            if (isNaN(_Type)) _Type = this.TypeNameToIndex(_Type);
            if (_Type == -1) return;
            
            this.SuperItems[_Type].RemoveItem(id);
        };
    this.AddItem = function(type, id)
        {
            var _Type = type;
			
            if (isNaN(_Type)) _Type = this.TypeNameToIndex(_Type);
            if (_Type == -1) return;

            this.SuperItems[_Type].AddItem(id);
        };
        
    this.SetKey = function(type, id, key, value)    
        {
            if (!id) return;
			
            var _Type = type;
			//if(_Type == "SupervisionConfig") { this.setConfig(key, value); }
            if (isNaN(_Type)) _Type = this.TypeNameToIndex(_Type);
            if (_Type == -1) return;

            this.SuperItems[_Type].SetKey(id, key, value);
                               
            switch(_Type)
            {
                case Enums.model.types.Agent:
                    this.DashboardUpdate[0] = true; //this.RefreshDashboardAgent();
                    break;
                case Enums.model.types.Inbound:
                    this.DashboardUpdate[1] = true; //this.RefreshDashboardInbound();
                    break;
                case Enums.model.types.Outbound:
                    this.DashboardUpdate[2] = true; //this.RefreshDashboardOutbound();
                    break;
                case Enums.model.types.Queue:
                    this.DashboardUpdate[3] = true; //this.RefreshDashboardQueue();
                    break;
                default:
                    break;
            }
        };
        
    this.GetValueOf = function(item, id)
    {
            //Search index of the id
        var _Index;
        _Index = this.IndexOf(id);
        if(_Index < 0) return;
                
        return this.SuperItems[item[0]].Items[_Index].Data[item[1]][item[2]];
    };
}

  /****************************/
 /***** Supervision List *****/
/****************************/
function SupervisionList(id, model)
{
    this.Model = model;
    this.Id = id;
    this.Items = new Array();
    this.Window = new Array();
    this.DefaultColumnDef = new Array();
    this.DefaultFilterOnRow = new FilterOnRowList();
    this.DefaultGroupBy = new GroupByListCollection();

    this.DisposeWindow = function(index)
        {
            this.Window = new Array();
            /*SelectedItemId = undefined;
            this.CurrentItemId = undefined;
            this.CurrentDetailItem = undefined;*/
            
        };
    this.NewWindow = function()
        {
            var _NewWindow;
            if(arguments.length > 0)
                _NewWindow = arguments[0];
            
            if (!_NewWindow) return;
            
            var _NewIndex = this.Window.length;
            this.Window[_NewIndex] = _NewWindow;
            _NewWindow.WindowIndex = _NewIndex;
            this.InitWindow(_NewWindow);
        };
    this.InitWindow = function(window)
        {
            window.FilterOnRow = this.DefaultFilterOnRow;
            window.GroupByList = this.DefaultGroupBy; 
            window.ColumnDef = this.DefaultColumnDef;
            //window.RenderClass = this.DefaultRenderClass;
        };  
    this.SetKey = function(id, key, value)    
        {
            if(!id) return;
            
            //Search index of the id
            var _Index;
            _Index = this.IndexOf(id);
            if(_Index < 0) return;
            
            //Check the key
            var _Key = key;
            if (isNaN(_Key)) _Key = this.KeyNameToIndex(_Key);
            if (_Key < 0) {
				alert('Key is unknow ' + key + " id " + _Key);
				return;
			}
            
            switch (_Key)
            {
                case Enums.model.keys.PeakRealTime:
                    this.Items[_Index].AddPeakRealTime(value);
                    break;
                case Enums.model.keys.PeakHistory:
                    this.Items[_Index].AddPeakHistory(value);
                    break;
				case Enums.model.keys.PeakProduction:
                    this.Items[_Index].AddPeakProduction(value);
                    break;
                default:
                    this.Items[_Index].Data[_Key] = value;
                    if(this.Window.length > 0) this.ItemChange(id);
                    break;
            }
            this.RefreshDetail(id);
        };
    this.GetValueOf = function(item, id)
    {
            //Search index of the id
            var _Index;
            _Index = this.IndexOf(id);
            if(_Index < 0) return;
                
        return this.Items[_Index].Data[item[1]][item[2]];
    }
//Render functions
//________________
    this.GetFocus = function()
        {
            if(this.Window.length <= 0) return false;
            
            this.Window[0].focus();  
            return true;      
        };        
        
    /*this.GroupContainsItems= function(groupId)
        {
            for(var i = 0; i < this.Items.length; i++)
            {
                if (this.CheckFilterOnRow(this.Items[i]))
                {
                    if(this.Items[i].Data[this.GroupList.GroupByTypeIndex][this.GroupList.GroupByItemIndex] == groupId)
                    {
                        return true;
                    }
                }
            }
            return false;
        };*/

    this.KeyNameToIndex = function(keyName)
        {
            var _KeyName = keyName.toUpperCase();
          
            switch(_KeyName)
            {
                case 'PARAMETERS':
                    return Enums.model.keys.Parameters;
                case 'REALTIME':
                    return Enums.model.keys.RealTime;
                case 'HISTORY':
                    return Enums.model.keys.History;
				case 'PRODUCTION' :
					return Enums.model.keys.Production;
				case 'PERIODPRODUCTION' :
					return Enums.model.keys.PeriodProduction;					
				case 'CONTACTLISTINFO' :
					return Enums.model.keys.ContactListInfo;
                case 'PEAKPARAMETERS':
                    return Enums.model.keys.PeakParameters;
                case 'PEAKREALTIME':
                    return Enums.model.keys.PeakRealTime;
                case 'PEAKHISTORY':
                    return Enums.model.keys.PeakHistory;  
				case 'PEAKPRODUCTION' :
					return Enums.model.keys.PeakProduction;
                default:
                    return -1;
                    break;
            }
            return -1;
        };
    //Members Global
    this.RemoveItem = function(id)
        {
            if(!id) return;
            
            var _Index;
            _Index = this.IndexOf(id);
            if(_Index < 0) return;
            
            this.RemoveLine(id);
            
            var _GroupId = this.Items[_Index].Data[this.GroupList.GroupByItem[1]][this.GroupList.GroupByItem[2]];
            
            this.Items.splice(_Index, 1);
            
            if (!this.GroupContainsItems(_GroupId)) this.RemoveGroup(_GroupId);
        };
    this.AddItem = function(id)
        {
            if(!id) return;
            if(this.ContainsId(id)) return;
            this.Items[this.Items.length] = new SupervisionItem(id);
            //this.AddLine(id);
            if(this.Window.length > 0) this.ItemAdd(id);
        };
        
    this.ContainsId = function(id)
        {
            //Type is of the type Enums.model.types
            if (id == null) return false;
        
            for(var i = 0; i < this.Items.length; i++)
            {
                if( this.Items[i].Id == id) return true;
            }
            return false;
        }; 
        
    this.GetData = function(item, index)
    {
        return Items[index].Data[ident[1]][ident[2]];
    };
    
    this.IndexOf = function(id)
        {
            //Type is of the type Enums.model.types
            if (id == null) return -1;
        
            for(var i = 0; i < this.Items.length; i++)
            {
                if( this.Items[i].Id == id) return i;
            }
            return -1;
        }; 

}
SupervisionList.prototype.TimerUpdate = function(utcTime)
{
    for(var i = 0; i < this.Window.length; i++)
    {
        this.Window[i].RenderClass.TimerUpdate(utcTime);
    }
}
SupervisionList.prototype.ItemChange = function(id)
{
    for(var i = 0; i < this.Window.length; i++)
    {
        this.Window[i].RenderClass.DrawElement(id);
    }
}
SupervisionList.prototype.ItemAdd = function(id)
{
    for(var i = 0; i < this.Window.length; i++)
    {
        this.Window[i].RenderClass.DrawElement(id);
    }    
}
SupervisionList.prototype.ItemRemove = function(id)
{

}
SupervisionList.prototype.RefreshScreen = function (id)
{

}
SupervisionList.prototype.RefreshDetail = function(id)
{
    for(var i = 0; i < this.Window.length; i++)
    {
        this.Window[i].RenderClass.UpdateDetailPanel(id);
    }
}

    
  /****************************/
 /***** Supervision item *****/
/****************************/
function SupervisionItem(id)
{
    this.Id = id;
    this.HostWindow = '';
    
    this.Data = new Array();
    this.Data[Enums.model.keys.Parameters] = new Array();
    this.Data[Enums.model.keys.RealTime] = new Array();
    this.Data[Enums.model.keys.History] = new Array();
    this.Data[Enums.model.keys.Production] = new Array();
	this.Data[Enums.model.keys.PeriodProduction] = new Array();
	this.Data[Enums.model.keys.ContactListInfo] = new Array();
    this.Data[Enums.model.keys.PeakRealTime] = new Array();
    this.Data[Enums.model.keys.PeakHistory] = new Array();
    this.Data[Enums.model.keys.PeakProduction] = new Array();
 
    this.AddPeakRealTime = function(value)
        {
            var _Item = this.Data[Enums.model.keys.PeakRealTime];
            for(var i = _Item.length; i > 0; i--)
            {
                if (i != const_PanelDetailHistorySize)
                {
                    _Item[i] = _Item[i -1];
                }
            }
            _Item[0] = new Array();
            _Item[0] = value;
        };
    this.AddPeakHistory = function(value)
        {
            var _Item = this.Data[Enums.model.keys.PeakHistory];
            for(var i = _Item.length; i > 0; i--)
            {
                if (i != const_PanelDetailHistorySize)
                {
                    _Item[i] = _Item[i -1];
                }
            }
            _Item[0] = new Array();
            _Item[0] = value;                   
        };
	this.AddPeakProduction = function(value)
        {
            var _Item = this.Data[Enums.model.keys.PeakProduction];
            for(var i = _Item.length; i > 0; i--)
            {
                if (i != const_PanelDetailHistorySize)
                {
                    _Item[i] = _Item[i -1];
                }
            }
            _Item[0] = new Array();
            _Item[0] = value;                   
        };

}
