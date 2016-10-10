/**
 * Created by Iaroslav Zhbankov on 02.10.2016.
 */
ymaps.ready(init);

function init() {
    $(".city").html(ymaps.geolocation.city + ", " + ymaps.geolocation.country);

    $.ajax({
        url: "https://api.darksky.net/forecast/5dd4dc7ef0ce4021dd39c00c60bf98f4/" + ymaps.geolocation.latitude.toString() + "," + ymaps.geolocation.longitude.toString(),
        dataType: 'jsonp',
        success: function (response) {
            $(".temperature").html(response.currently.temperature.toFixed(1));
            $(".temperatureSwitcher").html("&#176;F");
            $(".temperatureSwitcher").attr("scale", "far");
            /*$(".sky").html(response.currently.icon);*/
            skyIconDetermination(response.currently.icon);
            skyDeterminator(response.currently.icon);
            var windB = response.currently.windBearing;
            $(".wind").html((response.currently.windSpeed * 1609.34 / 3600).toFixed(1) + " m/sec, " + windDirection(windB));
        }
    });
}
var temperatureSwitcher = document.getElementsByClassName("temperatureSwitcher");

temperatureSwitcher[0].addEventListener("click", function () {
    var temperature = Number($(".temperature").text());
    if ($(".temperatureSwitcher").attr("scale") == "far") {
        $(".temperatureSwitcher").html("&#176;C");
        $(".temperatureSwitcher").attr("scale", "cel");
        $(".temperature").html(((temperature - 32) * 5 / 9).toFixed(1));
    } else {
        $(".temperatureSwitcher").html("&#176;F");
        $(".temperatureSwitcher").attr("scale", "far");
        $(".temperature").html((temperature * 1.8 + 32).toFixed(1));
    }
});

function windDirection(windB) {
    var windDirection;
    if ((windB == 0) || (windB == 360)) {
        windDirection = "N"
    }
    else if ((windB > 0) && (windB < 90)) {
        windDirection = "NE"
    }
    else if ((windB == 90)) {
        windDirection = "E"
    }
    else if ((windB > 90) && (windB < 180)) {
        windDirection = "SE"
    }
    else if ((windB == 180)) {
        windDirection = "S"
    }
    else if ((windB > 180) && (windB < 270)) {
        windDirection = "SW"
    }
    else if ((windB == 270)) {
        windDirection = "W"
    }
    else if ((windB > 270) && (windB < 360)) {
        windDirection = "NW"
    }
    return windDirection;
}

function skyIconDetermination(sky){
    if (sky == "clear-day") {
        $(".sky").append("<img src='img/icons/clear-day.png' width='50' height='50'>");
    } else if (sky == "clear-night") {
        $(".sky").append("<img src='img/icons/clear-night.png' width='50' height='50'>");
    } else if (sky == "rain") {
        $(".sky").append("<img src='img/icons/rain.png' width='50' height='50'>");
    } else if (sky == "snow") {
        $(".sky").append("<img src='img/icons/snow.png' width='50' height='50'>");
    } else if (sky == "sleet") {
        $(".sky").append("<img src='img/icons/sleet.png' width='50' height='50'>");
    } else if (sky == "wind") {
        $(".sky").append("<img src='img/icons/wind.png' width='50' height='50'>");
    } else if (sky == "fog") {
        $(".sky").append("<img src='img/icons/fog.png' width='50' height='50'>");
    } else if (sky == "cloudy") {
        $(".sky").append("<img src='img/icons/cloud.png' width='50' height='50'>");
    } else if (sky == "partly-cloudy-day") {
        $(".sky").append("<img src='img/icons/partly-cloudy-day.png' width='50' height='50'>");
    } else if (sky == "partly-cloudy-night") {
        $(".sky").append("<img src='img/icons/partly-cloudy-night.png' width='50' height='50'>");
    } else if (sky == "thunderstorm") {
        $(".sky").append("<img src='img/icons/thunderstorm.png' width='50' height='50'>");
    } else if (sky == "hail") {
        $(".sky").append("<img src='img/icons/hail.png' width='50' height='50'>");
    }
    /*$('body').css('background-size', '100%');
    $('body').css('background-size', 'cover');*/
};


function skyDeterminator(sky) {
    if (sky == "clear-day") {
        $("body").css("background", "url('img/clear-day.jpg')  no-repeat center center fixed");
    } else if (sky == "clear-night") {
        $('body').css('background', 'url("img/clear-night.jpg") no-repeat center center fixed');
    } else if (sky == "rain") {
        $("body").css("background", "url('img/rain.jpg')  no-repeat center center fixed");
    } else if (sky == "snow") {
        $("body").css("background", "url('img/snow.png')  no-repeat center center fixed");
    } else if (sky == "sleet") {
        $("body").css("background", "url('img/sleet.jpg')  no-repeat center center fixed");
    } else if (sky == "wind") {
        $("body").css("background", "url('img/wind.jpg')  no-repeat center center fixed");
    } else if (sky == "fog") {
        $("body").css("background", "url('img/fog.jpg')  no-repeat center center fixed");
    } else if (sky == "cloudy") {
        $("body").css("background", "url('img/cloud.jpg')  no-repeat center center fixed");
    } else if (sky == "partly-cloudy-day") {
        $("body").css("background", "url('img/partly-cloudy-day.jpg')  no-repeat center center fixed");
    } else if (sky == "partly-cloudy-night") {
        $("body").css("background", "url('img/partly-cloudy-night.jpg')  no-repeat center center fixed");
    }
    $('body').css('background-size', '100%');
    $('body').css('background-size', 'cover');
}