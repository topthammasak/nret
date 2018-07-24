/*******************************************************************
* Timer - Component
* Created by: TheBusTeD (kwang@kingsfield.asia, tksumeth@gmail.com)
* Date time: December 23, 2014
*******************************************************************/

// Set global
var Timer;
define(['jquery'],function(){
	Timer = new Timer();
	return Timer;
});

function Timer() {
	this.name = 'timer';
	this.target = '';
	this.left = '';
	this.end = false;
	
	// Count
	this.days = 0;
	this.hour = 0;
	this.minute = 0;
	this.second = 0;
}

Timer.prototype = {
	init: function(target){
		// Set target
		Timer.target = $(target);
		
		// Get time data
		Timer.left = parseInt(Timer.target.data('timer-left'));
		
		// Set output box
		var b_days		= Timer.target.find('li:eq(0)').find('strong');
		var b_hour		= Timer.target.find('li:eq(1)').find('strong');
		var b_minute	= Timer.target.find('li:eq(2)').find('strong');
		var b_second	= Timer.target.find('li:eq(3)').find('strong');
		
		// Check time left
		if(Timer.left > 0) {
			// Calculate time
			var mod_days	= Timer.left % 86400;
			var mod_hour	= mod_days % 3600;
			Timer.days		= Math.floor(Timer.left / 86400);
			Timer.hour		= Math.floor(mod_days / 3600);
			Timer.minute	= Math.floor(mod_hour / 60);
			Timer.second	= mod_hour % 60;

			// Formatting
			Timer.formatting();

			// Put timer into output
			b_days.text(Timer.days);
			b_hour.text(Timer.hour);
			b_minute.text(Timer.minute);
			b_second.text(Timer.second);

			// Start timer
			var interval = window.setInterval(function(){
				Timer.second = parseInt(Timer.second) - 1;

				// Check second
				if(Timer.second < 0) {
					Timer.second = 59;
					Timer.minute = parseInt(Timer.minute) - 1;

					// Check minute
					if(Timer.minute < 0) {
						Timer.minute = 59;
						Timer.hour = parseInt(Timer.hour) - 1;

						// Check hour
						if(Timer.hour < 0) {
							Timer.hour = 23;
							Timer.days = parseInt(Timer.days) - 1;

							if(Timer.days < 0) {
								Timer.end = true;
								clearInterval(interval);
							}

							// Check timer end
							if(!Timer.end) {
								// Formatting
								Timer.formatting();

								// Output
								b_days.text(Timer.days);
							}
						}

						// Check timer end
						if(!Timer.end) {
							// Formatting
							Timer.formatting();

							// Output
							b_hour.text(Timer.hour);
						}
					}

					// Check timer end
					if(!Timer.end) {
						// Formatting
						Timer.formatting();

						// Output
						b_minute.text(Timer.minute);
					}
				}

				// Check timer end
				if(!Timer.end) {
					// Formatting
					Timer.formatting();

					// Output
					b_second.text(Timer.second);
				}
			}, 1000);
		} else {
			Timer.end = true;
		}
	},
	formatting: function(){
		Timer.days		= Timer.days < 10 ? '0'+ Timer.days : Timer.days;
		Timer.hour		= Timer.hour < 10 ? '0'+ Timer.hour : Timer.hour;
		Timer.minute	= Timer.minute < 10 ? '0'+ Timer.minute : Timer.minute;
		Timer.second	= Timer.second < 10 ? '0'+ Timer.second : Timer.second;
	}
};