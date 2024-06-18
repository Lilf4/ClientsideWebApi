import $ from 'jquery';



let baseUri: string = "https://cityinfo80.buchwaldshave34.dk/api/";
$(document).ready(getCountries);


async function getCountries() {
	$('#CountryTable').empty();
	$('#CityTable').empty();
	$('#SpokenLanguages').empty();
	$('#PointsOfInterest').empty();
	$('#CountryCityTitle').empty();

	let Response = await fetch(`${baseUri}Country/GetCountries`, {
		method: 'GET'
	});
	let Json = await Response.json();

	$('#CountryTable')
	.append($('<tr>')
	.append($('<th>')
	.append('Countries')
	.append($('<Button>').on('click', () => createCountry("")).text('Add Country'))));

	let C: string[] = [];
	for (let i = 0; i < Json.length; i++) {
		$('#CountryTable')
		.append($('<tr>')
		.append($('<td>')
		.append(($('<Button>')).on('click', () => getCountryCities(Json[i]['countryID'], Json[i]['countryName'])).text(Json[i]['countryName']))
		.append(($('<Button>')).on('click', () => editCountry(Json[i]['countryID'], Json[i]['countryName'])).text('Edit'))
		.append(($('<Button>')).on('click', () => deleteCountry(Json[i]['countryID'])).text('Delete'))));
	}
}

async function createCountry(countryName: string) {
	let name = prompt("Name of country", "");
	let response = await fetch(`${baseUri}Country/CreateCountry`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ countryName: name})
	});
	getCountries();
}

async function editCountry(countryId: number, countryName: string) {
	let name = prompt("Name of country", countryName);
	await fetch(`${baseUri}Country/UpdateCountry/${countryId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ countryName: name, countryID: countryId})
	});
	getCountries();
}

async function deleteCountry(countryId: number) {
	await fetch(`${baseUri}Country/DeleteCountry/${countryId}`, {
		method: 'DELETE'
	});
	getCountries();
}


async function getCountryCities(id: number, countryName: string) {
	$('#CityTable').empty();
	$('#SpokenLanguages').empty();
	$('#PointsOfInterest').empty();
	$('#CountryCityTitle').empty();

	let Response = await fetch(`${baseUri}City/GetCitiesInCountry/${id}`, {
		method: 'GET'
	});
	let Json = await Response.json();

	$('#CityTable')
	.append($('<tr>')
	.append($('<th>')
	.append('Cities')
	.append($('<Button>').on('click', () => createCity(id)).text('Add City'))));

	let C: string[] = [];
	for (let i = 0; i < Json.length; i++) {
		$('#CityTable')
		.append($('<tr>')
		.append($('<td>')
		.append(($('<Button>')).on('click', () => getCityInfo(Json[i]['cityId'], countryName, Json[i]['cityName'])).text(Json[i]['cityName']))
		.append(($('<Button>')).on('click', () => editCity(Json[i]['cityId'], id, Json[i]['cityName'])).text('Edit'))
		.append(($('<Button>')).on('click', () => deleteCity(Json[i]['cityId'])).text('Delete'))));
	}
}

async function createCity(countryId: number) {
	let cityName = prompt("Name of city", "");
	let response = await fetch(`${baseUri}City/CreateCity`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ cityName: cityName, countryID: countryId, cityDescription: ""})
	});
	getCountries();
}

async function editCity(cityId: number, countryId: number, cityName: string){
	let test = prompt("Name of city", cityName);
	await fetch(`${baseUri}City/UpdateCity/${cityId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ cityName: test, cityDescription: "", cityId: cityId, countryID: countryId})
	});
	getCountries();
}
	
async function deleteCity(cityId: number){
	await fetch(`${baseUri}City/DeleteCity/${cityId}`, {
		method: 'DELETE'
	});
	getCountries();
}

async function getCityInfo(id: number, countryName: string, cityName: string) {
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

	$('#CountryCityTitle').text(`${countryName}, ${cityName}`);
}