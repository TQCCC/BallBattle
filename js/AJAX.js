var AJAX_ERROR = "网络连接或服务器错误";
var HOST_URL = "http://www.betterbetterbetter.cn/ballbattle_server/";

function add_rank(name, level, target) {
    var xmlhttp = null;
    if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
        var xmlhttp=new XMLHttpRequest();
    }else {// code for IE6, IE5
        var xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200){
            if(xmlhttp.responseText != 'false'){
                //success
                get_rank(target);
            }else {
                //error
                AJAX_RESULT = "add_rank error";
                target.text = AJAX_RESULT;
            }
        }

    }
    xmlhttp.onerror=function () {
        target.text = AJAX_ERROR;
    }
    xmlhttp.open("GET",HOST_URL+"includes/add_rank.php?name="+name+"& level="+level,true);
    xmlhttp.send();

}

function get_rank(target) {
    var xmlhttp = null;
    if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
        var xmlhttp=new XMLHttpRequest();
    }else {// code for IE6, IE5
        var xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200){
            if(xmlhttp.responseText != 'false'){
                //success
                AJAX_RESULT = xmlhttp.responseText;
            }else {
                //error
                AJAX_RESULT =  "get_rank error";
            }
            target.text = AJAX_RESULT;
        }

    }
    xmlhttp.onerror=function () {
        target.text = AJAX_ERROR;
    }
    xmlhttp.open("GET",HOST_URL+"includes/get_rank.php?get_rank=all",true);
    xmlhttp.send();
}
