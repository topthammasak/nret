/*******************************************************************
* Popup - Component
* Created by: TheBusTeD (kwang@kingsfield.asia, tksumeth@gmail.com)
* Date time: January 16, 2015
*******************************************************************/

// Set global
var Popup;
define(['magnificPopup'],function(){
	Popup = new Popup();
	return Popup;
});

function Popup() {
	this.name = 'popup';
}

Popup.prototype = {
	init: function(target){
		// Set target
		Popup.target = $(target);
		
		// ManificPopup start
		Popup.target.magnificPopup({
			type: 'image',
			mainClass: 'mfp-with-zoom',
			zoom: {
				enabled: true,
				duration: 350,
				easing: 'ease-in-out',
				opener: function (openerElement) {
					return openerElement.is('img') ? openerElement : openerElement.find('img');
				}
			}
		});
	}
};