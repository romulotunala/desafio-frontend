var cities = [
	{city:'Rio de Janeiro'},
	{city:'São Paulo'},
	{city:'Salvador'},
	{city:'Belo Horizonte'},
	{city:'Brasília'},
	{city:'Belém'},
	{city:'Curitiba'},
	{city:'Fortaleza'},
	{city:'Manaus'},
	{city:'João Pessoa'}
];
var thead__1 = document.getElementById('metropolis-head--1');
var tbody__1 = document.getElementById('metropolis-body--1');
var thead__2 = document.getElementById('metropolis-head--2');
var tbody__2 = document.getElementById('metropolis-body--2');
var i = 0;


function showBoxResult(){
	
	let display_boxResult = document.getElementById('boxResult')
	if(display_boxResult.style.display != "none"){
		clearInputCity()
	}else{
		display_boxResult.style.display = "flex"
		document.getElementById('city').value = ''
		document.getElementById('hearderTitle').style.fontSize = "43px"
	}

};

function clearInputCity(){
	let display_boxResult = document.getElementById('boxResult')

	display_boxResult.style.display = "none"
	document.getElementById('city').value = ''
	document.getElementById('hearderTitle').style.fontSize = "60px"
};

do {
  	thead__1.innerHTML = '<tr class="metropolisWeather-head__tr"><th class="head__tr-item">min</th><th class="head__tr-item">max</th><th></th></tr>';
	tbody__1.innerHTML += '<tr><td class="body__tr-item">18º</td><td class="body__tr-item">23º</td><td class="body__tr-item">'+cities[i].city+'</td></tr>'
	i++
} while (i < cities.length/2);

do {
  	thead__2.innerHTML = '<tr class="metropolisWeather-head__tr"><th class="head__tr-item">min</th><th class="head__tr-item">max</th><th></th></tr>';
	tbody__2.innerHTML += '<tr><td class="body__tr-item">18º</td><td class="body__tr-item">23º</td><td class="body__tr-item">'+cities[i].city+'</td></tr>'
	i++
} while (i > cities.length/2 && i < cities.length);

function searchCity(){
	let city = document.getElementById('city').value

	axios.get(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${city}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`)
			.then(response => {
			    console.log(response)
			    callbackFunction(response.data.query.results.channel)
			})
			.catch(error => {
			    console.log(error)
			})

    showBoxResult()
    event.preventDefault()

};
var callbackFunction = function(data) {

	function addData(value){
		return document.getElementById(value)
	}

	addData('boxResult-locality').innerHTML = data.location.city +', '+ data.location.region+', '+data.location.country

	addData('boxResult-localityWeather').innerHTML = data.item.condition.temp+'º'+data.units.temperature+' '+data.item.condition.text

	addData('weatherDetail-value--high').innerHTML = data.item.forecast[0].high+'º'

	addData('weatherDetail-value--low').innerHTML = data.item.forecast[0].low+'º'

	addData('weatherDetail-value--chill').innerHTML = data.wind.chill+'º'+data.units.temperature

	addData('weatherDetail-value--wind').innerHTML = data.wind.speed+'º'+data.units.speed

	addData('weatherDetail-value--humidity').innerHTML = data.atmosphere.humidity+'%'

	addData('boxResult-resumeWeather').innerHTML = ''
	for(i = 1; i <= 5; i++){
		let content = document.createElement('p')
		content.classList.add('resumeWeather-week')
		content.innerHTML = data.item.forecast[i].day+'<br><span>'+data.item.forecast[i].high+'º '+data.item.forecast[i].low+'º</span>'
		addData('boxResult-resumeWeather').appendChild(content)
	}
};
