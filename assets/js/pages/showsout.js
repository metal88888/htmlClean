;(function(){

  //360 class
  function initcar( options ){
      this.$carwrap = options.carwrap || $('#threesixty-wrap');
      this.html = '<div class="threesixty car">\
                <div class="spinner">\
                    <span>0%</span>\
                </div>\
                <ol class="threesixty_images"></ol>\
            </div>';

      this.options ={
        colors: [ 'collxiao', 'colwxiao' , 'colzxiao', 'colcxiao', 'colyxiao', 'coljxiao', 'colhxiao','colwwxiao'],
                // 钛晶银, 坦桑石蓝, 铂钻白, 琉璃棕, 琥珀橙, 烟晶灰, 玛瑙黑, 典雅白,
                // 4,0,1,2,3,5,6,7
        currColor: 4
      };

      this.options = $.extend(this.options,options);
      this.create(this.options.currColor);
  }

  initcar.prototype.init = function(){
      var c = this;
      c.$carwrap.empty().append(c.html).show();
  };
  initcar.prototype.create = function(color){
      var c = this,
      current = color ? color  : 0;
      this.init();
      // $tscolorswrap.find('li[data-cval="'+color+'"]').addClass('on').siblings().removeClass('on');
      c.$carwrap.find('.car').ThreeSixty(c.getoptions(current));
  };

  initcar.prototype.getoptions = function(curr){
      var c = this;
      var fileFolder = 'assets/images/pagers/showsout/gallerys/'+ c.options.colors[curr] +'/';

      c.options.slide.state = false;
      $('#loadingwrap').removeClass('f-hide');

      return {
         totalFrames  : 73,
         endFrame     : 0,
         currentFrame : 1,
         imgList      : '.threesixty_images',
         progress     : '.spinner',
         imagePath    : fileFolder,
         ext          : '.png',
         height       : 505,
         width        : 1010,
         navigation   : false,
         onReady      : function(){
          c.options.slide.state = true;
          $('#loadingwrap').addClass('f-hide');
         }
     }
  };

  function ShowsoutPage( slide ){
    var _self = this;
    this.show360 = null;
    this.wrap = $('#showsoutPage');
    this.slide = slide;
    this.content = _self.wrap.find('.content');

    this.init = function(){
      var $html = $('<div id="showsoutwarp">\
          <div class="topwrap">\
            <img src="assets/images/pagers/showsout/title.png" width="318" height="85" alt="" />\
            <div class="btnwrap clearfix">\
              <a href="javascript:void(0);"><img src="assets/images/pagers/showsout/btn-out.png" id="btn-out" width="154" height="44" alt="" /></a>\
              <a href="#showsin"><img src="assets/images/pagers/showsout/btn-in.png" id="btn-in" width="154" height="44" alt="" /></a>\
            </div>\
          </div>\
          <div class="showstyle">\
            <img src="assets/images/pagers/showsout/a-left.png" class="a-left" width="86" height="78" alt="" />\
            <img src="assets/images/pagers/showsout/a-right.png" class="a-right" width="91" height="78" alt="" />\
            <img src="assets/images/pagers/showsout/tips.png" class="tips" width="239" height="40" alt="" />\
          </div>\
          <div class="outwrap clearfix"></div>\
          <ul class="bntswrap">\
            <li class="color-5 on" data-cindex="4"><div class="t">钛晶银</div></li>\
            <li class="color-1" data-cindex="0"><div class="t">坦桑石蓝</div></li>\
            <li class="color-8" data-cindex="1"><div class="t">铂钻白</div></li>\
            <li class="color-3" data-cindex="2"><div class="t">琉璃棕</div></li>\
            <li class="color-4" data-cindex="3"><div class="t">琥珀橙</div></li>\
            <li class="color-6" data-cindex="5"><div class="t">烟晶灰</div></li>\
            <li class="color-7" data-cindex="6"><div class="t">玛瑙黑</div></li>\
            <li class="color-2" data-cindex="7"><div class="t">典雅白</div></li>\
          </ul>\
            </div>');
      this.content.html($html).imagesLoaded(function(){
        _self.initEvent();
        $('#loadingwrap').addClass('f-hide');
        _self.show360 =  new initcar({
          carwrap: _self.content.find('.outwrap'),
          slide: _self.slide
        });

      });
    }

    this.initEvent = function(){
      var trackcodeArr = ['car360_2bothcolour1pc', 'car360_2bothcolour2pc', 'car360_2bothcolour3pc', 'car360_2bothcolour4pc', 'car360_2bothcolour5pc', 'car360_2bothcolour6pc', 'car360_2bothcolour7pc', 'car360_2bothcolour8pc'];

      $('.btnwrap').on('click','a',function(){
        var $this = $(this),
        _index = $this.index();

        if( _index > 0 ){
          try{ga('send', 'event', 'button', 'click', 'car360_interior1pc');}catch(e){}
        }

      });

      $('.bntswrap').on('click','li',function(){
        var $this = $(this),
        _index = $this.data('cindex');

        if( _index >=0 &&  _self.slide.state ){
          $this.addClass('on').siblings().removeClass('on');
          _self.show360.create( _index );
          try{ga('send', 'event', 'button', 'click', trackcodeArr[_index]);}catch(e){}
        }

        return false;
      })
    }

    this.init();


  }
  window.showsoutPage = ShowsoutPage;
})(window);
