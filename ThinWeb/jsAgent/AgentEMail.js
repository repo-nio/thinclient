tinyMCE.init( 
	{
	mode : "none",
	theme : "advanced",
	height : "100%",
	plugins : "advimage,contextmenu,inlinepopups,insertdatetime,preview,print,safari,searchreplace",
	//plugins : "advimage,contextmenu,emotions,inlinepopups,insertdatetime,preview,print,safari,searchreplace",
	//content_css : "css/content.css",
	//skin : "o2k7",
	//theme_advanced_buttons1 : "cut,copy,paste,selectall,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,formatselect,fontselect,fontsizeselect",
	//theme_advanced_buttons2 : "search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,image,code,|,insertdate,inserttime,|,forecolor,backcolor",
	//theme_advanced_buttons3 : "hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,|,preview,print",
	
	theme_advanced_buttons1 : "cut,copy,paste,selectall,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,formatselect,fontselect,fontsizeselect",
	theme_advanced_buttons2 : "search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,code,|,insertdate,inserttime,|,forecolor,backcolor",
	theme_advanced_buttons3 : "hr,removeformat,visualaid,|,sub,sup,|,charmap",
	theme_advanced_toolbar_location : "top",
	theme_advanced_toolbar_align : "left",
	theme_advanced_statusbar_location : "bottom",
					
	dialog_type : "modal",
	//plugin option: insertdatetime
	plugin_insertdate_dateFormat : "%Y-%m-%d",
	plugin_insertdate_timeFormat : "%H:%M:%S",
	//plugin option: preview
	plugin_preview_width : "500",
	plugin_preview_height : "600",

	//Lists
	external_image_list_url : "lists/image_list.js",
	external_link_list_url : "lists/link_list.js"
});	

function EMailWindow(name, parentMsg, parentReplay)
{
	var mySelf = this;
	var txEmail = new EMailInfo();
	var txEmailField = new EMailInfo();
	
	this.id_Border = "__EMailBorder__";
	this.txParentMsg = typeof parentMsg != 'undefined' ? parentMsg : null;
	this.txParentReplay = typeof parentReplay != 'undefined' ? parentReplay : null;
	this.txName = typeof name != 'undefined' ? name : "";
	this.txIsVisible = false;
	this.txAttachmentList = new Array();
	
	
	//this.OnChatCustomerMsgReceived = new toolboxMulticastDelegate();
	OnToolboxResize.Add(this, mySelf.Resize);

	this.Resize = function()
	{	
		//debugger;
		//var _Height = mySelf.txParentReplay.firsChild.clientHeight - mySelf.txParentReplay.firsChild.rows[0].clientHeight - mySelf.txParentReplay.firsChild.rows[1].clientHeight - mySelf.txParentReplay.firsChild.rows[2].clientHeight;
		//mySelf.txParentReplay.firsChild.rows[3].clientHeight.style.height = _Height + "px";		
	};
	
	this.SetEMailInfo = function(emailInfo)
	{
		txEmail = emailInfo;
		//debugger;
		//Get extra info from web service
		var request;
		var response = "";
		try 
		{
			if (window.XMLHttpRequest) { request = new XMLHttpRequest(); } // code for IE7+, Firefox, Chrome, Opera, Safari
			else { request = new ActiveXObject("Microsoft.XMLHTTP"); }// code for IE6, IE5
			request.open('GET', "http://" + window.location.host + txEmail.Body + "data" , false);
			request.send();
			response = request.responseText;
			
			var list = response.split('\r\n');		
			
			for(var i = 0; i < list.length; i++)
			{
				var pair = list[i].split('=');
				var key = pair[0];
				var value = pair[1];
				var found = false;
				//debugger;
				if (key.toLowerCase() == 'attachment') 
				{
					//debugger;
					if(!txEmail['attachments'])
					{
						txEmail['attachments'] = new Array();
					}
					var attList = value.split('&');
					
					if(attList.length > 3)
					{
						var attObj = new AttInfo();
						
						attObj.Id = unescape(attList[0]);
						attObj.FileName = unescape(attList[1]);
						attObj.Type = unescape(attList[2]);
						attObj.Number = unescape(attList[3]);
						txEmail['attachments'][txEmail['attachments'].length] = attObj;					
					}
				}
				else
				{
					for (att in txEmail) 
					{
						if (key.toLowerCase() == att.toLowerCase()) 
						{
							txEmail[att] = unescape(value);
							found = true;
							break;
						}
					}
				}
				if(!found) txEmail[key] = unescape(value);
			}			
			if(txEmail.CreationTime) txEmail.Date = txEmail.CreationTime;
		}
		catch(e){}
		if (this.txIsVisible)
		{
			//Put the new values of the email on the screen 
		}
	};
	
	this.Show = function()
	{
		if (!this.txParentMsg) return;
		if (!this.txParentReplay) return;
		
		//Building the original msg
		var row, cell, _org;
		_org = document.createElement("table");
		_org.className = "xxM_EMsg_Lay_T";
		_org.cellPadding = "0";
        _org.cellSpacing = "0";

		row = _org.insertRow(-1);
		cell = row.insertCell(-1); cell.className = "xxM_EMsg_Lay_Tc_Label";
		cell.innerHTML = "From:";
		cell = row.insertCell(-1); cell.className = "xxM_EMsg_Lay_Tc_Text";
		txEmailField.From = cell;
		cell.innerHTML = txEmail.From;
								
		row = _org.insertRow(-1);
		cell = row.insertCell(-1); cell.className = "xxM_EMsg_Lay_Tc_Label";
		cell.innerHTML = "To:";
		cell = row.insertCell(-1); cell.className = "xxM_EMsg_Lay_Tc_Text";
		txEmailField.To = cell;
		cell.innerHTML = txEmail.To;
		
		row = _org.insertRow(-1);
		cell = row.insertCell(-1); cell.className = "xxM_EMsg_Lay_Tc_Label";
		cell.innerHTML = "Date:";
		cell = row.insertCell(-1); cell.className = "xxM_EMsg_Lay_Tc_Text";
		txEmailField.Date = cell;
		cell.innerHTML = txEmail.Date;
		
		row = _org.insertRow(-1);
		cell = row.insertCell(-1); cell.className = "xxM_EMsg_Lay_Tc_Label";
		cell.innerHTML = "Subject:";
		cell = row.insertCell(-1); cell.className = "xxM_EMsg_Lay_Tc_Text";
		txEmailField.Subject = cell;
		cell.innerHTML = txEmail.Subject;
//debugger;
		row = _org.insertRow(-1);
		cell = row.insertCell(-1); cell.className = "xxM_EMsg_Lay_Tc_Label";
		cell.innerHTML = "Attachment(s):";
		cell = row.insertCell(-1); cell.className = "xxM_EMsg_Lay_Tc_Text";
		//txEmailField.Subject = cell;
		if(txEmail['attachments'])	
		{
			var len = txEmail['attachments'].length;
			for(var i = 0; i < len; i++)
			
			{
				//a
				var a = document.createElement("a");
        		a.className = "xxM_Att_O_Ref";
				//var endpoint = txEmail.Body.indexOf('?');
				var prefixmail = txEmail.Body.substring(0, txEmail.Body.indexOf('?'));
				a.href = window.location.protocol + "//" + window.location.host + prefixmail + "attachment/" + txEmail['attachments'][i].Id + "/" + txEmail['attachments'][i].FileName;
				a.target = "_blank";
				cell.appendChild(a);
								
				//img
				var img = document.createElement("img");
        		img.className = "xxM_Att_O_Img";
				img.src = "img/mail_AttCommon.png";
				a.appendChild(img);
				//Test
				var text = document.createElement("span");
        		text.className = "xxM_Att_0_Text";
				text.innerHTML = txEmail['attachments'][i].FileName;
				a.appendChild(text);				
			}
		}
		//cell.innerHTML = txEmail.Subject;
						
		row = _org.insertRow(-1);
		cell = row.insertCell(-1);
		cell.className = "xxM_EMsg_Lay_Tc_Msg";
		cell.setAttribute("colSpan", "2");
		txEmailField.Body = cell;
		//debugger;
		var _Frame = document.createElement("iframe");
		_Frame.width = "100%";
		_Frame.height = "100%";
		_Frame.frameBorder = "0";
		_Frame.scrolling = "auto";
		_Frame.allowTransparency = false;
		//var loc = window.location.href.substring(0, window.location.href.lastIndexOf('/')) + txEmail.Body + "htmlbody";
		var loc = window.location.protocol + "//" + window.location.host + txEmail.Body + "htmlbody";
		_Frame.src = loc;
		cell.appendChild(_Frame);
		
		//cell.innerHTML = txEmail.Body;
		this.txParentMsg.appendChild(_org);
		//
		//Replay
		//
		var el;
		_org = document.createElement("table");
		_org.className = "xxM_ERep_Lay_T";
		_org.cellPadding = "0";
        _org.cellSpacing = "0";
		
		row = _org.insertRow(-1);
		cell = row.insertCell(-1); cell.className = "xxM_ERep_Lay_Tc_Label";
		cell.innerHTML = "From:";
		cell = row.insertCell(-1); cell.className = "xxM_ERep_Lay_Tc_Text";
		cell.innerHTML = txEmail.To;
		
		row = _org.insertRow(-1);
		cell = row.insertCell(-1); cell.className = "xxM_ERep_Lay_Tc_Label";
		cell.innerHTML = "To:";
		cell = row.insertCell(-1); cell.className = "xxM_ERep_Lay_Tc_Text";
		//el = document.createElement('input');
		//el.className = "xxM_ERep_Textbox";
		//el.id = "xxM_ERep_txtTo";
		//el.type = "text"
		//el.value = txEmail.From;
		//cell.appendChild(el);
		cell.innerHTML = txEmail.From;
			
		row = _org.insertRow(-1);
		cell = row.insertCell(-1); cell.className = "xxM_ERep_Lay_Tc_Label";
		cell.innerHTML = "Subject:";
		cell = row.insertCell(-1); cell.className = "xxM_ERep_Lay_Tc_Text";
		//el = document.createElement('input');
		//el.className = "xxM_ERep_Textbox";
		//el.id = "xxM_ERep_txtSubject";
		//el.type = "text";
		//el.value = txEmail.Subject;
		//cell.appendChild(el);	
		cell.innerHTML = "RE:" + txEmail.Subject;
		
		row = _org.insertRow(-1);
		cell = row.insertCell(-1);
		cell.className = "xxM_ERep_Lay_Tc_Msg";
		cell.setAttribute("colSpan", "2");
		//debugger;
		var elDiv = document.createElement("div");
		elDiv.style.height="100%";
		elDiv.style.width="100%";
		//elDiv.style.backgroundColor = "red";
		cell.appendChild(elDiv);
		
		el = document.createElement('textarea');
		el.className = "xxM_MailReplay";
		el.id = "xxM_MailReplay";
		//el.innerHTML = txEmail.Body;
		el.style.height = "95%";
		el.style.width = "100%";
		elDiv.appendChild(el);
		//this.txParentReplay.appendChild(el);//To test
		var request;
		var response = ""; 
		var bodyDraft;
		//debugger;
		try 
		{
			if (window.XMLHttpRequest) { request = new XMLHttpRequest(); } // code for IE7+, Firefox, Chrome, Opera, Safari
			else { request = new ActiveXObject("Microsoft.XMLHTTP"); }// code for IE6, IE5
			request.open('GET', window.location.protocol + "//" + window.location.host + txEmail.Body + "draft2" , false);
			request.send();
			response = request.responseText;
			var attach = response.substring(0, response.indexOf('/'));
			this.txAttachmentList = attach.split(',');
			bodyDraft = response.substring(response.indexOf('/') + 1, response.length - response.indexOf('/'));
			bodyDraft = bodyDraft.replace('\r\n', '<br/>');
			bodyDraft = tinymce.DOM.encode(bodyDraft);
		}
		catch(e){}
		
		el.innerHTML = bodyDraft;
		
		this.txParentReplay.appendChild(_org);
		//this.Resize();
		tinyMCE.execCommand("mceAddControl", true, "xxM_MailReplay");
		//alert(response);
		//tinyMCE.execCommand('mceInsertContent',false, response);
		
		this.txIsVisible = true;
	};

	this.GetMailInfo = function()
	{
		return txEmail;
	}
}

function EMailInfo()
{
	this.To = "";
	this.From = "";
	this.Subject = "";
	this.Body = "";
	this.Date = "";
}
function AttInfo()
{
	this.Id = "";
	this.FileName = "";
	this.Type = "";
	this.Number = "";
}