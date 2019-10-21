;(function(){

  function GalleryPage( slide ){
    var _self = this;
    this.wrap = $('#galleryPage');
    this.slide = slide;
    this.content = _self.wrap.find('.content');
    this.dlBtn = $('#download-btn');

    this.state = true;

    this.index = 0 ;
    this.$w = $(window);
    this.sidebar = 79;
    this.w = _self.$w.width() - _self.sidebar ;
    this.h = _self.$w.height();
    this.ow = 1841;
    this.oh = 920;

    //<a href="dl.php?file=0" class="dl"></a>

    this.html = '<div class="prev"></div><div class="next"></div>\
      <ul id="gallerys-wrap" class="animated fadeIn f-hide">\
        <% _.each(data, function( item , k ) {%>\
          <li class="<%= k%2 == 0? "even" : "odd"  %>">\
            <img src="<%= item.img %>" class="glist" alt="" />\
          </li>\
        <%});%>\
      </ul>';
    this.gallerys = [
      {img: 'assets/images/pagers/gallery/1.jpg'},
      {img: 'assets/images/pagers/gallery/2.jpg'},
      {img: 'assets/images/pagers/gallery/3.jpg'},
      {img: 'assets/images/pagers/gallery/4.jpg'},
      {img: 'assets/images/pagers/gallery/5.jpg'},
      {img: 'assets/images/pagers/gallery/6.jpg'},
      {img: 'assets/images/pagers/gallery/7.jpg'},
      {img: 'assets/images/pagers/gallery/8.jpg'},
      {img: 'assets/images/pagers/gallery/9.jpg'},
      {img: 'assets/images/pagers/gallery/10.jpg'},
      {img: 'assets/images/pagers/gallery/11.jpg'}
    ];

    this.styles = function(){
      $('#gallerys-wrap').find('li').eq( _self.index ).addClass('curr');
      fillsize();
      checkPageindex();
    }

    function checkPageindex(){
      if( _self.index == 0){
        $('#galleryPage').find('.prev').hide();
      }else{
        $('#galleryPage').find('.prev').show();
      }

      if( _self.index == _self.gallerys.length -1 ){
        $('#galleryPage').find('.next').hide();
      }else{
        $('#galleryPage').find('.next').show();
      }
    }
    function pagePrev(){

      _self.goto( _self.index-1 );

    }
    function pageNext(){

      _self.goto( _self.index+1 );

    }

    this.goto = function( goindex ){
      var list = $('#gallerys-wrap').find('li');

      var index = goindex < 0 ? 0 : goindex > _self.gallerys.length -1 ? _self.gallerys.length - 1 : goindex;

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
      _self.initLink(index);
    }

    this.initLink = function( link ){
      var linkurl = 'dl.php?file='+ link;
      _self.dlBtn.attr('href',linkurl);
    }

    this.startAnimate = function( now , next ){

      _self.state = false;
    }
    this.endAnimate = function( now , next , pages ){
      var list = $('#gallerys-wrap').find('li');

      list.eq( next ).addClass('curr').siblings().removeClass('curr');
      _self.state = true;
      _self.index = next;

      checkPageindex();

    }


    this.initEvent = function(){
      $('#galleryPage').on('click.galleryPage','.prev',function(){
        pagePrev();
      })
      $('#galleryPage').on('click.galleryPage','.next',function(){
        pageNext();
      })

      $(window).off('.galleryPage').on('resize.galleryPage',fillsize);
    }

    function fillsize(){
      _self.w = _self.$w.width()-_self.sidebar;
      _self.h = _self.$w.height();
      var info = MG.Calculate(_self.ow,_self.oh,_self.w,_self.h,true);
      $('#gallerys-wrap')
        .css({
          width: _self.w,
          height: _self.h
        })
        .find('.glist').css(info)
        .end().find('li').css({
          left: -(_self.w)
        })
        .end().find('.curr').css({
          left: 0
        })


    }

    !(function(){
      $('#loadingwrap').removeClass('f-hide');
      var html = _.template(_self.html);
      _self.content.html( html({data: _self.gallerys}) ).imagesLoaded(function(){
        _self.styles();
        _self.initEvent();
        _self.initLink(0);
        $('#loadingwrap').addClass('f-hide');
        $('#gallerys-wrap').removeClass('f-hide');

      });
    })();
  }

  window.galleryPage = GalleryPage;
})(window);
