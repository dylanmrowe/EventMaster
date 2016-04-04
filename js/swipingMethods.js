/**
 * Created by Andrew on 4/2/2016.
 */

$(function () {

    function isTouchDevice() {
        return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
    }

    var significantDistance = 30;
    var pressPoint = {x:0, y:0};
    var releasePoint = {x:0, y:0};

    var RELEASE = function(e) {
        pressPoint.x = e.pageX;
        pressPoint.y = e.pageY;
        console.log("Pressed");

        return true;
    }

    var PRESS = function(e) {
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
                text = "LEFT";
            } else if(max == right) {
                text = "RIGHT";
            } else if(max == up) {
                text = "UP";
            } else if(max == down) {
                text = "DOWN";
            }
        }

        console.log(text);

        return true;
    }

    if(isTouchDevice()) {
        console.log("Touch Device not yet implemented");
    } else {
        $("body").mouseup(PRESS);
        $("body").mousedown(RELEASE);
        console.log("Swiping ready");
    }
});