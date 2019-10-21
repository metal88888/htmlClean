;(function(window,$){
    'use strict';
    window.sys_api = {
        randomtime   : function(){
            return +new Date();
        },
        formsave        : function(options){ //登录
            myajax(options);
        },
        ajax         : function(ajaxoptions){
            if(!ajaxoptions.url){
                alert('请求参数出错!')
                return;
            }
            if(ajaxoptions.before && typeof(ajaxoptions.before) === 'function') {
                ajaxoptions.before();
            };
            $.ajax({
                url: ajaxoptions.url,
                type: ajaxoptions.type || 'post',
                dataType: 'jsonp',
                data: ajaxoptions.params
            })
            .done(function(data) { // code:1000,msg:success,data:[{}]
              if(data){
                  ajaxoptions.callback(data);
              }else{
                  alert('反回数据null');
              }
            })
            .fail(function(data) {
                alert('连接出错,请联系管理员!');
                return false;
            });
        }
    };


    function myajax(options){
        // console.log(options);
        if(!options.url){
            alert('请求参数出错!')
            return;
        }
        if(options.before && typeof(options.before) === 'function') {
            options.before();
        };
        $.ajax({
            url: options.url,
            type: options.type || 'post',
            dataType: 'jsonp',
            data: options.params
        })
        .done(function(data) {
            if(data){
                options.callback(data);
            }else{
                alert('反回数据null');
            }
        })
        .fail(function(data) {
            alert('连接出错,请联系管理员!');
            return false;
        });
    };

})(window,$);
