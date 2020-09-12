var origin__DIR = document.URL.substring(0, document.URL.lastIndexOf("/")),
    script__DIR = './iwov-resources/flp/scripts/marketplace/',
    production_DIR = ".";
    
var firstTimeSearchControl = 0;
var loadFile = "emp-p2.json";
/* 📦 Populate Plans */
function populatePlans(minBill, maxBill, action, search_type) {

    if (globalContentState == "TMP-CONTENT") {
        loadFile = "tmp.json"
    } else { loadFile = "emp-p2.json"; }

    console.log(loadFile);

    $.getJSON(script__DIR + loadFile, function (data) {
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
        var controlIdentifierDummy = (globalContentState == 'EMP-CONTENT' ? '.telco-cb-dummy' : '.electricity-cb-dummy');
        var controlIdentifier = (globalContentState == 'EMP-CONTENT' ? '.telco-cb' : '.electricity-cb');
        $('.action--hidden--cb:not('+controlIdentifier+')').each(function () {
            if ($(this).is(":checked")) {
                filterRetailers.push($(this).val());
            }
        });
        console.log(filterRetailers);

        var campaignActiveCounter = 0,
            campaignExpiredCounter = 0;


        data.forEach(function (item) {


                if(globalContentState == "EMP-CONTENT"){ 
                    for (var a = 0; a <= (item.options.length - 1); a++) {
                        var rangeControl = item.options[a].current_monthly_sp_bill_size;
                        if (rangeControl >= minBill && rangeControl <= maxBill && $.inArray(item.retailer_id, filterRetailers) > -1) { 
                                switch(campaignModule.checkExpiry(item)){
                                    case 'active':
                                        campaignActiveCounter++;
                                        break;
                                    case 'expired':
                                        campaignExpiredCounter++;
                                        break;
                                } 
                        }
                    }
                }
 
            for (var i = 0; i <= (item.options.length - 1); i++) { 
                if (globalContentState == "EMP-CONTENT") { 
                    console.log(item, campaignModule.checkExpiry(item), 'range', rangeControl); 
                        var dataDOM = '';
                        var rangeControl = item.options[i].current_monthly_sp_bill_size;
                        if (rangeControl >= minBill && rangeControl <= maxBill && $.inArray(item.retailer_id, filterRetailers) > -1) {
                            var planID = 'plan_item--' + counter;

                            var campaignActive = 'non-campaign',
                            campaignHTML = ''; 

                            switch(campaignModule.checkExpiry(item)){
                                case 'active':
                                    campaignActive = 'active-campaign';
                                    campaignHTML = campaignModule.createLabel('active', item);  
                                    break;
                                case 'expired':
                                    campaignActive = 'expired-campaign';
                                    campaignHTML = campaignModule.createLabel('expired', item);   
                                    break;
                                case 'invalid':
                                    campaignActive = 'non-campaign';  
                                    break;
                                case 'public':
                                    campaignActive = 'public-campaign';  
                                    break;
                            }


                            dataDOM += '<article style="position:relative;" data-jplist-item class="electricity-article tmp__results__box--card emp__results__box--card '+ campaignActive +'" id="' + planID + '">' + campaignHTML;
                            dataDOM += createDOM__savingsInfo(item, item.options[i]);
                            dataDOM += createDOM__planDetails(item, item.options[i], planID);
                            dataDOM += createDOM__comparePlans(item, item.options[i], planID);
                            dataDOM += '</article>';
                            jplist.resetContent(function () {
                                $('.emp__results__box--list').append(dataDOM); 
                                if(campaignExpiredCounter > 0 && getQueryVariable('activity') != undefined){
                                    $('.non-campaign').remove();
                                }else if(campaignActiveCounter > 0 && getQueryVariable('activity') != undefined){
                                    $('.non-campaign').remove();
                                }else if(campaignExpiredCounter == 0 && campaignActiveCounter == 0 && getQueryVariable('activity') != undefined){
                                    $('.non-campaign').remove();
                                }else if(getQueryVariable('activity') == undefined){
                                    $('article:not(.public-campaign)').remove(); 
                                }
                                $('.expired-campaign').remove();
                                jplist.resetControl('#main-pagination');
                                $('[data-toggle="tooltip"]').tooltip();
                            });
                        }
                } else{
                    
                        if (globalContentState == "TMP-CONTENT") {
                            // console.log(item);
                            var dataDOM = ''; 
                            var rangeControlData = (item.data == "unlimited" ? 'unlimited' : parseFloat(item.data.replace('GB', '').replace(' ', '')));
                            var rangeControlPrice = parseFloat(item.options[i].price_per_month.replace(' ', '').replace('$', ''));

                            var condition__DataIntended = parseFloat($('#planForm__dropdown .range-cost').val());
                            var condition__PriceIntended = parseFloat($('#planForm__dropdown .place-live').val());
                            console.log(condition__PriceIntended);
                            if (   $.inArray(item.retailer_id, filterRetailers) > -1 && ((rangeControlData <= condition__DataIntended && rangeControlPrice <= condition__PriceIntended) || (condition__DataIntended === Infinity && rangeControlPrice <= condition__PriceIntended))  ) {

                                var unlimitedPlan = (item.data == "unlimited" ? 'isUnlimited' : 'isNotUnlimited');
                                var planID = 'plan_item--' + counter;
                                dataDOM += '<article data-jplist-item class="telco-article ' + unlimitedPlan + '  tmp__results__box--card  emp__results__box--card" id="' + planID + '">';
                                dataDOM += createDOM__savingsInfo__TMP(item, item.options[i]);
                                dataDOM += createDOM__promotionsInfo(item, item.options[i], '  ');
                                dataDOM += createDOM__planDetails__TMP(item, item.options[i]);
                                // dataDOM += createDOM__promotionsInfo(item, item.options[i], '  ');
                                dataDOM += createDOM__comparePlans__TMP(item, item.options[i], planID);
                                dataDOM += '</article>';


                                jplist.resetContent(function () {
                                    $('.emp__results__box--list').append(dataDOM);
                                    if (condition__DataIntended === Infinity) {
                                        $('.isNotUnlimited').remove();
                                    } else {
                                        // $('.isUnlimited').remove();
                                    }
                                    jplist.resetControl('#main-pagination');
                                    $('[data-toggle="tooltip"]').tooltip();
                                });
                            }
                        }
                    
                }
            }
                    

                    
            counter++;
        });

        if(campaignExpiredCounter > 0 && getQueryVariable('activity') != undefined){
            campaignModule.createError('expired');
        }else if(campaignExpiredCounter == 0 && campaignActiveCounter == 0 && getQueryVariable('activity') != undefined){
            campaignModule.createError('invalid');
            console.log(" I N V A  LI  D ")
        }
        console.log("Expired Counter: " + campaignExpiredCounter);
        console.log("Active Counter: " + campaignActiveCounter);

        $('.emp__results__box--list').append('<article class="emp__results__box--card placeholder"></article>');

        /* Re-initialize everything */
        $('[data-toggle="tooltip"]').tooltip();

        setTimeout(function () {
            reflectPageCount();
            initExitScreens();
        }, 200);

        // console.log(data.length);

        /* Remove loader */
        setTimeout(function () {
            $('.emp__loader').fadeOut('1000');
            if (firstTimeSearchControl === 0) {
                if(globalContentState == "EMP-CONTENT"){ 
                    $('#sort-type-1').val("0").change();
                }else{
                    $('#sort-type-1').val("3").change();
                }

                var sortType = $('#sort-type-1 option:selected').data('title');
                var filterList = {
                    emp_search_type: 'new',
                    monthly_bill: $('.monthly-bill-header').text(),
                    prop_type: $('.place-live-copy').text(),
                    sort: sortType,
                    total_match: $('.total-items').text()
                };
                setTimeout(function () {
                    trackSearch('search-results_page__and__first_time_search', filterList);
                    // trackPageLevel('search-results', []);
                    console.log(filterList);
                    globalFilterState = 'first_time_search';
                }, 1000);
                firstTimeSearchControl = 1;
                
            }
        }, 1000);
    });
}





/*  
    📶📶📶
    TMP SCRIPTS 
*/

/* 📦 TMP CONTENT create DOM for .savings__info component */
function createDOM__savingsInfo__TMP(item, options) {
    var html = '<div class="tmp-part">';
    /* Start Savings Info  */
    html += '<div class="savings__info"><span class="hidden retailer--id2 xxretailer--' + item.retailer_id + '">' + item.retailer_id + '</span>';
    /* Logo */
    /* ./iwov-resouces */
    html += '<span class="hidden retailer-name">' + item.retailer_name + '</span> <div class="savings__info--logo" style="background-image: url(\''+ production_DIR + item.telco_logo_path + '\');" alt="' + item.retailer_id + '"></div>';

    /* Copy Wrapper */
    html += '<div class="savings__info--copy">';
    /* Copy Body */
    var dataPlan = (item.data.indexOf('GB') !== -1 ? item.data.replace('GB', '').replace(' ', '') : item.data);
    var dataPlanExt = (item.data.indexOf('GB') !== -1 ? 'GB' : '');
    html += '<div class="body annual-savings"><span class="monthly-data">' + dataPlan + '</span>' + dataPlanExt + '</div>';



    /* Copy Footnote */
    html += '<small class="footnote">S$<span class="pricepermonth">' + options.price_per_month.replace(' ', '').replace('$', '').trim() + '</span>/mo</small>';

    /* End Copy Wrapper */
    html += '</div>';

    /* End Savings Info  */
    html += '</div>';

    return html;
}


function createDOM__promotionsInfo(item, options, viewport) {
    if (item.promotion == "YES") {
        var html = '';

        html += '<div class="promotions__info ' + viewport + '"><div class="title">PROMOTION</div><div class="info">' + item.promotion_text + '</div></div>';

        return html;
    }
    return '';
}

/* 📦 TMP create DOM for .plan__details component */
function createDOM__planDetails__TMP(item, options, planID) {
    var html = '';
    /* Start Plan Details */
    html += '<div class="plan__details"><div class="plan__details--wrapper">';

    /* Contract Type */
    var planType;
    if(item.plan_type == 'combo_plan'){
        planType = 'Combo-plan';
    }else if(item.plan_type == 'sim_only' || item.plan_type == 'sms_only'){
        planType = 'SMS-only';
    }
    html += '<div class=" '+ planType + ' plan__details--card"><div class="heading">Contract</div><div class="body contract-duration"><span class="contract-duration-value">' + options.contract + '</span></div></div>';

    /* Caller ID */
    html += '<div class="plan__details--card"><div class="heading">Caller ID</div><div class="body "><span class="">' + options.caller_id + '</span></div></div>';

    /* Talk Time */
    html += '<div class="plan__details--card"><div class="heading">Talk time</div><div class="body "><span class="">' + options.talktime + '</span></div></div>';

    /* SMS */
    html += '<div class="plan__details--card"><div class="heading">SMS</div><div class="body "><span class="">' + options.sms + '</span></div></div>';

    /* Add ons */
    var tooltipAddOn = 'Data add-on:\n';
    tooltipAddOn += (item.add_on_1 != '' ? '&#8226; ' + item.add_on_1 + '\n' : '');
    tooltipAddOn += (item.add_on_2 != '' ? '&#8226; ' + item.add_on_2 + '\n' : '');
    tooltipAddOn += (item.add_on_3 != '' ? '&#8226; ' + item.add_on_3 + '\n' : '');

    html += '<a class="heading addon-tooltip" href="javascript:void()" data-toggle="tooltip" data-placement="top" title="' + tooltipAddOn + '">Add-ons available <img src="'+production_DIR+'/iwov-resources/flp/images/marketplace/electricity/revamp/i.svg" alt=""></a>';


    


    /* End Plan Details */
    html += '</div></div></div>';

    return html;
}

/* 📦 Create Link for Apply Now */
function createLink__ApplyNow__TMP(item, options, action) {
    /* Apply Now */
    // var existingDBS__prepend = '/personal/redirect/redirect-electricity-marketplace-revamp.html?';
    var existingDBS__prepend = 'https://www.dbs.com.sg/personal/common-disclaimer.page?';
    var existingDBS = {
        url : item.telco_url,
        '3rdparty' :  item.retailer_name
        // FROM_IB: true,
        // PWEB: true,
        // SERVICE_ID: '000000000000651',
        // pid: 'sg-dbs-pweb-marketplace-searchpackage-electricity-marketplace-btnlogintodigibank',
        // nationality: 'nationality_pr',
        // current_state: 'state_living_in',
        // dwelling_type: $('#planForm__dropdown .place-live').val(),
        // selected_package: 'package_discount',
        // preference: (item.green_energy.toLowerCase() == 'yes' ? 'preference_cleanenergy' : 'no_preference'),
        // retailer_id: item.retailer_id,
        // retailer_name: item.retailer_name,
        // retailer_package_id: item.package_id,
        // plan_name: item.plan_name,
        // plan_data: item.data,
        // telco_factsheet_path: item.telco_factsheet_path,
        // telco_factsheet_path: item.telco_logo_path,
        // package_more_details: item.add_on_1 + "," + item.add_on_2 + ',' + item.add_on_3,
        // plan_selling_point: item.promotion_text,
        // rcp_support: 'N',
        // giro_flag: 'N'
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
/* 📦 TMP Compare Plans checkbox */
function createDOM__comparePlans__TMP(item, options, planID) {
    var html = '<div class="tmp-part tmp-cta-container">';
    var comparisonDetails = {
        'plan_id': '#' + planID,
        'package_id': item.package_id,
        'retailer_id': item.retailer_id,
        'logo': item.telco_logo_path,
        'plan_name': item.plan_name.replace(/plan/ig, '').replace(/ /ig, ''),
        'plan_type': item.plan_type,
        'retailer_name': item.retailer_name,
        'applyNow_btn_yes': createLink__ApplyNow__TMP(item, options, 'yes'),
        'applyNow_btn_no': createLink__ApplyNow__TMP(item, options, 'no'),
        'applyNow_message': 'You have selected ' + item.plan_name + ' price plan from ' + item.retailer_name,
        'factsheet': item.telco_factsheet_path,
        'comparison_1': item.add_on_1,
        'comparison_2': item.add_on_2,
        'comparison_3': item.add_on_3,
        'price_per_month': options.price_per_month.trim().replace(' ', ''),
        'contract': options.contract,
        'caller_id': options.caller_id,
        'talktime': options.talktime,
        'sms': options.sms,
        'promotion': (item.promotion == "YES" ? item.promotion_text : 'None'),
        'tmp__redirect': createLink__ApplyNow__TMP(item, options, 'yes')
    };

    /* Sign Up */
    html += '<div class="plan__details">';
    html += '<div class="plan__details--card narrow--pad"><a target="_blank" href="'+createLink__ApplyNow__TMP(item, options, 'yes')+'"  class="btn btn-primary btn-block triggerApplyScreen-nulled" data-partner="' + item.retailer_name + '" data-plan="' + item.plan_name + '" data-parent="' + planID + '" data-message="You have selected ' + item.plan_name + ' price plan from ' + item.retailer_name + '" data-btn-yes="' + createLink__ApplyNow__TMP(item, options, 'yes') + '" data-btn-no="' + createLink__ApplyNow__TMP(item, options, 'no') + '">Sign Up</a></div>';
    html += '</div>';

    /* Start Compare Plans */ 
    html += '<div class="compare__plans">';

    /* Checkbox wrapper*/
    html += '<div class="checkbox"><label>';

    html += '<input type="checkbox" data-id="' + '#' + planID + '" data-details=\'' + JSON.stringify(comparisonDetails) + '\' value="#' + planID + '"><span></span> Compare';

    html += '</label></div>';

    /* End Compare Plans */
    html += '</div></div>';

    return html;
}


/* 📦  Create DOM Comparison */
function createDOM__comparisonPlans__TMP(comparisonList) {
    
    var comparisonList = JSON.parse(comparisonList);
    // console.log(comparisonList);
    $('.compareItems > div').removeClass('activeComparison');
    $.each(comparisonList, function (i, v) {
        var parent = '#compareItem-' + (i + 1);
        $('.triggerApplyScreen').off();
        $(parent + ' > .plan__details--card:nth-child(2) a').removeClass('triggerApplyScreen');
        /*  */
        $(parent).addClass('activeComparison');

        /* First Section */
        $(parent + ' > .compareItems--card .compare--logo').css('background-image', 'url("'+ production_DIR + v.logo + '")');

        $(parent + ' > .compareItems--card').addClass('text-center');

        $(parent + ' > .compareItems--card div.heading').text(v.plan_name.replace('PLAN', '').replace('plan', ''));

        $(parent + ' > .compareItems--card div.footnote').text(v.price_per_month.replace(' ', '').trim() + '/mo');
        // $(parent + ' > .plan__details--card:nth-child(2) a').removeData() ;
        $(parent + ' > .plan__details--card:nth-child(2) a').text('Sign up');
        
        $(parent + ' > .plan__details--card:nth-child(2) a').attr('href', v.tmp__redirect);
        $(parent + ' > .plan__details--card:nth-child(2) a').attr('target', '_blank');
         

        $(parent + ' > .plan__details--card:nth-child(2) a').data('message', v.applyNow_message);
        $(parent + ' > .plan__details--card:nth-child(2) a').data('btn-yes', v.applyNow_btn_yes);
        $(parent + ' > .plan__details--card:nth-child(2) a').data('btn-no', v.applyNow_btn_no);
        // $(parent + ' > .plan__details--card:nth-child(3) a').attr('href', v.factsheet);
        $(parent + ' > .plan__details--card:nth-child(3) a').remove();

        // $(parent + ' .remove__comparison').removeData();
        $(parent + ' .remove__comparison').data('target', parent);
        $(parent + ' .remove__comparison').data('details', JSON.stringify(v));
        $(parent + ' .remove__comparison').data('id', v.plan_id).attr('data-id', v.plan_id);

        //Contract
        $('.compareItems--col' + (i + 1) + ' .plan__details--card:nth-child(1) .heading').html('Contract');
        $('.compareItems--col' + (i + 1) + ' .plan__details--card:nth-child(1) .body').html(v.contract);

        $('.compareItems--col' + (i + 1) + ' .plan__details--card:nth-child(2) .heading').html('Caller ID');
        $('.compareItems--col' + (i + 1) + ' .plan__details--card:nth-child(2) .body').html(v.caller_id);


        $('.compareItems--col' + (i + 1) + ' .plan__details--card:nth-child(3) .heading').html('Talk Time');
        $('.compareItems--col' + (i + 1) + ' .plan__details--card:nth-child(3) .body').html(v.talktime);

        $('.compareItems--col' + (i + 1) + ' .plan__details--card:nth-child(4) .heading').html('SMS');
        $('.compareItems--col' + (i + 1) + ' .plan__details--card:nth-child(4) .body').html(v.sms);


        $('.compareItems--col' + (i + 1) + ' .plan__details--card:nth-child(5) .heading').html('Add-on 1');
        $('.compareItems--col' + (i + 1) + ' .plan__details--card:nth-child(5) .body').html(v.comparison_1);


        $('.compareItems--col' + (i + 1) + ' .plan__details--card:nth-child(6) .heading').html('Add-on 2');
        $('.compareItems--col' + (i + 1) + ' .plan__details--card:nth-child(6) .body').html(v.comparison_2);

        $('.compareItems--col' + (i + 1) + ' .plan__details--card:nth-child(7) .heading').html('Add-on 3');
        $('.compareItems--col' + (i + 1) + ' .plan__details--card:nth-child(7) .body').html(v.comparison_3);


        /* Mid Section */




        // $('.compareItems--col' + (i + 1) + ' .plan__details--card:nth-child(5) .body').html(v.contract_duration);
        // $('.compareItems--col' + (i + 1) + ' .plan__details--card:nth-child(6) .body').html(v.termination);
        // $('.compareItems--col' + (i + 1) + ' .plan__details--card:nth-child(7) .body').html(v.promotion);

        /* Last Section */
        $('.compareItems--col' + (i + 1) + '  .plan__details--card:nth-child(8)').remove();
        // $('.compareItems--col' + (i + 1) + '  .plan__details--card:nth-child(8) .body:nth-child(2)').html(v.comparison_1);
        // $('.compareItems--col' + (i + 1) + '  .plan__details--card:nth-child(8) .body:nth-child(3)').html(v.comparison_2);
        // $('.compareItems--col' + (i + 1) + '  .plan__details--card:nth-child(8) .body:nth-child(4)').html(v.comparison_3);

        // console.log(i, v);   

    });
}

var remove__comparisonPlan__TMP = function () {
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
        // console.log(removeIndex);
        if (globalContentState == "TMP-CONTENT") {
            createDOM__comparisonPlans__TMP(sessionStorage.getItem("comparisonList"));
        } else {
            createDOM__comparisonPlans(sessionStorage.getItem("comparisonList"));
        }
        var compareVar = '.compare__plans input[type="checkbox"]',
            parentCompare = '.emp__compareConfirmation',
            parentRecompare = '.emp__recompareConfirmation';
        init__comparisonScreens(parentCompare, parentRecompare);
        validate__compareCheckbox();
        trackPageLevel('compare_remove');
    });
}











































/*  
    ⚡️⚡️⚡️
    EMP SCRIPTS 
*/



/* 📦 EMP CONTENT create DOM for .savings__info component */
function createDOM__savingsInfo(item, options) { 
    // console.log(item, optipons);
    var html = '<div class="tmp-part">';
    /* Start Savings Info  */
    html += '<div class="savings__info"><span class="hidden retailer--id2 xxretailer--' + item.retailer_id + '">' + item.retailer_id + '</span>';
    /* Logo */
    /* ./iwov-resouces */
    html += '<span class="hidden retailer-name">' + item.retailer_name + '</span> <div class="savings__info--logo" style="background-image: url(\''+ production_DIR + item.retailer_logo_path + '\');" alt="' + item.retailer_id + '"></div>';

    /* Copy Wrapper */
    html += '<div class="savings__info--copy">';

    /* Copy Heading */

    html += '<small class="heading">Est. annual savings <a href="javascript:void();" data-toggle="tooltip" data-placement="top" title="Monthly savings: S' + options.total_monthly_savings + ' + S$' + options.current_monthly_sp_bill_size + ' + S$16 &#13;Annual savings: Monthly savings x 12"><img src="'+ production_DIR +'/iwov-resources/flp/images/marketplace/electricity/revamp/i.svg" alt=""></a></small>';

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
function createDOM__planDetails(item, options, planID) {
    var html = '';
    /* Start Plan Details */
    html += '<div class="plan__details"><div class="plan__details--wrapper">';

    /* Contract Duration */
    html += '<div class="plan__details--card"><div class="heading">Contract</div><div class="body contract-duration"><span class="contract-duration-value">' + item.contract_duration_months + '</span> months</div></div>';

    /* Discount Rate */
    var rateType = (item.rate.indexOf("%") >= 0 ? 'Discounted' : 'Fixed');
    var rateSuffix = (item.rate.indexOf("%") >= 0 ? 'Up to ' + item.rate + ' off SP Tariff' : 'S' + item.rate + '/ kWh <br class="visible-xs"?>(w GST)');
    html += '<div class=" ' + rateType + ' plan__details--card"><div class="heading">' + rateType + ' rate</div><div class="body">' + rateSuffix + '</div></div>';
    // html += '<div class="plan__details--card"><div class="heading">Discounted rate</div><div class="body">15.56 <small>cents/kWh</small></div></div>';

    /* Plan Name */
    var planName__DOM = item.plan_name + createDOM__greenEnergy(item.green_energy);

    // 
    html += '<div class="plan__details--card"><div class="heading">Plan name</div><div class="body plan-name">' + planName__DOM + '</div></div>';

    /* Promotion */
    var promotion__DOM = (item.promotion.toLowerCase() != 'no' ? '<img src="'+ production_DIR +'/iwov-resources/flp/images/marketplace/electricity/revamp/check.svg" alt=""> ' + item.promotion.replace('_', ' ') : 'None');
    html += '<div class="plan__details--card"><div class="heading">Promotion</div><div class="body promotion">' + promotion__DOM + '</div></div></div>';
 
    /* End Plan Details */
    html += '</div>';
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
        retailer_package_id: item.package_id,
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
    var html = '<div class="tmp-part tmp-cta-container">';
    var annualSavings = cleanSavings(options.total_annual_savings);
    var rateSuffix = (item.rate.indexOf("%") >= 0 ? item.rate + ' off SP Tariff' : 'S' + item.rate + '/ kWh <br class="visible-xs"?>(w GST)');
    var comparisonDetails = {
        'plan_id': '#' + planID,
        'package_id': item.package_id,
        'retailer_id': item.retailer_id,
        'logo': item.retailer_logo_path,
        'annual_savings': '$' + annualSavings,
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
        'promotion': (item.promotion.toLowerCase() != 'no' ? '<img src="'+  production_DIR + '/iwov-resources/flp/images/marketplace/electricity/revamp/check.svg" alt=""> ' + item.promotion.replace('_', ' ') : '-')
    };

    html += '<div class="plan__details">';
    html += '<div class="plan__details--card narrow--pad"><a href="javascript:void(0)"  class="btn btn-primary btn-block triggerApplyScreen" data-partner="' + item.retailer_name + '" data-plan="' + item.plan_name + '" data-parent="' + planID + '" data-message="You have selected ' + item.plan_name + ' price plan from ' + item.retailer_name + '" data-btn-yes="' + createLink__ApplyNow(item, options, 'yes') + '" data-btn-no="' + createLink__ApplyNow(item, options, 'no') + '">Apply now</a></div>';

    /* Factsheet */
    html += '<div class="plan__details--card"><a href="' + item.retailier_factsheet_path + '" class="open_factsheet btn btn-primary btn-block btn-outline" target="_blank">Factsheet</a></div>';
    html += '</div>';


    /* Start Compare Plans */
    html += '<div class="compare__plans">';

    /* Checkbox wrapper*/
    html += '<div class="checkbox"><label>';

    html += '<input type="checkbox" data-id="' + '#' + planID + '" data-details=\'' + JSON.stringify(comparisonDetails) + '\' value="#' + planID + '"><span></span> Compare';

    html += '</label></div>';

    /* End Compare Plans */
    html += '</div>';
    html += '</div>';

    return html;
}

/* 📦 create DOM for ecofriendly plans */
function createDOM__greenEnergy(state) {
    if (state.toLowerCase() == 'yes') {
        return ' <img src="'+ production_DIR +'/iwov-resources/flp/images/marketplace/electricity/revamp/eco.svg" alt="" data-toggle="tooltip" data-placement="top" title="Eco-friendly" class="isEcoFriendly">';
    } else { return '' }
}


/* 📦 cleanSavings() */
var cleanSavings = function (savings) {
    var temp = Math.round(parseFloat(savings.replace('$', '').replace(',', '')));
    return numberWithCommas(temp);
    // return savings.replace('$','');
}


/* 📦  Create DOM Comparison */
function createDOM__comparisonPlans(comparisonList) {
    var comparisonList = JSON.parse(comparisonList);
    // console.log(comparisonList);
    $('.compareItems > div').removeClass('activeComparison');
    $.each(comparisonList, function (i, v) {
        var parent = '#compareItem-' + (i + 1);

        /*  */
        $(parent).addClass('activeComparison');

        /* First Section */
        $(parent + ' > .compareItems--card .compare--logo').css('background-image', 'url("'+ production_DIR + v.logo + '")');
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
        $('.compareItems--col' + (i + 1) + ' .plan__details--card:nth-child(1) .body').html(v.plan_name);
        $('.compareItems--col' + (i + 1) + ' .plan__details--card:nth-child(2) .body').html(v.rate);
        $('.compareItems--col' + (i + 1) + ' .plan__details--card:nth-child(3) .body').html(v.rate_type);
        $('.compareItems--col' + (i + 1) + ' .plan__details--card:nth-child(4) .body').html(v.monthly_savings);
        $('.compareItems--col' + (i + 1) + ' .plan__details--card:nth-child(5) .body').html(v.contract_duration);
        $('.compareItems--col' + (i + 1) + ' .plan__details--card:nth-child(6) .body').html(v.termination);
        $('.compareItems--col' + (i + 1) + ' .plan__details--card:nth-child(7) .body').html(v.promotion);

        /* Last Section */
        $('.compareItems--col' + (i + 1) + '  .plan__details--card:nth-child(8) .body:nth-child(2)').html(v.comparison_1);
        $('.compareItems--col' + (i + 1) + '  .plan__details--card:nth-child(8) .body:nth-child(3)').html(v.comparison_2);
        $('.compareItems--col' + (i + 1) + '  .plan__details--card:nth-child(8) .body:nth-child(4)').html(v.comparison_3);

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
        // console.log(removeIndex);
        if (globalContentState == "TMP-CONTENT") {
            createDOM__comparisonPlans__TMP(sessionStorage.getItem("comparisonList"));
        } else {
            createDOM__comparisonPlans(sessionStorage.getItem("comparisonList"));
        }
        var compareVar = '.compare__plans input[type="checkbox"]',
            parentCompare = '.emp__compareConfirmation',
            parentRecompare = '.emp__recompareConfirmation';
        init__comparisonScreens(parentCompare, parentRecompare);
        validate__compareCheckbox();
        trackPageLevel('compare_remove');
    });
}

function numberWithCommas(number) {
    var parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}








// Expiry Component
var campaignModule = {
    checkExpiry: function(item){
        if(getQueryVariable('activity') != undefined){
            var activityQuery = getQueryVariable('activity');
            var dateToday = new Date();
            var expiry_date = new Date(item.activity_expiry);
            if(item.activity_name != "public" && item.activity_name == activityQuery && expiry_date >= dateToday){
                return 'active';
            }else if(item.activity_name == activityQuery && expiry_date < dateToday){
                return 'expired';
            }else if(item.activity_name != activityQuery){
                return 'invalid';
            }else if(item.activity_name == 'public'){
                return 'public';
            }
        }else{
            if(item.activity_name == 'public'){
                return 'public';
            }else{
                return 'invalid';
            } 
        }
    },
    init: function(){
        var sstyle = "position: fixed; bottom: 0px; right: 0px; background: #FFF; z-index: 999999;";
        $('body').append('<div id="date-today" style="'+sstyle+'">' + new Date() + '</div>');
        setInterval(function(){
            $('#date-today').html(new Date());
        }, 1000);
    },
    createLabel: function(state, item){
        var html;
        var style = "position: absolute; left: 0px; left: 0px; width: 100%;";
        switch (state){
            case 'active':
                html = '<div class="label label-success" style="'+style+'"> Active until ' + item.activity_expiry + '</div>';
                break;
            case 'expired':
                html = '<div class="label label-danger" style="'+style+'"> Expired last ' + item.activity_expiry + '</div>'; 
                break;
            default:
                break;
        }
        return html;
    },
    createError: function(state){
        switch (state){ 
            case 'expired': 
                $('.emp__campaign__validator').html('<p class="text-danger">This activity has expired.</p>');
                break;
            case 'invalid':
                $('.emp__campaign__validator').html('<p class="text-muted">This activity is not active and/or invalid. Please contact customer support. For the mean time, please check other plans we offer.</p>');
                break; 
            default:
                break;
        }
    }
}
 

$(function(){
    campaignModule.init();
}); 