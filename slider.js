(function($) {

	$.fn.slideShow = function( options ) {
		return this.each(function() {
			
			var settings = $.extend({
					height: 500,
					autoScroll: true,
					timer: 7500,
					resize: true,
					activeClass: 'active',
					touch: true,
					controls: true,
					pager: true,
				}, options ),
				
				$container = $(this),
				$slider = $container.children('ul'),
				$slides = $slider.children('li'),
				length = $slides.size(),
						
				index = 0,
			   	
				slideTo = function(idx) {
					$slides
						.removeClass( settings.activeClass )
						.eq(idx)
						.addClass( settings.activeClass );
					index = idx;
					if( settings.pager ) {
						$dots.removeClass( settings.activeClass ).eq( idx ).addClass( settings.activeClass );
					}
				};
							
			if ( settings.resize ) {
				
				var resizeContainer = function() {
				    var tallest = 0;
				    $slides.each(function() {
					    thisHeight = jQuery(this).css({height:"auto"}).height();
					    jQuery(this).css({height:"100%"});
					    if(thisHeight > tallest) tallest = thisHeight;
				    });
				    if( tallest > settings.height || Modernizr.mq('only screen and (max-width: 767px)') ) {
				    	$container.height( tallest );
				    } else {
					    $container.height( settings.height );
				    }
			    };
			    
			    $(window).resize(function() {
				    resizeContainer();
			    });
				
			}
			
			if ( settings.autoScroll ) {
				
				var timer = setInterval( nextSlide, settings.timer );
				
				function nextSlide() {
					var idx = $slides.filter('.active').index(),
						nextIdx = idx + 1 < length ? index + 1 : 0;
					slideTo(nextIdx);
				}
				
			}
			
			if ( settings.pager ) {
				
				var $pager = $("<nav>", { class: "pager" });
					
				for (i = 0; i < length; i++) { 
					$pager.append( '<span></span>' );
				}
				
				var $dots = $pager.children();
				
				$pager.appendTo( $container );
				
				$dots.on('click', function() {
					var idx = $(this).index();
					slideTo(idx);
					clearInterval(timer);
				}).eq(0).addClass( settings.activeClass );
								
			}
			
			if ( settings.controls ) {
				
				var $controls = $("<nav>", { class: "controls" });
					
				$controls.append('<span class="prev"></span><span class="next"></span>').appendTo( $container );
				
				var $toggles = $controls.children();
				
				$toggles.on("click", function() {
					var idx = $slides.filter('.active').index(),
					    prevIdx = idx - 1 < 0 ? length - 1 : index - 1,
					    nextIdx = idx + 1 < length ? index + 1 : 0;
					slideTo( $(this).hasClass('prev') ? prevIdx : nextIdx);
					clearInterval(timer);
				});
				
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

jQuery('.mc-slider').slideShow();