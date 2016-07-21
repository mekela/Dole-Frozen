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
  
   var $coverflow = $('.coverflow');
  
  // Coverflow
  if($coverflow.length){
    $coverflow.roundabout({
        //bearing: -10,
        //tilt: 0,
        childSelector:".cover",
        autoplay:false,
        autoplayDuration:500000,
        autoplayPauseOnHover:true,
        minOpacity: 1,
        maxOpacity: 1,
        minScale: 0.5,
        maxScale: 1,
        shape: "square",
        btnNext : '.coverflow-next',
        btnPrev : '.coverflow-prev',
      });
     
    
     
    var $dotList = $(".coverflow-wrapper .dots .dots-list");
     
    if($dotList.length) {
      var items = $coverflow.children().length;
      for(var i=0; i<items; i++){
        $dotList.append("<span class='dot'><span>");
      }
      
      $dotList.children(":eq(0)").addClass('active');
      
      $coverflow.on("animationEnd", function(e){
        var c = $coverflow.roundabout("getNearestChild");
        $dotList.children(":eq("+c+")").addClass('active').siblings().removeClass('active');
      }); 
      
      $dotList.children().on('click', function(){
        $coverflow.roundabout("animateToChild", $(this).index() )
      });
      
    } 
  }
  
  //filter
  var selectedFilters = {};
  var $products = $(".product_list > a");
  
  $(".filter_line select[data-filter]").each(function(){
    var $this = $(this);
    var filter = $this.attr('data-filter');
    selectedFilters[filter] = [];
    $this.on('change', function(){
      var value = $this.val();
      selectedFilters[filter] = [value];
      applyFilters();
      //console.log(selectedFilters);
    });
  })

  function applyFilters(){
    var $resultsLabels = $(".filter_results");
    var $resultsLabelsList = $resultsLabels.find(".filter_results_list");
    var filters = '';
    
    $resultsLabels.hide();
    $resultsLabelsList.html('');
    $products.hide();
    
    for (var filterName in selectedFilters) {
        if (selectedFilters.hasOwnProperty(filterName)) {
          if(selectedFilters[filterName] && selectedFilters[filterName].length){
            for(var i = 0; i<selectedFilters[filterName].length; i++){
              if(selectedFilters[filterName][i] && selectedFilters[filterName][i].length){
                
                $resultsLabels.show();
                $resultsLabel = $('<span>' + selectedFilters[filterName][i] + ' <i data-filter="' + filterName + '" data-index="' + i + '" class="fa fa-times" aria-hidden="true"></i></span>');
                $resultsLabel.find('i').on('click', function(){
                  selectedFilters[$(this).attr('data-filter')].splice($(this).attr('data-index'), 1);
                  $(".filter_line select[data-filter='" + $(this).attr('data-filter') + "']").val('');
                  applyFilters();
                });
                $resultsLabelsList.append($resultsLabel);
                
                if( selectedFilters[filterName][i].indexOf("'") >= 0 ){
                  filters += '[data-' + filterName + '="' + selectedFilters[filterName][i] + '"]';
                } else {
                  filters += "[data-" + filterName + "='" + selectedFilters[filterName][i] + "']";
                }
                
              }
            }
          }
        }
    }
    
    if(!filters){
      $products.show();
    } else {
      $products.filter(filters).show();
    }
    
  }
   
});