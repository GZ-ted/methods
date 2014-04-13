define(function(require, exports, module) {

	var $ = require('jquery');

	function log(msg) {
		return console.log(msg);
	}
	/*
	  //default btn css style
		.btn-click-load { margin: 0 20%; background: #eee; text-align: center;}
		.click-load-1,
		.click-load-2,
		.click-load-3 { display: inline-block; margin-right: 5px; width: 5px; height: 12px; background: #b5b5b5; vertical-align: middle;opacity: 0;}
		.click-load-1 { -webkit-animation: load 1s linear infinite;}
		.click-load-2 { -webkit-animation: load 1s linear infinite .2s;}
		.click-load-3 { -webkit-animation: load 1s linear infinite .4s;}
		@keyframes load {
			0% { opacity: 0;}
			33% { opacity: 0;}
			66% { opacity: 1;-webkit-transform: scaleY(1.2);}
			100% { opacity: 0;-webkit-transform: scaleY(1);}
		}
		@-webkit-keyframes load {
			0% { opacity: 0;}
			33% { opacity: 0;}
			66% { opacity: 1;-webkit-transform: scaleY(1.2);}
			100% { opacity: 0;-webkit-transform: scaleY(1);}
		}
	*/
	/*
	 *点击加载 {clickLoad}
	 *@param {fire},点击按钮后运行的函数，一般应用场景是call api获取数据
	 *@param [opt],配置参数
	*/
	function clickLoad(fire, opt) {
		this.cfg = {
			btn: $('<div class="btn-click-load"></div>'),
			text: {
				unload: '查看更多',
				loading: '<span class="click-load-1"></span><span class="click-load-2"></span><span class="click-load-3"></span>正在加载中',
				lastLoad: '没有更多'
			},
			context: $('body')
		};
		log(opt);
		$.extend(this.cfg, opt);
		//执行函数
		this.fire = fire;
		this.render();
	}

	clickLoad.prototype = {

		render: function() {
			var cfg = this.cfg;

			this.setState('unload');
			cfg.btn.appendTo(cfg.context);
			this.bind();
		},
		bind: function() {
			var self = this,
				cfg = self.cfg;

			cfg.btn.on('click', function(e) {
				e.preventDefault();
				//log('click!');
				if(self.state == 'unload') {
					self.setState('loading');
					self.fire();
				}
			});
		},
		unbind: function() {
			var cfg = this.cfg;

			cfg.btn.off('click');
		},
		//切换状态，可供外部调用
		setState: function(state) {
			var cfg = this.cfg;

			this.state = state;
			log('now btn state is: '+ this.state); 
			cfg.btn.html(cfg.text[this.state]);
			if(this.state == 'lastLoad') {
				this.unbind();
				//this.btn.hide();
			}
		}
	}



	var load = {

		init: function(fn, opt) {

			return new clickLoad(fn, opt);
			/*
			var defer = $.Deferred();

			setTimeout(function() {
				//new clickLoad(fn)
				//defer.resolve();
			}, 3000);

			return defer.promise();
			*/
		}

	}

	return load;

});
/* example
var load = require('clickLoadMore'),
loadBtn = load.init(testFunc);

function testFunc() {
	//模拟ajax请求delay
	setTimeout(function() {

		console.log('I am test function!');

		loadBtn.setState('unload');
		//loadBtn.setState('lastLoad');

	}, Math.ceil(Math.random() * 10)*1000);
}
*/








