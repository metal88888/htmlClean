;(function(){

  function YuPage( slide ){
    var _self = this;
    this.wrap = $('#yuPage');
    this.slide = slide;
    this.content = _self.wrap.find('.content');
    this.html = '<div class="titles-wrap animated short fadeInLeft">\
        <div class="titles">\
          <img src="assets/images/pagers/yu/title.png" width="352" height="174" alt="" />\
          <i class="animate-icon"></i>\
        </div>\
      </div>\
      ';

/*
      <div id="changes" class="animated fadeIn">\
        <div id="change_1"><i></i><div class="square"></div><div class="icon"></div><div class="line"></div></div>\
        <div id="change_2"><i></i><div class="square"></div><div class="icon"></div><div class="line"></div></div>\
        <div id="change_3"><i></i><div class="square"></div><div class="icon"></div><div class="line"></div></div>\
        <div id="change_4" class="on"><i></i><div class="square"></div><div class="icon"></div><div class="line"></div></div>\
      </div>\
 */


    this.gallerys = [
      {desc:'ACC智能自适应巡航控制系统',img:'assets/images/pagers/yu/gallery/thumb/1.jpg',bigpic:'assets/images/pagers/yu/gallery/default/1.jpg',caption:'每一个出类拔萃的领导者，总少不了同样出色的助手追随身旁。就像金牛座为您配置的ACC智能自适应巡航控制系统，在任何时速之下都可以实现自动调节车速，以及与前车设定的安全距离，更能跟随前车启动和停止，一路为您护航。'},
      {desc:'9安全气囊，特有驾驶员膝部安全气囊',img:'assets/images/pagers/yu/gallery/thumb/2.jpg',bigpic:'assets/images/pagers/yu/gallery/default/2.jpg',caption:'金牛座不仅是您的出行座驾，更是您全方位的贴身保镖。同级领先的安全气囊，在发生正面碰撞时，有效降低冲击带来的伤害，细心保护脆弱的部位。'},
      {desc:'后排气囊式安全带',img:'assets/images/pagers/yu/gallery/thumb/3.jpg',bigpic:'assets/images/pagers/yu/gallery/default/3.jpg',caption:'无论宾客还是家人，后座总有您心系关怀的重要之人。福特专利，同级独有的气囊安全带，集舒适性和防护性于一体，更可适用于婴儿安全座椅之上，真正带来全方位的周全呵护。'},
      {desc:'LKA车道保持辅助系统',img:'assets/images/pagers/yu/gallery/thumb/4.jpg',bigpic:'assets/images/pagers/yu/gallery/default/4.jpg',caption:'根据车辆的偏离程度，EPAS电力助力转向系统及时输出扭矩力主动进行干预，辅助您操控方向盘，有效确保高速行驶时的稳定性，助力您在征途之上直驱而行。'}
    ];

    this.initEvent = function(){
      this.content.off().on('click','.animate-icon',_self.tpl_gallery);

      $(window).off('.yuPage').on('resize.yuPage',fillsize);

      function fillsize(){
        var ow = 1841,oh = 920, w = $(window).width(),h = $(window).height();
        var info = MG.Cc_inside(ow,oh,w,h,{width:352,left: 275,top: 95},true);
        // console.log(info);
        _self.wrap.find('.titles-wrap').css(info);
      }

      fillsize();

    }

    this.tpl_gallery = function(){
      console.log('333333333');

      var tpl = new TPL.gallery({ data: _self.gallerys , slide: _self.slide });
      tpl.init();

    }

    this.tpl_gallery_view = function( index ){




    }

    !(function(){
      _self.content.html(_self.html).imagesLoaded(function(){
        _self.initEvent();
        $('#loadingwrap').addClass('f-hide');
      });
    })();
  }

  window.yuPage = YuPage;
})(window);
