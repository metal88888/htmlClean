;(function(){

  function ZunPage( slide ){
    var _self = this;
    this.wrap = $('#zunPage');
    this.slide = slide;
    this.content = _self.wrap.find('.content');
    this.html = '<div class="titles-wrap animated short fadeInRight">\
        <div class="titles">\
          <img src="assets/images/pagers/zun/title.png" width="382" height="174" alt="" />\
          <i class="animate-icon"></i>\
        </div>\
      </div>\
      ';

/*
      <div id="changes" class="animated fadeIn">\
        <div id="change_1" class="on"><i></i><div class="square"></div><div class="icon"></div><div class="line"></div></div>\
        <div id="change_2"><i></i><div class="square"></div><div class="icon"></div><div class="line"></div></div>\
        <div id="change_3"><i></i><div class="square"></div><div class="icon"></div><div class="line"></div></div>\
        <div id="change_4"><i></i><div class="square"></div><div class="icon"></div><div class="line"></div></div>\
      </div>\

 */

    this.gallerys = [
      {desc:'行政级尊荣空间',img:'assets/images/pagers/zun/gallery/thumb/1.jpg',bigpic:'assets/images/pagers/zun/gallery/default/1.jpg',caption:'置身繁华，是什么给予您超凡脱俗的领悟？是心境，更是2949mm轴距带来的宽适尊荣空间。VIP宽敞坐席，配以人性化后排隐私设计，打造更胜一筹的奢适乘坐体验，款待您心中的至上贵宾。'},
      {desc:'福特家族前脸',img:'assets/images/pagers/zun/gallery/thumb/2.jpg',bigpic:'assets/images/pagers/zun/gallery/default/2.jpg',caption:'金牛座前脸采用福特家族标志性的倒梯形进气格栅设计。五条镀铬格栅饰条，与现代感的前大灯融为一体，辅助行驶灯由镀铬圈装饰，与下端全幅进气口互相映衬，彰显品位不凡。'},
      {desc:'后排中央扶手',img:'assets/images/pagers/zun/gallery/thumb/3.jpg',bigpic:'assets/images/pagers/zun/gallery/default/3.jpg',caption:'拿得起，也放得下，是对人生的把握。配备后座电动倾斜按钮、空调控制按钮及影音娱乐系统的多功能中央扶手，让您即使身居后座，也能处世自若。'},
      {desc:'全景天窗',img:'assets/images/pagers/zun/gallery/thumb/4.jpg',bigpic:'assets/images/pagers/zun/gallery/default/4.jpg',caption:'眼界有多广，前路往往就有多宽。傲视同级的两片式超大尺寸全景天窗，是您对视天地的格局。让驾乘空间更加明亮通透的同时，更有效阻挡紫外线伤害。'},
      {desc:'前后排多角度通风/加热按摩座椅',img:'assets/images/pagers/zun/gallery/thumb/5.jpg',bigpic:'assets/images/pagers/zun/gallery/default/5.jpg',caption:'决定身份的，可能是不拘小节，也可能是考究的细节。顶级触感真皮座椅，坐垫及靠背中心区域采用循环式按摩，并具有制冷、制热、通风功能。无论寒冬炎夏，您的每一次出行都是身心享受的旅程。'},
      {desc:'19”轮毂，马牌系列轮胎',img:'assets/images/pagers/zun/gallery/thumb/6.jpg',bigpic:'assets/images/pagers/zun/gallery/default/6.jpg',caption:'19寸镀铬多辐轮圈释放气吞万象的强大气场，成就您驭大千世界的非凡格局；搭配ContiSportContact轮胎内外兼修，更显尊贵本色。'},
      {desc:'后风挡电动遮阳帘',img:'assets/images/pagers/zun/gallery/thumb/7.jpg',bigpic:'assets/images/pagers/zun/gallery/default/7.jpg',caption:'有效帮助抵挡烈日环境下的阳光侵袭，阻挡紫外线，防止车厢内温度升高，增加车厢私密性，创造舒适宜人的驾乘环境，随时成为您隐秘的商务洽谈室。'},
      {desc:'后排座椅电动倾斜',img:'assets/images/pagers/zun/gallery/thumb/8.jpg',bigpic:'assets/images/pagers/zun/gallery/default/8.jpg',caption:'为您张弛有度的举手投足，我们提供新颖实用的后排电动座椅靠背，按照40:20:40比例设计，为您的商务出行和家庭出游提供自由、舒缓的尊贵体验，任何坐姿角度都能惬意自如。'}
    ];

    this.initEvent = function(){
      this.content.off().on('click','.animate-icon',_self.tpl_gallery);

      $(window).off('.zunPage').on('resize.zunPage',fillsize);

      function fillsize(){
        var ow = 1841,oh = 920, w = $(window).width(),h = $(window).height();
        var info = MG.Cc_inside(ow,oh,w,h,{width:382,right: 80,top: 60,caption:''},true);
        // console.log(info);
        _self.wrap.find('.titles-wrap').css(info);
        var iinfo = MG.Cc_inside(ow,oh,w,h,{left: -80,bottom: -10},true);
        _self.wrap.find('.animate-icon').css(iinfo);
      }

      fillsize();
    }

    this.tpl_gallery = function(){
      // console.log('333333333');

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

  window.zunPage = ZunPage;
})(window);
