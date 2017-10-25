;(function () {
	/*
	 不可删除的 添加多个onresize
	 * */
	window.onResize = function (fun) {
		if(!fun || fun && !(fun instanceof Function)){return false;}
		var defaults = window.onresize;
		window.onresize = defaults ? 
						function (e) {
							defaults(e);
							fun(e);
						}:
						fun;
	}
	/*
	 可删除指定的 添加  window.onresize 
	 * */
	var resize_arr = [],
		resize_naming = 0;
	window.addResize = function (fun) {
		if(!fun || fun && !(fun instanceof Function) ){return false;}
		var name  = fun.name ? fun.name : 'undefined_'+resizeNaming();
		var o = {"name":name,'callback':fun};
		resize_arr.push(o);
		window.onresize = integrationCallback(resize_arr);
	};
	function resizeNaming() {/*给予 onresize 接收的匿名函数命名 */
		return ++resize_naming;
	}
	
	function integrationCallback(arr) {
		console.log('>> length = ',arr.length,arr);
		if(!arr || arr && !(arr instanceof Array)){return false;}
		var len = arr.length,
			f;
		switch(len){
			case 0:
				f = undefined;
				break;
			case 1:
				f = arr[0].callback;
				break;
			default:
				for(var i = 0;i<len;i++){
					f = f ? eachAddFunction(f,arr[i].callback,i) : arr[i].callback;
				};
		};
		return f;
	};
	function eachAddFunction (f,fun,i) { /*将fun()跟f()合并*/
		if(!f|| f && !(f instanceof Function) || !fun || fun && !(fun instanceof Function) ){return false;}
		return function(e){
			f(e);
			fun(e);
		};
	}
	
	/*
		 移除指定的window.onresize
		k参数：
		 	function		Function
		 	name	string
		 	数组索引			ini
	*/
	
	window.removeResize = function (k){
		if(!k && typeof k != 'number'){return false;}
		var i = 0,
			arr = resize_arr,
			len = arr.length,
			funkey;
		if (k instanceof Function && k.name){
			funkey = k.name;
		}else if(typeof k == 'string'){
			funkey = k ;
		}else if(typeof k == 'number'){
			if(k>=len || k<0){return false;}
			resize_arr.splice(k,1);
			window.onresize = integrationCallback(resize_arr);
			return true;
		}else{
			return false;
		}
		for(i;i<len;i++){
			if(funkey == arr[i].name){
				resize_arr.splice(i,1);
				window.onresize = integrationCallback(resize_arr);
				return false;
			}
		}
		return true;
	};
	
})();
