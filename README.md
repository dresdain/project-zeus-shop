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
