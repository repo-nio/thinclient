// JScript File

function DefaultSupervisionRenderManager(window)
{
    this.Window = window;
	this.TimerFields = new Array();
    this.DataList = this.Window.opener.SuperModel.SuperItems[this.Window.Key];
	this.Table = $(const_WindowPanelDataTableId);
    this.ReDrawScreen();
    this.SetColumnSelectionForm();                       
    this.SetGroupByOptionForm();
    this.SetCustomColumnsForm();
    addElementClass($("PanelInfo"), 'noScroll');
    this.FormulaTmp;
	this.LastTimerUpdate = new Date();
	var mySelf = this;
	
	this.UpdateTimerField = function()
	{
		//debugger;
		if(!mySelf.Table) return;
		var len = mySelf.TimerFields.length;
		if (len <= 0) return;
		var currentDate = new Date();
		var lenRow=mySelf.Table.rows.length;
		//if mySelf.Table.rows[0].id == "Col_NoData";
		for(var i = 0; i < lenRow; i++)
		{
			var row = mySelf.Table.rows[i];
			if(row.className != "GroupLine" && row.className != "ListviewDataHeaderRow")
			{
				//debugger;
				var offset = parseInt((currentDate.valueOf() - mySelf.LastTimerUpdate.valueOf()));
				if (offset < 0) offset = 0; 
				for(var j = 0; j < len;j++)
				{
					var cell = row.cells[mySelf.TimerFields[j]]
					var list = cell.id.split("_");
					var index = mySelf.DataList.IndexOf(list[4]);
					var cellValue = parseInt( mySelf.DataList.Items[index].Data[list[1]][list[2]]);
					
					if (cellValue > 0)
					{
						mySelf.DataList.Items[index].Data[list[1]][list[2]] = cellValue + offset; 
						cell.innerHTML = mySelf.GetFormatValue(cellValue + offset, Enums.column.style.Timer, 0);
					}
				}
			}
		}
		mySelf.LastTimerUpdate = currentDate;
	}
}

DefaultSupervisionRenderManager.prototype = 
{
//Functions for the main data table
//_______________________________________________
    ReDrawScreen : function()
    {
        //Check if table exists
        //T1 var _Table = $(const_WindowPanelDataTableId);
        //T1 if(!_Table) return;
        var _Table = this.Table;
		this.TimerFields = new Array();
        //Delete all the rows in the table        
        while (_Table.rows.length > 0)
        {
            _Table.deleteRow(0);
        }
        
        //Create the header row
        var _Row; var _Cell;
        _Row = _Table.insertRow(-1);
        _Row.id = "ListviewDataHeader";
        _Row.className = "ListviewDataHeaderRow";
        
        //Draw all the columns
        var len = this.Window.ColumnDef.length; var i;
        for (i = 0; i < len; i++)
        {
            if (this.Window.ColumnDef[i])
            {
                var lenj = this.Window.ColumnDef[i].Items.length; var j;
                for (j = 0; j < lenj; j++)
                {
                    if (this.CheckFilterOnColumn(i, j))
                    {
                        _Cell = _Row.insertCell(-1);
                        _Cell.id = "col_" + i + "_" + j;
                        _Cell.className = "ListviewDataHeaderCell"; 
                        _Cell.onmouseover = function() { addElementClass(this, 'HoverHeader'); };
                        _Cell.onmouseout = function() { removeElementClass(this, 'HoverHeader'); };                                                                
                        _Cell.innerHTML = this.Window.ColumnDef[i].Items[j].Name;
						if(this.Window.ColumnDef[i].Items[j].Style == Enums.column.style.Timer) this.TimerFields[this.TimerFields.length] = _Cell.cellIndex;
                    }
                }  
            }              
        }
        
       this.DrawAllElemnts();
    
    },
    //This function is for testing
	ReDrawScreenNG : function()
    {
        //Check if table exists
        //T1 var _Table = $(const_WindowPanelDataTableId);
        //T1 if(!_Table) return;
        var _Table = this.Table;
		
        //Delete all the rows in the table        
        while (_Table.rows.length > 0)
        {
            _Table.deleteRow(0);
        }
        
        //Create the header row
        var _Row; var _Cell;
        _Row = _Table.insertRow(-1);
        _Row.id = "ListviewDataHeader";
        _Row.className = "ListviewDataHeaderRow";
        
        //Draw all the columns
        var len = this.Window.ColumnDef.length; var i;
        for (i = 0; i < len; i++)
        {
            if (this.Window.ColumnDef[i])
            {
                var lenj = this.Window.ColumnDef[i].Items.length; var j;
                for (j = 0; j < lenj; j++)
                {
                    if (this.CheckFilterOnColumn(i, j))
                    {
                        _Cell = _Row.insertCell(-1);
                        _Cell.id = "col_" + i + "_" + j;
                        _Cell.className = "ListviewDataHeaderCell"; 
                        _Cell.onmouseover = function() { addElementClass(this, 'HoverHeader'); };
                        _Cell.onmouseout = function() { removeElementClass(this, 'HoverHeader'); };
                        _Cell.innerHTML = this.Window.ColumnDef[i].Items[j].Name;
						if(this.Window.ColumnDef[i].Items[j].Style == Enums.column.style.Timer) this.TimerFields[this.TimerFields.length] = _Cell.cellIndex;
                    }
                }  
            }              
        }
        
       this.DrawAllElemnts();
    
    },    
    //This function is for testing
	NextVisibleColumn : function(startIndex)
    {
        //Returns the next index to display if there is no to display the value will be -1
        var _StartIndex = typeof startIndex != 'undefined' ? startIndex : -1;
        var _ReturnValue = -1;
        
        var len = this.Window.ColumnDef.length; var i;
        for (i = 0; i < len; i++)
        {
            if (this.Window.ColumnDef[i])
            {
                var lenj = this.Window.ColumnDef[i].Items.length; var j;
                for (j = 0; j < lenj; j++)
                {
                    if (this.CheckFilterOnColumn(i, j))
                    {
                        _Cell = _Row.insertCell(-1);
                        _Cell.id = "col_" + i + "_" + j;
                        _Cell.className = "ListviewDataHeaderCell"; 
                        _Cell.onmouseover = function() { addElementClass(this, 'HoverHeader'); };
                        _Cell.onmouseout = function() { removeElementClass(this, 'HoverHeader'); };                                                                
                        _Cell.innerHTML = this.Window.ColumnDef[i].Items[j].Name;
                    }
                }  
            }              
        }
    },
    
    DrawAllElemnts : function()
    {
        //Check if table exists
        //T1 var _Table = $(const_WindowPanelDataTableId);
        //T1 if(!_Table) return;
		var _Table = this.Table;
		
        var len = this.DataList.Items.length; var i;
        for (i = 0; i < len; i++)
        {            
            this.DrawElement(this.DataList.Items[i].Id);
        }

        this.DrawNoDataMsg(_Table);
    },
    
    DrawElement : function(id)
    {
        //What is the index for this id
        var _Index;
        _Index = this.DataList.IndexOf(id);
        if(_Index < 0) return;

        //Check if table exists
        //T1  var _Table = $(const_WindowPanelDataTableId);
        //T1  if(!_Table) return;
		var _Table = this.Table;
        
        //Check if the line has to be displayed
        if (!this.CheckFilterOnRow(this.DataList.Items[_Index]))
        { 
            this.OnScreenRemoveLine(_Table, id);
            this.DrawNoDataMsg(_Table);
            return;
        }
        
        //If msg No data is present then delete it
        if(_Table.rows.length > 0)
        {
            if(_Table.rows[_Table.rows.length - 1].id == "Col_NoData")
            {
                _Table.deleteRow(_Table.rows.length - 1);
            }
        }

        //Check if the item is already dispalyed     
        //var _Row = $(id);
        var _Rows = new Array(); var _Row;
        _Rows = $cid(id, _Table);
            //Check if the group has changed
        var _NewGroupValues = new Array();    
        if (_Rows.length > 0)
        {
            //Do this check only if there has to be grouped
            if (this.Window.GroupByList.Active)
            {  
                //Get current group values          
                var _CurrentGroupValues = this.GetCurrentGroupIds(_Table, _Rows); //Array of group id(s)
                //Get new group values
                _NewGroupValues = this.GetGroupValues(this.DataList.Items[_Index]); //Array of groupItem(s)
                //Check of any group has to be delete
                //var _IndexCorrection = 0;
                var len = _CurrentGroupValues.length;
                for(var i = 0; i < len; i++)
                { 
                    var _DeleteGroup = true; var len2 = _NewGroupValues.length;
                    for(var j = 0; j < len2; j++)
                    {
                        if (_CurrentGroupValues[i] == _NewGroupValues[j].Id) 
                        {
                            _DeleteGroup = false;
                            break;
                        }
                    }
                    if (_DeleteGroup)
                    {
                        this.OnScreenRemoveLine(_Table, id, _CurrentGroupValues[i]);
                        //_Rows.Items.splice(i - _IndexCorrection, 1); //Normally _CurrentGroupValues.length is the same as _Rows.length
                        //_IndexCorrection++;
                    }
                }
            }
        }
        //Create Item in table on screen if there are not there
        _Rows = this.DrawLine(this.DataList.Items[_Index], _Table, id);

        if (_Rows.length == 0) return;
        var len3 = _Rows.length;
        for(var r = 0; r < len3; r++)
        {
            this.UpdateOneLine(_Rows[r], _Index)
        }
    },
    
    UpdateOneLine : function(row, itemIndex)
    {
        var _Row = row; var _Index = itemIndex;
        var len = _Row.cells.length;
        for(var i = 0; i < len; i++)
        {
            var _Cell = _Row.cells[i];
            if(_Cell.id != "")
            {
                var _ColId = new Array;
                _ColId = _Cell.id.split("_");

                if (_ColId.length > 2)
                {
                    var _TypeIndex = parseInt(_ColId[1]);
                    var _TypeArrayIndex = parseInt(_ColId[2]);
                    var cellText; 
					var _ValueTmp;
					var _ColItem = this.Window.ColumnDef[_TypeIndex].Items[_TypeArrayIndex];
					var _ItemData = this.DataList.Items[_Index];
                    //debugger; 
                    //The type of the cell value
                    switch (_ColItem.Type)
                    {
                        case Enums.column.type.Formula:
                            //TO DO
                            _ValueTmp = this.EvalFormula(_ColItem.Formula, _Index);
                            this.SetTableCellParameters(_ColItem, _Cell, _ValueTmp);
                            break;                        
                        case Enums.column.type.Graph:
                            //debugger;                                
                            var _ColumnGraph = _ColItem.ColumnInfo;
                            
                            if (!_ColumnGraph) return;
                            //Get all the values to build the graph
                            var len2 = _ColumnGraph.Items.length;  
                            for (var x = 0; x < len2; x++)
                            {
								if (typeof(_ItemData.Data[_ColumnGraph.Items[x].GraphItem[1]]) == 'undefined') 
									_ValueTmp = "";
								else 
								{
									if (typeof(_ItemData.Data[_ColumnGraph.Items[x].GraphItem[1]][_ColumnGraph.Items[x].GraphItem[2]]) == 'undefined') 
										_ValueTmp = "";
									else 
										_ValueTmp = _ItemData.Data[_ColumnGraph.Items[x].GraphItem[1]][_ColumnGraph.Items[x].GraphItem[2]];
								}
                                _ColumnGraph.Items[x].Value = this.GetValue(_ValueTmp, this.Window.ColumnDef[_ColumnGraph.Items[x].GraphItem[1]].Items[_ColumnGraph.Items[x].GraphItem[2]].Style);
                            }                                
                            this.DisplayInlineGraph(_ColumnGraph, _Cell, _TypeArrayIndex + "_" + _TypeIndex + "_" + _ItemData.Id);
                            break;
						case Enums.column.type.GraphPercent:
							var _GraphItems = _ColItem.GraphItems;
                            
							if (typeof(_ItemData.Data[_GraphItems.Items[0].GraphItem[1]]) == 'undefined') 
								_ValueTmp = "";
							else 
							{
								if (typeof(_ItemData.Data[_GraphItems.Items[0].GraphItem[1]][_GraphItems.Items[0].GraphItem[2]]) == 'undefined') 
									_ValueTmp = "";
								else 
									_ValueTmp = _ItemData.Data[_GraphItems.Items[0].GraphItem[1]][_GraphItems.Items[0].GraphItem[2]];
							}							
							_GraphItems.Items[0].Value = this.GetValue(_ValueTmp, this.Window.ColumnDef[_GraphItems.Items[0].GraphItem[1]].Items[_GraphItems.Items[0].GraphItem[2]].Style);
							this.DisplayInlineGraphPercent(_GraphItems.Items[0], _Cell,  _TypeArrayIndex + "_" + _TypeIndex + "_" + _ItemData.Id)														
							break;
						case Enums.column.type.DateTime:
							var _DateValue = new Date()
							
							
							break;	
                        default:
                            if (typeof(_ItemData.Data[_TypeIndex]) == 'undefined') 
								_ValueTmp = "";
							else 
							{
								if (typeof(_ItemData.Data[_TypeIndex][_TypeArrayIndex]) == 'undefined') 
									_ValueTmp = "";
								else 
									_ValueTmp = _ItemData.Data[_TypeIndex][_TypeArrayIndex];
							}
                                
                            this.SetTableCellParameters(_ColItem, _Cell, _ValueTmp);
                            break;
                    }                                
                }
            }
        }    
    },
    
    SetTableCellParameters : function(header, cell, value)
    {
        //format value
        value = this.GetFormatValue(value, header.Style, header.DecimalPlace);
        if (cell.innerHTML == value.toString()) return;
        //Set cell style
        switch (header.Style)
        {
            case Enums.column.style.Numeric:
                addElementClass(cell, 'Numeric');
                break;
            case Enums.column.style.Time:
                addElementClass(cell, 'Time');
                break;
            case Enums.column.style.Count:
                addElementClass(cell, 'Numeric');
                break;
            case Enums.column.style.Percent:
                addElementClass(cell, 'Percent');
                break;                                                                                   
            case Enums.column.style.Float:
                addElementClass(cell, 'Float');
                break;   
            case Enums.column.style.Timer:
                addElementClass(cell, 'Numeric');
                break; 				
            default:
                addElementClass(cell, 'Text');
                break;                    
        }                                                 
        cell.innerHTML = value;
    },
    
    DrawOneLine : function (row, id)
    {
        var _Cell;
        //This is a custom attribute with the id of the element, 
        //because we can use getElementById anymore 
        //(not sure there is only 1 element with the same id)
        row.setAttribute("crid", id); 
        row.className = "ListviewDataInfoRow";
        row.onmouseover = function() { addElementClass(this, 'Hover'); };
        row.onmouseout = function() { removeElementClass(this, 'Hover'); };
        row.onclick  = new Function("OnClick_Row('" + row.id + "')");       
        var _RowCount = 0; var len = this.Window.ColumnDef.length;
        for (var i = 0; i < len; i++)
        {
            if (this.Window.ColumnDef[i])
            {
                var len2 = this.Window.ColumnDef[i].Items.length;
                for (var j = 0; j < len2; j++)
                {
                    if (this.CheckFilterOnColumn(i, j))
                    {
                        _Cell = row.insertCell(-1);
                        _Cell.id = "col_" + i + "_" + j + "_" + row.id; _Cell.className = "ListviewDataInfoCell";
                        _Cell.onclick  = new Function("OnClick_Column('" + _Cell.id + "')"); 
                        _Cell.onmouseover = function() { addElementClass(this, 'HoverInfo'); };
                        _Cell.onmouseout = function() { removeElementClass(this, 'HoverInfo'); };                                            
                        switch (this.Window.ColumnDef[i].Items[j].Type)
                        {
                            case Enums.column.type.GraphBar:
                                 addElementClass(_Cell, 'GraphBar');                               
                                break;
                            default:
                                break;
                        }
                        //Check if this is and even line or not.
                        if((_RowCount%2) == 0)
                        { 
                            addElementClass(_Cell, 'Type2');  
                        } else 
                        {
                            addElementClass(_Cell, 'Type1');  
                        }
                        _RowCount++;
                    }
                }  
            }
        }     
    },
    
    DrawLine : function (item, table, id)
    {
        var _NewIndex; var _Rows = new Array();
        var _GroupItems = new Array();
        var _OldItem; var len;
        //Check if grouping is active
        var _GroupRow;
        if (this.Window.GroupByList.Active)
        {
            //Get all the group values
            _GroupItems = this.GetGroupValues(item);
            
            if (_GroupItems.length > 0)
            {
                //Check if group is already on the screen
                len = _GroupItems.length;
                for (var i = 0; i < len; i++)
                {
                    var _GroupRow = $(const_GroupByRowIdent + _GroupItems[i].Id);
                    if (!_GroupRow) this.DrawGroup(table, _GroupItems[i]);
                }
            }
            len = _GroupItems.length;
            for(var g = 0; g < len; g++)
            {
                _OldItem = $(_GroupItems[g].Id + "_" + id);
                if (_OldItem)
                {
                    _Rows[_Rows.length] = _OldItem;
                } else
                {
                    _Row = table.insertRow(this.NextRowIndex(table, _GroupItems[g]));
                    if (!_GroupItems[g].IsExpand) _Row.style.display = "none";
                    _Row.id = _GroupItems[g].Id + "_" + id;
                    this.DrawOneLine(_Row, id);
                    _Rows[_Rows.length] =_Row;
                }
            }
        } else
        {
            _OldItem = $("_" + id);
            if (_OldItem)
            {
                _Rows[_Rows.length] = _OldItem;
            } else
            {        
                _Row = table.insertRow(-1);
                _Row.id = "_" + id;
                this.DrawOneLine(_Row, id);
                _Rows[_Rows.length] =_Row;
            }          
        }
        return _Rows;
    },
    
    NextRowIndex : function (table, groupItem) //Return new index (int)
    {
        //To Be check (I can use this to sort item.)
        if(!groupItem) return -1;
        if(!table) return -1;
        var len = table.rows.length;
        for (var i = 0; i < len; i++)
        {
            var _CheckValue = const_GroupByRowIdent + groupItem.Id.toString();
            if (table.rows[i].id == _CheckValue)
            {
                if (i + 1 == table.rows.length) { return -1; }
                else { return i + 1; }
            }
        }
        return -1;
    },
    
    OnScreenRemoveLine : function(table, id, groupValue)
    {
        //Find row(s) to delete
        var _Rows = new Array(); 
        var _GroupValues = new Array();
        if (groupValue)
        {
            _GroupValues = new Array(groupValue);
            var _Row = $(groupValue + "_" + id);
            if (_Row) { _Rows = new Array(_Row); }
        } else 
        {
            _Rows = $cid(id, table);
            _GroupValues = this.GetCurrentGroupIds(table, _Rows)
        }
        //If we have row(s) delete then 
        var len = _Rows.length;
        for(var i = 0; i < len; i++)
        {
            table.deleteRow(_Rows[i].rowIndex);
        }
        //Check if there are still are items in the group else delete the group.
        len = _GroupValues.length; 
        for(var i = 0; i < len; i++)
        {
            if (!this.GroupContainsItems(_GroupValues[i])) this.OnScreenRemoveGroup(table, _GroupValues[i]);        
        }
    },
    
    OnScreenRemoveGroup : function(table, groupId)
    {
        //Delete row in the table on screen
        var _Group;
        if (!groupId)
        {  _Group = ""; }
        else { _Group = groupId; }
        
        var _Row = $(const_GroupByRowIdent + _Group);
        if(_Row) table.deleteRow(_Row.rowIndex);
    },
    
    DrawNoDataMsg : function (table)
    {
        if (table.rows.length <= 1)
        {
            var _Row; var _Cell;
            
            _Row = table.insertRow(-1);
            _Row.id = "Col_NoData";
            _Row.className = "Col_NoData";

            _Cell = _Row.insertCell(-1);
            _Cell.setAttribute("colSpan", this.CountVisibleColumn().toString());
            _Cell.innerHTML = "<PRE>" + CrResource.MainTable.TableNoDataMessage + "</PRE>";
        }    
    },
    
    DrawGroup : function(table, groupItem)
    {
		//debugger;
        var _Row; var _Cell;
        //TO DO Search for the next row to put the group (sorted)
        for (var i = 0; i < table.rows.length; i++)
        {
            if (table.rows[i].id.substring(0, const_GroupByRowIdent.length) == const_GroupByRowIdent)
            {
                var _List = new Array();
                _List.split = table.rows[i].id.split("_");
                if (_List[1] < groupItem.Id)
                {
                    _Row = table.insertRow(i);
                    break;
                }
                else if(i + 1 == table.rows.length) 
                {
                    _Row = table.insertRow(-1);
                    break;
                }
            }
        }
        //Add new group to the screen
        if (!_Row) _Row = table.insertRow(-1);
        _Row.id = const_GroupByRowIdent + groupItem.Id;
        _Row.className = "GroupLine";
        //Description cell
        _Cell = _Row.insertCell(-1);
        _Cell.setAttribute("colSpan", this.CountVisibleColumn().toString());
        var _ImgState;
        if (groupItem.IsExpand)
        {
            _ImgState = document.createElement("img");
            _ImgState.src = const_Expand; _ImgState.alt = "Open";
        } else
        {
            _ImgState = document.createElement("img");
            _ImgState.src = const_Collapse; _ImgState.alt = "Closed";        
        }
        _Cell.appendChild(_ImgState);
        _Cell.onclick = new Function("onclick_Group('" + _Row.id + "')");     
        if (groupItem.Name == const_DefaultGroupId)
        {  _Cell.innerHTML = _Cell.innerHTML + CrResource.MainTable.DefaultNoGroupValue; }
        else { _Cell.innerHTML = _Cell.innerHTML + groupItem.Name; }
        //Set groups correct in the form
        this.RefreshGroupByListForm();
    },
     
    GetGroupValues : function(item)
    {
        var _ReturnValues = new Array();
        var _GroupValue;
        try
        {
            _GroupValue = item.Data[this.Window.GroupByList.GroupByItem[1]][this.Window.GroupByList.GroupByItem[2]];
        } catch(e) { _GroupValue = ""; }//TO DO ID0: to make it possible to group on custom fields.
        if (_GroupValue == "") _GroupValue = const_DefaultGroupId;
        if (!_GroupValue) _GroupValue = const_DefaultGroupId;
        
        //Check if you have multiple gorups or not
        if (_GroupValue == const_DefaultGroupId || !this.Window.GroupByList.IsArray)
        {
            _ReturnValues = new Array(this.Window.GroupByList.Add(_GroupValue));
        }
        else
        {
            var _DescItem = this.Window.GroupByList.IsArrayItem;
            var _Tmp = _GroupValue.split(const_DefaultSplitChar);
            for (var i = 0; i < _Tmp.length; i++)
            {
                //Check if we can find the index description if not use id to display
                var _IndexItem = this.DataList.Model.SuperItems[_DescItem[0]].IndexOf(_Tmp[i]);
                if (_IndexItem == -1)
                {
                    _ReturnValues[_ReturnValues.length] = this.Window.GroupByList.Add(_Tmp[i]);
                }else
                {
                    _ReturnValues[_ReturnValues.length] = this.Window.GroupByList.Add(_Tmp[i], this.DataList.Model.SuperItems[_DescItem[0]].Items[_IndexItem].Data[_DescItem[1]][_DescItem[2]]);
                }
            }
        }
        return _ReturnValues;
    },

    GetCurrentGroupIds : function (table, rows) //Return value is the current group ids
    {
        var _ReturnValue = new Array();
        var len = rows.length; var r; var i;
        for (r = 0; r < len; r++)
        {
            for (i = rows[r].rowIndex - 1; i > 0; i--)
            {
                if (table.rows[i].id.substring(0, const_GroupByRowIdent.length) == const_GroupByRowIdent)
                {
                    _ReturnValue[_ReturnValue.length] = table.rows[i].id.substring(const_GroupByRowIdent.length);
                    break;
                }
            }
        }
        return _ReturnValue;            
    },
    
	TimerUpdate : function(utcTime)
	{
		
	},
	                
    CountVisibleColumn : function ()
    {
        var _Count = 0;
        var len = this.Window.ColumnDef.length; var i;
        for(i = 0; i < len; i++)
        {
            _Count += this.Window.ColumnDef[i].CountVisibleColumn();
        }
        
        return _Count;
    },

    CheckFilterOnColumn : function(typeIndex, itemIndex)
    {
        if (this.Window.ColumnDef[typeIndex].Items[itemIndex].VisibleForUser == false) return false;
        if (this.Window.ColumnDef[typeIndex].Items[itemIndex].Visible == false) return false;
        return true;
    },
    
    CheckFilterOnRow : function(item)
    {
        if (this.Window.FilterOnRow.Items.length <= 0) return true;
        if (!item) return true;
        var _Value; var _FilterItem;
        var len = this.Window.FilterOnRow.Items.length; var i;
        for(i = 0; i < len; i++)
        {
            _FilterItem = this.Window.FilterOnRow.Items[i];
            _Value = item.Data[_FilterItem.FilterItem[1]][_FilterItem.FilterItem[2]];
            if (!_Value) return const_FilterRowNoValue;
                    
            switch(_FilterItem.Operator)
            {
                case Enums.operators.E:
                    if (_Value == _FilterItem.Value) return false;
                    break;
                case Enums.operators.nE:
                    if (_Value != _FilterItem.Value) return false;
                    break;
                case Enums.operators.GoE:
                    if (_Value >= _FilterItem.Value) return false;
                    break;
                case Enums.operators.LoE:
                    if (_Value <= _FilterItem.Value) return false;
                    break;
                case Enums.operators.G:
                    if (_Value > _FilterItem.Value) return false;
                    break;
                case Enums.operators.L:
                    if (_Value < _FilterItem.Value) return false;
                    break;
                default:
                    break;
            }
        }
        return true;
    },
    
    GroupContainsItems : function(groupId)
    {
        var _CheckValue;
        var len = this.DataList.Items.length; var i;
        for(i = 0; i < len; i++)
        {
            if (this.CheckFilterOnRow(this.DataList.Items[i]))
            {
                if(!this.Window.GroupByList.IsArray)
                {
                    var _Value = this.DataList.Items[i].Data[this.Window.GroupByList.GroupByItem[1]][this.Window.GroupByList.GroupByItem[2]];
                    _CheckValue = _Value == "" ? const_DefaultGroupId : _Value;
                    if(_CheckValue == groupId)
                    {
                        return true;
                    }                
                }
                else
                {
                    var _List = this.DataList.Items[i].Data[this.Window.GroupByList.GroupByItem[1]][this.Window.GroupByList.GroupByItem[2]].split(const_DefaultSplitChar);
                    var len2 = _List.length; var j;
                    for(j = 0; j < len2; j++)
                    {
                        _CheckValue = _List[j] == "" ? const_DefaultGroupId : _List[j];
                        if(_CheckValue == groupId)
                        {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    },
    
    //Forms
    //________________________
    SetCustomColumnsForm : function()
    {
        if(!this.Window) return;

        if (this.Window.Forms[this.Window.FormList.CustomColumns].WorkArea[1].innerHTML)
        {
            var _ButtonsList = this.Window.Forms[this.Window.FormList.CustomColumns].Buttons;
            _ButtonsList.RemoveByKey("btnCCActionAdd"); 
            _ButtonsList.RemoveByKey("btnCCActionEdit"); 
            _ButtonsList.RemoveByKey("btnCCActionRemove"); 
            _ButtonsList.RemoveByKey("btnCCActionEval");
        }
        
        var _BODY;
        _BODY = '<div class="CC_Action_Div">'
        _BODY += '    <table class="CC_Action_Table">'
        _BODY += '        <tr>';
        _BODY += '            <td id="CC_Action_BtnAdd" class="CC_Action_BtnAdd"></td>';
        _BODY += '            <td id="CC_Action_CboColumn" class="CC_Action_CboColumn">';
        _BODY += '                <select id="cboCustomColumnSelection" class="cboColumnSelection">';
        _BODY += '                </select>';
        _BODY += '            </td>';
        _BODY += '            <td id="CC_Action_BtnEdit" class="CC_Action_BtnEdit"></td>';
        _BODY += '            <td id="CC_Action_BtnRemove" class="CC_Action_BtnRemove"></td>';
        _BODY += '        </tr>';
        _BODY += '    </table>';
        _BODY += '</div>';
        _BODY += '<div class="CC_Body_Div">';
        _BODY += '    <table class="CC_Body_Table">';
        _BODY += '        <tr class="CC_Data">';
        _BODY += '            <td>';
        _BODY += '                <table class="CC_Data_Table">';
        _BODY += '                    <tr>';
        _BODY += '                        <td class="CC_Data_Desc">' + CrResource.CustomColumns.Name + '</td>';
        _BODY += '                        <td class="CC_Data_Name"><input id="CC_txtName" type="text" style="width: 100%" /></td>';
        _BODY += '                        <td class="CC_Data_Desc">' + CrResource.CustomColumns.Description + '</td>';
        _BODY += '                        <td><input id="CC_txtDescription" type="text" style="width: 100%" /></td>';
        _BODY += '                    </tr>';
        _BODY += '                </table>';
        _BODY += '            </td>';
        _BODY += '        </tr>';
        _BODY += '        <tr class="CC_Data">';
        _BODY += '            <td>';
        _BODY += '                <table class="CC_Data_Table">';
        _BODY += '                <tr>';
        _BODY += '                    <td class="CC_Data_Desc">' + CrResource.CustomColumns.Style + '</td>';
        _BODY += '                    <td>';
        _BODY += '                        <select id="CC_cboStyle" name="" style="width: 100%">';
        _BODY += '                            <option value="0" selected="selected">Text</option>';
        _BODY += '                            <option value="1">Numeric</option>';
        _BODY += '                            <option value="2">Time</option>';
        _BODY += '                            <option value="3">Percent</option>';        
        _BODY += '                        </select>';
        _BODY += '                    </td>';
        _BODY += '                    <td class="CC_Data_Desc"><input id="CC_chkVisible" type="checkbox" checked="true"/><label for="chkVisible">' + CrResource.CustomColumns.Visible + '</label></td>';
        _BODY += '                    <td class="CC_Data_Desc"><input id="CC_chkVisiblePanel" type="checkbox" checked="true"/><label for="chkVisiblePanel" style="white-space:nowrap">' + CrResource.CustomColumns.VisibleInPanel + '</label>';
        _BODY += '                    </td>';
        _BODY += '                 </tr>';
        _BODY += '            </table>';
        _BODY += '            </td>';
        _BODY += '        </tr>';
        _BODY += '        <tr>';
        _BODY += '            <td>';
        _BODY += '                <textarea id="CC_txtAre_Eval" cols="20" rows="2" style="width: 100%; height: 100%"></textarea></td>';
        _BODY += '        </tr>';
        _BODY += '        <tr class="CC_Data">';
        _BODY += '            <td>';
        _BODY += '                <table class="CC_Data_Table">';
        _BODY += '                    <tr>';
        _BODY += '                        <td id="CC_Action_BtnEval" class="CC_Data_Name"></td>';
        _BODY += '                        <td class="CC_Data_Rest"><input id="CC_txtReturnEval" class="CC_txtReturnEval" type="text" style="width: 100%"/></td>';
        _BODY += '                    </tr>';
        _BODY += '                </table>';
        _BODY += '            </td>';
        _BODY += '        </tr>';                
        _BODY += '    </table>';
        _BODY += '</div>';
        this.Window.Forms[this.Window.FormList.CustomColumns].WorkArea[1].innerHTML = _BODY;
        //HTML_Button(owner, name, text, onclick, tooltip)
        var _Tmp;
        var _ButtonsList = this.Window.Forms[this.Window.FormList.CustomColumns].Buttons;
        _Tmp = _ButtonsList.Add("CC_Action_BtnAdd", "btnCCActionAdd", CrResource.Buttons._Add, function() { OnClick_btnCCActionAdd(); }, ""); 
        _Tmp.Show();
        _Tmp = _ButtonsList.Add("CC_Action_BtnEdit", "btnCCActionEdit", CrResource.Buttons._Edit, function() { OnClick_btnCCActionEdit(); }, ""); 
        _Tmp.Show();
        _Tmp = _ButtonsList.Add("CC_Action_BtnRemove", "btnCCActionRemove", CrResource.Buttons._Remove , function() { OnClick_btnCCActionRemove(); }, ""); 
        _Tmp.Show();
        _Tmp = _ButtonsList.Add("CC_Action_BtnEval", "btnCCActionEval", CrResource.Buttons._Evaluate, function() { OnClick_btnCCActionEval(); }, ""); 
        _Tmp.Show() ;  
        
        this.RefreshCustomColumnsForm();
    },
    RefreshCustomColumnsForm : function()
    {
        //Common var
        var _Option; var i; var _Tmp;
        //List of current custom fields
        _Tmp = $("cboCustomColumnSelection");
        _Tmp.innerHTML;
        _Option = this.Window.document.createElement('option');
        //_Option.text = const_CC_cboNew; This doesn't work in IE
        _Option.innerHTML = CrResource.CustomColumns.cboNew; //This work for all.
        _Option.value = '-1';
        _Tmp.appendChild(_Option); 
        
        var len = this.Window.ColumnDef[Enums.model.keys.UserColumns].Items.length;
        for (i = 0; i < len; i++)
        {
            _Option = this.Window.document.createElement('option');
            //_Option.text = this.Window.ColumnDef[Enums.model.keys.UserColumns].Items[i].Name;
            _Option.innerHTML = this.Window.ColumnDef[Enums.model.keys.UserColumns].Items[i].Name;
            _Option.value = i;
            _Tmp.appendChild(_Option);
        }
        _Tmp.selectedIndex = 0; 
        this.DisCustomColumnsForm();        
    },
    
    DisCustomColumnsForm : function()
    {
        $('CC_txtName').disabled = true;
        $('CC_txtDescription').disabled = true;
        $('CC_chkVisible').disabled = true;
        $('CC_chkVisiblePanel').disabled = true;
        $('CC_cboStyle').disabled = true;
        $('CC_txtAre_Eval').disabled = true;
        $('CC_txtReturnEval').disabled = true; //_Tmp.setEnabled(false); 
        var _ButtonsList = this.Window.Forms[this.Window.FormList.CustomColumns].Buttons;
        _ButtonsList.Items[_ButtonsList.IndexByKey('btnCCActionEval')].setEnabled(false);
    },
    
    EndCustomColumnsForm : function()
    {
        $('CC_txtName').disabled = false;
        $('CC_txtDescription').disabled = false;
        $('CC_chkVisible').disabled = false;
        $('CC_chkVisiblePanel').disabled = false;
        $('CC_cboStyle').disabled = false;
        $('CC_txtAre_Eval').disabled = false;
        $('CC_txtReturnEval').disabled = false;
        var _ButtonsList = this.Window.Forms[this.Window.FormList.CustomColumns].Buttons;
        _ButtonsList.Items[_ButtonsList.IndexByKey('btnCCActionEval')].setEnabled(true);
    },
    
    SetColumnSelectionForm : function()
    {
        if(!this.Window) return;
        
        var _Object = $(const_ColumnSelectionTableId);
        
        if (!_Object)
        {
            _Object = this.Window.document.createElement("table");
            _Object.id = const_ColumnSelectionTableId;
            _Object.className = const_ColumnSelectionTableId;
            this.Window.Forms[this.Window.FormList.ColumnSelection].WorkArea[1].appendChild(_Object);
            _Object.cellPadding = "0";
            _Object.cellSpacing = "0";
        }
        this.Window.Forms[this.Window.FormList.ColumnSelection].WorkArea[1].style.overflow = "auto";
        while (_Object.rows.length > 0)
        {
            _Object.deleteRow(0);
        }
                    
        var cell;
        var row;
        if(_Object)
        {
            var len = this.Window.ColumnDef.length; var i;
            for (i = 0; i < len; i++)
            {
                if (this.Window.ColumnDef[i])
                {
                    var len2 = this.Window.ColumnDef[i].Items.length; var j;
                    for (j = 0; j < len2; j++)
                    {
                        if (this.Window.ColumnDef[i].Items[j].VisibleForUser == true)
                        {
                            row = _Object.insertRow(-1);
                            row.id = "ColumnLst_" + i.toString() + "_" + j.toString();
                            row.onclick  = new Function("OnColumnCheckClick('" + row.id + "')");
                            row.onmouseover = function() { addElementClass(this, 'HoverMainWindowCell'); };
                            row.onmouseout = function() { removeElementClass(this, 'HoverMainWindowCell'); };

                            cell = row.insertCell(-1);
                            cell.style.width = 160;
							cell.style.whiteSpace = "nowrap";
                            cell.innerHTML = this.Window.ColumnDef[i].Items[j].Name;   
                            cell = row.insertCell(-1);
                            cell.style.width = 20;
                            var _Img = document.createElement("img");
                            _Img.onmouseover = function() { if(this.parentNode.Check) { this.src = const_Checkbox_Check_Mouseover; } else { this.src = const_Checkbox_UnCheck_Mouseover;} };
                            _Img.onmouseout = function() { if(this.parentNode.Check) { this.src = const_Checkbox_Check; } else { this.src = const_Checkbox_UnCheck; } };
                            if (this.Window.ColumnDef[i].Items[j].Visible)
                            {
                                //cell.innerHTML = "<img src='" + const_Checkbox_Check + "' />";
                                _Img.src = const_Checkbox_Check;
                                cell.appendChild(_Img);  
                                cell.Check = true;
                            } else
                            {
                                //cell.innerHTML = "<img src='" + const_Checkbox_UnCheck + "' />";
                                _Img.src = const_Checkbox_UnCheck;
                                cell.appendChild(_Img);  
                                cell.Check = false;
                            }
                            cell = row.insertCell(-1);
                            cell.style.width = 120;
                            cell.innerHTML = Enums.model.keys[i];
                        }
                    }
                }
            }             
        }                       
    },
    
    SetGroupByOptionForm : function()
    {
        if(!this.Window) return;

        var _Object = $(const_GroupByTableId);
        //Layout table
        if (!_Object)
        {
            _Object = this.Window.document.createElement("table");
            _Object.id = const_GroupByTableId;
            _Object.className = const_GroupByTableId;
            this.Window.Forms[this.Window.FormList.ColumnGroupBy].WorkArea[1].appendChild(_Object);
            _Object.cellPadding = "0";
            _Object.cellSpacing = "0";
        }
        
        this.Window.Forms[this.Window.FormList.ColumnGroupBy].WorkArea[1].style.overflow = "auto";
        $CleanTable(_Object);
        /*while (_Object.rows.length > 0)
        {
            _Object.deleteRow(0);
        }*/

        var _Cell; var _Row; 
        var _ComboBox; var _Option;
        var _SelectedIndex = 0;
        if(!_Object) return;
        //Heading 
        _Row = _Object.insertRow(-1);
        _Cell = _Row.insertCell(-1);
        _Cell.innerHTML = CrResource.GroupByForm.ComboboxText;
        //Combox
        _Row = _Object.insertRow(-1);
        _Cell = _Row.insertCell(-1);
        _ComboBox = this.Window.document.createElement("select");
        _ComboBox.id = const_GroupByComboBox;
        _Cell.appendChild(_ComboBox);
        
        _Option = this.Window.document.createElement('option');
        _Option.text = CrResource.GroupByForm.ComboboxTextNoneGrouping;
        _Option.innerHTML = CrResource.GroupByForm.ComboboxTextNoneGrouping;
        _Option.value = '-1';
        if (!this.Window.GroupByList.Active) { _SelectedIndex = 0 ; }
        _ComboBox.appendChild(_Option);  /*_ComboBox.options.add(_Option, null); --> isn't working for IE 7 in this context*/
        var _Test = true;
        var _ComboboxIndex = 0;
        var len = this.Window.ColumnDef.length; var i;
        for (i = 0; i < len; i++)
        {
            if (this.Window.ColumnDef[i])
            {
                var lenj = this.Window.ColumnDef[i].Items.length; var j;
                for (j = 0; j < lenj; j++)
                {
                    if (this.Window.ColumnDef[i].Items[j].VisibleForUser == true)
                    {
                    
                        if (this.Window.GroupByList.Active)
                        {
                            _ComboboxIndex++;
                            _Option = this.Window.document.createElement('option');
                            _Option.text = this.Window.ColumnDef[i].Items[j].Name;
                            _Option.innerHTML = this.Window.ColumnDef[i].Items[j].Name;
                            _Option.value = i + '_' + j;
                            if (this.Window.GroupByList.GroupByItem[1] == i && this.Window.GroupByList.GroupByItem[2] == j) { _SelectedIndex = _ComboboxIndex ; }
                            _ComboBox.appendChild(_Option); /*_ComboBox.add(_Option, null);*/
                        }
                    }
                }
            }
        }
        _ComboBox.selectedIndex = _SelectedIndex;
        //Heading List of current groups
        _Row = _Object.insertRow(-1);
        _Cell = _Row.insertCell(-1);
        _Cell.innerHTML = CrResource.GroupByForm.List;
        //Heading List of current groups
        _Row = _Object.insertRow(-1);
        _Cell = _Row.insertCell(-1);
        var _Div = this.Window.document.createElement("div");
        _Div.id = "Div" + const_GroupByTableList; _Div.className = "Div" + const_GroupByTableList;
        _Cell.appendChild(_Div);
        var _TableGr = this.Window.document.createElement("table");
        _TableGr.cellSpacing = "0"; _TableGr.cellPadding = "0";
        _TableGr.id = const_GroupByTableList; _TableGr.className = const_GroupByTableList;
        _Div.appendChild(_TableGr);
        
        var _RowGr, _CellGr;
        _RowGr = _TableGr.insertRow(-1);
        _CellGr = _RowGr.insertCell(-1);
        HTML_Header.setHeader(_CellGr, "Name");
        _CellGr = _RowGr.insertCell(-1);
        HTML_Header.setHeader(_CellGr, "Expand");
        this.RefreshGroupByListForm();
    },
    
    RefreshGroupByListForm : function()
    {
        if (!this.Window.Forms[this.Window.FormList.ColumnGroupBy].IsVisible) return;
        var _Table = $(const_GroupByTableList);
        
        if (!_Table) return;
        $CleanTable(_Table, 1);
        var _Row; var _cell;
        var len = this.Window.GroupByList.Items.length;
        for (var i = 0; i < len; i++)
        {
            _Row = _Table.insertRow(-1);
            var _Value;
            if (this.Window.GroupByList.Items[i].Name == const_DefaultGroupId)
            {  _Value = CrResource.MainTable.DefaultNoGroupValue; }
            else { _Value = this.Window.GroupByList.Items[i].Name; }
            _Cell = _Row.insertCell(-1); _Cell.className = "data"; _Cell.innerHTML = _Value;
            _Cell = _Row.insertCell(-1); _Cell.className = "data"; _Cell.innerHTML = this.Window.GroupByList.Items[i].IsExpand.toString();
        }
        
    },
        
//Function for detail panel
//_______________________________________________
    SetDetailPanel : function(cellId)
    {
        var _IdList = new Array();
        _IdList = cellId.split("_");
        //Col_[1.KeyIndex]_[2.ItemIndex]_[3.GroupId]_[4.ItemId]
        var _ItemId = _IdList[_IdList.length - 1];
        var _KeyIndex = _IdList[1];
        var _ItemIndex = _IdList[2];
        
        switch (this.Window.ColumnDef[_KeyIndex].Items[_ItemIndex].DetailDispalyType)
        {
            case Enums.column.panel.Detail:
                this.CreateDetailPanel_Detail(_ItemId, _KeyIndex, _ItemIndex);
                break;
            case Enums.column.panel.Graph:
                this.CreateDetailPanel_Graph(_ItemId, _KeyIndex, _ItemIndex);
                break;
            case Enums.column.panel.FieldHistory:
                this.CreateDetailPanel_FieldHistory(_ItemId, _KeyIndex, _ItemIndex);
                break;
            case Enums.column.panel.List:
                this.CreateDetailPanel_List(_ItemId, _KeyIndex, _ItemIndex);
                break;
            default:
                break;
        }
    },
    
    UpdateDetailPanel : function(id)
    {
        //        this.Window.SelectedColumnId = cellId;
        if (!id) return;
        if (!this.Window.SelectedRowId) return;
        if (!this.Window.SelectedColumnId) return;
        var _ItemId = this.Window.SelectedRowId.split("_")[1];
        if (_ItemId != id) return;
        
        
        var _IdList = new Array();
        _IdList = this.Window.SelectedColumnId.split("_");
        //Col_[1.KeyIndex]_[2.ItemIndex]_[3.GroupId]_[4.ItemId]
        var _ItemId = _IdList[_IdList.length - 1];
        var _KeyIndex = _IdList[1];
        var _ItemIndex = _IdList[2];
                
        switch (this.Window.ColumnDef[_KeyIndex].Items[_ItemIndex].DetailDispalyType)
        {
            case Enums.column.panel.Detail:
                this.RefreshDetailPanel_DetailRows(_ItemId);
                break;
            case Enums.column.panel.Graph:
                this.RefreshDetailPanel_GraphRows(_ItemId, _KeyIndex, _ItemIndex);
                break;
            case Enums.column.panel.FieldHistory:
                this.RefreshDetailPanel_FieldHistoryRows(_ItemId, _KeyIndex, _ItemIndex);
                break;
            case Enums.column.panel.List:
                this.RefreshDetailPanel_ListRows(_ItemId, _KeyIndex, _ItemIndex);
                break;                
            default:
                break;
        }
    },   
        
    CreateDetailPanel_Detail : function(itemId, keyIndex, itemIndex)
    {
        removeElementClass($("PanelInfo"), 'noScroll');
        
        var _MainTable = $(const_WindowPanelDetailTableId);
        if(!_MainTable) return;

        var _Cell; var _Row;
        var _Column = this.Window.ColumnDef[keyIndex].Items[itemIndex];
        
        //"MainHeading"
        _MainTable.rows[0].cells[0].innerHTML = _Column.Name;
        //"MainDescription"
        _MainTable.rows[1].cells[0].innerHTML = _Column.Description;
        //"MainData"
        _Cell = _MainTable.rows[2].cells[0];
        var _InnerTable = $("PanelInfoTable");
        if (!_InnerTable) return;
        
        while (_InnerTable.rows.length > 0)
        {
            _InnerTable.deleteRow(0);
        }

        _Row = _InnerTable.insertRow(-1);
        _Row.className = "Heading";
        _Cell = _Row.insertCell(-1); _Cell.className = "ColumnTitle";
        _Cell.innerHTML = CrResource.DetailPanel._Description; 
        _Cell = _Row.insertCell(-1); _Cell.className = "ColumnTitleValue";
        _Cell.innerHTML = CrResource.DetailPanel._Value; 
        var len = this.Window.ColumnDef.length; var i;
        for (i = 0; i < len; i++)
        {
            if (this.Window.ColumnDef[i])
            {
                var lenj = this.Window.ColumnDef[i].Items.length; var j;
                for (j = 0; j < lenj; j++)
                {
                    if (this.Window.ColumnDef[i].Items[j].VisibleInDetailPanel == true && this.Window.ColumnDef[i].Items[j].VisibleForUser == true)
                    {
                        _Row = _InnerTable.insertRow(-1); _Row.className = "dataRow";
                        _Row.id = "Detail_" + i.toString() + "_" + j.toString();
                        _Cell = _Row.insertCell(-1); _Cell.className = "ColumnTitle";
                        _Cell = _Row.insertCell(-1); _Cell.className = "ColumnTitleValue";

                    }
                }
            }
        } 
        this.RefreshDetailPanel_DetailRows(itemId);
    },
    
    RefreshDetailPanel_DetailRows : function(itemId)
    {
        var _Index;
        _Index = this.DataList.IndexOf(itemId);
        if(_Index < 0) return;
        
        var _MainTable = $("PanelInfoTable");
       
        if(!_MainTable) return;
        var len = _MainTable.rows.length; var i;
        for (i = 0; i < len; i++)
        {
            var _Row = _MainTable.rows[i];
            if (_Row.id)
            {
                var _ColId = new Array;
                _ColId = _Row.id.split("_");

                if (_ColId.length > 2)
                {
                    var _KeyIndex = parseInt(_ColId[1]);
                    var _ItemIndex = parseInt(_ColId[2]);

                    _Row.cells[0].innerHTML = this.Window.ColumnDef[_KeyIndex].Items[_ItemIndex].Name;
                    //_Row.cells[1].innerHTML = this.DataList.Items[_Index].Data[_KeyIndex][_ItemIndex];
                    var _ValueTmp;
                    switch (this.Window.ColumnDef[_KeyIndex].Items[_ItemIndex].Type)
                    {
                        case Enums.column.type.Formula:
                            //TO DO
                            _ValueTmp = this.EvalFormula(this.Window.ColumnDef[_KeyIndex].Items[_ItemIndex].Formula, _Index);
                            this.SetTableCellParameters(this.Window.ColumnDef[_KeyIndex].Items[_ItemIndex], _Row.cells[1], _ValueTmp);                            
                            break;
                        case Enums.column.type.Graph:
                            //debugger;                                
                            var _ColumnGraph = this.Window.ColumnDef[_KeyIndex].Items[_ItemIndex].ColumnInfo;
                            
                            if (!_ColumnGraph) return;
                            //Get all the values to build the graph
                            var lenx = _ColumnGraph.Items.length ; var x;
                            for (x = 0; x < lenx; x++)
                            {
                                _ColumnGraph.Items[x].Value = this.GetValue(this.DataList.Items[_Index].Data[_ColumnGraph.Items[x].GraphItem[1]][_ColumnGraph.Items[x].GraphItem[2]], this.Window.ColumnDef[_ColumnGraph.Items[x].GraphItem[1]].Items[_ColumnGraph.Items[x].GraphItem[2]].Style);
                            }                                
                            this.DisplayInlineGraph(_ColumnGraph, _Row.cells[1], "GrDetail" + _ItemIndex + "_" + _KeyIndex + "_" + this.DataList.Items[_Index].Id);
                            break;
						case Enums.column.type.GraphPercent:
							var _GraphItems = this.Window.ColumnDef[_KeyIndex].Items[_ItemIndex].GraphItems;
							_GraphItems.Items[0].Value = this.GetValue(this.DataList.Items[_Index].Data[_GraphItems.Items[0].GraphItem[1]][_GraphItems.Items[0].GraphItem[2]], this.Window.ColumnDef[_GraphItems.Items[0].GraphItem[1]].Items[_GraphItems.Items[0].GraphItem[2]].Style);
							this.DisplayInlineGraphPercent(_GraphItems.Items[0], _Row.cells[1],  "GrDetail" + _ItemIndex + "_" + _KeyIndex + "_" + this.DataList.Items[_Index].Id)														
							break;							
                        default:
                            this.SetTableCellParameters(this.Window.ColumnDef[_KeyIndex].Items[_ItemIndex], _Row.cells[1], this.DataList.Items[_Index].Data[_KeyIndex][_ItemIndex]);
                            break;
                    }      
                    
                    
                }
                
            }
        }
    },
    
    CreateDetailPanel_Graph : function(itemId, typeIndex, itemIndex)
    {
        addElementClass($("PanelInfo"), 'noScroll');

        var _MainTable = $(const_WindowPanelDetailTableId);
        if(!_MainTable) return;

        var _Cell; var _Row;
        var _Column = this.Window.ColumnDef[typeIndex].Items[itemIndex];
        
        //"MainHeading"
        _MainTable.rows[0].cells[0].innerHTML = _Column.Name;
        //"MainDescription"
        var strTmp = ""; var len = _Column.ColumnInfo.Items.length; var i;
        for(i = 0; i < len; i++)
        {
            if (i == 0)
            {
                strTmp += _Column.ColumnInfo.Items[i].Description;
            }
            else if(i == _Column.ColumnInfo.Items.length - 1)
            {
                strTmp += " " + CrResource.DetailPanel._Graph_DescriptionText_1 + " " + _Column.ColumnInfo.Items[i].Description;
            }
            else
            {
                strTmp += ", " + _Column.ColumnInfo.Items[i].Description;
            }
        }
        _MainTable.rows[1].cells[0].innerHTML = CrResource.DetailPanel._Graph_DescriptionText.replace("{0}", strTmp);
        //"MainData"
        _Cell = _MainTable.rows[2].cells[0];
        var _InnerTable = $("PanelInfoTable");
        if (!_InnerTable) return;
        
        while (_InnerTable.rows.length > 0)
        {
            _InnerTable.deleteRow(0);
        }
        
        _Row = _InnerTable.insertRow(-1);
        _Row.className = "Heading";
        _Cell = _Row.insertCell(-1); _Cell.className = "ColumnColor Header";
        _Cell.innerHTML = CrResource.DetailPanel._Color; 
        _Cell = _Row.insertCell(-1); _Cell.className = "ColumnValue";
        _Cell.innerHTML = CrResource.DetailPanel._Value;
        _Cell = _Row.insertCell(-1); _Cell.className = "ColumnDescription";
        _Cell.innerHTML = CrResource.DetailPanel._Description;
        len = _Column.ColumnInfo.Items.length; var i;
        for(i = 0; i < len; i++)
        {
            _Row = _InnerTable.insertRow(-1); _Row.id = "PanelInfoTableRow_" + i;
            _Cell = _Row.insertCell(-1); _Cell.className = "ColumnColor";
            _Cell = _Row.insertCell(-1); _Cell.className = "ColumnValue";
            _Cell = _Row.insertCell(-1); _Cell.innerHTML = ""; _Cell.className = "ColumnDescription";
        }
        this.RefreshDetailPanel_GraphRows(itemId, typeIndex, itemIndex);
    },
    
    RefreshDetailPanel_GraphRows : function(itemId, typeIndex, itemIndex)
    {
        var _Index;
        _Index = this.DataList.IndexOf(itemId);
        if(_Index < 0) return;
        var _Column = this.Window.ColumnDef[typeIndex].Items[itemIndex];
        
        var _InnerTable = $("PanelInfoTable");
        if (!_InnerTable) return;
        
        var _Row; var _Tmp;
        var len = _Column.ColumnInfo.Items.length; var i;
        for(i = 0; i < len; i++)
        {
            _Row = _InnerTable.rows[i + 1];
            _Row.cells[0].style.backgroundColor = _Column.ColumnInfo.Items[i].Color;
            _Tmp = this.GetFormatValue(this.DataList.Items[_Index].Data[_Column.ColumnInfo.Items[i].GraphItem[1]][_Column.ColumnInfo.Items[i].GraphItem[2]], this.Window.ColumnDef[_Column.ColumnInfo.Items[i].GraphItem[1]].Items[_Column.ColumnInfo.Items[i].GraphItem[2]].Style, this.Window.ColumnDef[_Column.ColumnInfo.Items[i].GraphItem[1]].Items[_Column.ColumnInfo.Items[i].GraphItem[2]].DecimalPlace);
            _Row.cells[1].innerHTML = _Tmp;
            _Row.cells[2].innerHTML = _Column.ColumnInfo.Items[i].Description;
        }      
    },
            
    CreateDetailPanel_FieldHistory : function(itemId, typeIndex, itemIndex)
    {
        addElementClass($("PanelInfo"), 'noScroll');
        
        var _MainTable = $(const_WindowPanelDetailTableId);
        if(!_MainTable) return;

        var _Cell; var _Row;
        var _Column = this.Window.ColumnDef[typeIndex].Items[itemIndex];
        
        //"MainHeading"
        //lstvData.rows[0].cells[0].innerHTML = "<PRE class='HeadingText'>" +  _Column._Name + "</PRE>"; //This works for firefox but not on IE. Goal is when heading is to big that the table doesn't get bigger. But holds the same size.
        _MainTable.rows[0].cells[0].innerHTML = _Column.Name;
        //"MainDescription"
        _MainTable.rows[1].cells[0].innerHTML = _Column.Description;
        //"MainData"
        _Cell = _MainTable.rows[2].cells[0];
        var _InnerTable = $("PanelInfoTable");
        if (!_InnerTable) return;
        
        while (_InnerTable.rows.length > 0)
        {
            _InnerTable.deleteRow(0);
        }
                    
        _Row = _InnerTable.insertRow(-1); _Row.className = "Heading";
        _Cell = _Row.insertCell(-1); _Cell.className = "ColumnTime";
        _Cell.innerHTML = CrResource.DetailPanel._Time;
        _Cell = _Row.insertCell(-1); _Cell.className = "ColumnValue";
        _Cell.innerHTML = CrResource.DetailPanel._Value;
        _Cell = _Row.insertCell(-1); _Cell.className = "ColumnGraph";
        _Cell.innerHTML = CrResource.DetailPanel._Graph;
        var i;
        for(i = 0; i < const_PanelDetailHistorySize; i++)
        {
            _Row = _InnerTable.insertRow(-1); _Row.id = "PanelInfoTableRow_" + i;
            _Cell = _Row.insertCell(-1); _Cell.className = "ColumnTime"; _Cell.innerHTML = "";
            _Cell = _Row.insertCell(-1); _Cell.className = "ColumnValue"; _Cell.innerHTML = "";
            _Cell = _Row.insertCell(-1); _Cell.className = "ColumnGraph"; _Cell.innerHTML = "";
        }
        this.RefreshDetailPanel_FieldHistoryRows(itemId, typeIndex, itemIndex);
    },
    
    RefreshDetailPanel_FieldHistoryRows : function(itemId, typeIndex, itemIndex)
    {
        var _Index;
        _Index = this.DataList.IndexOf(itemId);
        if(_Index < 0) return;
        var _Column = this.Window.ColumnDef[typeIndex].Items[itemIndex];
        //Get the peak list to display                
        var _Values = new Array();
        switch (parseInt(typeIndex))
        {
            case Enums.model.keys.RealTime:
                if (!this.DataList.Items[_Index].Data[Enums.model.keys.PeakRealTime]) break;
                _Values = this.DataList.Items[_Index].Data[Enums.model.keys.PeakRealTime];
                break;
            case Enums.model.keys.History:
                if (!this.DataList.Items[_Index].Data[Enums.model.keys.PeakHistory]) break;
                _Values = this.DataList.Items[_Index].Data[Enums.model.keys.PeakHistory];
                break;
            case Enums.model.keys.Production:
                if (!this.DataList.Items[_Index].Data[Enums.model.keys.PeakProduction]) break;
                _Values = this.DataList.Items[_Index].Data[Enums.model.keys.PeakProduction];
                break;				
            default:
                break;                    
        }
        
        var _InnerTable = $("PanelInfoTable");
        if (!_InnerTable) return;
        //Search for the bigist value
        var _PeakValue = 0; var len = _Values.length; var i;
        for(i = 0; i < len; i++)
        {
            if (_PeakValue < parseInt(_Values[i][itemIndex])) _PeakValue = parseInt(_Values[i][itemIndex]);  
        } 
        //Set data on screen      
        var _Tmp; var _Row; len = _Values.length; var i;
        for(i = 0; i < len; i++)
        {
            _Row = _InnerTable.rows[i + 1];
            _Tmp = (i + 1) * const_PanelDetailHistoryInterval; _Row.cells[0].innerHTML = "-" + _Tmp + " " + const_PanelDetailHistoryIntervalUnit;
            //format value
            var _Tmp = _Values[i][itemIndex];
            if (_Tmp != "")
            {
                _Tmp = this.GetFormatValue(_Tmp, _Column.Style, _Column.DecimalPlace);                                   
            }
            _Row.cells[1].innerHTML = _Tmp;
            this.DisplayInlineGraphTotal(_Values[i][itemIndex], _PeakValue, _Row.cells[2], "GraphDetail_" + i + "_" + itemId);
        } 
        //Clean cells that have no values 
        var i;
        for(i = _Values.length; i < const_PanelDetailHistorySize; i++)
        {
            _Row = _InnerTable.rows[i + 1];
            _Row.cells[0].innerHTML = "";
            _Row.cells[1].innerHTML = "";
            _Row.cells[2].innerHTML = "";
        }         
    }, 
    
    CreateDetailPanel_List : function(itemId, typeIndex, itemIndex)
    {
        removeElementClass($("PanelInfo"), 'noScroll');
        
        var _MainTable = $(const_WindowPanelDetailTableId);
        if(!_MainTable) return;

        var _Cell; var _Row;
        var _Column = this.Window.ColumnDef[typeIndex].Items[itemIndex];
        
        //"MainHeading"
        //lstvData.rows[0].cells[0].innerHTML = "<PRE class='HeadingText'>" +  _Column._Name + "</PRE>"; //This works for firefox but not on IE. Goal is when heading is to big that the table doesn't get bigger. But holds the same size.
        _MainTable.rows[0].cells[0].innerHTML = _Column.Name;
        //"MainDescription"
        _MainTable.rows[1].cells[0].innerHTML = _Column.Description;
        //"MainData"
        _Cell = _MainTable.rows[2].cells[0];
        var _InnerTable = $("PanelInfoTable");
        if (!_InnerTable) return;
        
        while (_InnerTable.rows.length > 0)
        {
            _InnerTable.deleteRow(0);
        }
                    
        _Row = _InnerTable.insertRow(-1); _Row.className = "Heading";
        var len = _Column.ColumnInfo.Items.length;
        for(var i = 0; i < len; i++)
        {
            _Cell = _Row.insertCell(-1); 
            if(i == _Column.ColumnInfo.Items.length -1)
            {
                _Cell.className = "ColumnColEnd";
            }
            else
            {
                _Cell.className = "ColumnCol";
            }
                
            _Cell.innerHTML =  _Column.ColumnInfo.Items[i].Description;
        }   
        this.RefreshDetailPanel_ListRows(itemId, typeIndex, itemIndex);
    },
        
    RefreshDetailPanel_ListRows : function(itemId, typeIndex, itemIndex)
    {
        var _Index;
        _Index = this.DataList.IndexOf(itemId);
        if(_Index < 0) return;
        
        var _Column = this.Window.ColumnDef[typeIndex].Items[itemIndex];
        //Delete all rows in the table
        var _InnerTable = $("PanelInfoTable");
        if (!_InnerTable) return;
        while (_InnerTable.rows.length > 1)
        {
            _InnerTable.deleteRow(1);
        }
        //Get the string with all the ids
        var _strTmp = this.DataList.Items[_Index].Data[_Column.ColumnInfo.ViewItem[1]][_Column.ColumnInfo.ViewItem[2]];
        //Put the string in an array  
        var _Values = new Array();
        _Value = _strTmp.split(';');
        
        if (_Value.length < 1) return;
        
        var _Row; var len = _Value.length;
        for(var i = 0; i < len; i++)
        {
            _Row = _InnerTable.insertRow(-1); _Row.id = "PanelInfoTableRow_" + i;
            
            var _IndexItem;

            var len2 = _Column.ColumnInfo.Items.length;
            for(var j = 0; j < len2; j++)
            {
                _IndexItem = this.DataList.Model.SuperItems[_Column.ColumnInfo.Items[j].Item[0]].IndexOf(_Value[i]);
                if(_IndexItem < 0) break;
            
                _Cell = _Row.insertCell(-1); 
                if(j == _Column.ColumnInfo.Items.length -1)
                {
                    _Cell.className = "ColumnColEnd";
                }
                else
                {
                    _Cell.className = "ColumnCol";
                }  
                _Cell.innerHTML = this.DataList.Model.SuperItems[_Column.ColumnInfo.Items[j].Item[0]].Items[_IndexItem].Data[_Column.ColumnInfo.Items[j].Item[1]][_Column.ColumnInfo.Items[j].Item[2]];
            }   
        }
    },
//Function to draw graphs
//_______________________________________________
    DisplayInlineGraph : function(displayInfo, cell, id)
    {
        //TO DO: Clean this up (Table can be done beter)
        var _Row;
        var _Cell;
        var _Total = displayInfo.TotalValue();
        var _Id = "Graph_" + id;
        
        var _Table = $(_Id);
        if (!_Table)
        {
            _Table = document.createElement("table");
            _Table.cellSpacing = "0"; _Table.cellPadding = "0";
            _Table.id = _Id; _Table.className = "GraphBar";
            cell.appendChild(_Table)
        } else
        {
            while (_Table.rows.length > 0)
            {
                _Table.deleteRow(0);
            }            
        }
        _Row = _Table.insertRow(-1);
        var len = displayInfo.Items.length;
        for(var i = 0; i < len; i++)
        {
            if (isNaN(displayInfo.Items[i].Value)) displayInfo.Items[i].Value = 0;
            if (!displayInfo.Items[i].Value) displayInfo.Items[i].Value = 0;
            if (displayInfo.Items[i].Value < 0) displayInfo.Items[i].Value = 0;
            if (displayInfo.Items[i].Value != 0)
            {
                _Cell = _Row.insertCell(-1);
                _Cell.setAttribute("alt", displayInfo.Items[i].Description);
                _Cell.style.backgroundColor = displayInfo.Items[i].Color;
                var _Percent = (displayInfo.Items[i].Value / _Total) * 100;
                _Cell.style.width = _Percent + "%";
                _Cell.className = 'GraphColumn' + i + " " + displayInfo.Items[i].ClassName;
            }
            else
            {
                
            }
        }
    },

    DisplayInlineGraphPercent : function(item, cell, id)
    {
        //TO DO: Clean this up (Table can be done beter)
        var _Row;
        var _Cell;
        var _Id = "Graph_" + id;
        
        var _Table = $(_Id);
        if (!_Table)
        {
            _Table = document.createElement("table");
            _Table.cellSpacing = "0"; _Table.cellPadding = "0";
            _Table.id = _Id; _Table.className = "GraphBar";
            cell.appendChild(_Table)
			
			_Row = _Table.insertRow(-1);
			_Cell = _Row.insertCell(-1);
			_Cell.setAttribute("alt", item.Description);
			_Cell.style.backgroundColor = item.Color;
			
			_Cell = _Row.insertCell(-1);
        }
		var _Value = item.Value;
		
      	if (isNaN(_Value)) _Value = 0;
        if (!_Value) _Value = 0;
        if (_Value < 0) _Value = 0;
		if (_Value > 100) _Value = 100;
		
        
		_Cell = _Table.rows[0].cells[0];
        _Cell.style.width = _Value + "%";
		
		var _Percent = 100 - _Value;
		_Cell = _Table.rows[0].cells[1];
        _Cell.style.width = _Percent + "%";		
    },
	    
    DisplayInlineGraphTotal : function(value, total, element, id)
    {
        //debugger;
        //TO DO: use createlement to create the graph
        var _Value = value;
        if (!_Value) _Value = 0;
        if (isNaN(_Value)) _Value = parseInt(_Value);

        var _Row; var _Cell;
        var _Id = "Graph_" + id;
        element.innerHTML = '<table id="' + _Id + '" class="GraphBar" style="width: 100%; height:75%" cellpadding="0" cellspacing="0"></table>';
        var oTable = $(_Id);
        
        _Row = oTable.insertRow(-1);
        _Cell = _Row.insertCell(-1);
        var _BackGroundColor;
        var _Percent;
        if (_Value <= 0)
        {
            _Percent = 1;
            _BackGroundColor = "Transparent";
        }
        else
        {
            _Percent = (_Value / total) * 100;
            _BackGroundColor = "red";
        }
        _Cell.style.backgroundColor = _BackGroundColor;
        if (isNaN(_Percent)) _Percent = parseInt(_Percent);
        _Cell.style.width = _Percent.toString() + "%";
        //_Cell.className = 'GraphColumn' + i + " " + displayInfo.ClassName[i]
        _Cell = _Row.insertCell(-1);
        _Cell.style.backgroundColor = "Transparent";
        _Percent = 100 - _Percent;
        _Cell.style.width = _Percent + "%"
    }, 
//Tools
//_______________________________________________
	ActionGetAgentInfo : function(item, id)
	{
		//What is the index for this id
        var _Index;
        _Index = this.DataList.IndexOf(id)
		
		return this.DataList.Items[_Index].Data[item[1]][item[2]];
	}, 
//Tools
//_______________________________________________
    EvalFormula : function(formula, index)
    {
        this.FormulaTmp = index;
        return eval(formula);
    },
	/*getDate : function(input)
	{
		var _List = input.split("|");
		if(_List.length != 6) return;
		
		try
		{
			return new Date(_List[0],_List[1] - 1,_List[2],_List[3],_List[4],_List[5]);
		}
		catch(e)
		{ return new Date(); }
	},*/
	//
	//Unformated Value (used for the formula type)
	//
    GetValueOf : function(item)
    {
       var _ValueOf = this.DataList.Items[this.FormulaTmp].Data[item[1]][item[2]];
       
        switch (this.Window.ColumnDef[item[1]].Items[item[2]].Style)
        {
            case Enums.column.style.Text:
                return _ValueOf;
            case Enums.column.style.Numeric:          
                if (isNaN(_ValueOf)) return 0;
                return parseInt(_ValueOf);
            case Enums.column.style.Time:
                if (isNaN(_ValueOf)) return 0;
                return parseInt(_ValueOf);
            case Enums.column.style.Percent:
                if (isNaN(_ValueOf)) return 0;
                return parseFloat(_ValueOf/100000);              
            case Enums.column.style.Count:
                if (!_ValueOf) return "0";
                var _Array = new Array();
                var _Value = 0;
                if (_ValueOf != "")
                {
                    _Array = _ValueOf.split(const_DefaultSplitChar);
                    _Value = _Array.length;
                }
                if (isNaN(_Value)) return _Value;
                return parseInt(_Value);
			case Enums.column.style.Float:
                if (isNaN(_ValueOf)) return 0;
                return parseFloat(_ValueOf/100000);
			case Enums.column.style.Timer:
                if (isNaN(_ValueOf)) return 0;
                return parseInt(_ValueOf);
			case Enums.column.style.DateTime:
				try{ return new Date(Date.parse(_ValueOf)) }catch(e) { return new Date();}				
            default:
                return _ValueOf;                    
        }                                                  
    },
    //
	//Format the value
	//
    GetFormatValue : function(value, format, decimalPalce)
    {
		var _Value;
		var _DecimalPlace = typeof decimalPalce != 'undefined' ? decimalPalce : 2;
        switch (format)
        {
            case Enums.column.style.Text:
                return value;
            case Enums.column.style.Numeric:
                if (isNaN(value)) value = 0;
                if (value == "") value = 0;
				if (!isFinite(value)) value = 0;			
                if (const_DefaultMode) //Check for debug mode
                {
                    if (value < 0) value = 0;
                }            
                return value;
            case Enums.column.style.Time:
                if (isNaN(value)) value = 0;
                if (value == "") value = 0;
                if (!isFinite(value)) value = 0;
                return FormatTime(parseInt(value));
            case Enums.column.style.Percent:
                if (isNaN(value)) value = 0;
                if (value == "") value = 0;
                if (!isFinite(value)) value = 0;
				_Value = parseFloat(value/100000);
				if (isNaN(_Value)) _Value = 0;
				if (_Value.toFixed(2)) return _Value.toFixed(_DecimalPlace) + "%";
				else return _Value + "%"            
            case Enums.column.style.GraphBar:
                return value;
            case Enums.column.style.Count:
                if (!value) return "0";
                var _Array = new Array();
                var _Value = 0;
                if (value != "")
                {
                    _Array = value.split(const_DefaultSplitChar);
                    _Value = _Array.length;
                }
                return _Value.toString();
			case Enums.column.style.Float:
                if (isNaN(value)) value = 0;
                if (value == "") value = 0;
                if (!isFinite(value)) value = 0;
				_Value = parseFloat(value/100000);
				if (isNaN(_Value)) _Value = 0;
				if (_Value.toFixed(2)) return _Value.toFixed(_DecimalPlace);
				else return _Value     			
				return value;
			case Enums.column.style.Timer:
                if (isNaN(value)) value = 0;
                if (value == "") value = 0;
                if (!isFinite(value)) value = 0;
                return FormatTime(parseInt(value));   
			case Enums.column.style.DateTime:
				
				//debugger;
				try{ value = DateObject.AddTimeSpan(new Date(Date.parse(value)), const_TimeZoneOffset * txOneMinute); }catch(e) { value = new Date();}	
				value = value.toLocaleString();		
            default:
                return value;                    
        }                                    
        return value;
    },
     
    GetValue : function(value, style)
    {
        switch (style)
        {
            case Enums.column.style.Count:
                if (!value) return "0";
                var _Array = new Array();
                var _Value = 0;
                if (value != "")
                {
                    _Array = value.split(const_DefaultSplitChar);
                    _Value = _Array.length;
                }
                return _Value.toString();
			case Enums.column.style.Float:
                if (isNaN(value)) value = 0;
                if (value == "") value = 0;
                if (!isFinite(value)) value = 0;
				value = parseFloat(value/100000);
				if (isNaN(value)) value = 0;
				return value ;
			case Enums.column.style.Percent:
                if (isNaN(value)) value = 0;
                if (value == "") value = 0;
                if (!isFinite(value)) value = 0;
				value = parseFloat(value/100000);
				if (isNaN(value)) value = 0;
				return value ;
			case Enums.column.style.DateTime:
				try{ value = DateObject.AddTimeSpan(new Date(Date.parse(value)), const_TimeZoneOffset * txOneMinute); }catch(e) { value = new Date();}		
				break;
            default:
                return value;
        }                                    
        return value;
    }
}