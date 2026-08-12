"use strict";

// -----------------------------------------------------------------
// Выход из аккаунта

auth.onAuthStateChanged((user) => {
    if (user) {
        console.log("user is signed in at users.html");
    } else {
        alert(
            "Срок действия вашего сеанса входа истек или вы вышли из системы, войдите еще раз, чтобы продолжить."
        );
        location = "index.html";
    }
});

const logoutUser = document.querySelector("#logout");
logoutUser.addEventListener("click", (e) => {
    e.preventDefault();
    logout();
    console.log("User logouted.");
});

function logout() {
    auth.signOut();
    localStorage.removeItem("accontObj");
}
//----------------------------------------------------------

