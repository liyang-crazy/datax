$(function () {
    layui.use(['element','table','laypage','layer','laydate','form','laytpl'],function () {
        var element = layui.element;
        var table = layui.table;
        var laydate = layui.laydate;
        var laypage = layui.laypage;
        var layer = layui.layer;
        var laytpl = layui.laytpl;
        var form = layui.form;

        $('#md5_btn').on('click',function () {
            /*获取原始md5参数*/
            var md5_str = $('#md5_ipt').val();
            /*调用解密方法*/
            md5_fun(md5_str);
        });

        /*定义md5解密的方法*/
        var md5_fun = function (md5Str) {
            $.ajax({
                type:'post',
                dataType: "json",
                url:'getToMD5',
                data:{
                    md5Str:md5Str
                },
                success:function(res){
                    debugger;
                    if(res.code == 200){
                        layer.msg(res.msg);
                    }else {
                        layer.msg(res.msg);
                    }
                },
                error:function () {
                    layer.alert("请求错误！")
                }
            })
        };
    })
});