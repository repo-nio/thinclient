//
//No tab page. (waiting and pause)
//
function crNoTabPagePanel(parent)
{
	this.txFrame = document.createElement('iframe');
	//width="100%" height="500px" frameborder="0" scrolling="auto"
	this.txFrame.width = "100%";
	this.txFrame.height = "100%";
	this.txFrame.frameBorder = "0";
	this.txFrame.scrolling = "auto";
	this.txFrame.allowTransparency = true;
	this.txParent = typeof parent != 'undefined' ? parent : null;
	
	this.Show = function ()
	{
		if (!this.txParent) return;
		
		this.txParent.appendChild(this.txFrame);
	}
	this.setUrl = function(url)
	{
		this.txFrame.src = url;
	}
	
	this.dispose = function()
	{
		this.txFrame.src = "about:blank";
		PurgeElement(this.txFrame);
		this.txFrame = null;
		this.txParent = null;
	}
}
//
//Chat tab
//
function crChatPanel(parent, name, page)
{
	this.txParent = typeof parent != 'undefined' ? parent : null;
	this.txName = typeof name != 'undefined' ? name : null;
	this.txCurrentContaxtId = this.txName;
	this.txParent.txPanel = this; 
	var _IsVisible = false;
	
	this.txFrame = document.createElement('iframe');
	this.txFrame.width = "100%";
	this.txFrame.height = "100%";
	this.txFrame.frameBorder = "0";
	this.txFrame.scrolling = "auto";
	this.txFrame.allowTransparency = true;

	var _Location = "http://" + window.location.host;
	this.txFrame.src = _Location + page; //"CrAgentChat.htm?ContactId=" + this.crContactId;
	
	this.Show = function ()
	{
		if (!this.txParent) 
			return;
		
		this.txParent.appendChild(this.txFrame);
		_IsVisible = true;
	};
	this.Clear = function()
	{
		//debugger;
		this.txFrame.src = "about:blank";
	};
	this.SetContact = function(contactId, page)
	{
		this.txCurrentContaxtId = contactId;
		this.txFrame.style.visibility = "";
		this.setUrl(_Location + page);
	};
	this.isVisible = function ()
	{
		_IsVisible = false;
	};
	this.setUrl = function(url)
	{
		if(this.txFrame.src == "about:blank")
			this.txFrame.src = url;
	};	
	this.ChatClientMsg = function()
	{
		
	};
	this.ChatAgentMsg = function()
	{
		
	};
	this.ChatClearScreen = function()
	{
		
	};
	this.dispose = function()
	{
		this.txFrame.src = "about:blank";
		PurgeElement(this.txFrame);
		this.txFrame = null;
		this.txParent = null;
	};
}
//
//Mail tab
//
function crMailPanel(parent, name)
{
	this.txParent = typeof parent != 'undefined' ? parent : null;
	this.txName = typeof name != 'undefined' ? name : null;
	this.txCurrentContaxtId = this.txName;
	this.txParent.txPanel = this; 
	var _IsVisible = false;
		
	this.txFrame = document.createElement('iframe');
	this.txFrame.width = "100%";
	this.txFrame.height = "100%";
	this.txFrame.frameBorder = "0";
	this.txFrame.scrolling = "auto";
	this.txFrame.allowTransparency = true;
	this.txFrame.src = "CrAgentEMail.htm?ContactId=" + this.txCurrentContaxtId;
	
	this.Show = function ()
	{
		if (!this.txParent) 
			return;
		
		this.txParent.appendChild(this.txFrame);
		_IsVisible = true;
	};
	this.Clear = function()
	{
		//debugger;
		this.txFrame.src = "about:blank";
	};
	this.SetContact = function(contactId)
	{
		this.txCurrentContaxtId = contactId;
		this.txFrame.style.visibility = "";
		this.setUrl("CrAgentEMail.htm?ContactId=" + this.txCurrentContaxtId);		
	};
	this.isVisible = function ()
	{
		_IsVisible = false;
	};
	this.setUrl = function(url)
	{
		this.txFrame.src = url;
	};
	this.GetReply = function()
	{
		return this.txFrame.contentWindow.GetEMailMsg();
	};
	this.GetReply2 = function()
	{
		return this.txFrame.contentWindow.GetEMailMsg2();
	};	
	this.SetDisableReply = function()
	{
		this.txFrame.contentWindow.DisableReplayArea();
	};
	
	this.dispose = function()
	{
		this.txFrame.src = "about:blank";
		PurgeElement(this.txFrame);
		this.txFrame = null;
		this.txParent = null;
	};
}
//
//Voice panel
//
function crVoicePanel(parent, name)
{
	this.txParent = typeof parent != 'undefined' ? parent : null;
	this.txName = typeof name != 'undefined' ? name : null;
	this.txCurrentContaxtId = this.txName;
	this.txParent.txPanel = this; 
	var _IsVisible = false;
		
	this.txFrame = document.createElement('iframe');
	this.txFrame.width = "100%";
	this.txFrame.height = "100%";
	this.txFrame.frameBorder = "0";
	this.txFrame.scrolling = "auto";
	this.txFrame.allowTransparency = false;
	this.txFrame.src = "CrAgentVoice.htm?ContactId=" + this.txCurrentContaxtId;

	
	//this.txFrame.src = "about:blank";
	//this.txFrame.src = "CrAgentVoiceDemo.htm?ContactId=" + this.txName;

	this.Show = function(){
		if (!this.txParent) 
			return;
		
		this.txParent.appendChild(this.txFrame);
		_IsVisible = true;
	}
	this.Clear = function()
	{
		//debugger;
		this.txFrame.src = "about:blank";
	}
	this.SetContact = function(contactId)
	{
		this.txCurrentContaxtId = contactId;
		this.txFrame.style.visibility = "";
		this.setUrl("CrAgentVoice.htm?ContactId=" + this.txCurrentContaxtId);		
	}
	this.isVisible = function ()
	{
		_IsVisible = false;
	}
	this.setUrl = function(url){
		this.txFrame.src = url;
	}
	this.dispose = function()
	{
		this.txFrame.src = "about:blank";
		PurgeElement(this.txFrame);
		this.txFrame = null;
		this.txParent = null;
	}
}
//
//Qualification panel
//

/*
var crQualiicationPanel = 
{
	_sysLevel : 0,
	_WorkSpace : null,
	_OptionSpace : null,
	_Form : null,
	CurrentSelected : "",
	Calen : null,
	DateTimeLbl : null,

	Init : function()
	{
		if (!crQualPanel.WorkSpace) 
		{
			//New
			//debugger;
		    crQualPanel.Form = new toolboxForm("QualificationForm");
		    crQualPanel.Form.txSize = new toolboxSize(495, 305);
		    crQualPanel.Form.txLocation = new toolboxPoint(50, 50);
		    crQualPanel.Form.setTitle(CrResource.QualificationForm.title);
		    crQualPanel.Form.Show();
		    crQualPanel.Form.setResizeble(false);
			var row, cell;
			var tb = document.createElement('table');
			tb.className = "xxQual_Lay_Main";
			tb.cellSpacing = "0"; tb.cellPadding = "0";
			tb.style.height = crQualPanel.Form.txWorkArea[1].clientHeight + "px";
			row = tb.insertRow(-1);
			cell = row.insertCell(-1);
			cell.className = "xxQual_Lay_Left";
			
			crQualPanel.Form.txWorkArea[1].appendChild(tb);
			
			var txBtnPanel = new toolboxFormButtonPanel("QualificationPanel", cell);
			//debugger;
			//txBtnPanel.hasMenuRow = true;
			txBtnPanel.Show();
			txBtnPanel.AddButton("btnQualOk", "Ok", btnQualOk_OnClick);
			txBtnPanel.AddButton("btnQualCancel", "Cancel", btnQualCancel_OnClick);
			//crQualPanel.OptionSpace = txBtnPanel.txMenuSpace;
			crQualPanel.WorkSpace = txBtnPanel.txWorkSpace;
			
			cell = row.insertCell(-1);
			crQualPanel.OptionSpace = cell;
			cell.className = "xxQual_Lay_Right";
			
		}
		
		
		if(crQualPanel.Form)
			crQualPanel.Form.setVisibility(true);	
			
		if(arguments.length > 0)
			crQualPanel.ShowTree(arguments[0], crQualPanel.WorkSpace);
			
		//crQualPanel.Form.Resize();
		
		crQualPanel.OptionClear();
		
		
	},

	ShowTree : function(tree, workspace)
	{
		//var tree = new BaseQualificationList(); 

		crQualPanel._sysLevel = 0
		workspace.innerHTML = "";
		if(tree.Children.Count() > 0)
		{
			workspace.appendChild(crQualPanel.CreateBranch(tree.Children, crQualPanel._sysLevel)); 
		}
		else
		{
			workspace.innerHTML = 'No Items';
		}
	},
	Show : function (tree)
	{
		crQualPanel.Init(tree);
	},
	CreateBranch : function(branch, level)
	{
		var mainEl = document.createElement('UL');
		mainEl.className = "NixxisQualBranch";
	
		if (level == 0) 
		{
			mainEl.style.paddingLeft = "5px";
			mainEl.style.marginTop = "2px";
		}
					
		for(index in branch.Items)
		{
			var node = document.createElement('LI');
			node.className = "NixxisQualNode";
			
			var innerEl = document.createElement('SPAN');
				
			var icon = document.createElement('IMG');
			if (branch.Items[index].Children.Count() > 0) 
			{
				icon.src = "img/Qual_Open.png";
				innerEl.crIsCollapsed = false;
				innerEl.onclick = crQualPanelIcon_Onclick;
			}
			else 
			{
				icon.src = "img/Qual_None.png";
				node.onmouseover = function() { addElementClass(this, 'Hover'); };
	        	node.onmouseout = function() { removeElementClass(this, 'Hover'); };
				innerEl.onclick = crQualPanel.Select_OnClick;
				
			}
					
			innerEl.appendChild(icon);
			innerEl.innerHTML += branch.Items[index].Description;
			innerEl.crId = branch.Items[index].Id;
			innerEl.crAction = branch.Items[index].Action;
			innerEl.crPositive = branch.Items[index].Positive;
			innerEl.crPositiveUpdatable = branch.Items[index].PositiveUpdatable;
			
			node.appendChild(innerEl);
				
			if(branch.Items[index].Children.Count() > 0)
			{
				crQualPanel._sysLevel++;
				node.appendChild(crQualPanel.CreateBranch(branch.Items[index].Children, crQualPanel._sysLevel));
				crQualPanel._sysLevel--;
			}
				
			mainEl.appendChild(node);
		}
			
		return mainEl;
	},
	Select_OnClick : function()
	{
		//alert("Select_OnClick:" + this.crId);
		//alert("Select_OnClick:" + this.crAction);
		//debugger;
		try
		{
			if (crQualPanel.CurrentSelected) 
			{
				if (crQualPanel.CurrentSelected.parentNode.style)
					crQualPanel.CurrentSelected.parentNode.style.backgroundColor = "Transparent";
			}
		}
		catch(e)
		{;}
		
		this.parentNode.style.backgroundColor = "#a9a9a9";
		
		if (crQualPanel.CurrentSelected.crAction != this.crAction) 
		{
			crQualPanel.OptionClear();
			
			if (this.crPositiveUpdatable)
				crQualPanel.OptionAddPosValue();
			
			if (this.crAction == 4 || this.crAction == 5) 
				crQualPanel.OptionAddDateTime();
		}
		if (this.crPositiveUpdatable) $("txtNixxisQualOptPos").value = this.crPositive;
		
		crQualPanel.CurrentSelected = this;
	},
	OptionClear : function()
	{
		crQualPanel.OptionSpace.innerHTML = "";
		crQualPanel.Calen = null;
	},
	OptionAddDateTime : function()
	{
		var el = window.document.createElement("div");
		el.className = "NixxisQualOptionDateTime";
		el.id = 'NixxisQualOptionDateTime';

		crQualPanel.OptionSpace.appendChild(el);
		var dte =  new Date();
		var dte1 = new Date(dte.getFullYear(), dte.getMonth(), dte.getDate() + 1, dte.getHours(), 0, 0);
		crQualPanel.Calen = new Calendar(1,  dte1.toString(), dateChanged, null);
		crQualPanel.Calen.showsTime = true;
		crQualPanel.Calen.time24 = true;
		crQualPanel.Calen.setDateFormat("%Y%m%d%H%M");
		crQualPanel.Calen.create(el);
	},
	OptionAddPosValue : function()
	{
		var el = window.document.createElement("div");
		el.className = "NixxisQualOptionPositive";
		el.innerHTML = '<label id="lblNixxisQualOptPos" for="NixxisQualOptPos">Postive</label><input type="text" name="NixxisQualOptPos" id="txtNixxisQualOptPos" value=""/>';
		crQualPanel.OptionSpace.appendChild(el);
	}
}*/

var crQualPanel = 
{
	_sysLevel : 0,
	WorkSpace : null,
	OptionSpace : null,
	Form : null,
	CurrentSelected : "",
	Calen : null,
	DateTimeLbl : null,

	Init : function()
	{
		if (!crQualPanel.WorkSpace) 
		{
			//New
			//debugger;
		    crQualPanel.Form = new toolboxForm("QualificationForm");
		    crQualPanel.Form.txSize = new toolboxSize(495, 305);
		    crQualPanel.Form.txLocation = new toolboxPoint(50, 50);
		    crQualPanel.Form.setTitle(CrResource.QualificationForm.title);
		    crQualPanel.Form.Show();
		    crQualPanel.Form.setResizeble(false);
			var row, cell;
			var tb = document.createElement('table');
			tb.className = "xxQual_Lay_Main";
			tb.cellSpacing = "0"; tb.cellPadding = "0";
			tb.style.height = crQualPanel.Form.txWorkArea[1].clientHeight + "px";
			row = tb.insertRow(-1);
			cell = row.insertCell(-1);
			cell.className = "xxQual_Lay_Left";
			
			crQualPanel.Form.txWorkArea[1].appendChild(tb);
			
			var txBtnPanel = new toolboxFormButtonPanel("QualificationPanel", cell);
			//debugger;
			//txBtnPanel.hasMenuRow = true;
			txBtnPanel.Show();
			txBtnPanel.AddButton("btnQualOk", "Ok", btnQualOk_OnClick);
			txBtnPanel.AddButton("btnQualCancel", "Cancel", btnQualCancel_OnClick);
			//crQualPanel.OptionSpace = txBtnPanel.txMenuSpace;
			
			//Adding container
			var container = document.createElement('DIV');
			container.className = 'NixxisQualBranchContainer';
			txBtnPanel.txWorkSpace.innerHTML = '';
			txBtnPanel.txWorkSpace.appendChild(container);
			
			crQualPanel.WorkSpace = container;
			
			cell = row.insertCell(-1);
			crQualPanel.OptionSpace = cell;
			cell.className = "xxQual_Lay_Right";
			
		}
		
		
		if(crQualPanel.Form)
			crQualPanel.Form.setVisibility(true);	
			
		if(arguments.length > 0)
			crQualPanel.ShowTree(arguments[0], crQualPanel.WorkSpace);
			
		//crQualPanel.Form.Resize();
		
		crQualPanel.OptionClear();
		
		
	},

	ShowTree : function(tree, workspace)
	{
		//var tree = new BaseQualificationList(); 

		crQualPanel._sysLevel = 0
		workspace.innerHTML = "";
		if(tree.Children.Count() > 0)
		{
			workspace.appendChild(crQualPanel.CreateBranch(tree.Children, crQualPanel._sysLevel)); 
		}
		else
		{
			workspace.innerHTML = 'No Items';
		}
	},
	Show : function (tree)
	{
		crQualPanel.Init(tree);
	},
	CreateBranch : function(branch, level)
	{
		var mainEl = document.createElement('UL');
		mainEl.className = "NixxisQualBranch";
	
		if (level == 0) 
		{
			mainEl.style.paddingLeft = "5px";
			mainEl.style.marginTop = "2px";
		}
					
		for(index in branch.Items)
		{
			var node = document.createElement('LI');
			node.className = "NixxisQualNode";
			
			var innerEl = document.createElement('SPAN');
				
			var icon = document.createElement('IMG');
			if (branch.Items[index].Children.Count() > 0) 
			{
				icon.src = "img/Qual_Open.png";
				innerEl.crIsCollapsed = false;
				innerEl.onclick = crQualPanelIcon_Onclick;
			}
			else 
			{
				icon.src = "img/Qual_None.png";
				node.onmouseover = function() { addElementClass(this, 'Hover'); };
	        	node.onmouseout = function() { removeElementClass(this, 'Hover'); };
				innerEl.onclick = crQualPanel.Select_OnClick;
				
			}
					
			innerEl.appendChild(icon);
			innerEl.innerHTML += branch.Items[index].Description;
			innerEl.crId = branch.Items[index].Id;
			innerEl.crAction = branch.Items[index].Action;
			innerEl.crPositive = branch.Items[index].Positive;
			innerEl.crPositiveUpdatable = branch.Items[index].PositiveUpdatable;
			
			node.appendChild(innerEl);
				
			if(branch.Items[index].Children.Count() > 0)
			{
				crQualPanel._sysLevel++;
				node.appendChild(crQualPanel.CreateBranch(branch.Items[index].Children, crQualPanel._sysLevel));
				crQualPanel._sysLevel--;
			}
				
			mainEl.appendChild(node);
		}
			
		return mainEl;
	},
	Select_OnClick : function()
	{
		//alert("Select_OnClick:" + this.crId);
		//alert("Select_OnClick:" + this.crAction);
		//debugger;
		try
		{
			if (crQualPanel.CurrentSelected) 
			{
				if (crQualPanel.CurrentSelected.parentNode.style)
					crQualPanel.CurrentSelected.parentNode.style.backgroundColor = "Transparent";
			}
		}
		catch(e)
		{;}
		
		this.parentNode.style.backgroundColor = "#a9a9a9";
		
		if (crQualPanel.CurrentSelected.crAction != this.crAction) 
		{
			crQualPanel.OptionClear();
			
			if (this.crPositiveUpdatable)
				crQualPanel.OptionAddPosValue();
			
			if (this.crAction == 4 || this.crAction == 5) 
				crQualPanel.OptionAddDateTime();
		}
		if (this.crPositiveUpdatable) $("txtNixxisQualOptPos").value = this.crPositive;
		
		crQualPanel.CurrentSelected = this;
	},
	OptionClear : function()
	{
		crQualPanel.OptionSpace.innerHTML = "";
		crQualPanel.Calen = null;
	},
	OptionAddDateTime : function()
	{
		var el = window.document.createElement("div");
		el.className = "NixxisQualOptionDateTime";
		el.id = 'NixxisQualOptionDateTime';

		crQualPanel.OptionSpace.appendChild(el);
		var dte =  new Date();
		var dte1 = new Date(dte.getFullYear(), dte.getMonth(), dte.getDate() + 1, dte.getHours(), 0, 0);
		crQualPanel.Calen = new Calendar(1,  dte1.toString(), dateChanged, null);
		crQualPanel.Calen.showsTime = true;
		crQualPanel.Calen.time24 = true;
		crQualPanel.Calen.setDateFormat("%Y%m%d%H%M");
		crQualPanel.Calen.create(el);
	},
	OptionAddPosValue : function()
	{
		var el = window.document.createElement("div");
		el.className = "NixxisQualOptionPositive";
		el.innerHTML = '<label id="lblNixxisQualOptPos" for="NixxisQualOptPos">Postive</label><input type="text" name="NixxisQualOptPos" id="txtNixxisQualOptPos" value=""/>';
		crQualPanel.OptionSpace.appendChild(el);
	}
}

function btnQualOk_OnClick()
{
	if (!ClientLink.Contacts.ActiveContactId) return;
	
	var contactId = ClientLink.Contacts.ActiveContactId;
	var qualification = crQualPanel.CurrentSelected.crId;
	var callback = "";
	var callbackPhone = "";
	var info = ClientLink.Contacts.Get(ClientLink.Contacts.ActiveContactId);
	
	try
	{
		var dte = crQualPanel.Calen.date;
		var xxDay = dte.getDate().toString();
        if (xxDay.length == 1) xxDay = "0" + xxDay;
        var xxMonth = (dte.getMonth() + 1).toString();
        if (xxMonth.length == 1) xxMonth = "0" + xxMonth;
        var xxYear = dte.getFullYear().toString();

		var xxHour = dte.getHours().toString();
       	if (xxHour.length == 1) xxHour = "0" + xxHour;
        var xxMin = dte.getMinutes().toString();
        if (xxMin.length == 1) xxMin = "0" + xxMin;
					
		callback =  xxYear + xxMonth + xxDay + xxHour + xxMin;
		//alert(callback);
		if (info.Direction == "I")
			callbackPhone = info.From;
		else
			callbackPhone = info.To;
		//alert (callbackPhone);
	}
	catch(e)
	{ 
		callback="";
		callbackPhone="";
	}
		
	ClientLink.setQualification(contactId, qualification, callback, callbackPhone);
	crQualPanel.CurrentSelected.crAction = -1;
	crQualPanel.Form.setVisibility(false);
};
function btnQualCancel_OnClick()
{
	crQualPanel.CurrentSelected.crAction = -1;
	crQualPanel.Form.setVisibility(false);
};
function crQualPanelIcon_Onclick()
{ 
	var icon = this.firstChild;
	var list = this.nextSibling; 
	if (this.crIsCollapsed) 
	{
		removeElementClass(list, "HideBranch");
		this.crIsCollapsed = false;
		icon.src = "img/Qual_Open.png";
	}
	else
	{
		addElementClass(list, "HideBranch");
		this.crIsCollapsed = true;
		icon.src = "img/Qual_Closed.png";
	}
}
//
//HistoryPanel
//
/*
function HistoryWindow(name, parent)
{
	var mySelf = this;

	this.id_Border = "__HistoryBorder__";
	this.txParent = typeof parent != 'undefined' ? parent : window.document.body;
	this.txName = typeof name != 'undefined' ? name : "";
	this.txTitle = "History";
	this.txBorderPanel;
	this.txHistoryItem;

	OnToolboxResize.Add(this, mySelf.Resize);
	
}
HistoryWindow.prototype.setTitle = function(title)
{
	this.txTitle = title;
	if (this.txBorderPanel.txTitle) 
		this.txBorderPanel.txTitle = title;
}
HistoryWindow.prototype.Show = function()
{
	this.txBorderPanel = new BorderFrame(this.id_Border + this.txName, this.txParent);
	this.txBorderPanel.setTitle(this.txTitle);
	this.txBorderPanel.Show();

	var _Work = this.txBorderPanel.getWorkspace();
	var list, lstItem;
	var list = document.createElement("ul");
	lstItem = document.createElement("li");
	
	
	
		
	var mySelf = this;

	$("NixxisChatMsgBtnSend" + this.txName).onclick = function ()
	{
			var _Input = $("NixxisChatMsgToSend" + mySelf.txName);
		mySelf.AddAgentMsg(_Input.value);
		_Input.value = "";
	};
}
HistoryWindow.prototype.AddAgentMsg = function(msg)
{
	var _Date = new Date();
	
	if (!this.txHistoryList) 
		return;
	
	var _Item = new toolboxListboxItem();
	_Item.txIcon = new toolboxImage("img/Chat_AgentMsg.png", new toolboxSize(36, 36));
	_Item.txText = this.DisplayMessage("<B>[" + _Date.getHours() + ":" + _Date.getMinutes() + ":" + _Date.getSeconds() + "] Agent </B> <br/>" +  msg);
	_Item.txTextCss = "NixxisChatBoxAgentText";
	_Item.txDoHover = false;
	_Item.txItemCss = "NixxisChatPBoxItem";
	this.txHistoryList.txList.Add(_Item);
	
	window.setTimeout("timerChatAnswer();", 5000, "javascript");
}
HistoryWindow.prototype.AddCustomerMsg = function(msg)
{
	var _Date = new Date();
	
	if (!this.txHistoryList) 
		return;
		
	var _Item = new toolboxListboxItem();
	//_Item.txIcon = new toolboxImage("img/Chat_AgentMsg.jpg", new toolboxSize(38,30));
	_Item.txText = this.DisplayMessage("<B>[" + _Date.getHours() + ":" + _Date.getMinutes() + ":" + _Date.getSeconds() + "] {CustomerName} </B> <br/>" +  msg);
	_Item.txTextCss = "NixxisChatBoxCustomerText";
	_Item.txDoHover = false;
	_Item.txItemCss = "NixxisChatPBoxItem";
	this.txHistoryList.txList.Add(_Item);
	
	this.OnChatCustomerMsgReceived.Invoke();
}
HistoryWindow.prototype.DisplayMessage = function(msg)
{
	//debugger;
	var _Msg = msg;
	
	_Msg = _Msg.replace('{CustomerName}', this.txCustomerPrefix);
	
	return _Msg;
}
HistoryWindow.prototype.Resize = function()
{	
	var _Height = this.txBorderPanel.getWorkspace().clientHeight - $('NixxisChatMsgCell' + this.txName).clientHeight - $('NixxisChatFreeSpace' + this.txName).clientHeight;
	//alert ("ChatWindow(" + this.txName + ") resize height:" + _Height);	
	$('NixxisChatMsgHistoryCell' + this.txName).style.height = _Height + "px";		
}
HistoryWindow.prototype.setText = function(text)
{
	var _Input = $("NixxisChatMsgToSend" + this.txName);
	_Input.value += text;
}*/



function dateChanged(calendar, newDate) {
			// Beware that this function is called even if the end-user only
			// changed the month/year.  In order to determine if a date was
			// clicked you can use the dateClicked property of the calendar:
			//alert ("New date:" + newDate);
			return;
			if (calendar.dateClicked || calendar.timeChanged) {
			  document.getElementById("dateValue").innerHTML = newDate; //calendar.date.toString();
			 }
			}
			
//
//Searchmode panel
//
var crSearchModePanel = 
{
	_sysLevel : 0,
	WorkSpace : null,
	Form : null,
	CurrentSelected : "",

	Init : function()
	{
		if (!crSearchModePanel.WorkSpace) 
		{
			//debugger;
		    crSearchModePanel.Form = new toolboxForm("SearchModeForm");
		    crSearchModePanel.Form.txSize = new toolboxSize(495, 305);
		    crSearchModePanel.Form.txLocation = new toolboxPoint(50, 50);
		    crSearchModePanel.Form.setTitle("Search mode");//TO DO: Res
		    crSearchModePanel.Form.Show();
		    crSearchModePanel.Form.setResizeble(false);
			var row, cell;
			var tb = document.createElement('table');
			tb.className = "xxQual_Lay_Main";
			tb.cellSpacing = "0"; tb.cellPadding = "0";
			tb.style.height = crSearchModePanel.Form.txWorkArea[1].clientHeight + "px";
			row = tb.insertRow(-1);
			cell = row.insertCell(-1);
			cell.className = "xxQual_Lay_Left";
			
			crSearchModePanel.Form.txWorkArea[1].appendChild(tb);
			
			var txBtnPanel = new toolboxFormButtonPanel("SearchModePanel", cell);
			txBtnPanel.Show();
			txBtnPanel.AddButton("btnSearchModeOk", "Ok", crSearchModePanel.btnOk_OnClick);
			txBtnPanel.AddButton("btnSearchModeCancel", "Cancel", crSearchModePanel.btnCancel_OnClick);
			crSearchModePanel.WorkSpace = txBtnPanel.txWorkSpace;		
		}
		
		if(crSearchModePanel.Form)
			crSearchModePanel.Form.setVisibility(true);	
			
		if(arguments.length > 0)
			crSearchModePanel.ShowTree(arguments[0], crSearchModePanel.WorkSpace);
	},

	ShowTree : function(tree, workspace)
	{
		workspace.innerHTML = "";
		if(tree.Count() > 0)	
		{
			workspace.appendChild(crSearchModePanel.CreateBranch(tree, crSearchModePanel._sysLevel)); 
		}
		else
		{
			workspace.innerHTML = 'No Items';
		}
	},
	Show : function (tree)
	{
		crSearchModePanel.Init(tree);
	},
	CreateBranch : function(branch, level)
	{
		var mainEl = document.createElement('UL');
		mainEl.className = "NixxisQualBranch";
	
		if (level == 0) 
		{
			mainEl.style.paddingLeft = "5px";
			mainEl.style.marginTop = "2px";
		}
					
		for(index in branch.Children)
		{
			var node = document.createElement('LI');
			node.className = "NixxisQualNode";
			
			var innerEl = document.createElement('SPAN');
			var icon = document.createElement('IMG');
			
			if (branch.Children[index].Count() > 0) 
			{
				icon.src = "img/Qual_Open.png";
				innerEl.crIsCollapsed = false;
				innerEl.onclick = crSearchModePanel.Icon_Onclick;
			}
			else 
			{
				icon.src = "img/Qual_None.png";
				node.onmouseover = function() { addElementClass(this, 'Hover'); };
	        	node.onmouseout = function() { removeElementClass(this, 'Hover'); };
				innerEl.onclick = crSearchModePanel.Select_OnClick;
			}
					
			innerEl.appendChild(icon);
			innerEl.innerHTML += branch.Children[index].Description;
			innerEl.crId = branch.Children[index].Id;

			node.appendChild(innerEl);
				
			if(branch.Children[index].Count() > 0)
			{
				crSearchModePanel._sysLevel++;
				node.appendChild(crSearchModePanel.CreateBranch(branch.Children[index], crSearchModePanel._sysLevel));
				crSearchModePanel._sysLevel--;
			}
				
			mainEl.appendChild(node);
		}
			
		return mainEl;
	},
	Select_OnClick : function()
	{
		try
		{
			if (crSearchModePanel.CurrentSelected) 
			{
				if (crSearchModePanel.CurrentSelected.parentNode.style)
					crSearchModePanel.CurrentSelected.parentNode.style.backgroundColor = "Transparent";
			}
		}
		catch(e)
		{;}
		
		this.parentNode.style.backgroundColor = "#a9a9a9";
				
		crSearchModePanel.CurrentSelected = this;
	},

	//
	//Events
	//
	btnOk_OnClick: function()
	{
		ClientLink.commands.SearchMode.execute(crSearchModePanel.CurrentSelected.crId);
		crSearchModePanel.CurrentSelected.crAction = -1;
		crSearchModePanel.Form.setVisibility(false);
	},
	btnCancel_OnClick : function()
	{
		crSearchModePanel.CurrentSelected.crAction = -1;
		crSearchModePanel.Form.setVisibility(false);
	},
	Icon_Onclick: function()
	{ 
		var icon = this.firstChild;
		var list = this.nextSibling; 
		if (this.crIsCollapsed) 
		{
			removeElementClass(list, "HideBranch");
			this.crIsCollapsed = false;
			icon.src = "img/Qual_Open.png";
		}
		else
		{
			addElementClass(list, "HideBranch");
			this.crIsCollapsed = true;
			icon.src = "img/Qual_Closed.png";
		}
	}	
}

//
//PauseCodes panel
//
var crPauseCodePanel = 
{
	WorkSpace : null,
	Form : null,
	CurrentSelected : "",

	Init : function()
	{
		if (!crPauseCodePanel.WorkSpace) 
		{
			//New
			//debugger;
		    crPauseCodePanel.Form = new toolboxForm("PauseCodes");
		    crPauseCodePanel.Form.txSize = new toolboxSize(300, 305);
		    crPauseCodePanel.Form.txLocation = new toolboxPoint(50, 50);
		    crPauseCodePanel.Form.setTitle("Pause mode");
		    crPauseCodePanel.Form.Show();
		    crPauseCodePanel.Form.setResizeble(false);
			var row, cell;
			var tb = document.createElement('table');
			tb.className = "xxQual_Lay_Main";
			tb.cellSpacing = "0"; tb.cellPadding = "0";
			tb.style.height = crPauseCodePanel.Form.txWorkArea[1].clientHeight + "px";
			row = tb.insertRow(-1);
			cell = row.insertCell(-1);
			cell.className = "xxQual_Lay_Left";
			
			crPauseCodePanel.Form.txWorkArea[1].appendChild(tb);
			
			var txBtnPanel = new toolboxFormButtonPanel("PauseCodePanel", cell);
			//debugger;
			txBtnPanel.Show();
			txBtnPanel.AddButton("btnPauseCodeOk", "Ok", crPauseCodePanel.btnOk_OnClick);
			txBtnPanel.AddButton("btnPauseCodeCancel", "Cancel", crPauseCodePanel.btnCancel_OnClick);
			crPauseCodePanel.WorkSpace = txBtnPanel.txWorkSpace;
		}
		
		if(crPauseCodePanel.Form)
			crPauseCodePanel.Form.setVisibility(true);	
			
		if(arguments.length > 0)
			crPauseCodePanel.ShowList(arguments[0], crPauseCodePanel.WorkSpace);
	},

	ShowList : function(list, workspace)
	{
		workspace.innerHTML = "";
		if(list.Count() > 0)
		{
			workspace.appendChild(crPauseCodePanel.CreateList(list)); 
		}
		else
		{
			workspace.innerHTML = 'No Items';
		}
	},
	Show : function (list) { crPauseCodePanel.Init(list); },
	CreateList : function(list)
	{
		var mainEl = document.createElement('UL');
		mainEl.className = "NixxisQualBranch";
		mainEl.style.paddingLeft = "5px";
		mainEl.style.marginTop = "2px";
					
		for(index in list.Items)
		{
			var node = document.createElement('LI');
			node.className = "NixxisQualNode";
			
			var innerEl = document.createElement('SPAN');
				
			var icon = document.createElement('IMG');
			icon.src = "img/Qual_None.png";
			node.onmouseover = function() { addElementClass(this, 'Hover'); };
        	node.onmouseout = function() { removeElementClass(this, 'Hover'); };
			
			innerEl.onclick = crPauseCodePanel.Select_OnClick;
			innerEl.appendChild(icon);
			innerEl.innerHTML += list.Items[index].Description;
			innerEl.crId = list.Items[index].Id;
			
			
			node.appendChild(innerEl);
			mainEl.appendChild(node);
		}
			
		return mainEl;
	},


	//
	//Event functions
	//
	Select_OnClick : function()
	{
		//debugger;
		try
		{
			if (crPauseCodePanel.CurrentSelected) 
			{
				if (crPauseCodePanel.CurrentSelected.parentNode.style)
					crPauseCodePanel.CurrentSelected.parentNode.style.backgroundColor = "Transparent";
			}
		}
		catch(e)
		{;}
		
		this.parentNode.style.backgroundColor = "#a9a9a9";
		
		if (this.crPositiveUpdatable) $("txtNixxisQualOptPos").value = this.crPositive;
		
		crPauseCodePanel.CurrentSelected = this;
	},	
	btnOk_OnClick: function()
	{
		if (crPauseCodePanel.CurrentSelected) 
		{
			ClientLink.commands.Pause.execute(crPauseCodePanel.CurrentSelected.crId);
			crPauseCodePanel.Form.setVisibility(false);
			crPauseCodePanel.CurrentSelected = null;
		}
	},
	btnCancel_OnClick: function()
	{
		crPauseCodePanel.Form.setVisibility(false);
	}
}
//
//Team selection panel
//
var crTeamSelectPanel = 
{
	WorkSpace : null,
	Form : null,
	_ULlist : null,
	
	Init : function()
	{
		if (!crTeamSelectPanel.WorkSpace) 
		{
			//New
			//debugger;
		    crTeamSelectPanel.Form = new toolboxForm("TeamSelection");
		    crTeamSelectPanel.Form.txSize = new toolboxSize(300, 305);
		    crTeamSelectPanel.Form.txLocation = new toolboxPoint(50, 50);
		    crTeamSelectPanel.Form.setTitle("Team selection");
		    crTeamSelectPanel.Form.Show();
		    crTeamSelectPanel.Form.setResizeble(false);
			var row, cell;
			var tb = document.createElement('table');
			tb.className = "xxQual_Lay_Main";
			tb.cellSpacing = "0"; tb.cellPadding = "0";
			tb.style.height = crTeamSelectPanel.Form.txWorkArea[1].clientHeight + "px";
			row = tb.insertRow(-1);
			cell = row.insertCell(-1);
			cell.className = "xxQual_Lay_Left";
			
			crTeamSelectPanel.Form.txWorkArea[1].appendChild(tb);
			
			var txBtnPanel = new toolboxFormButtonPanel("TeamSelectionPanel", cell);
			//debugger;
			txBtnPanel.Show();
			txBtnPanel.AddButton("btnTeamSelectionOk", "Ok", crTeamSelectPanel.btnOk_OnClick);
			txBtnPanel.AddButton("btnTeamSelectionCancel", "Cancel", crTeamSelectPanel.btnCancel_OnClick);
			crTeamSelectPanel.WorkSpace = txBtnPanel.txWorkSpace;
		}
		
		if(crTeamSelectPanel.Form)
			crTeamSelectPanel.Form.setVisibility(true);	
			
		if (arguments.length > 0) 
			crTeamSelectPanel.ShowList(arguments[0], crTeamSelectPanel.WorkSpace);
	},

	ShowList : function(list, workspace)
	{
		workspace.innerHTML = "";
		if(list.Count() > 0)
		{
			workspace.appendChild(crTeamSelectPanel.CreateList(list)); 
		}
		else
		{
			workspace.innerHTML = 'No Items';
		}
	},
	Show : function (list) { crTeamSelectPanel.Init(list); },
	CreateList : function(list)
	{
		var mainEl = document.createElement('UL');
		mainEl.className = "NixxisQualBranch";
		mainEl.style.paddingLeft = "5px";
		mainEl.style.marginTop = "2px";
		crTeamSelectPanel._ULlist = mainEl;
				
		for(index in list.Items)
		{
			var node = document.createElement('LI');
			node.className = "NixxisQualNode";
			
			var innerEl = document.createElement('SPAN');
				
			var icon = document.createElement('IMG');
			if (list.Items[index].Active) 
			{
				icon.src = "img/Icon_Selected.png";
				addElementClass(node, 'selected');
			}
			else 
			{
				icon.src = "img/Icon_NotSelected.png";
				addElementClass(node, 'notselected');
			}
			
			node.onmouseover = function() { addElementClass(this, 'hoverTeam'); };
        	node.onmouseout = function() { removeElementClass(this, 'hoverTeam'); };
			
			node.onclick = crTeamSelectPanel.Select_OnClick;
			innerEl.appendChild(icon);
			innerEl.innerHTML += list.Items[index].Description;
			innerEl.crId = list.Items[index].Id;
			innerEl.crActive = list.Items[index].Active;
			innerEl.crActiveNewValue = list.Items[index].Active;

			node.appendChild(innerEl);
			mainEl.appendChild(node);
		}
			
		return mainEl;
	},


	//
	//Event functions
	//
	Select_OnClick : function()
	{
		//addElementClass(node, 'selected');
		//removeElementClass(this, 'Hover');
		//debugger;
		var item = this.firstChild;
		if (item.crActiveNewValue)
		{
			removeElementClass(this, 'selected');
			addElementClass(this, 'notselected');
			item.crActiveNewValue = false;
			var img = item.firstChild;
			img.src = "img/Icon_NotSelected.png";
		}
		else
		{
			removeElementClass(this, 'notselected');
			addElementClass(this, 'selected');
			item.crActiveNewValue = true;
			var img = item.firstChild;
			img.src = "img/Icon_Selected.png";		
		}
	},	
	btnOk_OnClick: function()
	{
		//debugger;
		//crTeamSelectPanel._ULlist;
		
		var len = crTeamSelectPanel._ULlist.children.length;
		
		for(var i = 0; i < len; i++)
		{
			var child = crTeamSelectPanel._ULlist.children[i].firstChild;
			
			if(child.crActiveNewValue != child.crActive)
			{
				ClientLink.setActivateTeam(child.crId, child.crActiveNewValue);
			}
		}
		crTeamSelectPanel.Form.setVisibility(false);
	},
	btnCancel_OnClick: function()
	{
		crTeamSelectPanel.Form.setVisibility(false);
	}
}
