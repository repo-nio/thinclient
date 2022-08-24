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
		////debugger;
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
		////debugger;
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

	this.Show = function()
	{
		debugger;

		if (!this.txParent) 
			return;
		
		this.txParent.appendChild(this.txFrame);
		_IsVisible = true;
	}
	this.Clear = function()
	{
		////debugger;
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
var crQualPanel = 
{
	_sysLevel : 0,
	WorkSpace : null,
	OptionSpace : null,
	Form : null,
	CurrentSelected : "",
	Calen : null,
	DateTimeLbl : null,

	crFormBtnCancel: null,
	crFormBtnOk: null,
	crInt_OpenWindow : null, //Bool to see if the from already exists

	Init : function()
	{
		// if (!crQualPanel.WorkSpace) 
		// {
			crQualPanel.Form = new toolboxForm("QualificationForm");
			crQualPanel.Form.txParent = document.body;
			crQualPanel.Form.Show();
			crQualPanel.Form.onFormExit = crQualPanel.Close;			

			var _BODY = '';	    

			_BODY += '<div class="modal width500 active" id="Select-qual">';
			_BODY += '	<div class="modal-header">';
			_BODY += '		<h4>'+ CrResource.QualificationForm.title +'</h4>';
			_BODY += '	</div>';
			_BODY += '	<div class="modal-content" >';
			_BODY += '		<div style="width: 50%; float:left" id="modalSelectqualworkspace">';
			_BODY += '		</div>';
			_BODY += '		<div style="width: 50%; float:right" id="QualificationPanel">';
			_BODY += '		</div>';
			_BODY += '		<br style="clear:both;"/>';
			_BODY += '	</div>';
			_BODY += '	<div class="modal-footer">';
			_BODY += '		<button id ="btnSelectqualOk" >Ok</button>';
			_BODY += '		<button id ="btnSelectqualClose" >Cancel</button>';
			_BODY += '	</div>';
			_BODY += '</div>';
					
			crQualPanel.Form.txWorkArea[1].innerHTML = _BODY;

			crQualPanel.crFormBtnCancel = new toolboxButton("btnbtnSelectqualClose", "Cancel", function() { btnQualCancel_OnClick(); });
			crQualPanel.crFormBtnCancel.txAbsolute = false;
			crQualPanel.crFormBtnCancel.txParent = $('btnSelectqualClose');

			crQualPanel.crFormBtnCancel.txAlt = "Cancel";
			crQualPanel.crFormBtnCancel.txTitle = "Cancel";      
			crQualPanel.crFormBtnCancel.Show();

			crQualPanel.crFormBtnOk = new toolboxButton("btnbtnSelectqualOk", "Ok", function() { btnQualOk_OnClick(); });
			crQualPanel.crFormBtnOk.txAbsolute = false;
			crQualPanel.crFormBtnOk.txParent = $('btnSelectqualOk');

			crQualPanel.crFormBtnOk.txAlt = "Ok";
			crQualPanel.crFormBtnOk.txTitle = "Ok";      
			crQualPanel.crFormBtnOk.Show();

			crQualPanel.OptionSpace = $('QualificationPanel');
			$('btnSelectqualClose').focus();
	},

	ShowTree : function(tree, workspace)
	{
		crQualPanel._sysLevel = 0;

		workspace.innerHTML = "";
		workspace.appendChild(crQualPanel.CreateBranch(tree.Children, crQualPanel._sysLevel));
	},
	Show : function (tree)
	{
		if (crQualPanel.Form) crQualPanel.crInt_OpenWindow = false;
		else crQualPanel.crInt_OpenWindow = true;

		if(crQualPanel.crInt_OpenWindow) crQualPanel.Init(tree);

		if (arguments.length > 0) crQualPanel.ShowTree(arguments[0], $('modalSelectqualworkspace'));
	},
	CreateBranch : function(branch, level)
	{
		var mainEl = document.createElement('UL');
		mainEl.id = "ulForDisposition";
		mainEl.className = "labelDispositionUL";
	
		if (level == 0) 
		{
			// mainEl.style.paddingLeft = "5px";
			// mainEl.style.marginTop = "2px";
		}

		if(branch.Count() > 0)
		{
			for(index in branch.Items)
			{
				var node = document.createElement('LI');
				// node.className = "labelDispositionUL";

				var innerEl = document.createElement('SPAN');
				innerEl.className = "labelDispositionUL";
				// var icon = document.createElement('IMG');

				if (branch.Items[index].Children.Count() > 0) 
				{
					// icon.src = "img/Qual_Open.png";
					// innerEl.crIsCollapsed = false;
					// innerEl.onclick = crQualPanelIcon_Onclick;
				}
				else 
				{
					// icon.src = "img/Qual_None.png";
					// node.onmouseover = function() { addElementClass(this, 'hover'); };
					// node.onmouseout = function() { removeElementClass(this, 'hover'); };
					innerEl.onclick = crQualPanel.Select_OnClick;					
				}
						
				// innerEl.appendChild(icon);
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
		}
		else
		{
			var mainTag = document.createElement('div');
			mainTag.id = "divDispositionBodyItems";
			mainTag.className = "modal-content-SearchModeitem";
			
			var insideSpan = document.createElement('span');
			insideSpan.className = "labelSearchMode";
			insideSpan.textContent = 'No Items';

			mainEl.appendChild(mainTag);
		}
			
		return mainEl;
	},
	Select_OnClick : function()
	{
		debugger;
		try
		{
			var allSpans = $('ulForDisposition').getElementsByTagName('span');
		
			if(allSpans != null)
			{			
				for(var i = 0; i < allSpans.length; i++)
				{
					var child = allSpans[i];
					child.style.backgroundColor = 'Transparent';	
				}
			}

			this.style.backgroundColor = '#00809F';
		}
		catch(e)
		{;}
		
		// this.parentNode.style.backgroundColor = "#a9a9a9";
		
		if (crQualPanel.CurrentSelected.crAction != this.crAction) 
		{
			crQualPanel.OptionClear();
			
			if (this.crPositiveUpdatable) crQualPanel.OptionAddPosValue();
			
			if (this.crAction == 4 || this.crAction == 5) crQualPanel.OptionAddDateTime();
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
		el.className = "labelDispositionUL";
		el.id = 'NixxisQualOptionDateTime';

		crQualPanel.OptionSpace.appendChild(el);
		var dte =  new Date();
		var dte1 = new Date(dte.getFullYear(), dte.getMonth(), dte.getDate() + 1, dte.getHours(), 0, 0);
		crQualPanel.Calen = new Calendar(1,  dte1.toString(), dateChanged, null);
		crQualPanel.Calen.showsTime = true;
		crQualPanel.Calen.time24 = true;
		crQualPanel.Calen.setDateFormat("%Y%m%d%H%M");
		crQualPanel.Calen.create(el);

		var el = window.document.createElement("div");
		el.className = "labelDispositionUL";
		el.innerHTML = '<label id="lblNixxisQualOptPos" for="NixxisQualOptPos">Callback destination</label><input type="text" name="NixxisQualOptPos" id="txtNixxisQualOptPos" value=""/>';
		crQualPanel.OptionSpace.appendChild(el);

		var info = ClientLink.Contacts.Get(ClientLink.Contacts.ActiveContactId);

		if (info.Direction == "I") $('txtNixxisQualOptPos').value = info.From;
		else $('txtNixxisQualOptPos').value = info.To;

		$('NixxisQualOptionDateTime').style.height = 175 + 'px';
	},
	OptionAddPosValue : function()
	{
		var el = window.document.createElement("div");
		el.className = "labelDispositionUL";
		el.innerHTML = '<label id="lblNixxisQualOptPos" for="NixxisQualOptPos">Postive</label><input type="text" name="NixxisQualOptPos" id="txtNixxisQualOptPos" value=""/>';
		crQualPanel.OptionSpace.appendChild(el);
	},
}

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

		callbackPhone = $('txtNixxisQualOptPos').value;
		////alert(callback);
		// if (info.Direction == "I")
		// 	callbackPhone = info.From;
		// else
		// 	callbackPhone = info.To;
		////alert (callbackPhone);
	}
	catch(e)
	{ 
		callback="";
		callbackPhone="";
	}
		
	ClientLink.setQualification(contactId, qualification, callback, callbackPhone);
	crQualPanel.CurrentSelected.crAction = -1;
	// crQualPanel.Form.setVisibility(false);

	removeElementClass($('Select-qual'), 'active');
	removeElementClass($('backdrop'), 'active');
	removeElementClass($('Selectqual'), 'active');
};
function btnQualCancel_OnClick()
{
	debugger;
	
	if(crQualPanel != null && crQualPanel.CurrentSelected != null) crQualPanel.CurrentSelected.crAction = -1;
	// crQualPanel.Form.setVisibility(false);

	removeElementClass($('Select-qual'), 'active');
	removeElementClass($('backdrop'), 'active');
	removeElementClass($('Selectqual'), 'active');
};

function dateChanged(calendar, newDate) 
{
	// Beware that this function is called even if the end-user only
	// changed the month/year.  In order to determine if a date was
	// clicked you can use the dateClicked property of the calendar:
	//alert ("New date:" + newDate);
	return;
	if (calendar.dateClicked || calendar.timeChanged) 
	{
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


	crFormBtnCancel: null,
	crFormBtnOk: null,
	crInt_OpenWindow : null, //Bool to see if the from already exists

	Init : function()
	{
		// debugger;

		crSearchModePanel.Form = new toolboxForm("SearchModeForm");
		crSearchModePanel.Form.txParent = document.body;
		crSearchModePanel.Form.Show();
		crSearchModePanel.Form.onFormExit = crSearchModePanel.Close;			
		
		var _BODY = '';	    

		_BODY += '<div class="modal active" id="search-mode">';
		_BODY += '	<div class="modal-header">';
		_BODY += '		<h4>Search mode</h4>';
		_BODY += '	</div>';
		_BODY += '	<div class="modal-content" id="modalSearchworkspace">';
		
		_BODY += '	</div>';
		_BODY += '	<div class="modal-footer">';
		_BODY += '		<button id ="btnSearchOk" >Ok</button>';
		_BODY += '		<button id ="btnSearchClose" >Cancel</button>';
		_BODY += '	</div>';
		_BODY += '</div>';
					
		crSearchModePanel.Form.txWorkArea[1].innerHTML = _BODY;
		
		crSearchModePanel.crFormBtnCancel = new toolboxButton("btnbtnSearchClose", "Cancel", function() { crSearchModePanel.btnCancel_OnClick(); });
		crSearchModePanel.crFormBtnCancel.txAbsolute = false;
		crSearchModePanel.crFormBtnCancel.txParent = $('btnSearchClose');
		
		crSearchModePanel.crFormBtnCancel.txAlt = "Cancel";
		crSearchModePanel.crFormBtnCancel.txTitle = "Cancel";      
		crSearchModePanel.crFormBtnCancel.Show();

		crSearchModePanel.crFormBtnOk = new toolboxButton("btnbtnSearchOk", "Ok", function() { crSearchModePanel.btnOk_OnClick(); });
		crSearchModePanel.crFormBtnOk.txAbsolute = false;
		crSearchModePanel.crFormBtnOk.txParent = $('btnSearchOk');
		
		crSearchModePanel.crFormBtnOk.txAlt = "Ok";
		crSearchModePanel.crFormBtnOk.txTitle = "Ok";      
		crSearchModePanel.crFormBtnOk.Show();			

		$('btnSearchClose').focus();
	},

	ShowTree : function(tree, workspace)
	{
		workspace.innerHTML = "";
		workspace.appendChild(crSearchModePanel.CreateBranch(tree, crSearchModePanel._sysLevel));
	},
	Show : function (tree)
	{
		// debugger;

		if (crSearchModePanel.Form)
			crSearchModePanel.crInt_OpenWindow = false;
		else
			crSearchModePanel.crInt_OpenWindow = true;
		
		if(crSearchModePanel.crInt_OpenWindow)
			crSearchModePanel.Init(tree);
		
		if (arguments.length > 0) 
			crSearchModePanel.ShowTree(arguments[0], $('modalSearchworkspace'));
	},
	CreateBranch : function(branch, level)
	{
		// debugger;

		var mainTag = null;

		if(branch.Count() > 0)
		{
			// debugger;			

			for(index in branch.Children)
			{
				if (branch.Children[index].Count() > 0)
				{
					var mainTag = document.createElement('ul');

					mainTag.className = "labelSearchModeUL";
					mainTag.textContent = branch.Children[index].Description;
					mainTag.crId = branch.Children[index].Id;
					mainTag.onclick = crSearchModePanel.Select_OnClick;					

					for(idx in branch.Children[index].Children)
					{
						var lispan = document.createElement('li');

						lispan.className = "labelSearchMode";
						lispan.textContent = branch.Children[index].Children[idx].Description;
						lispan.crId = branch.Children[index].Children[idx].Id;
						lispan.onclick = crSearchModePanel.Select_OnClick;	

						mainTag.appendChild(lispan);
					}
				}
				else
				{

				}				
			}
		}
		else
		{
			var mainTag = document.createElement('div');
			mainTag.id = "divSearchBodyItems";
			mainTag.className = "modal-content-SearchModeitem";
			
			var insideSpan = document.createElement('span');
			insideSpan.className = "labelSearchMode";
			insideSpan.textContent = 'No Items';

			mainTag.appendChild(insideSpan);
		}

		return mainTag;
	},
	Select_OnClick : function(sender)
	{
		// debugger;

		var target = sender.currentTarget;

		if(target.nodeName?.toLowerCase() == 'li' )
		{
			crSearchModePanel.CurrentSelected = target;
			addElementClass(target, 'active');			
		}
		else
		{

		}		
	},

	//
	//Events
	//
	btnOk_OnClick: function()
	{
		debugger;

		if(crSearchModePanel !=null && crSearchModePanel.CurrentSelected != null && crSearchModePanel.CurrentSelected != '')
		{
			ClientLink.commands.SearchMode.execute(crSearchModePanel.CurrentSelected.crId);
			addAgentFooter();
			AgentStateWorking();

			// AgentStateWorking();

			window.setTimeout(AgentStateWorking, 1000);
		}
		else
		{
			removeElementClass($('SearchMode'), 'active');
			$('contactViewerObject').setAttribute("data", '');
		}

		crSearchModePanel.CurrentSelected = null;		

		removeElementClass($('search-mode'), 'active');
		removeElementClass($('backdrop'), 'active');
	},
	btnCancel_OnClick : function()
	{
		debugger;
		
		crSearchModePanel.CurrentSelected = null;

		removeAgentFooter();
		
		removeElementClass($('search-mode'), 'active');
		removeElementClass($('backdrop'), 'active');
		removeElementClass($('SearchMode'), 'active');
	},
}

function removeAgentFooter()
{
	var allSpans = $('divFooter').getElementsByClassName('when-ready');
		
	if(allSpans != null)
	{			
		for(var i = 0; i < allSpans.length; i++)
		{
			var child = allSpans[i];
			removeElementClass(child, 'active');
		}
	}
}

function addAgentFooter()
{
	var allSpans = $('divFooter').getElementsByClassName('when-ready');
		
	if(allSpans != null)
	{			
		for(var i = 0; i < allSpans.length; i++)
		{
			var child = allSpans[i];
			addElementClass(child, 'active');
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

	crFormBtnCancel: null,
	crFormBtnOk: null,
	crInt_OpenWindow : null, //Bool to see if the from already exists

	Init : function()
	{
		debugger;

		crPauseCodePanel.Form = new toolboxForm("PauseCodes");
		crPauseCodePanel.Form.txParent = document.body;
		crPauseCodePanel.Form.Show();
		crPauseCodePanel.Form.onFormExit = crPauseCodePanel.Close;			
		
		var _BODY = '';	    

		_BODY += '<div class="modal active" id="break-reason">';
		_BODY += '	<div class="modal-header">';
		_BODY += '		<h4>Break reason</h4>';
		_BODY += '	</div>';
		_BODY += '	<div class="modal-content" id="modalBreakreasonWorkspace">';
		
		_BODY += '	</div>';
		_BODY += '	<div class="modal-footer">';
		_BODY += '		<button id ="btnBreakreasonOk" >Ok</button>';
		_BODY += '		<button id ="btnBreakreasonClose" >Cancel</button>';
		_BODY += '	</div>';
		_BODY += '</div>';
					
		crPauseCodePanel.Form.txWorkArea[1].innerHTML = _BODY;
		
		crPauseCodePanel.crFormBtnCancel = new toolboxButton("btnbtnBreakreasonClose", "Cancel", function() { crPauseCodePanel.btnCancel_OnClick(); });
		crPauseCodePanel.crFormBtnCancel.txAbsolute = false;
		crPauseCodePanel.crFormBtnCancel.txParent = $('btnBreakreasonClose');
		
		crPauseCodePanel.crFormBtnCancel.txAlt = "Cancel";
		crPauseCodePanel.crFormBtnCancel.txTitle = "Cancel";      
		crPauseCodePanel.crFormBtnCancel.Show();

		crPauseCodePanel.crFormBtnOk = new toolboxButton("btnbtnBreakreasonOk", "Ok", function() { crPauseCodePanel.btnOk_OnClick(); });
		crPauseCodePanel.crFormBtnOk.txAbsolute = false;
		crPauseCodePanel.crFormBtnOk.txParent = $('btnBreakreasonOk');
		
		crPauseCodePanel.crFormBtnOk.txAlt = "Ok";
		crPauseCodePanel.crFormBtnOk.txTitle = "Ok";      
		crPauseCodePanel.crFormBtnOk.Show();			

		$('btnBreakreasonClose').focus();
	},

	ShowList : function(list, workspace)
	{
		workspace.innerHTML = "";
		workspace.appendChild(crPauseCodePanel.CreateList(list));
	},
	Show : function (list) 
	{
		crPauseCodePanel.CurrentSelected = null;

		if (crPauseCodePanel.Form)
			crPauseCodePanel.crInt_OpenWindow = false;
		else
			crPauseCodePanel.crInt_OpenWindow = true;
		
		if(crPauseCodePanel.crInt_OpenWindow)
			crPauseCodePanel.Init(list);
		else
		{
			addElementClass($('backdrop'), 'active');
			addElementClass($('break-reason'), 'active');	
		}
		
		if (arguments.length > 0)
			crPauseCodePanel.ShowList(arguments[0], $('modalBreakreasonWorkspace'));
	},
	CreateList : function(list)
	{
		var superMainDIV = $('divBodyItems');
		
		if(superMainDIV == null)
		{
			superMainDIV = document.createElement('div');
			superMainDIV.id = "divBodyItems";
		}
		else{
			superMainDIV.innerHTML = '';
		}
		
		if(list.Count() > 0)
		{
			for(index in list.Items)
			{
				var mainDIV = document.createElement('div');
				
				mainDIV.className = "modal-content-item";
				
				// debugger;

				mainDIV.onclick = crPauseCodePanel.Select_OnClick;
				mainDIV.onmouseenter = crPauseCodePanel.Select_OnHover;
				mainDIV.onmouseleave = crPauseCodePanel.Select_OnHoverOut;

				var insideCheckBox = document.createElement('div');
				// insideCheckBox.type = "checkbox";
				
				// mainDIV.style.backgroundColor ='#00809F';

				mainDIV.appendChild(insideCheckBox);

				var insideSpan = document.createElement('span');
				insideSpan.className = "labelcheckbox";
				insideSpan.textContent = list.Items[index].Description;
				insideSpan.crId = list.Items[index].Id;
				
				mainDIV.appendChild(insideSpan);
				superMainDIV.appendChild(mainDIV);
			}

			return superMainDIV;
		}
		else
		{
			var mainDIV = document.createElement('div');
			mainDIV.id = "divBodyItems";
			mainDIV.className = "modal-content-item";
			
			var insideSpan = document.createElement('span');
			insideSpan.className = "labelcheckbox";
			insideSpan.textContent = 'No Items';

			mainDIV.appendChild(insideSpan);

			return mainDIV;
		}		
	},


	//
	//Event functions
	//
	Select_OnClick : function(sender)
	{
		// debugger;
		try
		{
			if(crPauseCodePanel.CurrentSelected != null && crPauseCodePanel.CurrentSelected != '' )
			{
				if(this.childNodes[1].crId != crPauseCodePanel.CurrentSelected.childNodes[1].crId) 
				{
					this.style.backgroundColor = '#00809F';
					crPauseCodePanel.CurrentSelected.style.backgroundColor = 'rgb(81, 80, 80)';
				}
			}
		}
		catch(e)
		{;}
		
		crPauseCodePanel.CurrentSelected = this;
		
		if (this.crPositiveUpdatable) $("txtNixxisQualOptPos").value = this.crPositive;
	},
	Select_OnHover : function(sender)
	{
		var div = sender.currentTarget;
		div.style.backgroundColor ='#00809F';
	},

	Select_OnHoverOut : function(sender)
	{
		var div = sender.currentTarget;

		if(crPauseCodePanel.CurrentSelected != null && crPauseCodePanel.CurrentSelected != '' )
		{
			if(div.childNodes[1].crId == crPauseCodePanel.CurrentSelected.childNodes[1].crId) return;			
		}

		div.style.backgroundColor ='rgb(81, 80, 80)';
	},
	btnOk_OnClick: function()
	{
		// debugger;

		if (crPauseCodePanel.CurrentSelected) 
		{
			ClientLink.commands.Pause.execute(crPauseCodePanel.CurrentSelected.childNodes[1].crId);

			removeElementClass($('backdrop'), 'active');
			removeElementClass($('break-reason'), 'active');

			WaitFor_StateChanged(true, true);
		}
	},
	btnCancel_OnClick: function()
	{
		// debugger;

		crPauseCodePanel.Form.setVisibility(false);

		// removeElementClass($('team'), 'active');
		removeElementClass($('backdrop'), 'active');
		removeElementClass($('break-reason'), 'active');

		if(ClientLink.commands.WaitForCall.active)
		{
			 removeElementClass($('Pause'), 'active');
			 addElementClass($('WaitForCall'), 'active');
		}
	}
}


//
//Team selection panel
//
var crTeamSelectPanel = 
{
	WorkSpace : null,
	Form : null,
	// _ULlist : null,
	crFormBtnCancel: null,
	crFormBtnOk: null,
	crInt_OpenWindow : null, //Bool to see if the from already exists

	Init : function()
	{
		// debugger;
		
		crTeamSelectPanel.Form = new toolboxForm("TeamSelection");
		crTeamSelectPanel.Form.txParent = document.body;
		crTeamSelectPanel.Form.Show();
		crTeamSelectPanel.Form.onFormExit = crTeamSelectPanel.Close;			
		
		var _BODY = '';	    

		_BODY += '<div class="modal active" id="team">';
		_BODY += '	<div class="modal-header">';
		_BODY += '		<h4>Team</h4>';
		_BODY += '	</div>';
		_BODY += '	<div class="modal-teamcontent" id="modalworkspace">';
		
		_BODY += '	</div>';
		_BODY += '	<div class="modal-footer">';
		_BODY += '		<button id ="btnTeamOk">Ok</button>';
		_BODY += '		<button id ="btnTeamClose">Cancel</button>';
		_BODY += '	</div>';
		_BODY += '</div>';
					
		crTeamSelectPanel.Form.txWorkArea[1].innerHTML = _BODY;
		
		crTeamSelectPanel.crFormBtnCancel = new toolboxButton("btnbtnTeamClose", "Cancel", function() { crTeamSelectPanel.ButtonClose(); });
		crTeamSelectPanel.crFormBtnCancel.txAbsolute = false;
		crTeamSelectPanel.crFormBtnCancel.txParent = $('btnTeamClose');
		
		crTeamSelectPanel.crFormBtnCancel.txAlt = "Cancel";
		crTeamSelectPanel.crFormBtnCancel.txTitle = "Cancel";      
		crTeamSelectPanel.crFormBtnCancel.Show();

		crTeamSelectPanel.crFormBtnOk = new toolboxButton("btnbtnTeamOk", "Ok", function() { crTeamSelectPanel.ButtonOk(); });
		crTeamSelectPanel.crFormBtnOk.txAbsolute = false;
		crTeamSelectPanel.crFormBtnOk.txParent = $('btnTeamOk');
		
		crTeamSelectPanel.crFormBtnOk.txAlt = "Ok";
		crTeamSelectPanel.crFormBtnOk.txTitle = "Ok";      
		crTeamSelectPanel.crFormBtnOk.Show();			

		$('btnTeamClose').focus();		
	},

	ShowList : function(list, workspace)
	{
		workspace.innerHTML = "";		
		workspace.appendChild(crTeamSelectPanel.CreateList(list));		
	},

	Show : function (list) 
	{
		if (crTeamSelectPanel.Form)
			crTeamSelectPanel.crInt_OpenWindow = false;
		else
			crTeamSelectPanel.crInt_OpenWindow = true;
		
		if(crTeamSelectPanel.crInt_OpenWindow)
			crTeamSelectPanel.Init(list);
		
		if (arguments.length > 0) 
			crTeamSelectPanel.ShowList(arguments[0], $('modalworkspace'));
	},

	CreateList : function(list)
	{
		var superMainDIV = $('divBodyItems');
		
		if(superMainDIV == null)
		{
			superMainDIV = document.createElement('div');
			superMainDIV.id = "divBodyItems";
		}
		else{
			superMainDIV.innerHTML = '';
		}
		
		if(list.Count() > 0)
		{
			for(index in list.Items)
			{
				var mainDIV = document.createElement('div');
				
				mainDIV.className = "modal-content-item";
				
				// debugger;

				mainDIV.onclick = crTeamSelectPanel.Select_OnClick;
				mainDIV.onmouseenter = crTeamSelectPanel.Select_OnHover;
				mainDIV.onmouseleave = crTeamSelectPanel.Select_OnHoverOut;

				var insideCheckBox = document.createElement('input');
				insideCheckBox.type = "checkbox";

				if (list.Items[index].Active)
				{			
					insideCheckBox.checked = true;
					mainDIV.style.backgroundColor ='#00809F';
				}

				mainDIV.appendChild(insideCheckBox);

				var insideSpan = document.createElement('span');
				insideSpan.className = "labelcheckbox";
				insideSpan.textContent = list.Items[index].Description
				insideSpan.crId = list.Items[index].Id;
				insideSpan.crActive = list.Items[index].Active;
				insideSpan.crActiveNewValue = list.Items[index].Active;
				mainDIV.appendChild(insideSpan);

				superMainDIV.appendChild(mainDIV);
			}

			return superMainDIV;
		}
		else
		{
			var mainDIV = document.createElement('div');
			mainDIV.id = "divBodyItems";
			mainDIV.className = "modal-content-item";
			
			var insideSpan = document.createElement('span');
			insideSpan.className = "labelcheckbox";
			insideSpan.textContent = 'No Items';

			mainDIV.appendChild(insideSpan);

			return mainDIV;
		}		
	},


	//
	//Event functions
	//
	Select_OnClick : function(sender)
	{
		debugger;

		var div = sender.currentTarget;
		var childs = div.childNodes;

		childs[0].checked = !childs[0].checked;
		childs[1].crActiveNewValue = !childs[1].crActiveNewValue;

		if(childs[0].checked)
		{
			div.style.backgroundColor ='#00809F';
		}
		else
		{
			div.style.backgroundColor ='rgb(81, 80, 80)';
		}
	},

	Select_OnHover : function(sender)
	{
		var div = sender.currentTarget;
		div.style.backgroundColor ='#00809F';
	},

	Select_OnHoverOut : function(sender)
	{
		var div = sender.currentTarget;

		var childs = div.childNodes;

		if(childs==null || !childs[0].checked)
			div.style.backgroundColor ='rgb(81, 80, 80)';
	},
	
	ButtonOk : function()
	{
		// debugger;
	
		var allSpans = $('divBodyItems').getElementsByTagName('span');
		
		if(allSpans != null)
		{
			for(var i = 0; i < allSpans.length; i++)
			{
				var child = allSpans[i];

				if(child.crActiveNewValue != child.crActive)
				{
					ClientLink.setActivateTeam(child.crId, child.crActiveNewValue);
				}
			}
		}	

		removeElementClass($('team'), 'active');
		removeElementClass($('backdrop'), 'active');
		removeElementClass($('TeamSelection'), 'active');
	},
	ButtonClose : function()
	{
		// debugger;
		
		removeElementClass($('team'), 'active');
		removeElementClass($('backdrop'), 'active');
		removeElementClass($('TeamSelection'), 'active');
	},
}




//
//Agent Logout
//
var crAgentLogout = 
{
	WorkSpace : null,
	Form : null,
	
	crFormBtnCancel: null,
	crFormBtnOk: null,
	crInt_OpenWindow : null, //Bool to see if the from already exists

	Init : function()
	{
		// debugger;
		
		crAgentLogout.Form = new toolboxForm("AgentLogout");
		crAgentLogout.Form.txParent = document.body;
		crAgentLogout.Form.Show();
		crAgentLogout.Form.onFormExit = crAgentLogout.Close;			
		
		var _BODY = '';	    

		_BODY += '<div class="modal active" id="modalAgentLogout" >';
		_BODY += '	<div class="modal-header">';
		_BODY += '		<h4>Confirm Quit</h4>';
		_BODY += '	</div>';
		_BODY += '	<div class="modal-teamcontent" id="modalAgentLogoutworkspace">';
		
		_BODY += '	</div>';
		_BODY += '	<div class="modal-footer">';
		_BODY += '		<button id ="btnAgentLogoutOk">Ok</button>';
		_BODY += '		<button id ="btnAgentLogoutClose">Cancel</button>';
		_BODY += '	</div>';
		_BODY += '</div>';
					
		crAgentLogout.Form.txWorkArea[1].innerHTML = _BODY;

		$('modalAgentLogout').style.height = 200 + 'px';

		crAgentLogout.ShowList($('modalAgentLogoutworkspace'));
		
		crAgentLogout.crFormBtnCancel = new toolboxButton("btnbtnAgentLogoutClose", "Cancel", function() { crAgentLogout.ButtonClose(); });
		crAgentLogout.crFormBtnCancel.txAbsolute = false;
		crAgentLogout.crFormBtnCancel.txParent = $('btnAgentLogoutClose');

		crAgentLogout.crFormBtnCancel.txAlt = "Cancel";
		crAgentLogout.crFormBtnCancel.txTitle = "Cancel";
		crAgentLogout.crFormBtnCancel.Show();

		crAgentLogout.crFormBtnOk = new toolboxButton("btnbtnAgentLogoutOk", "Ok", function() { crAgentLogout.ButtonOk(); });
		crAgentLogout.crFormBtnOk.txAbsolute = false;
		crAgentLogout.crFormBtnOk.txParent = $('btnAgentLogoutOk');

		crAgentLogout.crFormBtnOk.txAlt = "Ok";
		crAgentLogout.crFormBtnOk.txTitle = "Ok";
		crAgentLogout.crFormBtnOk.Show();
	},

	ShowList : function(workspace)
	{
		// debugger;

		workspace.innerHTML = "";

		var mainDIV = document.createElement('div');
		mainDIV.id = "divBodyItems";
		mainDIV.className = "modal-content-item";

		var insideSpan = document.createElement('span');
		insideSpan.className = "labelcheckbox";
		insideSpan.textContent = 'Click Ok to logout.';

		mainDIV.appendChild(insideSpan);

		workspace.appendChild(mainDIV);
	},

	Show : function () 
	{
		if(crAgentLogout.Form == null) crAgentLogout.Init();
		
		addElementClass($('backdrop'), 'active');
		addElementClass($('modalAgentLogout'), 'active');
	},

	ButtonOk : function()
	{
		// debugger;
	
		try
		{			
			ClientLink.disconnect();
			DisposeClient();
			ClientLink.dispose();
			ClientLink = null;
		}
		catch(e)
		{
			;
		}

		removeElementClass($('AgentLogout'), 'active');
		removeElementClass($('backdrop'), 'active');
		removeElementClass($('modalAgentLogout'), 'active');

		debugger;
		// window.location.href = "CrAgentlogin.htm";
		// window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'CrLoginScreen.htm';
		location.reload();
	},
	ButtonClose : function()
	{
		// debugger;
		
		removeElementClass($('AgentLogout'), 'active');
		removeElementClass($('backdrop'), 'active');
		removeElementClass($('modalAgentLogout'), 'active');
	},
}