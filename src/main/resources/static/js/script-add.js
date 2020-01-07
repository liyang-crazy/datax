$(function () {
    layui.use(['element','table','laypage','layer','laydate','form','laytpl'],function () {
        var element = layui.element;
        var table = layui.table;
        var laydate = layui.laydate;
        var laypage = layui.laypage;
        var layer = layui.layer;
        var laytpl = layui.laytpl;
        var form = layui.form;

        var db_type_arr = ['3','5'];
        var db_type_arr_1 = ['1','2','4'];
        /*接收从父页面传递过来的三个参数*/
        function getSearchString(key) {
            // 获取URL中?之后的字符
            var str = location.search;
            str = str.substring(1,str.length);
            var arr = str.split("&");
            var obj = {};
            // 将每一个数组元素以=分隔并赋给obj对象
            for(var i = 0; i < arr.length; i++) {
                var tmp_arr = arr[i].split("=");
                obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1]);
            }
            return obj[key];
        }
        /*定义获脚本分组数据的方法*/
        var getAllJb_group_fun = function () {
            $.ajax({
                url:'/jbInfo/queryAllJbGroup',
                dataType: 'json',
                type: 'post',
                success: function (res) {
                    $.each(res.data, function (index, item) {
                        $('#jb_group').append(new Option(item.jb_group_name, item.jb_group_id));
                    });
                    layui.form.render("select");//重新渲染 固定写法
                }
            });
        };
        getAllJb_group_fun();

        var data = layui.data('data');
        var data_r = data.data_r;
        var data_w = data.data_w;
        /*给reader数据库信息赋值*/
        /*$('#sc-add-db-url').val(getSearchString('r_db_url'));*/
        if(!$.isEmptyObject(data_r)){
            var r_db_url = '';
            var r_db_url_arr = [];
            if(data_r.length > 0){
                $.each(data_r,function (index,item) {
                    r_db_url_arr.push(item.db_url);
                });
            }
            r_db_url = r_db_url_arr.join('\n');
            if(data_r[0].db_type == 6){
                $('.mongodb').removeClass('layui-hide');
                $('#add_mongodb_address').val(r_db_url);
                $('#add_mongodb_username').val(data_r[0].db_username);
                $('#add_mongodb_pasw').val(data_r[0].db_password);
            }else {
                $('.mysqlAndOracle').removeClass('layui-hide');
                $('#add_contaion').val(r_db_url);
                $('#sc-add-db-username').val(data_r[0].db_username);
                $('#sc-add-db-pasw').val(data_r[0].db_password);
            }

        }
        /*给writer数据库信息赋值*/
        /*$('#w-sc-add-db-url').val(data_w.db_url);*/
        if(!$.isEmptyObject(data_w)){
            if(data_w.db_type == 6){
                $('.w_mongodb').removeClass('layui-hide');
                $('#w_add_mongodb_address').val(data_w.db_url);
                $('#w_add_mongodb_username').val(data_w.db_username);
                $('#w_add_mongodb_pasw').val(data_w.db_password);
            }else {
                $('.w_mysqlAndOracle').removeClass('layui-hide');
                $('#w-sc-add-db-username').val(data_w.db_username);
                $('#w-sc-add-db-pasw').val(data_w.db_password);
                $('#w-add_contaion').val(data_w.db_url);
            }

        }
        if(db_type_arr.indexOf(getSearchString('r_db_type'))>-1){
            if(getSearchString('r_db_type') == 3){//表示reader区域是txtfile
                $('.mysqlAndOracle').addClass('layui-hide');
                $('.txtFile').removeClass('layui-hide');
            }else if(getSearchString('r_db_type') == 5){//表示reader区域是ftp
                $('.mysqlAndOracle').addClass('layui-hide');
                $('.ftp').removeClass('layui-hide');
                /*监听ftp协议，用于控制服务器端口的值*/
                form.on('select(ftp_protocol_filter)', function(data){
                    if(data.value == 'ftp'){
                        $('#add_ftp_port').val('21');
                        $('#add_ftp_cp_all').removeClass('layui-hide');
                    }else if(data.value == 'sftp'){
                        $('#add_ftp_port').val('22');
                        $('#add_ftp_cp_all').addClass('layui-hide');
                    }
                });
            }
        }else if(db_type_arr_1.indexOf(getSearchString('r_db_type'))>-1){//表示reader区域是mysql或者oracle
            $('.mysqlAndOracle').removeClass('layui-hide');
            $('.txtFile').addClass('layui-hide');
            if(getSearchString('jb_tbgs') == 1){
                $('#sc-add-sql').addClass('layui-hide');
                $('#sc-add-col').removeClass('layui-hide');
                $('#sc-add-tab').removeClass('layui-hide');
                //$('#sc-add-split').removeClass('layui-hide');
            }
            if(getSearchString('jb_tbgs') == 2){
                $('#sc-add-sql').removeClass('layui-hide');
                $('#sc-add-col').addClass('layui-hide');
                $('#sc-add-tab').addClass('layui-hide');
                //$('#sc-add-split').addClass('layui-hide');
            }
        }
        if(db_type_arr.indexOf(getSearchString('w_db_type'))>-1){//表示writer区域是txtfile
            if(getSearchString('w_db_type') == 3){
                $('.w_mysqlAndOracle').addClass('layui-hide');
                $('.w_txtFile').removeClass('layui-hide');
            }else if(getSearchString('w_db_type') == 5){
                $('.w_mysqlAndOracle').addClass('layui-hide');
                $('.w_ftp').removeClass('layui-hide');
                /*监听ftp协议，用于控制服务器端口的值*/
                form.on('select(w_ftp_protocol_filter)', function(data){
                    if(data.value == 'ftp'){
                        $('#w_add_ftp_port').val('21');
                        $('#w_add_ftp_cp_all').removeClass('layui-hide');
                    }else if(data.value == 'sftp'){
                        $('#w_add_ftp_port').val('22');
                        $('#w_add_ftp_cp_all').addClass('layui-hide');
                    }
                });
            }
        }else if(db_type_arr_1.indexOf(getSearchString('w_db_type'))>-1){//表示writer区域是mysql或者oracle
            $('.w_mysqlAndOracle').removeClass('layui-hide');
            $('.w_txtFile').addClass('layui-hide');
            if(getSearchString('w_db_type') == 1){//表示写的时候选择的是mysql
                $('#w-sc-add-session').removeClass('layui-hide');
                $('#w_add_db_mode_all').removeClass('layui-hide');
            }
            if(getSearchString('w_db_type') == 2){//表示写的时候选择的是oracle
                $('#w-sc-add-session').addClass('layui-hide');
                $('#w_add_db_mode_all').addClass('layui-hide');
            }
            if(getSearchString('w_db_type') == 4){//表示写的是时候选择的是sqlserver
                $('#w_add_db_mode_all').addClass('layui-hide');
                $('#w-sc-add-session').addClass('layui-hide');
                $('#w-sc-add-postSql').removeClass('layui-hide');
            }
        }
        /*监听当鼠标点击列名input框的时候弹出对应的文本区域*/
        $('#add_column').on('focus',function () {
            $('.col-textarea').removeClass('layui-hide');
        });
        $('#col-sure').on('click',function () {
            $('.col-textarea').addClass('layui-hide');
            /*将文本域的值存入input框中*/
            $('#add_column').val($.trim($('#col_texta').val()));
        });
        $('#col-cancle').on('click',function () {
            $('.col-textarea').addClass('layui-hide');
        });

        $('#w-add_column').on('focus',function () {
            $('.w-col-textarea').removeClass('layui-hide');
        });
        $('#w-col-sure').on('click',function () {
            $('.w-col-textarea').addClass('layui-hide');
            /*将文本域的值存入input框中*/
            $('#w-add_column').val($.trim($('#w-col_texta').val()));
        });
        $('#w-col-cancle').on('click',function () {
            $('.w-col-textarea').addClass('layui-hide');
        });

        /*监听当鼠标点击同步表名input框的时候弹出对应的文本区域*/
        $('#add_table').on('focus',function () {
            $('.tab-textarea').removeClass('layui-hide');
        });
        $('#tab-sure').on('click',function () {
            $('.tab-textarea').addClass('layui-hide');
            $('#add_table').val($.trim($('#tab_texta').val()));
        });
        $('#tab-cancle').on('click',function () {
            $('.tab-textarea').addClass('layui-hide');
        });

        $('#w-add_table').on('focus',function () {
            $('.w-tab-textarea').removeClass('layui-hide');
        });
        $('#w-tab-sure').on('click',function () {
            $('.w-tab-textarea').addClass('layui-hide');
            $('#w-add_table').val($.trim($('#w-tab_texta').val()));
        });
        $('#w-tab-cancle').on('click',function () {
            $('.w-tab-textarea').addClass('layui-hide');
        });

        /*监听当鼠标点击URL地址input框的时候弹出对应的文本区域*/
        /*$('#add_contaion').on('focus',function () {
            $('.cont-textarea').removeClass('layui-hide');
        });*/
        $('#cont-sure').on('click',function () {
            $('.cont-textarea').addClass('layui-hide');
            $('#add_contaion').val($.trim($('#url_texta').val()));
        });
        $('#cont-cancle').on('click',function () {
            $('.cont-textarea').addClass('layui-hide');
        });

        /*$('#w-add_contaion').on('focus',function () {
            $('.w-cont-textarea').removeClass('layui-hide');
        });*/
        $('#w-cont-sure').on('click',function () {
            $('.w-cont-textarea').addClass('layui-hide');
            $('#w-add_contaion').val($.trim($('#w-url_texta').val()));
        });
        $('#w-cont-cancle').on('click',function () {
            $('.w-cont-textarea').addClass('layui-hide');
        });

        /*监听当鼠标点击动态sqlinput框的时候弹出对应的文本区域*/
        $('#add_sql').on('focus',function () {
            $('.sql-textarea').removeClass('layui-hide');
        });
        $('#sql-sure').on('click',function () {
            $('.sql-textarea').addClass('layui-hide');
            /*var sql_str_inpt = $('#add_sql').val();
            if(sql_str_inpt == ""){
                sql_str_inpt = $.trim($('#sql_texta').val());
            }else {
                sql_str_inpt += '&'+$.trim($('#sql_texta').val());
            }
            $('#add_sql').val(sql_str_inpt);*/
            $('#add_sql').val($.trim($('#sql_texta').val()));
        });
        $('#sql-cancle').on('click',function () {
            $('.sql-textarea').addClass('layui-hide');
        });

        /*监听当鼠标点击session input框的时候弹出对应文本区域*/
        $('#w-add_session').on('focus',function () {
            $('.w-session-textarea').removeClass('layui-hide');
        });
        $('#w-session-sure').on('click',function () {
            $('.w-session-textarea').addClass('layui-hide');
            $('#w-add_session').val($.trim($('#w-session_texta').val()));
        });
        $('#w-session-cancle').on('click',function () {
            $('.w-session-textarea').addClass('layui-hide');
        });

        /*监听当鼠标点击presql input框的时候弹出对应文本区域*/
        $('#w-add_preSql').on('focus',function () {
            $('.w-presql-textarea').removeClass('layui-hide');
        });
        $('#w-preSql-sure').on('click',function () {
            $('.w-presql-textarea').addClass('layui-hide');
            $('#w-add_preSql').val($.trim($('#w-preSql_texta').val()));
        });
        $('#w-preSql-cancle').on('click',function () {
            $('.w-presql-textarea').addClass('layui-hide');
        });

        /*监听当鼠标点击postsql input框的时候弹出对应文本区域*/
        $('#w-add_postSql').on('focus',function () {
            $('.w-postsql-textarea').removeClass('layui-hide');
        });
        $('#w-postSql-sure').on('click',function () {
            $('.w-postsql-textarea').addClass('layui-hide');
            $('#w-add_postSql').val($.trim($('#w-postSql_texta').val()));
        });
        $('#w-postSql-cancle').on('click',function () {
            $('.w-postsql-textarea').addClass('layui-hide');
        });

        /*监听当鼠标点击txtfile的读取列的input框的时候，弹出下面的新增选择框*/
        $('#add_txtFile_column').on('focus',function () {
            $('.add_col_txt').removeClass('layui-hide');
        });
        $('#add_txtFile_column_sure').on('click',function () {
            $('.add_col_txt').addClass('layui-hide');
            /*将获取的数据封装成json对象的形式添加到input框中*/
            var key1 = "";
            var key2 = "";
            var value1 = "";
            var value2 = "";
            var obj = {};
            key1 = $('#add_txtFile_column1').val();
            if(key1 == "index"){
                key1 = $('#add_txtFile_column1').val();
                value1 = parseInt($('#add_txtFile_column2').val())
            }else {
                key1 = $('#add_txtFile_column1').val();
                value1 = $('#add_txtFile_column2').val();
            }
            key2 = $('#add_txtFile_column3').val();
            value2 = $('#add_txtFile_column4').val();
            obj[key1] = value1;
            obj[key2] = value2;
            if(value2 == "date"){
                var key3 = "format";
                obj[key3] = "yyyy.MM.dd";
            }
            var add_cloumn_txt_inpt = $('#add_txtFile_column').val();
            if(add_cloumn_txt_inpt == ""){
                add_cloumn_txt_inpt = JSON.stringify(obj);
            }else {
                add_cloumn_txt_inpt += '&'+JSON.stringify(obj);
            }
            $('#add_txtFile_column').val(add_cloumn_txt_inpt);
        });
        $('#add_txtFile_column_cancle').on('click',function () {
            $('.add_col_txt').addClass('layui-hide');
        });

        /*监听ftp点击input框的部分*/
        /*监听path*/
        $('#add_ftp_path').on('focus',function () {
            $('.add-ftp-path-textarea').removeClass('layui-hide');
        });
        $('#add_ftp_path-sure').on('click',function () {
            $('.add-ftp-path-textarea').addClass('layui-hide');
            $('#add_ftp_path').val($.trim($('#add_ftp_path_texta').val()));
        });
        $('#add_ftp_path-cancle').on('click',function () {
            $('.add-ftp-path-textarea').addClass('layui-hide');
        });
        /*监听列cloumn*/
        $('#add_ftp_column').on('focus',function () {
            $('.add_ftp_col_txt').removeClass('layui-hide');
        });
        $('#add_ftp_column_sure').on('click',function () {
            $('.add_ftp_col_txt').addClass('layui-hide');
            /*将获取的数据封装成json对象的形式添加到input框中*/
            var key1 = "";
            var key2 = "";
            var value1 = "";
            var value2 = "";
            var obj = {};
            key1 = $('#add_ftp_column1').val();
            if(key1 == "index"){
                key1 = $('#add_ftp_column1').val();
                value1 = parseInt($('#add_ftp_column2').val())
            }else {
                key1 = $('#add_ftp_column1').val();
                value1 = $('#add_ftp_column2').val();
            }
            key2 = $('#add_ftp_column3').val();
            value2 = $('#add_ftp_column4').val();
            obj[key1] = value1;
            obj[key2] = value2;
            if(value2 == "date"){
                var key3 = "format";
                obj[key3] = "yyyy.MM.dd";
            }
            var add_cloumn_txt_inpt = $('#add_ftp_column').val();
            if(add_cloumn_txt_inpt == ""){
                add_cloumn_txt_inpt = JSON.stringify(obj);
            }else {
                add_cloumn_txt_inpt += '&'+JSON.stringify(obj);
            }
            $('#add_ftp_column').val(add_cloumn_txt_inpt);
        });
        $('#add_ftp_column_cancle').on('click',function () {
            $('.add_ftp_col_txt').addClass('layui-hide');
        });



        /*该方法用于判断值是否是数字*/
        function isRealNum(val){
            // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除，
            if(val === "" || val ==null){
                return false;
            }
            if(!isNaN(val)){
                //对于空数组和只有一个数值成员的数组或全是数字组成的字符串，isNaN返回false，例如：'123'、[]、[2]、['123'],isNaN返回false,
                //所以如果不需要val包含这些特殊情况，则这个判断改写为if(!isNaN(val) && typeof val === 'number' )
                return true;
            }
            else{
                return false;
            }
        }



    })
});