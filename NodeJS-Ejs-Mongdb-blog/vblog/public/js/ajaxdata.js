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
$.ajax({
    //请求方式
    type: "POST",
    //请求地址
    url: "http://10.1.9.89:8080/test",
    //数据，json字符串
    // data : JSON.stringify(list),
    //请求成功
    changeOrigin: true,
    success: function (data) {
        var flag=$("#isLogin").val();
        page({
            id: 'topage',
            nowNum: 1,
            allNum: Math.ceil(data.blogs.length / 6),
            callBack: function (now, all) {
                console.log(now + '---' + all);
                var islogin = '';
                var islogins='';
                var islogin2 = '';
                var alllist = now * 6 > data.blogs.length ? data.blogs.length : now * 6;
                document.getElementById("bloglist").innerHTML = '';
                for (var i = (now - 1) * 6; i < alllist; i++) {
                    if (flag) {
                        islogin = 'href="/like/addlove/' + data.blogs[i]._id + ' " ';
                        islogins='href="/like/addlike/' + data.blogs[i]._id + ' " ';
                        islogin2 = '<div class="markform">\
                    <img src="image/' + flag + '" class="userimg">\
                    <form class="layui-form" action="/postmark" method="POST">\
                        <div class="layui-form-item">\
                            <input type="hidden" name="mark_useid" value="' + data.blogs[i]._id + '">\
                            <textarea name="desc" class="layui-textarea"></textarea>\
                        </div>\
                        <input type="submit" class="input_submit">\
                    </form>\
                </div>';
                    }
                    var str = '<div class="listrow">\
                <h3 class="title">\
                    <a class="list_headimg" href="/blog/showSingleBlog/' + data.blogs[i].blog_userId._id + '">\
                        <img src="image/' + data.blogs[i].blog_userId.head_img + '">\
                    </a>\
                    <span>' + data.blogs[i].blog_userId.username + '</span>\
                </h3>\
                <ul>\
                    <p>' + data.blogs[i].text + '</p>\
                </ul>\
                <figure>\
                    <img src="image/' + data.blogs[i].blog_img + '">\
                </figure>\
                <p class="dateview">\
                    <span>' + data.blogs[i].blog_date + '</span>\
                    <span>\
                        <a class="glyphicon glyphicon-thumbs-up" ' + islogins + '></a>\
                        (' + data.blogs[i].fabulous + ')\
                    </span>\
                    <span>\
                        <a class="glyphicon glyphicon-heart-empty"' + islogin + '></a>\
                        (' + data.blogs[i].like + ')\
                    </span>\
                    <a class="readmore dropdownMenu_btn">查看评论&gt;&gt;</a>\
                </p>\
            </div>';
                    $("#bloglist").append(str);
                    var oDiv = $('<div class="form menulist"></div>').append(islogin2);
                    for (var j = data.blogs[i].blog_markId.length - 1; j >= 0; j--) {
                        var str2 = '<div class="marklist">\
                    <div class="marklist_user">\
                        <img src="image/' + data.blogs[i].blog_markId[j].userId.head_img + '">\
                        <span style="margin-left: 15px;">\
                            ' + data.blogs[i].blog_markId[j].userId.username + '&nbsp;回复\
                        </span>\
                        <span style="position: absolute;right: 0;top: 15px;">\
                            ' + data.blogs[i].blog_markId[j].mark_date + '\
                        </span>\
                    </div>\
                    <p style="margin-left: 65px;">' + data.blogs[i].blog_markId[j].markmess + '</p>\
                </div>';
                        oDiv.append(str2);
                    }
                    $("#bloglist").append(oDiv);
                    dropdown();
                }
            }
        });

        //封装的一个分页方法
        function page(opt) {
            if (!opt.id) {
                return false;
            }
            var obj = document.getElementById(opt.id);
            var nowNum = opt.nowNum || 1;
            var allNum = opt.allNum || 5;
            var callBack = opt.callBack || function () {};
            if (nowNum >= 4 && allNum >= 6) {
                var oA = document.createElement('a');
                oA.href = '#1';
                oA.innerHTML = '首页';
                obj.appendChild(oA);
            }
            if (nowNum >= 2) {
                var oA = document.createElement('a');
                oA.href = '#' + (nowNum - 1);
                oA.innerHTML = '上一页';
                obj.appendChild(oA);
            }
            if (allNum <= 5) {
                for (var i = 1; i <= allNum; i++) {
                    var oA = document.createElement('a');
                    oA.href = '#' + i;
                    if (i == nowNum) {
                        oA.innerHTML = i;
                    } else {
                        oA.innerHTML = '[' + i + ']';
                    }
                    obj.appendChild(oA);
                }
            } else {
                for (var j = 1; j <= 5; j++) {
                    var oA = document.createElement('a');
                    if (nowNum == 1 || nowNum == 2) {
                        oA.href = '#' + j;
                        if (nowNum == j) {
                            oA.innerHTML = j;
                        } else {
                            oA.innerHTML = '[' + j + ']';
                        }
                    } else if ((allNum - nowNum) == 0 || (allNum - nowNum) == 1) {
                        oA.href = '#' + allNum - 5 + j;
                        if ((allNum - nowNum == 0 && j == 5) || (allNum - nowNum == 1 && j == 4)) {
                            oA.innerHTML = allNum - 5 + j;
                        } else {
                            oA.innerHTML = '[' + (allNum - 5 + j) + ']';
                        }
                    } else {
                        oA.href = '#' + (nowNum - 3 + j);
                        if (j == 3) {
                            oA.innerHTML = nowNum - 3 + j;
                        } else {
                            oA.innerHTML = '[' + (nowNum - 3 + j) + ']';
                        }
                    }
                    obj.appendChild(oA);
                }
            }
            if ((allNum - nowNum) >= 1) {
                var oA = document.createElement('a');
                oA.href = '#' + (nowNum + 1);
                oA.innerHTML = '下一页';
                obj.appendChild(oA);
            }
            if (allNum - nowNum >= 3 && allNum >= 6) {
                var oA = document.createElement('a');
                oA.href = "#" + allNum;
                oA.innerHTML = '尾页';
                obj.appendChild(oA);
            }
            callBack(nowNum, allNum);
            var aA = obj.getElementsByTagName('a');
            for (var k = 0; k < aA.length; k++) {
                aA[k].onclick = function () {
                    var nowNum = parseInt(this.getAttribute('href').substring(1));
                    obj.innerHTML = '';
                    page({
                        id: opt.id,
                        nowNum: nowNum,
                        allNum: allNum,
                        callBack: callBack
                    });
                    return false;
                }
            }
        }
        //评论按钮事件
        function dropdown() {
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
        }
    },
    //请求失败，包含具体的错误信息
    error: function (e) {
        console.log(e.status);
        console.log(e.responseText);
    }
});


