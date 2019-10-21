;(function(){

  function SearchPage(){
    var _self = this;
    this.url = 'views/search.html';
    this.wrap = $('#searchPage');
    this.content = _self.wrap.find('.content');

    this.html = ' \
<div id="searchwrap" class="clearfix animated fadeIn">\
  <div id="searchLeft">\
    <div class="title"><img src="assets/images/pagers/search/title.png" height="150" width="356" alt=""></div>\
    <div class="files clearfix">\
      <label for="province" class="label-province"></label>\
      <div class="selectwrap">\
        <span></span>\
        <i></i>\
        <select name="province" id="province" class="select required"  data-msg-required="请选择省份!">\
        </select>\
      </div>\
    </div>\
    <div class="files clearfix">\
      <label for="city" class="label-city"></label>\
      <div class="selectwrap">\
        <span></span>\
        <i></i>\
        <select name="city" id="city" class="select required" data-msg-required="请选择城市!">\
        </select>\
      </div>\
    </div>\
    <div class="files clearfix">\
      <label for="dealer" class="label-dealer"></label>\
      <div class="selectwrap">\
        <span></span>\
        <i></i>\
        <select name="dealer" id="dealer" class="select required" data-msg-required="请选择经销商!">\
        </select>\
      </div>\
    </div>\
  </div>\
  <div id="searchMain">\
    <div id="dituContent"></div>\
  </div>\
</div>\
    ';

    this.initMap = function(){
      _self.fordpopmap = new fordMap();
    }

    this.initSelectStyle = function(){
      _self.styleForm = new fordSelect({
          data     : global_data,
          province : _self.content.find('#province'),
          city     : _self.content.find('#city'),
          dealer   : _self.content.find('#dealer'),
          dealerCallback: _self.dealerCallback
      })
    }

    this.dealerCallback = function( data ){

      _self.fordpopmap.create(data);

    }


    !(function(){
        _self.content.html(_self.html).imagesLoaded(function(){
          _self.initSelectStyle();
          _self.initMap();

          $('#loadingwrap').addClass('f-hide');
        })
    })();
  }

  window.searchPage = SearchPage;
})(window);
