function getErrorFromURL() {
    for (let i = window.location.href.length - 1; i >= 0; i--) {
        if (window.location.href.slice(i, i + 1) == "/") {
            return window.location.href.slice(i + 1).split("%20").join("");
        }
    }
}

alert(getErrorFromURL());

window.location.href = "/"