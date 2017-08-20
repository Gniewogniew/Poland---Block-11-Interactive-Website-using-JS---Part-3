function main() {
    geolocation();

    $("#cityValueFromInput").keypress(function getWeatherFromUserInput() {
    
    });

    $("#userCityLoadButton").click(function getWeatherFromUserInput() {
		
    });

    function getWeatherFromUserInput() {
    	if ($("#cityValueFromInput").val() == "") {
		$("#error-message").html("<p> Proszę wpisać miasto </p>");
	} else if (event.which == 13 || event.button == 0) {
           	$("#error-message").html("");
            	loadWeather($("#cityValueFromInput").val());
            	$("#cityValueFromInput").val("");
	}
    }
	
	function geolocation() {
 		if("geolocation" in navigator){
 			navigator.geolocation.getCurrentPosition(UserLocationFromGoelocation, LoadDefaultLocation);
 		}else{
 			loadWeather(52.22967560 + ',' + 21.01222870);
 			setInterval(loadWeather(52.22967560 + ',' + 21.01222870), 60000);
 		}
 	}
	function UserLocationFromGoelocation(position) {
	    loadWeather(position.coords.latitude+','+position.coords.longitude);
		setTimeout(geolocation, 3600000);
	}
	function LoadDefaultLocation(position) {
	  	loadWeather(52.22967560 + ',' + 21.01222870);
	  	setTimeout(geolocation, 3600000);
	}

    function loadWeather(location, woeid) {
        $.simpleWeather({
            location: location,
            woeid: woeid,
            unit: 'c',
            success: function(weather) {
                city = weather.title;
                temp = weather.temp + " &deg;" + weather.units.temp;
                wcode = '<img class="weathericon" src="images/weathericons/' + weather.code + '.svg">';
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
            error: function(error) {
            	$("#cityValue").val("");
                $(".error").html("<p>" + error + "</p>");
            }
        });
    }
}
$(main)
