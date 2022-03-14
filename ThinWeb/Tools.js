
function PurgeElement(element) 
{
    var a = element.attributes;
    var i, l, n;
    
    if(a) 
    {
        l = a.length;
        
        for (i = 0; i < l; i++) 
        {
            n = a[i].name;

            if (typeof element[n] === 'function') 
            {
                d[n] = null;
            }
        }
    }
    
    a = element.childNodes;
    
    if(a)
    {
        l = a.length;
        
        for(i = 0; i < l; i++)
        {
            PurgeElement(a[i]);
        }
    }
}

function MulticastDelegate()
{
    var members = new Array();
    
    this.Add = function(target, method)
                    {
                        for(var i = 0; i < members.length; i++)
                        {
                            if(members[i].target == target && members[i].method == method)
                            {
                                return;
                            }
                        }
                        
                        members.push({'target':target, 'method':method});
                    };

    this.Remove = function(target, method)
                    {
                        for(var i = 0; i < members.length; i++)
                        {
                            if(members[i].target == target && (arguments.length < 2 || members[i].method == method))
                            {
                                var old = members.splice(i, 1);
                                
                                old[0].target = null;
                                old[0].method = null;
                                
                                break;
                            }
                        }
                    };

    this.Clear = function()
                    {
                        for(var i = 0; i < members.length; i++)
                        {
                            members[i].target = null;
                            members[i].method = null;
                        }
                        
                        members = new Array();
                    };
                    
    this.Invoke = function()
                    {
                        for(var i = 0; i < members.length; i++)
                        {
                            try
                            {
                                members[i].method.apply(members[i].target, arguments);
                            }
                            catch(e)
                            {
                                ;
                            }
                        }
                    };
}

