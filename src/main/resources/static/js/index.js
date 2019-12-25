$(function () {
    layui.use(['element','table','laypage','layer','laydate','form','laytpl'],function () {
        var element = layui.element;
        var table = layui.table;
        var laydate = layui.laydate;
        var laypage = layui.laypage;
        var layer = layui.layer;
        var laytpl = layui.laytpl;
        var form = layui.form;

        /*选择导航栏进行切换内容区域*/
        window.checkData = function (fl,url) {
            $('#con-url').attr('src',url);
        }


    })
});