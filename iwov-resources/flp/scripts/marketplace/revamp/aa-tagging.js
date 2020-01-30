/* Helper functions */
var digitalData;
$(function () {
    trackHomepage();
});
/* 📦 AA Tagging */
var trackHomepage = function (action, item) {
    /* On Page Load */
    digitalData = {
        page: {
            pageInfo: {
                pageName: "[page name]",
                language: "[en] ",
                hier: "[hier]",
                brand: "[brand]",
                country: "[country]",
                destinationURL: "[http://www.dbs.com.sg/personal/default.page]"
            },
            category: {
                pageType: "[]",
                site: "[pweb]", //ib or pweb 
                primaryCategory: "[]",
                subCategory1: "[]", // if there is any 
                subCategory2: "[]" // if there is any 
            }
        }
    };
    console.log('🔍 Tracking -> Homepage', digitalData);
}

var trackButtonLevel = function (action) {
    var control = '';
    switch (action) {
        /* On click of "Click here" link in Save More Ponder Less */
        case 'modalSaveMore__open':
            control = 'lnkSaveMorePonderLess_ClickHere';
            break;
        /* On click of "Close" button of Save More Ponder Less */
        case 'modalSaveMore__close':
            control = 'lnkSaveMorePonderLess_Close';
            break;
        /* On click of "Edit" link on the search results page */
        case 'editPlans':
            control = 'lnkEdit';
            break;
        /* On click of the "Compare" button on the Search Results Page */
        case 'compare':
            control = 'btnCompare';
            break;
        /* On click of "ReCompare" button on the Compare Screen */
        case 'recompare':
            control = 'btnRecompare';
            break;
        default:
            control = '';
            break;
    }
    if (control !== '') {
        digitalData = {
            button: {
                name: control,
            }
        }
        console.log('%c✅ Tracking -> ' + control, 'color: green;', 'digitaData', digitalData);
        // if (typeof (_satellite) !== 'undefined') {
            
            _satellite.track('pweb-generic button');
            
        // } else {
        //     console.warn('%c❌ Tracking Failed -> ' + control, 'color: red;', '-> _satellite is undefined, check Adobe DTM installation.', 'digitaData object:', digitalData);
        // }

    } else {
        console.log('%c🚫 Tracking Failed -> ' + control + ', ' + action + ' <-  Invalid Parameters', 'color: red;');
    }
}

var trackSearch = function (action, item) {
    var control = '';
    switch (action) {
        case 'first_time_search':   
        case 'modified_search':   
            var filterResults = 'emp_search_type:'+ item.emp_search_type +'|monthly_bill:'+ item.monthly_bill +'|prop_type:'+ item.prop_type;
            digitalData = {
                search: {
                    filter: filterResults,
                    results: item.total_match
                }
            }
            console.log('%c✅ Tracking -> ' + action, 'color: green;', 'digitaData', digitalData);
            _satellite.track('electricity-internal search filter'); 
            break;
        case 'modified_search':
            control = 'lnkSaveMorePonderLess_Close';
            break;
        default:
            control = '';
            break;
    }
  
    // console.log('%c🚫 Tracking Failed -> ' + control + ', ' + action + ' <-  Invalid Parameters', 'color: red;');
     
}