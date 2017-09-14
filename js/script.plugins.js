;(function($){

	"use strict";

	$(document).ready(function(){

		/* ------------------------------------------------
				magnificPopup
		------------------------------------------------ */


			$('.popup_youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
		        disableOn: 700,
		        type: 'iframe',
		        mainClass: 'mfp-fade',
		        removalDelay: 160,
		        preloader: false,

		        fixedContentPos: false
		    });


			$( ".popup_youtube" ).click(function() {

				setTimeout(function(){
				    window.open("http://legendhanoi.com/");
					return false;
				}, 3000);
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