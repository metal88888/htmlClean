define(['jquery'], function () {

  var LayoutMode=function(){

  }
  /**
  指定对象进行缩放到指定指定的div对象的宽高内
  */
  LayoutMode.CalculateObjToObj=function(_div,_div2,_type){
    var div=$(_div);
    var div2=$(_div2);
    var ow=div.width();
    var oh=div.height();

    var w=div2.width();
    var h=div2.height();

    var type=!_type?LayoutMode.OUTSIDE:_type;

    var temp={width:0,height:0,left:0,top:0};
    var sw=w/ow;
    var sh=h/oh;
    var ss=1
    if(type==LayoutMode.OUTSIDE)ss=Math.max(sw,sh);
    else if(type==LayoutMode.INSIDE)ss=Math.min(sw,sh);
    else ss=Math.max(sw,sh);

    temp.width=ss*ow
    temp.height=ss*oh
    temp.left=(w-temp.width)/2;
    temp.top=(h-temp.height)/2;

    //是自己父级
    if(div.parent()[0]==div2[0]){
      //trace('无需调整坐标偏移')
    }
    //是自己同级别
    else if(div.parent()[0]==div2.parent()[0]){
      var offset = div2.position();
      // trace(offset)
      temp.left=temp.left+offset.left
      temp.top=temp.top+offset.top;
    }
    //其它级别
    else
    {
      // trace('其它级别')
      var offset = div2.offset();
      var offset2= div.parent().offset();
      // trace(offset,offset2,div)
      temp.left=temp.left+offset.left-offset2.left
      temp.top=temp.top+offset.top-offset2.top;
    }

    div.css({position: 'absolute'})
    div.css(temp);
    return temp;
  }
  /**
  指定对象进行缩放到指定比例
  */
  LayoutMode.CalculateProportionObj=function(_div,w,h,_type){
    var div=$(_div);
    var ow=div.width();
    var oh=div.height();

    var type=!_type?LayoutMode.OUTSIDE:_type;
    // trace('CalculateProportion:',type)
    var temp={width:0,height:0,left:0,top:0};
    var sw=w/ow;
    var sh=h/oh;
    var ss=1
    if(type==LayoutMode.OUTSIDE)ss=Math.max(sw,sh);
    else if(type==LayoutMode.INSIDE)ss=Math.min(sw,sh);
    else ss=Math.max(sw,sh);

    temp.width=ss*ow
    temp.height=ss*oh
    temp.left=(w-temp.width)/2;
    temp.top=(h-temp.height)/2;
    div.css({position: 'absolute'})
    div.css(temp);
    return temp;
  }
  /**
  计算出自动适应宽高后的数据
  */
  LayoutMode.CalculateProportion=function(ow,oh,w,h,_type){
    var type=!_type?LayoutMode.OUTSIDE:_type;
    // trace('CalculateProportion:',type)
    var temp={width:0,height:0,left:0,top:0};
    var sw=w/ow;
    var sh=h/oh;
    var ss=1
    if(type==LayoutMode.OUTSIDE)ss=Math.max(sw,sh);
    else if(type==LayoutMode.INSIDE)ss=Math.min(sw,sh);
    else ss=Math.max(sw,sh);

    temp.width=ss*ow
    temp.height=ss*oh
    temp.left=(w-temp.width)/2;
    temp.top=(h-temp.height)/2;
    return temp;
  }
  LayoutMode.OUTSIDE='outSide';//铺满显示
  LayoutMode.INSIDE='inSide';//全部显示

  return LayoutMode;


})
