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
let fillStep = 5; // default 5

// current drain value and time-interval
let drainStepValue = 2; // default 2
let drainStepTime = 1; // default 1 sec


let drainInterval = setInterval(drainBar, drainStepTime * 1000);
const levelDownBuff = 5;
let isLevel = false;
const levelCooldown = 500;

// current level
let LEVEL = 1;

// Multipliers - Value to multiply when leveling up
    // step up and down
const stepUpMultiplier = 1.05;
const stepDownMultiplier = 0.95;

    // drain value up and down
const drainValueLevelUpMultiplier = 1.1;
const drainValueLevelDownMultiplier = 0.9;

    // drain time up and down
const drainTimeLevelUpMultiplier = 0.9;
const drainTimeLevelDownMultiplier = 1.1;


/* ------------------------------------------------------------------ */

// add click event listener to button.
button.addEventListener("click", () => {
    fillBar();
});

document.addEventListener('keypress', (event) => {
    if (event.key === ' '){
        button.click();
    }
});

/* ------------------------------------------------------------------ */

/**
 * Handles the cooldown period after leveling up or down.
 */
function levelCoolDown() {
    updateAllElements();
    setTimeout(() => {
        isLevel = false;
        resetWidth();
    }, levelCooldown);
}

/**
 * Handles leveling up.
 */
function levelUp() {
    if (!isLevel) {
        isLevel = true;
        LEVEL++;

        fillStep = fillStep * stepUpMultiplier;
        setDrainStepValue(drainStepValue * drainValueLevelUpMultiplier);

        if (LEVEL % 3 === 0) {
            setDrainStepTime(drainStepTime * drainTimeLevelUpMultiplier);
        }

        levelCoolDown();
    }
}

/**
 * Handles leveling down if conditions are met.
 */
function levelDown() {
    if (!isLevel && LEVEL > 1) {
        isLevel = true;
        LEVEL--;

        fillStep = fillStep * stepDownMultiplier;
        setDrainStepValue(drainStepValue * drainValueLevelDownMultiplier);

        if (LEVEL % 3 === 0) {
            setDrainStepTime(drainStepTime * drainTimeLevelDownMultiplier);
        }

        levelCoolDown();
    }
}

/**
 * Updates the drain interval for the progress bar.
 */
function updateDrainInterval() {
    clearInterval(drainInterval);
    drainInterval = setInterval(drainBar, drainStepTime * 1000);
}

/**
 * Fills the progress bar and triggers a level up if necessary.
 */
function fillBar() {
    width += fillStep;

    if (width >= 100)
        levelUp();

    updateWidth();
}

/**
 * Drains the progress bar and triggers a level down if necessary.
 */
function drainBar() {
    width -= drainStepValue;

    if (width <= 0)
        levelDown();

    updateWidth();
}

/**
 * Sets the drain step time and updates the drain interval.
 * @param {number} newTime - The new drain step time in seconds.
 */
function setDrainStepTime(newTime) {
    drainStepTime = newTime;

    if (drainStepTime < 0)
        drainStepTime = 0;

    updateDrainInterval()
}

/**
 * Sets the drain step value.
 * @param {number} newValue - The new drain step value.
 */
function setDrainStepValue(newValue) {
    drainStepValue = newValue;

    if (drainStepValue < 1)
        drainStepValue = 1;
}

/**
 * Updates the width of the progress bar and ensures it stays within bounds.
 */
function updateWidth() {
    if (width > 100)
        width = 100;

    if (width < 0)
        width = 0;

    barFill.style.width = `${width}%`;
    updateProgressBarColor();
}

function updateProgressBarColor() {
    const red = Math.round(255 - (width / 200) * 255);
    const green = Math.round((width / 100) * 255);
    barFill.style.backgroundColor = `rgb(${red},${green},0)`;
}

/**
 * Resets the width of the progress bar, providing a head start on a new level if applicable.
 */
function resetWidth() {
    width = 0;

    if (LEVEL > 1)
        width = levelDownBuff; // head start on new level

    updateWidth();
}

/**
 * Updates the value of an HTML element.
 * @param {HTMLDivElement} element - The HTML element to update.
 * @param {number} number - The new number to display in the element.
 */
function updateElementValue(element, number) {
    const string = element.innerText;
    const stringSplit = string.split(":");
    element.innerText = `${stringSplit[0]}: ${number.toFixed(2)}`;
}

/**
 * Updates all HTML elements displaying values.
 */
function updateAllElements() {
    updateElementValue(drainIntervalElement, drainStepTime);
    updateElementValue(fillStepElement, fillStep);
    updateElementValue(drainValueElement, drainStepValue);
    updateElementValue(levelElement, LEVEL);
    updateWidth();
}