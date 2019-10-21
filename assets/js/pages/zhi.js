;(function(){

  function ZhiPage( slide ){
    var _self = this;
    this.wrap = $('#zhiPage');
    this.slide = slide;
    this.content = _self.wrap.find('.content');
    this.html = '<div class="titles-wrap animated short fadeInLeft">\
        <div class="titles">\
          <img src="assets/images/pagers/zhi/title.png" width="464" height="173" alt="" />\
          <i class="animate-icon"></i>\
        </div>\
      </div>\
      ';

/*
      <div id="changes" class="animated fadeIn">\
        <div id="change_1"><i></i><div class="square"></div><div class="icon"></div><div class="line"></div></div>\
        <div id="change_2"><i></i><div class="square"></div><div class="icon"></div><div class="line"></div></div>\
        <div id="change_3" class="on"><i></i><div class="square"></div><div class="icon"></div><div class="line"></div></div>\
        <div id="change_4"><i></i><div class="square"></div><div class="icon"></div><div class="line"></div></div>\
      </div>\
 */

    this.gallerys = [
      {desc:'SYNC<sup>®</sup>2车载多媒体通讯娱乐互动系统',img:'assets/images/pagers/zhi/gallery/thumb/1.jpg',bigpic:'assets/images/pagers/zhi/gallery/default/1.jpg',caption:'重要的人，好听的音乐，美妙的时光,构成了惬意生活的全部。而具备 MyFord Touch™的第二代车载多媒体互动系统,则连接了这一切。只需简单的语音指令或指尖的轻轻触碰,真正实现智能移动办公,营造一切听您所示的尊崇感受。'},
      {desc:'APA主动泊车辅助系统（平行+垂直）',img:'assets/images/pagers/zhi/gallery/thumb/2.jpg',bigpic:'assets/images/pagers/zhi/gallery/default/2.jpg',caption:'系统自动感应探测车位,驾驶者只需要在仪表显示屏的提示下,简单地通过油门、刹车和挡位来操控车辆停放位置，助您泊车一步到位。'},
      {desc:'E-Shifter电子旋钮式换挡器',img:'assets/images/pagers/zhi/gallery/thumb/3.jpg',bigpic:'assets/images/pagers/zhi/gallery/default/3.jpg',caption:'真正掌控，在于进退自若。E-Shifter旋钮式电子换档器，打破常规手自排挡的运筹局限，令操控愈显优雅从容，有效减少动力输出损失及换档时的顿挫感，达到舒适与能效的双重飞跃。'},
      {desc:'自适应 LED 前大灯',img:'assets/images/pagers/zhi/gallery/thumb/4.jpg',bigpic:'assets/images/pagers/zhi/gallery/default/4.jpg',caption:'在您的视线所及和未及之处,我们都以前瞻的目光为您设想周到。自适应LED前大灯,集随动转向、弯道辅助、Follow me home等功能,并配以更节能且适合人眼的LED光源,即便会车时的一面之交, 都能感受您的彬彬之礼。'},
      {desc:'GPS导航集成倒车影像系统',img:'assets/images/pagers/zhi/gallery/thumb/5.jpg',bigpic:'assets/images/pagers/zhi/gallery/default/5.jpg',caption:'人生的岔路,总面临着选择,3D触摸屏地图显示,令GPS导航更加智能便捷;高分辨率的倒车辅助影像系统,将后方影像与动态倒车辅助引导线进行叠加,让倒车入位更显从容精准。'},
      {desc:'BLIS盲区监测系统（主动）',img:'assets/images/pagers/zhi/gallery/thumb/6.jpg',bigpic:'assets/images/pagers/zhi/gallery/default/6.jpg',caption:'事业版图的扩展,需要面面俱到;您的视野,同样不允许盲区带来的困扰。车后两侧的雷达传感器,准确传达驾驶者视线盲区内的车况,并给予警示,保障您一路安心畅行。'},
      {desc:'远程引擎启动系统',img:'assets/images/pagers/zhi/gallery/thumb/7.jpg',bigpic:'assets/images/pagers/zhi/gallery/default/7.jpg',caption:'智能科技闪耀人性光辉，全新远程引擎启动系统，通过智能钥匙可实现远程引擎启动，智能暖车预热等功能，让爱车心如意动，如臂指使。'},
      {desc:'电子手刹',img:'assets/images/pagers/zhi/gallery/thumb/8.jpg',bigpic:'assets/images/pagers/zhi/gallery/default/8.jpg',caption:'全系标配的电子手刹功能，停车时一键按钮制动，用科技的手段帮助商务人士掌控和判断路况，不用动手便可解除手刹，大大提高驾驶与操纵的舒适性与安全性。'}
    ];

    this.initEvent = function(){
      this.content.off().on('click','.animate-icon',_self.tpl_gallery);

      $(window).off('.zhiPage').on('resize.zhiPage',fillsize);

      function fillsize(){
        var ow = 1841,oh = 920, w = $(window).width(),h = $(window).height();
        var info = MG.Cc_inside(ow,oh,w,h,{width:464,left: 90,top: 150},true);

        // console.log(info);
        _self.wrap.find('.titles-wrap').css(info);
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

  window.zhiPage = ZhiPage;
})(window);
