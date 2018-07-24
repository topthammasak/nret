/*******************************************************************
* Gallery - Component
* Created by: TheBusTeD (kwang@kingsfield.asia, tksumeth@gmail.com)
* Date time: January 16, 2015
*******************************************************************/

// Set global
var Gallery;
define(['jquery', 'jqTransit', 'magnificPopup'],function(){
	Gallery = new Gallery();
	return Gallery;
});

function Gallery() {
	this.name = 'gallery';
	
	// Monitor
	this.monitor = '';
	this.monitor_h = 0;
	this.monitor_w = 0;
	this.monitor_c = 0;
	
	// Move
	this.moveto = 0;
	this.moving = false;
	this.speed = 400;
	
	// Image
	this.figure = '';
	this.thumb = '';
	this.amount = 0;
	
	// Object
	this.last = '';
	this.current = '';
	
	// Event
	this.dragging = false;
	this.dragmoved = false;
	
	// Navigator
	this.prev = $('<a class="arrow arrow-left"><span></span><span></span></a>');
	this.next = $('<a class="arrow arrow-right"><span></span><span></span></a>');
	
	this.lasttime = 0;
}

Gallery.prototype = {
	init: function(target){
		// Set target
		Gallery.target = $(target);
		Gallery.monitor = Gallery.target.find('[data-gallery="monitor"]');
		Gallery.figures = Gallery.target.find('[data-gallery="figure"]');
		Gallery.thumb = Gallery.target.find('[data-gallery="thumbnail"]');
		
		// Set monitor
		Gallery.monitor_h = Gallery.monitor.height();
		Gallery.monitor_w = Gallery.monitor.width();
		
		// Calculate monitor center
		Gallery.monitor_c = Gallery.monitor_w / 2;
		
		// Set prev and next
		Gallery.monitor.append(Gallery.prev.addClass('disabled'));
		Gallery.monitor.append(Gallery.next);
		
		// Set current
		Gallery.current = Gallery.figures.find('figure').filter('.selected');
		
		// Create figues
		Gallery.createFigues();
		
		// On click next
		Gallery.next.on('click', function(){
			Gallery.moveImage('next');
		});

		// On click prev
		Gallery.prev.on('click', function(){
			Gallery.moveImage('prev');
		});
		
		// On click thumbnail
		Gallery.thumb.on('click', 'a', function(e){
			Gallery.thumbEvent(e);
		});
		
		// Drag thumb if overframe
		var lastX = 0, moving = 0, x = 0, movespeed = 150;
		$(window).on({
			mousedown: function(e){
				var target = $(e.target);
				if (target.is(Gallery.thumb) || target.closest(Gallery.thumb).length) {
					e.preventDefault();
					
					Gallery.dragging = true;
					lastX = e.pageX;
					x = parseFloat(Gallery.thumb.css('x'));
				}
				Gallery.lasttime = new Date().getTime();
			},
			mousemove: function(e){
				if (Gallery.dragging) {
					moving = e.pageX - lastX;
					moving += x;
					Gallery.thumb.css({
						x: moving
					});
					Gallery.dragmoved = true;
				}
			},
			mouseup: function(e){
				if (Gallery.dragging) {
					if (parseFloat(Gallery.thumb.css('x')) > 0) {
						Gallery.thumb.transition({
							x: 0
						}, movespeed);
					}

					var diff = Gallery.thumb.position().left + Gallery.thumb.width();
					var maxr = Gallery.monitor_w - Gallery.thumb.width();
					if (diff < Gallery.monitor_w) {
						Gallery.thumb.transition({
							x: maxr
						}, movespeed);
					}

					Gallery.dragging = false;

					window.setTimeout(function(){
						Gallery.dragmoved = false;
					}, 10);
				}
			}
		});
		
		$(window).resize(function(){
			// Set monitor
			Gallery.monitor_h = Gallery.monitor.height();
			Gallery.monitor_w = Gallery.monitor.width();

			// Calculate monitor center
			Gallery.monitor_c = Gallery.monitor_w / 2;
			
			// Create figues
			Gallery.createFigues(true);
		});
	},
	calcAspectRatio: function (srcWidth, srcHeight, maxWidth, maxHeight) {
		var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
		return {
			height: Math.round(srcHeight * ratio),
			width: Math.round(srcWidth * ratio)
		};
	},
	createFigues: function(resize){
		// Thumb array
		var thumbs = [];
		
		// Is resize
		resize = resize === undefined ? false : true;
		
		// Each figure;
		$.each(Gallery.figures.find('figure'), function(i,e){
			var figure = $(e);
			var height = figure.data('height');
			var width = figure.data('width');
			var thumb = figure.data('thumb');
			var type = figure.data('type');
			var name = figure.data('name');
			var resize = Gallery.calcAspectRatio(width, height, Gallery.monitor_w, Gallery.monitor_h);
			
			// Resize
			if (height !== undefined && width !== undefined) {
				figure.find('img').css({
					height: resize.height,
					width: resize.width
				});
				
				if(resize) {
					Gallery.moveto = Gallery.calcMoveTo();
					Gallery.figures.css('x', Gallery.moveto);
				} else {
					// Before start to first image to center
					if (i === 0) {
						Gallery.moveto = Gallery.monitor_c - (resize.width / 2);
						Gallery.figures.css('x', Gallery.moveto);
					}
				}
				
				// Push thumbnail
				if (!Gallery.thumb.find('li').length) {
					thumbs.push($('<li' + (figure.hasClass('selected') ? ' class="selected"' : '') + '><a><img src="' + thumb + '"></a></li>'));
					
					// Check if video
					if (type === 'video') {
						figure.append('<a href="http://vimeo.com/' + name + '" class="video popup-vimeo"><span class="pdl-play"></span></a>');
					}
				}
			}
		});
		
		// Add thumb
		if(!Gallery.thumb.find('li').length) {
			Gallery.thumb.append(thumbs);
			Gallery.amount = thumbs.length;
			
			//  Popup video
			$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
				disableOn: 700,
				type: 'iframe',
				mainClass: 'mfp-fade',
				removalDelay: 160,
				preloader: false,
				fixedContentPos: false
			});
		}
	},
	moveImage: function(direction){
		// Get next
		var target = direction === 'next' ? Gallery.current.next() : Gallery.current.prev();

		// Check next
		if (target.length && !Gallery.moving) {
			// Set moving
			Gallery.moving = true;

			// Set last
			Gallery.last = Gallery.current;

			// Set current
			Gallery.current = target;

			// Style
			if(direction === 'next') {
				// Remove diabled class
				Gallery.prev.filter('.disabled').removeClass('disabled');
				
				// Check is last image
				if (!Gallery.current.next().length) {
					Gallery.next.addClass('disabled');
				}
			} else {
				// Remove diabled class
				Gallery.next.filter('.disabled').removeClass('disabled');
				
				// Check is first image
				if(!Gallery.current.prev().length) {
					Gallery.prev.addClass('disabled');
				}
			}

			// Calculate moveto
			Gallery.moveto = Gallery.calcMoveTo();

			// Move image
			Gallery.last.removeClass('selected');
			Gallery.current.addClass('selected');
			Gallery.figures.transition({
				x: Math.floor(Gallery.moveto)
			}, Gallery.speed, function () {
				Gallery.moving = false;
			});
		}

		// Check thumbnail selected
		Gallery.moveThumb(Gallery.thumb.find('li').eq(Gallery.current.index()));
	},
	moveThumb: function(selected){
		// Remove last selected and add current selected
		Gallery.thumb.find('.selected').removeClass('selected');
		selected.addClass('selected');
		
		// Check thumbnail position
		var offset = 20;
		var tmbw = selected.width();
		var left = selected.position().left;
		var right = left + tmbw;
		if(Gallery.monitor_w < right + offset || left < 0) {
			// Calculate move x
			var movex = parseFloat(Gallery.thumb.css('x')) + (Gallery.monitor_c - (left + (tmbw / 2)));
			var maxr = Gallery.monitor_w - Gallery.thumb.width();
			
			// Do transition
			Gallery.thumb.transition({
				x: movex > 0 ? 0 : movex < maxr ? maxr : movex
			}, Gallery.speed);
		}
	},
	thumbEvent: function(e){
		// Check is moving
		if (!Gallery.moving && !Gallery.dragmoved) {
			// Set moving
			Gallery.moving = true;

			// Set required variable
			var me = $(e.target);
			var li = me.closest('li');
			var index = li.index();

			// Figure
			Gallery.last = Gallery.current;
			Gallery.current = Gallery.figures.find('figure').eq(index);

			// Move image
			Gallery.last.removeClass('selected');
			Gallery.current.addClass('selected');

			// Move thumbnail
			Gallery.moveThumb(li);

			// New speed
			var speed = Gallery.speed + ((Math.abs((Gallery.last.index() - Gallery.current.index())) - 1) * 100);


			// Calculate left
			Gallery.moveto = Gallery.calcMoveTo();

			// Transition
			Gallery.figures.transition({
				x: Gallery.moveto
			}, speed, function () {
				Gallery.moving = false;
				Gallery.dragmoved = false;
			});

			// Prev and next button
			if (index > 0) {
				Gallery.prev.removeClass('disabled');
			} else {
				Gallery.prev.addClass('disabled');
				Gallery.next.removeClass('disabled');
			}
			
			if (!Gallery.current.next().length) {
				Gallery.next.addClass('disabled');
			}
			
			console.log(Gallery.current.next().length);
		}
	},
	calcMoveTo: function(){
		return parseFloat(Gallery.figures.css('x')) + (Gallery.monitor_c - (Gallery.current.position().left + (Gallery.current.width() / 2)));
	}
};