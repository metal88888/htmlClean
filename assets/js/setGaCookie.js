(function(window){
  var qs = (function(search) {
    if(!search) return {};
    var a =  (search.split('?'))[1].split('&');
    var b = {};
    for (var i = 0; i < a.length; ++i) {
        var p=a[i].split('=', 2);
        if (p[1]) p[1] = decodeURIComponent(p[1].replace(/\+/g, " "));
        b[p[0]] = p[1];
    }
    return b;
  })(window.location.search);
  var utms = ['utm_source','utm_medium','utm_campaign','utm_content'];
  for( key in utms ){
    if( qs && qs[ utms[key] ]){
      setcookie( utms[key] ,qs[ utms[key] ]);
    }
  }
  function setcookie(name,value){
    var Days = 1;
    var exp  = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
  }

  window.getCookie = function(NameOfCookie) {
    if (document.cookie.length > 0) {
      begin = document.cookie.indexOf(NameOfCookie + "=");
      if (begin != -1) {
        begin += NameOfCookie.length + 1;
        end = document.cookie.indexOf(";", begin);
      if (end == -1) end = document.cookie.length;
        return unescape(document.cookie.substring(begin, end));
      }
    }
    return null;
  }

})(window);
