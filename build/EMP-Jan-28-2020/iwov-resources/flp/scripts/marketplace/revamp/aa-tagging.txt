/* Helper functions */
 

/* 📦 AA Tagging */
var trackHomepage = function(action, item){
    if(action == 'undefined' && item == 'undefined'){
        var action = item = "";
    }
    /* On Page Load */
    var digitalData = { 
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

var trackCTAButtons = function(action){
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
    if(control !== ''){
        var digitalData = { 
                button:{ 
                    name: control, 
                } 
        } 
        console.log('%c✅ Tracking -> ' + control, 'color: green;', digitalData);
        _satellite.track('pweb-generic button');
    }else{ 
        console.log('%c🚫 Tracking Failed -> ' + control + ', '+action+' <-  Invalid Parameters', 'color: red;');
    } 
}


