;(function(){

  function ShiPage( slide ){
    var _self = this;
    this.wrap = $('#shiPage');
    this.slide = slide;
    this.content = _self.wrap.find('.content');
    this.html = '<div class="titles-wrap animated short fadeInRight">\
        <div class="titles">\
          <img src="assets/images/pagers/shi/title.png" width="383" height="207" alt="" />\
          <i class="animate-icon"></i>\
        </div>\
      </div>\
      ';

/*

      <div id="changes" class="animated fadeIn">\
        <div id="change_1"><i></i><div class="square"></div><div class="icon"></div><div class="line"></div></div>\
        <div id="change_2" class="on"><i></i><div class="square"></div><div class="icon"></div><div class="line"></div></div>\
        <div id="change_3"><i></i><div class="square"></div><div class="icon"></div><div class="line"></div></div>\
        <div id="change_4"><i></i><div class="square"></div><div class="icon"></div><div class="line"></div></div>\
      </div>\

 */

    this.gallerys = [
      {desc:'2.7L EcoBoost <sup>®</sup>GTDi V6发动机',img:'assets/images/pagers/shi/gallery/thumb/1.jpg',bigpic:'assets/images/pagers/shi/gallery/default/1.jpg',caption:'有时,外表越冷静,内心越激昂。以V6结构布局,融合缸内燃油直喷、涡轮增压及双独立可变气门正时(Ti-VCT)三大核心技术的2.7L EcoBoost   GTDi发动机,迸发325匹强劲马力。为您的前途，酝酿震撼人心的力量。'},
      {desc:'换挡拨片',img:'assets/images/pagers/shi/gallery/thumb/2.jpg',bigpic:'assets/images/pagers/shi/gallery/default/2.jpg',caption:'在S挡时,双手不必离开方向盘即可完成升降挡操作,令心情在运动模式的顺畅切换间,自如转变。'},
      {desc:'涡轮增压科技',img:'assets/images/pagers/shi/gallery/thumb/3.jpg',bigpic:'assets/images/pagers/shi/gallery/default/3.jpg',caption:'利用发动机排出气体所蕴含能量，推动涡轮高速运转，将空气压缩入汽缸，增大进气量并有效提升混合气密度，大幅增进燃烧效率，令您的驾驭更添动力。'},
      {desc:'燃油缸内直喷技术',img:'assets/images/pagers/shi/gallery/thumb/4.jpg',bigpic:'assets/images/pagers/shi/gallery/default/4.jpg',caption:'喷嘴以高压将气雾状油滴径直喷入汽缸燃烧室中，与进气精确混合。油气充分燃烧，动力迅猛爆发，燃油损耗相应锐减。'}
    ];

    this.initEvent = function(){
      this.content.off().on('click','.animate-icon',_self.tpl_gallery);

      $(window).off('.shiPage').on('resize.shiPage',fillsize);

      function fillsize(){
        var ow = 1841,oh = 920, w = $(window).width(),h = $(window).height();
        var info = MG.Cc_inside(ow,oh,w,h,{width:383,right: 90,bottom: 175},true);

        // console.log(info);
        _self.wrap.find('.titles-wrap').css(info);
      }

      fillsize();
    }

    this.tpl_gallery = function(){

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

  window.shiPage = ShiPage;
})(window);
