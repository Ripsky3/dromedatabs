let token;

let slashCount = 0;
for (let i = 0; i < window.location.href.length; i++) {
    if (window.location.href[i] == "/") {
        slashCount += 1;
    }
    if (slashCount == 4) {
        token = window.location.href.slice(i + 1);
        break;
    }
}

let homeHeaderSignOutButton = document.querySelector(".home-header-sign-out-button");
homeHeaderSignOutButton.href = "/signoutuser/" + token;