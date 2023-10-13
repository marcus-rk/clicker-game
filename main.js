// makj0005

const button = document.querySelector('button');
const barFill = document.querySelector('.fill');

// current width for fill in progressbar
let width = 0;

// current fill step for progressbar (1 = 1% and 25 = 25% etc.)
let fillStep = 5; // default 5

// current drain value and time-interval
let drainStepValue = 0; // default 0
let drainStepTime = 0 * 1000; // default 0 sec

// add click event listener to button
button.addEventListener("click", () => {
    fillBar();
});

// add
document.addEventListener("DOMContentLoaded", () => {
    setInterval(drainBar, drainStepTime);
});

// function for fill bar
const fillBar = () => {
    width += fillStep;

    if (width > 100)
        width = 100;

    barFill.style.width = `${width}%`;
}

// function for draining bar
const drainBar = () => {
    width -= drainStepValue;

    if (width < 0)
        width = 0;

    barFill.style.width = `${width}%`;
}
