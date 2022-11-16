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
    for(i = 0; i < DAYS_IN_WEEK; i++)
    {           
        $("dateBox" + (i+1) ).onclick = onDateClicked;
    }

    DisplayTimeOptions();

    // debugger;
    if(selectedDate == null) selectedDate = new Date();

    setMonthNameYear();

    let mySundayDate = getSundayFromDate(selectedDate);
    DisplayDateNo(mySundayDate);
    $('dateBox'+ (selectedDate.getDay() + 1)).className = 'dateBox active';
}

function setMonthNameYear()
{
    if(selectedDate == null) return;

    const myElement = $("MonthName");
    myElement.innerHTML = MonthInYear[selectedDate.getMonth()] + ' ' + selectedDate.getFullYear();
}

function getSundayFromDate(myDate)
{
    let dateReceived = new Date(myDate);
    let weekDateNo = dateReceived.getDate();
    let weekDaysToDeductForSunday = dateReceived.getDay();

    let mySunday = new Date(dateReceived.setDate(weekDateNo - weekDaysToDeductForSunday));
    return mySunday;
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
    // debugger;
    if(selectedDate == null) selectedDate = new Date();

    var nextWeekDate = new Date(selectedDate.setDate(selectedDate.getDate() + DAYS_IN_WEEK));
    setMonthNameYear();
    
    var mySunday = getSundayFromDate(nextWeekDate);        
    DisplayDateNo(mySunday);
}    

function getPreviousWeek()
{
    if(selectedDate == null) selectedDate = new Date();

    var nextWeekDate = new Date(selectedDate.setDate(selectedDate.getDate() - DAYS_IN_WEEK));
    setMonthNameYear();

    var mySunday = getSundayFromDate(nextWeekDate);
    DisplayDateNo(mySunday);
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

    let current =  $('dateBox'+ (selectedDate.getDay() + 1));
    current.className = 'dateBox active';
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