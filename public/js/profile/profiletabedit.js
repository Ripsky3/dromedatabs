const mainDisplay = document.querySelector(".main-display");
const tabDeleteButton = document.querySelector(".tab-delete-button");
const tabPostButton = document.querySelector(".tab-post-button");
const tabEditNameButton = document.querySelector(".tab-post-editname");
const tabEditCategoryButton = document.querySelector(".tab-post-editcategory");

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}

function getTab_id() {
    return window.location.href.split("/")[window.location.href.split("/").length - 2];
}

const itemDisplay = document.querySelector(".items-display");

async function getUserTabByID(tab_id) {
    const response = await fetch("/getusertabbyid/" + tab_id + "/" + getToken(), {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response
}

function createUserTab(userTab) {
    let userTabDiv = document.createElement("div");
    userTabDiv.classList.add("usertab-div");

    let userTabName = document.createElement("p");
    userTabName.innerHTML = userTab.name;
    let userTabCategory = document.createElement("p");
    userTabCategory.innerHTML = userTab.category;
    let userTabUpdateButton = document.createElement("button");
    userTabUpdateButton.innerHTML = "Update";
    userTabUpdateButton.addEventListener("click", (e) => {
        e.preventDefault();
        let noErrors = true;
        if (tabEditNameButton.classList.contains("hidden")) {
            if (tabNameInput.value.length < 1) {
                noErrors = false;
                alert("Enter a name");
            } else {
                updateUserTabName(tabNameInput.value);
            }
        } 
        if (tabEditCategoryButton.classList.contains("hidden")) {
            if (tabCategoryInput.value.length < 2) {
                noErrors = false;
                alert("Select a category");
            } else {
                updateUserTabCategory(tabCategoryInput.value);
            }
            
        } 

        if (noErrors) {
            updateUserTabArray(getTabStringArray(mainDisplay.children[mainDisplay.children.length - 1]));       
            window.location.href = "/profile/activity/draftedtabs/"  + getToken();
        }
    });
    userTabUpdateButton.classList.add(("user-tab-update-button"));

    userTabDiv.appendChild(userTabName);
    userTabDiv.appendChild(userTabCategory);
    userTabDiv.appendChild(userTabUpdateButton);


    displayUserTabs(userTabDiv);
    displayUserTabSections(userTab);
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

function displayUserTabs(userTabsDiv) {
    mainDisplay.appendChild(userTabsDiv);
}

function deleteUserTab(userTab) {
    for (let i = 0; i < mainDisplay.children.length; i++) {
        if (mainDisplay.children[i] == userTab) {
            mainDisplay.removeChild(userTab);
        }
    }
}

async function updateUserTabName(newUserTabName) {
    const response = await fetch("/updateUserTabName/" + getTab_id() + "/" + getToken(), {
        method: 'PATCH',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            tabName: newUserTabName
        })
    }).then(res => res.json());
    return response
}

async function updateUserTabCategory(newUserTabCategory) {
    const response = await fetch("/updateUserTabCategory/" + getTab_id() + "/" + getToken(), {
        method: 'PATCH',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            tabCategory: newUserTabCategory
        })
    }).then(res => res.json());
    return response
}

async function updateUserTabArray(updatedUserTabStringArray) {
    
    const response = await fetch("/updateUserTabArray/" + getTab_id() + "/" + getToken(), {
        method: 'PATCH',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            tabArray: JSON.stringify(updatedUserTabStringArray)
        })
    }).then(res => res.json());
    return response
}

function displayUserTabSections(userTab) {
    let userTabContainer = document.createElement("div");
    for (let i = 0; i < userTab.tabarray.length; i++) {
        
        userTabContainer.appendChild(createTabStringSection(userTab.tabarray[i]));
    }
    mainDisplay.appendChild(userTabContainer);
}

function createTabStringSection(tabArray) {

    const tabDisplayRow = document.createElement("div");
    tabDisplayRow.classList.add("tab-display-row");

    for (let i = 0; i < tabArray.tabrow.length; i++) {
        if (i == 0) {
            const firstTabStringSection = document.createElement("textarea");
            firstTabStringSection.classList.add("tab-string-section");
            firstTabStringSection.innerHTML = tabArray.tabrow[i];
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
            tabDisplayRow.appendChild(firstTabStringSection);
        } else {
            const tabStringSection = document.createElement("textarea");
            tabStringSection.setAttribute( "autocomplete", "off" ); 
            tabStringSection.classList.add("tab-string-section");
            tabStringSection.innerHTML = tabArray.tabrow[i];
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
            });
            tabDisplayRow.appendChild(tabStringSection);
        }
    }
    return tabDisplayRow;
}

getUserTabByID(getTab_id()).then(userTab => {
    createUserTab(userTab);
}).catch(e => {
    console.log(e)
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

// Delete Button

tabDeleteButton.addEventListener("click", () => {
    deleteUserTabBy_id(getTab_id()).then(e => {
        if (e.error) {
            alert("Account could not be deleted. Try refreshing your page");
        }
        window.location.href = "/profile/activity/draftedtabs/" + getToken();
    })
}) 


async function deleteUserTabBy_id(tab_id) {
    const response = await fetch("/deleteUserTabBy_id/" + tab_id + "/" + getToken(), {
        method: 'DELETE',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response
}

// Post Button

tabPostButton.addEventListener("click", () => {
    postUserTabBy_id(getTab_id()).then(e => {
        if (e.error) {
            alert("Account could not be posted. Try refreshing your page");
        }
        window.location.href = "/profile/activity/draftedtabs/" + getToken();
    })
}) 


async function postUserTabBy_id(tab_id) {
    const response = await fetch("/postUserTabBy_id/" + tab_id + "/" + getToken(), {
        method: 'PATCH',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response
}

// Edit Name
const tabNameInput = document.querySelector(".tab-name-input");
const tabWrapperEditNameOptions = document.querySelector(".tap-wrapper-editname-options");
const tabPostEditNameCancelButton = document.querySelector(".tap-post-editname-cancel-button");

tabEditNameButton.addEventListener("click", () => {
    tabEditNameButton.classList.add("hidden");
    tabWrapperEditNameOptions.classList.remove("hidden");
})

tabPostEditNameCancelButton.addEventListener("click", () => {
    tabEditNameButton.classList.remove("hidden");
    tabWrapperEditNameOptions.classList.add("hidden");
})

// Edit Category
const tabCategoryInput = document.querySelector(".tab-category-select");
const tabWrapperEditCategoryOptions = document.querySelector(".tap-wrapper-editcategory-options");
const tabPostEditCategoryCancelButton = document.querySelector(".tap-post-editcategory-cancel-button");

tabEditCategoryButton.addEventListener("click", () => {
    tabEditCategoryButton.classList.add("hidden");
    tabWrapperEditCategoryOptions.classList.remove("hidden");
})

tabPostEditCategoryCancelButton.addEventListener("click", () => {
    tabEditCategoryButton.classList.remove("hidden");
    tabWrapperEditCategoryOptions.classList.add("hidden");
})