import $ from 'jquery';



let test: string = "";
$(document).ready(getCityInfo);
	//const response = await fetch(`https://cityinfo.buchwaldshave34.dk/api/Country`);
	//const json = await response.json();
	//console.log(json);
	//test += "<tr>";
	//test += "<th>Country ID</th>";
	//test += "<th>CountryName</th>";
	//test += "</tr>";
	//for (let i = 0; i < json.length; i++) {
	//	test += createColumn([json[i].countryID, json[i].countryName]);

		

	//	console.log(cityJson);
	//}

	//$('#CountryTable').html(test);


async function getCityInfo() {
	let constructedTable: string = "";

	let cityResponse = await fetch(`https://cityinfo.buchwaldshave34.dk/api/City`);
	let cityJson = await cityResponse.json();
	var keys = Object.keys(cityJson[0]);
	constructedTable += createColumn(keys, "th");
	let C: string[] = [];
	for (let i = 0; i < cityJson.length; i++) {
		for(let j = 0; j < keys.length; j++) {
			C.push(cityJson[i][keys[j]]);
		}
		constructedTable += createColumn(C, "td");
		C = [];
	}
	

	$('#CountryTable').html(constructedTable);
}


function createColumn(cols: string[], type: string): string {
	
	let column: string = "<tr>";
	for (let i = 0; i < cols.length; i++) {
		column += `<${type}>${cols[i]}</${type}>`;
	}
	column += "</tr>";
	return column;
}