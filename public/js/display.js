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
    if (displayClassList.contains("display-option-two")) {
        moveDisplayLeft(displayOptionOne)
    }
}

function setRightDisplayControls(button) {
    const displayClassList = button.target.parentElement.parentElement.classList
    if (displayClassList.contains("display-option-two")) {
        moveDisplayRight(displayOptionOne)
    }
}

function moveDisplayRight(display) {
    display.classList.add("right");
    display.classList.remove("left");
}

function moveDisplayLeft(display) {
    display.classList.add("left");
    display.classList.remove("right");
}