var origin__DIR = document.URL.substring(0, document.URL.lastIndexOf("/")),
    script__DIR = '/iwov-resources/flp/scripts/marketplace/';

/* 📦 Populate Plans */
function populatePlans(minBill, maxBill, action, search_type) {
    $.getJSON(script__DIR + 'emp-p2.json', function (data) {
        var counter = 0;
        if (action == 'refresh') {
            jplist.refresh();
        } else {
            // jplist.init();
        }
        jplist.resetContent(function () {
            $('.emp__results__box--list').empty();
            // $('.emp__results__box--list').append('<article data-jplist-control="no-results" data-group="group1" data-name="no-results">No Results Found</article>'); 
        });
        var filterRetailers = [];
        $('.action--hidden--cb').each(function(){
            if($(this).is(":checked")){
                filterRetailers.push($(this).val());
            }
        });
        // console.log(filterRetailers);
        
        data.forEach(function (item) {
            for (var i = 0; i <= (item.options.length - 1); i++) {
                var dataDOM = '';

                if (item.options[i].current_monthly_sp_bill_size == maxBill && $.inArray(item.retailer_id, filterRetailers) > -1) { 
                    var planID = 'plan_item--' + counter;
                    dataDOM += '<article data-jplist-item class="emp__results__box--card" id="' + planID + '">';
                    dataDOM += createDOM__savingsInfo(item, item.options[i]);
                    dataDOM += createDOM__planDetails(item, item.options[i]);
                    dataDOM += createDOM__comparePlans(item, item.options[i], planID);
                    dataDOM += '</article>';

                    jplist.resetContent(function () {
                        $('.emp__results__box--list').append(dataDOM);
                        jplist.resetControl('#main-pagination');
                        $('[data-toggle="tooltip"]').tooltip();
                    });
                }
            }
            counter++;
        });
        $('.emp__results__box--list').append('<article class="emp__results__box--card placeholder"></article>');

        /* Re-initialize everything */
        $('[data-toggle="tooltip"]').tooltip();

        setTimeout(function() {
            reflectPageCount();
            initExitScreens();
        }, 200);

        // console.log(data.length);

        var searchTypeTracking = 'new'; 
        switch (search_type) {
            case 'first_time_search':
                searchTypeTracking = "new";
                break;
            case 'modified_search':
                searchTypeTracking = "modify";
                break; 
            default:
                searchTypeTracking = "new";
                break;
        } 
        /* Remove loader */
        setTimeout(function () {
            $('.emp__loader').fadeOut('1000');
            /* Tracking */
            var filterList = { 
                emp_search_type : searchTypeTracking,
                monthly_bill : $('.monthly-bill-header').text(),
                prop_type : $('.place-live-copy').text(),
                total_match : $('.total-items').text()
            };
            trackSearch(search_type, filterList);
        }, 1000);
    });
}

/* 📦 create DOM for .savings__info component */
function createDOM__savingsInfo(item, options) {
    // console.log(item, optipons);
    var html = '';
    /* Start Savings Info  */
    html += '<div class="savings__info"><span class="hidden retailer--id2 xxretailer--' + item.retailer_id + '">' + item.retailer_id + '</span>';
    /* Logo */
    /* ./iwov-resouces */
    html += '<span class="hidden retailer-name">' + item.retailer_name + '</span> <div class="savings__info--logo" style="background-image: url(\'' + item.retailer_logo_path + '\');" alt="' + item.retailer_id + '"></div>';

    /* Copy Wrapper */
    html += '<div class="savings__info--copy">';

    /* Copy Heading */
    
    html += '<small class="heading">Est. annual savings <a href="javascript:void();" data-toggle="tooltip" data-placement="top" title="Monthly savings: S' + options.total_monthly_savings + ' + S$' + options.current_monthly_sp_bill_size + ' + S$16 &#13;Annual savings: Monthly savings x 12"><img src="/iwov-resources/flp/images/marketplace/electricity/revamp/i.svg" alt=""></a></small>';

    /* Copy Body */
    var annualSavings = cleanSavings(options.total_annual_savings);
    html += '<div class="body annual-savings">S$<span class="annual-savings-value">' + annualSavings + '</span></div>';

    /* Copy Footnote */
    html += '<small class="footnote">Save up to S' + options.total_monthly_savings + '/mth</small>';

    /* End Copy Wrapper */
    html += '</div>';

    /* End Savings Info  */
    html += '</div>';

    return html;
}

/* 📦 create DOM for .plan__details component */
function createDOM__planDetails(item, options) {
    var html = '';
    /* Start Plan Details */
    html += '<div class="plan__details"><div class="plan__details--wrapper">';

    /* Contract Duration */
    html += '<div class="plan__details--card"><div class="heading">Contract</div><div class="body contract-duration"><span class="contract-duration-value">' + item.contract_duration_months + '</span> months</div></div>';

    /* Discount Rate */
    var rateType = (item.rate.indexOf("%") >= 0 ? 'Discounted' : 'Fixed');
    var rateSuffix = (item.rate.indexOf("%") >= 0 ? item.rate+ ' off SP Tariff' : 'S' + item.rate + '/ kWh <br class="visible-xs"?>(w GST)');
    html += '<div class=" ' + rateType + ' plan__details--card"><div class="heading">' + rateType + ' rate</div><div class="body">'+rateSuffix+'</div></div>';
    // html += '<div class="plan__details--card"><div class="heading">Discounted rate</div><div class="body">15.56 <small>cents/kWh</small></div></div>';

    /* Plan Name */
    var planName__DOM = item.plan_name + createDOM__greenEnergy(item.green_energy);

    // 
    html += '<div class="plan__details--card"><div class="heading">Plan name</div><div class="body plan-name">' + planName__DOM + '</div></div>';

    /* Promotion */
    var promotion__DOM = (item.promotion.toLowerCase() != 'no' ? '<img src="/iwov-resources/flp/images/marketplace/electricity/revamp/check.svg" alt=""> ' + item.promotion.replace('_', ' ') : 'None');
    html += '<div class="plan__details--card"><div class="heading">Promotion</div><div class="body promotion">' + promotion__DOM + '</div></div></div>';

    html += '<div class="plan__details--card narrow--pad"><a href="javascript:void(0)"  class="btn btn-primary btn-block triggerApplyScreen" data-message="You have selected ' + item.plan_name + ' price plan from ' + item.retailer_name + '" data-btn-yes="' + createLink__ApplyNow(item, options, 'yes') + '" data-btn-no="' + createLink__ApplyNow(item, options, 'no') + '">Apply now</a></div>';

    /* Factsheet */
    html += '<div class="plan__details--card"><a href="' + item.retailier_factsheet_path + '" class="btn btn-primary btn-block btn-outline" target="_blank">Factsheet</a></div>';


    /* End Plan Details */
    html += '</div>';

    return html;
}


/* 📦 Create Link for Apply Now */
function createLink__ApplyNow(item, options, action) {
    /* Apply Now */
    var existingDBS__prepend = '/personal/redirect/redirect-electricity-marketplace-revamp.html?';
    var annualSavings = cleanSavings(options.total_annual_savings);
    var existingDBS = {
        FROM_IB: true,
        PWEB: true,
        SERVICE_ID: '000000000000651',
        pid: 'sg-dbs-pweb-marketplace-searchpackage-electricity-marketplace-btnlogintodigibank',
        // nationality: 'nationality_pr',
        // current_state: 'state_living_in',
        dwelling_type: $('#planForm__dropdown .place-live').val(),
        // selected_package: 'package_discount',
        // preference: (item.green_energy.toLowerCase() == 'yes' ? 'preference_cleanenergy' : 'no_preference'),
        retailer_id: item.retailer_id,
        retailer_name: item.retailer_name,
        retailer_package_id: item.retailer_package_id,
        plan_name: item.plan_name,
        plan_price: 'S$' + annualSavings,
        package_more_details: item.comparison_1 + "," + item.comparison_2 + ',' + item.comparison_3,
        plan_selling_point: item.promotion,
        rcp_support: 'N',
        giro_flag: 'N'
    };

    var newDBS__prepend = 'https://internet-banking.dbs.com.sg/ibAPL/Welcome?';
    var newDBS = {
        pid: 'sg-dbs-pweb-marketplace-searchpackage-electricity-marketplace-btnlogintodigibank-idonthavedigibank'
    };

    if (action == 'yes') {
        return existingDBS__prepend + $.param(existingDBS);
    } else if (action == 'no') {
        return newDBS__prepend + $.param(newDBS);
    }
    // console.log(existingDBS__prepend + $.param(existingDBS));

}




/* 📦 Compare Plans checkbox */
function createDOM__comparePlans(item, options, planID) {
    var html = '';
    var annualSavings = cleanSavings(options.total_annual_savings);
    var rateSuffix = (item.rate.indexOf("%") >= 0 ? item.rate+ ' off SP Tariff' : 'S' + item.rate + '/ kWh <br class="visible-xs"?>(w GST)');
    var comparisonDetails = {
        'plan_id': '#' + planID,
        'logo': item.retailer_logo_path,
        'annual_savings': '$' +  annualSavings,
        'plan_name': item.plan_name + createDOM__greenEnergy(item.green_energy),
        'retailer_name': item.retailer_name,
        'applyNow_btn_yes': createLink__ApplyNow(item, options, 'yes'),
        'applyNow_btn_no': createLink__ApplyNow(item, options, 'no'),
        'applyNow_message': 'You have selected ' + item.plan_name + ' price plan from ' + item.retailer_name,
        'factsheet': item.retailier_factsheet_path,
        'rate': rateSuffix,
        'rate_type': (item.rate.indexOf("%") >= 0 ? 'Discounted' : 'Fixed'),
        'monthly_savings': 'S' + options.total_monthly_savings,
        'contract_duration': item.contract_duration_months + ' months',
        'termination': item.termination_fee,
        'comparison_1': item.comparison_1,
        'comparison_2': item.comparison_2,
        'comparison_3': item.comparison_3,
        'promotion': (item.promotion.toLowerCase() != 'no' ? '<img src="/iwov-resources/flp/images/marketplace/electricity/revamp/check.svg" alt=""> ' + item.promotion.replace('_', ' ') : '-')
    };
    /* Start Compare Plans */
    html += '<div class="compare__plans">';

    /* Checkbox wrapper*/
    html += '<div class="checkbox"><label>';

    html += '<input type="checkbox" data-id="' + '#' + planID + '" data-details=\'' + JSON.stringify(comparisonDetails) + '\' value="#' + planID + '"><span></span> Compare';

    html += '</label></div>';

    /* End Compare Plans */
    html += '</div>';

    return html;
}

/* 📦 create DOM for ecofriendly plans */
function createDOM__greenEnergy(state) {
    if (state.toLowerCase() == 'yes') {
        return ' <img src="/iwov-resources/flp/images/marketplace/electricity/revamp/eco.svg" alt="" data-toggle="tooltip" data-placement="top" title="Eco-friendly" class="isEcoFriendly">';
    } else { return '' }
}


/* 📦 cleanSavings() */
var cleanSavings = function(savings){
    var temp = Math.round(parseFloat(savings.replace('$','').replace(',','')));
    return numberWithCommas(temp);
    // return savings.replace('$','');
}


/* 📦  Create DOM Comparison */
function createDOM__comparisonPlans(comparisonList) {
    var comparisonList = JSON.parse(comparisonList);
    // console.log(comparisonList);
    $('.compareItems > div').removeClass('activeComparison');
    $.each(comparisonList, function (i, v) { 
        var parent = '#compareItem-' + (i+1); 
        
        /*  */
        $(parent).addClass('activeComparison');

        /* First Section */
        $(parent + ' > .compareItems--card .compare--logo').css('background-image', 'url("' + v.logo + '")');
        $(parent + ' > .compareItems--card div.heading').text('S' + v.annual_savings);
        // $(parent + ' > .plan__details--card:nth-child(2) a').removeData() ;
        $(parent + ' > .plan__details--card:nth-child(2) a').data('message', v.applyNow_message);
        $(parent + ' > .plan__details--card:nth-child(2) a').data('btn-yes', v.applyNow_btn_yes);
        $(parent + ' > .plan__details--card:nth-child(2) a').data('btn-no', v.applyNow_btn_no);
        $(parent + ' > .plan__details--card:nth-child(3) a').attr('href', v.factsheet);

        // $(parent + ' .remove__comparison').removeData();
        $(parent + ' .remove__comparison').data('target', parent);
        $(parent + ' .remove__comparison').data('details', JSON.stringify(v));
        $(parent + ' .remove__comparison').data('id', v.plan_id).attr('data-id', v.plan_id);


        /* Mid Section */
        $('.compareItems--col' + (i+1) + ' .plan__details--card:nth-child(1) .body').html(v.plan_name);
        $('.compareItems--col' + (i+1) + ' .plan__details--card:nth-child(2) .body').html(v.rate);
        $('.compareItems--col' + (i+1) + ' .plan__details--card:nth-child(3) .body').html(v.rate_type);
        $('.compareItems--col' + (i+1) + ' .plan__details--card:nth-child(4) .body').html(v.monthly_savings);
        $('.compareItems--col' + (i+1) + ' .plan__details--card:nth-child(5) .body').html(v.contract_duration);
        $('.compareItems--col' + (i+1) + ' .plan__details--card:nth-child(6) .body').html(v.termination);
        $('.compareItems--col' + (i+1) + ' .plan__details--card:nth-child(7) .body').html(v.promotion);

        /* Last Section */
        $('.compareItems--col' + (i+1) + '  .plan__details--card:nth-child(8) .body:nth-child(2)').html(v.comparison_1);
        $('.compareItems--col' + (i+1) + '  .plan__details--card:nth-child(8) .body:nth-child(3)').html(v.comparison_2);
        $('.compareItems--col' + (i+1) + '  .plan__details--card:nth-child(8) .body:nth-child(4)').html(v.comparison_3);

        // console.log(i, v);   
        
    });
}

var remove__comparisonPlan = function () {
    $('.remove__comparison').off();
    $('.remove__comparison').on('click', function () {
        var tempArr = JSON.parse(sessionStorage.getItem("comparisonList"));
        var compareVar = '.compare__plans input[type="checkbox"]',
            parentCompare = '.emp__compareConfirmation',
            parentRecompare = '.emp__recompareConfirmation';
        // console.log('CLOSE: ', $(this).data('id'));
        // console.log('ARRAY: ', tempArr);
        var $this = $(this);
        var removeCompare = $(this).data('id');
        // console.log('COMPARISON ID', removeCompare);

        var removeIndex;
        $.each(JSON.parse(sessionStorage.getItem("comparisonList")), function (i, v) {
            if (removeCompare == v.plan_id) {
                // console.log(true, i, v);
                // console.log(removeCompare + ' .compare__plans input:checked');
                $(removeCompare + ' .compare__plans input:checked').trigger('click');
                removeIndex = i;
                tempArr.splice(removeIndex, 1);
                sessionStorage.setItem('comparisonList', JSON.stringify(tempArr));
            }
        });
        console.log(removeIndex); 
        createDOM__comparisonPlans(sessionStorage.getItem("comparisonList"));
        var compareVar = '.compare__plans input[type="checkbox"]',
        parentCompare = '.emp__compareConfirmation',
        parentRecompare = '.emp__recompareConfirmation';
        init__comparisonScreens(parentCompare, parentRecompare);
    });
}

function numberWithCommas(number) {
    var parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}
 