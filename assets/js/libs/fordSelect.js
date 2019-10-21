  //省市联动
  (function(){

    function fordSelect(options){
      var that = this;

      this.global_data = options.data;

      this.$province = options.province || $('#province');
      this.$city = options.city || $('#city');
      this.$dealer = options.dealer || $('#dealer');

      this.options = options;

      this.options.selects = {
        province: null,
        city: null,
        dealer: null
      };

      this.init();
    };
    fordSelect.prototype.resetform = function(){
      this.options.selects = {
        province: null,
        city: null,
        dealer: null
      };

      this.initProvince();
      this.initCity();
      this.initDealer();

    }

    fordSelect.prototype.init = function(){
      var _self = this;

      var selects = _self.options.selects;

      if(_self.options.province) {
        this.initProvince()
      }

      if(_self.options.city) {
        this.initCity();
      }
      _self.$province.on('change',function(){
          var $this = $(this);
          _self.options.selects.city = null;
          _self.options.selects.dealer = null;
          _self.options.selects.province = $this.val();

          _self.initProvince();
          _self.initCity();
          _self.initDealer();

      });

      _self.$city.on('change',function(){
          var $this = $(this);
          _self.options.selects.city = $this.val();
          _self.options.selects.dealer = null;
          _self.initCity(true);
          _self.initDealer();
      });


      if(_self.options.dealer) {
        this.initDealer();

        _self.$dealer.on('change',function(){
            var $this = $(this);
            _self.options.selects.dealer = $this.val();
            _self.initDealer(true);

            var dealers =  _.filter(_self.global_data[selects.province][selects.city], function(data){

                return ( selects.dealer == '' ? true : (selects.dealer == data.name) ? true : false ) ? true : false;
            });
            if( typeof _self.options.dealerCallback =='function'){
              _self.options.dealerCallback(dealers);
            }
        });

      }

    };
    fordSelect.prototype.initProvince = function(){
      var _self = this;
      var html = '<option value="">省份</option>';
      _.each(_.keys(_self.global_data),function(v,k){
          html += '<option value="'+v+'">'+v+'</option>';
      });

      if(_self.options.selects.province){
        _self.$province.prevAll('span').html(_self.options.selects.province);
      }else{
        _self.$province.html(html).prevAll('span').html('');
      }
    };
    fordSelect.prototype.initCity = function(refresh){
      var _self = this;
      var html = '<option value="">城市</option>';
      var selects = _self.options.selects;

      if(!refresh){

        if(selects.province){
          _.each(_.keys(_self.global_data[selects.province]),function(v,k){
              html += '<option value="'+v+'">'+v+'</option>';
          });
        }
        _self.$city.html(html).prevAll('span').html(selects.city ? selects.city : '');

      }else{
        _self.$city.prevAll('span').html(selects.city ? selects.city : '');
      }

    };
    fordSelect.prototype.initDealer = function(refresh){
      var _self = this;
      var html = '<option value="">选择经销商</option>';

      var selects = _self.options.selects;

      // console.log(selects);

      if(!refresh){

        if(selects.province && selects.city ){

          _.each(_self.global_data[selects.province][selects.city],function(v,k){
              html += '<option value="'+v.name+'">'+v.name+'</option>';
          });
        }
        _self.$dealer.html(html).prevAll('span').html(selects.dealer ? selects.dealer : '');
      }else{

        _self.$dealer.prevAll('span').html(selects.dealer ? selects.dealer : '');
      }

    };

    window.fordSelect = fordSelect;

  })();
