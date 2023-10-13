// makj0005

const button = document.querySelector('button');
const barFill = document.querySelector('.fill');

const levelElement = document.querySelector('.level');
const fillStepElement = document.querySelector('.fill-step');
const drainValueElement = document.querySelector('.drain-value');
const drainIntervalElement = document.querySelector('.drain-interval');
const percentageElement = document.querySelector('span');

// current width for fill in progressbar
let width = 0;

// current fill step for progressbar (1 = 1% and 25 = 25% etc.)
let fillStep = 5; // default 5

// current drain value and time-interval
let drainStepValue = 2; // default 2
let drainStepTime = 1; // default 1 sec


let drainInterval = setInterval(drainBar, drainStepTime * 1000);
let isLevelPause = false;
const levelDownPauseDuration = 1000; // ms
const levelDownBuff = 5;


// current level
let LEVEL = 9;

// Multipliers
    // step up and down
let stepUpMultiplier = 1.1; // Value to multiply when leveling up
let stepDownMultiplier = 0.9; // Value to divide when leveling down

    // drain value up and down
let drainValueLevelUpMultiplier = 1.2;
let drainValueLevelDownMultiplier = 0.8;

    // drain time up and down
let drainTimeLevelUpMultiplier = 0.95;
let drainTimeLevelDownMultiplier = 1.05;


/* ------------------------------------------------------------------ */

// add click event listener to button.
button.addEventListener("click", () => {
    fillBar();
});

/* ------------------------------------------------------------------ */

//
function levelUp() {

}

//
function levelDown() {

}


function updateElementValue(element, number) {
    const string = element.innerText;
    const stringSplit = string.split(":");
    element.innerText = stringSplit[0] + ": " + Math.round(number);
}

function updateAllElements() {
    updateElementValue(drainIntervalElement, drainStepTime);
    updateElementValue(fillStepElement, fillStep);
    updateElementValue(drainValueElement, drainStepValue);
    updateElementValue(levelElement, LEVEL);
    updateWidth();
}

// function to update drain interval
function updateDrainInterval() {
    clearInterval(drainInterval);
    drainInterval = setInterval(drainBar, drainStepTime);
}

// function for fill bar
function fillBar() {
    width += fillStep;

    if (width >= 100)
        levelUp();

    updateWidth();
}

// function for draining bar
function drainBar() {

}

function setDrainStepTime(newTime) {
    drainStepTime = newTime;

    if (drainStepTime < 0)
        drainStepTime = 0;

    updateDrainInterval()
}

function setDrainStepValue(newValue) {
    drainStepValue = newValue;

    if (drainStepValue < 1)
        drainStepValue = 1;
}

function updateWidth() {
    barFill.style.width = `${width}%`;

    if (width > 100)
        width = 100;

    percentageElement.innerText = `${Math.round(width)}%`;
}

function resetWidth() {
    width = 0;

    if (LEVEL > 1)
        width = levelDownBuff; // head start on new level

    updateWidth();
}