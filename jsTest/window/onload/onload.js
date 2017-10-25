;(function () {
	window.onLoad = function(fun) {
		if(!fun || fun && !(fun instanceof Function)){return false;}
		var defaults = window.onload;
		window.onload = defaults ?
			function(e) {
				defaults(e);
				fun(e);
			} :
			fun;
	};
})();