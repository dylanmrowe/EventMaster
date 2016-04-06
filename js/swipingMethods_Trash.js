/**
* Created by Andrew on 4/2/2016.
*/

function isTouchDevice() {
	console.log("got to isTouchDevice()");
    return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
}

var isTinderStyle = true;
var significantDistance = 20;
var pressPoint = {x:0, y:0};
var releasePoint = {x:0, y:0};

var PRESS = function(e) {
	console.log("got to PRESS");
    pressPoint.x = e.pageX;
    pressPoint.y = e.pageY;
    console.log("Pressed");

    return true;
}

var RELEASE = function(e) {
	console.log("got to RELEASE");
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
			console.log("got to max == left");
            text = "RIGHT";
        } else if(max == right) {
			console.log("got to max == right");
            text = "LEFT";
        } else if(max == up) {
			console.log("got to max == up");
            text = "UP";
        } else if(max == down) {
			console.log("got to max == down");
            text = "DOWN";
        }
    }

    if(isTinderStyle) {
        if(text == "LEFT") {
			console.log("got to text == left");
			setTimeout(forward, 1500);
            toast(text);
        }
        else if(text != "NONE")
        {
			console.log("got to text == none");
            toast(text);
        }
    }
    console.log(text);
    
    return true;
}

var forward = function () {
    var url = document.URL;
    if(url.includes("trash"))
    {
        location.replace(url.replace("trash", "emptyTrash"));
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