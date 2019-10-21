(function(){

  function pageSlide( config ){
      var _self    = this;
      var $w       = $(window);
      this.wrap    = config && config.wrap;
      this.list    = config && config.list;
      this.listlen = this.list && this.list.length;
      this.menus   = config && config.menus;
      this.index   = (config && config.index ) ? config.index : 0;
      this.w       = $w.width()-79;
      this.h       = $w.height();
      this.state   = true;
      this.cb      = config && config.cb ;

      // console.log( this.index );

      var driveTotal = 3; //预约试驾 总页数
      var lightTotal = 4; //亮点 总页数
      var showsTotal = 3; //外观内饰 总页数
      var lightPos = 1; //亮点 位置
      var showsPos = 7; //亮点 位置

      this.menuAct = function(index){
        var _i = 0;
        if( index >= 12 ){
          _i = 6;
        }else if( index == 11){
          _i = 5;
        }else if( index == 10){
          _i = 4;
        }else if( index < 10 && index > 6){
          _i = 3;
        }else if( index == 6 ){
          _i = 2;
        }else if( index < 6 && index > 0){
          _i = 1;
        }else{
          _i = 0;
        }
        _self.menus.eq(_i).addClass('curr').siblings().removeClass('curr');
      }

      this.initSize = function(){

      }

      this.goto = function( goindex ){
          // console.log( 'goto index' );
          var index = goindex < 0 ? 0 : goindex > _self.listlen -1 ? _self.listlen - 1 : goindex;

          if( !_self.state  || _self.index == index ) return;

          var now =  _self.list.eq( _self.index );
          var next = _self.list.eq( index );


          // TweenMax.fromTo( now , 1, { css:{ top: 0 , left: 0 ,opacity: 1}  } , { css:{ top: 0, left: 0 ,opacity: 0} , onStart: _self.startAnimate ,  onComplete: _self.endAnimate , onCompleteParams: [ _self.index, index ,{ now: now , next: next }]});
          // TweenMax.fromTo( next , 1, { css:{ top: 0 , left:0 ,opacity: 0 }  } , {  delay: 1 ,css:{ top: 0 ,left: 0 ,opacity: 1} });

          TweenMax.fromTo( now , 0.5, { y: 0 , x: 0 ,opacity: 1 } , { y: 0, x: 0 ,opacity: 0 , onStart: _self.startAnimate ,  onComplete: _self.endAnimate , onCompleteParams: [ _self.index, index ,{ now: now , next: next }]});
          TweenMax.fromTo( next , 0.5, { y: 0 , x:0 ,opacity: 0   } , {  delay: 0.5 ,y: 0 ,x: 0 ,opacity: 1} );

          // if( index > _self.index  ){

          //     if( index > 1 && index < 6){
          //       TweenMax.fromTo( now , 1, { css:{ top: 0 , left: 0}  } , { css:{ top: 0, left: -(_self.w) } , onStart: _self.startAnimate ,  onComplete: _self.endAnimate , onCompleteParams: [ _self.index, index ,{ now: now , next: next }] });
          //       TweenMax.fromTo( next , 1, { css:{ top: 0 , left: _self.w }  } , { css:{ top: 0 ,left:0 } });
          //     }else{
          //       TweenMax.fromTo( now , 1, { css:{ top: 0 ,left: 0 }  } , { css:{ top: -(_self.h),left: 0 } , onStart: _self.startAnimate ,  onComplete: _self.endAnimate , onCompleteParams: [ _self.index, index ,{ now: now , next: next }] });
          //       TweenMax.fromTo( next , 1, { css:{ top: _self.h,left: 0 }  } , { css:{ top: 0,left: 0 } });
          //     }

          //     // console.log( '向下' );
          // }

          // if( index < _self.index  ){

          //     // console.log( index , _self.index );
          //     if(  index > 0 && index < 5 && _self.index <6 ){

          //       TweenMax.fromTo( now , 1, { css:{ top: 0 , left: 0}  } , { css:{ top: 0, left: _self.w } , onStart: _self.startAnimate ,  onComplete: _self.endAnimate , onCompleteParams: [ _self.index, index ,{ now: now , next: next }] });
          //       TweenMax.fromTo( next , 1, { css:{ top: 0 , left: -(_self.w) }  } , { css:{ top: 0 ,left:0 } });
          //     }else{

          //       TweenMax.fromTo( now , 1, { css:{ top: 0, left: 0 }  } , { css:{ top: _self.h , left: 0} , onStart: _self.startAnimate , onStartParams: [ _self.index, index],  onComplete: _self.endAnimate , onCompleteParams: [ _self.index, index ,{ now: now , next: next }] });
          //       TweenMax.fromTo( next , 1, { css:{ top: -(_self.h) ,left: 0 }  } , { css:{ top: 0 ,left: 0 } });
          //     }

          //     // console.log( '向上' );
          // }

      }
      this.startAnimate = function( now , next ){

          _self.state = false;
      }
      this.endAnimate = function( now , next , pages ){

          // console.log(now)

          if( now == 0 ){
          }else if( now == 13 ){
          }else{
            _self.list.eq( now ).find('.content').empty();
          }
          _self.list.eq( next ).addClass('curr').siblings().removeClass('curr');
          _self.menuAct( next );
          _self.state = true;
          _self.index = next;

          _self.cb( now , next );
      }

      ;(function(){
        _self.menuAct( _self.index );
        _self.list.eq( _self.index ).addClass('curr');
      })();


  }

  window.pageSlide = pageSlide;

})(window)
