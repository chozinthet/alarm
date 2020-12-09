var currentHour, currentMin, setHour, setMin, time, today;
var inputHour = document.getElementById('input-hour');
var inputMin = document.getElementById('input-min');
var bellSound = new Audio('sound/alarm-clock.mp3');
var setAlarm = false;

setInterval(() => {
    getCurrentTime(); 
}, 1000)
function getCurrentTime(){
    today = new Date();
    if(today.getHours() > 12){
        currentHour = 12 - (24 - today.getHours());
    }else{
        currentHour = today.getHours();
    }
    time = currentHour + ":" + today.getMinutes() + ":" + today.getSeconds();
    document.getElementById('current-time').innerHTML = time;
}

function increaseHour(){
    var oldValue = parseFloat(inputHour.value);
    var increaseValue;
    if(oldValue < 12){
        increaseValue = oldValue + 1;
    }else{
        increaseValue = 1;
    }
    inputHour.value = increaseValue;
    setHour = increaseValue;
}

function decreaseHour(){
    var oldValue = parseFloat(inputHour.value);
    var decreaseValue;
    if(oldValue > 1){
        decreaseValue = oldValue - 1;
    }else{
        decreaseValue = 12;
    }
    inputHour.value = decreaseValue;
    setHour = decreaseValue;
}

function increaseMin(){
    var oldValue = parseFloat(inputMin.value);
    var increaseValue;
    if(oldValue < 60){
        increaseValue = oldValue + 1;
    }else{
        increaseValue = 0;
    }
    inputMin.value = increaseValue;
    setMin = increaseValue;
}

function decreaseMin(){
    var oldValue = parseFloat(inputMin.value);
    var decreaseValue;
    if(oldValue > 0){
        decreaseValue = oldValue - 1;
    }else{
        decreaseValue = 60;
    }
    inputMin.value = decreaseValue;
    setMin = decreaseValue;
}

function setTime(){
    if(!setHour || !setMin){
        if(!setHour && !setMin){
            setHour = 1;
            setMin = 0;
        }else if(!setHour){
            setHour = 1;
            console.log("not set hour")
        }else if(!setMin){
            setMin = 0;
            console.log("not set min")
        }
    }

        if(setHour){
            var alarmHour = setHour - currentHour;
            var alarmMin = setMin - today.getMinutes();
            if(alarmHour > 0){
                if(setMin < today.getMinutes()){
                    alarmMin = 60 + alarmMin;
                    alarmHour--;
                }
            }else if(alarmHour < 0 || (alarmHour === 0 && setMin < today.getMinutes() )){
            /* If alarm hour less than or equal to 0 */
                alarmHour = 12 + alarmHour;

                var alarmMin = setMin - today.getMinutes();
                if(setMin < today.getMinutes()){
                    alarmMin = 60 + alarmMin;
                    alarmHour--;
                }
            }
        }
        document.getElementById('rest-time').innerHTML = "Alarm will wake you in " + alarmHour + " hour " + alarmMin + " minute";
        var totalMin = (alarmHour * 60) + alarmMin;
        var totalMilliSec = totalMin * 60000;
        setTimeout( () => playSound() , totalMilliSec);
        setAlarm="true";
    }
function ring(){
    alert('get up')
}
function playSound(){
    document.getElementById('stop-button-container').style.display = "block";
    document.getElementById('sound-stop-btn').style.display = "inline-block";
    bellSound.play();
}
function stopAlarm(){
    bellSound.pause();
    document.getElementById('stop-button-container').style.display = "none";
    document.getElementById('sound-stop-btn').style.display = "none";
    document.getElementById('input-hour').value = 1;
    document.getElementById('input-min').value = 0;
    alarmHour = 0;
    alarmMin = 0;
}