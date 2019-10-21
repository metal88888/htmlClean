;(function(){

  function NewsPage( slide ){
    var _self = this;
    this.slide = slide;
    this.wrap = $('#newsPage');

    this.init = function(){
      var wraphtml = ' \
          <div class="necontentwrap animated fadeIn">\
            <div class="titles"><img src="assets/images/pagers/news/title.png" height="126" width="1082" alt=""></div>\
            <div class="news-prev"></div>\
            <div class="news-next"></div>\
            <div class="ne-main clearfix">'+initNewsLists()+'</div>\
          </div>\
          ';

      $('#loadingwrap').removeClass('f-hide');
      this.wrap.find('.content').html(wraphtml).imagesLoaded(function(){

        _self.Event();

        _self.wrap.find('.ne-main').cycle({
          fx: 'scrollHorz',
          timeout: 0,
          slideExpr: '.ne-lists',
          prev: '.news-prev',
          next: '.news-next'
        });

        $('#loadingwrap').addClass('f-hide');


      })
    }

    this.init();

    this.Event = function(){

      _self.wrap.off('.list').on('mouseenter.list mouseleave.list click.list','.list',function(e){
        var $this = $(this),
        _index = $this.data('newsid'),
        _indexid = $this.data('nid');

        if(e.type == 'mouseenter'){
          $this.addClass('on');
        }

        if(e.type == 'mouseleave'){
          $this.removeClass('on');
        }

        if(e.type == 'click'){

          initNewsDetail(_index);

          return false;

        }
      });
      $(document).off('.detailclose').on('click.detailclose','#news-detail-close',function(e){

        _self.slide.state = true;

        $('#news-detail-wrap').remove();
        $('#popup_mask').remove();

        return false;
      });

    }

    function initNewsDetail( index ){


      _self.slide.state = false;

      var html = '<div id="news-detail-wrap" class="animated fadeIn f-hide"><div id="news-detail-close"></div>';
      html += '<div class="news-detail-title"> '+newslist[index].title+' </div>';
      html += '<div class="scroll-wrap">'+newslist[index].detail+'</div>';
      html += '</div>';
      if($('#popup_mask').length == 0 ){
        html += '<div id="popup_mask"></div>';
      }

      $('#loadingwrap').removeClass('f-hide');

      $('body').append(html);

      var $newsdetailwrap = $('#news-detail-wrap');
      var $w = $(window),
      w = $w.width(),
      h = $w.height();

      $newsdetailwrap.imagesLoaded(function(){
        $newsdetailwrap.removeClass('f-hide');
        var titleHeight = $newsdetailwrap.find('.news-detail-title').height();

        $newsdetailwrap.find('.scroll-wrap')
          .height( h - 150 - titleHeight )
          .mCustomScrollbar({

          });
        $('#loadingwrap').addClass('f-hide');
      });


    }

    function initNewsLists(){
      var html = '';
      if(newslist.length <= 3){
        $('.news-prev,.news-next').hide();
      };

      $.each(newslist,function(k,v){

        if(newslist.length > 3){

          if( k % 3 == 0){
            if(k > 0){
              html += '</div><div class="ne-lists clearfix">';
            }else{
              html += '<div class="ne-lists clearfix">';

            }
          }

          var lastv = ((k-2)%3 == 0) ? 'last' : '';
          html += '<div class="list '+lastv+'" data-nid="'+v.id+'" data-newsid="'+k+'">';
          html += '<div class="up-wrap">';
          html += '  <div class="news-title">'+v.title+'</div>';
          html += '  <div class="news-info">'+v.timestamp+'</div>';
          html += '</div>';
          html += '<div class="news-img">';
          html += v.cover;
          html += '</div>';
          html += '<div class="news-desc">';
          html += v.thumb;
          html += '</div>';
          html += '<div class="morebtn">';
          // html += '  <img src="assets/images/news/more.png" height="30" width="83" alt="">';
          html += '  <span>了解详情</span>';
          html += '</div>';
          html += '</div>';

        }else{

          if( k == 0){
              html += '<div class="ne-lists clearfix">';
          }

          var lastv = ((k-2)%3 == 0) ? 'last' : '';

            html += '<div class="list '+lastv+'" data-nid="'+v.id+'" data-newsid="'+k+'">';
            html += '<div class="up-wrap">';
            html += '  <div class="news-title">'+v.title+'</div>';
            html += '  <div class="news-info">'+v.timestamp+'</div>';
            html += '</div>';
            html += '<div class="news-img">';
            html += v.cover;
            html += '</div>';
            html += '<div class="news-desc">';
            html += v.thumb;
            html += '</div>';
            html += '<div class="morebtn">';
            html += '  <span>了解详情</span>';
            html += '</div>';
            html += '</div>';


          if( k == 2){
            html += '</div>';
          }
        }

      });

      return html;

    }

  }
  function EventsPage( slide ){
    var _self = this;
    this.slide = slide;
    this.wrap = $('#eventsPage');

    this.init = function(){
      var wraphtml = ' \
          <div class="necontentwrap animated fadeIn">\
            <div class="titles"><img src="assets/images/pagers/events/title.png" height="132" width="1082" alt=""></div>\
            <div class="news-prev"></div>\
            <div class="news-next"></div>\
            <div class="ne-main clearfix">'+initEventsLists()+'</div>\
          </div>\
          ';

      $('#loadingwrap').removeClass('f-hide');

      this.wrap.find('.content').html(wraphtml).imagesLoaded(function(){

        _self.Event();

        _self.wrap.find('.ne-main').cycle({
          fx: 'scrollHorz',
          timeout: 0,
          slideExpr: '.ne-lists',
          prev: '.news-prev',
          next: '.news-next'
        });

        if(eventslist.length <= 3){
          $('.news-prev,.news-next').hide();
        };

        $('#loadingwrap').addClass('f-hide');

      });


    }

    this.init();

    this.Event = function(){

      _self.wrap.off('.list').on('mouseenter.list mouseleave.list click.list','.list',function(e){
        var $this = $(this),
        _index = $this.data('newsid'),
        _indexid = $this.data('nid');

        if(e.type == 'mouseenter'){
          $this.addClass('on');
        }

        if(e.type == 'mouseleave'){
          $this.removeClass('on');
        }

        if(e.type == 'click'){

          initEventsDetail( _index );

          return false;

        }
      });
      $(document).off('.detailclose').on('click.detailclose','#news-detail-close',function(e){

        console.log('222222222');

        _self.slide.state = true;

        $('#news-detail-wrap').remove();
        $('#popup_mask').remove();

        return false;
      });

    }

    function initEventsDetail( index ){

      _self.slide.state = false;

      var html = '<div id="news-detail-wrap" class="animated fadeIn"><div id="news-detail-close"></div>';
      html += '<div class="news-detail-title"> '+eventslist[index].title+' </div>';
      html += '<div class="scroll-wrap">'+eventslist[index].detail+'</div>';
      html += '</div>';
      if($('#popup_mask').length == 0 ){
        html += '<div id="popup_mask"></div>';
      }

      $('body').append(html);

      var $newsdetailwrap = $('#news-detail-wrap');
      var $w = $(window),
      w = $w.width(),
      h = $w.height();

      $('#loadingwrap').removeClass('f-hide');

      $newsdetailwrap.imagesLoaded(function(){
        $newsdetailwrap.removeClass('f-hide');
        var titleHeight = $newsdetailwrap.find('.news-detail-title').height();

        $newsdetailwrap.find('.scroll-wrap')
          .height( h - 150 - titleHeight )
          .mCustomScrollbar({

          });
      });

      $('#loadingwrap').addClass('f-hide');

    }

    function initEventsLists(){
      var html = '';

      $.each(eventslist,function(k,v){

        if(eventslist.length > 3){

          if( k % 3 == 0){
            if(k > 0){
              html += '</div><div class="ne-lists clearfix">';
            }else{
              html += '<div class="ne-lists clearfix">';

            }
          }

          var lastv = ((k-2)%3 == 0) ? 'last' : '';
          html += '<div class="list '+lastv+'" data-nid="'+v.id+'" data-newsid="'+k+'">';
          html += '<div class="up-wrap">';
          html += '  <div class="news-title">'+v.title+'</div>';
          html += '  <div class="news-info">'+v.timestamp+'</div>';
          html += '</div>';
          html += '<div class="news-img">';
          html += v.cover;
          html += '</div>';
          html += '<div class="news-desc">';
          html += v.thumb;
          html += '</div>';
          html += '<div class="morebtn">';
          // html += '  <img src="assets/images/news/more.png" height="30" width="83" alt="">';
          html += '  <span>了解详情</span>';
          html += '</div>';
          html += '</div>';

        }else{

          if( k == 0){
              html += '<div class="ne-lists clearfix">';
          }

          var lastv = ((k-2)%3 == 0) ? 'last' : '';

            html += '<div class="list '+lastv+'" data-nid="'+v.id+'" data-newsid="'+k+'">';
            html += '<div class="up-wrap">';
            html += '  <div class="news-title">'+v.title+'</div>';
            html += '  <div class="news-info">'+v.timestamp+'</div>';
            html += '</div>';
            html += '<div class="news-img">';
            html += v.cover;
            html += '</div>';
            html += '<div class="news-desc">';
            html += v.thumb;
            html += '</div>';
            html += '<div class="morebtn">';
            html += '  <span>了解详情</span>';
            html += '</div>';
            html += '</div>';


          if( k == 2){
            html += '</div>';
          }
        }

      });

      return html;

    }

  }

  window.newsPage = NewsPage;
  window.eventsPage = EventsPage;
})(window);
