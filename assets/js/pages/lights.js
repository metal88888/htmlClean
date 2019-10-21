;(function(){

  function LightsPage( slide ){
    var _self = this;
    this.wrap = $('#lightsPage');
    this.slide = slide;
    this.content = _self.wrap.find('.content');

    var html = '<div id="lightsPlayer"></div>';

    this.content.html(html);

    var $w = $(window),
    w = $w.width()-79,
    h = $w.height();

    var info = MG.Calculate(1841,920,w,h,true);

    var flashvars={
    };
    var params = {
      wmode:"Transparent",
      allowScriptAccess: "sameDomain"
    };
    var attributes = {
        id:"lightsPlayer"
    };

    swfobject.embedSWF("assets/images/pagers/lights/page2.swf", "lightsPlayer", info.width, info.height, "10.0.0", "assets/flash/expressInstall.swf",  flashvars,params, attributes);

    $w.on('resize', swfresize);

    function swfresize(){
      w = $w.width()-79;
      h = $w.height();

      info = MG.Calculate(1841,920,w,h,true);
      $('#lightsPlayer').css(info);
    }

    swfresize();

  }
  window.lightsPage = LightsPage;
})(window);
