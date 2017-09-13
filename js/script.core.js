;(function($){

	"use strict";

	var Core = {

		DOMReady: function(){

			var self = this;

			self.searchBox();
			self.tabs();
			self.backToTopBtn({
			    transitionIn: 'bounceInRight',
			    transitionOut: 'bounceOutRight'
			});

			self.navigation.init();			
			self.contactForm.init();


		},

		windowLoad: function(){

			var self = this;

			self.fullScreen.init();

		},


		/**
		**	Full screen
		**/

		fullScreen:{

			init: function(){

				var self = this;

				self.w = $(window);
				self.slide = $('.slides>li');
				self.header = $('#header');

				self.calculation();

				self.w.on('resize', function(){

					self.calculation();

				});

			},

			calculation: function(){

				var self = this;
				self.wHeight = self.w.height();

				$('.first_screen').height(self.wHeight);

			},

		},


		/**
		**	Search Box
		**/

		searchBox : function(){

		    $('.search_btn').on('click',function(){

		    	var $this = $(this);

		    	$this.parents('.search_box').toggleClass('active');
		    	$this.parents('.search_box').find('input[type="search"]').focus();

		    });

		    $(document).on('click',function(event){

		    	if(!$(event.target).closest('.search_box').length){
					$('.search_box').removeClass('active');		    		
		    	}

		    });

		},


		/**
		**	Back to top
		**/

		backToTopBtn: function(config){

			config = $.extend({
				offset: 350,
				transitionIn: 'bounceInRight',
				transitionOut: 'bounceOutRight'
			}, config);

			var btn = $('<button></button>', {
				class: 'back_to_top animated hidden',
				html: '<i class="fa fa-angle-up"></i>'
			}).appendTo($('body')),

			$wd = $(window),
			$html = $('html'),
			$body = $('body');

			$wd.on('scroll.back_to_top', function(){

				if($wd.scrollTop() > config.offset){

					btn.removeClass('hidden '+config.transitionOut).addClass(config.transitionIn);

				}
				else{

					btn.removeClass(config.transitionIn).addClass(config.transitionOut);

				}

			});

			btn.on('click', function(){

				$html.add($body).animate({

					scrollTop: 0

				});

			});

	   	},


		/**
		**	Main navigation
		**/

		navigation: {

		    init: function () {

		    	var self = this;
		    	
		    	self.w = $(window);
		    	self.body = $('body');
		    	self.nav = $('.navigation');
		    	self.section = $('.section');
		    	self.sectionQt = self.section.length;

		    	self.anchorScroll();
		    	self.responsiveMenu.events();

		    	self.w.on('scroll',function(){

		    		self.pageScroll();

		    	});

		    	self.w.on('resize', function(){

		    		self.responsiveMenu.menuClose();

		    	});

		    },

		    anchorScroll: function(){

		    	var self = this;

		    	self.nav.on('click', "a", function(event){

		    		event.preventDefault();

		    		var $this = $(this),
		    			item = $this.parent(),
		    			dataId = $this.attr('href'),
		    			offset = $(dataId).offset().top;


		    		item.addClass('current').siblings().removeClass('current');

		    		self.scrollContent(offset);

		    	});

		    },

		    scrollContent: function(offset){

		    	var self = this;

		    	self.body.addClass('scrollContent');

		    	$('html,body').stop().animate({

					scrollTop: offset

		    	},1000,function(){

		    		self.body.removeClass('scrollContent');

		    	});

		    },

		    pageScroll: function(){

		    	var self = this;

		    	if(self.body.hasClass('scrollContent'))return;

		    	self.wScroll = self.w.scrollTop();
		    	self.wHeightHalf = self.w.height()/2;

		    	for (var i = 0; i <= self.sectionQt - 1; i++) {

		    		var offset = $(self.section[i]).offset().top,
		    			heightBox = $(self.section[i]).outerHeight(),
		    			bottomOffset = $(self.section[i+1]).length ? $(self.section[i+1]).offset().top : offset + heightBox,
		    			id = $(self.section[i]).attr('id'),
		    			activItem = $('.navigation').find("a[href='" + "#" + id + "']").parent();
		    		
		    		$('.navigation li').removeClass('active');
		    		$('.navigation_point li').removeClass('navigation_point_active');

		    		if(self.wScroll + self.wHeightHalf > offset && self.wScroll + self.wHeightHalf < bottomOffset ){
		    		
		    			setTimeout(function(){

		    			},1000)

		    			activItem.addClass('current').siblings().removeClass('current');

		    			return false;

		    		}
		    		
		    	};

		    },

		    responsiveMenu: {

		    	events: function(){

		    		var self = this;

		    		self.nav = $('nav');
		    		self.navButton = $('.nav_btn');

					self.navButton.on('click', function () {

						if(self.nav.hasClass('open_menu')){

							self.menuClose();

						}
						else{

							self.menuOpen();
							
						}

					});

					self.nav.on('click', 'a', function(){

						self.menuClose();

					});

		    	},

		    	menuOpen: function(){

		    		var self = this;

		    		self.nav.addClass('open_menu');
		    	
		    	},

		    	menuClose: function(){

		    		var self = this;
		    	
		    		self.nav.removeClass('open_menu');
		    		
		    	},

		    },

		},


		/**
		**	Tabs Servise
		**/

		tabs: function(){

			$('.servise_title_box').on('click',function(){

				var id = $(this).attr('data-tabs');

				$(this).addClass('active').parent().siblings().find('.servise_title_box').removeClass('active');

				$(id).addClass('active').siblings().removeClass('active');

			});

		},


		/**
		**	Contact Form
		**/

		contactForm: {

			init: function(){

				var self = this;

				self.cF = $('.contactform');


				self.cF.on("submit", { obj: this }, self.eventHandler);

			},

			eventHandler: function(event){

				event.preventDefault();

				var self = event.data.obj,
				$this = $(this);

				if(!self.clientValidation($this) || self.cF.hasClass('informed')){

					return false;
				};

				$.ajax({
					url: 'php/contact-send.php', 
					type: 'post',
					data: $this.serialize(),
					success: function(data){

						var type = data.indexOf("success") != -1 ? 'success' : 'error';
						self.showMessage(data, type);

					}
				});

			},

			clientValidation: function(form){

				var self = this,
				collection = form.find('[required]'),
				minCCollection = form.find('[data-min-characters]'),
				message = "";

				collection.each(function(i, el){

					if($(el).val() == ""){

						message += "All required fields must be filled! <br>";
						return false;

					}

				});

				minCCollection.each(function(i, el){

					message += self.minCharacters($(el));

				});

				if(message !== "" && !form.hasClass('informed')){

					self.showMessage(message, 'error');

				}

				return message === "";
			},

			minCharacters: function(el){

				var amount = el.data('min-characters');

				return el.val().length < amount ? '"'+el.data('field-name') + '"  field should contain minimum '+amount+' characters!' + "<br>" : "";

			},

			showMessage: function(data, type){

				var template = $("<div class='info_box t_hide' data-type='"+type+"'><p>"+data+"</p></div>"),
				f = this.cF;

				if(type === "success") f.find('input, textarea').val("");

				f.addClass('informed');

				template.appendTo(f).slideDown(function(){

					$(this)
					.delay(4000)
					.slideUp(function(){

						f.removeClass('informed');
						$(this).remove();

					});

				});

			},

   		},


	}


	$(document).ready(function(){

		Core.DOMReady();

		$( ".pageChange" ).click(function() {
		  window.location = $(this).attr("href");
		});

	});

	$(window).load(function(){

		Core.windowLoad();

	});

})(jQuery);