(function($) {

	$.fn.slideShow = function( options ) {
	    return this.each(function() {
		    
		    var settings = $.extend({
		            autoScroll: true,
		            timer: 7500,
		            resize: false,
		            activeClass: 'active',
		            touch: true
		        }, options ),
		        
				$container = $(this),
			    $slider = $container.find('ul'),
			    $slides = $slider.children('li'),
			    length = $slides.size(),
						
			    index = 0,
			   	
			    slideTo = function(idx) {
					$slides
						.removeClass( settings.activeClass )
						.eq(idx)
						.queue(function(next){
							$(this).addClass( settings.activeClass );
							next();
						});
					index = idx;
			    };
			
			if ( settings.resize ) {
				
			    var resizeContainer = function(idx) {
				    $slider.height( $slides.eq(idx).height() );
			    };
			    
			}
			
			if ( settings.autoScroll ) {
			    
				var timer = setInterval( nextSlide, settings.timer );
				
				function nextSlide() {
					var idx = $slides.filter('.active').index(),
						nextIdx = idx + 1 < length ? index + 1 : 0;
					slideTo(nextIdx);
				}
				
			}
			
			if ( settings.touch ) {
			
				$slider.on({
					swipeleft: function() {
						var idx = $slides.filter( '.' + settings.activeClass ).index(),
							nextIdx = idx + 1 < length ? index + 1 : 0;
						slideTo(nextIdx);
						if ( settings.autoScroll ) {
							clearInterval(timer);
						}
					},
					swiperight: function() {
						var idx = $slides.filter( '.' + settings.activeClass ).index(),
							prevIdx = idx - 1 < 0 ? length - 1 : index - 1;
						slideTo(prevIdx);
						if ( settings.autoScroll ) {
							clearInterval(timer);
						}
					}
				});
							
			}
			
			$slider.imagesLoaded(function() {
				slideTo(index);
				if ( settings.resize ) {
					resizeContainer(index);
				}
			});
			
		});
	};
		
})(jQuery);

jQuery('.slider').slideShow();