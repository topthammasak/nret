/*******************************************************************
* Validate - Component
* Created by: TheBusTeD (kwang@kingsfield.asia, tksumeth@gmail.com)
* Date time: February 3, 2015
*******************************************************************/

// Set global
var Validate;
define(['jqValidate', 'jqAjaxForm'],function(){
	Validate = new Validate();
	return Validate;
});

function Validate() {
	this.name = 'validate';
}

Validate.prototype = {
	init: function(target){
		// Set target
		Validate.target = $(target);
		
		// Additaional medthod
		$.validator.addMethod("telephone", function(phone_number, element) {
			return this.optional(element) || phone_number.length > 8 &&
			phone_number.match(/^(\+)?([0-9-]{9,})/);
		}, "Please specify a valid phone number");
		
		// Start
		Validate.target.validate({
			errorClass:   'text-danger',
			errorElement: 'span',
			highlight: function(elem){
				$(elem).closest('.form-group').addClass('has-error');
			},
			unhighlight: function(elem){
				$(elem).closest('.form-group').removeClass('has-error');
			},
			submitHandler: function (form) {
				var me = $(form);
				
				// Disable form
				me.find('input,textarea,button').attr('readonly', true).end().addClass('waiting');
				
				// AJAX  Submit
				var message = $('<small class="text-success text-uppercase" style="display: none">Send email complete.&nbsp;&nbsp;&nbsp;&nbsp;</small>');
				me.ajaxSubmit({
					success: function (data, form, opt) {
						me.find('button:submit').before(message);
						me.find('input,textarea,button').val('').attr('readonly', false).end().removeClass('waiting');
						
						// Animate status
						message.fadeIn('slow').delay(2000).fadeOut('slow', function(){
							message.remove();
						});
					}
				});
			}
		});
	}
};