/*******************************************************************
 * Bookfresh - Components
 * Created by: TheBusTeD (kwang@kingsfield.asia, tksumeth@gmail.com)
 * Date time: December 23, 2014
 *******************************************************************/

// Set global
var Bookfresh;
define(['jquery'], function () {
	Bookfresh = new Bookfresh();
	return Bookfresh;
});

function Bookfresh() {
	this.name = 'bookfresh';
	this.target = '';
	this.bookfresh = '';
}

Bookfresh.prototype = {
	init: function (target) {
		// Set target
		Bookfresh.target = $(target);
		Bookfresh.bookfresh = $('#lightbox');

		// Add event
		Bookfresh.target.on('click', function () {
			if(Timer.end) {
				alert('Time\'s up!');
			} else {
				Bookfresh.open();
			}
			return false;
		});
		
		// Close on
		$('.lighbox_close').on('click', function(){
			Bookfresh.close();
			return false;
		});
		$(window).keyup(function(e){
			var code = e.keyCode;
			if(code === 27) {
				Bookfresh.close();
			}
		});
	},
	open: function(){
		Bookfresh.bookfresh.fadeIn();
	},
	close: function(){
		Bookfresh.bookfresh.fadeOut();
	}
};