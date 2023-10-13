// makj0005

const button = document.querySelector('button');
const barFill = document.querySelector('.fill');

const levelElement = document.querySelector('.level');
const fillStepElement = document.querySelector('.fill-step');
const drainValueElement = document.querySelector('.drain-value');
const drainIntervalElement = document.querySelector('.drain-interval');

// current width for fill in progressbar
let width = 0;

// current fill step for progressbar (1 = 1% and 25 = 25% etc.)
let fillStep = 101; // default 5

// current drain value and time-interval
let drainStepValue = 1; // default 1
let drainStepTime = 1; // default 1 sec
let drainInterval = setInterval(drainBar, drainStepTime * 1000); // start on load

// current level
let LEVEL = 1;

/* ------------------------------------------------------------------ */

// add click event listener to button.
button.addEventListener("click", () => {
    fillBar();
});

/* ------------------------------------------------------------------ */

//
function levelUp() {
    LEVEL++;
    drainStepValue = drainStepValue + LEVEL;

    if (LEVEL % 10 === 0 && LEVEL !== 0) {
        drainStepTime = drainStepTime * 0.90;
        updateDrainInterval();
    }

    updateElementValue(drainIntervalElement, drainStepTime);
    updateElementValue(drainValueElement, drainStepValue);
    updateElementValue(levelElement, LEVEL);
    updateElementValue(fillStepElement, fillStep);

    resetWidth();
}

//
function levelDown() {
    const isUnderZero = LEVEL-1 < 0
    if (!isUnderZero)
        LEVEL--;
}

function updateElementValue(element, number) {
    const string = element.innerText;
    const stringSplit = string.split(":");
    element.innerText = stringSplit[0] + ": " + number;
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
    width -= drainStepValue;

    if (width < 0)
        width = 0;

    updateWidth();
}

function addDrainStepTime(timeSeconds) {
    drainStepTime += (timeSeconds * 1000);
    updateDrainInterval()
}

function removeDrainStepTime(timeSeconds) {
    drainStepTime -= (timeSeconds * 1000);
    updateDrainInterval()
}

function updateWidth() {
    barFill.style.width = `${width}%`;
}

function resetWidth() {
    width = 0;
    updateWidth();
}