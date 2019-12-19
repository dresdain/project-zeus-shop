	$( document ).ready(function() {

	  // the dropdown - after selecting something close the drop down
	//   $('.f-bestseller-wrapper .dropdown input.plbc__input-cb').change(function(){
	//     // alert('here');
	// //    alert($(this).parent('.plbc__checkbox').parent('.plbc__wrapper').parent('label').parent('.pl-basic-checkbox').parent('.basic-checkbox').parent('ul').parent('.pl-multi-checkbox').parent('.dropdown__content').parent('.dropdown').hasClass('dropdown--active'));
	//     $(this).parent('.plbc__checkbox').parent('.plbc__wrapper').parent('label').parent('.pl-basic-checkbox').parent('.basic-checkbox').parent('ul').parent('.pl-multi-checkbox').parent('.dropdown__content').parent('.dropdown').removeClass('dropdown--active');  
	//   });
	   $(".dropdown").on("click", function(e){
		  $(this).parent('.pl-partners-multi').parent('.advanced-search__cont').siblings('.advanced-search__cont').children('.pl-partners-multi').children('.dropdown').children('.dropdown__content').hide();
		  $(this).parent('.pl-partners-multi').parent('.advanced-search__cont').parent('.advanced-search').siblings('.advanced-search').children('.advanced-search__cont').children('.pl-partners-multi').children('.dropdown').children('.dropdown__content').hide();
	   });
	  
	  var $nationality_name = '',
		  $nationality_value= '',

		  $current_state_name = '',
		  $current_state_value = '',

		  $dwelling_type_name = '',
		  dwelling_type_value = '',

		  // $no_of_rooms_name = '',
		  // no_of_rooms_value = '',

		  $selected_package_name = '',
		  $selected_package_value = '',

		  $preference_name = '',
		  $preference_value = '';
			
		  
		//  radio data for nationality.
		$('.nationality input.plbc__input-cb:radio').change(function(){       
		  $select_item = $(this).parent('.plbc__checkbox').siblings('.plbc__text').children('.offset-label').text();
		  $('.nationality .dropdown-trigger__text').text($select_item);
		  $nationality_value = $(this).val();
		  $nationality_name = $select_item;
		  
		  $('input:hidden[name=nationality]').val($nationality_value);
		  $('.nationality-name').text($nationality_name);
		});

		$('.current_state input.plbc__input-cb:radio').change(function(){       
		  $select_item = $(this).parent('.plbc__checkbox').siblings('.plbc__text').children('.offset-label').text();
		  $('.current_state .dropdown-trigger__text').text($select_item);
		  $current_state_value = $(this).val();
		  $current_state_name = $select_item;
		  
		  $('input:hidden[name=current_state]').val($current_state_value);
		  $('.current-state-name').text($current_state_name);
		});
		
		$('.dwelling_type input.plbc__input-cb:radio').change(function(){       
		  $select_item = $(this).parent('.plbc__checkbox').siblings('.plbc__text').children('.offset-label').text();
		  $('.dwelling_type .dropdown-trigger__text').text($select_item);
		  $dwelling_type_value = $(this).val();
		  $dwelling_type_name = $select_item;
		  
		  $('input:hidden[name=dwelling_type]').val($dwelling_type_value);
		  $('.dwelling-type-name').text($dwelling_type_name);
		});
	   
	   // $('.no_of_rooms input.plbc__input-cb:radio').change(function(){       
	   //    $select_item = $(this).parent('.plbc__checkbox').siblings('.plbc__text').children('.offset-label').text();
	   //    $('.no_of_rooms .dropdown-trigger__text').text($select_item);
	   //    $no_of_rooms_value = $(this).val();
	   //    $no_of_rooms_name = $select_item;
		  
	   //    $('input:hidden[name=no_of_rooms]').val($no_of_rooms_value);
	   //    $('.no-of-rooms-name').text($no_of_rooms_name);
	   //  });

	   $('.selected_package input.plbc__input-cb:radio').change(function(){       
		  $select_item = $(this).parent('.plbc__checkbox').siblings('.plbc__text').children('.offset-label').text();
		  $('.selected_package .dropdown-trigger__text').text($select_item);
		  $selected_package_value = $(this).val();
		  $selected_package_name = $select_item;
		  
		  $('input:hidden[name=selected_package]').val($selected_package_value);
		  $('.selected-package-name').text($selected_package_name);
		});

		$('.preference input.plbc__input-cb:radio').change(function(){       
		  $select_item = $(this).parent('.plbc__checkbox').siblings('.plbc__text').children('.offset-label').text();
		  $('.preference .dropdown-trigger__text').text($select_item);
		  $preference_value = $(this).val();
		  $preference_name = $select_item;
		  
		  $('input:hidden[name=selected_package]').val($preference_value);
		  $('.preference-name').text($preference_name);
		});




	  $("#search-form-best-seller").submit(function(e) {
		e.preventDefault();
	  });
	  $.LoadingOverlaySetup({
		image           : "/iwov-resources/media/images/electricity-marketplace/electricity-loader.gif",

	  });

	  $( ".f-bestseller-wrapper .search-btn" ).on( "click", function() {
		
	  // if ($selected_package_value != '' && $preference_value != '' && $nationality_value != '' && $current_state_value != '' && $dwelling_type_value != '' && $no_of_rooms_value != '') {
	  if ($selected_package_value != '' && $preference_value != '' && $nationality_value != '' && $current_state_value != '' && $dwelling_type_value != '') {
		  //var weblink = 'electricity-marketplace.json';
		  var weblink = '/iwov-resources/flp/scripts/marketplace/electricity-marketplace.json';
		  $.ajax({
			url:        weblink,
			dataType:   "json",
			success:    function(data){
			  // console.log(data);
			  $(".plan-wrapper").empty(); // Clear out the div
			  // alert(data.length);
			   var match_count = 0;
			   // alert($preference_value);
			   // alert($selected_package_value);
				var search_preference = $preference_value;
				var search_package = $selected_package_value;
			  var results = data.filter(function(data) {
				// console.log(data);
				return data.preference.indexOf(search_preference) > -1 && data.selected_package.indexOf(search_package) > -1;
			  });
			  //console.log(results);
			  // console.log(results.length); 
			  $.each(results, function (idx, result) {
			  $('.plan-wrapper').append('<div class="col-md-3 col-lg-3 col-sm-6 col-xs-6"><div class="plan"><div class="plan-inner"><div class="plan-logo"><img src="'+result.retailer_logo_path+'" /></div><h3 class="plan_name">'+result.plan_name+'</h3><h4>'+result.retailer_name+'</h4><h1 class="price">'+result.plan_savings_callout+'<!--span class="units">cents/kWh</span --></h1><div class="description"><p>'+result.plan_selling_point+'</p></div><p class="hidden-lg hidden-md show-action"><span class="red">Click to Show more</span></p><div class="more-details">'+result.package_more_details+'</div></div> <form><input type="hidden" name="plan_name" value="'+result.plan_name+'"><input type="hidden" name="retailer_id" value="'+result.retailer_id+'"><input type="hidden" name="retailer_name" value="'+result.retailer_name+'"><input type="hidden" name="retailer_package_id" value="'+result.retailer_package_id+'"><input type="hidden" name="package_more_details" value="'+result.package_more_details+'"><input type="hidden" name="plan_price" value="'+result.plan_savings_callout+'"><input type="hidden" name="plan_selling_point" value="'+result.plan_selling_point+'"><input type="hidden" name="rcp_support" value="'+result.rcp_support+'"><input type="hidden" name="giro_flag" value="'+result.giro_flag+'"><button class="btn-action--red switch-btn" type="button" class="btn btn-info btn-lg">Select</button></form><br><form class="form-plan-factsheet"><input type="hidden" name="plan_factsheet" value="'+result.plan_factsheet+'"><input type="hidden" name="plan_added" value="'+result.plan_added+'"><a href="'+result.retailier_factsheet_path+'" download><button class="btn-action--gray btn-plan-factsheet" type="button">Plan Factsheet</button></a></form></div>');
				match_count++; 
				
			  });
			  if (match_count > 1) {
				$('.match-count').text(match_count+ " results");
			  }
			  else {
				$('.match-count').text(match_count+ " result");
			  }
			  
			  calculate_plan_height();
			  plan_hover_effect();
			  switch_btn_process();
		  
		  /*pass aa variable after clicking search button*/
		  // var ddFilterStr = $selected_package_value+"|"+$preference_value+"|"+$nationality_value+"|"+$current_state_value+"|"+$dwelling_type_value+"|"+$no_of_rooms_value;
		  var ddFilterStr = $selected_package_value+"|"+$preference_value+"|"+$nationality_value+"|"+$current_state_value+"|"+$dwelling_type_value;
		  var ddFilter = ddFilterStr.replace(/package_|nationality_|dwelling_/gi, "");
		  
		  digitalData = { 
		  search: { 
			  filter: ddFilter, 
			  results: match_count
		  } 
		  }
		  _satellite.track('electricity-internal search filter');
		  /*pass aa variable after clicking search button*/
		  },
		  error: function (xhr, ajaxOptions, thrownError) {
			alert("xhr.status " + xhr.status);
			alert("thrownError " + thrownError);
		  }
		});
		   // Show full page LoadingOverlay
		$.LoadingOverlay("show");

		 // Hide it after 1 seconds
		setTimeout(function(){
		  $.LoadingOverlay("hide");
		}, 1000);

		$('#search-form-best-seller').fadeOut(500);
		$('.form-value').fadeIn(500);
		$('.plan-section').fadeIn(500);


		$('#plan-carousel').carousel({
		 
		  interval: 10000
		})

	   
		
		}
		else {
			 alert('Please select an option for all fields');
		}




	   
	  });

	 
	  

	  $( ".search-again-best-seller" ).on( "click", function() {
		$(".plan-wrapper").empty(); // Clear out the div
		 $.LoadingOverlay("show");

		// Hide it after 1 seconds
		setTimeout(function(){
		  $.LoadingOverlay("hide");
		}, 1000);
		$('.f-bestseller-wrapper').fadeIn(500);
		$('#search-form-best-seller').fadeIn(500);
		$('.form-value').fadeOut(500);
		$('.plan-section').fadeOut(500);
		$('#switch-popup').fadeOut(500);
	  });
	  
	  // for calculate min-height plan boxes.
	  function calculate_plan_height() {
		var plan_logo_height = Math.max.apply(null, $(".plan-logo").map(function () {
		return $(this).outerHeight(true);
		}).get());
		// console.log("plan_logo_height " + plan_logo_height);
		var plan_h3_height = Math.max.apply(null, $(".plan h3").map(function () {
		  return $(this).outerHeight(true);
		}).get());
		// console.log("plan_h3_height " + plan_h3_height);
		var plan_h4_height = Math.max.apply(null, $(".plan h4").map(function () {
		  return $(this).outerHeight();
		}).get());
		// console.log("plan_h4_height " + plan_h4_height);
		var plan_price_height = Math.max.apply(null, $(".plan .price").map(function () {
		  return $(this).outerHeight(true);
		}).get());
		// console.log("plan_price_height " + plan_price_height);
		var plan_description_height = Math.max.apply(null, $(".plan .description").map(function () {
		  return $(this).outerHeight(true);
		}).get());

	  // console.log("plan_description_height " + plan_description_height);
		var plan_more_details_height = Math.max.apply(null, $(".plan .more-details").map(function () {
		  return $(this).outerHeight(true);
		}).get());
	   // console.log("plan_more_details_height " + plan_more_details_height);
	   

	   var plan_show_actions_height = Math.max.apply(null, $(".plan .show-action").map(function () {
		return $(this).outerHeight();
	  }).get());
	   // console.log("plan_show_actions_height " + plan_show_actions_height);

	  // for initial state plan inner height.
	  var plan_inner_1 = plan_logo_height + plan_h3_height + plan_h4_height + plan_price_height + plan_description_height + plan_show_actions_height;
	  var plan_inner_2 =  plan_h3_height + plan_h4_height + plan_show_actions_height  + plan_more_details_height;

	   var real_maxplan_inner = Math.max(plan_inner_1, plan_inner_1) + 20;
		// $('.plan-logo').css("min-height", plan_logo_height);
		$('.plan_name').css("min-height", plan_h3_height);
		$('.plan h4').css("min-height", plan_h4_height);
		$('.plan .price').css("min-height", plan_price_height);
		$('.plan .description').css("min-height", plan_description_height);
		$('.plan .show-action').css("min-height", plan_show_actions_height);
		$('.plan .more-details').css("min-height", plan_more_details_height);


		$('.plan-inner').css("min-height", real_maxplan_inner);


	  }
	  function plan_hover_effect() {
		// result items hover effect.
		if ($( window ).width() < 767) {    
		  $('.show-action span.red').on('click', function(e){
		   
			e.preventDefault();
			$(this).text( $(this).text() == "Click to Show more" ? "Click to Show less" : "Click to Show more" );
			if( $(this).text() == 'Click to Show less') {
			  $(this).parent('.show-action').parent().parent('.plan').addClass('plan-over');
				
			}
			else {
				$(this).parent('.show-action').parent().parent('.plan').removeClass('plan-over');
			}
		  });
		}
		// not working now hover effect.
		else {
		  $(".plan-wrapper .col-md-3").bind( "mouseenter", function() {
		  
			$(this).children('.plan').addClass('plan-over');
			
			$(this).children('.plan').children('.form-plan-factsheet').children('a').children('.btn-plan-factsheet').text("Plan Factsheet");
		  });
		  $(".plan-wrapper .col-md-3").bind( "mouseleave", function() {
			
			$(this).children('.plan').removeClass('plan-over');
			$(this).children('.plan').children('.form-plan-factsheet').children('a').children('.btn-plan-factsheet').text("Plan Factsheet");
		  
		  });
		}
	  }
	  function switch_btn_process() {
		$( ".switch-btn" ).on( "click", function() {

		   //  $nationality_name = $select_item;
		 
		  $login_form_link = "/personal/redirect/redirect-electricity-marketplace.html?FROM_IB=TRUE&PWEB=TRUE&SERVICE_ID=000000000000651&pid=sg-dbs-pweb-marketplace-searchpackage-electricity-marketplace-btnlogintodigibank";
		  
		  //$login_form_link = "https://internet-banking.dbs.com.sg/IB/Welcome?FROM_IB=TRUE&PWEB=TRUE&SERVICE_ID=000000000000651&pid=sg-dbs-pweb-marketplace-searchpackage-electricity-marketplace-btnlogintodigibank";
		  // for testing 
		  //$login_form_link = "https://sib10.dbs.com/IB/Welcome?FROM_IB=TRUE&PWEB=TRUE&SERVICE_ID=000000000000651";
		  //$login_form_link = "https://sib3.dbs.com/IB/Welcome?FROM_IB=TRUE&PWEB=TRUE&SERVICE_ID=000000000000651";
		  
		  if ($nationality_name != '') {
			$login_form_link  += "&nationality="+ $nationality_value;
		  }
		  if ($current_state_name != '') {
			$login_form_link  += "&current_state="+ $current_state_value;
		  }
		  if ($dwelling_type_name != '') {
			$login_form_link  += "&dwelling_type="+ $dwelling_type_value;
		  }
		  //  if ($no_of_rooms_name != '') {
		  //   $login_form_link  += "&no_of_rooms="+ $no_of_rooms_value;
		  // }
		   if ($selected_package_name != '') {
			$login_form_link  += "&selected_package="+ $selected_package_value;
		  }
		  if ($preference_name != '') {
			$login_form_link  += "&preference="+ $preference_value;
		  }
		  $retailer_id  =  $(this).siblings('input:hidden[name=retailer_id]').val();
		  $login_form_link  += "&retailer_id="+ $retailer_id;
		  
		  $retailer_name  =  $(this).siblings('input:hidden[name=retailer_name]').val();
		  $login_form_link  += "&retailer_name="+ $retailer_name;

		  $retailer_package_id = $(this).siblings('input:hidden[name=retailer_package_id]').val();
		  $login_form_link  += "&retailer_package_id="+ $retailer_package_id;
		  
		  $plan_name = $(this).siblings('input:hidden[name=plan_name]').val();
		  $login_form_link  += "&plan_name="+ encodeURIComponent($plan_name);
		  
		  $plan_price = $(this).siblings('input:hidden[name=plan_price]').val();
		  $login_form_link  += "&plan_price="+ encodeURIComponent($plan_price);
		  
		  $package_more_details  =  $(this).siblings('input:hidden[name=package_more_details]').val();
		  $login_form_link  += "&package_more_details="+ encodeURIComponent($package_more_details);
		  
		  $plan_selling_point  =  $(this).siblings('input:hidden[name=plan_selling_point]').val();
		  $login_form_link  += "&plan_selling_point="+ encodeURIComponent($plan_selling_point);
		  
		  $rcp_support  =  $(this).siblings('input:hidden[name=rcp_support]').val();
		  $login_form_link  += "&rcp_support="+ encodeURIComponent($rcp_support);
		  
		  $giro_flag  =  $(this).siblings('input:hidden[name=giro_flag]').val();
		  $login_form_link  += "&giro_flag="+ encodeURIComponent($giro_flag);
		  
		  $('.login_form_link').attr('href', $login_form_link);
		   $.LoadingOverlay("show");

		  // Hide it after 1 seconds
		  setTimeout(function(){
			$.LoadingOverlay("hide");
		  }, 1000);

		  $dy_plan_name = $(this).siblings('input:hidden[name=plan_name]').val();
		  $dy_retailer_name = $(this).siblings('input:hidden[name=retailer_name]').val();

		  $('.plan-name-result').text($dy_plan_name);
		  $('.retailer-name-result').text($dy_retailer_name);
		  
		  $('.f-bestseller-wrapper').fadeOut(500);
		  $('.plan-section').fadeOut(500);
		  $('#switch-popup').fadeIn(500);
		  // $('#switch-popup').css({
		  //                        'position' : 'initial',
		  //                        'visibility' : 'visible'
		  //                       });
		  
		   $('html, body').stop().animate({
				scrollTop:  $('#switch-popup').offset().top - 1500 }, 1500);
		  
		  
  
    		  

          
		/*pass aa variable after clicking switch button*/
		var ddPackageSearch = $retailer_id+"|"+$retailer_name+"|"+$retailer_package_id;

		digitalData = { 
			 search: { 
				filter: ddPackageSearch, 
				rank: 1
			 }
		}
		_satellite.track('electricity-search result rank');
		/*pass aa variable after clicking switch button*/


		  
		  });
	  }
	
	  
	});
	
	
$(document).on("click", '.switch-btn', function (e) {
	$('#ema-consumer-advisory').modal('show');
});
