const MonthInYear = ["January",
                         "February",
                         "March",
                         "April",
                         "May",
                         "June",
                         "July",
                         "August",
                         "September",
                         "October",
                         "November",
                         "December"];

const DAYS_IN_WEEK = 7;
const HOURS_IN_DAY = 24;
var selectedDate = null;

function $(element)
{
    if (typeof element == 'string') { element = document.getElementById(element);}
    return element;
}

function LoadDateTimeInstance()
{
    DisplayTimeOptions();

    // debugger;

    selectedDate = new Date();
    setMonthNameYear();

    const myCurrentDate = new Date(selectedDate);
    DisplayDateNo(myCurrentDate);
    $('dateBox'+ 1).className = 'dateBox active';
    ShowTodaysDateCircled();

    var days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    for(i = 0; i < DAYS_IN_WEEK; i++)
    {
        debugger;
        let myNextDateToSet = myCurrentDate;
        if(i != 0) myNextDateToSet = new Date(myCurrentDate.setDate(myCurrentDate.getDate() + 1));
        $("Day" + (i+1)).innerHTML = days[myNextDateToSet.getDay()];

        $("dateBox" + (i+1) ).onclick = onDateClicked;
    }
}

function setMonthNameYear()
{
    if(selectedDate == null) return;

    const myElement = $("MonthName");
    myElement.innerHTML = MonthInYear[selectedDate.getMonth()] + ' ' + selectedDate.getFullYear();
}

function DisplayDateNo(dateToSet)
{
    // debugger;
    let dateReceived = new Date(dateToSet);
    
    let i = 1;
    $("Day" + i +'Date').innerHTML = dateReceived.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    $("dateBox" + i).AssignedDate = new Date(dateReceived);
    
    for(i = 1; i < DAYS_IN_WEEK; i++)
    {
        let myNextDateToSet =  new Date(dateReceived.setDate(dateReceived.getDate() + 1));
        $("Day" + (i + 1) +'Date').innerHTML = myNextDateToSet.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
        $("dateBox" + (i + 1)).AssignedDate =  new Date(myNextDateToSet);
    }
}

function DisplayTimeOptions()
{
    var timeParent = $('TimeOptions');
    timeParent.innerHTML = '';

    for(i = 0; i < HOURS_IN_DAY; i++)
    {
        let hour = (i).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        let ulTime;

        ulTime = document.createElement("li");
        ulTime.innerHTML = hour + ':00';
        ulTime.onclick = onTimeClicked;
        timeParent.appendChild(ulTime);

        ulTime = document.createElement("li");
        ulTime.innerHTML = hour + ':15';
        ulTime.onclick = onTimeClicked;
        timeParent.appendChild(ulTime);

        ulTime = document.createElement("li");
        ulTime.innerHTML = hour + ':30';
        ulTime.onclick = onTimeClicked;
        timeParent.appendChild(ulTime);

        ulTime = document.createElement("li");
        ulTime.innerHTML = hour + ':45';
        ulTime.onclick = onTimeClicked;
        timeParent.appendChild(ulTime);
    }
}

function getNextWeek()
{
    if(selectedDate == null) selectedDate = new Date();
    selectedDate = new Date(selectedDate.setDate(selectedDate.getDate() + DAYS_IN_WEEK));

    const currentFirstDate = $("dateBox" + (1)).AssignedDate;
    var nextWeekFirstDate = new Date(currentFirstDate.setDate(currentFirstDate.getDate() + DAYS_IN_WEEK));
    setMonthNameYear();    
    DisplayDateNo(nextWeekFirstDate);
    ShowTodaysDateCircled();
}    

function getPreviousWeek()
{
    if(selectedDate == null) selectedDate = new Date();
    selectedDate = new Date(selectedDate.setDate(selectedDate.getDate() - DAYS_IN_WEEK));

    const currentFirstDate = $("dateBox" + (1)).AssignedDate;
    var previousWeekDate = new Date(currentFirstDate.setDate(currentFirstDate.getDate() - DAYS_IN_WEEK));
    setMonthNameYear();
    DisplayDateNo(previousWeekDate);
    ShowTodaysDateCircled();
}

function onDateClicked(sender)
{
    // debugger;
    selectedDate = new Date(sender.currentTarget.AssignedDate);

    setMonthNameYear();

    for(i = 0; i < DAYS_IN_WEEK; i++)
    {           
        $("dateBox" + (i + 1)).className = 'dateBox';
    }

    sender.currentTarget.className = 'dateBox active';
    ShowTodaysDateCircled();
}

function ShowTodaysDateCircled()
{
    // debugger;

    for(i = 1; i <= DAYS_IN_WEEK; i++)
    {
        var datecontrol  = $("dateBox" + i);
        if(datecontrol.AssignedDate.withoutTime() == new Date().withoutTime())
        {
            if(datecontrol.className?.includes('active')) addElementClass(datecontrol , 'todaysDateActive');
            else addElementClass(datecontrol , 'todaysDate');
        }
        else 
        {
            removeElementClass(datecontrol , 'todaysDateActive');
            removeElementClass(datecontrol , 'todaysDate');
        }
    }
}

Date.prototype.withoutTime = function () {
    var d = new Date(this);
    d.setHours(0, 0, 0, 0);
    return d.toISOString();
}

function onTimeClicked(sender)
{
    var element = $('TimeOptions');
    for(var child = element.firstChild; child !== null; child = child.nextSibling) 
    {
        child.className = '';
    }
    
    // debugger;
    sender.currentTarget.className = 'active';

    let hourMins = sender.currentTarget.innerText.split(":");
    selectedDate.setHours(hourMins[0]);
    selectedDate.setMinutes(hourMins[1]);
    selectedDate.setSeconds(0);
}

function getQualificationSelectedDateInCalendar()
{
    return selectedDate;
}