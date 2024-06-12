import $ from 'jquery';



let baseUri: string = "https://cityinfo80.buchwaldshave34.dk/api/";
$(document).ready(getCountries);


async function getCountries() {
	$('#CountryTable').empty();
	$('#CityTable').empty();
	$('#SpokenLanguages').empty();
	$('#PointsOfInterest').empty();

	let Response = await fetch(`${baseUri}Country/GetCountries`, {
		method: 'GET'
	});
	let Json = await Response.json();

	$('#CountryTable').append($('<tr>').append($('<th>').append('Countries')));

	let C: string[] = [];
	for (let i = 0; i < Json.length; i++) {
		$('#CountryTable')
		.append($('<tr>')
		.append($('<td>')
		.append(($('<Button>')).on('click', () => getCountryCities(Json[i]['countryID'])).text(Json[i]['countryName']))));
	}
}
function test() {
	console.log("test");
}

async function getCountryCities(id: number) {
	$('#CityTable').empty();
	$('#SpokenLanguages').empty();
	$('#PointsOfInterest').empty();

	let Response = await fetch(`${baseUri}City/GetCitiesInCountry/${id}`, {
		method: 'GET'
	});
	let Json = await Response.json();

	$('#CityTable').append($('<tr>').append($('<th>').append('Cities')));

	let C: string[] = [];
	for (let i = 0; i < Json.length; i++) {
		$('#CityTable')
		.append($('<tr>')
		.append($('<td>')
		.append(($('<Button>')).on('click', () => getCityInfo(Json[i]['cityId'])).text(Json[i]['cityName']))));
	}
}

async function getCityInfo(id: number) {
	//Clear related tables
	$('#SpokenLanguages').empty();
	$('#PointsOfInterest').empty();

	let Response = await fetch(`${baseUri}City/GetCity/${id}`, {
		method: 'GET'
	});
	let Json = await Response.json();

	$('#SpokenLanguages').append($('<tr>').append($('<th>').append('Spoken Languages')));
	$('#PointsOfInterest').append(($('<tr>').append($('<th>').append('Points of Interest')).append($('<th>').append('Description'))));

	for (let i = 0; i < Json['pointsOfInterest'].length; i++) {
		$('#PointsOfInterest')
		.append($('<tr>')
		.append(($('<td>')
		.append(($('<p>')).text(Json['pointsOfInterest'][i].pointOfInterestName))))
		.append(($('<td>').append(($('<p>')).text(Json['pointsOfInterest'][i].pointOfInterestDescription)))));
	}

	for (let i = 0; i < Json['cityLanguages'].length; i++) {
		$('#SpokenLanguages')
		.append($('<tr>')
		.append($('<td>')
		.append(($('<p>')).text(Json['cityLanguages'][i]['language'].languageName))));
	}
}