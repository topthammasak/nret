/*******************************************************************
* Preload - Component
* Created by: TheBusTeD (kwang@kingsfield.asia, tksumeth@gmail.com)
* Date time: January 27, 2015
*******************************************************************/

// Set global
var Preload;
define(['qLoader2', 'jqpreLoader'],function(){
	Preload = new Preload();
	return Preload;
});

function Preload() {
	this.name = 'preload';
	this.target = '';
	this.callback = function(){};
}

Preload.prototype = {
	init: function(){
		// Set target
		Preload.target = $('body');
		
		// Set callback
		Preload.callback = typeof callback === 'function' ? callback : Preload.callback;
		
		// Add prepare to body
		Preload.target.addClass('prepare');
		
		// Start preloading
		Preload.target.jpreLoader({
			loaderVPos: false,
			showSplash: false
		}, function(){
			Preload.target.removeClass('prepare').addClass('loaded');
		});
	}
};