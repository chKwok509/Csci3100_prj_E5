var seconds = 0;
var minutes = 0;
var hours = 0;

function pad(val) {
    return val > 9 ? val : "0" + val;
}

setInterval(function(){
    document.getElementById("timer").innerHTML = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
    seconds++;
    if (seconds == 60) {
        minutes++;
        seconds = 0;
    }
    if (minutes == 60) {
        hours++;
        minutes = 0;
    }
}, 1000);