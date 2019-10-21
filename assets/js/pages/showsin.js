;(function(){

  function ShowsinPage( slide ){
    var _self = this,
    show360;
    this.wrap = $('#showsinPage');
    this.slide = slide;
    this.content = _self.wrap.find('.content');

    this.init = function(){
      var $html = $('<div id="showsinwarp">\
          <div class="topwrap">\
            <img src="assets/images/pagers/showsin/title.png" width="318" height="85" alt="" />\
            <div class="btnwrap clearfix">\
              <a href="#showsout"><img src="assets/images/pagers/showsin/btn-out.png" id="btn-out" width="154" height="44" alt="" /></a>\
              <a href="javascript:void(0);"><img src="assets/images/pagers/showsin/btn-in.png" id="btn-in" width="154" height="44" alt="" /></a>\
            </div>\
          </div>\
          <div class="showstyle">\
            <img src="assets/images/pagers/showsout/tips.png" class="tips" width="239" height="40" alt="" />\
          </div>\
          <div class="inwrap" id="Player360"></div>\
            </div>');
      this.content.html($html).imagesLoaded(function(){
        _self.initflash();
        _self.initEvent();


      });
    }

    this.initflash = function(){
      var $w = $(window),
      w = $w.width()-79,
      h = $w.height();

      var flashvars={
      };

      var params = {
        wmode:"Transparent"
      };
      var attributes = {
          id:"Player360"
      };

      swfobject.embedSWF("assets/images/pagers/showsin/trimPreload.swf", "Player360", w, h, "10.0.0", "assets/flash/expressInstall.swf",  flashvars,params, attributes);

      $w.on('resize', swfresize);

      function swfresize(){
        w = $w.width()-79;
        h = $w.height();

        $('#Player360').css({
          width: w,
          height: h
        })
      }


    }

    this.initEvent = function(){

      $('.btnwrap').on('click','a',function(){
        var $this = $(this),
        _index = $this.index();

        if( _index < 1 ){
          try{ga('send', 'event', 'button', 'click', 'car360_exterior1pc');}catch(e){}
        }

      });

    }

    this.init();


  }
  window.showsinPage = ShowsinPage;
})(window);
