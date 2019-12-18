var origin__DIR = document.URL.substring(0,document.URL.lastIndexOf("/")),
    script__DIR = '/iwov-resources/flp/scripts/marketplace/'; 
 
function populatePlans(minBill, maxBill){
    $('.emp__results__box--list').html('');
    $.getJSON(origin__DIR + script__DIR + 'emp-p2.json', function (data) {
        var counter = 0;
        data.forEach(function (item) { 
            for (var i = 0; i <= (item.options.length - 1); i++) {
                var dataDOM = '';
 
                if (item.options[i].current_monthly_sp_bill_size == 50) {
                   
                    dataDOM += '<article class="emp__results__box--card" id="plan_item--'+counter+'">';


                    /* STUB Savings Information */

                    dataDOM += createDOM__savingsInfo(item, item.options[i]);

                    dataDOM += createDOM__planDetails(item, item.options[i]); 

                    dataDOM += createDOM__comparePlans(item, item.options[i]); 
                    console.log(item);
    
    
    
    
    
    
                    dataDOM += '</article>'; 
    
                    $('.emp__results__box--list').append(dataDOM);
                }// ANCHOR END IF

               
            }
            counter++;
            
        }); 

        /* Re-initialize everything */
        $('[data-toggle="tooltip"]').tooltip(); 
        addToCompare();
        console.log(data.length);
    });
}

/* STUB create DOM for .savings__info component */
function createDOM__savingsInfo(item, options){ 
    // console.log(item, options);
    var html = '';
    /* Start Savings Info  */
    html += '<div class="savings__info">';
        /* Logo */
        html += '<img class="savings__info--logo" src="./iwov-resources/flp/images/emp/partners/'+ item.retailer_id +'.png" alt="'+ item.retailer_id+'">';

        /* Copy Wrapper */
        html += '<div class="savings__info--copy">';
            
            /* Copy Heading */
            html += '<small class="heading">Est. annual savings <a href="javascript:void();" data-toggle="tooltip" data-placement="top" title="Monthly savings: S'+ options.total_monthly_savings +' + S$'+ options.current_monthly_sp_bill_size +' + S$16 &#13;Annual savings: Monthly savings x 12"><img src="./iwov-resources/flp/images/emp/i.svg" alt=""></a></small>';    

            /* Copy Body */
            html += '<div class="body">S'+ options.total_annual_savings +'</div>';

            /* Copy Footnote */
            html += '<small class="footnote">Save up to '+ options.total_monthly_savings +'/mth</small>';

        /* End Copy Wrapper */
        html += '</div>';

    /* End Savings Info  */
    html += '</div>';
    
    return html;
}

/* STUB create DOM for .plan__details component */
function createDOM__planDetails(item, options){ 
    var html = ''; 
    /* Start Plan Details */
    html += '<div class="plan__details">';

        /* Contract Duration */
        html += '<div class="plan__details--card"><div class="heading">Contract</div><div class="body">'+ item.contract_duration_months +' month</div></div>';

        /* Discount Rate */
        html += '<div class="plan__details--card"><div class="heading">Discounted rate</div><div class="body">15.56 <small>cents/kWh</small></div></div>';

        /* Plan Name */ 
        var planName__DOM = item.plan_name + createDOM__greenEnergy(item.green_energy);
        
        
        html += '<div class="plan__details--card"><div class="heading">Plan name</div><div class="body plan-name">'+planName__DOM+'</div></div>';

        /* Promotion */
        var promotion__DOM = (item.promotion.toLowerCase() != 'no' ? '<img src="./iwov-resources/flp/images/emp/check.svg" alt=""> ' + item.promotion.replace('_', ' ') : 'None');
        html += '<div class="plan__details--card"><div class="heading">Promotion</div><div class="body promotion">'+promotion__DOM+'</div></div>';

        /* Apply Now */
        html += '<div class="plan__details--card narrow--pad"><a href="#" class="btn btn-primary btn-block">Apply now</a></div>';

        /* View Factsheet */
        html += '<div class="plan__details--card"><a href="#" class="btn btn-primary btn-block btn-outline">View factsheet</a></div>';


    /* End Plan Details */
    html += '</div>';

    return html;
}


/* STUB compare Plans checkbox */
function createDOM__comparePlans(item, options){
    var html = '';

    /* Start Compare Plans */
    html += '<div class="compare__plans">';

        /* Checkbox wrapper*/
        html += '<div class="checkbox"><label>';

        html += '<input type="checkbox" value="'+item+'"><span></span> Compare';

        html += '</label></div>';

    /* End Compare Plans */
    html += '</div>';

    return html;
}

/* STUB mini components */

function createDOM__greenEnergy(state){ 
    if(state.toLowerCase() == 'yes'){
        return ' <img src="./iwov-resources/flp/images/emp/eco.svg" alt="" data-toggle="tooltip" data-placement="top" title="Eco-friendly">';
    }else{ return '' }
}

 