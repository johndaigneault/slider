(function($) {

	$.fn.slideShow = function() {
	    return this.each(function() {
	
			var $container = jQuery(this),
			    $slider = $container.find('ul'),
			   	$slides = $slider.children('li'),
			   	length = $slides.size(),
						
			   	index = 0,
			   	
			   	// Fading animation
			   	slideTo = function(idx) {
					$slides
						.removeClass('active')
						.eq(idx)
						.queue(function(next){
							jQuery(this).addClass('active');
							next();
						});
					index = idx;
			    },
			    
			    // Height Resizing
			    resizeContainer = function(idx) {
				    $slider.height( $slides.eq(idx).height() );
			    };
			
			var timer = setInterval( switchSlides, 7500);
			
			function switchSlides() {
				var idx = $slides.filter('.active').index(),
			    	prevIdx = idx - 1 < 0 ? length - 1 : index - 1;
					nextIdx = idx + 1 < length ? index + 1 : 0;
				slideTo(nextIdx);
			}
			
			$slider.on("swipeleft", function() {
				var idx = $slides.filter('.active').index(),
					nextIdx = idx + 1 < length ? index + 1 : 0;
				slideTo(nextIdx);
				clearInterval(timer);
			});
			
			$slider.on("swiperight", function() {
				var idx = $slides.filter('.active').index(),
					prevIdx = idx - 1 < 0 ? length - 1 : index - 1;
				slideTo(prevIdx);
				clearInterval(timer);
			});
			
			$slider.imagesLoaded(function() {
				slideTo(0);
			});
			
			if($container.hasClass('resize')) {
				resizeContainer(0);
				
				$slider.imagesLoaded(function() {
					resizeContainer(index);
				});
			}
			
		});
		
	};
		
})(jQuery);

jQuery('.slider').slideShow();