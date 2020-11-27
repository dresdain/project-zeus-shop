/* Enable debugging mode */
var logger = function() {
    var oldConsoleLog = null;
    var pub = {};

    pub.enableLogger = function enableLogger() {
        if (oldConsoleLog == null)
            return;

        window['console']['log'] = oldConsoleLog;
    };

    pub.disableLogger = function disableLogger() {
        oldConsoleLog = console.log;
        window['console']['log'] = function() {};
    };

    return pub;
}();

var globalMarketplaceState = "utilities-marketplace";

function getMarketplace() {
    var globalContentState;
    if (globalContentState == "EMP-CONTENT") {
        globalMarketplaceState = "utilities-marketplace";
    } else if (globalContentState == "TMP-CONTENT") {
        globalMarketplaceState = "utilities-marketplace";
    }
    return globalMarketplaceState;
}

/* Helper functions */
var digitalData;
$(function() {
    // logger.disableLogger();
    trackHomepage();
});
/* 📦 AA Tagging */
var trackHomepage = function(action, item) {
    /* On Page Load */
    digitalData = {
        page: {
            pageInfo: {
                pageName: "sg:en:personal:utilities-marketplace",
                language: "en",
                hier: "sg|en|personal|utilities-marketplace",
                brand: "utilities-marketplace",
                country: "sg",
                destinationURL: "[http://www.dbs.com.sg/personal/default.page]"
            },
            category: {
                pageType: "content - info",
                site: "sg:en:personal",
                primaryCategory: getMarketplace(),
                subCategory1: "sg:en:personal", // if there is any 
                subCategory2: "sg:en:personal", // if there is any 
                subCategory3: "sg:en:personal", // if there is any 
            }
        }
    };
    console.log('%c✅ Tracking -> Homepage', 'color: green;', 'digitaData', digitalData);
}

var trackPageLevel = function(action, prop) {
    if (globalContentState == 'EMP-CONTENT') {
        var mp__state = "electricity_mp";
    } else if (globalContentState == 'TMP-CONTENT') {
        var mp__state = "telco_mp";
    }


    switch (action) {
        case 'search-results':
            digitalData = {
                page: {
                    pageInfo: {
                        pageName: "sg:en:personal:utilities-marketplace:search-results",
                        language: "en",
                        hier: "sg|en|personal|utilities-marketplace|search-results",
                        brand: "utilities-marketplace",
                        country: "sg",
                        destinationURL: "[http://www.dbs.com.sg/personal/default.page]"
                    },
                    category: {
                        pageType: "content - info",
                        site: "sg:en:personal",
                        primaryCategory: "utilities-marketplace",
                        subCategory1: "sg:en:personal:utilities-marketplace", // if there is any 
                        subCategory2: "sg:en:personal:utilities-marketplace", // if there is any 
                        subCategory3: "sg:en:personal:utilities-marketplace" // if there is any 
                    }
                }
            };
            console.log('%c✅ Tracking -> ' + action, 'color: green;', 'digitaData', digitalData);
            _satellite.track('utilities-marketplace-pagelevel');
            break;

        case 'partner-plan':
            digitalData = {
                page: {
                    pageInfo: {
                        pageName: "sg:en:personal:utilities-marketplace:vendor:" + prop.partner,
                        language: "en",
                        hier: "sg|en|personal|utilities-marketplace|vendor|" + prop.partner,
                        brand: "utilities-marketplace",
                        country: "sg",
                        destinationURL: "[http://www.dbs.com.sg/personal/default.page]"
                    },
                    category: {
                        pageType: "content - info",
                        site: "sg:en:personal",
                        primaryCategory: "utilities-marketplace",
                        subCategory1: "sg:en:personal:utilities-marketplace:vendor", // if there is any 
                        subCategory2: "sg:en:personal:utilities-marketplace:vendor", // if there is any 
                        subCategory3: "sg:en:personal:utilities-marketplace:vendor" // if there is any 
                    }
                }
            };
            console.log('%c✅ Tracking -> ' + action, 'color: green;', 'digitaData', digitalData);
            _satellite.track('utilities-marketplace-pagelevel');
            break;

        case 'view-plan':
            console.log(prop);

            digitalData = {
                page: {
                    pageInfo: {
                        pageName: "sg:en:personal:utilities-marketplace:view-plan",
                        language: "en",
                        hier: "sg|en|personal|utilities-marketplace|view-plan",
                        brand: "utilities-marketplace",
                        country: "sg",
                        destinationURL: "[http://www.dbs.com.sg/personal/default.page]"
                    },
                    category: {
                        pageType: "content - info",
                        site: "sg:en:personal",
                        primaryCategory: "utilities-marketplace",
                        subCategory1: "sg:en:personal:utilities-marketplace", // if there is any 
                        subCategory2: "sg:en:personal:utilities-marketplace", // if there is any 
                        subCategory3: "sg:en:personal:utilities-marketplace" // if there is any 
                    }
                },
                product: {
                    category: {
                        productType: mp__state,
                        primaryCategory: prop.planName,
                        subCategory1: prop.partnerName,
                        subCategory2: ''
                    }
                }
            };
            console.log('%c✅ Tracking -> ' + action, 'color: green;', 'digitaData', digitalData);
            _satellite.track('utilities-marketplace-pagelevel');
            break;

        case 'compare_add':
        case 'compare_start':
            var compareProp = JSON.parse(sessionStorage.getItem("comparisonList"));

            var primaryCat_1 = (compareProp[0] ? compareProp[0].retailer_id : null);
            var primaryCat_2 = (compareProp[1] ? compareProp[1].retailer_id : null);
            var primaryCat_3 = (compareProp[2] ? compareProp[2].retailer_id : null);
            var tempPrimaries = [primaryCat_1, primaryCat_2, primaryCat_3];
            var acceptedPrimaries = [];
            $.each(tempPrimaries, function(i, el) {
                if ($.inArray(el, acceptedPrimaries) === -1 && el !== null) acceptedPrimaries.push(el);
            });

            var subCat_1 = (compareProp[0] ? compareProp[0].package_id : null);
            var subCat_2 = (compareProp[1] ? compareProp[1].package_id : null);
            var subCat_3 = (compareProp[2] ? compareProp[2].package_id : null);
            var tempSubcat = [subCat_1, subCat_2, subCat_3];
            var acceptedSubcat = [];
            $.each(tempSubcat, function(i, el) {
                if ($.inArray(el, acceptedSubcat) === -1 && el !== null) acceptedSubcat.push(el);
            });

            digitalData = {
                page: {
                    pageInfo: {
                        pageName: "sg:en:personal:utilities-marketplace:card-comparator",
                        language: "en",
                        hier: "sg|en|personal|utilities-marketplace|card-comparator",
                        brand: "dbs",
                        country: "sg",
                        destinationURL: "[http://www.dbs.com.sg/personal/default.page]"
                    },
                    category: {
                        pageType: "content - info",
                        site: "sg:en:personal",
                        primaryCategory: "utilities-marketplace",
                        subCategory1: "sg:en:personal:utilities-marketplace", // if there is any 
                        subCategory2: "sg:en:personal:utilities-marketplace", // if there is any 
                        subCategory3: "sg:en:personal:utilities-marketplace" // if there is any 
                    }
                },
                product: {
                    category: {
                        productType: mp__state,
                        primaryCategory: acceptedPrimaries.join(":"),
                        subCategory2: "n/a",
                        site: "sg:en:pweb",
                        pageType: "section home"
                    }
                },
                item: [{
                        product: {
                            category: {
                                subCategory1: (compareProp[0] ? mp__state + ":" + compareProp[0].package_id : ''),
                                productType: mp__state,
                                subCategory2: ""
                            }
                        }
                    },
                    {
                        product: {
                            category: {
                                subCategory1: (compareProp[1] ? mp__state + ":" + compareProp[1].package_id : ''),
                                productType: mp__state,
                                subCategory2: ""
                            }
                        }
                    },
                    {
                        product: {
                            category: {
                                subCategory1: (compareProp[2] ? mp__state + ":" + compareProp[2].package_id : ''),
                                productType: mp__state,
                                subCategory2: ""
                            }
                        }
                    }
                ],
                service: {
                    category: {
                        serviceType: "",
                        primaryCategory: "",
                        subCategory1: ""
                    },
                    serviceInfo: {
                        serviceName: ""
                    }
                },
                form: {
                    name: "sg_en_personal_cards_cards-comparator",
                    stepDetail: "",
                    field: "",
                    type: ""
                },
                transaction: {
                    transactionID: ""
                },
                cardinteraction: {
                    name: "<compare start[" + compareProp.length + "]>"
                }
            }

            console.log('%c✅ Tracking -> ' + action, 'color: green;', 'digitaData', digitalData);
            _satellite.track('pweb-card compare click');
            break;

        case 'compare_remove':
            var compareProp = JSON.parse(sessionStorage.getItem("comparisonList"));
            var primaryCat_1 = (compareProp[0] ? compareProp[0].retailer_id : null);
            var primaryCat_2 = (compareProp[1] ? compareProp[1].retailer_id : null);
            var primaryCat_3 = (compareProp[2] ? compareProp[2].retailer_id : null);
            var tempPrimaries = [primaryCat_1, primaryCat_2, primaryCat_3];
            var acceptedPrimaries = [];
            $.each(tempPrimaries, function(i, el) {
                if ($.inArray(el, acceptedPrimaries) === -1 && el !== null) acceptedPrimaries.push(el);
            });

            var subCat_1 = (compareProp[0] ? compareProp[0].package_id : null);
            var subCat_2 = (compareProp[1] ? compareProp[1].package_id : null);
            var subCat_3 = (compareProp[2] ? compareProp[2].package_id : null);
            var tempSubcat = [subCat_1, subCat_2, subCat_3];
            var acceptedSubcat = [];
            $.each(tempSubcat, function(i, el) {
                if ($.inArray(el, acceptedSubcat) === -1 && el !== null) acceptedSubcat.push(el);
            });

            digitalData = {
                page: {
                    pageInfo: {
                        pageName: "sg:en:personal:utilities-marketplace:card-comparator",
                        language: "en",
                        hier: "sg|en|personal|utilities-marketplace|card-comparator",
                        brand: "dbs",
                        country: "sg",
                        destinationURL: "[http://www.dbs.com.sg/personal/default.page]"
                    },
                    category: {
                        pageType: "content - info",
                        site: "sg:en:personal",
                        primaryCategory: "utilities-marketplace",
                        subCategory1: "sg:en:personal:utilities-marketplace", // if there is any 
                        subCategory2: "sg:en:personal:utilities-marketplace", // if there is any 
                        subCategory3: "sg:en:personal:utilities-marketplace" // if there is any 
                    }
                },
                product: {
                    category: {
                        productType: mp__state,
                        primaryCategory: acceptedPrimaries.join(":"),
                        subCategory2: "n/a",
                        site: "sg:en:pweb",
                        pageType: "section home"
                    }
                },
                item: [{
                        product: {
                            category: {
                                subCategory1: (compareProp[0] ? mp__state + ":" + compareProp[0].package_id : ''),
                                productType: mp__state,
                                subCategory2: ""
                            }
                        }
                    },
                    {
                        product: {
                            category: {
                                subCategory1: (compareProp[1] ? mp__state + ":" + compareProp[1].package_id : ''),
                                productType: mp__state,
                                subCategory2: ""
                            }
                        }
                    },
                    {
                        product: {
                            category: {
                                subCategory1: (compareProp[2] ? mp__state + ":" + compareProp[2].package_id : ''),
                                productType: mp__state,
                                subCategory2: ""
                            }
                        }
                    }
                ],
                service: {
                    category: {
                        serviceType: "",
                        primaryCategory: "",
                        subCategory1: ""
                    },
                    serviceInfo: {
                        serviceName: ""
                    }
                },
                form: {
                    name: "sg_en_personal_cards_cards-comparator",
                    stepDetail: "",
                    field: "",
                    type: ""
                },
                transaction: {
                    transactionID: ""
                },
                cardinteraction: {
                    name: "<compare card remove>"
                }
            }

            console.log('%c✅ Tracking -> ' + action, 'color: green;', 'digitaData', digitalData);
            _satellite.track('pweb-card-comparison-btn-minus');
            break;

        case 'factsheet':
            digitalData = {};
            console.log('%c🛠 Tracking Attempted -> ' + action, 'color: gray;', 'digitaData', digitalData);
            break;

        case 'submit-interest-without-digibank':
            digitalData = {};
            console.log('%c🛠 Tracking Attempted -> ' + action, 'color: gray;', 'digitaData', digitalData);
            break;

        case 'submit-interest-non-dbs':
            digitalData = {};
            console.log('%c🛠 Tracking Attempted -> ' + action, 'color: gray;', 'digitaData', digitalData);
            break;

        case 'agree-on-plan-detail':
            digitalData = {};
            console.log('%c🛠 Tracking Attempted -> ' + action, 'color: gray;', 'digitaData', digitalData);
            break;
        default:
            break;
    }
}

var trackButtonLevel = function(action) {
    var control = "",
        pageControl = '';
    switch (action) {
        /* On click of "Click here" link in Save More Ponder Less */
        case 'lnkSaveMorePonderLess_ClickHere':
            control = 'lnkSaveMorePonderLess_ClickHere';
            pageControl = 'sg:en:personal:utilities-marketplace';
            break;
            /* On click of "Close" button of Save More Ponder Less */
        case 'lnkSaveMorePonderLess_Close':
            control = 'lnkSaveMorePonderLess_Close';
            pageControl = 'sg:en:personal:utilities-marketplace';
            break;
            /* On click of "Edit" link on the search results page */
        case 'lnkEdit':
            control = 'lnkEdit';
            pageControl = 'sg:en:personal:utilities-marketplace:search-results';
            break;
            /* On click of the "Compare" button on the Search Results Page */
        case 'btnCompare':
            control = 'btnCompare';
            pageControl = 'sg:en:personal:utilities-marketplace:search-results';
            break;
            /* On click of "ReCompare" button on the Compare Screen */
        case 'btnRecompare':
            control = 'btnRecompare';
            pageControl = 'sg:en:personal:utilities-marketplace:search-results';
            break;
        case 'btnElectricity':
            control = 'btnElectricity';
            pageControl = 'sg:en:personal:utilities-marketplace:search-results';
            break;
        case 'btnTelco':
            control = 'btnTelco';
            pageControl = 'sg:en:personal:utilities-marketplace:search-results';
            break;
        case 'btnTelco':
            control = 'btnTelco';
            pageControl = 'sg:en:personal:utilities-marketplace:search-results';
            break;
        case 'btnSignUp':
            control = globalPlanState;
            pageControl = 'sg:en:personal:utilities-marketplace:search-results';
            break;
        default:
            control = '';
            break;
    }
    if (control !== '') {
        digitalData = {
            page: {
                pageInfo: {
                    pageName: pageControl
                }
            },
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

var trackSearch = function(action, item) {
    var control = '';
    switch (action) {
        /* The following is a special case where first_time_search and search-results layer are combined */
        case 'search-results_page__and__first_time_search':
            if (globalContentState == 'EMP-CONTENT') {
                var filterResults = 'emp_search_type:' + item.emp_search_type + '|monthly_bill:' + item.monthly_bill + '|prop_type:' + item.prop_type + '|sort:' + item.sort;
            } else if (globalContentState == 'TMP-CONTENT') {
                var filterResults = 'ump_search_telco:' + item.emp_search_type + '|mth_data:' + item.prop_type + '|mth_price:' + item.monthly_bill + '|sort:' + item.sort;
            }
            digitalData = {
                page: {
                    pageInfo: {
                        pageName: "sg:en:personal:utilities-marketplace:search-results",
                        language: "en",
                        hier: "sg|en|personal|utilities-marketplace|search-results",
                        brand: "utilities-marketplace",
                        country: "sg",
                        destinationURL: "[http://www.dbs.com.sg/personal/default.page]"
                    },
                    category: {
                        pageType: "content - info",
                        site: "sg:en:personal",
                        primaryCategory: "utilities-marketplace",
                        subCategory1: "sg:en:personal:utilities-marketplace", // if there is any 
                        subCategory2: "sg:en:personal:utilities-marketplace", // if there is any 
                        subCategory3: "sg:en:personal:utilities-marketplace" // if there is any 
                    }
                },
                search: {
                    filter: filterResults,
                    results: item.total_match
                }
            };
            console.log('%c✅ Tracking -> ' + action, 'color: green;', 'digitaData', digitalData);
            _satellite.track('utilities-marketplace-pagelevel');
            _satellite.track('electricity-internal search filter');
            break;

        case 'first_time_search':
        case 'modified_search':
            if (globalContentState == 'EMP-CONTENT') {
                var filterResults = 'emp_search_type:' + item.emp_search_type + '|monthly_bill:' + item.monthly_bill + '|prop_type:' + item.prop_type + '|sort:' + item.sort;
            } else if (globalContentState == 'TMP-CONTENT') {
                var filterResults = 'ump_search_telco:' + item.emp_search_type + '|mth_data:' + item.prop_type + '|mth_price:' + item.monthly_bill + '|sort:' + item.sort;
            }
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
            if (globalContentState == 'EMP-CONTENT') {
                var filterResults = 'emp_search_type:' + item.emp_search_type + '|by:' + item.by + '|sort:' + item.sort;
            } else if (globalContentState == 'TMP-CONTENT') {
                var filterResults = 'ump_search_type:' + item.emp_search_type + '|by:mdata' + item.prop_type + '|by:mprice' + item.monthly_bill + '|sort:' + item.sort;
            }
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
            if (globalContentState == 'EMP-CONTENT') {
                var filterResults = 'emp_search_type:' + item.emp_search_type + '|by:' + item.by;
            } else if (globalContentState == 'TMP-CONTENT') {
                var filterResults = 'ump_search_type:' + item.emp_search_type + '|by:mdata' + item.prop_type + '|by:mprice' + item.monthly_bill + '|sort:' + item.sort;
            }

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
            if (globalContentState == 'EMP-CONTENT') {
                var filterResults = 'emp_search_type:' + item.emp_search_type + '|by:' + item.by + '|sort:' + item.sort;
            } else if (globalContentState == 'TMP-CONTENT') {
                var filterResults = 'ump_search_type:' + item.emp_search_type + '|by:mdata' + item.prop_type + '|by:mprice' + item.monthly_bill + '|sort:' + item.sort;
            }
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


var trackThroughSearch = function(action, item) {
    var control = '';
    switch (action) {
        case 'first_time_search':
        case 'modified_search':
            var filterResults = 'emp_search_type:' + item.emp_search_type + '|monthly_bill:' + item.monthly_bill + '|prop_type:' + item.prop_type;
            digitalData = {
                search: {
                    filter: filterResults,
                    rank: item.filter_rank
                }
            }
            console.log('%c✅ Tracking -> Through Search -> ' + action, 'color: green;', 'digitaData', digitalData);
            _satellite.track('electricity-search result rank');
            break;
        case 'filter_by_rate_type':
            var filterResults = 'emp_search_type:' + item.emp_search_type + '|by:' + item.by + '|sort:' + item.sort;
            digitalData = {
                search: {
                    filter: filterResults,
                    rank: item.filter_rank
                }
            }
            console.log('%c✅ Tracking -> Through Search -> ' + action, 'color: green;', 'digitaData', digitalData);
            _satellite.track('electricity-search result rank');
            break;
        case 'filter_by_ecofriendlyplans':
            var filterResults = 'emp_search_type:' + item.emp_search_type + '|by:' + item.by;
            digitalData = {
                search: {
                    filter: filterResults,
                    rank: item.filter_rank
                }
            }
            console.log('%c✅ Tracking -> Through Search -> ' + action, 'color: green;', 'digitaData', digitalData);
            _satellite.track('electricity-search result rank');
            break;
        case 'filter_by_retailers':
            var filterResults = 'emp_search_type:' + item.emp_search_type + '|by:' + item.by + '|sort:' + item.sort;
            digitalData = {
                search: {
                    filter: filterResults,
                    rank: item.filter_rank
                }
            }
            console.log('%c✅ Tracking -> Through Search -> ' + action, 'color: green;', 'digitaData', digitalData);
            _satellite.track('electricity-search result rank');
            break;
        default:
            control = '';
            break;
    }

    // console.log('%c🚫 Tracking Failed -> ' + control + ', ' + action + ' <-  Invalid Parameters', 'color: red;');
}