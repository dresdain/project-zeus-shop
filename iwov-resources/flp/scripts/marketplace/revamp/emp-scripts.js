var showPlanDOM__state = false;
$(function(){
    /* MODAL triggers */
    var illustrationTrigger = $('#illustrationFromEditPlans'),
        illustrationClose = $('#illustrationPlan .close'),
        editPlansModal = $('#emp__editPlans__overlay');

    illustrationTrigger.on('click', function(){
        illustrationClose.addClass('resumeEditPlans');
        editPlansModal.modal('hide');
        $('.resumeEditPlans').on('click', function(){
            editPlansModal.modal('show');
        }); 
    });

    /* Hidden  */
    $('.filter-type-3').hide();
    



});
/* 
*  slick.js
*  Init mobile slick
 */

 $(function(){
    jplist.init();
    
 });
$('.partners__box--slick').slick({
    infinite: true,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1
});

/* 
*   STUB handle #formPlan submissions
*
*/
$('#planForm, #planForm__dropdown').on('submit', function (e) {
    e.preventDefault();

    $('#emp__editPlans__overlay').modal('hide');

    var maxBill = $('.range-cost', this).find(':selected').attr('data-to');
    var minBill = $('.range-cost', this).find(':selected').attr('data-from');
    var placeLive = $('.place-live', this).find(':selected').attr('data-title');

    $('.monthly-bill-header').html('S$' + minBill + ' ‒ ' + 'S$' + maxBill);
    $('.place-live-copy').html(placeLive);
    // Check if user is submitting using the dropdownForm version 
    if ($(this).attr('id') == 'planForm__dropdown') {
        $('#filterCollapse__box').collapse('hide');
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
    $('#planForm__dropdown .place-live').val($(this).val());
});
$('#planForm .range-cost').on('change', function () {
    $('#planForm__dropdown .range-cost').val($(this).val());
});

$('.filter-type-2').on('change', function () {
 
    addToCompare();
   
    $('#main-pagination [data-type="first"]').trigger('click');
    setTimeout(() => {
        reflectPageCount();
    }, 500);
});
 
$('#filter-type-3').on('click', function(){
    alert('@TODO pending');
});

$('#filter-type-1').on('change', function () {
     
    var filter1_val = $(this).val();
    
    /* Check if eco friendly */
    switch (filter1_val) {
        case 'showEcoFriendly': 
            console.log('Showing: ' + filter1_val);
            element = document.getElementById('filter-type-2'); 
            jplist.resetControl(element);
            $('.filter-type-3').hide();
            setTimeout(function(){
                jplist.refresh();
                $('.filter-type-2').hide(); 
            }, 200);
     
            reflectPageCount();     
            break;
        case 'rate-type': 
            console.log('Showing: ' + filter1_val);
            $('.filter-type-3').hide();
            setTimeout(function(){
                jplist.refresh();
                $('.filter-type-2').show(); 
            }, 200);
            reflectPageCount();
            break;
        case 'retailers':  
            console.log('Showing: ' + filter1_val);
            element = document.getElementById('filter-type-2'); 
            jplist.resetControl(element);
            setTimeout(function(){
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
    
    
    
     
    setTimeout(function(){
        
        addToCompare();
    }, 200);

});



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