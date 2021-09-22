// Function DATE another way
// function cuurentDate() {
// let dd = new Date();
// let day = dd.getDate();
// let month = dd.getMonth() + 1;
// let year = dd.getFullYear();
// if (day < 10) day = '0' + day;
// if (month < 10) month = '0' + month;
// document.querySelector('.date').innerHTML = `${day} . ${month} . ${year}`
//    }
// cuurentDate()

// Function HOUR another way
// setInterval(() => {
// let dd = new Date();
// let hh = dd.getHours();
// let mm = dd.getMinutes();
// let ss = dd.getSeconds();
// if (hh < 10) hh = '0' + hh;
// if (mm < 10) mm = '0' + mm;
// if (ss < 10) ss = '0' + ss;
// document.querySelector('.clock').innerHTML = `${hh} : ${mm} : ${ss}`
// })

// Cuurent Date and Time
function cuurentDateAndTime() {
    document.querySelector('.date').innerHTML = new Date().toLocaleDateString().replaceAll(`/`, `.`)
    setInterval(() => {
        document.querySelector('.clock').innerHTML = new Date().toLocaleTimeString()
    })
}
cuurentDateAndTime()

// STOPWATCH
let hour = 0
let min = 0
let sec = 0;
let msec;
let stopwatch;
let stopwatchmsec;

// START Stopwatch button

function startStopwatch() {

    stopwatch = setInterval(() => {

        sec += 1;
        if (sec >= 60) {
            sec = 0;
            min += 1;
        }
        if (min >= 60) {
            hour += 1;
            min = 0
        }

        let timeToShow = [`00`, `00`, `00`]
        timeToShow[0] = hour < 10 ? `0${hour}` : hour;
        timeToShow[1] = min < 10 ? `0${min}` : min;
        timeToShow[2] = sec < 10 ? `0${sec}` : sec;
        document.querySelector('.hour').innerHTML = timeToShow.join(`:`)

    }, 1000)
    document.querySelector('.start-SW').disabled = true
    document.querySelector('.loop-SW').disabled = false
    document.querySelector('.stop-SW').disabled = false
    document.querySelector('.reset-SW').disabled = false
    stopwatchmsec = setInterval(() => {
        msec = new Date().getMilliseconds()
        if (msec < 10) {
            msec = `:00${msec}`;
        }
        else if (msec < 100) {
            msec = `:0${msec}`;
        }
        else {
            msec = `:${msec}`;
        }
        document.querySelector('.miliseconds').innerHTML = msec;

    }, 1)
}

// STOP Button
function stopStopwatch() {
    clearInterval(stopwatch)
    clearInterval(stopwatchmsec)
    document.querySelector('.start-SW').disabled = false
}

// LOOP Button
function loopStopwatch() {
    document.querySelector('.stopwatch-screen').innerHTML += document.querySelector('.stopwatch-number').textContent + `<br>`

}

// RESET Button
function resetStopwatch() {
    hour = 0
    min = 0
    sec = 0;
    msec = 0;
    document.querySelector('.hour').innerHTML = `00:00:00`;
    document.querySelector('.miliseconds').innerHTML = `:000`;
    document.querySelector('.stopwatch-screen').innerHTML = ``;
    clearInterval(stopwatch)
    clearInterval(stopwatchmsec)
    document.querySelector('.start-SW').disabled = false
    document.querySelector('.loop-SW').disabled = true
    document.querySelector('.stop-SW').disabled = true
    document.querySelector('.reset-SW').disabled = true
}
// END STOPWATCH


// TIMER 
let timerValue = document.querySelector(`.timer-long`).innerHTML;
let timer
let timerNum = timerValue * 60;
let saveNum = timerNum;

// START Timer

function timerStart() {

    timer = setInterval(() => {
        if (saveNum == 0) {
            control()
        }

        let timerSec = saveNum % 60
        let timerMinut = parseInt(saveNum / 60);
        saveNum -= 1
        let timerToShow = [`00`, `00`];
        timerToShow[0] = timerMinut < 10 ? `0${timerMinut}` : timerMinut;
        timerToShow[1] = timerSec < 10 ? `0${timerSec}` : timerSec;
        document.querySelector(`.timer-number`).innerHTML = timerToShow.join(`:`);

    }, 1000)
    document.querySelector('.timer-start').disabled = true
    document.querySelector('.timer-stop').disabled = false
    document.querySelector('.timer-reset').disabled = false
    document.querySelector('.timer-minutes-plus').disabled = true
    document.querySelector('.timer-minutes-minus').disabled = true

}

// Timer out Examination function 
function control() {
    if (saveNum === 0) {
        clearInterval(timer)
        document.querySelector(`.popup`).classList.add(`open`)
        document.querySelector(`.popup__text`).innerHTML = `Час вийшов!<br><h6>Для повторного запуску необхідно нажати кнопку RESET</h6>`
        document.querySelector('.timer-start').disabled = true
        document.querySelector('.timer-stop').disabled = true
        document.querySelector('.timer-minutes-plus').disabled = false
        document.querySelector('.timer-minutes-minus').disabled = false
    }
}

// PLUS Button
function timerPlus() {
    timerValue = parseInt(timerValue) + 1
    document.querySelector(`.timer-long`).innerHTML = timerValue;
    timerNum = timerValue * 60;
    saveNum = timerNum;
    document.querySelector('.timer-minutes-minus').disabled = false
    document.querySelector('.timer-start').disabled = false
    document.querySelector('.timer-stop').disabled = false
    document.querySelector('.timer-reset').disabled = false
    document.querySelector('.timer-minutes-minus').disabled = false
}

// Minus Button
function timerMinus() {

    timerValue = parseInt(timerValue) - 1
    document.querySelector(`.timer-long`).innerHTML = timerValue;
    timerNum = timerValue * 60;
    saveNum = timerNum;
    if (timerValue === 0) {
        clearInterval(timer)
        document.querySelector(`.popup`).classList.add(`open`)
        document.querySelector(`.popup__text`).textContent = `Виставте необхідну кількість хвилин!`
        document.querySelector('.timer-start').disabled = true
        document.querySelector('.timer-stop').disabled = true
        document.querySelector('.timer-reset').disabled = true
        document.querySelector('.timer-minutes-minus').disabled = true
    }

}

// STOP Timer
function timerStop() {
    clearInterval(timer)
    timerNum = saveNum
    document.querySelector('.timer-start').disabled = false
}

// RESET Timer
function timerReset() {
    document.querySelector(`.timer-long`).innerHTML = `1`
    timerValue = document.querySelector(`.timer-long`).innerHTML;
    timerNum = timerValue * 60;
    saveNum = timerNum;
    document.querySelector(`.timer-number`).innerHTML = `00:00`
    clearInterval(timer)
    document.querySelector('.timer-start').disabled = false
    document.querySelector('.timer-minutes-plus').disabled = false
    document.querySelector('.timer-minutes-minus').disabled = false
    closePopup()
}

// TIMER END



// close Popup
function closePopup() {
    document.querySelector(`.popup`).classList.remove(`open`)
}