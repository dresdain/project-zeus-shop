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
$('#planForm').on('submit', function(e){ 
    e.preventDefault(); 
    //
    showLandingDivs(false);
    showPlanDOM(true);
    showPlanDOM__state = true;
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
        setTimeout(function(){
            $('.emp__landing ~ .group-tiles').addClass('kagebunshin');;
        }, 200);
    }else{
        $('.emp__results').fadeOut('1000');
    }
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
                $('.emp__menu__top').addClass('sticky--nav').removeClass('sticky--nav--shift');
            }else{
                $('.emp__menu__top').addClass('sticky--nav--shift');
            }
        }else if($(window).scrollTop() < 370){
            $('.emp__menu__top').removeClass('sticky--nav sticky--nav--shift');
        }
    }else{
        $('.emp__menu__top').removeClass('sticky--nav sticky--nav--shift');
    }
});
 