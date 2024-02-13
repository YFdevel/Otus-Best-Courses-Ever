const logOutBtn = document.querySelector(".log-out-btn");
if (document.cookie.indexOf("accessToken") !==-1) {
    logOutBtn.style.visibility = "visible";
} else {
    logOutBtn.style.visibility = "hidden";
}
