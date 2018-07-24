/*******************************************************************
* Template
* Created by: TheBusTeD (kwang@kingsfield.asia, tksumeth@gmail.com)
* Date time: November 26, 2014
* Version: 2.0
*******************************************************************/

// Global
var Template;
define(function(){
	Template = new Template();
	return Template;
});

function Template() {
	this.lang = false;
}
Template.prototype = {
	init: function(){
		/* Call init */
		Template.tooltip();
		
		/* Find plugins */
		Template.myApp();
	},
	tooltip: function(){
		/* Bootstrap Tooltip */
		$('[data-toggle="tooltip"]').tooltip({ container:"body" });
	},
	myApp: function(){
		var apps = [];
		var myapp = $('[data-app]');
		$.each(myapp, function(i,e){
			var tag = $(e);
			var app = tag.data('app').split(' ');
			$.each(app, function(i,v){
				apps.push('component/'+ v);
			});
		});
	},
	loadCss: function(path){
		var link = document.createElement("link");
		link.type = "text/css";
		link.rel = "stylesheet";
		link.href = path;
		document.getElementsByTagName("head")[0].appendChild(path);
	}
};