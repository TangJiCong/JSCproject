

module.exports = function (now) {
    var time = new Date(now);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var day = time.getDate();
    var months = month > 9 ? moth : "0" + month;
    var days = day > 9 ? day : "0" + day;
    var date = year + "-" + months + "-" + days;
    return date;
}