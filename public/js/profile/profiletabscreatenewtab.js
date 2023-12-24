const tabDisplay = document.querySelector(".tab-display");
const addNewTabStringSectionButton = document.querySelector(".add-new-tab-string-section-button");
const firstTabStringSection = document.querySelector(".first-tab-string-section");
const tabSaveButton = document.querySelector(".tab-save-button");
const tabPostButton = document.querySelector(".tab-post-button");
const tabNameInput = document.querySelector(".tab-name-input");
const tabCategoryInput = document.querySelector(".tab-category-select");

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}

addNewTabStringSectionButton.addEventListener("click", () => {
    
    if (tabDisplay.children[tabDisplay.children.length - 1].children.length == 4) {
        const firstTabStringSection = document.createElement("textarea");
        firstTabStringSection.classList.add("tab-string-section");
        firstTabStringSection.value = "\n" +
        "E |------------------------------|\n" +
        "B |------------------------------|\n" +
        "G |------------------------------|\n" +
        "D |------------------------------|\n" +
        "A |------------------------------|\n" +
        "E |------------------------------|\n";
        firstTabStringSection.addEventListener("keydown", () => {
            checkIfFirstTabStringSectionHasAnyMissingLines(firstTabStringSection);
            checkIfFirstTabStringSectionIsShort(firstTabStringSection);
            ensureFirstTabStringSectionTopAndBottomAreNotTooLong(firstTabStringSection);
            ensureFirstTabStringSectionFirstTwoCharactersAreLetter(firstTabStringSection);
            fillFirstTabStringSectionMissingRightPipeAndAfterRightPipe(firstTabStringSection);
            fillFirstTabStringSectionMissingHyphen(firstTabStringSection);
            firstTabStringSectionDeleteAdjacentHyphen(firstTabStringSection);
            fillFirstTabStringSectionShortHyphen(firstTabStringSection);
            checkIfFirstTabStringSectionLeftPipeIsDeleted(firstTabStringSection);
        })
        firstTabStringSection.addEventListener("keyup", () => {
            checkIfFirstTabStringSectionHasAnyMissingLines(firstTabStringSection);
            checkIfFirstTabStringSectionIsShort(firstTabStringSection);
            ensureFirstTabStringSectionTopAndBottomAreNotTooLong(firstTabStringSection);
            ensureFirstTabStringSectionFirstTwoCharactersAreLetter(firstTabStringSection);
            fillFirstTabStringSectionMissingRightPipeAndAfterRightPipe(firstTabStringSection);
            fillFirstTabStringSectionMissingHyphen(firstTabStringSection);
            firstTabStringSectionDeleteAdjacentHyphen(firstTabStringSection);
            fillFirstTabStringSectionShortHyphen(firstTabStringSection);
            checkIfFirstTabStringSectionLeftPipeIsDeleted(firstTabStringSection);
        })
        const tabDisplayRow = document.createElement("div");
        tabDisplayRow.classList.add("tab-display-row");
        tabDisplayRow.append(firstTabStringSection);
        tabDisplay.append(tabDisplayRow);
    } else {
        const tabStringSection = document.createElement("textarea");
        tabStringSection.setAttribute( "autocomplete", "off" ); 
        tabStringSection.classList.add("tab-string-section");
        tabStringSection.value = "\n" +
        "------------------------------|\n" +
        "------------------------------|\n" +
        "------------------------------|\n" +
        "------------------------------|\n" +
        "------------------------------|\n" +
        "------------------------------|\n";
        tabStringSection.addEventListener("keydown", () => {
            checkIfTabStringSectionHasAnyMissingLines(tabStringSection);
            checkIfTabStringSectionIsShort(tabStringSection);
            ensureTabStringSectionTopAndBottomAreNotTooLong(tabStringSection);
            fillTabStringSectionMissingRightPipeAndAfterRightPipe(tabStringSection);
            fillTabStringSectionMissingHyphen(tabStringSection);
            tabStringSectionDeleteAdjacentHyphen(tabStringSection);
            fillTabStringSectionShortHyphen(tabStringSection);
        })
        tabStringSection.addEventListener("keyup", () => {
            checkIfTabStringSectionHasAnyMissingLines(tabStringSection);
            checkIfTabStringSectionIsShort(tabStringSection);
            ensureTabStringSectionTopAndBottomAreNotTooLong(tabStringSection);
            fillTabStringSectionMissingRightPipeAndAfterRightPipe(tabStringSection);
            fillTabStringSectionMissingHyphen(tabStringSection);
            tabStringSectionDeleteAdjacentHyphen(tabStringSection);
            fillTabStringSectionShortHyphen(tabStringSection);
        })
        tabDisplay.children[tabDisplay.children.length - 1].append(tabStringSection);
    }
})

firstTabStringSection.value = "\n" +
"E |------------------------------|\n" +
"B |------------------------------|\n" +
"G |------------------------------|\n" +
"D |------------------------------|\n" +
"A |------------------------------|\n" +
"E |------------------------------|\n";

firstTabStringSection.addEventListener("keydown", () => {
    checkIfFirstTabStringSectionHasAnyMissingLines(firstTabStringSection);
    checkIfFirstTabStringSectionIsShort(firstTabStringSection);
    ensureFirstTabStringSectionTopAndBottomAreNotTooLong(firstTabStringSection);
    ensureFirstTabStringSectionFirstTwoCharactersAreLetter(firstTabStringSection);
    fillFirstTabStringSectionMissingRightPipeAndAfterRightPipe(firstTabStringSection);
    fillFirstTabStringSectionMissingHyphen(firstTabStringSection);
    firstTabStringSectionDeleteAdjacentHyphen(firstTabStringSection);
    fillFirstTabStringSectionShortHyphen(firstTabStringSection);
    checkIfFirstTabStringSectionLeftPipeIsDeleted(firstTabStringSection);
})

firstTabStringSection.addEventListener("keyup", () => {
    checkIfFirstTabStringSectionHasAnyMissingLines(firstTabStringSection);
    checkIfFirstTabStringSectionIsShort(firstTabStringSection);
    ensureFirstTabStringSectionTopAndBottomAreNotTooLong(firstTabStringSection);
    ensureFirstTabStringSectionFirstTwoCharactersAreLetter(firstTabStringSection);
    fillFirstTabStringSectionMissingRightPipeAndAfterRightPipe(firstTabStringSection);
    fillFirstTabStringSectionMissingHyphen(firstTabStringSection);
    firstTabStringSectionDeleteAdjacentHyphen(firstTabStringSection);
    fillFirstTabStringSectionShortHyphen(firstTabStringSection);
    checkIfFirstTabStringSectionLeftPipeIsDeleted(firstTabStringSection);
})

function ensureFirstTabStringSectionFirstTwoCharactersAreLetter(tabStringSection) {
    const tabStringSectionsArray = tabStringSection.value.split("\n")
    for (let i = 1; i < tabStringSectionsArray.length - 1; i++) {
        // Left of first char
        if (/^[a-zA-Z]+$/.test(tabStringSectionsArray[i].slice(0, 1)) == false) {
            if (i == 1) {
                if (/^[a-zA-Z]+$/.test(tabStringSectionsArray[i].slice(1, 2)) == true) {
                    tabStringSectionsArray[i] = tabStringSectionsArray[i].slice(1);
                } else {
                    tabStringSectionsArray[i] = "E" + tabStringSectionsArray[i].slice(0);
                }
            }
            if (i == 2) {
                if (/^[a-zA-Z]+$/.test(tabStringSectionsArray[i].slice(1, 2)) == true) {
                    tabStringSectionsArray[i] = tabStringSectionsArray[i].slice(1);
                } else {
                    tabStringSectionsArray[i] = "B" + tabStringSectionsArray[i].slice(0);
                }
            }
            if (i == 3) {
                if (/^[a-zA-Z]+$/.test(tabStringSectionsArray[i].slice(1, 2)) == true) {
                    tabStringSectionsArray[i] = tabStringSectionsArray[i].slice(1);
                } else {
                    tabStringSectionsArray[i] = "G" + tabStringSectionsArray[i].slice(0);
                }
            }
            if (i == 4) {
                if (/^[a-zA-Z]+$/.test(tabStringSectionsArray[i].slice(1, 2)) == true) {
                    tabStringSectionsArray[i] = tabStringSectionsArray[i].slice(1);
                } else {
                    tabStringSectionsArray[i] = "D" + tabStringSectionsArray[i].slice(0);
                }
            }
            if (i == 5) {
                if (/^[a-zA-Z]+$/.test(tabStringSectionsArray[i].slice(1, 2)) == true) {
                    tabStringSectionsArray[i] = tabStringSectionsArray[i].slice(1);
                } else {
                    tabStringSectionsArray[i] = "A" + tabStringSectionsArray[i].slice(0);
                }
            }
            if (i == 6) {
                if (/^[a-zA-Z]+$/.test(tabStringSectionsArray[i].slice(1, 2)) == true) {
                    tabStringSectionsArray[i] = tabStringSectionsArray[i].slice(1);
                } else {
                    tabStringSectionsArray[i] = "E" + tabStringSectionsArray[i].slice(0);
                }
            }
        }
        // Right of first char
        if (/^[a-zA-Z]+$/.test(tabStringSectionsArray[i].slice(1, 2)) == false &&
            tabStringSectionsArray[i].slice(1, 2) != " ") {
            if (tabStringSectionsArray[i].slice(1, 2) != "|") {
                tabStringSectionsArray[i] = tabStringSectionsArray[i].slice(0, 1) + "" + tabStringSectionsArray[i].slice(2);
            } else if (tabStringSectionsArray[i].slice(1, 2) == "|" && tabStringSectionsArray[i].slice(2, 3) == "|") {
                console.log(1)
                tabStringSectionsArray[i] = tabStringSectionsArray[i].slice(0, 1) + "" + tabStringSectionsArray[i].slice(2);
            }
            
        }
        // Right of second char
        if (/^[a-zA-Z]+$/.test(tabStringSectionsArray[i].slice(0, 1)) == true &&
            (/^[a-zA-Z]+$/.test(tabStringSectionsArray[i].slice(1, 2)) == true || tabStringSectionsArray[i].slice(1, 2) == " ")) {
            if (tabStringSectionsArray[i].slice(3, 4) == "|") {
                tabStringSectionsArray[i] = tabStringSectionsArray[i].slice(0, 2) + tabStringSectionsArray[i].slice(3);
            } else if (tabStringSectionsArray[i].slice(2, 3) != "|") {
                tabStringSectionsArray[i] = tabStringSectionsArray[i].slice(0, 2) + tabStringSectionsArray[i].slice(3);
            }
        
        }
        // Between first and second char
        if (/^[a-zA-Z]+$/.test(tabStringSectionsArray[i].slice(0, 1)) == true &&
            /^[a-zA-Z]+$/.test(tabStringSectionsArray[i].slice(2, 3)) == true &&
            tabStringSectionsArray[i].slice(1, 2) == "|") {
            tabStringSectionsArray[i] = tabStringSectionsArray[i].slice(0, 1) + tabStringSectionsArray[i].slice(2);
        }
        // Make sure if not second char, there is a space for it
        if (/^[a-zA-Z]+$/.test(tabStringSectionsArray[i].slice(1, 2)) == false) {
            if (tabStringSectionsArray[i].slice(1, 2) != "|") {
                tabStringSectionsArray[i] = tabStringSectionsArray[i].slice(0, 1) + " " + tabStringSectionsArray[i].slice(2);   
            } else {
                tabStringSectionsArray[i] = tabStringSectionsArray[i].slice(0, 1) + " " + tabStringSectionsArray[i].slice(1);   
            }
        }
    }
    tabStringSection.value = tabStringSectionsArray.join("\n");
}

function fillFirstTabStringSectionMissingRightPipeAndAfterRightPipe(tabStringSection) {
    const tabStringSectionsArray = tabStringSection.value.split("\n")
    for (let i = 1; i < tabStringSectionsArray.length - 1; i++) {
        if (tabStringSectionsArray[i].slice(tabStringSectionsArray[i].length - 1, tabStringSectionsArray[i].length) != "|") {
            if (tabStringSectionsArray[i].slice(tabStringSectionsArray[i].length - 2, tabStringSectionsArray[i].length - 1) == "|") {
                tabStringSectionsArray[i] = tabStringSectionsArray[i].slice(0, tabStringSectionsArray[i].length - 1);
            } else {
                tabStringSectionsArray[i] = tabStringSectionsArray[i].slice(0, tabStringSectionsArray[i].length) + "|";
            }
        } else {
            if (tabStringSectionsArray[i].slice(tabStringSectionsArray[i].length - 2, tabStringSectionsArray[i].length - 1) == "|") {
                tabStringSectionsArray[i] = tabStringSectionsArray[i].slice(0, tabStringSectionsArray[i].length - 2);
            }
        }
    }
    tabStringSection.value = tabStringSectionsArray.join("\n");
}

function fillFirstTabStringSectionMissingHyphen(tabStringSection) {
    const tabStringSectionsArray = tabStringSection.value.split("\n");
    for (let i = 1; i < tabStringSectionsArray.length - 1; i++) {
        for (let j = 3; j < tabStringSectionsArray[i].length - 1; j++) {
            if (tabStringSectionsArray[i].slice(j, j + 1) == "-" || 
                tabStringSectionsArray[i].slice(j, j + 1) == "1" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "2" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "3" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "4" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "5" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "6" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "7" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "8" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "9" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "0" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "\\"||
                tabStringSectionsArray[i].slice(j, j + 1) == "(" ||
                tabStringSectionsArray[i].slice(j, j + 1) == ")" ||
                /^[a-zA-Z]+$/.test(tabStringSectionsArray[i].slice(j, j + 1)) == true ||
                tabStringSectionsArray[i].slice(j, j + 1) == "/" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "=" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "~" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "*" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "^" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "˅" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "[" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "]") {
            } else {
                tabStringSectionsArray[i] = tabStringSectionsArray[i].slice(0, j) + "" + tabStringSectionsArray[i].slice(j + 1);
            }
        }
    }
    tabStringSection.value = tabStringSectionsArray.join("\n");
}

function ensureFirstTabStringSectionTopAndBottomAreNotTooLong(tabStringSection) {
    const tabStringSectionsArray = tabStringSection.value.split("\n");
    if (tabStringSectionsArray[0].length > 33) {
        tabStringSectionsArray[0] = tabStringSectionsArray[0].slice(0, 34);
    }
    if (tabStringSectionsArray[7].length > 33) {
        tabStringSectionsArray[7] = tabStringSectionsArray[0].slice(0, 34);
    }
    tabStringSection.value = tabStringSectionsArray.join("\n");
}

function firstTabStringSectionDeleteAdjacentHyphen(tabStringSection) {
    const tabStringSectionsArray = tabStringSection.value.split("\n");
    for (let i = 1; i < tabStringSectionsArray.length - 1; i++) {
        for (let j = 3; j < tabStringSectionsArray[i].length - 1; j++) {
            if (tabStringSectionsArray[i].slice(j, j + 1) == "1" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "2" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "3" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "4" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "5" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "6" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "7" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "8" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "9" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "0" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "\\"||
                tabStringSectionsArray[i].slice(j, j + 1) == "(" ||
                tabStringSectionsArray[i].slice(j, j + 1) == ")" ||
                /^[a-zA-Z]+$/.test(tabStringSectionsArray[i].slice(j, j + 1)) == true ||
                tabStringSectionsArray[i].slice(j, j + 1) == "/" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "=" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "~" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "*" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "^" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "˅" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "[" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "]") {
                if (tabStringSectionsArray[i].length > 33) {
                    let deleteAmount = tabStringSectionsArray[i].length - 34;
                    for (let x = tabStringSectionsArray[i].length - 1; x >= 0 && deleteAmount > 0; x--) {
                        if (tabStringSectionsArray[i].slice(x, x + 1) == "-") {
                            tabStringSectionsArray[i] = tabStringSectionsArray[i].slice(0, x) + tabStringSectionsArray[i].slice(x + 1);
                            deleteAmount--;
                        }
                    }
                }
            }
        }
    }
    tabStringSection.value = tabStringSectionsArray.join("\n");
}

function fillFirstTabStringSectionShortHyphen(tabStringSection) {
    const tabStringSectionsArray = tabStringSection.value.split("\n");
    for (let i = 1; i < tabStringSectionsArray.length - 1; i++) {
        let pipeIndex;
        for (let j = 3; j < tabStringSectionsArray[i].length; j++) {
            if (tabStringSectionsArray[i].slice(j, j + 1) == "|") {
                pipeIndex = j;
            }
        }
        if (tabStringSectionsArray[i].slice(3, pipeIndex).length < 30) {
            
            let amountOfMissingHyphens = (30 - tabStringSectionsArray[i].slice(3, pipeIndex).length)
            let hyphens = "";
            for (let x = 0; x < amountOfMissingHyphens; x++) {
                hyphens += "-";
            }
            tabStringSectionsArray[i] = tabStringSectionsArray[i].slice(0, pipeIndex + 1 - amountOfMissingHyphens) + hyphens + tabStringSectionsArray[i].slice(pipeIndex);
        }
    }
    tabStringSection.value = tabStringSectionsArray.join("\n");
}

function checkIfFirstTabStringSectionIsShort(tabStringSection) {
    const tabStringSectionsArray = tabStringSection.value.split("\n")
    for (let i = 1; i < tabStringSectionsArray.length - 1; i++) {
        if (tabStringSectionsArray[i].length < 33) {
            if ( i == 1) {
                tabStringSectionsArray[i] = "E |------------------------------|";
            };
            if ( i == 2) {
                tabStringSectionsArray[i] = "B |------------------------------|";
            };
            if ( i == 3) {
                tabStringSectionsArray[i] = "G |------------------------------|";
            };
            if ( i == 4) {
                tabStringSectionsArray[i] = "D |------------------------------|";
            };
            if ( i == 5) {
                tabStringSectionsArray[i] = "A |------------------------------|";
            };
            if ( i == 6) {
                tabStringSectionsArray[i] = "E |------------------------------|";
            };
        }
    }
    tabStringSection.value = tabStringSectionsArray.join("\n");
}

function checkIfFirstTabStringSectionLeftPipeIsDeleted(tabStringSection) {
    const tabStringSectionsArray = tabStringSection.value.split("\n")
    for (let i = 1; i < tabStringSectionsArray.length - 1; i++) {
        if (tabStringSectionsArray[i].slice(2, 3) != "|") {
            tabStringSectionsArray[i] = tabStringSectionsArray[i].slice(0, 2) + "|" + tabStringSectionsArray[i].slice(2)
        }
    }
    tabStringSection.value = tabStringSectionsArray.join("\n");
}

function checkIfFirstTabStringSectionHasAnyMissingLines(tabStringSection) {
    const tabStringSectionsArray = tabStringSection.value.split("\n")
    let tabCount = 0;
    for (let i = 1; i < tabStringSectionsArray.length - 1; i++) {
        if (tabStringSectionsArray[i].length == 34) {
            tabCount += 1;
        }
    }
    if (tabStringSectionsArray.length < 8) {
        tabStringSection.value = "\n" +
        "E |------------------------------|\n" +
        "B |------------------------------|\n" +
        "G |------------------------------|\n" +
        "D |------------------------------|\n" +
        "A |------------------------------|\n" +
        "E |------------------------------|\n";
    } else {
        tabStringSection.value = tabStringSectionsArray.join("\n");
    }
}

// Reg Tab Section////////////////////////////////////////////////////////////////////


function fillTabStringSectionMissingRightPipeAndAfterRightPipe(tabStringSection) {
    const tabStringSectionsArray = tabStringSection.value.split("\n")
    for (let i = 1; i < tabStringSectionsArray.length - 1; i++) {
        if (tabStringSectionsArray[i].slice(tabStringSectionsArray[i].length - 1, tabStringSectionsArray[i].length) != "|") {
            if (tabStringSectionsArray[i].slice(tabStringSectionsArray[i].length - 2, tabStringSectionsArray[i].length - 1) == "|") {
                tabStringSectionsArray[i] = tabStringSectionsArray[i].slice(0, tabStringSectionsArray[i].length - 1);
            } else {
                tabStringSectionsArray[i] = tabStringSectionsArray[i].slice(0, tabStringSectionsArray[i].length) + "|";
            }
        } else {
            if (tabStringSectionsArray[i].slice(tabStringSectionsArray[i].length - 2, tabStringSectionsArray[i].length - 1) == "|") {
                tabStringSectionsArray[i] = tabStringSectionsArray[i].slice(0, tabStringSectionsArray[i].length - 2);
            }
        }
    }
    tabStringSection.value = tabStringSectionsArray.join("\n");
}

function fillTabStringSectionMissingHyphen(tabStringSection) {///////////////////////////////////////////////////////////////////////////////
    const tabStringSectionsArray = tabStringSection.value.split("\n");
    for (let i = 1; i < tabStringSectionsArray.length - 1; i++) {
        for (let j = 0; j < tabStringSectionsArray[i].length - 1; j++) {
            if (tabStringSectionsArray[i].slice(j, j + 1) == "-" || 
                tabStringSectionsArray[i].slice(j, j + 1) == "1" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "2" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "3" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "4" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "5" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "6" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "7" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "8" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "9" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "0" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "\\"||
                tabStringSectionsArray[i].slice(j, j + 1) == "(" ||
                tabStringSectionsArray[i].slice(j, j + 1) == ")" ||
                /^[a-zA-Z]+$/.test(tabStringSectionsArray[i].slice(j, j + 1)) == true ||
                tabStringSectionsArray[i].slice(j, j + 1) == "/" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "=" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "~" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "*" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "^" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "˅" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "[" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "]" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "-") {
            } else {
                tabStringSectionsArray[i] = tabStringSectionsArray[i].slice(0, j) + "" + tabStringSectionsArray[i].slice(j + 1);
            }
        }
    }
    tabStringSection.value = tabStringSectionsArray.join("\n");
}

function ensureTabStringSectionTopAndBottomAreNotTooLong(tabStringSection) {
    const tabStringSectionsArray = tabStringSection.value.split("\n");
    if (tabStringSectionsArray[0].length > 33) {
        tabStringSectionsArray[0] = tabStringSectionsArray[0].slice(0, 34);
    }
    if (tabStringSectionsArray[7].length > 33) {
        tabStringSectionsArray[7] = tabStringSectionsArray[0].slice(0, 34);
    }
    tabStringSection.value = tabStringSectionsArray.join("\n");
}

function tabStringSectionDeleteAdjacentHyphen(tabStringSection) {
    const tabStringSectionsArray = tabStringSection.value.split("\n");
    for (let i = 1; i < tabStringSectionsArray.length - 1; i++) {
        for (let j = 0; j < tabStringSectionsArray[i].length - 1; j++) {
            if (tabStringSectionsArray[i].slice(j, j + 1) == "1" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "2" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "3" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "4" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "5" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "6" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "7" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "8" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "9" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "0" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "\\"||
                tabStringSectionsArray[i].slice(j, j + 1) == "(" ||
                tabStringSectionsArray[i].slice(j, j + 1) == ")" ||
                /^[a-zA-Z]+$/.test(tabStringSectionsArray[i].slice(j, j + 1)) == true ||
                tabStringSectionsArray[i].slice(j, j + 1) == "/" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "=" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "~" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "*" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "^" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "˅" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "[" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "]" ||
                tabStringSectionsArray[i].slice(j, j + 1) == "-") {
                if (tabStringSectionsArray[i].length > 30) {
                    let deleteAmount = tabStringSectionsArray[i].length - 31;
                    for (let x = tabStringSectionsArray[i].length - 1; x >= 0 && deleteAmount > 0; x--) {
                        if (tabStringSectionsArray[i].slice(x, x + 1) == "-") {
                            tabStringSectionsArray[i] = tabStringSectionsArray[i].slice(0, x) + tabStringSectionsArray[i].slice(x + 1);
                            deleteAmount--;
                        }
                    }
                }
            }
        }
    }
    tabStringSection.value = tabStringSectionsArray.join("\n");
}

function fillTabStringSectionShortHyphen(tabStringSection) {
    const tabStringSectionsArray = tabStringSection.value.split("\n");
    for (let i = 1; i < tabStringSectionsArray.length - 1; i++) {
        let pipeIndex;
        for (let j = 3; j < tabStringSectionsArray[i].length; j++) {
            if (tabStringSectionsArray[i].slice(j, j + 1) == "|") {
                pipeIndex = j;
            }
        }
        if (tabStringSectionsArray[i].slice(0, pipeIndex).length < 30) {
            
            let amountOfMissingHyphens = (30 - tabStringSectionsArray[i].slice(3, pipeIndex).length)
            let hyphens = "";
            for (let x = 0; x < amountOfMissingHyphens; x++) {
                hyphens += "-";
            }
            tabStringSectionsArray[i] = tabStringSectionsArray[i].slice(0, pipeIndex + 1 - amountOfMissingHyphens) + hyphens + tabStringSectionsArray[i].slice(pipeIndex);
        }
    }
    tabStringSection.value = tabStringSectionsArray.join("\n");
}

function checkIfTabStringSectionIsShort(tabStringSection) {
    const tabStringSectionsArray = tabStringSection.value.split("\n")
    for (let i = 1; i < tabStringSectionsArray.length - 1; i++) {
        if (tabStringSectionsArray[i].length < 30) {
            if ( i == 1) {
                tabStringSectionsArray[i] = "------------------------------|";
            };
            if ( i == 2) {
                tabStringSectionsArray[i] = "------------------------------|";
            };
            if ( i == 3) {
                tabStringSectionsArray[i] = "------------------------------|";
            };
            if ( i == 4) {
                tabStringSectionsArray[i] = "------------------------------|";
            };
            if ( i == 5) {
                tabStringSectionsArray[i] = "------------------------------|";
            };
            if ( i == 6) {
                tabStringSectionsArray[i] = "------------------------------|";
            };
        }
    }
    tabStringSection.value = tabStringSectionsArray.join("\n");
}

function checkIfTabStringSectionLeftPipeIsDeleted(tabStringSection) {
    const tabStringSectionsArray = tabStringSection.value.split("\n")
    for (let i = 1; i < tabStringSectionsArray.length - 1; i++) {
        if (tabStringSectionsArray[i].slice(2, 3) != "|") {
            tabStringSectionsArray[i] = tabStringSectionsArray[i].slice(0, 2) + "|" + tabStringSectionsArray[i].slice(2)
        }
    }
    tabStringSection.value = tabStringSectionsArray.join("\n");
}

function checkIfTabStringSectionHasAnyMissingLines(tabStringSection) {
    const tabStringSectionsArray = tabStringSection.value.split("\n")
    let tabCount = 0;
    for (let i = 1; i < tabStringSectionsArray.length - 1; i++) {
        if (tabStringSectionsArray[i].length == 34) {
            tabCount += 1;
        }
    }
    if (tabStringSectionsArray.length < 8) {
        tabStringSection.value = "\n" +
        "------------------------------|\n" +
        "------------------------------|\n" +
        "------------------------------|\n" +
        "------------------------------|\n" +
        "------------------------------|\n" +
        "------------------------------|\n";
    } else {
        tabStringSection.value = tabStringSectionsArray.join("\n");
    }
}

// Save Button

tabSaveButton.addEventListener("click", async (e) => {
    e.preventDefault();
    if (alertIfTabInputsEmpty(tabNameInput.value, tabCategoryInput.value)) {

    } else {
        window.location.href = "/profile/activity/draftedtabs/" + getToken();
        await createNewTab(tabNameInput.value, tabCategoryInput.value, getTabStringArray(tabDisplay), false);
    }
})

function alertIfTabInputsEmpty(tabNameInputValue, tabCategoryInputValue) {
    if (tabNameInputValue == "") {
        alert("Enter a name for your tab");
        return true;
    }
    if (tabCategoryInputValue == "") {
        alert("Enter a category for your tab");
        return true;
    }
    return false;
}

function getTabStringArray(tabDisplay) {
    const tabStringArray = [];
    for (let i = 0; i < tabDisplay.children.length; i++) {
        for (let j = 0; j < tabDisplay.children[i].children.length; j++) {
            tabStringArray.push(tabDisplay.children[i].children[j].value);
        }
    }
    return tabStringArray;
}

async function createNewTab(tabNameInputValue, tabCategoryInputValue, tabStringArray, post) {
    const response = await fetch("/createtab/" +  getToken(), {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            tabName: tabNameInputValue,
            tabCategory: tabCategoryInputValue,
            tabArray: JSON.stringify(tabStringArray),
            post
        })
    })
    return response;
}

// Post Button

tabPostButton.addEventListener("click", async (e) => {
    e.preventDefault();
    if (alertIfTabInputsEmpty(tabNameInput.value, tabCategoryInput.value)) {

    } else {
        window.location.href = "/profile/activity/postedtabs/" + getToken();
        await createNewTab(tabNameInput.value, tabCategoryInput.value, getTabStringArray(tabDisplay), true);
    }
})
