const searchInput = document.querySelector(".header-search-box-input");
const searchButton = document.querySelector(".header-search-box-search-button");

searchInput.addEventListener("keyup", () => {
    // Create itemsearch page that does not need token
    if (getToken()) {
        searchButton.href = "/itemsearch/" + searchInput.value + "/" + getToken();
    } else {
        searchButton.href = "/itemsearchguest/" + searchInput.value 
    }
})

searchButton.addEventListener("click", () => {
    if (!searchInput.value.length > 0) {
        return alert("You must search something");
    }
})


function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}
