var showPlanDOM__state = false;
$(function () {
    /* MODAL triggers */
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

    if (getQueryVariable('external') == 'true') {
        /* 
           external == true
           monthly=50
           living=hdb_3_room
           rate (filter type) = all | discounted | fixed
           retail = all | bestelectricity,...
           ecofriendly = yes 
       */

        editPlansModal.modal('show');

        // $('#filter-type-1').val('showEcoFriendly').change();

        setTimeout(function () {
            $('#planForm').submit();
            jplist.refresh();
        }, 500);


        $('#planForm__dropdown .range-cost option').each(function (i, k) {
            if (getQueryVariable('monthly') != NaN
                && getQueryVariable('monthly') != undefined
                && $(this).val() != '') {
                var qry__monthlyBill = parseInt(getQueryVariable('monthly')),
                    min_range = $(this).data('from'),
                    max_range = $(this).data('to');
                var result = (qry__monthlyBill >= min_range && qry__monthlyBill <= max_range ? true : false);
                console.log(qry__monthlyBill, min_range, max_range, result);
                if (result === true) {
                    $('.range-cost').val($(this).val())
                }
            } else if (isNaN(getQueryVariable('monthly'))) {
                console.warn('Warning: query param: "monthly=' + getQueryVariable('monthly') + '" is not acceptable.');
            }
        });

        var acceptedHomes = [];
        $('#planForm__dropdown .place-live option').each(function (i, k) {
            if ($(this).val() != '') {
                acceptedHomes.push($(this).val());
            }
        });
        if (getQueryVariable('living') != undefined && $.inArray(getQueryVariable('living'), acceptedHomes) > -1) {
            console.log(true);
            $('.place-live').val(getQueryVariable('living'))
        }
        console.log(acceptedHomes);

        /* STUB Check if ecofriendly */
        if (getQueryVariable('ecofriendly') != undefined && getQueryVariable('ecofriendly') == 'yes') {
            $('#filter-type-1').val('showEcoFriendly').change();
            
             
        }

        /* STUB Check retailer Parameter */
        var validRetailers = ['bestelectricity', 'geneco', 'iswitch', 'keppel', 'pacificlight', 'sunseap', 'tuaspower', 'unionpower'];
        if (getQueryVariable('retailer') != undefined) {
            $('#filter-type-1').val('retailers').change();
            var queryRetailers = getQueryVariable('retailer').split(',');
            console.log(queryRetailers);
            /* Check if all retailers are valid */
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
        jplist.init();
    }

    /* Hidden  */
    $('.filter-type-3').hide();

    $('.filter-type-3 .dropdown .dropdown-menu > div').on('click', function (event) {
        event.stopPropagation()
        let url = event.target.href
    });



});
/* 
*  slick.js
*  Init mobile slick
 */

$(function () {
    if(getQueryVariable('external') != undefined && getQueryVariable('external') == 'true'){
        
    }else{
        jplist.init();
    }
    $('.partners__box--slick').slick({
        infinite: true,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1
    });
});


/* 
*   STUB handle #formPlan submissions
*
*/
$('#planForm, #planForm__dropdown, #planForm__dropdown2').on('submit', function (e) {
    e.preventDefault();

    // $('#emp__editPlans__overlay').modal('hide');

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


/* STUB copy handlers for choosing first filter */
$('#planForm .place-live').on('change', function () {
    $('#planForm__dropdown .place-live, #planForm__dropdown2 .place-live').val($(this).val());
});
$('#planForm .range-cost').on('change', function () {
    $('#planForm__dropdown .range-cost, #planForm__dropdown2 .range-cost').val($(this).val());
});

$('.filter-type-2').on('change', function () {

    addToCompare();

    $('#main-pagination [data-type="first"]').trigger('click');
    setTimeout(() => {
        reflectPageCount();
    }, 500);
});

$('#filter-type-3').on('click', function () {
    alert('@TODO pending');
});

$('#filter-type-1').on('change', function () {

    var filter1_val = $(this).val();

    /* Check if eco friendly */
    switch (filter1_val) {
        case 'showEcoFriendly':
            console.log('Showing: ' + filter1_val);
            resetRetailerCheckbox();
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
            console.log('Showing: ' + filter1_val);
            resetRetailerCheckbox();
            $('.filter-type-3').hide();
            setTimeout(function () {
                jplist.refresh();
                $('.filter-type-2').show();
            }, 200);
            reflectPageCount();
            break;
        case 'retailers':
            console.log('Showing: ' + filter1_val);
            resetRetailerCheckbox();
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

    $('#main-pagination [data-type="first"]').trigger('click');
});


$('#hidePlans').on('click', function (e) {
    showLandingDivs(true);
    showPlanDOM(false);
});



/* STUB show/hide functions */
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
            $('.emp__landing, .emp__results').hide();
            $('.emp__exitScreen').fadeIn('1000');
            break;
    }
}

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

$(function () {
    $('#exit_empExitScreen').on('click', function () {
        manageExitScreen('showResults');
    });
});


//get a jPList control element
var element = document.getElementById('main-pagination');

//listen to the state event
element.addEventListener('jplist.state', (e) => {

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

    initExitScreens();

}, false);


/* STUB addToCompare Cart 
    TODO to be refactored */
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



/* STUB onLoad */
$(window).on('load', function () {
    // $.support.transition = false;
    //Ensures all script must be loaded before submitting
    $('#planForm button[type="submit"]').removeAttr('disabled');
});

/* STUB onReady */
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

/* STUB onScroll showHide top filter */
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

/* STUB refresh */
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

/* STUB isInViewPort */
$.fn.isInViewport = function () {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};

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