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
		// debugger;
		crQualPanel.Form = new toolboxForm("QualificationForm");
		crQualPanel.Form.txParent = document.body;
		crQualPanel.Form.Show();
		crQualPanel.Form.onFormExit = crQualPanel.Close;			

		var _BODY = '';	    

		_BODY += '<div class="modal active" id="Select-qual">';
		_BODY += '	<div class="modal-header">';
		_BODY += '		<h4><img src="./assets/icons/Agent_Dialog_Qualifications.ico" width="16" height="16" alt="icon" /> '+ CrResource.QualificationForm.title +'</h4>';
		_BODY += '		<button class="close-btn" id ="btnSelectqualCloseTop" data-close>close</button>';
		_BODY += '	</div> ';
		_BODY += '	<div class="modal-content" style="display: flex;">';
		_BODY += '		<div class="dispositionCnt" id="modalSelectqualworkspace">';
		_BODY += '		</div>';
		_BODY += '		<div class="calenderBox" id="QualificationPanel">';
		_BODY += '		</div>';
		_BODY += '	</div>';
		_BODY += '	<div class="modal-footer">';
		_BODY += '		<button class="c-btn" id ="btnSelectqualOk">&nbsp;&nbsp;OK&nbsp;&nbsp;</button>';
		_BODY += '		<button class="c-btn" id ="btnSelectqualClose" data-close>Cancel</button>';
		_BODY += '	 </div>';
		_BODY += '</div>';
				
		crQualPanel.Form.txWorkArea[1].innerHTML = _BODY;

		$('btnSelectqualClose').onclick = btnQualCancel_OnClick;
		$('btnSelectqualCloseTop').onclick = btnQualCancel_OnClick;
		$('btnSelectqualOk').onclick = btnQualOk_OnClick;

		crQualPanel.OptionSpace = $('QualificationPanel');
		$('btnSelectqualClose').focus();
	},

	ShowTree : function(tree, workspace)
	{
		crQualPanel._sysLevel = 0;

		workspace.innerHTML = "";
		crQualPanel.CreateBranch(tree.Children, crQualPanel._sysLevel, workspace);
	},
	Show : function (tree)
	{
		// debugger;
		HideAllDialogModals();
		if (crQualPanel.Form) crQualPanel.crInt_OpenWindow = false;
		else crQualPanel.crInt_OpenWindow = true;

		if(crQualPanel.crInt_OpenWindow) crQualPanel.Init(tree);

		if (arguments.length > 0) crQualPanel.ShowTree(arguments[0], $('modalSelectqualworkspace'));

		$('btnSelectqualOk').disabled = true;

		crQualPanel.OptionSpace = $('QualificationPanel');

		addElementClass($('Select-qual'), 'active');
		addElementClass($('Selectqual'), 'active');
		addElementClass($('backdrop'), 'active');
	},
	CreateBranch : function(branch, level, workspace)
	{
		// debugger;
		if(branch.Count() > 0)
		{
			var node = document.createElement('ul');
			node.className = 'accordionDisposition';

			for(index in branch.Items)
			{
				if (branch.Items[index].Children.Count() == 0)
				{
					var branchNode = document.createElement('li');
					branchNode.className = 'btnBox';
	
					var innerBranchNode = document.createElement('button');
					innerBranchNode.innerHTML = branch.Items[index].Description;
					innerBranchNode.onclick = crQualPanel.Select_OnClick;
					innerBranchNode.crId = branch.Items[index].Id;
					innerBranchNode.crAction = branch.Items[index].Action;
					innerBranchNode.crPositive = branch.Items[index].Positive;
					innerBranchNode.crPositiveUpdatable = branch.Items[index].PositiveUpdatable;
	
					branchNode.appendChild(innerBranchNode);
					node.appendChild(branchNode);
				}
				else
				{
					var branchNode = document.createElement('li');
					var innerBranchNode = document.createElement('div');
					innerBranchNode.className = 'acclink';
					innerBranchNode.innerHTML = branch.Items[index].Description;
					innerBranchNode.onclick = crQualPanel.Select_OnClick;

					var innerDetailBranchNode = document.createElement('div');
					innerDetailBranchNode.className = 'accord-detail';
					
					var innerULnode = document.createElement('ul');
					innerULnode.className = 'accord-detail-inner';

					for(indexC in branch.Items[index].Children.Items)
					{
						if (branch.Items[index].Children.Items[indexC].Children.Count() == 0)
						{
							var innerChildLINode = document.createElement('li');
			
							var innerChildButtonNode = document.createElement('button');
							innerChildButtonNode.innerHTML = branch.Items[index].Children.Items[indexC].Description;
							innerChildButtonNode.onclick = crQualPanel.Select_OnClick;
							innerChildButtonNode.crId = branch.Items[index].Children.Items[indexC].Id;
							innerChildButtonNode.crAction = branch.Items[index].Children.Items[indexC].Action;
							innerChildButtonNode.crPositive = branch.Items[index].Children.Items[indexC].Positive;
							innerChildButtonNode.crPositiveUpdatable = branch.Items[index].Children.Items[indexC].PositiveUpdatable;
			
							innerChildLINode.appendChild(innerChildButtonNode);
							innerULnode.appendChild(innerChildLINode);
						}
						else
						{
							var innerChildLINode = document.createElement('li');

							var innerBranchNode2 = document.createElement('div');
							innerBranchNode2.className = 'acclink';
							innerBranchNode2.innerHTML = branch.Items[index].Children.Items[indexC].Description;
							innerBranchNode2.onclick = crQualPanel.Select_OnClick;

							var innerDetailBranchNode2 = document.createElement('div');
							innerDetailBranchNode2.className = 'accord-detail';

							// debugger;
							for(indexCD in branch.Items[index].Children.Items[indexC].Children.Items)
							{
								var dataNode = branch.Items[index].Children.Items[indexC].Children.Items[indexCD];

								var innerChildButtonNode = document.createElement('button');
								innerChildButtonNode.innerHTML = dataNode.Description;
								innerChildButtonNode.onclick = crQualPanel.Select_OnClick;
								innerChildButtonNode.crId = dataNode.Id;
								innerChildButtonNode.crAction = dataNode.Action;
								innerChildButtonNode.crPositive = dataNode.Positive;
								innerChildButtonNode.crPositiveUpdatable = dataNode.PositiveUpdatable;
				
								innerDetailBranchNode2.appendChild(innerChildButtonNode);
							}

							innerChildLINode.appendChild(innerBranchNode2);
							innerChildLINode.appendChild(innerDetailBranchNode2);							
							innerULnode.appendChild(innerChildLINode);
						}

						innerDetailBranchNode.appendChild(innerULnode);
					}

					branchNode.appendChild(innerBranchNode);
					branchNode.appendChild(innerDetailBranchNode);
					node.appendChild(branchNode);
				}				
			}

			workspace.appendChild(node);
		}
		else
		{
			var mainEl = document.createElement('UL');
			mainEl.id = "ulForDisposition";
			mainEl.className = "labelDispositionUL";
			
			var mainTag = document.createElement('div');
			mainTag.id = "divDispositionBodyItems";
			mainTag.className = "modal-content-SearchModeitem";
			
			var insideSpan = document.createElement('span');
			insideSpan.className = "labelSearchMode";
			insideSpan.textContent = 'No Items';

			mainEl.appendChild(mainTag);
			workspace.appendChild(mainEl);
		}
	},
	Select_OnClick : function()
	{
		// debugger;

		if(this.crAction == null)
		{
			crQualPanel.OptionClear();
			$('btnSelectqualOk').disabled = true;
			return;
		}

		if (crQualPanel.CurrentSelected.crAction != this.crAction) 
		{
			crQualPanel.OptionClear();
			
			if (this.crPositiveUpdatable) 
			{
				crQualPanel.OptionAddPosValue();
				$('btnSelectqualOk').disabled = false;
			}
			if (this.crAction == 4 || this.crAction == 5) 
			{
				$('btnSelectqualOk').disabled = true;
				crQualPanel.OptionAddDateTime();
			}
			else $('btnSelectqualOk').disabled = false;
		}
		else $('btnSelectqualOk').disabled = false;

		if (this.crPositiveUpdatable) $("txtNixxisQualOptPos").value = this.crPositive;
		
		crQualPanel.CurrentSelected = this;
	},
	OptionClear : function()
	{
		if(crQualPanel.OptionSpace) crQualPanel.OptionSpace.innerHTML = "";
		crQualPanel.Calen = null;
	},
	OptionAddDateTime : function()
	{
		// debugger;
		
		var el = window.document.createElement("div");
		el.className = 'calenderBox';
		var _BODY = '';	    
		// _BODY += '<div class="calenderBox">';
		_BODY += '	<div class="calender">';
		_BODY += '		<button class="month" id="MonthName">November 2022</button>';
		_BODY += '			<div class="dateBoxMain">';
		_BODY += '				<button class="btnNext left" onclick="javascript: getPreviousWeek();"> << </button>';
		_BODY += '					<div class="dateCnt">';
		_BODY += '						<ul style="padding-inline-start: 0px;">';
		_BODY += '							<li>';
		_BODY += '								<div class="dateBox" id="dateBox1">';
		_BODY += '									<div class="day" id="Day1">S</div>';
		_BODY += '									<div class="date" id="Day1Date">06</div>';
		_BODY += '								</div>';
		_BODY += '								<div class="dateBox" id="dateBox2">';
		_BODY += '									<div class="day" id="Day2">M</div>';
		_BODY += '									<div class="date" id="Day2Date">06</div>';
		_BODY += '								</div>';
		_BODY += '								<div class="dateBox" id="dateBox3">';
		_BODY += '									<div class="day" id="Day3">T</div>';
		_BODY += '									<div class="date" id="Day3Date">06</div>';
		_BODY += '								</div>';
		_BODY += '								<div class="dateBox" id="dateBox4">';
		_BODY += '									<div class="day" id="Day4">W</div>';
		_BODY += '									<div class="date" id="Day4Date">06</div>';
		_BODY += '								</div>';
		_BODY += '								<div class="dateBox" id="dateBox5">';
		_BODY += '									<div class="day" id="Day5">T</div>';
		_BODY += '									<div class="date" id="Day5Date">06</div>';
		_BODY += '								</div>';
		_BODY += '								<div class="dateBox" id="dateBox6">';
		_BODY += '									<div class="day" id="Day6">F</div>';
		_BODY += '									<div class="date" id="Day6Date">06</div>';
		_BODY += '								</div>';
		_BODY += '								<div class="dateBox" id="dateBox7">';
		_BODY += '									<div class="day" id="Day7">S</div>';
		_BODY += '									<div class="date" id="Day7Date">06</div>';
		_BODY += '								</div>';
		_BODY += '							</li>';
		_BODY += '						</ul>';
		_BODY += '					</div>';
		_BODY += '				<button class="btnNext right" onclick="javascript: getNextWeek();"> >> </button>';
		_BODY += '			</div>';
		_BODY += '		<div class="timeSlap">';
		_BODY += '			<ul id="TimeOptions" class="mytsscroll" onclick="javascript: DayTime_Selected();">';
		_BODY += '			</ul>';
		_BODY += '		</div>';
		_BODY += '		<div class="calenderBoxForm">';
		_BODY += '			<ul style="padding-inline-start: 0px;">';
		_BODY += '				<li>';
		_BODY += '					 <label>Callback destination:</label>';
		_BODY += '					 <input type="text" id="txtNixxisQualOptPos"/>';
		_BODY += '				</li>';
		_BODY += '				<li>';
		_BODY += '					 <label>Comment:</label>';
		_BODY += '					 <input type="text" id="txtNixxisQualOptPosVal"/>';
		_BODY += '				</li>';
		_BODY += '			</ul>';
		_BODY += '		</div>';
		_BODY += '	</div>';		
		// _BODY += '</div>';
		
		el.innerHTML = _BODY;
		crQualPanel.OptionSpace.appendChild(el);

		LoadDateTimeInstance();

		var info = ClientLink.Contacts.Get(ClientLink.Contacts.ActiveContactId);

		if (info.Direction == "I") $('txtNixxisQualOptPos').value = info.From;
		else $('txtNixxisQualOptPos').value = info.To;
	},
	OptionAddPosValue : function()
	{
		var el = window.document.createElement("div");
		el.className = "calenderBoxForm";

		var _BODY = '';

		_BODY += '			<ul style="padding-inline-start: 0px;">';
		_BODY += '				<li>';
		_BODY += '					 <label>Postive:</label>';
		_BODY += '					 <input type="text" id="txtNixxisQualOptPos"/>';
		_BODY += '				</li>';
		_BODY += '			</ul>';

		el.innerHTML = _BODY;		
		crQualPanel.OptionSpace.appendChild(el);
	},	
}

function DayTime_Selected() 
{
	$('btnSelectqualOk').disabled = false;
}

function btnQualOk_OnClick()
{
	if (!ClientLink.Contacts.ActiveContactId) return;
	
	var contactId = ClientLink.Contacts.ActiveContactId;
	var qualification = crQualPanel.CurrentSelected.crId;
	var callback = "";
	var callbackPhone = "";
	var callComment = "";
	var info = ClientLink.Contacts.Get(ClientLink.Contacts.ActiveContactId);
	
	try
	{
		// debugger;

		var dte = getQualificationSelectedDateInCalendar();
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
		callComment = $('txtNixxisQualOptPosVal').value;
		////alert(callback);
		// if (info.Direction == "I")
		// 	callbackPhone = info.From;
		// else
		// 	callbackPhone = info.To;
		////alert (callbackPhone);

		crQualPanel.OptionClear();

		if ($('CloseScript').disabled == true) $('CloseScript').disabled = false;
	}
	catch(e)
	{ 
		callback = "";
		callbackPhone = "";
		callComment = "";
	}

	ClientLink.setQualification(contactId, qualification, 'DTE='+callback, 'NUM='+callbackPhone);

	if(callComment && callComment.length > 0) ClientLink.setUUI(contactId, callComment);
	crQualPanel.CurrentSelected.crAction = -1;
	// crQualPanel.Form.setVisibility(false);

	removeElementClass($('Select-qual'), 'active');
	removeElementClass($('backdrop'), 'active');
	removeElementClass($('Selectqual'), 'active');
};
function btnQualCancel_OnClick()
{
	// debugger;
	crQualPanel.OptionClear();
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
		crSearchModePanel.Form.style = '{ top: 0px; left: 0px; z-index: 2; max-height: 0px;'
		
		var _BODY = '';	    

		_BODY += '<div class="modal active" id="search-mode">';
		_BODY += '	<div class="modal-header">';
		_BODY += '		<h4><img src="./assets/icons/Agent_Dialog_SearchMode.ico" width="16" height="16" alt="icon" /> Search mode</h4>';
		_BODY += '		<button class="close-btn" id ="btnSearchCloseTop" data-close>close</button>';
		_BODY += '	</div>';
		_BODY += '	<div class="modal-content">';
		_BODY += '		<ul class="accordionModal" id="modalSearchworkspace">';
		_BODY += '		</ul>';
		_BODY += '	</div>';
		_BODY += '	<div class="modal-footer">';
		_BODY += '		<button class="c-btn" id ="btnSearchOk">Preview</button>';
		_BODY += '		<button class="c-btn" id ="btnSearchClose" data-close>Cancel</button>';
		_BODY += '	</div>';
		_BODY += '</div>';

		crSearchModePanel.Form.txWorkArea[1].innerHTML = _BODY;

		$('btnSearchOk').onclick = crSearchModePanel.btnOk_OnClick;
		$('btnSearchClose').onclick = crSearchModePanel.btnCancel_OnClick;
		$('btnSearchCloseTop').onclick = crSearchModePanel.btnCancel_OnClick;

		$('btnSearchClose').focus();
	},

	ShowTree : function(tree, workspace)
	{
		workspace.innerHTML = "";
		crSearchModePanel.CreateBranch(tree, crSearchModePanel._sysLevel, workspace);
	},
	Show : function (tree)
	{
		// debugger;

		HideAllDialogModals();

		if (crSearchModePanel.Form)
			crSearchModePanel.crInt_OpenWindow = false;
		else
			crSearchModePanel.crInt_OpenWindow = true;
		
		if(crSearchModePanel.crInt_OpenWindow)
			crSearchModePanel.Init(tree);
		
		if (arguments.length > 0) crSearchModePanel.ShowTree(arguments[0], $('modalSearchworkspace'));

		addElementClass($('search-mode'), 'active');
		addElementClass($('backdrop'), 'active');

		$('btnSearchOk').disabled = true;
	},
	CreateBranch : function(branch, level, workspace)
	{
		// debugger;

		if(branch.Count() > 0)
		{
			// debugger;
			var iCount = 0;

			for(index in branch.Children)
			{
				if (branch.Children[index].Count() > 0)
				{
					var mainTag = document.createElement('li');
					var mainTitleTag = document.createElement('div');

					if(iCount == 0) mainTitleTag.className = 'acclink active';
					else mainTitleTag.className = 'acclink';

					mainTitleTag.innerHTML = branch.Children[index].Description;
					mainTitleTag.crId = branch.Children[index].Id;
					// mainTitleTag.onclick = crSearchModePanel.Select_OnClick;

					var childDiv = document.createElement('div');
					childDiv.className = 'accord-detail';
					var iChildCount = 0;
					for(idx in branch.Children[index].Children)
					{
						var childPara = document.createElement('p');
						var childParaButton = document.createElement('button');
						
						childParaButton.innerHTML = branch.Children[index].Children[idx].Description;
						childParaButton.crId = branch.Children[index].Children[idx].Id;
						childParaButton.onclick = crSearchModePanel.Select_OnClick;
						childParaButton.ondblclick = crSearchModePanel.Select_OnDoubleClick;
						childPara.appendChild(childParaButton);
						childDiv.appendChild(childPara);
						iChildCount++;
					}

					iCount++;
					mainTag.appendChild(mainTitleTag);
					if(iChildCount > 0) mainTag.appendChild(childDiv);
					workspace.appendChild(mainTag);
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

			workspace.appendChild(insideSpan);
		}
	},
	Select_OnClick : function(sender)
	{
		// debugger;

		var target = sender.currentTarget;

		if(target.nodeName?.toLowerCase() == 'button' )
		{
			$('btnSearchOk').disabled = false;
			crSearchModePanel.CurrentSelected = target;
			addElementClass(target, 'active');			
		}
	},
	Select_OnDoubleClick : function(sender)
	{
		// debugger;

		var target = sender.currentTarget;

		if(target.nodeName?.toLowerCase() == 'button' )
		{
			crSearchModePanel.CurrentSelected = target;
			crSearchModePanel.btnOk_OnClick();
		}
	},

	//
	//Events
	//
	btnOk_OnClick: function()
	{
		// debugger;

		if(crSearchModePanel !=null && crSearchModePanel.CurrentSelected != null && crSearchModePanel.CurrentSelected != '')
		{
			ClientLink.commands.SearchMode.execute(crSearchModePanel.CurrentSelected.crId);
			addAgentFooter();
			RefreshLastAgentState();

			// AgentStateWorking();

			window.setTimeout(RefreshLastAgentState, 1000);
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
		// debugger;
		
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
		// debugger;

		crPauseCodePanel.Form = new toolboxForm("PauseCodes");
		crPauseCodePanel.Form.txParent = document.body;
		crPauseCodePanel.Form.Show();
		crPauseCodePanel.Form.onFormExit = crPauseCodePanel.Close;
		
		var _BODY = '';	    

		_BODY += '<div class="modal checkBoxModal active" id="break-reason">';
		_BODY += '	<div class="modal-header">';
		_BODY += '		<h4><img src="./assets/icons/Agent_Dialog_Pause.ico" width="16" height="16" alt="icon" /> Select a break...</h4>';
		_BODY += '		<button class="close-btn" id ="btnBreakreasonCloseTop" data-close>close</button>';
		_BODY += '	</div>';
		_BODY += '<div class="modal-content" id="modalBreakreasonWorkspace">';
		_BODY += '</div>';
		_BODY += '<div class="modal-footer">';
		_BODY += '	<button class="c-btn" id ="btnBreakreasonOk">&nbsp;&nbsp;OK&nbsp;&nbsp;</button>';
		_BODY += '	<button class="c-btn" id ="btnBreakreasonClose" data-close>Cancel</button>';
		_BODY += '</div>';
					
		crPauseCodePanel.Form.txWorkArea[1].innerHTML = _BODY;

		$('btnBreakreasonOk').onclick = crPauseCodePanel.btnOk_OnClick;
		$('btnBreakreasonClose').onclick = crPauseCodePanel.btnCancel_OnClick;
		$('btnBreakreasonCloseTop').onclick = crPauseCodePanel.btnCancel_OnClick;
		$('btnBreakreasonClose').focus();
	},

	ShowList : function(list, workspace)
	{
		workspace.innerHTML = "";
		crPauseCodePanel.CreateList(list, workspace);
	},
	Show : function (list) 
	{
		// debugger;
		HideAllDialogModals();

		crPauseCodePanel.CurrentSelected = null;

		if (crPauseCodePanel.Form)
			crPauseCodePanel.crInt_OpenWindow = false;
		else
			crPauseCodePanel.crInt_OpenWindow = true;
		
		if(crPauseCodePanel.crInt_OpenWindow)
			crPauseCodePanel.Init(list);
		else
			addElementClass($('break-reason'), 'active');

		addElementClass($('backdrop'), 'active');
		
		if (arguments.length > 0) crPauseCodePanel.ShowList(arguments[0], $('modalBreakreasonWorkspace'));

		$('btnBreakreasonOk').style.display = "none";

		var breakItems = $('modalBreakreasonWorkspace');
		if(breakItems.childNodes.length > 0 && breakItems.childNodes[0].crId != null)
		{
			breakItems.childNodes[0].childNodes[0].checked = 'checked';
			crPauseCodePanel.CurrentSelected = breakItems.childNodes[0];
			$('btnBreakreasonOk').style.display = "inline";
		}

		addElementClass($('Pause'), 'active');
	},
	CreateList : function(list, workspace)
	{
		// debugger;
		
		if(list.Count() > 0)
		{
			for(index in list.Items)
			{
				var container = document.createElement('label');
				container.className = 'container';
				container.crId = list.Items[index].Id;

				var containerinput = document.createElement('input');
				containerinput.type = 'checkbox';				

				var containerspan = document.createElement('span');
				containerspan.className = 'checkmark';
				containerspan.innerHTML = '<div>' + list.Items[index].Description + '</div>';

				container.appendChild(containerinput);
				container.appendChild(containerspan);
				
				container.onclick = crPauseCodePanel.Select_OnClick;

				workspace.appendChild(container);
			}
		}
		else
		{
			var container = document.createElement('label');
			container.className = 'container';
			container.crId = null;

			var containerinput = document.createElement('input');
			containerinput.type = 'checkbox';

			var containerspan = document.createElement('span');
			// containerspan.className = 'checkmark';
			containerspan.innerHTML = '<div>' + 'No Items' + '</div>';

			container.appendChild(containerinput);
			container.appendChild(containerspan);

			workspace.appendChild(container);
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
			var breakItems = $('modalBreakreasonWorkspace');
			for(var i = 0; i < breakItems.childNodes.length; i++)
			{
				breakItems.childNodes[i].childNodes[0].checked = '';
			}

			this.childNodes[0].checked = 'checked';
		}
		catch(e)
		{;}
		
		$('btnBreakreasonOk').style.display = "inline";
		crPauseCodePanel.CurrentSelected = this;
		
		if (this.crPositiveUpdatable) $("txtNixxisQualOptPos").value = this.crPositive;
	},
	btnOk_OnClick: function()
	{
		// debugger;

		if (crPauseCodePanel.CurrentSelected) 
		{
			ClientLink.commands.Pause.execute(crPauseCodePanel.CurrentSelected.crId);

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
		else if(!ClientLink.commands.Pause.active)
		{
			removeElementClass($('Pause'), 'active');
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

		_BODY += '<div class="modal checkBoxModal active" id="team">';
		_BODY += '	<div class="modal-header">';
		_BODY += '		<h4><img src="./assets/icons/Agent_Dialog_TeamSelection.ico" width="16" height="16" alt="icon" /> Team selection...</h4>';
		_BODY += '		<button class="close-btn" id = "btnTeamCloseTop" data-close>close</button>';
		_BODY += '	</div>';
		_BODY += '	<div class="modal-content" id="modalworkspace">';
		_BODY += '	</div>';
		_BODY += '	<div class="modal-footer">';
		_BODY += '		<button class="c-btn" id ="btnTeamOk">&nbsp;&nbsp;OK&nbsp;&nbsp;</button>';
		_BODY += '		<button class="c-btn" id ="btnTeamClose" data-close>Cancel</button>';
		_BODY += '	</div>';
		_BODY += '</div>';
					
		crTeamSelectPanel.Form.txWorkArea[1].innerHTML = _BODY;
		
		$('btnTeamOk').onclick = crTeamSelectPanel.ButtonOk;
		$('btnTeamClose').onclick = crTeamSelectPanel.ButtonClose;
		$('btnTeamCloseTop').onclick = crTeamSelectPanel.ButtonClose;

		$('btnTeamClose').focus();		
	},

	ShowList : function(list, workspace)
	{
		workspace.innerHTML = "";		
		crTeamSelectPanel.CreateList(list, workspace);		
	},

	Show : function (list) 
	{
		// debugger;
		HideAllDialogModals();

		if (crTeamSelectPanel.Form)
			crTeamSelectPanel.crInt_OpenWindow = false;
		else
			crTeamSelectPanel.crInt_OpenWindow = true;
		
		if(crTeamSelectPanel.crInt_OpenWindow)
			crTeamSelectPanel.Init(list);
		
		if (arguments.length > 0)
		{
			 crTeamSelectPanel.ShowList(arguments[0], $('modalworkspace'));
			 $('btnTeamOk').style.display = "inline";
		}
		else $('btnTeamOk').style.display = "none";

		addElementClass($('team'), 'active');
		// addElementClass($('TeamSelection'), 'active');
		addElementClass($('backdrop'), 'active');
	},

	CreateList : function(list, workspace)
	{
		// debugger;
		
		if(list.Count() > 0)
		{
			for(index in list.Items)
			{
				var container = document.createElement('label');
				container.className = 'container';
				container.crId = list.Items[index].Id;

				var containerinput = document.createElement('input');
				containerinput.type = 'checkbox';
				containerinput.crActive = list.Items[index].Active;
				containerinput.crActiveNewValue = list.Items[index].Active;

				if(containerinput.crActive) containerinput.checked = true;

				var containerspan = document.createElement('span');
				containerspan.className = 'checkmark';
				containerspan.innerHTML = '<div>' + list.Items[index].Description + '</div>';

				container.appendChild(containerinput);
				container.appendChild(containerspan);

				containerinput.onclick = crTeamSelectPanel.Select_OnClick;

				workspace.appendChild(container);
			}
		} 
		else
		{
			var container = document.createElement('label');
			container.className = 'container';
			container.crId = null;

			var containerinput = document.createElement('input');
			containerinput.type = 'checkbox';

			var containerspan = document.createElement('span');
			// containerspan.className = 'checkmark';
			containerspan.innerHTML = '<div>' + 'No Items' + '</div>';

			container.appendChild(containerinput);
			container.appendChild(containerspan);

			workspace.appendChild(container);
		}		
	},


	//
	//Event functions
	//
	Select_OnClick : function(sender)
	{
		// debugger;
		
		if(sender.currentTarget.tagName?.toLowerCase() == 'input') 
		{
			var childControl = sender.currentTarget;

			if(childControl.checked == 'checked' || childControl.checked) childControl.checked = true;
			else childControl.checked = false;

			childControl.crActiveNewValue = !childControl.crActiveNewValue;
			return;
		}
	},
	ButtonOk : function()
	{
		// debugger;

		var teamItems = $('modalworkspace');
		for(var i = 0; i < teamItems.childNodes.length; i++)
		{
			var child = teamItems.childNodes[i];

			if(child.childNodes[0].crActiveNewValue != child.childNodes[0].crActive)
			{
				ClientLink.setActivateTeam(child.crId, child.childNodes[0].crActiveNewValue);
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
		_BODY += '		<h4><img src="./assets/icons/Supervisor_MessageType_Warning_25.png" width="16" height="16" alt="icon" /> Confirm quit</h4>';
		_BODY += '		<button class="close-btn" id = "btnAgentLogoutCloseTop" data-close>close</button>';
		_BODY += '	</div>';
		_BODY += '	<div class="modal-teamcontent" id="modalAgentLogoutworkspace">';
		
		_BODY += '	</div>';
		_BODY += '	<div class="modal-footer">';
		_BODY += '		<button id ="btnAgentLogoutOk" class="c-btn">Logout</button>';
		_BODY += '		<button id ="btnAgentLogoutClose" class="c-btn">Cancel</button>';
		_BODY += '	</div>';
		_BODY += '</div>';
					
		crAgentLogout.Form.txWorkArea[1].innerHTML = _BODY;

		$('modalAgentLogout').style.height = 200 + 'px';

		crAgentLogout.ShowList($('modalAgentLogoutworkspace'));

		$('btnAgentLogoutClose').onclick = crAgentLogout.ButtonClose;
		$('btnAgentLogoutCloseTop').onclick = crAgentLogout.ButtonClose;
		$('btnAgentLogoutOk').onclick = crAgentLogout.ButtonOk;
	},

	ShowList : function(workspace)
	{
		// debugger;

		workspace.innerHTML = "";

		var mainDIV = document.createElement('div');
		mainDIV.id = "divBodyItems";
		mainDIV.className = "modal-content-item";

		mainDIV.style = "text-align: center; padding-top: 10%; font-size: 12px;";

		var insideSpan = document.createElement('span');
		insideSpan.className = "labelcheckbox";
		insideSpan.textContent = 'Click Logout to end this session and logout.';

		mainDIV.appendChild(insideSpan);

		workspace.appendChild(mainDIV);
	},

	Show : function () 
	{
		HideAllDialogModals();

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

		// debugger;

		clearActiveCookies('contactroutehttpserversessionid');
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



//
//Agent Reload Warning
//
var crAgentReloadWarning = 
{
	WorkSpace : null,
	Form : null,
	
	crFormBtnCancel: null,
	crFormBtnOk: null,
	crInt_OpenWindow : null, //Bool to see if the from already exists

	crFormActionCancelled : null,

	Init : function()
	{
		// debugger;
		
		crAgentReloadWarning.Form = new toolboxForm("AgentReloadWarning");
		crAgentReloadWarning.Form.txParent = document.body;
		crAgentReloadWarning.Form.Show();
		crAgentReloadWarning.Form.onFormExit = crAgentReloadWarning.Close;			
		
		var _BODY = '';	    

		_BODY += '<div class="modal active" id="modalAgentReloadWarning" >';
		_BODY += '	<div class="modal-header">';
		_BODY += '		<h4>Confirm Reload</h4>';
		_BODY += '	</div>';
		_BODY += '	<div class="modal-teamcontent" id="modalAgentReloadWarningworkspace">';
		
		_BODY += '	</div>';
		_BODY += '	<div class="modal-footer">';
		_BODY += '		<button id ="btnAgentReloadWarningOk" class="NixxisDefaultButtonStyle">Reload</button>';
		_BODY += '		<button id ="btnAgentReloadWarningClose" class="NixxisDefaultButtonStyle">Cancel</button>';
		_BODY += '	</div>';
		_BODY += '</div>';
		
		crAgentReloadWarning.Form.txWorkArea[1].innerHTML = _BODY;

		$('modalAgentReloadWarning').style.height = 200 + 'px';

		crAgentReloadWarning.ShowList($('modalAgentReloadWarningworkspace'));
		
		crAgentReloadWarning.crFormBtnCancel = new toolboxButton("btnbtnAgentReloadWarningClose", "Cancel", function() { crAgentReloadWarning.ButtonClose(); });
		crAgentReloadWarning.crFormBtnCancel.txAbsolute = false;
		crAgentReloadWarning.crFormBtnCancel.txParent = $('btnAgentReloadWarningClose');

		crAgentReloadWarning.crFormBtnCancel.txAlt = "Cancel";
		crAgentReloadWarning.crFormBtnCancel.txTitle = "Cancel";
		crAgentReloadWarning.crFormBtnCancel.Show();

		crAgentReloadWarning.crFormBtnOk = new toolboxButton("btnbtnAgentReloadWarningOk", "Ok", function() { crAgentReloadWarning.ButtonOk(); });
		crAgentReloadWarning.crFormBtnOk.txAbsolute = false;
		crAgentReloadWarning.crFormBtnOk.txParent = $('btnAgentReloadWarningOk');

		crAgentReloadWarning.crFormBtnOk.txAlt = "Ok";
		crAgentReloadWarning.crFormBtnOk.txTitle = "Ok";
		crAgentReloadWarning.crFormBtnOk.Show();
	},

	ShowList : function(workspace)
	{
		// debugger;

		workspace.innerHTML = "";

		var mainDIV = document.createElement('div');
		mainDIV.id = "divBodyItems";
		mainDIV.className = "modal-content-item";

		mainDIV.style = "text-align: center; padding-top: 10%; background-color : #2e2e2e;";

		var insideSpan = document.createElement('span');
		insideSpan.className = "labelcheckbox";
		insideSpan.textContent = 'Click reload to reload this page.';

		mainDIV.appendChild(insideSpan);

		workspace.appendChild(mainDIV);
	},

	Show : function () 
	{
		HideAllDialogModals();

		if(crAgentReloadWarning.Form == null) 
		{
			crAgentReloadWarning.Init();
		}

		crAgentReloadWarning.crFormActionCancelled = null;
		addElementClass($('backdrop'), 'active');
		addElementClass($('modalAgentReloadWarning'), 'active');

		// $('modalAgentReloadWarning').dialog();
	},

	ButtonOk : function()
	{
		crAgentReloadWarning.crFormActionCancelled = false;		

		removeElementClass($('backdrop'), 'active');
		removeElementClass($('modalAgentReloadWarning'), 'active');

		location.reload();
	},

	ButtonClose : function()
	{
		crAgentReloadWarning.crFormActionCancelled = true;
		// debugger;
		
		crAgentReloadWarning.myPopup.response = "Not ok!"
		crAgentReloadWarning.myPopup.Close();
		removeElementClass($('backdrop'), 'active');
		removeElementClass($('modalAgentReloadWarning'), 'active');
	},
}
