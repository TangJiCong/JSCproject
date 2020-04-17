
module.exports=function (time){
    var date=new Date(time);
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day=date.getDate();
    var hour=date.getHours();
    var minu=date.getMinutes();
    month=month>9?month:('0'+month);
    day=day>9?day:('0'+day);
    hour=hour>9?hour:('0'+hour);
    minu=minu>9?minu:('0'+minu);
    var result=year+"-"+month+"-"+day+"   "+hour+":"+minu;
    return result;
}