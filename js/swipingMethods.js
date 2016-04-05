/**
* Created by Andrew on 4/2/2016.
*/

function isTouchDevice() {
    return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
}

var isTinderStyle = true;
var significantDistance = 20;
var pressPoint = {x:0, y:0};
var releasePoint = {x:0, y:0};

var PRESS = function(e) {
    pressPoint.x = e.pageX;
    pressPoint.y = e.pageY;
    console.log("Pressed");

    return true;
}

var RELEASE = function(e) {
    releasePoint.x = e.pageX;
    releasePoint.y = e.pageY;
    console.log("Released");

    var left = pressPoint.x - releasePoint.x;
    var right = releasePoint.x - pressPoint.x;
    var up = pressPoint.y - releasePoint.y;
    var down = releasePoint.y - pressPoint.y;

    var max = Math.max(left, right, up, down);
    var text = "NONE";
    if(max >= significantDistance) {
        if(max == left) {
            text = "RIGHT";
        } else if(max == right) {
            text = "LEFT";
        } else if(max == up) {
            text = "UP";
        } else if(max == down) {
            text = "DOWN";
        }
    }

    if(isTinderStyle) {
        if(text == "UP") {
            text = "INTERESTED";
        } 
        else if(text == "DOWN") {
            text = "TRASHED";
        }

        if(text == "LEFT") {
            setTimeout(backward, 1500);
            toast(text);
        }
        else if(text != "NONE")
        {
            setTimeout(forward, 1500);
            toast(text);
        }
    }
    console.log(text);
    
    return true;
}

var forward = function () {
    var url = document.URL;
    if(url.includes("marioEvent"))
    {
        location.replace(url.replace("marioEvent", "subwayEvent"));
    }
    else if(url.includes("subwayEvent")) 
    {
        location.replace(url.replace("subwayEvent", "frisbeeEvent"));
    }
    else if(url.includes("frisbeeEvent")) 
    {
        location.replace(url.replace("frisbeeEvent", "noMoreEvents"));
    } 
}

var backward = function () {
    var url = document.URL;
    if(url.includes("frisbeeEvent"))
    {
        location.replace(url.replace("frisbeeEvent", "subwayEvent"));
    }
    else if(url.includes("subwayEvent")) 
    {
        location.replace(url.replace("subwayEvent", "marioEvent"));
    }
    else if(url.includes("marioEvent")) 
    {
        location.replace(url.replace("marioEvent", "search"));
    } 
}

var toast = function (text) {
    $('.toast').text(text).fadeIn(200).delay(1000).fadeOut(200);
}

if(isTouchDevice()) {
    console.log("Touch Device not yet implemented");
} else {
    $("body").mouseup(RELEASE);
    $("body").mousedown(PRESS);
    console.log("Swiping ready");
}