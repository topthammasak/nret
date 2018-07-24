/*******************************************************************
* Focus Point - Component
* Created by: TheBusTeD (kwang@kingsfield.asia, tksumeth@gmail.com)
* Date time: January 16, 2015
*******************************************************************/

// Set global
var Focuspoint;
define(['jqFocuspoint'],function(){
	Focuspoint = new Focuspoint();
	return Focuspoint;
});

function Focuspoint() {
	this.name = 'focuspoint';
}

Focuspoint.prototype = {
	init: function(target){
		// Set target
		Focuspoint.target = $(target);
		
		// Start
		Focuspoint.target.focusPoint();
	}
};