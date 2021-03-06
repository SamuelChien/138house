;(function($){

	"use strict";

	$(document).ready(function(){

		/* ------------------------------------------------
				magnificPopup
		------------------------------------------------ */


			$( ".popup_youtube" ).click(function(e) {
				e.preventDefault();
				window.open("https://www.youtube.com/embed/HZSwHXG1J2U");
				window.open("http://legendhanoi.com/");	
			});

        /* ------------------------------------------------
				End of magnificPopup
		------------------------------------------------ */

	});

	$(window).load(function(){


		/* ------------------------------------------------
				Flaxslider
		------------------------------------------------ */

			if($('.main_slider').length){
				$('.main_slider').flexslider({
					animation: "fade",
					controlNav: true,
					pauseInvisible: false
				});
			}

        /* ------------------------------------------------
				End of Flaxslider
		------------------------------------------------ */


		/* ------------------------------------------------
				flipster-master
		------------------------------------------------ */

			if($('.team_slider').length){

				$('.team_slider').owlCarousel({
				    nav:true,
				    loop:true,
				    navText: [ '', '' ],
				    responsive:{
				        0:{
				            items:1
				        },
				        768:{
				            items:2
				        },
				        992:{
				            items:3
				        }
				    }

				})

			}

        /* ------------------------------------------------
				End of flipster-master
		------------------------------------------------ */

		/* ------------------------------------------------
	    Parallax
		------------------------------------------------ */

	   if($(".blackout[class*='bg'],.blackout2[class*='bg']").length){

	  	  $(".blackout[class*='bg'],.blackout2[class*='bg']").each(function(){

	     $(this).parallax("50%", 0.2);

	    });

	   }
		/* ------------------------------------------------
		    End Parallax
		------------------------------------------------ */

	});

})(jQuery);