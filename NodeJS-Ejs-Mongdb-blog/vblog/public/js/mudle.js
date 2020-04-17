var flag = true;
var btn = document.getElementsByClassName("dropdownMenu_btn") || [];
var list = document.getElementsByClassName("menulist");
for (let i = 0; i < btn.length; i++) {
    if (list) {
        btn[i].onclick = function () {
            if (flag) {
                list[i].style.display = "block";
                flag = false;
            } else {
                list[i].style.display = "none";
                flag = true;
            }
        }
    }
}
//回到顶部
window.onscroll = function () {
    var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
    var totopbtn = document.getElementById("totopbtn");
    totopbtn.style.display = scrolltop >= 300 ? "block" : "none";
    var id;
    totopbtn.onclick = function () {
        id = setInterval(function () {
            var current = document.documentElement.scrollTop || document.body.scrollTop;
            if (current === 0) {
                clearInterval(id);
            }
            document.documentElement.scrollTop = current - 100
            document.body.scrollTop = current - 100;
        }, 16)
    }
}