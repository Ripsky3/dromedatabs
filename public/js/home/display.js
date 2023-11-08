const displayOptionOne = document.querySelector(".display-option-one");
const displayOptionTwo = document.querySelector(".display-option-two");
const displayOptionThree = document.querySelector(".display-option-three");

const displayLeft = document.querySelectorAll(".display-left");
const displayRight = document.querySelectorAll(".display-right")


for (let i = 0; i < displayLeft.length; i++) {
    displayLeft[i].addEventListener("click", (e) => {
        setLeftDisplayControls(e);
    })
}

for (let i = 0; i < displayRight.length; i++) {
    displayRight[i].addEventListener("click", (e) => {
        setRightDisplayControls(e);
    })
}

function setLeftDisplayControls(button) {
    const displayClassList = button.target.parentElement.parentElement.classList
    if (displayClassList.contains("display-option-one")) {
        moveDisplayLeft(displayOptionOne)
        moveDisplayRightInvisible(displayOptionThree)
        moveDisplayMiddle(displayOptionTwo);
        
    }
    if (displayClassList.contains("display-option-two")) {
        moveDisplayLeft(displayOptionTwo)
        moveDisplayRightInvisible(displayOptionOne)
        moveDisplayMiddle(displayOptionThree);
    }
    if (displayClassList.contains("display-option-three")) {
        moveDisplayLeft(displayOptionThree)
        moveDisplayRightInvisible(displayOptionTwo)
        moveDisplayMiddle(displayOptionOne);
    }
}

function setRightDisplayControls(button) {
    const displayClassList = button.target.parentElement.parentElement.classList
    if (displayClassList.contains("display-option-one")) {
        moveDisplayRight(displayOptionOne)
        moveDisplayLeftInvisible(displayOptionTwo)
        moveDisplayMiddle(displayOptionThree);
        
    }
    if (displayClassList.contains("display-option-two")) {
        moveDisplayRight(displayOptionTwo)
        moveDisplayLeftInvisible(displayOptionThree)
        moveDisplayMiddle(displayOptionOne);
    }
    if (displayClassList.contains("display-option-three")) {
        moveDisplayRight(displayOptionThree)
        moveDisplayLeftInvisible(displayOptionOne)
        moveDisplayMiddle(displayOptionTwo);
    }
}

function moveDisplayMiddle(display) {
    display.classList.remove("right");
    display.classList.remove("left");
}

function moveDisplayRight(display) {
    display.classList.add("right");
    display.classList.remove("left");
}

function moveDisplayLeft(display) {
    display.classList.add("left");
    display.classList.remove("right");
}

function moveDisplayLeftInvisible(display) {
    display.classList.add("invisible");
    display.classList.add("left");
    display.classList.remove("right");
    setTimeout(() => {
        display.classList.remove("invisible");
    }, 1000);
}

function moveDisplayRightInvisible(display) {
    display.classList.add("invisible");
    display.classList.add("right");
    display.classList.remove("left");
    setTimeout(() => {
        display.classList.remove("invisible");
    }, 1000);
}