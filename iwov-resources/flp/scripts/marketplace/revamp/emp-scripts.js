 /* 📦 Show illustration modal */
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

/* 📦 Check ?monthly param */
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
        } else if (isNaN(monthly)) {
            console.warn('Warning: query param: "monthly=' + monthly + '" is not acceptable.');
        }
    });
    if (totalResult <= 0) {
        console.warn('Warning: query param: "monthly=' + monthly + '" is not within range.');
    }
}

/* 📦 Check ?living param  */
var validate__livingQuery = function (living) {
    var acceptedHomes = [];
    $('#planForm__dropdown .place-live option').each(function (i, k) {
        if ($(this).val() != '') {
            acceptedHomes.push($(this).val());
        }
    });
    if (living != undefined && $.inArray(living, acceptedHomes) > -1) {
        console.log(true);
        $('.place-live').val(living)
    } else {
        console.warn('Warning: query param: "living=' + living + '" is not acceptable.');
    }
}

/* 📦 Check ?ecofriendly param */
var validate__ecofriendly = function (ecofriendly) {
    if (ecofriendly != undefined && ecofriendly == 'yes') {
        $('#filter-type-1').val('showEcoFriendly').change();
    } else if (ecofriendly != undefined && ecofriendly != 'yes' && getQueryVariable('rate') == undefined && getQueryVariable('retailer') == undefined) {
        console.warn('Warning: query param: "ecofriendly=' + ecofriendly + '" is not acceptable.');
    }
}

/* 📦 Check ?rate param */
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

/* STUN 🔍 ?retailer */
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
        console.log(queryRetailers);

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
        console.log(confirmedRetailers);
    }
}

/* 📦 Check ?sort param  */
var validate__sortList = function(sortList){
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
                console.warn('Warning: query param: "rate=' + getQueryVariable('rate') + '" is not acceptable.');
                break;
        }

    }
}
/* 📦 Init ?external param  */
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
        jplist.init();
    }
}
 
/* 📦 Show/Hide Functions */
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
        $('.emp__loader').fadeIn('1000'); 
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
            $('.emp__exitScreen, .emp__results').hide();
            $('.emp__landing').fadeIn('1000');
            break;
        case "showResults":
            $('.emp__exitScreen, .emp__landing').hide();
            $('.emp__results').fadeIn('1000');
            break;
        default:
            // Show Exit
            $('.emp__landing, .emp__results').hide();
            $('.emp__exitScreen').fadeIn('1000');
            break;
    }
}

/* 📦 Show Exit Screens */
function initExitScreens() {
    $('.triggerApplyScreen').off();
    $('.triggerApplyScreen').on('click', function () {
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
$('#planForm .range-cost').on('change', function () {
    $('#planForm__dropdown .range-cost, #planForm__dropdown2 .range-cost').val($(this).val());
});

/* 📦 Refresh Pagination */
function reflectPageCount() {
    setTimeout(function () {
        var pageRange = $('.pageRange').html(),
            pageTotal = $('.pageTotal').html();
        $('.current-items').html(pageRange);
        $('.total-items').html(pageTotal);
    }, 100);

    $('.pagination').on('click', function (e) {
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

    $('.monthly-bill-header').html('S$' + minBill + ' ‒ ' + 'S$' + maxBill);
    $('.place-live-copy').html(placeLive);
    // Check if user is submitting using the dropdownForm version 
    if ($(this).attr('id') == 'planForm__dropdown2') {
        setTimeout(function () {
            $('#filterCollapse').trigger('click');
        }, 200);
    }
    if ($(this).attr('id') == 'planForm__dropdown' || $(this).attr('id') == 'planForm__dropdown2') {
        $('#emp__editPlans__overlay').modal('hide');
        populatePlans(0, maxBill, 'refresh');
    } else {
        populatePlans(0, maxBill, 'init');
    }
    /* Manage DOM displays */
    showLandingDivs(false);
    showPlanDOM(true);
    showPlanDOM__state = true;
    addToCompare();
});




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
    addToCompare();

    $('#main-pagination [data-type="first"]').trigger('click');
    setTimeout(() => {
        reflectPageCount();
    }, 500);
});



$('#filter-type-1').on('change', function () {

    var filter1_val = $(this).val();

    /* Check if eco friendly */
    switch (filter1_val) {
        case 'showEcoFriendly':
            $('.filter-type-2').val('all').change();
            console.log('Showing: ' + filter1_val);
            resetRetailerCheckbox();
            $('#action--hidden--cb--ecofriendly:not(:checked)').trigger('click');
            /* Reset Other filters */
            element = document.getElementById('filter-type-2');
            jplist.resetControl(element);
            $('.filter-type-3').hide();
            setTimeout(function () {
                jplist.refresh();
                $('.filter-type-2').hide();
            }, 200);

            reflectPageCount();
            break;
        case 'rate-type':
            $('.filter-type-2').val('all').change();
            console.log('Showing: ' + filter1_val);
            resetRetailerCheckbox();
            $('#action--hidden--cb--ecofriendly:checked').trigger('click');
            $('.filter-type-3').hide();
            setTimeout(function () {
                jplist.refresh();
                $('.filter-type-2').show();
            }, 200);
            reflectPageCount();
            break;
        case 'retailers':
            $('.filter-type-2').val('all').change();
            console.log('Showing: ' + filter1_val);
            resetRetailerCheckbox();
            $('#action--hidden--cb--ecofriendly:checked').trigger('click');
            element = document.getElementById('filter-type-2');
            jplist.resetControl(element);
            setTimeout(function () {
                jplist.refresh();
                $('.filter-type-2').hide();
                $('.filter-type-3').show();
            }, 200);
            reflectPageCount();
            break;
        default:
            console.log('Showing: ' + filter1_val);
            $('.filter-type-2').hide();
            reflectPageCount();
            // jplist.resetControls('#filter-type-2');
            break;
    }




    setTimeout(function () {

        addToCompare();
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

$('#filter-type-3--apply').on('click', function () {
    var cb__control = $('.filter-type-3--dummy-cb:checked').length;
    if (cb__control == 0) {
        alert('Please select at least one (1) retailer.');
    } else {
        $('.action--hidden--cb:checked').trigger('click');
        var placeholderTxt = '';
        $('.filter-type-3--dummy-cb:checked').each(function (i, k) {
            console.log('data-path=".retailer--' + $(this).val() + '"');
            var control = '[data-path=".retailer--' + $(this).val() + '"]';
            $(control + ':not(:checked)').trigger('click');

            placeholderTxt += $(this).parent().text() + ', ';

        });
        if (cb__control == 8) {
            $('.filter-type-3--placeholder option').text('All Retailers');
        } else {
            $('.filter-type-3--placeholder option').text(placeholderTxt.replace(/,\s*$/, ""));
        }
        reflectPageCount();
    }
});

function resetRetailerCheckbox() {
    $('.filter-type-3--dummy-cb:not(:checked)').trigger('click');
    $('.action--hidden--cb:not(:checked)').trigger('click');
}

$('.sort-type-1').on('change', function () {
    reflectPageCount();
    addToCompare();

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


/* STUB jpList Change listener */
//get a jPList control element
var jpListElements = document.getElementById('main-pagination');

//listen to the state event
jpListElements.addEventListener('jplist.state', (e) => {

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

}, false);


/* REVIEW Comparison Feature*/
var compareCounter = 0,
    compareItemsArray = [];
function addToCompare() {
    var compareVar = '.compare__plans input[type="checkbox"]',
        parentCompare = '.emp__compareConfirmation',
        parentRecompare = '.emp__recompareConfirmation';

    //Reinitializing this function resets all checkboxes
    $(compareVar + ':checked').removeAttr('checked', 'checked');
    $(compareVar + ':not(:checked)')
        .removeClass('disabled')
        .removeAttr('disabled', 'disabled')
        .parent().removeClass('disabled');
    $('.emp__compareConfirmation').fadeOut();

    $(compareVar).on('change load', function (e) {
        var compareVarAmount = $(compareVar + ':checked').length;
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
            $('.emp__compareConfirmation').fadeOut();
        }
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

        var temp = (this.value).split(",");
        if (compareItemsArray.indexOf(temp[0]) == -1) {
            compareItemsArray.push(temp[0], temp[1]);
        } else {
            var pos = compareItemsArray.indexOf(temp[0]);
            compareItemsArray.splice(pos, 2);
        }
        console.log(compareItemsArray);

    });

    $('#startCompare').on('click', function (e) {
        $('.emp__results').fadeOut();
        $('.emp__comparison').fadeIn();
        $('html, body').animate({
            scrollTop: $(".emp__comparison").offset().top - 200
        }, 500);
    });
    $('#endCompare').on('click', function (e) {
        $('.emp__comparison').fadeOut();
        $('.emp__results').fadeIn();
    });
}

 


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
        showOnScrollMenu(false);
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