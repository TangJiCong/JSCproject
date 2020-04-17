
function single(name){
    return document.getElementById(name);
}
function all(name){
    return document.getElementsByTagName(name);
}
var user=single("change_margin_1").getElementsByTagName("input")[0],
    password=single("change_margin_2").getElementsByTagName("input")[0],
    email=single("change_margin_3").getElementsByTagName("input")[0],
    p1=single("remind_1"),
    p2=single("remind_2"),
    p3=single("remind_3"),
    w1=single("change_margin_1"),
    w2=single("change_margin_2"),
    w3=single("change_margin_3"),
    form=single("form");


    user.onblur=function(){
        isUser();
    }
    password.onblur=function(){
        isPwd();
    }
    email.onblur=function(){
        isEmail();
    }

function formcheck(){
    form.onsubmit=function(){
        return isUser()&&isPwd();
    }
}
formcheck();
function isUser(){
    var uservalue=user.value;
    var str=/.{4,}/;
    if(str.test(uservalue)){
        p1.innerHTML="";
        return true;
    }else{
        p1.innerHTML="至少由四位字符组成";
        return false;
    }
}
function isPwd(){
    var pwd=password.value;
    var str=/.{6,}/;
    if(str.test(pwd)){
        p2.innerHTML="";
        return true;
    }else{
        p2.innerHTML="至少由六位字符组成";
        return false;
    }
}
function isEmail(){
    var emailvalue=email.value;
    var str=/^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/;
    if(str.test(emailvalue)){
        p3.innerHTML='';
        return true;
    }else{
        p3.innerHTML="你的邮箱格式错误!";
        return false;
    }
}