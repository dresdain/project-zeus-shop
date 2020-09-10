Tests:

Case 1:
Activity Name: thursday
Expiry Date: 10-Sep-2020-17:30
Sample Query: ?external=true&activity=thursday

Case 2:
Activity Name: friday
Expiry Date: 11-Sep-2020-15:30
Sample Query: ?external=true&activity=friday

Case 3:
Activity Name: saturday
Expiry Date: 12-Sep-2020-17:30
Sample Query: ?external=true&activity=saturday















-------------
Scenario 1: 
- WITH on-load overlay
- all (2) keppel entries have activity name called 'keppel-anniversary'
- no 'activity' parameter in URL
http://clients.in-uat.com/demo/dbs/test/emp-2/?external=true&retailer=keppel

Expected: 0 results. All entries are non-public.

-------------
Scenario 2:
- WITH on-load overlay
- all (2) keppel entries have activity name called 'keppel-anniversary'
- HAS 'activity' parameter in URL
http://clients.in-uat.com/demo/dbs/test/emp-2/?external=true&retailer=keppel&activity=keppel-anniversary

Expected: 2 results. Correct activity name. 

-------------
Scenario 3:
- NO on-load overlay
- all (2) keppel entries have activity name called 'keppel-anniversary'
- HAS 'activity' parameter in URL
http://clients.in-uat.com/demo/dbs/test/emp-2/?activity=keppel-anniversary

Expected: 2 results. Correct activity name. 

-------------
Scenario 4:
- WITH on-load overlay
- all (2) keppel entries have activity name called 'keppel-anniversary'
- HAS 'activity' parameter in URL
- INVALID activity name
http://clients.in-uat.com/demo/dbs/test/emp-2/?external=true&retailer=keppel&activity=keppel-anniversarys

Expected: 0 results. Invalid activity name.


-------------
Scenario 5:
- WITH on-load overlay
- all (2) union power entries have activity name called 'union-power-sale'
- HAS 'activity' parameter in URL 
http://clients.in-uat.com/demo/dbs/test/emp-2/?external=true&retailer=unionpower&activity=union-power-sale

Expected: 2 results. Expired activity.

-------------
Scenario 6:
- WITH on-load overlay
- MIXED retailers with SAME activity name 'dbs-promo' (three entries)
- HAS 'activity' parameter in URL 
http://clients.in-uat.com/demo/dbs/test/emp-2/?external=true&activity=dbs-promo

Expected: 3 results. 1 expired AND 2 active activity.

-------------
Scenario 7:
- WITH on-load overlay
- MIXED retailers with SAME activity name 'dbs-promo' (three entries) 
- LIMIT to only bestelectricity
- HAS 'activity' parameter in URL 
http://clients.in-uat.com/demo/dbs/test/emp-2/?external=true&activity=dbs-promo&retailer=bestelectricity

Expected: 1 result. 1 active activity.

