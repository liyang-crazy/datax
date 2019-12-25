$(function () {
    layui.use(['laypage','layer','laydate','form','laytpl'],function () {
        var laydate = layui.laydate;
        var laypage = layui.laypage;
        var layer = layui.layer;
        var laytpl = layui.laytpl;
        var form = layui.form;
        var parms = {
            name:'',
            phone:'',
            address:'',
            dengji:''
        };
        var data_temp = {};//用于存储原始数据
        var firstFlg = true;//用于判断是否是初始化进入页面


        /*判断是否有登录，如果没有直接跳转到登录页面*/
        var sessionFlg = function () {
            if(!document.referrer){
                window.location.href = 'login.html';
            }
        };
        sessionFlg();

        /*初始化数据的方法*/
        var init = function (page,flg) {
            $.ajax({
                type:'post',
                url:'/user/queryAllUser',
                data:{},
                success:function(res){
                    if(res.code == 100){
                        var data = res.data.list;
                        data_temp = data;
                        /*分页操作*/
                        if(flg){
                            /*分页操作*/
                            laypage.render({
                                elem: 'page',
                                count: data.length,
                                limit:10,
                                theme: '#0ee877',
                                jump:function (obj,first) {
                                    var thisData = data.concat().splice(obj.curr*obj.limit - obj.limit, obj.limit);
                                    /*页面数据采用layui的模板引擎加载数据*/
                                    var getTpl = demo.innerHTML,
                                        view = document.getElementById('view');
                                    laytpl(getTpl).render(thisData, function(html){
                                        view.innerHTML = html;
                                    });
                                }
                            });
                        }
                    }else{
                        layer.alert("查询失败！");
                    }
                },
                error:function () {
                    layer.alert("请求错误！")
                }
            })
        };

        init(1,true);



        /*查询方法*/
        var queryUserFun = function () {
            /*获取参数*/
            parms.name = $.trim($('.name-ipt').val());
            init(1,true,parms);
        };
        $('.btn-cx').on('click',function () {
            queryUserFun();
        });
        /*新增方法*/
        $('.btn-add').on('click',function () {
            layer.open({
                type: 2
                ,title: '新增用户'
                ,area: ['45%', '60%']
                ,shade: 0.3
                ,maxmin: true
                ,content: 'addUser.html?way=1'
                ,btn: ['确定', '取消']
                ,yes: function(id,layero){
                    /*首先获取页面上的参数*/
                    var body = layer.getChildFrame('body', id);
                    parms.name = body.find('.add-user').find('.name').val();
                    parms.phone = body.find('.add-user').find('.phone').val();
                    parms.address = body.find('.add-user').find('.address').val();
                    parms.dengji = body.find('.add-user').find('.dengji').val();
                    /*发送请求*/
                    $.ajax({
                        type:'post',
                        url:'/user/addUser',
                        data:{
                            name:parms.name,
                            phone:parms.phone,
                            address:parms.address,
                            dengji:parms.dengji
                        },
                        success:function(res){
                            if(res.code == 100){
                                layer.msg("新增成功！");
                                queryUserFun();
                            }else{
                                layer.alert("新增失败！");
                            }
                        },
                        error:function () {
                            layer.alert("请求错误！")
                        }
                    });

                    //最后关闭弹出层
                    layer.close(id);
                }
                ,btn2: function(){
                    layer.closeAll();
                }
            });
        });

        /*编辑方法*/
        $('#view').on('click','.edit',function (e) {
            /*首先把原始数据渲染到编辑的页面，然后在直接弹出编辑页面*/
            var user_id = $(this).attr('data-id');
            var user_data_temp = {};//用户存储该行用户信息
            $.each(data_temp,function (index,el) {
               if(el.id == user_id){
                    user_data_temp = data_temp[index];
               }
            });
            layer.open({
                type: 2
                ,title: '编辑用户'
                ,area: ['45%', '60%']
                ,shade: 0.3
                ,maxmin: true
                ,content: 'addUser.html?name='+user_data_temp.name+'&phone='+user_data_temp.phone+'&address='+user_data_temp.address+'&dengji='+user_data_temp.dengji+'&way=2'
                ,btn: ['确定', '取消']
                ,yes: function(id,layero){
                    /*首先获取页面上的参数*/
                    var body = layer.getChildFrame('body', id);
                    parms.name = body.find('.add-user').find('.name').val();
                    parms.phone = body.find('.add-user').find('.phone').val();
                    parms.address = body.find('.add-user').find('.address').val();
                    parms.dengji = body.find('.add-user').find('.dengji').val();
                    /*发送请求*/
                    $.ajax({
                        type:'post',
                        url:'/user/etidUser',
                        data:{
                            id:user_id,
                            name:parms.name,
                            phone:parms.phone,
                            address:parms.address,
                            dengji:parms.dengji
                        },
                        success:function(res){
                            if(res.code == 100){
                                layer.msg("编辑成功！");
                                queryUserFun();
                            }else{
                                layer.alert("编辑失败！");
                            }
                        },
                        error:function () {
                            layer.alert("请求错误！")
                        }
                    });

                    //最后关闭弹出层
                    layer.close(id);
                }
                ,btn2: function(){
                    layer.closeAll();
                }
            });
        });
        /*删除用户方法*/
        $('#view').on('click','.delete',function (e) {
            /*获取被删除用户的id*/
            var user_id = $(this).attr('data-id');
            layer.confirm('您确定要删除该用户吗？',{icon: 3, title:'提示'},function (index) {
                $.ajax({
                    type:'post',
                    url:'/user/deleteUser',
                    data:{
                        id:user_id
                    },
                    success:function(res){
                        if(res.code == 100){
                            layer.msg("删除成功！");
                            queryUserFun();
                        }else{
                            layer.alert(res.msg);
                        }
                    },
                    error:function () {
                        layer.alert("请求错误！")
                    }
                });
            });
        });
    });
});