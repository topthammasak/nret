var Loading;
define(['jquery', 'jqLoading'], function () {
	Loading = new Loading();
	return Loading;
});

function Loading() {
	this.name = 'loading';
	this.target = '';
	this.b_height = 0;
	this.n_height = 0;
}

Loading.prototype = {
	init: function (target) {
		Loading.target = $(target);
		
		// Full height
		var fullheight = $('#fullheight');
		
		// Get required data
		Loading.b_height = fullheight.find('.content').height();
		Loading.n_height = $(window).height() - 393;
		
		// Set full height
		fullheight.find('.content').css({
			display: 'table'
		}).find('.article').css({
			display: 'table-cell',
			verticalAlign: 'middle'
		});
		fullheight.find('.content').height(Loading.n_height);
		
		// Goto top
		var gototop = $('.gototop');
		
		// Detect on scroll
		$(window).scroll(function(e){
			// Full height logic
			if($(window).scrollTop() > 0) {
				gototop.fadeIn();
				fullheight.find('.content').height(Loading.b_height);
			} else {
				gototop.fadeOut();
				fullheight.find('.content').height(Loading.n_height);
			}
		});
		
		gototop.on('click', function(){
			$('body').animate({
				scrollTop: 0
			});
		});
		
		// Main menu
		var mainmenu = $('#mainmenu');
		mainmenu.on('click', 'a', function(){
			var target = $(this).prop('href').split('#');
			if(target !== false) {
				var moveto = $('#'+ target[1]);
				$('body').animate({
					scrollTop: moveto.offset().top - 40
				});
			}
			return false;
		});
		
		// Start image loaded
		Loading.target.imagesLoaded({
			progress: function (isBroken, $images, $proper, $broken) {
				var percent = Math.round((($proper.length + $broken.length) * 100) / $images.length) + "%";
				$('.frist-loading span.percent').text(percent);
			},
			always: function () {
				//$('body').removeClass('block');
				$('.frist-loading').fadeOut(function() {
					$(this).remove();
				});
			}
		});
	}
};