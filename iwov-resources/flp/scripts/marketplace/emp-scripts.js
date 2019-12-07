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
    console.log(e);
    e.preventDefault(); 
    //
    hideLandingDivs();
    
    //
    showPlanDOM();
});


/* STUB show/hide functions */
function hideLandingDivs(){
    $('.emp__landing').fadeOut();
    $('.emp__landing ~ .group-tiles').fadeOut();
}
function showPlanDOM(){
    
}