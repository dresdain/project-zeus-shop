# project-zeus-shop

<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
 
  <link rel="stylesheet" href="https://stackedit.io/style.css" />
</head>

<body class="stackedit">
  <div class="stackedit__html">
<table>
<thead>
<tr>
<th>parameter</th>
<th>type</th>
<th>condition</th>
<th>description</th>
<th>values</th>
<th>examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><em>external</em></td>
<td>boolean</td>
<td>required</td>
<td>parameter is required to trigger overlay</td>
<td>true</td>
<td>?external=true</td>
</tr>
<tr>
<td>monthly</td>
<td>integer</td>
<td>optional, <br>default (101 - 150)</td>
<td>monthly electricity bill costs,<br>script will automatically determine which range</td>
<td>range 0 - 500 in SGD</td>
<td>&amp;monthly=57</td>
</tr>
<tr>
<td>living</td>
<td>string</td>
<td>optional,<br>default (hdb_4_room)</td>
<td>specify dwelling type</td>
<td>hdb_1_room,<br>hdb_2_room,<br>hdb_3_room,<br>hdb_4_room,<br>hdb_5_room,<br>hdb_executive,<br>hudc_flat,<br>terrace_house,<br>condominium,<br>semi_detached_house,<br>private_aparment,<br>bungalow,<br>penthouse,<br>townhouse</td>
<td>&amp;living=hdb_4_room</td>
</tr>
<tr>
<td>retailer</td>
<td>string/array</td>
<td>Filter option,<br>Cannot be combined <br>with other filter options,<br>optional,<br>default (all)</td>
<td>enter retailer id(s), <br>for multiple retailers, add comma</td>
<td>bestelectricity,<br>geneco,<br>iswitch,<br>keppel,<br>pacificlight,<br>sunseap,<br>tuaspower,<br>unionpower</td>
<td>&amp;retailer=geneco,iswitch</td>
</tr>
<tr>
<td>rate</td>
<td>string</td>
<td>Filter option,<br>Cannot be combined <br>with other filter options,<br>optional,default (all)</td>
<td>Specify rate type</td>
<td>all,<br>discounted,<br>fixed</td>
<td>&amp;rate=discounted</td>
</tr>
<tr>
<td>ecofriendly</td>
<td>string</td>
<td>Filter option,<br>Cannot be combined <br>with other filter options,<br>optional,default (yes)</td>
<td>Set if show ecofriendly plans only</td>
<td>yes</td>
<td>&amp;ecofriendly=yes</td>
</tr>
<tr>
<td>sort</td>
<td>string</td>
<td>Sorting option,<br>optional, default (savings)</td>
<td>Sort plans on load</td>
<td>savings, <br>contract,<br>name</td>
<td>&amp;sort=savings</td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table></div>
</body>

</html>


https://www.dbs.com.sg/iwov-resources/flp/css/marketplace/pweb.property-marketplace-ema-consumer-advisory.css







Search Keywords Tracking

First Time Search
emp_search_type:new|monthly_bill:<range>|prop_type:<value>

Modifying the search
emp_search_type:modify|monthly_bill:<range>|prop_type:<value>

Filter Search results (by Retailers)
emp_search_type:filter|by:retailers-all retailers|sort:<value>
emp_search_type:filter|by:retailers-<selection1>-<selection2>-<selection3>....-<selectionN>|sort:<value>

Filter Search results (by Rate Type)
emp_search_type:filter|by:ratetype-<value>|sort:<value>

Filter Search results (by Eco Friendly Plans)
emp_search_type:filter|by:ecofriendlyplans

Compare Cards:
For Compare Cards, please refer to "Card Comparator Tool Tracking" on Pg #64 in the PWEB Tech spec attached.

Product Type: electricity_mp
Primary Category: <partner>    (ex: unionpower, tuaspower, keppel etc.)
Sub Category 1: <plan>     (ex: unionts6,uniongs24 etc.) 


BAU Functionalities (No Change)
Download Factsheet
Hero Block Banner Tracking (pid)
Submit interest without Digibank (pid)
Submit interest non dbs (pid)
Featured products & articles tracking (pid)
On Click of "Agree" button the Plan Detail Page (pid)

