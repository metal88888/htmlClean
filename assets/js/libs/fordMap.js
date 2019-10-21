//baidu 地图
(function(){
    var fordMap = function(){
        this.map       = null;
        //标注点数组
        this.markerArr = new Array();
        this.icon      = { w: 23, h: 25, l: 0, t: 0, x: 6, lb: 5 };

        this.init();
    };
    fordMap.prototype.init = function(){
        var _self = this;
        _self.map     = new BMap.Map("dituContent");
        _self.map.centerAndZoom(new BMap.Point(60, 65), 4);

    };
    fordMap.prototype.create = function(data){
        var _self = this;

        _self.markerArr = data;

        var lat = (_self.markerArr.length && _self.markerArr[0]) ? _self.markerArr[0].lat : '116.30887';
        var lng = (_self.markerArr.length && _self.markerArr[0]) ? _self.markerArr[0].lng : '39.85744';


        _self.map.centerAndZoom(new BMap.Point(lng,lat), 10);

        _self.setMapEvent();
        _self.addMapControl();
        _self.addMarker();
    };
    fordMap.prototype.setMapEvent = function(){//地图事件设置函数：
        var _self = this;
        var _map = _self.map;
        _map.enableDragging(); //启用地图拖拽事件，默认启用(可不写)
        _map.enableScrollWheelZoom(); //启用地图滚轮放大缩小
        _map.enableDoubleClickZoom(); //启用鼠标双击放大，默认启用(可不写)
        _map.enableKeyboard(); //启用键盘上下左右键移动地图
    };
    fordMap.prototype.addMapControl = function(){//地图控件添加函数
        var _self = this;
        var _map = _self.map;

        //向地图中添加缩放控件
        var ctrl_nav = new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_LARGE });
        _map.addControl(ctrl_nav);
        //向地图中添加缩略图控件
        var ctrl_ove = new BMap.OverviewMapControl({ anchor: BMAP_ANCHOR_BOTTOM_RIGHT, isOpen: 1 });
        _map.addControl(ctrl_ove);
        //向地图中添加比例尺控件
        var ctrl_sca = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT });
        _map.addControl(ctrl_sca);
    };

    fordMap.prototype.addMarker = function(){//地图marker标记点
        var that = this;

        //创建InfoWindow
        function createInfoWindow(i) {
            var json = that.markerArr[i];
            var htmlcode = "<b class='iw_poi_title' title='" + json.name + "'>" + json.name + "</b><div class='iw_poi_content'>店面地址：" + json.address + "</div>" + "<div class='iw_poi_content'>联系电话：" + json.phone + "</div>";
            var iw = new BMap.InfoWindow(htmlcode);
            return iw;
        }
        //创建一个Icon
        function createIcon(json) {
            var icon = new BMap.Icon("http://api.map.baidu.com/images/marker_red.png", new BMap.Size(json.w, json.h), { imageOffset: new BMap.Size(-json.l, -json.t), infoWindowOffset: new BMap.Size(json.lb + 5, 1), offset: new BMap.Size(json.x, json.h) })
            return icon;
        }
        _.each(that.markerArr,function(v,i){
            var icon    = that.icon;
            var json    = v;
            var point   = new BMap.Point(json.lng, json.lat);
            var iconImg = createIcon(icon);
            var marker  = new BMap.Marker(point, { icon: iconImg });
            var iw      = createInfoWindow(i);
            var label   = new BMap.Label(json.name, { "offset": new BMap.Size(icon.lb - icon.x + 10, -20) });
            marker.setLabel(label);
            that.map.addOverlay(marker);
            label.setStyle({
                borderColor: "#808080",
                color: "#333",
                cursor: "pointer"
            });

            (function () {
                var index = i;
                var _iw = createInfoWindow(i);
                var _marker = marker;
                _marker.addEventListener("click", function () {
                    this.openInfoWindow(_iw);
                });
                _iw.addEventListener("open", function () {
                    _marker.getLabel().hide();
                })
                _iw.addEventListener("close", function () {
                    _marker.getLabel().show();
                })
                label.addEventListener("click", function () {
                    _marker.openInfoWindow(_iw);
                })
                if (!!json.isOpen) {
                    label.hide();
                    _marker.openInfoWindow(_iw);
                }
            })();
        });
    };

    window.fordMap = fordMap;
})();
