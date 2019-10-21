;(function(){

  function HomePage( slide ){
    var _self = this;
    this.wrap = $('#homePage');
    this.slide = slide;
    this.content = _self.wrap.find('.content');

    this.index = 0 ;
    this.$w = $(window);
    this.sidebar = 79;
    this.w = _self.$w.width() - _self.sidebar ;
    this.h = _self.$w.height();
    this.ow = 1920;
    this.oh = 920;

    this.player = null;
    this.reset = function(){
      _self.player.play();
    }
    this.pause = function(){
      _self.player.pause();
    }

    this.Event = function(){
      $(window).off('.homePage').on('resize.homePage',fillsize);
    }

    function fillsize(){
      _self.w = _self.$w.width()-_self.sidebar;
      _self.h = _self.$w.height();
      $('#homeplayerwrap').css({
        width: _self.w,
        height: _self.w
      });
      $('#homeplayer').css(MG.Calculate(_self.ow,_self.oh,_self.w,_self.h,true));
    }


    !(function(){

      _self.slide.state = false;

      $('#loadingwrap').removeClass('f-hide');
      var $wrapper = $('<div id="homeplayerwrap" class="f-hide"></div>');

      var video = $('<video></video>');
      video.addClass("video-js vjs-default-skin");
      video.attr('id', 'homeplayer');
      // video.attr('poster', 'assets/images/pagers/page-1/bg.jpg');
      $wrapper.append(video).appendTo( _self.content );

      _self.player = videojs('homeplayer', {
        techOrder: ['html5'],
        autoplay: false,
        controls: false,
        sources: [
          {
            src:'assets/videos/home_audio.mp4',
            type: "video/mp4",
          },
          {
            src:'assets/videos/home_audio.webm',
            type: "video/webm",
          }
        ]
      });

      _self.player.ready(function() {
        $('#loadingwrap').addClass('f-hide');
        var _player = this;
        _player.play();
        $('#homeplayerwrap').removeClass('f-hide');
        this.on('ended', function() {

          _self.slide.state = true;
        });
      });

      fillsize();
      _self.Event();


    })();

  }
  window.homePage = HomePage;
})(window);
