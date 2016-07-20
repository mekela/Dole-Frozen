$(document).ready(function() {
	//fancybox
	$('.fancybox').fancybox({
		helpers: {
			overlay: {
				locked: false
			}
		}
	});
	
	//bxslider
	$('.more_products_slider ul').bxSlider({
	   	  minSlides: 1,
		  maxSlides: 3,
		  slideWidth: 210,
		  slideMargin: 28
	});
});