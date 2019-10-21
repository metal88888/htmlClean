;(function(){
  var firststate = true;
  function orientationChange(){
    var Ww = window.innerWidth,
    Wh = window.innerHeight;
    if(window.orientation==180 || window.orientation==0 || Ww<Wh){
      ChangeOrientEvent( true );
    }
    if(window.orientation==90 || window.orientation==-90 || Ww>Wh){
      ChangeOrientEvent( false );
    }

  };
  var pagerWrap = document.getElementById('pagerWrap'),
  orientationWrap = document.getElementById('orientationWrap'),
  orienttime;
  // function setCanvas(Ww,Wh){
  //   firststate = false;
  //   var allCanvas = document.getElementsByTagName('canvas');

  //   for(var i=0 ; i<allCanvas.length; i++){
  //     var thiscanvas = allCanvas[i];
  //     thiscanvas.width = Ww;
  //     thiscanvas.height = Wh;

  //   }
  // }

  function ChangeOrientEvent(state){

    // alert(state);
    // window.scrollTop(0);
    if(state){
      pagerWrap.className = 'f-hide';
      orientationWrap.className = '';
    }else{
      pagerWrap.className = '';
      orientationWrap.className = 'f-hide';
    }

  }

  window.addEventListener( "onorientationchange" in window ? "orientationchange" : "resize", function(){
    clearTimeout(orienttime);
    orienttime = setTimeout(orientationChange,20);
  }, false);

  orientationChange();
})();
