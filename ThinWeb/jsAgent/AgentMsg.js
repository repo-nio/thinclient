// JScript File
//MsgType:
//R    Request
//S    Send (answer to request)
//I    Sending of info
//C    Command (no answer is requird)
//First message is contactId R-GCID response S-ContactId={GUID}
//All message then should have the next layout: {MsgType}-{property}[={value}]

//Message = 
var ScriptLink = 
{
    lastMsg : "",
    DefaultLocation : null ,
    Init : function()
    {
        //ScriptLink.DefaultLocation
    }
    SendMessage : function(frameId, msg)
    {
        var iwin;
        if(navigator.userAgent.indexOf("Safari") != -1){
            iwin = frames[frameId];
        }else{
            iwin = $(frameId).contentWindow;
        }
        iwin.location = iwin.location.substring(0, iwin.location.indexOf('#')) + "#" + msg;
        //iwin.location = "http://zelto.com/ScriptApp/SampleScript.htm#uiForAgentMessage_" + (new Date()).getTime();	    
    },
    checkForMessages : function()
    {
        if(location.hash != ScriptLink.lastMsg){
            ScriptLink.lastMsg = location.hash;
            console.log("Message Agent: " + ScriptLink.lastMsg);
        }
    },
    //
    //Receving
    //
    ProcessMsg : function(msg)
    {
        if(!msg) return;
        
        if (msg.indexOf("=") > -1)
        {
        
        }
        else
        {
            if (msg.indexOf("-") > -1)
            {
                var _MsgType = msg.substring(0, msg.indexOf("-"));
                if (_MsgType == "R")
                {
                    var _Property = msg.substring(msg.lastIndexOf('='));
                    if (_Property == "UserName")
                    {
                        SendInfoMsg(nixxisInfo.UserName, "S");
                    }
                    if (_Property == "UserId")
                    {
                        SendInfoMsg(nixxisInfo.UserId, "S");
                    }
                }
            }
        }
    },
    
    //
    //Sending
    //
    SendInfoMsg : function(nixxisInfo, type)
    {
        var _Type = typeof type != 'undefined' : type ? 'I';
        
        ScriptLink.SendMessage('Application', _Type + "-" + GetInfoMsg(nixxisInfo));
    },
    GetInfoMsg : function(nixxisInfo)
    {
        switch(nixxisInfo)
        {
            case NixxisInfo.UserName:
                return "UserName = " + window.UserName;
            case NixxisInfo.UserId:
                return "UserId = " + window.UserId;
            default:
                break;
        }
    }
}

var NixxisInfo = 
{
    UserName    : 1,
    UserId      : 2
};