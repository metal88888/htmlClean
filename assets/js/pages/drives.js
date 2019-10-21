;(function(){

  function DrivesPage(){
    var _self = this;
    this.url = 'views/drives.html';
    this.wrap = $('#drivesPage');
    this.content = _self.wrap.find('.content');
    this.styleForm  = null;

    this.html = ' \
<div id="formwrap" class="animated fadeIn">\
  <div class="titles"><img src="assets/images/pagers/drives/title.png" height="133" width="753" alt=""></div>\
  <form id="form-drives" action="#">\
    <div class="clearfix">\
      <div class="formsplit formleft">\
        <div class="files clearfix">\
          <label for="name" class="label-name"></label>\
          <input type="text" name="name" class="text required" id="name" data-msg-required="请填写姓名!">\
        </div>\
        <div class="files clearfix">\
          <label for="mobile" class="label-mobile"></label>\
          <input type="text" name="mobile" class="text mobile required" id="mobile" maxlength="11" data-rules-mobile="true"  data-msg-mobile="请填写正确的手机号码!" data-msg-required="请填写手机号码!">\
        </div>\
      </div>\
      <div class="formsplit formRight">\
        <div class="files clearfix">\
          <label for="" class="label-gender"></label>\
          <input type="radio" name="gender" class="radio" value="先生" checked id="fmale">\
          <label for="fmale" class="genderlabel label-fmale on"></label>\
          <input type="radio" name="gender" class="radio" value="女士" id="male">\
          <label for="male" class="genderlabel label-male"></label>\
        </div>\
        <div class="files clearfix">\
          <label for="province" class="label-province"></label>\
          <div class="selectwrap small">\
            <span></span>\
            <i></i>\
            <select name="province" id="province" class="select required"  data-msg-required="请选择省份!">\
            </select>\
          </div>\
          <label for="city" class="label-city"></label>\
          <div class="selectwrap small">\
            <span></span>\
            <i></i>\
            <select name="city" id="city" class="select required" data-msg-required="请选择城市!">\
            </select>\
          </div>\
        </div>\
      </div>\
    </div>\
    <div class="files clearfix submit-wrap">\
      <input type="submit" class="submit" value="提交">\
    </div>\
  </form>\
</div>\
    ';

    this.initEvnets = function(){
      $('.genderlabel').on('click',function(){
        var $this = $(this);
        $this.addClass('on').siblings().removeClass('on');
      });

      $('#form-drives').validate({
          onkeyup    : false,
          onclick    : false,
          onfocusout : false,
          onfocusin  : false,
          showErrors : function(errorMap, errorList) {
            if(errorList && errorList.length>0){
              alert(errorList[0].message);
            }
          },
          submitHandler:function(form){

            var utm_source = getCookie('utm_source'),
            utm_medium = getCookie('utm_medium'),
            utm_campaign = getCookie('utm_campaign'),
            utm_content = getCookie('utm_content');

            sys_api.formsave({
                url      : "http://www.datacenter.ford.com.cn/fode_apply_data/api/http_json",
                params   : $(form).serialize()+'&curl_num=24&toform='+document.referrer+'&utm_source='+utm_source+'&utm_medium='+utm_medium+'&utm_campaign='+utm_campaign+'&utm_content='+utm_content,
                callback : function(data){

                  if( data.result == 1){ //预约试驾 成功判断

                    $(form)[0].reset();
                    _self.styleForm.resetform();

                    alert('预约成功!');
                    try{ga('send', 'event', 'button', 'click', 'testdrive_submitpc');}catch(e){}

                  }else{
                    alert(data.msg);
                  }
                }
            });


            return false;
          }
      })
    }

    this.initSelectStyle = function(){
      _self.styleForm = new fordSelect({
          data     : global_data,
          province : _self.content.find('#province'),
          city     : _self.content.find('#city')
      })
    }

    !(function(){
        _self.content.html(_self.html).imagesLoaded(function(){
          _self.initSelectStyle();
          _self.initEvnets();
          $('#loadingwrap').addClass('f-hide');
        });
    })();

  }

  window.drivesPage = DrivesPage;
})(window);
