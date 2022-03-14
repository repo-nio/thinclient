/*
 * File version : 1.22.0.8
 * 
 */
var xxAgenda = 
{
	Obj : null,
	inline : false,
	parent : null,
	agenda : null,
	agdDateTime : null,
	IsConfirmBtnVisible : true,
	IsCancelBtnVisible : false,
	IsNavBtnVisible : true,
	IsLabelVisible : true,
	CancelBeforeAdd : true,
	MaxAppSelect : false, 
	CurrentWeekOffset : 0,
	language : "en",
	selectLabelFormat : "{DDD}, {D} {MMM} {Y} {hh}:{mm}",
	dateFormat : "{DD}/{MM}/{YY}",
	timeFormat : "{hh}:{mm}",
	Description : "",
	Aera : "",
	//Parameters system
	xxCancelAppId : "",
	//Events
	eventConfirm : new Function(),
	eventCancel : new Function(),
	Init : function ()
	{
		if (xxAgenda.language == 'nl')
			xxAgdRenderMan.dayNames = dayNames_Nl;
		else if (xxAgenda.language == 'fr')
			xxAgdRenderMan.dayNames = dayNames_Fr;
		else
			xxAgdRenderMan.dayNames = dayNames_En;
		
		xxAgdRenderMan.language = xxAgenda.language;			
		
		if (xxAgenda.inline)
			xxAgenda.ShowInline();
		else
			xxAgenda.ShowPopUp();
	},
	ShowInline : function()
	{
       	agenda = new NixxisAgenda(xxAgenda.parent);
        agenda.txName = "inlineAgenda";
        agenda.txNixxisContactLink = NixxisContactLink;
        agenda.DateTimeSelectionChange = xxAgenda.DateTimeChanged;
		agenda.DateTimeSelected = xxAgenda.Confirmed;
		agenda.txIsConfirmBtnVisible = xxAgenda.IsConfirmBtnVisible;
		agenda.txIsCancelBtnVisible = xxAgenda.IsCancelBtnVisible;
		agenda.txIsNavBtnVisible = xxAgenda.IsNavBtnVisible;
		agenda.txIsLabelVisible = xxAgenda.IsLabelVisible;
		agenda.txMaxAppSelect = xxAgenda.MaxAppSelect; 
		agenda.txArea = xxAgenda.Aera;
        agenda.txLanguage = xxAgenda.language;
		agenda.txDateFormat = xxAgenda.dateFormat;
		agenda.txTimeFormat = xxAgenda.timeFormat;	
		xxAgenda.agenda = agenda;	
		agenda.txSelectLabelFormat = xxAgenda.selectLabelFormat;
		agenda.Show();
	},
	ShowPopUp : function()
	{
		if (xxAgenda.Obj)
		{
			try {$Del(xxAgenda.Obj);} catch (e) { ; }
			xxAgenda.Obj = null;
		} 
		var cover = document.createElement("DIV");
		cover.className = "xxAgd_Cover";
		cover.style.height = window.document.body.clientHeight;
		cover.style.width = window.document.body.clientWidth;
		
		var main = document.createElement("DIV");
		xxAgenda.Obj = cover;
		main.className = "xx_ParentContainer";
		main.style.position = "absolute";
		agenda = new NixxisAgenda(main);
		agenda.txName = "xxAgenda"
		agenda.txNixxisContactLink = NixxisContactLink;
		agenda.DateTimeSelected = xxAgenda.Confirmed;
		agenda.txIsConfirmBtnVisible = xxAgenda.IsConfirmBtnVisible;
		agenda.txIsCancelBtnVisible = xxAgenda.IsCancelBtnVisible;
		agenda.txIsNavBtnVisible = xxAgenda.IsNavBtnVisible;
		agenda.txIsLabelVisible = xxAgenda.IsLabelVisible;
		agenda.txMaxAppSelect = xxAgenda.MaxAppSelect; 		
		agenda.txLanguage = xxAgenda.language;
		agenda.txSelectLabelFormat = xxAgenda.selectLabelFormat;
		xxAgenda.agenda = agenda;
		agenda.Show();
		//TO DO Resize the object
		//var obj = agenda.txParent.lastChild;
		//window.resizeTo(obj.clientWidth, obj.clientHeight + 20);
		cover.appendChild(main);
		document.body.appendChild(cover);
		
		main.style.left = (window.document.body.clientWidth - main.clientWidth) / 2;
		main.style.top = (window.document.body.clientHeight - main.clientHeight) / 2;
	},
	Confirmed : function (date, fmtDate, fmtTime)
	{
		//debugger;
		if (xxAgenda.agdDateTime == 0) 
		{
			window.alert('Please select a time !');
			event.returnValue = false;
			return false;
       	}
		if(xxAgenda.CancelBeforeAdd) xxAgenda.Cancel(xxAgenda.xxCancelAppId);
		
		var dte = new Date(parseInt(date));
		var desc = xxAgenda.Description;
		if (desc != "") desc += "\\";
		 
		var b = NixxisContactLink.Agenda.storeAppointmentByContact(dte.getTime(), 0,  desc, agenda.txArea);
		
		if (!b) 
		{
			alert("Please select an other date.");
		}
		else
		{
			//debugger;
			xxAgenda.xxCancelAppId = NixxisContactLink.Agenda.AppId;
			var appInfo = {
				FormatDate : fmtDate,
				FormatTime : fmtTime,
				AppId : NixxisContactLink.Agenda.AppDate,
				AppDateMs : NixxisContactLink.Agenda.AppDateMs,
				AppDate : NixxisContactLink.Agenda.AppDate,
				AppMember : NixxisContactLink.Agenda.AppMember,
				AppMemberDescription : typeof NixxisContactLink.Agenda.AppMemberDescription != 'undefined'? NixxisContactLink.Agenda.AppMemberDescription : null,
				AppAreaDescription : typeof NixxisContactLink.Agenda.AppAreaDescription != 'undefined'? NixxisContactLink.Agenda.AppAreaDescription : null,
				AppContextDescription : typeof NixxisContactLink.Agenda.AppContextDescription != 'undefined'? NixxisContactLink.Agenda.AppContextDescription : null,
				AppDuration : typeof NixxisContactLink.Agenda.AppDuration != 'undefined'? NixxisContactLink.Agenda.AppDuration : null,
				AppMailbox : typeof NixxisContactLink.Agenda.AppMailbox != 'undefined'? NixxisContactLink.Agenda.AppMailbox : null
			}
			xxAgenda.eventConfirm(NixxisContactLink.Agenda.AppDate, NixxisContactLink.Agenda.AppDateMs, NixxisContactLink.Agenda.AppId, NixxisContactLink.Agenda.AppMember, fmtDate, fmtTime, appInfo);	
		}
		xxAgenda.agenda.refresh();
		
		if (xxAgenda.Obj != null) 
		{
			$Del(xxAgenda.Obj);
			xxAgenda.Obj = null;
		}
	},
	Cancel : function(id)
	{
		if(typeof(id) == 'undefined') return;
		if(id == null) return;
		if(id == '') return;
		
		NixxisContactLink.Agenda.cancelAppointmentById(id);
		xxAgenda.eventCancel(id);
	},
	DateTimeChanged : function (date)
	{
		//debugger;
		xxAgenda.agdDateTime = date;
	}
}

function CheckDateString(date)
{
	var str = date;
	str.toLowerCase()
	
	str = str.replace('augustus','august');
	str = str.replace('september','september');
	
	return str;
}

var txOneSeconde = 1000;
var txOneMinute = 60 * txOneSeconde;
var txOneHour = 60 * txOneMinute;
var txOneDay = 24 * txOneHour;
var txOneWeek = 7 * txOneDay;
var DateObject = 
{
	AddTimeSpan : function(date, timeSpan)
	{
		var time = date.getTime();
		time+=timeSpan;
		return new Date(time);
	},
	SubstractTimeSpan : function(date, timeSpan)
	{
		var time = date.getTime();
		time-=timeSpan;
		return new Date(time);
	},
	ToStringShortDate : function(dte)
	{
		var xxDay = dte.getDate().toString();
		if (xxDay.length == 1) xxDay = '0' + xxDay;
		var xxMonth = (dte.getMonth() + 1).toString();
		if (xxMonth.length == 1) xxMonth = '0' + xxMonth;
		var xxYear = dte.getFullYear().toString();
		
		return xxDay + '/' + xxMonth + '/' + xxYear;
	},
	ToStringShortTime : function(dte)
	{
		var xxHour = dte.getHours().toString();
		if (xxHour.length == 1) xxHour = '0' + xxHour;
		var xxMin = dte.getMinutes().toString();
		if (xxMin.length == 1) xxMin = '0' + xxMin;
		
		return xxHour + ':' + xxMin;	
	},
	ToStringUTCShortDate : function(dte)
	{
		var xxDay = dte.getUTCDate().toString();
		if (xxDay.length == 1) xxDay = '0' + xxDay;
		var xxMonth = (dte.getUTCMonth() + 1).toString();
		if (xxMonth.length == 1) xxMonth = '0' + xxMonth;
		var xxYear = dte.getUTCFullYear().toString();
		
		return xxDay + '/' + xxMonth + '/' + xxYear;
	},
	ToStringUTCShortTime : function(dte)
	{
		var xxHour = dte.getUTCHours().toString();
		if (xxHour.length == 1) xxHour = '0' + xxHour;
		var xxMin = dte.getUTCMinutes().toString();
		if (xxMin.length == 1) xxMin = '0' + xxMin;
		
		return xxHour + ':' + xxMin;	
	}
}
var timeZoneOffset = 60;

//Language
var agendaResource = 
{	
	_fmtDteStr : function(res, format, dte, utcBool)
	{
		var D = dte.getDate().toString();
		if (utcBool) D = dte.getUTCDate().toString();
		var DD = D;
		if(DD.length < 2) DD = "0" + DD;
		
		var W = dte.getDay().toString();
		if (utcBool) W = dte.getUTCDay().toString();		
	   	var M = (dte.getMonth() + 1).toString();
       	if (utcBool) M = (dte.getUTCMonth() + 1).toString();
       	var MM = M;
       	if(MM.length < 2) MM = "0" + MM;

		
		var Y = dte.getYear().toString();
		if (utcBool) Y = dte.getUTCFullYear().toString(); 
		var YY = dte.getFullYear().toString();
		if (utcBool) YY = dte.getUTCFullYear().toString();

		var h = dte.getHours().toString();
		if (utcBool) h = dte.getUTCHours().toString(); 
		var hh = h;
		if(hh.length < 2) hh = "0" + hh;
		
		var m = dte.getMinutes().toString();
		if (utcBool) m = dte.getUTCMinutes().toString();
		var mm = m;
		if(mm.length < 2) mm = "0" + mm;
		
		var s = dte.getSeconds().toString();
		if (utcBool) s = dte.getUTCSeconds().toString();
		var ss = s;
		if(ss.length < 2) ss = "0" + ss;
		
		var rtn = format;
		rtn = rtn.replace('{D}',D);
		rtn = rtn.replace('{DD}',DD);
		rtn = rtn.replace('{W}',W);
		rtn = rtn.replace('{M}',M);
		rtn = rtn.replace('{MM}',MM);
		rtn = rtn.replace('{Y}',Y);
		rtn = rtn.replace('{YY}',YY);
		
		rtn = rtn.replace('{DDDD}',res.day[W]);
		rtn = rtn.replace('{DDD}',res.shortDay[W]);
		rtn = rtn.replace('{MMMM}',res.month[M - 1]);
		rtn = rtn.replace('{MMM}',res.shortMonth[M - 1]);

		
		rtn = rtn.replace('{h}',h);
		rtn = rtn.replace('{hh}',hh);
		rtn = rtn.replace('{m}',m);
		rtn = rtn.replace('{mm}',mm);
		rtn = rtn.replace('{s}',s);
		rtn = rtn.replace('{ss}',ss);
		
		return rtn;
	},
	en : 
	{
		day : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		shortDay : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		month : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		shortMonth : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	},
	nl : 
	{
		day : ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterday"],
		shortDay :["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"],
		month : ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"],
		shortMonth : ["Jan", "Feb", "Maa", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"]
	},
	fr : 
	{
		day : ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
		shortDay : ["Dim", "Lun", "Mar", "Mar", "Jeu", "Ven", "Sam"],
		month : ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
		shortMonth : ["Jan", "Fev", "Mar", "Avr", "Mai", "Juin", "Juil", "Aout", "Sep", "Oct", "Nov", "Dec"]
	},
	formatDateString : function(lang, format, dte, utcBool)
	{
		if (lang == "fr") return agendaResource._fmtDteStr(agendaResource.fr, format, dte, utcBool);
		else if (lang == "nl") return agendaResource._fmtDteStr(agendaResource.nl, format, dte, utcBool);
		else return agendaResource._fmtDteStr(agendaResource.en, format, dte, utcBool);
	}
};


var dayNames_En = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var dayNames_Nl = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterday"];
var dayNames_Fr = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

var xxAgdRenderMan = 
{
	language : 'en',
	dayNames : dayNames_Fr,
	rootFolder : "PlugIn/",
	levelColors : ["#b9d532","#f4ea12","#ffc81d","#f78f1e","#ed1c24"],
	xxCellId : "_xxAgdCellId_",
	Create : function(parent, agenda)
	{
			var mainTbl = document.createElement('table');
			mainTbl.className = "xxAgd_T_Lay_Main";
			mainTbl.cellPadding = "0";
    		mainTbl.cellSpacing = "0";
    
			/*Agenda*/
			var rowAgenda = mainTbl.insertRow(-1);
			var cellAgenda = rowAgenda.insertCell(-1);
			cellAgenda.className="xxAgd_Tr_Lay_Agd";
			
			var disTbl = document.createElement('table');
			disTbl.className = "xxAgd_Agd_T";
			disTbl.cellPadding = "0";
			agenda.txAgendaTable = disTbl;
			xxAgdRenderMan.AddRowHeading(disTbl, agenda);
			xxAgdRenderMan.AddDistribution(disTbl, agenda);
			
			
			/*Navigation*/
			var rowNav = mainTbl.insertRow(-1);
			var cellNav = rowNav.insertCell(-1);
			cellNav.className="xxAgd_Tr_Lay_Nav";
			
			var navTbl = document.createElement('table');
			navTbl.className = "xxAgd_Nav_T";
			navTbl.cellPadding = "0";
			navTbl.cellSpacing = "0";
			xxAgdRenderMan.AddNavigation(navTbl, agenda);
			
			/*Set Data*/
			xxAgdRenderMan.SetRowHeadingInfo(disTbl.rows[0], agenda);
			xxAgdRenderMan.SetDistributionInfo(disTbl, agenda);
			
			cellAgenda.appendChild(disTbl);
			cellNav.appendChild(navTbl);
			parent.appendChild(mainTbl);
	},
	AddRowHeading : function(table, agenda)
	{
		var row, cell;
		row = table.insertRow(-1);
		row.className = 'xxAgd_Agd_Tr_H';
		/*First column*/
		cell = row.insertCell(-1);
		cell.className = 'xxAgd_Agd_Tc_H_Day';
		cell.style.width = "50px";
		cell.innerHTML = "&nbsp;";
		//debugger;
		/*Heading of the days*/
		for (var i = 0; i < agenda.txData.length; i++)
		{
			cell = row.insertCell(-1);
			cell.className = 'xxAgd_Agd_Tc_H_Day';
		}
		/*Fill column*/
		cell = row.insertCell(-1);
		cell.className = 'xxAgd_Agd_Tc_H_Fill';
		cell.innerHTML = "&nbsp;";
	},
	GetTimeZone : function(timestring)
	{
		//debugger;
		var list = timestring.split(',');
		if(list.length > 1)
		{
			return list[1];
		}
		else
		{
			return timeZoneOffset;
		}
		
		return;
	},
	SetRowHeadingInfo : function(row, agenda)
	{
		//debugger;
		var data = agenda.txData;
		var len  = row.cells.length - 1;
		for (var i = 1; i < len; i++)
		{
			var tz = xxAgdRenderMan.GetTimeZone(data[i-1][0]);
			var date = new Date(parseInt(data[i-1][0]) + (txOneMinute * xxAgdRenderMan.GetTimeZone(data[i-1][0])));
			row.cells[i].innerHTML = xxAgdRenderMan.dayNames[date.getUTCDay()] + "<br/>" + date.getUTCDate() + "/" + (date.getUTCMonth()+1);
		}
		var Firstdate = (new Date(parseInt(data[0][0])  + (txOneMinute * xxAgdRenderMan.GetTimeZone(data[0][0]))));
		var Lastdate = new Date(parseInt(data[len - 2][0])  + (txOneMinute * xxAgdRenderMan.GetTimeZone(data[len - 2][0])));
		agenda.setWeekInfo(Firstdate.getUTCDate() + "/" + (Firstdate.getUTCMonth()+1) + " - " + Lastdate.getUTCDate() + "/" + (Lastdate.getUTCMonth()+1));
	},
	AddDistribution : function(table, agenda)
	{
		var data = agenda.txData; 
		var row, cell;
		var lenj = data.length;
		var len = data[0].length - 1;
		var count = 0; 
		for (var i = 1; i <= len; i++)
		{
			row = table.insertRow(-1);
			row.className = 'xxAgd_Agd_Tr';
			count++;
			cell = row.insertCell(-1);
			cell.id = xxAgdRenderMan.xxCellId + agenda.txName + count;
			cell.className = 'xxAgd_Agd_Tc_H_Time';
			cell.innerHTML = data[0][i].split(',')[0];
			
			for (var j = 0; j < lenj; j++)
			{
				count++;
				var infoLst = data[j][i].split(',');
				cell = row.insertCell(-1);
				cell.id = xxAgdRenderMan.xxCellId + agenda.txName + count;
				cell.className = 'xxAgd_Agd_Tc';
				cell.style.backgroundColor = xxAgdRenderMan.levelColors[infoLst[1]];
				cell.onmouseover = function() 
				{ 
					addElementClass(table.rows[0].cells[this.cellIndex], 'HighLightDay');
					addElementClass(this.parentNode.cells[0], 'HighLightTime');
				};
                cell.onmouseout = function() 
				{ 
					removeElementClass(table.rows[0].cells[this.cellIndex], 'HighLightDay'); 
					removeElementClass(this.parentNode.cells[0], 'HighLightTime');					
				}; 
				   
				if (infoLst[2] == 1)
					addElementClass(cell, "Agd1");
				/*else if (data[j][i].split(',')[1] > 3) 
					addElementClass(cell, "Agd1");*/
				else if (infoLst[2] == 2)
					addElementClass(cell, "Agd2");
				
				var text = document.createElement('DIV');
				text.className = "xxAgd_Agd_Comment";
				text.innerHTML = "&nbsp;";	
				cell.appendChild(text);	
			}
			cell = row.insertCell(-1);
			cell.className = 'xxAgd_Agd_Tc_H_Fill';
			cell.innerHTML = "&nbsp;";			
		}

	},
	SetDistributionInfo : function(table, agenda)
	{
		var data = agenda.txData;
		var cell;
		var lenj = table.rows[1].cells.length - 1;
		var len = table.rows.length; 
		
		var local = new Date();
		var offsetLocal = 0;
		
		for (var i = 1; i < len; i++)
		{
			table.rows[i].cells[0].innerHTML = data[0][i].split(',')[0];
			//debugger;			
			for (var j = 1; j < lenj; j++)
			{
				cell = table.rows[i].cells[j];
				//Clean old info
				removeElementClass(cell, "Agd1"); //Can not select because full or in the past
				removeElementClass(cell, "Agd2"); //Not availeble like vacantion day, weekend
				removeElementClass(cell, "Agd3"); //Selected item
				cell.onclick = new Function ();
				//New Info
				cell.style.backgroundColor = xxAgdRenderMan.levelColors[data[j-1][i].split(',')[1]];
				if (data[j - 1][i].split(',')[2] == 1) 
				{
					if(agenda.txMaxAppSelect)
					{
						if (data[j-1][i].split(',')[1] < 4)
							addElementClass(cell, "Agd1");
						else
						{
							var dte = new Date(parseInt(data[j-1][0]) + (txOneMinute * xxAgdRenderMan.GetTimeZone(data[j-1][0])));
							var t = data[j - 1][i].split(',')[0].split(':');
							dte = DateObject.AddTimeSpan(dte, txOneHour * t[0]);
							dte = DateObject.AddTimeSpan(dte, txOneMinute * t[1]);
							cell.onclick = new Function("agenda.SelectDateTime(" + dte.getTime() + ", '" + cell.id + "', " + xxAgdRenderMan.GetTimeZone(data[j-1][0]) + ");"); 
						}
					}
					else
						addElementClass(cell, "Agd1");
				}
				else if (data[j - 1][i].split(',')[2] == 0) 
				{
					var dte = new Date(parseInt(data[j-1][0])+ (txOneMinute * xxAgdRenderMan.GetTimeZone(data[j-1][0])));
					var t = data[j - 1][i].split(',')[0].split(':');
					dte = DateObject.AddTimeSpan(dte, txOneHour * t[0]);
					dte = DateObject.AddTimeSpan(dte, txOneMinute * t[1]);
					cell.onclick = new Function("agenda.SelectDateTime(" + dte.getTime() + ", '" + cell.id + "', " + xxAgdRenderMan.GetTimeZone(data[j-1][0]) + ");"); 
				}
				else if (data[j - 1][i].split(',')[2] == 2) 
					addElementClass(cell, "Agd2");


				if (data[j-1][i].split(',').length > 3)
				{
					var text = cell.firstChild;
					text.innerHTML = unescape( data[j-1][i].split(',')[3]);
					cell.title = unescape( data[j-1][i].split(',')[3]);
				}
				//var text = cell.firstChild;
				//text.innerHTML = "Zuiou ARFSFDGFFD GEZQTRFQSFDESFEZAFDDSQDDSQFQfdsqfsqdfsqfqsdfqskfqlkfjqksmlfjqsm36345432652352235325324432543252435235";
				//cell.title = "Zuoiu ARFSFDGFFD GEZQTRFQSFDESFEZAFDDSQDDSQFQfdsqfsqdfsqfqsdfqskfqlkfjqksmlfjqsm36345432652352235325324432543252435235";
				//else u
				//	cell.innerHTML = "&nbsp;";
			}
		}
	},
	AddNavigation : function(table, agenda)
	{
		var row, cell, key;
		row = table.insertRow(-1);
		row.className = '';
		/*Previous month cell*/
		cell = row.insertCell(-1);
		cell.className = "xxAgd_Nav_Tc_Btn";
		key = "PreviousMonth";
		if(agenda.txIsNavBtnVisible)
			xxAgdRenderMan.CreateButton(key, agenda.previousMonth, cell)
		/*Previous week cell*/
		cell = row.insertCell(-1);
		cell.className = "xxAgd_Nav_Tc_Btn";
		key = "PreviousWeek";
		if(agenda.txIsNavBtnVisible)
			xxAgdRenderMan.CreateButton(key, agenda.previousWeek, cell)
		/*Text*/
		cell = row.insertCell(-1);
		cell.className = "xxAgd_Nav_Tc_Text";
		agenda.txLblWeekInfo = cell;
		agenda.setWeekInfo("");	
		/*Next week cell*/
		cell = row.insertCell(-1);
		cell.className = "xxAgd_Nav_Tc_Btn";
		key = "NextWeek";
		if(agenda.txIsNavBtnVisible)
			xxAgdRenderMan.CreateButton(key, agenda.nextWeek, cell)
		/*Next month cell*/
		cell = row.insertCell(-1);
		cell.className = "xxAgd_Nav_Tc_Btn";
		key = "NextMonth";
		if(agenda.txIsNavBtnVisible)
			xxAgdRenderMan.CreateButton(key, agenda.nextMonth, cell)		
		/*Current week*/
		cell = row.insertCell(-1);
		cell.className = "xxAgd_Nav_Tc_Btn";
		key = "ThisWeek";
		if(agenda.txIsNavBtnVisible)
			xxAgdRenderMan.CreateButton(key, agenda.thisWeek, cell)
		/*Label selected date*/
		cell = row.insertCell(-1)
		cell.className = "xxAgd_Nav_Tc_Label";
		cell.innerHTML = "&nbsp;";
		agenda.txDateSelectLabel = cell;
		/*Fill*/
		cell = row.insertCell(-1);
		cell.className = "xxAgd_Nav_Tc_Fill";
		cell.innerHTML = "&nbsp;";
		/*Confirm date*/
		cell = row.insertCell(-1);
		cell.className = "xxAgd_Nav_Tc_Btn";
		key = "Confirm";
		if(agenda.txIsConfirmBtnVisible)
			xxAgdRenderMan.CreateButton(key, agenda.onDateTimeSelected, cell)
		/*Cancel date*/
		//cell = row.insertCell(-1);
		//cell.className = "xxAgd_Nav_Tc_Btn";
		//key = "Cancel";
		//xxAgdRenderMan.CreateButton(key, agenda.onCancelDateSelection, cell)		
	},
	CreateButton : function(key, button1, parent)
	{
		var button = new toolboxButton("btnAgd_" + key, key, button1
		);
	    button.txAbsolute = false;
	    button.txParent = parent;
	    button.txButtonType = txEnum.BtnType.PictureBtn;
	    
		button.txImage         = new toolboxImage(xxAgdRenderMan.rootFolder + "NixxisAgenda/Img/" + key + ".png" , new toolboxSize(32, 32));
	    button.txImageOver     = new toolboxImage(xxAgdRenderMan.rootFolder + "NixxisAgenda/Img/" + key + "_Hover.png", new toolboxSize(32, 32));
	    button.txImageFocus    = new toolboxImage(xxAgdRenderMan.rootFolder + "NixxisAgenda/Img/" + key + ".png", new toolboxSize(32, 32));
	    button.txImageDisabled = new toolboxImage(xxAgdRenderMan.rootFolder + "NixxisAgenda/Img/" + key + ".png", new toolboxSize(32, 32)); 
		 
	    button.txAlt = key;
	    button.txTitle = key;      
	    button.Show();
	}
}

function NixxisAgenda(parent)
{
	var mySelf = this;
	this.txName = "";
	this.txParent = parent;
	this.txRenderManager = xxAgdRenderMan;
	this.txAgendaTable = null;
	this.txTimeDis = 30;
	this.txCurrentWeek = new Date();
	var _now = new Date();
	var _weekDay = _now.getDay();
	if (_weekDay == 0) this.txCurrentWeek = DateObject.SubstractTimeSpan(_now, txOneDay * 7); 
	else if (_weekDay > 1) this.txCurrentWeek = DateObject.SubstractTimeSpan(_now, txOneDay * (_weekDay - 1));
	
	this.txWeek = this.txCurrentWeek;
	this.txData = null;
	this.txLblWeekInfo = "";
	this.txNixxisContactLink = null;
	this.txDateSelectLabel = null
	
	this.DateTimeSelectionChange = new Function();
	this.DateTimeSelected = new Function();
	this.txIsConfirmBtnVisible = true;
	this.txIsCancelBtnVisible = false;
	this.txIsNavBtnVisible = true;
	this.txIsLabelVisible = true;
	this.txMaxAppSelect = false; 
	this.txArea = '';
	this.txRowHeight = '10px';
	this.txSelectedId = null;
	this.txLanguage = 'en';
	this.txSelectLabelFormat = "{DDD}, {D} {MMM} {Y} {hh}:{mm}";
	this.txDateFormat = "{DD}/{MM}/{YY}";
	this.txTimeFormat = "{hh}:{mm}";
	this.frmDate = "";
	this.frmTime = "";
	
	this.Show = function()
	{
		//Draw item
		this.txData = this.getWeekData(this.txCurrentWeek); 
		if (typeof(mySelf.txData) == 'undefined') 
		{
			this.txParent.innerHTML = "No agenda data found for this campaign!"
			return;
		}
		this.txRenderManager.Create(this.txParent, this);
	};
	this.getWeekData = function(date)
	{
		//debugger;
		//alert(mySelf.txArea)
		var data = NixxisContactLink.Agenda.getAgendaByContact(date.getTime(), mySelf.txArea);
		var lines = data.split('\r\n');
		var len = lines.length;
		if (len < 2) 
		{
			//alert("No agenda data found for this campaign!");
			return;
		}
		var returnValue = new Array();
		for (var i = 0; i < 7; i++)
			returnValue[i] = eval(lines[i]);
		
		return returnValue;
	};
	this.refresh = function()
	{
		mySelf.txSelectedId = null;
		mySelf.txData = mySelf.getWeekData(mySelf.txCurrentWeek);
		if(typeof(mySelf.txData) == 'undefined') return;
		xxAgdRenderMan.SetRowHeadingInfo(mySelf.txAgendaTable.rows[0], mySelf);
		xxAgdRenderMan.SetDistributionInfo(mySelf.txAgendaTable, mySelf);		
	};
	this.nextWeek = function()
	{
		mySelf.txCurrentWeek = DateObject.AddTimeSpan(mySelf.txCurrentWeek, txOneWeek);
		mySelf.refresh();
	};
	
	this.previousWeek = function()
	{
		mySelf.txCurrentWeek = DateObject.SubstractTimeSpan(mySelf.txCurrentWeek, txOneWeek);
		mySelf.refresh();
	};
	this.nextMonth = function()
	{
		mySelf.txCurrentWeek = DateObject.AddTimeSpan(mySelf.txCurrentWeek, txOneWeek * 4);
		mySelf.refresh();
	};
	
	this.previousMonth = function()
	{
		mySelf.txCurrentWeek = DateObject.SubstractTimeSpan(mySelf.txCurrentWeek, txOneWeek * 4);
		mySelf.refresh();
	};
	this.thisWeek = function()
	{
		mySelf.txCurrentWeek = mySelf.txWeek;
		mySelf.refresh();
	};	
	this.SelectDateTime = function (date, id, timezone)
	{
		//debugger;
		var dte = new Date(date);
		if (mySelf.txDateSelectLabel) 
		{
			if (mySelf.txIsLabelVisible) 
			{
				mySelf.txDateSelectLabel.innerHTML = agendaResource.formatDateString(mySelf.txLanguage, mySelf.txSelectLabelFormat, dte, true);
			}
			mySelf.frmTime = agendaResource.formatDateString(mySelf.txLanguage, mySelf.txTimeFormat, dte, true); 
			mySelf.frmDate = agendaResource.formatDateString(mySelf.txLanguage, mySelf.txDateFormat, dte, true);
			dte = DateObject.AddTimeSpan(dte, (txOneMinute * timezone * -1));
			mySelf.txDateSelectLabel.txDateTime = dte.getTime();
		}
		addElementClass(document.getElementById(id), "Agd3");
		if (mySelf.txSelectedId) {
			try {
				removeElementClass(document.getElementById(mySelf.txSelectedId), "Agd3");
			} 
			catch (e) {
				;
			}
		}
		
		mySelf.txSelectedId = id;
		mySelf.DateTimeSelectionChange(dte.getTime(), id, timezone, date, mySelf.frmDate, mySelf.frmTime);
	};
	this.onDateTimeSelected = function ()
	{
		if(!mySelf.txDateSelectLabel.txDateTime)
		{
			alert ("Please select date.")
			return;
		} 
		var date = mySelf.txDateSelectLabel.txDateTime;	
		mySelf.DateTimeSelected(date, mySelf.frmDate, mySelf.frmTime);
	};
	this.onCancelDateSelection = function()
	{
		
	}
	this.setWeekInfo = function(text)
	{
		if (this.txIsNavBtnVisible)
			this.txLblWeekInfo.innerHTML = text;
	};
}
