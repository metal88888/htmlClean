define(['cookie' ], function ( Cookies ) {
    var utms = ['utm_source','utm_medium','utm_campaign','utm_content'];
    var utmsObj = {};
    for( key in utms ){
      var Uval = Cookies.get( utms[key] );
      if( Uval )  utmsObj[ utms[key] ] = Uval;
    }
    return utmsObj;
})
