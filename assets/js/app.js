(function(window){

  window.MG = {
    // hashArr: ['home','lights','configurations','shows','news','events','drives'],
    // hashArrZh: ['首页','产品亮点','车型配置','缤纷赏车','新闻资讯','精彩活动','购车计划'],
    // hashSet: function(hash){
    //   window.location.hash = hash;
    // },
    // hashGet: function(){
    //   return window.location.hash.replace('#','');
    // },


    Calculate: function(ow,oh,w,h,_type){
      var type = _type ? true : false;
      var sw=w/ow;
      var sh=h/oh;
      var ss=1;
      ss = type ? Math.max(sw,sh) : Math.min(sw,sh);
      var tmp = {width:0,height:0,left:0,top:0};
      tmp.width = ss*ow;
      tmp.height = ss*oh;
      tmp.left = (w - tmp.width)/2;
      tmp.top = (h-tmp.height)/2;
      return tmp;
    },
    Cc_inside: function(ow,oh,w,h,info,_type){
      var type = _type ? true : false;
      var sw=w/ow;
      var sh=h/oh;
      var ss=1;
      ss = type ? Math.max(sw,sh) : Math.min(sw,sh);
      var tmp = {};

      tmp.width = ss*info.width;

      if(info.left) tmp.left = info.left*ss;
      if(info.top) tmp.top = info.top*ss;

      if(info.right) tmp.right = info.right*ss;
      if(info.bottom) tmp.bottom  =info.bottom*ss;

      return tmp;
    }


  }
})(window);

!$(function(){

  function appMoudle(){
    var _self = this;
    var $loadwrap = $('#loadingwrap'),
    $wrapper = $('#wrapper'),
    $pagers = $wrapper.find('#pagers'),
    $lists = $pagers.find('.lists'),
    $menu = $('#menu'),
    $nav = $('#ngs'),
    $menuwrap = $('#menuwrap'),
    $changes = $('#changes'),
    $sharebtn = $('#share-btn'),
    $downloadbtn = $('#download-btn'),
    $drivebtn = $('#drive-btn'),
    $sharewrap = $('#sharewrap'),
    $sharepop = $sharewrap.find('#sharepop'),
    $downloadwrap = $('#downloadwrap'),
    $downloadpop = $downloadwrap.find('#downloadpop'),
    $w = $(window),
    w = $w.width(),
    h = $w.height();
    this.PageArr = {};
    this.hashArr = ['home','lights','zun', 'shi', 'zhi', 'yu','Specifications','showsout', 'showsin', 'gallery','news','Activities','drives','search','Brochure'];
    var changesTimer;
    this.initLoader = function(){
      var allImgs = $('img[data-src]');

      var imgArr = _.uniq(
        allImgs.map(function(){
          if($(this).data('src')) return $(this).data('src');
        })
      );

      allImgs.each(function(){
        var $this = $(this),
        srcsource = $(this).data('src');

        if( srcsource )$this.attr('src', srcsource);
      })

      new ImageLoader(
        imgArr,
        function(){

          _self.init();
          $wrapper.removeClass('f-hide');
          $loadwrap.addClass('f-hide');
        }
      );
      // _self.init();


    }


    this.init = function(){
      _self.initPage();
      _self.initRouter();
      _self.Events();
    }

    this.initRouter = function(){

      var AppRouter = Backbone.Router.extend({
        initialize: function ( data ) {
            // console.log( "Route initialize" );
            var hash = location.hash.replace('#','');

            if( !hash ||   !this.routes[hash] ){
              location.hash = 'home';
            }
        },
        routes: {
            'home':'home',
            'lights':'lights',
            'zun':'zun',
            'shi':'shi',
            'zhi':'zhi',
            'yu':'yu',
            'Specifications':'Specifications',
            'showsout':'showsout',
            'showsin':'showsin',
            'gallery':'gallery',
            'news':'news',
            'Activities':'Activities',
            'drives':'drives',
            'search':'search',
            'Brochure':'Brochure'
        },
        home: function () {
            // console.log("home");
            _self.slider.goto(0);
            if( typeof homePage === 'function' ){
              if( !_self.PageArr['home'] ){
                _self.PageArr['home'] = new homePage( _self.slider );
              }
            }
        },
        lights: function(){
          // console.log("lights");
          _self.slider.goto(1);
          if( typeof lightsPage === 'function' ){
              _self.PageArr['lights'] = new lightsPage(_self.slider);
          }
        },
        zun: function(){
          // console.log("zun");
          _self.slider.goto(2);
          if( typeof zunPage === 'function' ){
              _self.PageArr['zun'] = new zunPage(_self.slider);
          }
        },
        shi: function(){
          _self.slider.goto(3);
          if( typeof shiPage === 'function' ){
              _self.PageArr['shi'] = new shiPage(_self.slider);
          }
        },
        zhi: function(){
          _self.slider.goto(4);
          if( typeof zhiPage === 'function' ){
              _self.PageArr['zhi'] = new zhiPage(_self.slider);
          }
        },
        yu: function(){
          _self.slider.goto(5);
          if( typeof yuPage === 'function' ){
              _self.PageArr['yu'] = new yuPage(_self.slider);
          }
        },
        Specifications: function(){
          _self.slider.goto(6);

          if( typeof configurationsPage === 'function' ){
              _self.PageArr['Specifications'] = new configurationsPage(_self.slider);
          }
        },
        showsout: function(){
          _self.slider.goto(7);

          if( typeof showsoutPage === 'function' ){
              _self.PageArr['showsout'] = new showsoutPage( _self.slider );
          }
        },
        showsin: function(){
          _self.slider.goto(8);
          if( typeof showsinPage === 'function' ){
              _self.PageArr['showsin'] = new showsinPage(_self.slider);
          }

        },
        gallery: function(){
          _self.slider.goto(9);
          if( typeof galleryPage === 'function' ){
              _self.PageArr['gallery'] = new galleryPage(_self.slider);
          }

        },
        news: function(){
          _self.slider.goto(10);
          if( typeof newsPage === 'function' ){
              _self.PageArr['news'] = new newsPage(_self.slider);
          }

        },
        Activities: function(){
          _self.slider.goto(11);
          if( typeof eventsPage === 'function' ){
              _self.PageArr['Activities'] = new eventsPage(_self.slider);
          }

        },
        drives: function(){
          _self.slider.goto(12);
          if( typeof drivesPage === 'function' ){
              _self.PageArr['drives'] = new drivesPage();
          }

        },
        search: function(){
          _self.slider.goto(13);
          if( typeof searchPage === 'function' ){
              if( !_self.PageArr['search'] ){
                _self.PageArr['search'] = new searchPage( _self.slider );
              }
          }
        },
        Brochure: function(){
          _self.slider.goto(14);
          if( typeof downloadPage === 'function' ){
              _self.PageArr['Brochure'] = new downloadPage();
          }

        }
      });

      _self.appRouter = new AppRouter();
      _self.appRouter.on('route',function( route , param ){
        // if( route == 'home' || route =='lights' || route == 'showsin') {
        //   $loadwrap.addClass('f-hide');
        // }else{
        //   $loadwrap.removeClass('f-hide');
        // }

        if($menuwrap.data('showed')){
          $menuwrap.removeClass('fadeInRight').addClass('fadeOutRight');
          setTimeout(function(){
            $menuwrap.removeClass('fadeOutRight')
                      .addClass('fadeInRight f-hide')
                      .find('ul ul').hide();
          },700);
          $menuwrap.data('showed',false);
        }

        if( route == 'gallery' || route == 'Brochure'){
          $downloadbtn.addClass('on').data('state',true);
        }else{
          $downloadbtn.removeClass('on').data('state',false);
        }
        $downloadpop.hide();

        switch (route){
          case 'zun':
            _self.changeStyle(0);
          break;
          case 'shi':
            _self.changeStyle(1);
          break;
          case 'zhi':
            _self.changeStyle(2);
          break;
          case 'yu':
            _self.changeStyle(3);
          break;
          default:
            _self.changeStyle(-1);
          break;
        }
      })
      Backbone.history.start();
    }

    this.changeStyle = function( index ){

      // clearTimeout(changesTimer);

      if( index < 0 ){

        $changes.addClass('f-hide')
          .find('.changelist')
            .removeClass('on');
      }else{

        $changes.removeClass('f-hide')
          .find('.changelist').eq( index )
            .addClass('on')
            .siblings()
            .removeClass('on');
        // changesTimer = setTimeout(function(){
        // },1000);

      }
    }

    this.initPage = function(){

      _self.slider = new pageSlide({
        wrap: $wrapper,
        list: $lists,
        menus: $nav.find('li'),
        cb: _self.cb
      });
    }

    this.cb = function( last , next ){

      if( last == 0  ){
        if(_self.PageArr['home']){
          $('#homePage').find('.content').empty()
            .end().find('.bg_imgs').removeClass('f-hide');
        }else{
          $('#homePage').find('.bg_imgs').removeClass('f-hide');
        }
      }else if( last == 13 ){


      }else{

        if( _self.hashArr[last] ){
          _self.PageArr[_self.hashArr[last]]  = {};
        }

      }

      if( next == 0  ){
        // _self.PageArr['home'].reset();
        $('#homePage').find('.content').empty()
          .end().find('.bg_imgs').removeClass('f-hide');


      }
    }

    this.appendContent = function( index ){

    }

  this.removeContent = function( index ){

  }
  this.Events = function(){

    $drivebtn.on('click',function(){
      if( !_self.slider.state )return false;
      try{ga('send', 'event', 'button', 'click', 'home_testdrive');}catch(e){}
    });

    $sharebtn.on('click',function(){
      $sharepop.show();
      $sharebtn.addClass('on');
    });

    $sharepop.on('mouseleave',function(){
      $sharepop.hide();
      $sharebtn.removeClass('on');
    })

    $downloadbtn.on('click',function(){
      var $this = $(this),
      dlstate = $this.data('state');

      if( !dlstate ) {
        $downloadpop.show();
        $downloadbtn.addClass('on');
        return false;
      }

    });

    $downloadpop.on('mouseleave',function(){
      $downloadpop.hide();
      $downloadbtn.removeClass('on');
    })

    $('#menu').on('click','a',function(){
      var $this = $(this),
      $ul = $this.next('ul'),
      tc = $this.data('tc');

      if( !_self.slider.state )return false;

      if($ul.length>0){
        if ( $ul.is(':hidden') ){
          $ul.show();
        }else{
          $ul.hide();
        }
      }

      if(tc){
        try{ga('send', 'event', 'button', 'click', tc );}catch(e){}
      }

    });

    $pagers.css({
      width: w - 79,
      height: h
    })
    _self.Csize($pagers.find('.bg_imgs'),1841,920,w-79,h);

    $w.on('resize',function(){
      w = $w.width();
      _self.slider.w = w-79;
      _self.slider.h = h = $w.height();

      // $lists.css({
      //   top: '-'+(h)+'px'
      // });

      $pagers.css({
        width: w - 79,
        height: h
      })

      _self.Csize($pagers.find('.bg_imgs'),1841,920,w-79,h);
    })

    $(document).on('mousewheel',function(event, delta, deltaX, deltaY){


        var page = _self.slider.index;
        // console.log(delta, deltaX, deltaY);
        if(delta>0){
          page = _self.slider.index - 1 < 0 ? 0 : _self.slider.index - 1;
        }else{
          page = _self.slider.index + 1 > _self.slider.listlen -1  ? _self.slider.listlen -1 : _self.slider.index + 1;
        }


        // console.log( _self.slider.state );

        if(_self.slider.state){
          // console.log( page , _self.slider.listlen );
          _self.appRouter.navigate( _self.hashArr[page] ,{trigger: true} );
        }

    });

    $('#menu-btn').on('click',function(){
      if($menuwrap.data('showed')){
        $menuwrap.addClass('f-hide');
        $menuwrap.data('showed',false);
      }else{
        $menuwrap.data('showed',true);
        $menuwrap.removeClass('f-hide');
      }
    });

    $changes.on('click','.changelist',function(){
      var $this = $(this),
      _index = $this.index();

      var trackcode = ['anchor_zunpc', 'anchor_shipc', 'anchor_zhipc', 'anchor_yupc'];

      var changesHash = _index + 2;

      if(  _self.slider.state ){

        try{ga('send', 'event', 'button', 'click', trackcode[_index]);}catch(e){}

        window.location.hash = _self.hashArr[ changesHash ];
      }
    });

    $nav.on('click','a',function(){
      if(  !_self.slider.state ) return false;
    });

  }

  this.Csize = function($S,ow,oh,w,h){
    if($S.length>0)$S.css(MG.Calculate(1841,920,w,h,true));
  }

  jQuery.validator.addMethod("Femail",function(value,element) {
      return this.optional(element) || (  /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value));
  },"请填写正确的邮箱!");

  jQuery.validator.addMethod("mobile",function(value,element) {
      var length = value.length;
      return this.optional(element) || ( length == 11 && /^((1[3,4,5,8,7]{1}[0-9]{1})+\d{8})$/.test(value));
  },"请正确填写您的手机号码!");

  }

  window.changePage = function( hash ){
    // console.log( hash );
    //hash 0123
    var pageArr = ['zun','shi','zhi','yu'];
    if( hash && pageArr[(hash-1)] ){
      window.location.hash = pageArr[(hash-1)];
    }
  }

  var app = new appMoudle();
  app.initLoader();

})
