//_________________________________________________________
//List constructors
//new HTMLForm  --> HTMLForm(ownerElement, id, height, width, minX, maxX, minY, maxY, bSwapHorzRef, bSwapVertRef, fXMapper, fYMapper)
//_________________________________________________________
//Panel enums
//___________________
var Cc_Mode = 
{
    'New'       : 0,
    'Edit'      : 1,
    'Remove'    : 2
};
var FormList =
{
    '0' : 'ColumnSelection',
    '1' : 'ColumnGroupBy',
    '2' : 'CustomColumns',
    '3' : 'FilterOnRows',
    
    'ColumnSelection'   : 0,
    'ColumnGroupBy'     : 1,
    'CustomColumns'     : 2,
    'FilterOnRows'      : 3
};
//_________________________
//Global functions & var 
//_________________________
var FilterOnRow = new FilterOnRowList();
var GroupByList = new GroupByListCollection(); 
var ColumnDef = new Array();
var Forms = new Array();
//TOM var SelectedItemId;
var SelectedColumnId;
var SelectedRowId;
//TOM var SelectedCellId;
//var CurrentItemId;
//var CurrentDetailItem;
var WindowIndex = null;
var RenderClass = null;
//var TimerId = new Array();
//<----- Init of the window
function Init_Window()
{
    var _Index;
	//
    //window strip
    //
	setDefaultToolbarLayout($("sup_AgentWindow"), function() { window.opener.onClickAgent();}); 
    setDefaultToolbarLayout($("sup_InboundWindow"), function() { window.opener.onClickInbound();}); 
    setDefaultToolbarLayout($("sup_OutboundWindow"), function() { window.opener.onClickOutbound();}); 
    setDefaultToolbarLayout($("sup_QueueWindow"), function() { window.opener.onClickQueue();}); 
    setDefaultToolbarLayout($("sup_TeamWindow"), function() { window.opener.onClickTeam();}); 
    setDefaultToolbarLayout($("sup_CampaignWindow"), function() { window.opener.onClickCampaign();}); 
	//
    //ToolStrip
    //
    setDefaultToolbarLayout($("bntShowHideDetail"), function() { OnClick_bntShowHideDetail();}); 
    setDefaultToolbarLayout($("bntSelectionColumn"), function() { OnClick_bntShowForm(FormList.ColumnSelection);});      
    _Index = Forms.length;
    Forms[FormList.ColumnSelection] = new HTML_Form(document.getElementById("body"), "ColumnSelectionForm", 320, 315, 1, document.body.clientWidth, 50, document.body.clientHeight);
    Forms[FormList.ColumnSelection].Show();
    Forms[FormList.ColumnSelection].setTitle(CrResource.ColumnSelectionForm._Title);
    Forms[FormList.ColumnSelection].AddButton("btnOk", CrResource.Buttons._Ok, function() { OnClick_btnOk(); });
    Forms[FormList.ColumnSelection].AddButton("btnApply", CrResource.Buttons._Apply, function() { OnSetColumnVisibility(); });
    Forms[FormList.ColumnSelection].AddButton("btnCancel", CrResource.Buttons._Cancel, function() { OnClick_btnCancel();});
    Forms[FormList.ColumnSelection].AddButton("btnReset", CrResource.Buttons._Reset, function() { OnResetColumnVisibility(); });
    Forms[FormList.ColumnSelection].setVisibility(false);

    setDefaultToolbarLayout($("bntGroupByOption"), function() { OnClick_bntShowForm(FormList.ColumnGroupBy);});       
    _Index = Forms.length;
    Forms[FormList.ColumnGroupBy] = new HTML_Form(document.getElementById("body"), "ColumnGroupBy", 325, 300, 1, document.body.clientWidth, 50, document.body.clientHeight);
    Forms[FormList.ColumnGroupBy].Show();
    Forms[FormList.ColumnGroupBy].setResizeble(false);
    Forms[FormList.ColumnGroupBy].setTitle(CrResource.GroupByForm.Title);
    //TO DO Forms[FormList.ColumnGroupBy].AddButton("btnGroupByOk", CrResource.Buttons._Ok, function() { OnClick_btnGroupByOk(); });
    Forms[FormList.ColumnGroupBy].AddButton("btnGroupByApply", CrResource.Buttons._Apply, function() { OnSetGroupBy(); });
    Forms[FormList.ColumnGroupBy].AddButton("btnGroupByCancel", CrResource.Buttons._Cancel, function() { btnGroupByCancel(); });
    //TO DO Forms[FormList.ColumnGroupBy].AddButton("btnGroupByReset", CrResource.Buttons._Reset);
    Forms[FormList.ColumnGroupBy].setVisibility(false);
    
    //Button Custom columns
    setDefaultToolbarLayout($("bntCustomColumns"), function() { OnClick_bntShowForm(FormList.CustomColumns);});       
    _Index = Forms.length;
    Forms[FormList.CustomColumns] = new HTML_Form(document.getElementById("body"), "formCustomColumns", 357, 654, 1, document.body.clientWidth, 50, document.body.clientHeight);
    Forms[FormList.CustomColumns].Show();
    Forms[FormList.CustomColumns].setResizeble(false);
    Forms[FormList.CustomColumns].setTitle(CrResource.CustomColumns.Title);
    Forms[FormList.CustomColumns].AddButton("btnCCOk", CrResource.Buttons._Ok, function() { OnClick_btnCCActionOk(); });
    Forms[FormList.CustomColumns].AddButton("btnCCCancel", CrResource.Buttons._Cancel, function() { OnClick_btnCCActionCancel(); });
    Forms[FormList.CustomColumns].AddButton("btnCCSave", CrResource.Buttons._Save, function() { OnClick_btnCCActionSave(); });
    Forms[FormList.CustomColumns].setVisibility(false);
    Forms[FormList.CustomColumns].CC_CurrentIndex = -1;
    Forms[FormList.CustomColumns].CC_Mode = -1;
	
	setToolStripLanguage($('NavigatorToolStrip'));
	setToolStripLanguage($('MenuToolStrip'));

	//debugger;				
    window.opener.OnSupervisionWindowLoaded(window, window.Key);
    RenderClass = new DefaultSupervisionRenderManager(window);
    
    var y = 0
    y = 100;
	
	setInterval(RenderClass.UpdateTimerField, 1000);
}
/*function UpdateTimerValues()
{
	
}*/
function UnLoaded_Window()
{
    window.opener.OnSupervisionWindowUnLoaded(window.Key);
}
function OnClick_bntShowForm(index)
{
    if (Forms[index].IsVisible)
    {
        Forms[index].setVisibility(false);
    }
    else
    {
        Forms[index].setVisibility(true);
        if (index == FormList.ColumnGroupBy) RenderClass.RefreshGroupByListForm();
    }
}
// <-- 

function OnResizeSupervisionWindow()
{
    var _Object;
	var _Object2;
    var _HeightCal;
    var _WidthCal;
    var _WidthDetailPanel = 200;
    //debugger;
    _Object = $("SupervisionPanel");
    _WidthCal = document.body.clientWidth;
    if (_WidthCal < 0) _WidthCal = 0;
    _Object.style.width = _WidthCal + "px";	
    
    _Object = $("DataListDetailPanelCell");
    _HeightCal = document.body.clientHeight - 50 - 12; //-12 for firefox
    if (_HeightCal < 0) _HeightCal = 0;
    _Object.style.height = _HeightCal + "px";	
    
    _Object = $("PanelInfo");
    _HeightCal = _HeightCal - 30 - 30;
    //_WidthCal = _WidthDetailPanel - 100;
    if (_HeightCal < 0) _HeightCal = 0;
    _Object.style.height = _HeightCal + "px";
    
    _Object = $("DataListPanelCell");//TD
	_Object2 = $("DataListPanel");//DIV
    _HeightCal = document.body.clientHeight - 50 - 12; //-12 for firefox
    //_WidthCal = document.body.clientWidth - document.getElementById("DataListDetailPanelCell").clientWidth;
    _WidthCal = document.body.clientWidth - _WidthDetailPanel - 20;
	var _New_WidthCal = _WidthCal;
	
    if (_HeightCal < 0) _HeightCal = 0;
    _Object.style.height = _HeightCal + "px";	
    if (_WidthCal < 0) _WidthCal = 0;
    _Object.style.width = _WidthCal + "px";	
	
	_Object2.style.width = _New_WidthCal + "px";

    for (var i_tem = 0; i_tem < Forms.length; i_tem++)
    {
        Forms[i_tem].MainContainer.maxX = document.body.clientWidth;
        Forms[i_tem].MainContainer.maxY = document.body.clientHeight;
        if (parseInt(Forms[i_tem].MainContainer.style.left) > parseInt(document.body.clientWidth))
        {
            var _Left = document.body.clientWidth - 100;
            if (_Left < Forms[i_tem].MainContainer.minX) _Left = Forms[i_tem].MainContainer.minX;
            Forms[i_tem].MainContainer.style.left = _Left + "px";
        }
        if (parseInt(Forms[i_tem].MainContainer.style.top) > parseInt(document.body.clientHeight))
        {
            var _Top = document.body.clientHeight - 100;
            if (_Top < Forms[i_tem].MainContainer.minY) _Top = Forms[i_tem].MainContainer.minY;
            Forms[i_tem].MainContainer.style.top = _Top + "px";
        }
    }
}

function OnClick_bntShowHideDetail()
{
    if (window.DetailPanelVisible)
    {
        addElementClass(document.getElementById("DataListDetailPanelCell"), 'Hide');
        window.DetailPanelVisible = false;
    }
    else
    {
        removeElementClass(document.getElementById("DataListDetailPanelCell"), 'Hide')
        window.DetailPanelVisible = true;
    }
}
		    
//______________________________
//Supervision button functions
//______________________________
var currentListenAgent = null;
function Init_SupervisionButtons()
{
    var _Button; //btnViewer
	setDefaultToolbarLayout( $("bntSupListen"), function() { OnClick_bntSupListen();});
	setDefaultToolbarLayout( $("btnSupViewer"), function() { OnClick_btnSupViewer();});
	//setDefaultToolbarLayout( $("bntSupIntrude"), function() { OnClick_bntCallAgent();});  
	//setDefaultToolbarLayout( $("bntSupWhisper"), function() { OnClick_bntCallAgent();});
	//setDefaultToolbarLayout( $("bntSupRecording"), function() { OnClick_bntCallAgent();});
	setDefaultToolbarLayout( $("bntSupListenStop"), function() { OnClick_bntSupListenStop();});
	//setDefaultToolbarLayout( $("bntSupView"), function() { OnClick_bntSupView();});
	setDefaultToolbarLayout( $("bntSupChatListen"), function() { OnClick_bntSupChatListen();});
	
	setToolStripLanguage($('SupervisionActionToolStrip'));
}
var btnToggleChatSpy = false;
function OnClick_bntSupChatListen()
{
	//debugger;
	if (btnToggleChatSpy) 
	{
		btnToggleChatSpy = false;
	    window.opener.OnSupervisionListStopToChat();
		currentListenAgent = null;
		NotShowListenAgent();
		toggleOffToolStripItem($("bntSupChatListen"));
	}
	else 
	{
		btnToggleChatSpy = true;
		currentListenAgent = null;
		if (!SelectedRowId) 
			return;
		window.opener.OnSupervisionListToChat(SelectedRowId.split("_")[1]);
		currentListenAgent = SelectedRowId;
		ShowListenAgent(currentListenAgent);
		
		//crChatSpyWindow.Show();
		toggleOnToolStripItem($("bntSupChatListen"));
	}
}
var btnToggleVoiceListen = false;
function OnClick_bntSupListen()
{
	if(btnToggleVoiceListen)
	{
		btnToggleVoiceListen = false;
	    window.opener.OnSupervisionListStopToAgent();
		currentListenAgent = null;
		NotShowListenAgent();
		toggleOffToolStripItem($("bntSupListen"));
	}
	else
	{
		btnToggleVoiceListen = true;
		currentListenAgent = null;
		if (!SelectedRowId) 
			return;
		window.opener.OnSupervisionListToAgent(SelectedRowId.split("_")[1]);
		currentListenAgent = SelectedRowId;
		ShowListenAgent(currentListenAgent);
		toggleOnToolStripItem($("bntSupListen"));
	}
}

function StopCoachAction()
{
	if (btnToggleChatSpy) OnClick_bntSupChatListen();
	if (btnToggleVoiceListen) OnClick_bntSupListen();
}

function OnClick_bntSupListenStop()
{
    window.opener.OnSupervisionListStopToAgent();
	currentListenAgent = null;
	NotShowListenAgent();
}

function OnClick_btnSupViewer()
{
	if (!SelectedRowId) return;
	//Clean previous vnc
	if($("xxVNCViewerStart")) $Del("xxVNCViewerStart");
	
	//debugger;
	var ip = RenderClass.ActionGetAgentInfo(Agent.Parameters.IpAddress, SelectedRowId.split("_")[1]);
	var WindowLocation = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "vncviewer.jar";
	//http://t61tom:8088/agent/vncviewer.jar
	
	divId = document.createElement('div');
	divId.id = "xxVNCViewerStart";
	divId.style.dispaly = "none";
	divId.innerHTML = '<applet CODE="vncviewer/VNCViewer.class" ARCHIVE="' + WindowLocation + '" height="250" width="400">' +
			'<param name="port" value="5900">' +
			'<param name="server" value="' + ip + ':0">' +
			'<param name="ViewOnly" value="true">' +
			'<param name="Shared" value="true">' +
			'<param name="AlwaysShowServerDialog" value="false">' +
		'</applet>'
	document.body.appendChild(divId);
	//$Del("xxVNCViewerStart");
}
			
//______________________________
//Events
//______________________________
function ShowListenAgent(id)
{
    if (!id) return;
    
    currentListenAgent = id;
    
    var _Table = $(const_WindowPanelDataTableId);
    if(!_Table) return;
    
    for(var i = 0; i < _Table.rows.length; i++)
    {
        if (_Table.rows[i].id == currentListenAgent)
        {
            addElementClass(_Table.rows[i], 'ListenAgentRow');
        }
        else
        {
            removeElementClass(_Table.rows[i], 'ListenAgentRow');
        }
    }
}
function NotShowListenAgent()
{
    var _Table = $(const_WindowPanelDataTableId);
    if(!_Table) return;
    
    for(var i = 0; i < _Table.rows.length; i++)
    {
     	removeElementClass(_Table.rows[i], 'ListenAgentRow');
    }
}

function OnClick_Row(id)
{
    if (!id) return;
    
    //SelectedItemId = id;
    SelectedRowId = id;
    //SelectedColumnId = null;
    //this.CurrentItemId = id;
    
    var _Table = $(const_WindowPanelDataTableId);
    if(!_Table) return;
    
    for(var i = 0; i < _Table.rows.length; i++)
    {
        if (_Table.rows[i].id == SelectedRowId)
        {
            addElementClass(_Table.rows[i], 'SelectedInfoRow');
        }
        else
        {
            removeElementClass(_Table.rows[i], 'SelectedInfoRow');
        }
    }
}

function OnClick_Column(cellId)
{
    //"col_" + i + "_" + j + "_" + id;
    //i = Type
    //j = itemvalue
    //id = id of supervision item;
    //debugger;
    if (!cellId) return;
    if (this.SelectedColumnId == cellId) return;
    this.SelectedColumnId = cellId;
    
    RenderClass.SetDetailPanel(this.SelectedColumnId);
}
// --> Column selection window
function OnClick_btnOk()
{
    OnSetColumnVisibility();
    Forms[FormList.ColumnSelection].setVisibility(false);
}
function OnClick_btnCancel()
{
    OnResetColumnVisibility();
    Forms[FormList.ColumnSelection].setVisibility(false);
}
function OnClick_bntColumnWindowExit()
{
    Forms[FormList.ColumnSelection].setVisibility(false)	        
}
function OnColumnCheckClick(id)
{
    if (!id) return;
    
    var _Table = $(const_ColumnSelectionTableId);
    
    if(!_Table) return;
    
    for(var i = 0; i < _Table.rows.length; i++)
    {
        if (_Table.rows[i].id == id)
        {
            if (_Table.rows[i].cells[1])
            {
                var _Img = _Table.rows[i].cells[1].firstChild;
                if (_Table.rows[i].cells[1].Check == false)
                {
                    //_Table.rows[i].cells[1].innerHTML = "<img src='" + const_Checkbox_Check + "' />"; 
                    _Img.src = const_Checkbox_Check;
                    _Table.rows[i].cells[1].Check = true; 
                } else
                {
                    //_Table.rows[i].cells[1].innerHTML = "<img src='" + const_Checkbox_UnCheck + "' />";
                    _Img.src = const_Checkbox_UnCheck;
                    _Table.rows[i].cells[1].Check = false;   
                }
            }
            break;
        }
    }
}

function OnSetColumnVisibility()
{
    var _Table = $(const_ColumnSelectionTableId);
    
    if(!_Table) return;
    
    for(var i = 0; i < _Table.rows.length; i++)
    {
        var _Id = new Array;
        var _TypeIndex;
        var _TypeArrayIndex;
        _Id = _Table.rows[i].id.split("_");

        if (_Id.length > 2)
        {
            var _TypeIndex = parseInt(_Id[1]);
            var _TypeArrayIndex = parseInt(_Id[2]);
        
            ColumnDef[_TypeIndex].Items[_TypeArrayIndex].Visible = _Table.rows[i].cells[1].Check; 
        }
    } 
    
    RenderClass.ReDrawScreen();
}

function OnResetColumnVisibility()
{
    RenderClass.SetColumnSelectionForm();
} 
// <--
// --> Group by selection window
function OnClick_btnGroupByOk()
{
    OnSetGroupBy();
    Forms[FormList.ColumnGroupBy].setVisibility(false);
}

function OnSetGroupBy()
{
    var _ComboBox = $(const_GroupByComboBox);
    
    if(!_ComboBox) return;
    if(!_ComboBox.value) return;

    
    var _Update = false;
    if (_ComboBox.value == '-1')
    {
        if (GroupByList.Active) _Update = true;
        GroupByList.Active = false;
    } else
    {
        if (GroupByList.Active) _Update = true;
        GroupByList.Active = true;
    }

    if (_ComboBox.value != '-1')
    {    
        var _Ids = new Array();
        _Ids = _ComboBox.value.split('_');
        _Key = _Ids[0];
        _Item = _Ids[1];
        if (_Key == GroupByList.GroupByItem[1] && _Item == GroupByList.GroupByItem[2] && _Update == false) return;
        _Update = true;
        
        GroupByList.Clear();                        
        GroupByList.GroupByItem = ColumnDef[_Key].Items[_Item].FullIndex;
        GroupByList.IsArray = ColumnDef[_Key].Items[_Item].ColumnGroupByInfon.IsArray;
        GroupByList.IsArrayItem = ColumnDef[_Key].Items[_Item].ColumnGroupByInfon.IsArrayItem;
    }
    if (_Update) RenderClass.ReDrawScreen();
}

function btnGroupByCancel()
{
    //OnResetColumnVisibility();
    Forms[FormList.ColumnGroupBy].setVisibility(false);
}
// <--
// --> Collapse or expand a group on the screen
function onclick_Group(groupId)
{
	try 
	{
		var _Group = GroupByList.Items[GroupByList.IndexByKey(groupId.split("_")[1])];
		var _Row = $(groupId);
		
		if (_Group.IsExpand) 
		{
			var _Img = _Row.cells[0].firstChild;
			_Img.src = const_Collapse;
			_Img.alt = CrResource.MainTable.CollapseTooltip;
			setGroupDisplayTo("none", _Row.rowIndex);
			
			_Group.IsExpand = false;
		}
		else 
		{
			var _Img = _Row.cells[0].firstChild;
			_Img.src = const_Expand;
			_Img.alt = CrResource.MainTable.ExpandTooltip;
			setGroupDisplayTo("", _Row.rowIndex);
			_Group.IsExpand = true;
		}
	}
	catch(e)
	{
		debugger;
	}
}

function setGroupDisplayTo(value, index)
{
    var _Display = value;
    var _Table = $(const_WindowPanelDataTableId);
    for ( var i = index + 1; i < _Table.rows.length; i++)
    {
        if (_Table.rows[i].id.substring(0, const_GroupByRowIdent.length) == const_GroupByRowIdent) break;
        _Table.rows[i].style.display = _Display;
    }
}
// <---
// ---> Custom field functions
function OnClick_btnCCActionAdd()
{
    //Enable screen
    RenderClass.EndCustomColumnsForm();
    //create a new item
    var _NewIndex = ColumnDef[Enums.model.keys.UserColumns].Items.length;
    $('cboCustomColumnSelection').selectedIndex = 0;
    $('CC_txtName').value = CrResource.CustomColumns.NewName + _NewIndex;
    $('CC_txtDescription').value = CrResource.CustomColumns.NewDescription + _NewIndex;
    $('CC_chkVisible').checked = true;
    $('CC_chkVisiblePanel').checked = true;
    $('CC_cboStyle').selectedIndex = Enums.column.style.Text;
    $('CC_txtAre_Eval').value = "";
    Forms[FormList.CustomColumns].CC_CurrentIndex = _NewIndex;
    Forms[FormList.CustomColumns].CC_Mode = Cc_Mode.New;
}
function OnClick_btnCCActionEdit()
{
    //TO DO ID1: if (CheckSave()) { if (window.confirm('Do you want to save change?')) { this.OnClick_btnCCActionSave(); } }
    if (parseInt($('cboCustomColumnSelection').value) < 0) { this.OnClick_btnCCActionAdd(); return; }
    //Enable screen
    RenderClass.EndCustomColumnsForm();
    //create a new item
    var _Index = parseInt($('cboCustomColumnSelection').value);
    var _Column = ColumnDef[Enums.model.keys.UserColumns].Items[_Index];
    $('CC_txtName').value = _Column.Name;
    $('CC_txtDescription').value = _Column.Description;
    $('CC_chkVisible').checked = _Column.Visible;
    $('CC_chkVisiblePanel').checked = _Column.VisibleInDetailPanel;
    $('CC_cboStyle').selectedIndex = _Column.Style;
    $('CC_txtAre_Eval').value = _Column.Formula;
    Forms[FormList.CustomColumns].CC_CurrentIndex = _Index;
    Forms[FormList.CustomColumns].CC_Mode = Cc_Mode.Edit;
}
function OnClick_btnCCActionRemove()
{
    //TO DO ID2: confirm delete
    //if (parseInt($('cboCustomColumnSelection').value) < 0) alert(""); 
    
    var _Index = parseInt($('cboCustomColumnSelection').value);
    ColumnDef[Enums.model.keys.UserColumns].Remove(_Index);

    Forms[FormList.CustomColumns].CC_CurrentIndex = -1;
    Forms[FormList.CustomColumns].CC_Mode = -1;
    
    this.RefreshAfterCustomColumnChange();
}
function OnClick_btnCCActionEval()
{
    try
    {
        removeElementClass($('CC_txtReturnEval'), 'CC_Error');
        $('CC_txtReturnEval').value = RenderClass.EvalFormula($('CC_txtAre_Eval').value, 0);
        addElementClass($('CC_txtReturnEval'), 'CC_Correct');
    }
    catch(e)
    {
        removeElementClass($('CC_txtReturnEval'), 'CC_Correct');
        $('CC_txtReturnEval').value = e; //TO DO more debug information
        addElementClass($('CC_txtReturnEval'), 'CC_Error');
    }
}
function OnClick_btnCCActionSave()
{
    if (Forms[FormList.CustomColumns].CC_CurrentIndex < 0) return; 
    //create a new item
    var _Index = Forms[FormList.CustomColumns].CC_CurrentIndex;
    var _Mode = Forms[FormList.CustomColumns].CC_Mode;
    var _Column;
    if (_Mode == Cc_Mode.New)
    {
        _Column = ColumnDef[Enums.model.keys.UserColumns].AddItem(new ColumnHeaderItem([window.Key,
            Enums.model.keys.UserColumns, _Index],
            $('CC_txtName').value,
            Enums.column.type.Formula,
            $('CC_cboStyle').selectedIndex,
            $('CC_chkVisible').checked,
            $('CC_chkVisiblePanel').checked,
            Enums.column.panel.Detail));
    } else
    {
        _Column = ColumnDef[Enums.model.keys.UserColumns].Items[_Index];
        _Column.Name = $('CC_txtName').value;
        _Column.Visible = $('CC_chkVisible').checked;
        _Column.VisibleInDetailPanel = $('CC_chkVisiblePanel').checked;
        _Column.Style = $('CC_cboStyle').selectedIndex;
    }
    _Column.Description = $('CC_txtDescription').value;
    _Column.Formula = $('CC_txtAre_Eval').value;
    this.RefreshAfterCustomColumnChange();
    $('cboCustomColumnSelection').selectedIndex = _Index + 1;
    this.OnClick_btnCCActionEdit();
}
function OnClick_btnCCActionCancel()
{
    
}

function OnClick_btnCCActionOk()
{
    
}

function CheckSave()
{
    if (Forms[FormList.CustomColumns].CC_CurrentIndex < 0) return; 
    //create a new item
    var _Index = Forms[FormList.CustomColumns].CC_CurrentIndex;
    var _Mode = Forms[FormList.CustomColumns].CC_Mode;
    var _Column;
    if (_Mode == Cc_Mode.New)
    {
        return true;
    } else
    {
        _Column = ColumnDef[Enums.model.keys.UserColumns].Items[_Index];
        
        if (_Column.Name != $('CC_txtName').value) return true;
        if (_Column.Visible != $('CC_chkVisible').checked) return true;
        if (_Column.VisibleInDetailPanel != $('CC_chkVisiblePanel').checked) return true;
        if (_Column.Style != $('CC_cboStyle').selectedIndex) return true;
        if (_Column.Description != $('CC_txtDescription').value) return true;
        if (_Column.Formula != $('CC_txtAre_Eval').value) return true;
    }
    return false;
}

function RefreshAfterCustomColumnChange()
{
    RenderClass.ReDrawScreen();
    RenderClass.SetCustomColumnsForm();
    RenderClass.SetColumnSelectionForm();                       
    RenderClass.SetGroupByOptionForm();    
}
// <---

