//*************//
// Const
//*************//
var crGraphColor = new Array(); // ["#fff564","#99d6e6", "#b4e93c", "#f84343", "#e1595a", "#dcddeb"]
crGraphColor['ivr'] = '#99d6e6';
crGraphColor['waiting'] = '#fa9654';
crGraphColor['online'] = '#b4e93c';
crGraphColor['wrapup'] = '#fff564';
crGraphColor['overflow'] = '#f84343';
crGraphColor['pause'] = '#f84343';
crGraphColor['percent'] = '#a283cf';
crGraphColor['NeverDialed'] = '#82ec5c';
crGraphColor['Redial'] = '#e8ec5c';
crGraphColor['Callback'] = '#ec9c5c';
crGraphColor['NotRedial'] = '#608df8';
crGraphColor['Supervision'] = '#d554f4';
crGraphColor['preview'] = '#2ccdf2';
//*************//
// Class data
//*************//
//Detail panel info for type Array (lists)
//________________________________
function ListViewInfo(viewItem)
{
    this.ViewItem = viewItem
    this.Items = new Array();
}
ListViewInfo.prototype.Clear = function()
{
    this.Items = new Array();
}
ListViewInfo.prototype.AddItem = function(item)
{
    if (!item) return false;
    var _NewIndex = this.Items.length;
    
    this.Items[_NewIndex] = item;
    return this.Items[_NewIndex];
}
ListViewInfo.prototype.Add = function(item, description)
{
    var _NewIndex = this.Items.length;
    this.Items[_NewIndex] = new SupervisionItemsDisplay(item, description);
    return this.Items[_NewIndex];
}

//Common item type
function SupervisionItemsDisplay(item, description)
{
    this.Item           = item
    this.Description    = description; 
    var _Object         = this;  
}

//Info for create a inline graph bar
//_____________________________________________
function InlineGraphInfo()
{
    this.Items = new Array();
}
InlineGraphInfo.prototype.Clear = function()
{
    this.Items = new Array();
}
InlineGraphInfo.prototype.AddItem = function(item)
{
    if (!item) return false;
    var _NewIndex = this.Items.length;
    
    this.Items[_NewIndex] = item;
    return this.Items[_NewIndex];
}
InlineGraphInfo.prototype.Add = function(graphItem, color, description, className)
{
    var _NewIndex = this.Items.length;
    this.Items[_NewIndex] = new InlineGraphItems(graphItem, color, description, className);
    return this.Items[_NewIndex];
}
InlineGraphInfo.prototype.TotalValue = function ()        
{   
    var _ReturnValue = 0;
    
    for(var i = 0; i < this.Items.length; i++)
    {
        var _NumToAdd = 0;
        
        if (isNaN(this.Items[i].Value))
        {
            _NumToAdd = parseInt(this.Items[i].Value);
        }
        else
        {
            _NumToAdd = parseInt(this.Items[i].Value);
        }
        _ReturnValue += _NumToAdd;
    }
    return _ReturnValue;
}
  
function InlineGraphItems(graphItem, color, description, className)
{
    this.GraphItem      = graphItem;
    //this.SupervisionType    = supervisionType;
    //this.TypesIndex         = typeIndex;            
    //this.ItemsIndex         = itemIndex;
    this.Color              = color;
    this.Description    = typeof description != 'undefined' ? description : '';
    this.ClassName      = typeof className != 'undefined' ? className : '';
    this.Value          = 0; // --> Only in realtime. To store temp data
}
//*************//
// COLLECTIONS
//*************//
//Collections Filters on rows
//_____________________________________________
function FilterOnRowList()
{
    this.Active = false;
    //For inherits
    this.Items = new Array();
    this.Keys = new Array();        
}
FilterOnRowList.inheritsFrom( CollectionClass );
FilterOnRowList.prototype.Add = function(id, filterItem, operator, value, originator, name, description)
{
    return this.AddItem(new FilterRowItem(id, filterItem, operator, value, originator, name, description), id);
}

function FilterRowItem(id, filterItem, operator, value, originator, name, description)
{
    this.Id  = id;
    this.FilterItem       = filterItem;
    this.Operator   = operator;
    this.Value      = value;
    this.Originator = originator;       //Filter created by how (system or user)
    this.Name  = typeof name != 'undefined' ? name : id;
    this.Description= typeof description != 'undefined' ? description : '';
}

//Collenction GroupBy items
//_____________________________________________
function GroupByListCollection(groupByItem, isArray, isArrayItem)
{
    this.GroupByItem        = typeof groupByItem    != 'undefined' ? groupByItem : [-1, -1, -1];
    this.IsArray            = typeof isArray        != 'undefined' ? isArray : false;
    this.IsArrayItem        = typeof isArrayItem    != 'undefined' ? isArrayItem : [-1, -1, -1];
    this.Active = false;
    //For inherits
    this.Items = new Array();
    this.Keys = new Array();    
}
GroupByListCollection.inheritsFrom( CollectionClass );
GroupByListCollection.prototype.Add = function(id, name)
{
    return this.AddUniqueItem(new GroupByItem(encode(id), name), encode(id));
}
 

function GroupByItem(id, name)
{
	this.Id 		= typeof id != 'undefined' ? id : "";
    this.Name       = typeof name != 'undefined' ? name : decode(this.Id);
    this.IsExpand   = true;
}        
        
//Collenction Column headers
//_____________________________________________
//TO DO: Clean out ColumnInfo and replace it by GraphItems
function ColumnHeaderDescription()
{
    this.Items = new Array();
    this.crStartDisplayIndex = 0;
}
ColumnHeaderDescription.prototype.Clear = function()
{
    this.Items = new Array();
},
ColumnHeaderDescription.prototype.AddItem = function(item)
{
    if (!item) return false;
    if(item.Index == 0)  { }
    else if(!item.Index) item.Index = this.Items.length;
    
    item.DisplayIndex = item.Index;
    this.Items[item.Index] = item;
    
    return this.Items[item.Index];
}  
ColumnHeaderDescription.prototype.Add = function(parameters)
{ 
    _NewHeader = new ColumnHeaderItem();
	_NewHeader.Index 				= typeof parameters._fullIndex != 'undefined' ? parameters._fullIndex[2] : null;
	_NewHeader.FullIndex 			= typeof parameters._fullIndex != 'undefined' ? parameters._fullIndex : null;
	_NewHeader.Name 				= typeof parameters._text != 'undefined' ? parameters._text[0] : "";
	_NewHeader.Visible 				= typeof parameters._visible != 'undefined' ? parameters._visible : true;
	_NewHeader.DisplayIndex 		= typeof parameters._displayIndex != 'undefined' ? parameters._displayIndex : parameters._fullIndex[2];
	_NewHeader.Type 				= typeof parameters._type != 'undefined' ? parameters._type : null;
	_NewHeader.Style 				= typeof parameters._style != 'undefined' ? parameters._style : null;
	_NewHeader.VisibleInDetailPanel	= typeof parameters._visibleInDetailPanel != 'undefined' ? parameters._visibleInDetailPanel : true;
	_NewHeader.DetailDispalyType 	= typeof parameters._detailDispalyType != 'undefined' ? parameters._detailDispalyType : 0;
	_NewHeader.ColumnInfo 			= typeof parameters._columnInfo != 'undefined' ? parameters._columnInfo : null;
	_NewHeader.GraphItems 			= typeof parameters._graphItems != 'undefined' ? parameters._graphItems : new InlineGraphInfo();
	_NewHeader.ListItems 			= typeof parameters._listItems != 'undefined' ? parameters._listItems : new ListViewInfo();
	_NewHeader.Description 			= typeof parameters._text != 'undefined' ? parameters._text[1] : "";
	_NewHeader.VisibleForUser 		= typeof parameters._visibleForUser != 'undefined' ? parameters._visibleForUser : true;
	_NewHeader.ColumnGroupByInfon 	= typeof parameters._columnGroupByInfon != 'undefined' ? parameters._columnGroupByInfon : new ColumnGroupByInformation(false);
	_NewHeader.Formula 				= typeof parameters._formula != 'undefined' ? parameters._formula : null;
	_NewHeader.DecimalPlace 		= typeof parameters._decimalPlace != 'undefined' ? parameters._decimalPlace : 2;
	
	return this.AddItem(_NewHeader);
	//return this.AddItem(new ColumnHeaderItem(name, visible, style, width, visibleInDetailPanel, detailDispalyType, columnType, columnInfo));
}
ColumnHeaderDescription.prototype.ContainsById = function(id)
{
    if(!id) return false;
    
    for (var i = 0; i < this.Items.length; i++)
    {
        if (this.Items[i].Id == id) return true;
    }
    return false;
}  
ColumnHeaderDescription.prototype.IndexById = function(id)
{
    if(!id) return -1;
    
    for (var i = 0; i < this.Items.length; i++)
    {
        if (this.Items[i].Id == id) return i;
    }
    return -1;    
}
ColumnHeaderDescription.prototype.CountVisibleColumn = function ()
{
    var _Count = 0;
    for(var i = 0; i < this.Items.length; i++)
    {
        if (this.Items[i].VisibleForUser && this.Items[i].Visible)
        {
            _Count++;
        }
    }
    return _Count;
}
ColumnHeaderDescription.prototype.Remove = function(index)
{
    if(typeof index == 'undefined') return;
    if(index > this.Items.length || index < 0 ) return;
    
    this.Items.splice(index, 1);
}        
            
function ColumnHeaderItem(item, name, type, style, visible, visibleInDetailPanel, detailDispalyType, columnInfo)
{   
    this.Index              = typeof item != 'undefined' ? item[2] : null;      //The array index of the item
    this.FullIndex          = typeof item != 'undefined' ? item : null;         //The full index. X, Y and Z (X=Type, Y=Key and Z=item).
    this.Name               = typeof name != 'undefined' ? name : null;         //The name to dispaly in the header (short name)
    this.Visible            = typeof visible != 'undefined' ? visible : null;   //Is this item default visible
    this.DisplayIndex;                  //What is the dispaly index on the screen (not yet use). As default it is the same as Index
    this.Type               = typeof type != 'undefined' ? type : null;         //What is the type of this column (Enums.column.type)
                                        //  Value: value as it can be find in the model
                                        //  Graph: the value is a graph
                                        //  List: this value is a list of id
                                        //  Formula: this value has to be computed.
    this.Style              = typeof style != 'undefined' ? style : null;       //What What is the style for this value. This has impact on how the value is display and formated: (Enums.column.style)
                                        //  Text: to be displayed as a string.(no format and algin left)
                                        //  Numeric: to be displayed as a number, if it is not a number the cell will be 0.(no format and algin right)
                                        //  Percent: to be displayed as a number with max 2 digit after comma.(no format and algin right) ex: 10,99%
                                        //  Time: to be displayed as a time value, has to be a numeric value in millisecondes.(time format(hh:mm:ss) and algin right)
                                        //  GraphBar: to be displayed as a garph bar.(columnInfo gives the config of the bar)
                                        //  Count: to displayed as the count of the value using 'const_DefaultSplitChar' as the split char.
										//  GraphBarPercent: to be displayed as a garph bar.(columnInfo gives the config of the bar)
										//  Float: to be displayed as a garph bar.(columnInfo gives the number of digit after the comman)
										//  DateTime: to be displayed as date time.
    //this.Width              = width;  //Is not used
    this.VisibleInDetailPanel   = typeof visibleInDetailPanel != 'undefined' ? visibleInDetailPanel : null; //Is this item visible in the detail panel
    this.DetailDispalyType  = typeof detailDispalyType != 'undefined' ? detailDispalyType : 0;  //What type of information has to be displayed in the detail panel. Default is: detail (column list)
                                                                                                //  Detail: a list of all the columns and there value for that item
                                            		                                            //  Graph: dispalyed the color info of the graphbar. Can only by used when the Style is 'GraphBar'
                                                                                                //  FieldHistory: if there is a history of this item it dispalyed last last 'const_PanelDetailHistorySize' peak values. Typically used for nummeric values and time values.
                                                                                                //  List: Dispaly in info of the ids. (ColumnInfo gives the desciption of the ids). Can only by used when the Style is 'List'.
    //this.ColumnType         = typeof columnType != 'undefined' ? columnType : 0;  //Not used
    this.ColumnInfo         = typeof columnInfo != 'undefined' ? columnInfo : null; //Give extra information for Style.GraphBar or DetailDispalyType.List.
    this.GraphItems         = new InlineGraphInfo();
    this.ListItems          = new ListViewInfo();
    this.Description        = "";       //Give a description of the column item
    this.VisibleForUser     = true;     //Can the user see this item. (or maje this item visible if the default is not visible)
    this.ColumnGroupByInfon = new ColumnGroupByInformation(false);  //Give information when this fiels is used to group.
    /*this.Owner              =           //Who is the owner of the column:*/
                                        //System
                                        //User
    this.Formula            = null;     //Used for custom column. The formula to compute
    this.DecimalPlace		= 2;
}

//Column group info
//_____________________________________________    
function ColumnGroupByInformation(isArray, isArrayItem)
{
    this.IsArray        = isArray;
    this.IsArrayItem    = typeof isArrayItem != 'undefined' ? isArrayItem : [-1, -1, -1];
}

//*************//
// Common function
//*************//
//To set the default layout of a toolbar button
//_____________________________________________
function setDefaultToolbarLayout(element, fnOnclick)
{
    var _Onclick = typeof fnOnclick != 'undefined' ? fnOnclick : new Function('window.alert("please configure onclick")');  
    element.onclick = _Onclick;
    element.onmouseover = function() { addElementClass(this, hoverElementClass); };
    element.onmouseout = function() { removeElementClass(this, hoverElementClass); };
}
function setToolStripLanguage(toolStrip)
{
	var _List = toolStrip.getElementsByTagName('img');
	var _MsgList = CrResource.toolbar[toolStrip.id];
	var len = _List.length;
	
	for(var i = 0; i < len; i++)
	{
		if (_List[i].id)
		{
			_List[i].alt = typeof _MsgList[_List[i].id] != 'undefined' ? _MsgList[_List[i].id][0] : _List[i].alt;
			_List[i].title = typeof _MsgList[_List[i].id] != 'undefined' ? _MsgList[_List[i].id][1] : _List[i].title;
		}		
	}
}
