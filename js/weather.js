$("geolocation").ready(function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    loadWeather(position.coords.latitude+','+position.coords.longitude); 
    setInterval(loadWeather, 3600000);
	});

	function loadWeather(location, woeid){
		$.simpleWeather({
			location: location,
			woeid: woeid,
			unit: 'c',
			success: function(weather){
				city = weather.city + ',' + weather.region;
				temp = weather.temp +" &deg;" + weather.units.temp;
				wcode = '<img class="weathericon" src="images/weathericon/'+weather.code+'.svg">';
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
})
