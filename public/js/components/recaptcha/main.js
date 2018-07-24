/*******************************************************************
 * reCAPTCHA - Component
 * Created by: TheBusTeD (kwang@kingsfield.asia, tksumeth@gmail.com)
 * Date time: April 4, 2015
 *******************************************************************/

// Set global
var reCAPTCHA;
define(['https://www.google.com/recaptcha/api.js?onload=onLoadCallback&render=explicit&hl=' + $lang + ''], function (recap) {
	reCAPTCHA = new reCAPTCHA();
	return reCAPTCHA;
});

var onLoadCallback = function () {
	// Render
	grecaptcha.render('recaptcha', {
		'sitekey': '6LfAbQkTAAAAAMnp9BfTUPDXjPIKlqN2IP4hfaeu',
		'callback': reCAPTCHA.callback
	});
};

function reCAPTCHA() {
	this.name = 'recaptcha';
}

reCAPTCHA.prototype = {
	init: function (target) {
		// Set target
		reCAPTCHA.target = $(target);
	},
	callback: function () {
		// Set form
		var form = reCAPTCHA.target.closest('form');
		form.find('button:submit:disabled').removeClass('disabled').prop('disabled', false);
	}
};