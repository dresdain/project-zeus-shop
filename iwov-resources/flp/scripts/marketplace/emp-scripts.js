var showPlanDOM__state = false;
/* 
*  slick.js
*  Init mobile slick
 */

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
$('#planForm, #planForm__dropdown').on('submit', function(e){ 
    e.preventDefault(); 
    // Check if user is submitting using the dropdownForm version 
    if($(this).attr('id') == 'planForm__dropdown'){
        $('#filterCollapse__box').collapse('hide');
        populatePlans(0, 100, 'refresh');
    }else{
        populatePlans(0, 50, 'init');
    }
    /* Manage DOM displays */
    showLandingDivs(false);
    showPlanDOM(true);
    showPlanDOM__state = true;
    addToCompare();

    //STUB start population
    

});

$('#hidePlans').on('click', function(e){
    showLandingDivs(true);
    showPlanDOM(false);
});


/* STUB show/hide functions */
function showLandingDivs(state){
    if(state === true){
        $('.emp__landing').removeClass('kagebunshin');
        $('.emp__landing ~ .group-tiles').show();
    }else{
        $('.emp__landing').addClass('kagebunshin');;
        $('.emp__landing ~ .group-tiles').hide();
    }
}
function showPlanDOM(state){
    if(state === true){
        $('.emp__results').fadeIn('1000');
        $('.emp__loader').fadeIn('1000');
 
        setTimeout(function(){
            $('.group-tiles').addClass('kagebunshin');;
        }, 200);
    }else{
        $('.emp__results').fadeOut('1000');
    }
}

/* STUB addToCompare Cart */
var compareCounter = 0,
    compareItemsArray = [];
function addToCompare(){
    var compareVar = '.compare__plans input[type="checkbox"]',
        parentCompare = '.emp__compareConfirmation',
        parentRecompare = '.emp__recompareConfirmation';

    //Reinitializing this function resets all checkboxes
    $(compareVar + ':checked').removeAttr('checked','checked');
    $(compareVar + ':not(:checked)')
                .removeClass('disabled')
                .removeAttr('disabled', 'disabled')
                .parent().removeClass('disabled');
    $('.emp__compareConfirmation').fadeOut();

    $(compareVar).on('change load', function(e){ 
        var compareVarAmount = $(compareVar + ':checked').length;
        if(compareVarAmount > 0){
            $(parentCompare).fadeIn('500');
            $(parentCompare + ' .compareAmount').text(compareVarAmount);
            $(parentCompare + ' .compareState')
            .text((compareVarAmount != 3 ? '(of 3)' : '(Max)')); 

            $(parentRecompare).fadeIn('500');
            $(parentRecompare + ' .compareAmount').text(compareVarAmount);
            $(parentRecompare + ' .compareState')
            .text((compareVarAmount != 3 ? '(of 3)' : '(Max)')); 
        }else{
            $('.emp__compareConfirmation').fadeOut();
        }
        if(compareVarAmount < 3){
            $(compareVar + ':not(:checked)')
                .removeClass('disabled')
                .removeAttr('disabled', 'disabled')
                .parent().removeClass('disabled'); 
        }else{
            $(compareVar + ':not(:checked)')
                .addClass('disabled')
                .attr('disabled', 'disabled')
                .parent().addClass('disabled'); 
        }

        var temp = (this.value).split(",");
        if (compareItemsArray.indexOf(temp[0]) == -1) {
            compareItemsArray.push(temp[0],temp[1]);
        } else {
            var pos = compareItemsArray.indexOf(temp[0]);
            compareItemsArray.splice(pos, 2);
        }
        console.log(compareItemsArray);

    });

    $('#startCompare').on('click', function(e){
        $('.emp__results').fadeOut();
        $('.emp__comparison').fadeIn();
        $('html, body').animate({
            scrollTop: $(".emp__comparison").offset().top - 200
        }, 800);
    });
    $('#endCompare').on('click', function(e){
        $('.emp__comparison').fadeOut();
        $('.emp__results').fadeIn(); 
    });
}
 


/* STUB onLoad */
$(window).on('load', function(){
    // $.support.transition = false;
    //Ensures all script must be loaded before submitting
    $('#planForm button[type="submit"]').removeAttr('disabled');
});

/* STUB onReady */
$(function(){
    $('[data-toggle="tooltip"]').tooltip(); 
});

/* STUB onScroll showHide top filter */
$(window).scroll(function(){  
    if($(window).width() > 768){
        if($(window).scrollTop() > 434){
            if($('.header-placeholder > header.navbar').hasClass('mini-menu')){
                showOnScrollMenu(true, [
                    '.emp__menu__top',
                    '.emp__recompareConfirmation',
                    '.emp__loader'
                ]);  
            }else{
                showOnScrollMenu('shift', [
                    '.emp__menu__top',
                    '.emp__recompareConfirmation',
                    '.emp__loader'
                ]);  
            }
        }else if($(window).scrollTop() < 370){
            showOnScrollMenu(false, [
                '.emp__menu__top',
                '.emp__recompareConfirmation',
                '.emp__loader'
            ]);    
        }
    }else{
        showOnScrollMenu(false, [
            '.emp__menu__top',
            '.emp__recompareConfirmation',
            '.emp__loader'
        ]);  
    }

    if ($('#primaryFooter').isInViewport()){
        $('.emp__compareConfirmation').addClass('undock--nav'); 
    }else {
        $('.emp__compareConfirmation').removeClass('undock--nav'); 
    }
});
 
function showOnScrollMenu(state, target){
    if(state === false){
        if($.isArray(target)){
            $(target).each(function(i, val){  
                $(val).removeClass('sticky--nav sticky--nav--shift');
            });
        }else{
            $(target).removeClass('sticky--nav sticky--nav--shift');
        }
    }else if(state === true){
        if($.isArray(target)){
            $(target).each(function(i, val){
                $(val).addClass('sticky--nav').removeClass('sticky--nav--shift');
            });
        }else{
            $(target).addClass('sticky--nav').removeClass('sticky--nav--shift');
        } 
    }else if(state == 'shift'){
        if($.isArray(target)){
            $(target).each(function(i, val){
                $(val).addClass('sticky--nav--shift');
            });
        }else{
            $(target).addClass('sticky--nav--shift');
        }  
    }
}

/* STUB refresh */
function reflectPageCount (){
    var pageRange = $('.pageRange').html(),
        pageTotal = $('.pageTotal').html();
        $('.current-items').html(pageRange);
            $('.total-items').html(pageTotal);

    $('.pagination').on('click', function(e){
        var pageRange = $('.pageRange').html(),
            pageTotal = $('.pageTotal').html(); 
            $('.current-items').html(pageRange);
            $('.total-items').html(pageTotal); 
    });
}

/* STUB isInViewPort */
$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};