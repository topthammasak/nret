/*******************************************************************
* Engine file
* Created by: TheBusTeD (kwang@kingsfield.asia, tksumeth@gmail.com)
* Date time: December 18, 2014
* Version: 1.0.0 Release
*******************************************************************/

/* Config require js */
require.config({
	baseUrl: $base+'public',
	paths: {
		app:		'js/apps',
		common:		'js/commons',
		helper:		'js/helpers',
		component:	'js/components',
		jquery:		'libs/jquery/jquery-2.1.3.min',
		
		// Require js Plugins
		async:	'libs/requirejs/plugins/async',
		
		// Bootstrap
		bootstrap:	'libs/bootstrap/js/bootstrap.min',
		
		// Facebook
		facebook:	'//connect.facebook.net/en_US/all',
		
		// jQuery Plugins
		jqAjaxForm:		'libs/jquery/jquery.form.min',
		jqValidate:		'libs/jquery/jquery.validate.min',
		jqTransit:		'libs/jquery/jquery.transit.min',
		jqEasing:		'libs/jquery/jquery.easing',
		jqMouseWheel:	'libs/jquery/jquery.mousewheel-3.0.6.pack',
		
		// jQuery FancyBox
		fancyBox:	'libs/fancyBox/jquery.fancybox.pack',
		
		// Focus Point
		jqFocuspoint:	'libs/jquery-focuspoint/js/jquery.focuspoint',
		
		// Image Mapster
		factory:	'libs/ImageMapster/dist/jquery.imagemapster',
		
		// qTip
		qTip:	'libs/qTip/jquery.qtip.min',
		
		// MagnificPopup
		magnificPopup:	'libs/Magnific-Popup/dist/jquery.magnific-popup.min',
		
		// CollagePlus
		CollagePlus:	'libs/collagePlus/jquery.collagePlus.min',
		
		// Preload
		qLoader2:		'libs/queryLoader2/queryloader2.min',
		jqpreLoader:	'libs/jpreloader/js/jpreloader.min',
		
		// Preload
		preload:	'libs/queryLoader2/queryloader2.min'
		
	},
	shim: {
		// Bootstrap
		bootstrap:	['jquery'],
		
		// Facebook
		facebook: {
			exports: 'FB'
		},
		
		// jQuery
		jqAjaxForm:		['jquery'],
		jqValidate:		['jquery'],
		jqTransit:		['jquery'],
		jqEasing:		['jquery'],
		jqMouseWheel:	['jquery'],
		
		// Fancy Box
		fancyBox:	['jquery'],
		
		// Focus Point
		jqFocuspoint:	['jquery'],
		
		// Image Mapster
		jqImgMapster:	['jquery'],
		
		// Image Mapster
		factory:	['jquery'],
		
		// qTip
		qTip:	['jquery'],
		
		// MagnificPopup
		magnificPopup:	['jquery'],
		
		// CollagePlus
		CollagePlus:	['jquery'],
		
		// Preload
		qLoader2:	['jquery'],
		jqpreLoader:	['jquery']
	},
	packages: $apps,
	waitSeconds: 15
});

require(['jquery', 'bootstrap', 'preload', 'helper/functions.min'], function($, bootstrap, Preload){
//require(['jquery', 'bootstrap', 'helper/functions.min', $base +'public/js/components/scroll/main'], function($, bootstrap){
	var _apps = [];
	var _elms = {};
	var _myapp = $('[data-app]');
	$.each(_myapp, function(i,e){
		var _tag = $(e);
		var _app = _tag.data('app').split(' ');
		$.each(_app, function(j,v){
			if($.inArray(v, _apps) < 0) {
				_apps.push(v);
				_elms[v] = $('[data-app="'+ v +'"]');
			}
		});
	});
	
	// Required module
	if(_apps.length) {
		require(_apps, function () {
			$.each(arguments, function (i, arg) {
				if (typeof arg !== 'undefined') {
					if (typeof arg.init === 'function') {
						arg.init(typeof arg.name === 'undefined' ? '' : _elms[arg.name]);
					}
				}
			});
		});
	}
	
	// Preload start
	Preload.init();
});