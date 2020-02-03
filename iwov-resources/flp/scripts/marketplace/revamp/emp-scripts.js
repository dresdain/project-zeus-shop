/* 📦 show__illustrationModal */
var show__illustrationModal = function () {
    var illustrationTrigger = $('#illustrationFromEditPlans'),
        illustrationClose = $('#illustrationPlan .close'),
        editPlansModal = $('#emp__editPlans__overlay');
    illustrationTrigger.on('click', function () {
        illustrationClose.addClass('resumeEditPlans');
        editPlansModal.modal('hide');
        $('.resumeEditPlans').on('click', function () {
            editPlansModal.modal('show');
        });
    });
}

/* 📦 validate__monthlyQuery */
var validate__monthlyQuery = function (monthly) {
    var totalResult = 0;
    $('#planForm__dropdown .range-cost option').each(function (i, k) {
        if (monthly != NaN && monthly != undefined && $(this).val() != '') {
            var qry__monthlyBill = parseInt(monthly), min_range = $(this).data('from'), max_range = $(this).data('to');
            var result = (qry__monthlyBill >= min_range && qry__monthlyBill <= max_range ? true : false);
            // console.log(qry__monthlyBill, min_range, max_range, result);
            if (result === true) {
                totalResult++;
                $('.range-cost').val($(this).val())
            }
        } else if (isNaN(monthly) && monthly != undefined) {
            console.warn('Warning: query param: "monthly=' + monthly + '" is not acceptable.');
        }
    });
    if (totalResult <= 0 && monthly != undefined) {
        console.warn('Warning: query param: "monthly=' + monthly + '" is not within range.');
    }
}

/* 📦 validate__livingQuery  */
var validate__livingQuery = function (living) {
    var acceptedHomes = [];
    $('#planForm__dropdown .place-live option').each(function (i, k) {
        if ($(this).val() != '') {
            acceptedHomes.push($(this).val());
        }
    });
    if (living != undefined && $.inArray(living, acceptedHomes) > -1) {
        // console.log(true);
        $('.place-live').val(living)
    } else if (living != undefined) {
        console.warn('Warning: query param: "living=' + living + '" is not acceptable.');
    }
}

/* 📦 validate__ecofriendly  */
var validate__ecofriendly = function (ecofriendly) {
    if (ecofriendly != undefined && ecofriendly == 'yes') {
        $('#filter-type-1').val('showEcoFriendly').change();
    } else if (ecofriendly != undefined && ecofriendly != 'yes' && getQueryVariable('rate') == undefined && getQueryVariable('retailer') == undefined) {
        console.warn('Warning: query param: "ecofriendly=' + ecofriendly + '" is not acceptable.');
    }
}

/* 📦 validate__rate */
var validate__rate = function (ratetype) {
    if (ratetype != undefined) {
        if (getQueryVariable('ecofriendly') != undefined) {
            console.warn('Warning: query param: "ecofriendly=' + getQueryVariable('ecofriendly') + '" cannot be stacked with other query filter options (?rate, ?retailer).');
        }
        $('#filter-type-1').val('rate-type').change();
        switch (ratetype) {
            case 'all':
                $('.filter-type-2').val('all').change();
                break;
            case 'fixed':
                $('.filter-type-2').val('fixed').change();
                break;
            case 'discounted':
                $('.filter-type-2').val('discounted').change();
                break;
            default:
                console.warn('Warning: query param: "rate=' + ratetype + '" is not acceptable.');
                break;
        }
    }
}

/* 📦 validate__retailers */
var validate__retailers = function (retailers) {
    var validRetailers = ['bestelectricity', 'geneco', 'iswitch', 'keppel', 'pacificlight', 'sunseap', 'tuaspower', 'unionpower'];
    if (retailers != undefined) {
        if (getQueryVariable('ecofriendly') != undefined) {
            console.warn('Warning: query param: "ecofriendly=' + getQueryVariable('ecofriendly') + '" cannot be stacked with other query filter options (?rate, ?retailer).');
        }
        if (getQueryVariable('rate') != undefined) {
            console.warn('Warning: query param: "rate=' + getQueryVariable('rate') + '" cannot be stacked with other query filter options (?ecofriendly, ?retailer).');
        }
        $('#filter-type-1').val('retailers').change();
        var queryRetailers = retailers.split(',');
        // console.log(queryRetailers);

        var confirmedRetailers = [];
        $.each(queryRetailers, function (i, v) {
            // console.log('confirmasd: ' + v); 
            if ($.inArray(v, validRetailers) > -1) {
                // console.log('valid: ' + $.inArray(v, validRetailers));
                confirmedRetailers.push(v);
            }
        });
        /* Confirm all retailers */
        $.each(confirmedRetailers, function (i, v) {
            $('.filter-type-3--dummy-cb:checked').trigger('click');

            setTimeout(function () {
                $('.filter-type-3--dummy-cb[value="' + v + '"]').trigger('click');
                // console.log('confirmd' + v); 
                $('#filter-type-3--apply').trigger('click');
            }, 100);

        });
        // console.log(confirmedRetailers);
    }
}

/* 📦 validate__sortList  */
var validate__sortList = function (sortList) {
    if (getQueryVariable('sort') != undefined) {
        switch (getQueryVariable('sort')) {
            case 'savings':
                $('#sort-type-1').val("0").change();
                break;
            case 'contract':
                $('#sort-type-1').val("1").change();
                break;
            case 'name':
                $('#sort-type-1').val("2").change();
                break;
            default:
                console.warn('Warning: query param: "sort=' + getQueryVariable('rate') + '" is not acceptable.');
                break;
        }

    }
}
/* 📦 init__ExternalOverlay  */
var init__ExternalOverlay = function () {
    show__illustrationModal();
    if (getQueryVariable('external') != undefined && getQueryVariable('external') == 'true') {
        var editPlansModal = $('#emp__editPlans__overlay');
        editPlansModal.modal('show');

        setTimeout(function () {
            $('#planForm').submit();
            jplist.refresh();
        }, 200);

        validate__monthlyQuery(getQueryVariable('monthly'));

        validate__livingQuery(getQueryVariable('living'));

        validate__ecofriendly(getQueryVariable('ecofriendly'));

        validate__rate(getQueryVariable('rate'));

        validate__retailers(getQueryVariable('retailer'));

        validate__sortList(getQueryVariable('sort'));
        jplist.init();
    }
}

/* 📦 showLandingDivs */
function showLandingDivs(state) {
    if (state === true) {
        $('.emp__landing').removeClass('kagebunshin');
        $('.emp__landing ~ .group-tiles').show();
    } else {
        $('.emp__landing').addClass('kagebunshin');;
        $('.emp__landing ~ .group-tiles').hide();
    }
}
function showPlanDOM(state) {
    if (state === true) {
        $('.emp__results').fadeIn('1000');
        $('.emp__loader').fadeIn('200');
        setTimeout(function () {
            $('.group-tiles').addClass('kagebunshin');;
        }, 200);
    } else {
        $('.emp__results').fadeOut('1000');
    }
}

function manageExitScreen(state) {
    switch (state) {
        case "showLanding":
            $('.emp__comparison').hide();
            $('.emp__exitScreen, .emp__results').hide();
            $('.emp__landing').fadeIn('1000');
            break;
        case "showResults":
            $('.emp__comparison').hide();
            $('.emp__exitScreen, .emp__landing').hide();
            $('.emp__results').fadeIn('1000');
            break;
        default:
            // Show Exit
            $('.emp__comparison').hide();
            $('.emp__landing, .emp__results').hide();
            $('.emp__exitScreen').fadeIn('1000');
            break;
    }
}

/* 📦 initExitScreens */
function initExitScreens() {

    $('.triggerApplyScreen').off();
    $('.triggerApplyScreen').on('click', function () {
        $('#consumerAdvisory').modal('show');
        var dataExit = $(this);
        $('#emp_redirect-yes').attr('href', dataExit.data('btn-yes'));
        $('#emp_redirect-no').attr('href', dataExit.data('btn-no'));
        $('#emp_redirect-copy').text(dataExit.data('message'));
        manageExitScreen('showExit');

        $('html, body').animate({
            scrollTop: $(".emp__exitScreen").offset().top - 200
        }, 500);

    });
}


/* 🖥  Reflect Other Forms */
$('#planForm .place-live').on('change', function () {
    $('#planForm__dropdown .place-live, #planForm__dropdown2 .place-live').val($(this).val());
});
$('#planForm__dropdown .place-live').on('change', function () {
    $('#planForm .place-live, #planForm__dropdown2 .place-live').val($(this).val());
});
$('#planForm__dropdown2 .place-live').on('change', function () {
    $('#planForm .place-live, #planForm__dropdown .place-live').val($(this).val());
});


$('#planForm .range-cost').on('change', function () {
    $('#planForm__dropdown .range-cost, #planForm__dropdown2 .range-cost').val($(this).val());
});
$('#planForm__dropdown .range-cost').on('change', function(){
    $('#planForm .range-cost, #planForm__dropdown2 .range-cost').val($(this).val());
});
$('#planForm__dropdown2 .range-cost').on('change', function(){
    $('#planForm .range-cost, #planForm__dropdown .range-cost').val($(this).val());
});

/* 📦 reflectPageCount */
function reflectPageCount() {
    setTimeout(function () {
        var pageRange = $('.pageRange').html(),
            pageTotal = $('.pageTotal').html();
        $('.current-items').html(pageRange);
        $('.total-items').html(pageTotal);
    }, 100);

    $('.page-item').on('click', function (e) {
        var pageRange = $('.pageRange').html(),
            pageTotal = $('.pageTotal').html();
        $('.current-items').html(pageRange);
        $('.total-items').html(pageTotal);
        $('html, body').animate({
            scrollTop: $(".emp__menu__filter--row").offset().top - 300
        }, 0);
    });
}

/* !!SECTION  */




/* 🧠 EMP Init */
var showPlanDOM__state = false;
$(function () { 
    $('[data-toggle="tooltip"]').tooltip();
    init__ExternalOverlay();

    /* Hidden  */
    $('.filter-type-3').hide();


    $('.filter-type-3 .dropdown .dropdown-menu > div').on('click', function (event) {
        event.stopPropagation()
        let url = event.target.href
    });
    if (getQueryVariable('external') == undefined) {
        jplist.init();
    }
    /* Slick.js */
    $('.partners__box--slick').slick({
        infinite: true,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1
    });
});


/* 🖥  View Plans  */
$('#planForm, #planForm__dropdown, #planForm__dropdown2').on('submit', function (e) {
    e.preventDefault();
    var maxBill = $('.range-cost', this).find(':selected').attr('data-to');
    var minBill = $('.range-cost', this).find(':selected').attr('data-from');
    var placeLive = $('.place-live', this).find(':selected').attr('data-title');

    if(maxBill == "Infinity"){
        $('.monthly-bill-header').html('>S$500');
        maxBill = Infinity;
    }else{
        $('.monthly-bill-header').html('S$' + minBill + ' ‒ ' + 'S$' + maxBill);
    }
    
    $('.place-live-copy').html(placeLive);
    // Check if user is submitting using the dropdownForm version 
    if ($(this).attr('id') == 'planForm__dropdown2') {
        setTimeout(function () {
            $('#filterCollapse').trigger('click');
        }, 200);
    }
    if ($(this).attr('id') == 'planForm__dropdown' || $(this).attr('id') == 'planForm__dropdown2') {
        $('#emp__editPlans__overlay').modal('hide');
        populatePlans(minBill, maxBill, 'refresh', $(this).data('type'));
    } else {
        populatePlans(minBill, maxBill, 'init', $(this).data('type'));
    }
    /* Manage DOM displays */
    reset__compareCheckbox();
    showLandingDivs(false);
    showPlanDOM(true);
    showPlanDOM__state = true; 
    
});



/* 🖥 Filter type 2 */
$('.filter-type-2').on('change', function () {
    switch ($(this).val()) {
        case 'discounted':
            $('#action--hidden--rb--discounted').trigger('click');
            break;
        case 'fixed':
            $('#action--hidden--rb--fixed').trigger('click');
            break;
        default:
            $('#action--hidden--rb--all').trigger('click');
            break;
    }
    reset__compareCheckbox();
    $('#main-pagination [data-type="first"]').trigger('click');
    setTimeout(function(){
        reflectPageCount();

    }, 500);

});
 

/* 🖥 Filter Type 1 */
$('#filter-type-1').on('change', function () {
    var filter1_val = $(this).val();
    /* REVIEW Needs refactoring */
    /* Check if eco friendly */
    switch (filter1_val) {
        case 'showEcoFriendly':
            $('.filter-type-2').val('all').change();
            resetRetailerCheckbox();
            $('#action--hidden--cb--ecofriendly:not(:checked)').trigger('click');
            /* Reset Other filters */
            element = document.getElementById('filter-type-2');
            jplist.resetControl(element);
            $('#filter-type-3--apply').trigger('click');
            $('.filter-type-3').hide();
            setTimeout(function () {
                jplist.refresh();
                $('.filter-type-2').hide();
            }, 200);

            reflectPageCount();
            break;
        case 'rate-type':
            $('.filter-type-2').val('all').change();
            resetRetailerCheckbox();
            $('#action--hidden--cb--ecofriendly:checked').trigger('click');
            $('.filter-type-3').hide();
            $('#filter-type-3--apply').trigger('click');
            setTimeout(function () {
                jplist.refresh();
                $('.filter-type-2').show();
            }, 200);
            reflectPageCount();
            break;
        case 'retailers':
            $('.filter-type-3--placeholder option').text('All Retailers');
            $('.filter-type-2').val('all').change();
            resetRetailerCheckbox();
            $('#action--hidden--cb--ecofriendly:checked').trigger('click');
            element = document.getElementById('filter-type-2');
            jplist.resetControl(element);
            $('#filter-type-3--apply').trigger('click');
            setTimeout(function () {
                jplist.refresh();
                $('.filter-type-2').hide();
                $('.filter-type-3').show();
            }, 200);
            reflectPageCount();
            break;
        default:
            $('.filter-type-2').hide();
            reflectPageCount();
            // jplist.resetControls('#filter-type-2');
            break;
    }
    // console.log('Showing: ' + filter1_val);
    reset__compareCheckbox();


    setTimeout(function () {

    }, 200);

});

$('#action--clear-all').on('click', function () {
    $('.filter-type-3--dummy-cb:checked').trigger('click');
});
$('#action--select-all').on('click', function () {
    $('.filter-type-3--dummy-cb:not(:checked)').trigger('click');
});

$('.filter-type-3--dummy-cb').on('click', function () {
    // console.log($('.filter-type-3--dummy-cb:checked').length);
    // var cb__control = $('.filter-type-3--dummy-cb:checked').length;
    // if(cb__control == 1){
    //     $('.filter-type-3--dummy-cb:checked').parent().parent().addClass('disabled');
    //     $('.filter-type-3--dummy-cb:checked').attr('disabled', 'disabled'); 
    // }else{
    //     $('.filter-type-3--dummy-cb:checked').parent().parent().removeClass('disabled');
    //     $('.filter-type-3--dummy-cb:checked').removeAttr('disabled');
    // }

});

/* 🖥 Trigger Retailer Filter */
$('#filter-type-3--apply').on('click', function () {
    var cb__control = $('.filter-type-3--dummy-cb:checked').length;
    if (cb__control == 0) {
        alert('Please select at least one (1) retailer.');
    } else {
        $('.action--hidden--cb:checked').trigger('click');
        var placeholderTxt = '';
        $('.filter-type-3--dummy-cb:checked').each(function (i, k) {
            // console.log('data-path=".retailer--' + $(this).val() + '"');
            var control = '.action--hidden--cb[value="' + $(this).val() + '"]';
            $(control + ':not(:checked)').trigger('click');

            placeholderTxt += $(this).parent().text() + ', ';
            $('#planForm').submit();
            reset__compareCheckbox();
        });
        if (cb__control == 8) {
            $('.filter-type-3--placeholder option').text('All Retailers');
        } else {
            $('.filter-type-3--placeholder option').text(placeholderTxt.replace(/,\s*$/, ""));
        }

        reflectPageCount();
    }
    $('.filter-type-3--trigger').removeClass('open');
    $('.emp__menu__filter > .container').removeClass('expand');
    $('.filter-type-3 .dropdown-backdrop').remove();
});

$('.filter-type-3--trigger').on('click', function () {
    setTimeout(function () {
        if ($('.filter-type-3--trigger').hasClass('open')) {
            $('.emp__menu__filter > .container').addClass('expand');
            // console.log('asdsa');

        } else {
            $('.emp__menu__filter > .container').removeClass('expand');
        }
    }, 100);
});

$('#filter-type-3--cancel').on('click', function () {
    $('.filter-type-3--trigger').removeClass('open');
    $('.filter-type-3 .dropdown-backdrop').remove();
    $('.emp__menu__filter > .container').removeClass('expand');
});

function resetRetailerCheckbox() {
    $('.filter-type-3--dummy-cb:not(:checked)').trigger('click');
    $('.action--hidden--cb:not(:checked)').trigger('click');
}

$('.sort-type-1').on('change', function () {
    reflectPageCount();

    switch ($(this).val()) {
        case "0":
            $('#action--hidden--rb--sort-savings').trigger('click');
            break;
        case "1":
            $('#action--hidden--rb--sort-duration').trigger('click');
            break;
        case "2":
            $('#action--hidden--rb--sort-name').trigger('click');
            break;
        default:
            break;
    }

    $('#main-pagination [data-type="first"]').trigger('click');
});


$('#hidePlans').on('click', function (e) {
    showLandingDivs(true);
    showPlanDOM(false);
}); 

$(function () {
    $('#exit_empExitScreen').on('click', function () {
        manageExitScreen('showResults');
    });
});


/* 🖥 jpList Change listener */
//get a jPList control element
var jpListElements = document.getElementById('main-pagination');

//listen to the state event
jpListElements.addEventListener('jplist.state', function(e){

    // //the whole state object
    // console.log(e.jplistState);

    // //jPList options provided by user
    // console.log(e.jplistState.options);

    // //current items number after filtering + pagination
    // console.log(e.jplistState.itemsNumber);

    // //control groups
    // console.log(e.jplistState.groups);

    // //the elements list after filtering + pagination
    // console.log(e.jplistState.filtered);
    $('#filter-type-1').on('change', function () {
        jplist.refresh('group-1', document.getElementById('filter-type-1'));
    });
    initExitScreens();
    addToCompare();

}, false);


/* 📦 validate__compareCheckbox */
var validate__compareCheckbox = function () {
    var compareVar = '.compare__plans input[type="checkbox"]';
    var compareVarAmount = JSON.parse(sessionStorage.getItem("comparisonList")).length;
    // console.log("Comparison amount: " + compareVarAmount);
    if (compareVarAmount < 3) {
        $(compareVar + ':not(:checked)')
            .removeClass('disabled')
            .removeAttr('disabled', 'disabled')
            .parent().removeClass('disabled');
    } else {
        $(compareVar + ':not(:checked)')
            .addClass('disabled')
            .attr('disabled', 'disabled')
            .parent().addClass('disabled');
    }
}

/* 📦 reset__compareCheckbox() */
var reset__compareCheckbox = function () {
    sessionStorage.setItem('comparisonList', JSON.stringify([]));
    validate__compareCheckbox();
    var compareVar = '.compare__plans input[type="checkbox"]';
    $(compareVar + ':checked').trigger('click');
    $(compareVar).prop('checked', false);
}


/* 📦 init__comparisonScreens */
var init__comparisonScreens = function (parentCompare, parentRecompare) {
    resize__comparisonCards();
    var compareVarAmount = JSON.parse(sessionStorage.getItem("comparisonList")).length;
    if (compareVarAmount > 0) {
        $(parentCompare).fadeIn('500');
        $(parentCompare + ' .compareAmount').text(compareVarAmount);
        $(parentCompare + ' .compareState')
            .text((compareVarAmount != 3 ? '(of 3)' : '(Max)'));

        $(parentRecompare).fadeIn('500');
        $(parentRecompare + ' .compareAmount').text(compareVarAmount);
        $(parentRecompare + ' .compareState')
            .text((compareVarAmount != 3 ? '(of 3)' : '(Max)'));
    } else {
        $(parentRecompare + ' .compareAmount').text(compareVarAmount);
        $(parentRecompare + ' .compareState')
            .text((compareVarAmount != 3 ? '(of 3)' : '(Max)'));
        $('.emp__compareConfirmation').fadeOut();
    }
}

/* 📦 init__comparisonTickers */
var init__comparisonTickers = function () {
    $('#startCompare').on('click', function (e) {
        createDOM__comparisonPlans(sessionStorage.getItem("comparisonList"));
        resize__comparisonCards();
        $('.emp__results').fadeOut();
        $('.emp__comparison').fadeIn();
        $('html, body').animate({
            scrollTop: $(".emp__comparison").offset().top - 200
        }, 0);
		
		set__compareButtonSize();
    });
    $('#endCompare').on('click', function (e) {
        createDOM__comparisonPlans(sessionStorage.getItem("comparisonList"));
        resize__comparisonCards();
        $('.emp__comparison').fadeOut();
        $('.emp__results').fadeIn();
    });
}

/* 📦 addToCompare */
var compareCounter = 0,
    compareItemsArray = sessionStorage.setItem('comparisonList', JSON.stringify([]));
function addToCompare() { 
    resize__comparisonCards();
    var compareVar = '.compare__plans input[type="checkbox"]',
        parentCompare = '.emp__compareConfirmation',
        parentRecompare = '.emp__recompareConfirmation';
    var tempArr = JSON.parse(sessionStorage.getItem("comparisonList"));

    validate__compareCheckbox();
    init__comparisonScreens(parentCompare, parentRecompare);
    $(compareVar).off();

    $(compareVar).on('change', function () {
        if ($(this).is(":checked")) {
            if (tempArr.length < 3) {
                tempArr.push($(this).data('details'));
            }
        } else {
            tempArr.splice(tempArr.indexOf($(this).data('details')), 1);
        }
        // console.log(tempArr.indexOf(2));

        sessionStorage.setItem('comparisonList', JSON.stringify(sortJSON(tempArr, 'annual_savings', '321')))
        validate__compareCheckbox();
        init__comparisonScreens(parentCompare, parentRecompare);
        init__comparisonTickers();
        createDOM__comparisonPlans(sessionStorage.getItem("comparisonList"));
        remove__comparisonPlan();
    });


}

/* 📦 get__tallestCard */
var get__tallestCard = function (rowNumber) {
    var maxHeight = 0, counter = 1, tallestCard = '';
    for (let index = 1; index <= 3; index++) {
        var compareTo = '#compareItem--details-' + index + ' .plan__details--card:nth-child(' + rowNumber + ')';
        if ($(compareTo).height() > maxHeight) {
            maxHeight = $(compareTo).height();
            tallestCard = compareTo;

        }
    }
    return tallestCard;
}

/* 📦 set__compareButtonSize */
var set__compareButtonSize = function () {
	if (window.matchMedia('(max-width: 768px)').matches) {
		return $(".plan__details--card .btn.btn-primary").width($(".compareItems--card").outerWidth() - 10);
	} else {
		return $(".plan__details--card .btn.btn-primary").width(134);
	}
}

/* REVIEW Consider refactoring */
var get__tallestCardSub = function (rowNumber) {
    var maxHeight = 0, counter = 2, tallestCard = '';
    for (let index = 1; index <= 3; index++) {
        var compareTo = '#compareItem--details-' + index + ' .plan__details--card:nth-child(8) .body:nth-child(' + rowNumber + ')';
        if ($(compareTo).height() > maxHeight) {
            maxHeight = $(compareTo).height();
            tallestCard = compareTo; 
        } 
    }  
    return tallestCard;
}

/* 📦 resize__comparisonCards */
var resize__comparisonCards = function () {
    $('.plan__details--card').removeAttr('style');
    $('.plan__details--card .body').removeAttr('style');
    for (let rowNumber = 1; rowNumber <= 8; rowNumber++) {
        if (rowNumber <= 7) {
            var tallestCardHeight = $(get__tallestCard(rowNumber)).height();
            for (let compareItem = 1; compareItem <= 3; compareItem++) {
                var setHeightFor = '#compareItem--details-' + compareItem + ' .plan__details--card:nth-child(' + rowNumber + ')';
                $(setHeightFor).css('min-height', tallestCardHeight + 'px');
                $(setHeightFor).css('min-height', tallestCardHeight + 'px');
            }
        } else if (rowNumber == 8) { 
            for (let subRowNumber = 2; subRowNumber <= 4; subRowNumber++) {
                var tallestCardHeightSub = $(get__tallestCardSub(subRowNumber)).height();
                for (let compareItem = 1; compareItem <= 3; compareItem++) {
                    var setHeightForSub = '#compareItem--details-' + compareItem + ' .plan__details--card:nth-child(' + rowNumber + ') .body:nth-child(' + subRowNumber + ')';
                    $(setHeightForSub).css('min-height', tallestCardHeightSub + 'px');
                }
            } 
        }
    }

}

/* 🖥 Grayscale hover */
$(function(){
    if (isIE()) {
        $('.partner--logo').each(function(i,e){
            var bgImage = $(this).css('background-image');
            $(this).css('background-image', bgImage.replace('.png', '_bw.png'));
        });
        $('.partner--logo').on({
            mouseenter: function () {
                var bgImage = $(this).css('background-image');
                $(this).css('background-image', bgImage.replace('_bw', '')); 
            },
            mouseleave: function () {
                var bgImage = $(this).css('background-image');
                $(this).css('background-image', bgImage.replace('.png', '_bw.png'));
            }
        }); 
    }
});

/* 🖥 Resize events */
$(window).resize(function(){
    resize__comparisonCards();
	set__compareButtonSize();
});

/* 🖥  Scroll Events */
$(window).scroll(function () {
    if ($(window).width() > 768) {
        if ($(window).scrollTop() > 434) {
            if ($('.header-placeholder > header.navbar').hasClass('mini-menu')) {
                showOnScrollMenu(true);
            } else {
                showOnScrollMenu('shift');
            }
        } else if ($(window).scrollTop() < 370) {
            showOnScrollMenu(false);
        }
    } else {
        // console.log($(window).scrollTop());
        
        if ($(window).scrollTop() > 356) {
            if ($('.header-placeholder > header.navbar').hasClass('mini-menu')) {
                showOnScrollMenu(true);
            } else {
                showOnScrollMenu('shift');
            }
        } else if ($(window).scrollTop() < 370) {
            showOnScrollMenu(false);
        }
    }

    if ($('#primaryFooter').isInViewport()) {
        $('.emp__compareConfirmation').addClass('undock--nav');
    } else {
        $('.emp__compareConfirmation').removeClass('undock--nav');
    }
});

/* 🛠 showOnScrollMenu Helper */
function showOnScrollMenu(state, target) {
    /* Sticky the following elements */
    target = ['.emp__menu__top', '.emp__recompareConfirmation', '.emp__loader'];
    $(target).each(function (i, val) {
        switch (state) {
            case true:
                $(val).addClass('sticky--nav').removeClass('sticky--nav--shift');
                break;
            case 'shift':
                $(val).addClass('sticky--nav--shift');
                break;
            default:
                $(val).removeClass('sticky--nav sticky--nav--shift');
                break;
        }
    });
}

$('#modalSaveMore__open').on('click', function(){
    trackButtonLevel('modalSaveMore__open'); 
});

$('#modalSaveMore__close').on('click', function(){
    trackButtonLevel('modalSaveMore__close'); 
});

$('#filterCollapse').on('click', function(){
    trackButtonLevel('editPlans'); 
});

$('#startCompare').on('click', function(){
    trackButtonLevel('compare'); 
});
$('#endCompare').on('click', function(){
    trackButtonLevel('recompare'); 
});
/* 🛠 isInViewPort Helper */
$.fn.isInViewport = function () {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height(); 
    return elementBottom > viewportTop && elementTop < viewportBottom;
};

/* 🛠  getQueryVariable Helper */
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
}
/* !!SECTION  */

/* 🛠  isIE Helper */
function isIE() {
    ua = navigator.userAgent;
    /* MSIE used to detect old browsers and Trident used to newer ones*/
    var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    console.log('Im using IE: ' + is_ie);

    return is_ie;
}

function sortJSON(data, key, way) {
    return data.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        if (way === '123' ) { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
        if (way === '321') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
    });
}