/* 
* Only for triggerring events and interactions
* No logic an
*
*/

/* STUB on load show/hide */
function test__showHideDOM(){
    $('#planForm').trigger('submit'); 
}

function test__duplicateDOM(){
    for (var index = 0; index < 10; index++) {
        $("div.emp__results__box--list").append($("#plan_id-1").clone());
    }
    $('[data-toggle="tooltip"]').tooltip(); 
}


/* On page load */
$(window).on('load', function(){


    // test__showHideDOM();


    test__duplicateDOM();


});

/* On DOM load */
$(function(){
    
});

/* On scroll */
$(window).scroll(function(){

});