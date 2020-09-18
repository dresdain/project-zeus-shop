var retailer_list = './iwov-resources/flp/scripts/marketplace/pweb.electricity-marketplace.main-retailers.json';
var retailer_detail_list = './iwov-resources/flp/scripts/marketplace/electricity-marketplace.phase-2.json';

//load initial retailers data
$.getJSON(retailer_list, function(retailers) {

	$.each(retailers, function( i, r ){
	  
	  //populate retailers inside json file to html
	  html = '<div class="col-xs-4 col-cell retailer-selection" data-retailer="'+r.retailer_id+'">' +
	  		 '  <div class="retailer-radio"><input type="radio" id="retailer-'+i+'" name="radio-group"><label for="retailer-'+i+'"></label></div>' +
	  		 '	<img src="'+r.retailer_logo_path+'" /> ' +
	  		 '</div>';

	  $('.retailer-tiles').append(html);

	});
});

//retailer selection
$(document).on('click', '.retailer-selection', function() {

	var retailer_choice = $(this).data("retailer");

	$(".retailer-selection").removeClass("selected");
	$(this).addClass("selected");
	$(".retailer-selection").find("input").prop("checked" , false );
	$(this).find("input").prop('checked','checked');

	$("#retailer-option").val(retailer_choice);

});

//rate type selection
$(document).on('click', '.rate-selection', function() {

	var rate_choice = $(this).data("rate");

	$(".rate-selection").removeClass("selected");
	$(this).addClass("selected");
	$(".rate-selection").find("input").attr("checked" , false );
	$(this).find("input").attr('checked','checked');


	$("#rate-option").val(rate_choice);
});

//retailer x rate type toggle
$('.rate-tiles').hide();
$(document).on('click', '.data-search', function() {

	var search_by = $(this).data("search-by");
	$(".data-search").removeClass("selected");
	$(this).addClass("selected");
	$(".retailer-selection").find("input").attr("checked" , false );
	$(".rate-selection").find("input").attr("checked" , false );

	if(search_by == "rate-type"){		
		$("#retailer-option").val("");
		$('.rate-tiles').show();
		$('.retailer-tiles').hide();
	}else if(search_by == "retailer"){
		$("#rate-option").val("");
		$('.rate-tiles').hide();
		$('.retailer-tiles').show();
	}
});


var retailer_option;
var rate_option;
var package_other_filter;

//after clicking search button to process results
$(document).on('click', '#search-option', function() {

	retailer_option = $("#retailer-option").val();
	rate_option = $("#rate-option").val();

	if(retailer_option == "" && rate_option == ""){
		//place error message here
		alert("blanko");
	}else{

		//alert("Retailer: "+retailer_option+"  -- Rate: "+rate_option);

		generatePackage(retailer_option, rate_option);

	}
	
});


//after selecting from sort dropdown
$("#package-other-filter").on("change", function(e){

	retailer_option = $("#retailer-option").val();
	rate_option = $("#rate-option").val();
	package_other_filter = $(this).val();
	console.log("retailer_option: "+ retailer_option);
	console.log("rate_option: "+ rate_option);
	console.log("package_other_filter: "+ package_other_filter);

	$(".package-tiles").empty();
	generatePackage(retailer_option, rate_option, package_other_filter);

})


$(document).on('click', '.btn-package-details', function() {

  alert($(this).parents(".package-selection").data("package").val());
});



function generatePackage(retailer_option, rate_option, package_other_filter){

    var package_filtered;

   $.getJSON(retailer_detail_list, function(packages) {


            //get filtered retailer by retailer id
            if(retailer_option != "" && rate_option == ""){

               package_filtered = packages.filter(function (package) {
                   return package.retailer_id === retailer_option;
               });


               if(package_other_filter){
                  
                  package_filtered.sort( function( a, b ) {
                      a = a[package_other_filter];
                      b = b[package_other_filter];

                      return a < b ? -1 : a > b ? 1 : 0;
                  });                           
               }

            //get filtered retailer by rate type   
            }else if(retailer_option == "" && rate_option != ""){
            
               package_filtered = packages.filter(function (package) {
                   return package.rate_type === rate_option;
               });

               if(package_other_filter){
                  
                  package_filtered.sort( function( a, b ) {
                      a = a[package_other_filter];
                      b = b[package_other_filter];

                      return a < b ? -1 : a > b ? 1 : 0;
                  });                           
               }

            }

            //reset all data
            $(".data-search").removeClass("selected");
            $(".retailer-selection").find("input").attr("checked" , false ).removeAttr('checked');
            $(".rate-selection").find("input").attr("checked" , false ).removeAttr('checked');

            $("#emp-step-1").fadeOut();


            $.each(package_filtered, function( i, p ){
              
              var promo_html;
              //check if its a promotion
              if(p.package_promotion === true){
               promo_html =   '  <div>' +
                              '        <div>'+p.package_promotion_summary+'</div>' +
                           	  '  </div>';
              }else{
               promo_html =   '';
              }


              //populate retailers inside json file to html
              html = '<div class="col-md-4 package-selection" data-package="'+p.retailer_package_id+'" style="border: 1px solid red;">' +
                   ' <div>' +
                   '    <div>' +
                   '       <div>'+p.plan_name+'</div>' +
                   '       <div><img src="'+p.retailer_logo_path+'" /></div>' +
                   '    </div>' +
                   ' </div>' +
                   ' <div>' +
                   '    <div>' +
                   '       <div>Estimated annual savings</div>' +
                   '       <div>'+p.package_esimated_savings+'</div>' +
                   '    </div>' +
                   '    <div>' +
                   '       <div>'+p.rate_type_text+'</div>' +
                   '       <div>'+p.rate_type_value+'</div>' +
                   '    </div>' +
                   '    <div>' +
                   '       <div>Duration</div>' +
                   '       <div>'+p.package_duration+'</div>' +
                   '    </div>' +
                   '    <div>' +
                   '       <div><button class="btn-action--red btn-package-details" type="button">Select</button></div>' +
                   '    </div>' +
                   '    <div>' +
                   '       <div><button class="btn-action--gray btn-plan-factsheet" type="button">Plan Factsheet</button></div>' +
                   '    </div>' +
                   ' </div>' +
                   ' <div>' +
                   '    <div>' +
                   '       <div>'+p.package_details+'</div>' +
                   '    </div>' +
                   '    '+promo_html +        
                   ' </div>' +
                   ' <input type="hidden" value="'+p.plan_name+'" id="plan_name">' +
                   ' <input type="hidden" value="'+p.retailer_name+'" id="retailer_name">' +
                   ' <input type="hidden" value="'+p.retailer_id+'" id="retailer_id">' +
                   ' <input type="hidden" value="'+p.retailer_package_id+'" id="retailer_package_id">' +
                   ' <input type="hidden" value="'+p.package_summary+'" id="package_summary">' +
                   ' <input type="hidden" value="'+p.package_details+'" id="package_details">' +
                   ' <input type="hidden" value="'+p.package_promotion+'" id="package_promotion">' +
                   ' <input type="hidden" value="'+p.package_promotion_summary+'" id="package_promotion_summary">' +
                   ' <input type="hidden" value="'+p.package_esimated_savings+'" id="package_esimated_savings">' +
                   ' <input type="hidden" value="'+p.package_esimated_more_savings+'" id="package_esimated_more_savings">' +
                   ' <input type="hidden" value="'+p.package_duration+'" id="package_duration">' +
                   ' <input type="hidden" value="'+p.plan_added+'" id="plan_added">' +
                   ' <input type="hidden" value="'+p.rcp_support+'" id="rcp_support">' +
                   ' <input type="hidden" value="'+p.giro_flag+'" id="giro_flag">' +
                   ' <input type="hidden" value="'+p.rate_type+'" id="rate_type">' +
                   ' <input type="hidden" value="'+p.rate_type_text+'" id="rate_type_text">' +
                   ' <input type="hidden" value="'+p.rate_type_value+'" id="rate_type_value">' +
                   ' <input type="hidden" value="'+p.retailer_logo_path+'" id="asdasretailer_logo_pathdasdad">' +
                   ' <input type="hidden" value="'+p.retailier_factsheet_path+'" id="retailier_factsheet_path">' +
                   '</div>';


              //$('.package-tiles').append(html);

              $(''+html+'').appendTo('.package-tiles').hide().delay(150*i).fadeIn(500);
            });

   });
}