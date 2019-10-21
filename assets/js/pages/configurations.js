;(function(){

  function ConfigurationsPage(){
    var _self = this;
    this.url = 'views/configurations.html';
    this.wrap = $('#configurationsPage');
    this.content = _self.wrap.find('.content');

    this.initEvnets = function(){
      this.wrap.find('#cfg-titles').on('click','li',function(){
        var $this = $(this)
        _index = $this.index();

        if( !$this.hasClass('on') ){
          $this.addClass('on').siblings().removeClass('on');
          _self.wrap.find('#cfg-contents')
            .mCustomScrollbar('scrollTo', '#contents-'+( _index + 1 ));
        }

        // console.log(_index);
      })


    }

    this.initSelectStyle = function(){
      var allTops = [620, 1590, 2955, 4715, 5634, 6164, 6784, 8455];

      var $contents = _self.wrap.find('#cfg-contents');

      $contents
        .mCustomScrollbar({
          callbacks:{
              onScroll:function(){
                setPos(Math.abs(this.mcs.top));
              }
          }
        });
      function setPos( top ){

        var _index = _.sortedIndex( allTops , top);

        _self.wrap.find('#cfg-titles li').eq(_index).addClass('on').siblings().removeClass('on');

      }
    }


    this.html = ' \
    <div id="configurationswrap" class="animated fadeIn f-hide">\
      <div class="titles"><img src="assets/images/pagers/configurations/title.png" height="78" width="449" alt=""></div>\
      <div id="cfg-wrap">\
        <ul id="cfg-titles" class="clearfix">\
          <li class="t-1 on"></li>\
          <li class="t-2"></li>\
          <li class="t-3"></li>\
          <li class="t-4"></li>\
          <li class="t-5"></li>\
          <li class="t-6"></li>\
          <li class="t-7"></li>\
          <li class="t-8"></li>\
        </ul>\
        <div class="image_container"><img src="assets/images/pagers/configurations/types.jpg" height="40" width="1239" alt=""></div>\
        <div id="cfg-contents">\
          <div id="contents-1"><img src="assets/images/pagers/configurations/contents/content_1.png" height="622" width="1234" alt=""></div>\
          <div id="contents-2"><img src="assets/images/pagers/configurations/contents/content_2.png" height="970" width="1234" alt=""></div>\
          <div id="contents-3"><img src="assets/images/pagers/configurations/contents/content_3.png" height="1365" width="1234" alt=""></div>\
          <div id="contents-4"><img src="assets/images/pagers/configurations/contents/content_4.png" height="1760" width="1234" alt=""></div>\
          <div id="contents-5"><img src="assets/images/pagers/configurations/contents/content_5.png" height="919" width="1234" alt=""></div>\
          <div id="contents-6"><img src="assets/images/pagers/configurations/contents/content_6.png" height="530" width="1234" alt=""></div>\
          <div id="contents-7"><img src="assets/images/pagers/configurations/contents/content_7.png" height="620" width="1234" alt=""></div>\
          <div id="contents-8"><img src="assets/images/pagers/configurations/contents/content_8.png" height="1671" width="1234" alt=""></div>\
        </div>\
        </ul>\
      </div>\
    </div>\
    ';

    !(function(){
        $('#loadingwrap').removeClass('f-hide');
        _self.content.html(_self.html).imagesLoaded(function(){
          $('#loadingwrap').addClass('f-hide');
          $('#configurationswrap').removeClass('f-hide');
          _self.initSelectStyle();
          _self.initEvnets();

        })
    })();

  }

  window.configurationsPage = ConfigurationsPage;
})(window);
