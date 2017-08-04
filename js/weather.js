$(function main(){ 

function attachEventHandlers (){
	$("#submit").click(weatherAroundTheWorld);
	$("#check-weather-button").click(weatherAroundTheWorld);
	$("#check-weather-input").keypress(function(event){
        	if (event.which == 13) {
			$("#check-weather-button").click();
    			}
	})
}

var geolocation = function(event){
 	navigator.geolocation.getCurrentPosition(locationFromGoelocation, defaultLocation);
 	}
		function locationFromGoelocation(position){
	    	loadWeather(position.coords.latitude+','+position.coords.longitude);
		setInterval(geolocation, 3600000);
		}
	    	function defaultLocation(position) {
	  	loadWeather(52.22967560 + ',' + 21.01222870);
	  	setInterval(geolocation, 3600000);
	  	}

function loadWeather(location, woeid){
		$.simpleWeather({
			location: location,
			woeid: woeid,
			unit: 'c',
			success: function(weather){
				city = weather.title;
				temp = weather.temp +" &deg;" + weather.units.temp;
				wcode = '<img class="weathericon" src="images/weathericons/'+weather.code+'.svg">';
				wind = "<p>" + weather.wind.speed + "</p><p>" + weather.units.speed + "</p>";
				humidity = weather.humidity + " %";
				sunrise = weather.sunrise;
				sunset = weather.sunset;

				$(".location").text(city);
				$(".temperature").html(temp);
				$(".climate_bg").html(wcode);
				$(".windspeed").html(wind);
				$(".humidity").text(humidity);	
				$(".sunrise").text(sunrise);
				$(".sunset").text(sunset);
			},
			error: function(error){
				$(".error").html("<p>" + error + "</p>");	
			}
		});
	}

var weatherAroundTheWorld = function(event){
	var city = (event.target);
	var inputText = (event.target.previousElementSibling).value;
	$(".error").html("");
	loadWeather(inputText);
	$("#check-weather-input").val("");
}
$(geolocation);
$(attachEventHandlers);
});
