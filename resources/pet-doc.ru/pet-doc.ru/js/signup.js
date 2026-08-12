"use strict";

//----------------------------------------------------------------------------------------------
// Firebase регистрация

const signupForm = document.querySelector("#form-reg");

signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let date = new Date();
    let time = date.getTime();
    let counter = time;
    let id = (counter += 1);

    const login = signupForm["formreglogin"].value;
    const email = signupForm["formregemail"].value;
    const password = signupForm["formregpassword"].value;
    const lastname = null;
    const name = null;
    const surname = null;
    const phone = null;
    const adress = null;
    const photoURL = null;

    auth.createUserWithEmailAndPassword(email, password)
        .then((cred) => {
            return db
                .collection("users")
                .doc(cred.user.uid)
                .set({
                    id,
                    login,
                    email,
                    password,
                    name,
                    surname,
                    lastname,
                    phone,
                    adress,
                    photoURL,
                })
                .then(() => {
                    console.log("success");
                    signupForm.reset();
                    location = "personal.html";
                })
                .catch((err) => {
                    console.log(err.message);
                });
        })
        .catch((err) => {
            console.log(err.message);
        });
});

//----------------------------------------------------------------------------------
