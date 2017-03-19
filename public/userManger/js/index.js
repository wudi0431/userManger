$('#add-form').on('submit', function (e) {
    e.preventDefault();
    var data = new FormData(this);
    $.ajax({
        method: "POST",
        url: "/userManger/addUser",
        contentType: false,
        processData: false,
        data: data
    }).done(function (msg) {
        if (msg.success) {
            window.location.reload();
        } else {
            alert(msg.model.error);
        }

    }).fail(function (msg) {
        alert(msg);
    });
});

var tpl = '<ul id="J_projectList"></ul>';
var projectTpl = '<li><a target="_blank" href="http://yzued.111.com.cn/wx/index.html?projectId=%_id%">%name%</a></li>';


$('.W_uxContent').on('click', '.J_user', function () {
    var $userInfo = $(this);
    var userId = $userInfo.data('uid');
    var userName = $userInfo.html();
    if ($('#J_projectList').length > 0) {
        $('#J_projectList').remove();
    }
    $userInfo.after(tpl);
    $.getJSON('http://yzued.111.com.cn/wxms/getProjectList/jsonp?userId=' + userId + '&userName=' + userName + '&callback=?',
        function (data) {
            if (data.success) {
                var html = '';
                var projectList = data.model;
                if (projectList.length > 0) {

                    projectList.forEach(function (o, i) {

                        var t = projectTpl.replace(/(%(\w+)%)/g, function ($1, $2, $3) {
                            return o[$3] ? o[$3] : '';
                        });
                        html += t;
                    });

                    $('#J_projectList').html('').html(html);
                }

            }else{
                alert('数据错误');
            }
        });

});