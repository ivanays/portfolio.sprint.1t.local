"use strict";

// -----------------------------------------------------------------
// Выход из аккаунта

auth.onAuthStateChanged((user) => {
    if (user) {
        console.log("user is signed in at users.html");
    } else {
        // alert(
        //     "Срок действия вашего сеанса входа истек или вы вышли из системы, войдите еще раз, чтобы продолжить."
        // );
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
    localStorage.removeItem("userAccount");
}
//----------------------------------------------------------

//---------------------------------------------------------
// Отображение аккаунта в ЛК пользователя
const userLogin = document.querySelector("#user-login");
const userId = document.querySelector("#user-id");
let userAccount = {};

function saveAccount(doc) {
    userAccount = {
        id: doc.data().id,
        login: doc.data().login,
        name: doc.data().name,
        surname: doc.data().surname,
        lastname: doc.data().lastname,
        lastname: doc.data().lastname,
        phone: doc.data().phone,
        adress: doc.data().adress,
        photoURL: doc.data().photoURL,
    };
    localStorage.setItem("userAccount", JSON.stringify(userAccount));
}

function renderAccount() {
    if (checkString(String(userLogin)) && checkString(String(userId))) {
        userLogin.innerHTML = userAccount.login;
        userId.innerHTML = `ID ${userAccount.id}`;
    }
}

function checkString(str) {
        if (str === "" || str === null) {
            return false;
        }
        return str;
    }

auth.onAuthStateChanged((user) => {
    if (user) {
        db.collection("users")
            .doc(user.uid)
            .onSnapshot((doc) => {
                saveAccount(doc);
                renderAccount();
            });
        
    } else {
        // alert(
        //     "Срок действия вашего сеанса входа истек или вы вышли из системы, войдите еще раз, чтобы продолжить."
        // );
        location = "index.html";
    }
});

//---------------------------------------------------------
