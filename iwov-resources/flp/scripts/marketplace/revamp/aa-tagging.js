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
    console.log('%c✅ Tracking -> Homepage', 'color: green;', 'digitaData', digitalData);
}

var trackPageLevel = function (action, item) {
    switch (action) {
        case 'search-results':
            digitalData = {
                page: {
                    pageInfo: {
                        pageName: "sg:en:personal:electricity-marketplace:search-results",
                        language: "en",
                        hier: "sg|en|personal|electricity-marketplace|search-results",
                        brand: "electricity-marketplace",
                        country: "sg",
                        destinationURL: "[http://www.dbs.com.sg/personal/default.page]"
                    },
                    category: {
                        pageType: "content - info",
                        site: "sg:en:personal",
                        primaryCategory: "electricity-marketplace",
                        subCategory1: "sg:en:personal:electricity-marketplace", // if there is any 
                        subCategory2: "sg:en:personal:electricity-marketplace" // if there is any 
                    }
                }
            };
            console.log('%c✅ Tracking -> ' + action, 'color: green;', 'digitaData', digitalData);
            _satellite.track('electricity-marketplace-pagelevel');
            break;

        case 'partner-plan':
            digitalData = {
                page: {
                    pageInfo: {
                        pageName: "sg:en:personal:electricity-marketplace:vendor:" + item.partner,
                        language: "en",
                        hier: "sg|en|personal|electricity-marketplace|vendor|" + item.partner,
                        brand: "electricity-marketplace",
                        country: "sg",
                        destinationURL: "[http://www.dbs.com.sg/personal/default.page]"
                    },
                    category: {
                        pageType: "content - info",
                        site: "sg:en:personal",
                        primaryCategory: "electricity-marketplace",
                        subCategory1: "sg:en:personal:electricity-marketplace:vendor", // if there is any 
                        subCategory2: "sg:en:personal:electricity-marketplace:vendor" // if there is any 
                    }
                }
            };
            console.log('%c✅ Tracking -> ' + action, 'color: green;', 'digitaData', digitalData);
            _satellite.track('electricity-marketplace-pagelevel');
            break;

        case 'view-plan':
            digitalData = {
                page: {
                    pageInfo: {
                        pageName: "sg:en:personal:electricity-marketplace:view-plan",
                        language: "en",
                        hier: "sg|en|personal|electricity-marketplace|view-plan",
                        brand: "electricity-marketplace",
                        country: "sg",
                        destinationURL: "[http://www.dbs.com.sg/personal/default.page]"
                    },
                    category: {
                        pageType: "content - info",
                        site: "sg:en:personal",
                        primaryCategory: "electricity-marketplace",
                        subCategory1: "sg:en:personal:electricity-marketplace", // if there is any 
                        subCategory2: "sg:en:personal:electricity-marketplace" // if there is any 
                    }
                }
            };
            console.log('%c✅ Tracking -> ' + action, 'color: green;', 'digitaData', digitalData);
            _satellite.track('electricity-marketplace-pagelevel');
            break;



        case 'factsheet':
            digitalData = {};
            console.log('%c✅ Tracking -> ' + action, 'color: green;', 'digitaData', digitalData);
            break;

        case 'submit-interest-without-digibank':
            digitalData = {};
            console.log('%c✅ Tracking -> ' + action, 'color: green;', 'digitaData', digitalData);
            break;

        case 'submit-interest-non-dbs':
            digitalData = {};
            console.log('%c✅ Tracking -> ' + action, 'color: green;', 'digitaData', digitalData);
            break;

        case 'agree-on-plan-detail':
            digitalData = {};
            console.log('%c✅ Tracking -> ' + action, 'color: green;', 'digitaData', digitalData);
            break;
        default:
            break;
    }
}

var trackButtonLevel = function (action) {
    var control = '';
    switch (action) {
        /* On click of "Click here" link in Save More Ponder Less */
        case 'lnkSaveMorePonderLess_ClickHere':
            control = 'lnkSaveMorePonderLess_ClickHere';
            break;
        /* On click of "Close" button of Save More Ponder Less */
        case 'lnkSaveMorePonderLess_Close':
            control = 'lnkSaveMorePonderLess_Close';
            break;
        /* On click of "Edit" link on the search results page */
        case 'lnkEdit':
            control = 'lnkEdit';
            break;
        /* On click of the "Compare" button on the Search Results Page */
        case 'btnCompare':
            control = 'btnCompare';
            break;
        /* On click of "ReCompare" button on the Compare Screen */
        case 'btnRecompare':
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
            var filterResults = 'emp_search_type:' + item.emp_search_type + '|monthly_bill:' + item.monthly_bill + '|prop_type:' + item.prop_type;
            digitalData = {
                search: {
                    filter: filterResults,
                    results: item.total_match
                }
            }
            console.log('%c✅ Tracking -> ' + action, 'color: green;', 'digitaData', digitalData);
            _satellite.track('electricity-internal search filter');
            break;
        case 'filter_by_rate_type':
            var filterResults = 'emp_search_type:' + item.emp_search_type + '|by:' + item.by + '|sort:' + item.sort;
            digitalData = {
                search: {
                    filter: filterResults,
                    results: item.total_match
                }
            }
            console.log('%c✅ Tracking -> ' + action, 'color: green;', 'digitaData', digitalData);
            _satellite.track('electricity-internal search filter');
            break;
        case 'filter_by_ecofriendlyplans':
            var filterResults = 'emp_search_type:' + item.emp_search_type + '|by:' + item.by;
            digitalData = {
                search: {
                    filter: filterResults,
                    results: item.total_match
                }
            }
            console.log('%c✅ Tracking -> ' + action, 'color: green;', 'digitaData', digitalData);
            _satellite.track('electricity-internal search filter');
            break;
        case 'filter_by_retailers':
            var filterResults = 'emp_search_type:' + item.emp_search_type + '|by:' + item.by + '|sort:' + item.sort;
            digitalData = {
                search: {
                    filter: filterResults,
                    results: item.total_match
                }
            }
            console.log('%c✅ Tracking -> ' + action, 'color: green;', 'digitaData', digitalData);
            _satellite.track('electricity-internal search filter');
            break;
        default:
            control = '';
            break;
    }

    // console.log('%c🚫 Tracking Failed -> ' + control + ', ' + action + ' <-  Invalid Parameters', 'color: red;');

}