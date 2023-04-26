function expandCollapseSearchModeAccord()
{
    // debugger;
    const wrap = document.querySelectorAll('.accordionModal .accord-detail');  

    for(var i = 0; i < wrap.length; i++)
    {
        var e = wrap[i];
        e.style.display = 'none';
        removeElementClass(e, 'active');
    }

    var wrap2 = document.querySelectorAll('.accordionModal .acclink');  
    wrap2.forEach(e => {
        // e.ondblclick = accSearchModelink_OnClick;
        e.onclick = accSearchModelink_OnClick;
        removeElementClass(e, 'active');
    });
};

function accSearchModelink_OnClick(sender)
{
    // debugger;
    var element = sender.currentTarget;
    if (element.classList.contains('active')) 
    {
        removeElementClass(element, 'active');
        element.nextElementSibling.style.display = 'none';
    } 
    else 
    {
        var wrap = element.querySelectorAll('.accordionModal .acclink');
        for(var i = 0; i < wrap.length; i++)
        {
            removeElementClass(wrap[i], 'active');
        }
        
        addElementClass(element,'active');

        wrap = element.querySelectorAll('.accordionModal .accord-detail');
        for(var i = 0; i < wrap.length; i++)
        {
            wrap[i].style.display = 'none';
        }	   
        element.nextElementSibling.style.display = 'block';
    }
    return false;
}


function expandCollapseDispositionAccord()
{
    // debugger;
    const wrap = document.querySelectorAll('.accordionDisposition .accord-detail');  

    for(var i = 0; i < wrap.length; i++)
    {
        var e = wrap[i];
        e.style.display = 'none';
        removeElementClass(e, 'active');
    }

    var wrap2 = document.querySelectorAll('.accordionDisposition .acclink');  
    wrap2.forEach(e => 
    {
        if(e.classList.contains('acclink')) e.onclick = accDispositionlink_OnClick;
        removeElementClass(e, 'active');
    });
};


function accDispositionlink_OnClick(sender)
{
    // debugger;
    var element = sender.currentTarget;
    if (element.classList.contains('active')) 
    {
        removeElementClass(element, 'active');
        element.nextElementSibling.style.display = 'none';
    } 
    else 
    {
        var wrap = element.querySelectorAll('.accordionDisposition .acclink');
        for(var i = 0; i < wrap.length; i++)
        {
            removeElementClass(wrap[i], 'active');
        }
        
        addElementClass(element,'active');

        wrap = element.querySelectorAll('.accordionDisposition .accord-detail');
        for(var i = 0; i < wrap.length; i++)
        {
            wrap[i].style.display = 'none';
        }	   
        element.nextElementSibling.style.display = 'block';
    }

    if($("QualificationPanel")) $("QualificationPanel").style.display = 'none';
    if($("modalSelectqualworkspace")) $("modalSelectqualworkspace").style.width = '100%';
    if($("QualificationPanel")) $('QualificationPanel').innerHTML = '';
    return false;
}


function SetAgentStatusViewContextOptions()
{
    const div = document.getElementById("bottom-right");

    if(div)
    {
        div.addEventListener("contextmenu", function(e) 
        {
            const rcm = document.getElementById("rightClickContextMenu");
    
            if(rcm.className == "show") rcm.className = "hide";
            else rcm.className = "show";
    
            rcm.style.left = leftX(event) + 'px';
            rcm.style.top = topY(event) + 'px';
    
            e.preventDefault();
        });
    }

    document.body.addEventListener("click", function(e) 
    {
        const rcm = document.getElementById("rightClickContextMenu");
        if(rcm.className == "show") rcm.className = "hide";
    });

    $('backdrop').addEventListener("click",function (e) 
    {
        // debugger;
        const rcm = document.getElementById("rightClickContextMenu");
        if(rcm.className == "show") rcm.className = "hide";

        HideManualDialHistoryDivWhenClickAnywhere();
    });
    

    const rightClickContextMenu = document.getElementById("rightClickContextMenu");
    if(rightClickContextMenu) rightClickContextMenu.addEventListener("contextmenu", (e) => { e.preventDefault()});

    var allviewButtons = $('rightClickContextMenu').getElementsByTagName('button');
		
	if(allviewButtons != null)
	{			
		for(var i = 0; i < allviewButtons.length; i++)
		{
			var child = allviewButtons[i];
            child.onclick = AgentViewOptions_OnClick;
		}
	}
}

function AgentViewOptions_OnClick(sender)
{
    SetViewOptionStatusForButtons(sender.currentTarget);
}

function SetViewOptionStatusForButtons(btn)
{
    var allviewButtons = $('rightClickContextMenu').getElementsByTagName('button');
		
	if(allviewButtons != null)
	{			
		for(var i = 0; i < allviewButtons.length; i++)
		{
			var child = allviewButtons[i];
			removeElementClass(child, 'active');
		}
	}

    if(btn.id == 'btnAgentViewOptionStatus') 
    {
        $('divWarningView').style.display = 'none';
        $('divAgentStatus').style.display = '';
    }
    else 
    {
        $('divWarningView').style.display = '';
        $('divAgentStatus').style.display = 'none';
    }

    addElementClass(btn, 'active');
}

function leftX(evt) 
{
    var xVal = 0;
    if (evt.pageX) xVal =  evt.pageX;
    else if (evt.clientX) 
    {
        xVal = evt.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
    }

    var docMaxWidth = document.documentElement.clientWidth;
    var rightclickDivWidth = document.getElementById("rightClickContextMenu").clientWidth;

    if((xVal + rightclickDivWidth) > docMaxWidth)  xVal = docMaxWidth -  rightclickDivWidth - 10;

    return xVal;
}

function topY(evt) 
{
    var yVal = 0;

    if (evt.pageY) yVal = evt.pageY;
    else if (evt.clientY) 
    {
        yVal = evt.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
    }

    var docMaxHeight = document.documentElement.clientHeight;
    var rightclickDivHeigth = document.getElementById("rightClickContextMenu").clientHeight;

    if((yVal + rightclickDivHeigth) > docMaxHeight)  yVal = docMaxHeight -  rightclickDivHeigth - 20;

    return yVal;
}

function HideManualDialHistoryDivWhenClickAnywhere()
{
    if($('dial-pad').className?.includes('active'))
    {
        if($('manualDialHistoryListDiv').style.display != "none")
        {
            $('manualDialHistoryListDiv').style.display = "none";
            $('manualDialHistoryListUL').innerHTML = '';
            $('MCNum').focus();
        }
    }
}