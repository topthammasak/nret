/*******************************************************************
* Mosaic - Component
* Created by: TheBusTeD (kwang@kingsfield.asia, tksumeth@gmail.com)
* Date time: January 26, 2015
*******************************************************************/

// Set global
var Mosaic;
define(['CollagePlus'],function(){
	Mosaic = new Mosaic();
	return Mosaic;
});

function Mosaic() {
	this.name = 'mosaic';
	this.width = 0;
	this.height = 0;
	this.minH = 0;
	this.min = 0;
	this.max = 0;
}

Mosaic.prototype = {
	init: function(target){
		// Set target
		Mosaic.target = $(target);
		
//		Mosaic.target.collagePlus({
//			targetHeight: 200
//		});
//		return false;
		
		// Get content size
		Mosaic.width = Mosaic.target.width();
		Mosaic.minH = Mosaic.target.data('min-height');
		
		// Start resize
		Mosaic.resize();
		$(window).resize(function(){
			Mosaic.resize();
			console.log('RESIZE');
		});
	},
	resize: function(){
		// Set required variable
		var mosaic, imgs, amount = 0, width = 0, row = [];
		$.each(Mosaic.target, function(i,ele){
			mosaic	= $(ele);
			imgs	= mosaic.find('img');
			width	= 0;
			row		= [];
			amount	= imgs.length;
			$.each(imgs, function(j,ele){
				var img = $(ele);
				var full = img.data('type');
				var imgh = img.data('height');
				var imgw = img.data('width');
				
				// Check full size
				if(full === undefined) {
					// Check width
					if(width > Mosaic.width) {
						// Do resize
						Mosaic.resizeImages(row, width);

						// Set new width and reset row
						width = 0;
						row = [];
					}
					
					// Push img into row
					row.push(img);
					
					// Resize
					img.css({
						height: Mosaic.minH
					});
					
					// Plus current width
					width += img.outerWidth();
				} else {
					img.css({
						width: Mosaic.width
					});
				}
				
				// Decease amount
				amount--;
			});
			
			// Do resize
			Mosaic.resizeImages(row, width);
		});
	},
	resizeImages: function(imgs, boxw){
		var ratio = Mosaic.minH / boxw;
		var newh = Math.round(Mosaic.width * ratio);	
		var sw = 0;
		
		// Resize image
		var img, neww;
		$.each(imgs, function(i,e){
			img = $(e);
			neww = img.css({
				height: newh
			}).outerWidth();
			
			// Summary width
			sw += neww;
		});
		
		// Check current width
		if(sw !== Mosaic.width) {
			var diff = Mosaic.width - sw;
			img.css({
				width: neww + diff
			});
		}
	},
	ratioFit: function(){
		// Find ratio
		var ratio = Math.min(Masterplan.content_w / Masterplan.image_w, Masterplan.content_h / Masterplan.image_h);
		
		// Return width and height
		return {
			width: Math.floor(Masterplan.image_w * ratio),
			height: Math.floor(Masterplan.image_h * ratio)
		};
	}
};