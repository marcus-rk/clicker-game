// makj0005

const button = document.querySelector('button');
const barFill = document.querySelector('.fill');

// current width for fill in progressbar
let width = 0;

// current fill step for progressbar (1 = 1% and 25 = 25% etc.)
let fillStep = 5; // default 5

// current drain value and time-interval
let drainStepValue = 1; // default 1
let drainStepTime = 1 * 1000; // default 1 sec
let drainInterval = setInterval(drainBar, drainStepTime); // start on load

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
    drainStepValue = drainStepValue * LEVEL;

    if (LEVEL % 10 === 0 && LEVEL !== 0) {
        drainInterval = drainInterval * 0.90;
        updateDrainInterval();
    }
}

//
function levelDown() {
    const isUnderZero = LEVEL-1 < 0
    if (!isUnderZero)
        LEVEL--;
}

// function to update drain interval
function updateDrainInterval() {
    clearInterval(drainInterval);
    drainInterval = setInterval(drainBar, drainStepTime);
}

// function for fill bar
function fillBar() {
    width += fillStep;

    if (width > 100)
        levelUp();

    barFill.style.width = `${width}%`;
}

// function for draining bar
function drainBar() {
    width -= drainStepValue;

    if (width < 0)
        width = 0;

    barFill.style.width = `${width}%`;
}

function addDrainStepTime(timeSeconds) {
    drainStepTime += (timeSeconds * 1000);
    updateDrainInterval()
}

function removeDrainStepTime(timeSeconds) {
    drainStepTime -= (timeSeconds * 1000);
    updateDrainInterval()
}