/**
 * Created by Iaroslav Zhbankov on 02.10.2016.
 */

$(".city").html(YMaps.location.city + ", " + YMaps.location.country);

$.ajax({
    url: "https://api.darksky.net/forecast/5dd4dc7ef0ce4021dd39c00c60bf98f4/" + YMaps.location.latitude.toString() + "," + YMaps.location.longitude.toString(),
    dataType: 'jsonp',
    success: function (response) {
        $(".temperature").html(response.currently.temperature.toFixed(1));
        $(".temperatureSwitcher").html("&#176;F");
        $(".temperatureSwitcher").attr("scale", "far");
        $(".sky").html(response.currently.icon);
        var windB = response.currently.windBearing;
        $(".wind").html((response.currently.windSpeed * 1609.34 / 3600).toFixed(1) + " m/sec, " + windDirection(windB));
    }
});

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

