/*
 * File version : build 7
 */
var NixxisDirectLink = 
{
    serviceUrl : "",
    sessionId : "",
	contactId : "",
    linkMode : "image",
	__version : "7",	
    __linkImage : new Array(new Image(), new Image(), new Image(), new Image(), new Image()),
    __linkImageIndex : 0,
    __sequence : (new Date().getTime()),
    __newRequest : new Function((window.XMLHttpRequest) ? 'return new XMLHttpRequest();' : 'return new ActiveXObject("Msxml2.XMLHTTP");'),
    __execute : function(commandCode, parameters) 
                {
                    var data = '', response = null;
                    var hostSep, fullUrl;
                    
                    hostSep = NixxisDirectLink.serviceUrl.indexOf('/', 9);
                    fullUrl = NixxisDirectLink.serviceUrl.substr(0, hostSep) + '/~' + NixxisDirectLink.sessionId + NixxisDirectLink.serviceUrl.substr(hostSep);

                    if(NixxisDirectLink.linkMode == "image")
                    {
                        for(var i = 1; i < arguments.length; i++)
                        {
                            if(arguments[i])
                                data += '&__p' + i.toString() + '=' + escape(arguments[i].toString());
                        }
                        
                        NixxisDirectLink.__linkImage[NixxisDirectLink.__linkImageIndex].src = fullUrl + '?events=no&fmt=uri&action=' + commandCode.toString() + '&inc=' + (++NixxisDirectLink.__sequence).toString() + data;
                        
                        if(++NixxisDirectLink.__linkImageIndex >= NixxisDirectLink.__linkImage.length)
                            NixxisDirectLink.__linkImageIndex = 0;
                    }
                    else
                    {
                        for(var i = 1; i < arguments.length; i++)
                        {
                            if(arguments[i])
                                data += escape(arguments[i].toString()) + '\n';
                        }

                        var link = NixxisDirectLink.__newRequest();
                        
                        for(var retry = 0; retry < 3; retry++)
                        {
                            try
                            {
                                if(NixxisDirectLink.serviceUrl == '')
                                {
                                    var location = document.location.href;
                                    var i, ix = -1;
                                    
                                    for(i = 0; i < 4 && (ix = location.indexOf('/', ++ix)) >= 0; i++);
                                    
                                    if(ix < 0) ix = location.indexOf('?');
                                    if(ix < 0) ix = location.length;
                                    
                                    NixxisDirectLink.serviceUrl = location.substr(0, ix);
                                }
                                
                                link.open('POST', fullUrl + '?events=no&fmt=uri&action=' + commandCode.toString(), false);
                                link.send(data);
                                
                                response = link.responseText;
                                break;
                            }
                            catch(e)
                            {
                                try
                                {
                                    link.abort();
                                }
                                catch(e2)
                                {
                                    ;
                                }
                            }
                        }

                        try
                        {
                            link.abort();
                        }
                        catch(e3)
                        {
                            ;
                        }

                        link = null;
                    }                    

                    return response;
                },
    setQualification : function(qualificationId)
                {
                    if(arguments.length > 1)
                    {
                        NixxisDirectLink.__execute('~setinfo', '1', '*', qualificationId, arguments[1], (arguments.length > 2) ? arguments[2] : "", (arguments.length > 3) ? arguments[3] : "" );
                    }
                    else
                    {
                        NixxisDirectLink.__execute('~setinfo', '1', '*', qualificationId);
                    }
                },
    setInternalId : function(internalId)
                {
                    if(arguments.length > 1)
                    {
                        NixxisDirectLink.__execute('~setinfo', '5', NixxisDirectLink.contactId, "@@ContactListId", internalId);
                    }
                },
    nextContact : function()
                {
					NixxisDirectLink.__execute('10', NixxisDirectLink.contactId);
                },
	startRecording : function()
			    {
					NixxisDirectLink.__execute('19', 'True', NixxisDirectLink.contactId);
			    },
	stopRecording : function()
			    {
					NixxisDirectLink.__execute('19',  'False', NixxisDirectLink.contactId);
			    },
	voiceNewCall : function(destination)
			    {
					NixxisDirectLink.__execute('14',  destination);
			    },
    voiceConference : function()
			    {
					NixxisDirectLink.__execute('18');
			    },
    voiceRetrieve : function()
			    {
					NixxisDirectLink.__execute('12');
			    },
    voiceTransfer : function()
			    {
					NixxisDirectLink.__execute('15');
			    }
};                   
