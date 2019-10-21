;(function(TPL){
  function Gallery( config ){
    var _self = this;
    this.cfg = config ? config : {};
    this.$body = $('body');
    this.$w = $(window);
    this.sidebarWidth = 79;
    this.info = {
      w: _self.$w.width() - _self.sidebarWidth,
      h: _self.$w.height(),
      ow: 1840,
      oh: 552
    };

    this.dlength = _self.cfg.data.length;

    this.gallery = null;
    this.galleryview = null;

    this.countSize = function(){
      var moh = this.dlength > 4 ? _self.info.oh : _self.info.oh/2;
      return {
        width: _self.info.w,
        height: _self.info.w /( _self.info.ow/moh ),
        marginTop: -( _self.info.w /( _self.info.ow/moh ) /2 )
      }
    }

    this.bindresize = function(){
      _self.$w.on('resize.gallery', _self.setwidth);
    }

    this.unbindresize = function(){
      _self.$w.off('.gallery');
    }

    this.bindClose = function(){
      _self.$body.find('#gallerywrap').on('click', '#gallery_close' , changeStyle);

      _self.$body.off('.galleryviews').on('click.galleryviews', '#popup_mask' , changeStyle);

      function changeStyle(){

        _self.$body.find('#gallerywrap').off();
        _self.$body.find('#gallerywrap , #popup_mask').remove();

        if( _self.cfg.slide ) _self.cfg.slide.state = true;
        _self.unbindresize();
        return false;

      }


    }

    this.setwidth = function(){

      _self.info.w = _self.$w.width() - _self.sidebarWidth;
      _self.info.h = _self.$w.height();
      var info = _self.countSize();

      _self.$body.find('#gallerywrap').css(info)

      var liwidth = info.width/4;

      _self.$body.find('#gallery').find('ul').each(function(j,l){
        var $ul = $(this);
        var count = 0;
        $ul.css({height:info.height}).find('li').each(function(k,v){
          var $li = $(v);


          if(_self.dlength > 4 ){

            if( k != 0 && k%2 ==0 ){
              count++;
              $li.css({
                width: liwidth,
                left: count > 0 ? liwidth * count  : 0
              })
            }else{
              $li.css({
                width: liwidth,
                left: count > 0 ? liwidth * count  : 0
              })
            }

          }else{

            $li.css({
              width: liwidth,
              left: liwidth * k
            })
            .removeClass('odd')
            .addClass('even');

          }

        })
      });

    }

    this.gallery_tpl ='<ul>\
        <% _.each(data, function( item , k ) {%>\
          <%= k%8 == 0 && k >0 ? "</ul><ul>" : "" %>\
            <% if(item.img){%>\
              <li data-gallerykey="<%= k %>" class="<%= k%2 == 0? "even" : "odd"  %>">\
                <div class="mask"></div>\
                  <img src="<%= item.img %>">\
                  <div class="deswrap"><%= item.desc %></div>\
                  <div class="gallery_plus"></div>\
              </li>\
            <% }else{ %>\
              <li class="blank <%= k%2 == 0? "even" : "odd"  %>">\
                <img src="<%= item.blank %>">\
              </li>\
            <% } %>\
          <%});%>\
        </ul>\
        ';
    this.gallery_view = null;

    this.init = function(){
      $('#loadingwrap').removeClass('f-hide');
      if( $('#gallerywrap').length == 0){
        _self.gallery_view = _.template(_self.gallery_tpl);
        var $html = $('<div id="gallerywrap" class="f-hide"><div id="controlwrap"><div id="gallery_close" class="animated fadeIn delay1s"></div><div class="next"></div><div class="split"></div><div class="prev"></div></div><div id="gallery" class="animated3s galleryHeight">'+_self.gallery_view(_self.cfg)+'</div></div><div id="popup_mask"></div>');
        var $gallery = $html.find('#gallery');
        _self.$body.append( $html ).imagesLoaded(function(){

          _self.setwidth();
          _self.bindresize();
          _self.bindClose();

          var $control = _self.$body.find('#controlwrap');
          _self.gallery = $gallery.cycle({
            fx: 'scrollHorz',
            timeout: 0,
            prev: $control.find('.prev'),
            next: $control.find('.next')
          });

          if(_self.cfg.data.length<=8) {
            $control.find('.next,.prev,.split').remove();
          }

          if( _self.cfg.slide ) _self.cfg.slide.state = false;

          $gallery.on('click','li',function(){
            var $this = $(this),
            _index = $this.data('gallerykey') || 0;

            if($this.hasClass('blank')) return;

            _self.galleryview = new GalleryView({
              data: _self.cfg.data,
              index:_index
            });

          });
          $('#gallerywrap').removeClass('f-hide');
          $('#loadingwrap').addClass('f-hide');

          var info = _self.countSize();

          TweenMax.fromTo( $gallery , 0.5, { css:{ top: info.height/2, height: 0 }  } , { css:{ top: 0, height: info.height }  });

        });
      }
    }
  }

  function GalleryView( config ){
    var _self = this;
    this.index = config && config.index || 0 ;
    this.list = config && config.data &&  _.filter(config.data, function(item){ return item.bigpic; });

    this.$body = $('body');
    this.$w = $(window);
    this.w = _self.$w.width();
    this.h = _self.$w.height();
    this.ow = 1841;
    this.oh = 920;
    this.state = true;

    $loadingwrap = $('#loadingwrap');

    this.gallery_view_tpl ='<ul>\
        <% _.each(data, function( item , k ) {%>\
            <% if( item.bigpic ){ %>\
            <li class="imglistwrap" >\
              <img src="<%= item.bigpic %>" class="imglist" alt="" />\
              <% if( item.caption ){ %>\
                <div class="caption-wrap">\
                  <h2 class="animated fadeInUpShort dealy-03s"><%= item.desc %></h2>\
                  <div class="caption animated fadeInUpShort dealy-05s"><%= item.caption %></div>\
                </div>\
              <% } %>\
            </li>\
            <% } %>\
          <%});%>\
        </ul>\
        ';


    this.init = function(){
      var view = _.template(_self.gallery_view_tpl);
      var $html = '<div id="galleryviews" class="f-hide animated fadeIn short"><div id="container">'+view({data:_self.list})+'</div><div class="prev"></div><div class="next"></div><div class="close"></div></div>';

        addLoading();
        _self.$body.append( $html ).imagesLoaded(function(){

            $('#container').find('li').eq( _self.index ).addClass('curr');
            checkPageindex();

            fitContent();
            _self.Events();
            delLoading();

            $('#loadingwrap').addClass('f-hide');
            $('#galleryviews').removeClass('f-hide');
        })
    }
    this.init();

    function fitContent(){

      _self.w = _self.$w.width();
      _self.h = _self.$w.height();

      var info = MG.Calculate(_self.ow,_self.oh,_self.w,_self.h,true);


      $('#galleryviews').find('.imglist').css(info);
    }

    function addLoading(){
      $loadingwrap.removeClass('f-hide');
    }
    function delLoading(){
      $loadingwrap.addClass('f-hide');
    }

    function pagePrev(){

      _self.goto( _self.index-1 );

    }
    function pageNext(){

      _self.goto( _self.index+1 );

    }

    this.goto = function( goindex ){
      var list = $('#container').find('li');

      var index = goindex < 0 ? 0 : goindex > _self.list.length -1 ? _self.list.length - 1 : goindex;

      // console.log( _self.list , _self.index , index );

      if( !_self.state  || _self.index == index ) return;

      var now =  list.eq( _self.index );
      var next = list.eq( index );


      if( index > _self.index  ){
          TweenMax.fromTo( now , 1, { css:{ left: 0 }  } , { css:{ left: -(_self.w) } , onStart: _self.startAnimate ,  onComplete: _self.endAnimate , onCompleteParams: [ _self.index, index ,{ now: now , next: next }] });
          TweenMax.fromTo( next , 1, { css:{ left: _self.w }  } , { css:{ left: 0 } });
          // console.log( '左' );
      }

      if( index < _self.index  ){
          TweenMax.fromTo( now , 1, { css:{ left: 0 }  } , { css:{ left: _self.w } , onStart: _self.startAnimate , onStartParams: [ _self.index, index],  onComplete: _self.endAnimate , onCompleteParams: [ _self.index, index ,{ now: now , next: next }] });
          TweenMax.fromTo( next , 1, { css:{ left: -(_self.w) }  } , { css:{ left: 0 } });
          // console.log( '右' );
      }


    }

    this.startAnimate = function( now , next ){

      _self.state = false;
    }
    this.endAnimate = function( now , next , pages ){
      var list = $('#container').find('li');


      list.eq( next ).addClass('curr').siblings().removeClass('curr');
      _self.state = true;
      _self.index = next;

      checkPageindex();

    }

    function checkPageindex(){

      if( _self.index == 0){
        $('#galleryviews').find('.prev').hide();
      }else{
        $('#galleryviews').find('.prev').show();
      }

      if( _self.index == _self.list.length -1 ){
        $('#galleryviews').find('.next').hide();
      }else{
        $('#galleryviews').find('.next').show();
      }

    }

    this.Events = function(){
      $('#galleryviews').on('click','.prev',function(){
        // console.log('prevprevprevprev');
        pagePrev();
      })
      $('#galleryviews').on('click','.next',function(){
        // console.log('nextnextnextnextnextnext');
        pageNext();
      })
      $('#galleryviews').on('click','.close',function(){
        $('#galleryviews').remove();
      })

      $(window).off('resize.galleryviews')
        .on('resize.galleryviews',fitContent);
    }

  }

  TPL.gallery = Gallery;
})( window.TPL || (window.TPL={}) );
