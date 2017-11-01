//;(function () {
//	/*
//	 不可删除的 添加多个onresize
//	 * */
//	window.onResize = function (fun) {
//		if(!fun || fun && !(fun instanceof Function)){return false;}
//		var defaults = window.onresize;
//		window.onresize = defaults ? 
//						function (e) {
//							defaults(e);
//							fun(e);
//						}:
//						fun;
//	}
//	/*
//	 可删除指定的 添加  window.onresize 
//	 * */
//	var resize_arr = [],
//		resize_naming = 0;
//	window.addResize = function (fun) {
//		if(!fun || fun && !(fun instanceof Function) ){return false;}
//		var name  = fun.name ? fun.name : 'undefined_'+resizeNaming();
//		var o = {"name":name,'callback':fun};
//		resize_arr.push(o);
//		window.onresize = integrationCallback(resize_arr);
//	};
//	function resizeNaming() {/*给予 onresize 接收的匿名函数命名 */
//		return ++resize_naming;
//	}
//	
//	function integrationCallback(arr) {
//		console.log('>> length = ',arr.length,arr);
//		if(!arr || arr && !(arr instanceof Array)){return false;}
//		var len = arr.length,
//			f;
//		switch(len){
//			case 0:
//				f = undefined;
//				break;
//			case 1:
//				f = arr[0].callback;
//				break;
//			default:
//				for(var i = 0;i<len;i++){
//					f = f ? eachAddFunction(f,arr[i].callback,i) : arr[i].callback;
//				};
//		};
//		return f;
//	};
//	function eachAddFunction (f,fun,i) { /*将fun()跟f()合并*/
//		if(!f|| f && !(f instanceof Function) || !fun || fun && !(fun instanceof Function) ){return false;}
//		return function(e){
//			f(e);
//			fun(e);
//		};
//	}
//	
//	/*
//		 移除指定的window.onresize
//		k参数：
//		 	function		Function
//		 	name	string
//		 	数组索引			ini
//	*/
//	
//	window.removeResize = function (k){
//		if(!k && typeof k != 'number'){return false;}
//		var i = 0,
//			arr = resize_arr,
//			len = arr.length,
//			funkey;
//		if (k instanceof Function && k.name){
//			funkey = k.name;
//		}else if(typeof k == 'string'){
//			funkey = k ;
//		}else if(typeof k == 'number'){
//			if(k>=len || k<0){return false;}
//			resize_arr.splice(k,1);
//			window.onresize = integrationCallback(resize_arr);
//			return true;
//		}else{
//			return false;
//		}
//		for(i;i<len;i++){
//			if(funkey == arr[i].name){
//				resize_arr.splice(i,1);
//				window.onresize = integrationCallback(resize_arr);
//				return false;
//			}
//		}
//		return true;
//	};
//	
//})();

;(function () {
	var Resize = {
		arr:[],
		naming:0,
		addResize:function (fun) {/*监听resize*/
			if( fun && !(fun instanceof Function) ){return false;}
			//var name = fun.name ? fun.name :  Resize.functionNaming();
			//不使用function.name 来作为一种判断是因为 ie8及以下 function.name = undefined
			//console.log('======【 ',name,' 】======');
			Resize.arr.push(fun);
			Resize.updateListener();
		},
		removeResize:function (k) {/*解除resize上指定的监听函数  k ( function|number )*/
			if(!k){return false;}
			var arr = Resize.arr,
				len= arr.length;
			if(typeof k == 'number' && k>=0 && k<len){
				arr.splice(k,1);
			}else if(k instanceof Function){
				for(var i = 0 ;i<len;i++ ){
					if(arr[i] == k){
						arr.splice(i,1);
						break;
					}else if(i == len-1){
						//都没有符合的 return  false;
						return false;
					}
				}	
			}else{
				//都没有符合的 return  false;
				return false;
			}
			Resize.updateListener();
			return true;
		},
		functionNaming:function () {/*给绑定onresize的匿名函数生成一个名字*/
			return 'noname_' + (++Resize.naming);
		},
		updateListener:function(){/*更新onresize监听函数*/
			var arr = Resize.arr,
				len = arr.length;
			window.onresize = null;
			for(var i = 0 ; i < len ; i++ ){
				Resize.mergeListener(arr[i]);
			};
		},
		mergeListener:function (fun) { /* merge listener*/
			var f = window.onresize;
			window.onresize  = f ? function(e){f(e);fun(e);} : fun ;
		}
		
	};
	window.onResize = window.addResize = Resize.addResize;
	window.removeResize = Resize.removeResize;
})();