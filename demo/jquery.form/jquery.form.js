;(function ($) {
	/*
	 汉字：/[\u4e00-\u9fa5]+/g
	 * */
	/*
	 $.watch(callback) 表单监听
	 1、如果当前值等于before（之前的值） 则不作处理 本次监听结束， 如果不等于执行第2步。
	 2、如存在callback ,则执行callback(_this,val) val为当前值 如果不存在则 本次监听结束。
	 * */
	$.fn.watch = function(callback) { 
		return this.each(function() {
			/*缓存以前的值*/
			var  before = $(this).val();
			$(this).on('keyup paste', function() {
				var _this = $(this),
					val =  _this.val();
				if(before !== val){
					callback ? callback(_this,_this.val()) : '';
					before = _this.val();					
				}
			});
		});
	}
	
	/*
	 $.inputOnlyNumber(callback) 只允许输入数字
	 1、执行$.watch(callback1); 通过callbck进入第2步
	 2、如果存在非数字字符，则删除非数字字符
	 2、如存在callback ,则执行callback(_this,val) val为当前值 如果不存在则 本次监听结束。
	 * */
	var reg_tel = /^1[3|4|5|7|8][0-9]\d{8}$/ig;
	var reg_nonumber = /\D/ig; //非数字字符
	
	$.fn.inputOnlyNumber = function (callback) {
		return  this.watch(function (_this,val) {
			if(reg_nonumber.test(val)){ /* 存在非数字字符 ？ 删除 ：else;*/
				_this.val(val.replace(reg_nonumber,''));
			}
			callback ? callback(_this,_this.val()) : '';
		})
	};
	
	/*
	 $.inputOnlyTel(callback) 只允许输入 0-11位 符合手机号 的数字
	 1、执行$.inputOnlyNumber(callback1); 通过callbck进入第2步
	 2、val_onlytel = _this.val();
	 	如果 val_onlytel 中有符合规则的字符串，
	 		则将符合规则的字符串赋值给 val,执行 callback并结束本次监听，
	 	如果不存在，则执行第3步
	 3、将input.val 设为空字符串,并执行callback;
	 * */
	var reg_onlytel = /(1[3|4|5|7|8][0-9]\d{0,8})|(1[3|4|5|7|8])|(1)/ig; /*1-11手机号*/
	$.fn.inputOnlyTel = function (callback) { /*只允许输入 0-11位 符合手机号 的数字*/
		return this.inputOnlyNumber(function (_this,val) {
			if(val.length<1){return false;}
			var judeg = reg_onlytel.test(val),
				val_alert = judeg ? val.match(reg_onlytel)[0] : '' ;
			_this.val(val_alert);
			callback ? callback(_this,'',false) : '';
		})
	}
	
	/*
	 $.inputOnlyEmail(callback) 只允许输入 符合邮箱 的字符串
	 1、执行$.watch(callback1); 通过callbck进入第2步
	 2、步骤同 inputOnlyTel
	 * */
	var reg_onlyemail = /([a-zA-Z0-9]+\w*@\w+\.[a-zA-Z]{0,6}\.?[a-zA-Z]{0,4})|([a-zA-Z0-9]+\w*@?\w*)/ig;
	$.fn.inputOnlyEmail = function (callback) { /*只允许输入 符合邮箱 的字符串*/
		return this.watch(function (_this,val) {
			if(val.length<1){return false;}
			var judeg =  reg_onlyemail.test(val),
				val_alert = judeg ? val.match(reg_onlyemail)[0] : '' ; 
			_this.val(val_alert);
			callback ? callback(_this ,val_alert,judeg) : '' ;
		})
	}
	
	/*
	 $.inputJudeg
	 * */
	
})(typeof jQuery != 'undefined' ? jQuery :  Zepto );
