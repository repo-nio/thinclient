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
        e.ondblclick = accSearchModelink_OnClick;
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
        if(e.classList.contains('acclink')) e.ondblclick = accDispositionlink_OnClick;
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
    return false;
}