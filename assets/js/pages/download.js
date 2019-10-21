;(function(){

  function DownloadPage(){
    var _self = this;
    this.wrap = $('#downloadPage');
    this.content = _self.wrap.find('.content');
    this.html = '<div id="dlwrap" class="animated fadeIn">\
        <div class="titles">\
          <img src="assets/images/pagers/download/title.png" width="301" height="78" alt="" />\
        </div>\
      </div>';

    this.dlBtn = $('#download-btn');


        // <div id="dl-btn">\
        //   <a href="dl.php?file=11" target="_blank"><img src="assets/images/pagers/download/pdf.png" width="95" height="101" alt="" /></a>\
        // </div>\

    this.initEvent = function(){
      var $w = $(window);

      function setPos (){
        var w = $w.width(),
        h     = $w.height();
        var imgPos = MG.Calculate(1841,920,w-79,h,true);
        var mv = 100 + imgPos.left < 0 ? 50 : 100 + imgPos.left;
        $('#dlwrap').css({
          left: mv
        });
      }
      $w.off('.download' )
        .on('resize.download', setPos );
      setPos();
    }


    !(function(){
      _self.content.html(_self.html).imagesLoaded(function(){
        _self.initEvent();
        $('#loadingwrap').addClass('f-hide');
        _self.dlBtn.attr('href','dl.php?file=11');
      });
    })();
  }

  window.downloadPage = DownloadPage;
})(window);
