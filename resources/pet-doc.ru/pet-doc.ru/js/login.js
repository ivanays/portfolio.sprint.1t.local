"use strict"

//-----------------------------------------------------------------
// Вход в ЛК пользователя

    const loginForm = document.querySelector("#form-inter");

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const loginEmail = loginForm["forminteremail"].value;
        const loginPassword = loginForm["forminterpassword"].value;

        auth.signInWithEmailAndPassword(loginEmail, loginPassword)
            .then(() => (location = "personal.html"))
            .catch((err) => console.log(err));
    });


//------------------------------------------------------------------------