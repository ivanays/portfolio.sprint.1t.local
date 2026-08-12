"use strict";

//---------------------------------------------------------------------------------------
// Валидация форм входа, регистрации (form-inter, form-reg).

if (true) {
    const errorInter = document.querySelector("#error-inter");
    const hintErrorInter = document.querySelector("#hint-error-inter");
    const hintErrorReg = document.querySelector("#hint-error-reg");
    const interForm = document.querySelector("#form-inter");
    const interFormEmail = interForm.forminteremail;
    const interFormPassword = interForm.forminterpassword;
    const interFormChekbox = interForm.forminterchremme;
    const interFormSubmit = interForm.formintersubmit;
    let entranceError = document.querySelectorAll(".form-entrance__error");

    interFormSubmit.disabled = true;

    interForm.addEventListener("submit", handleFormSubmit);
    //interForm.addEventListener("input", checkValidity);
    interFormEmail.addEventListener("input", (event) => {
        event.preventDefault();
        checkDisabledInter();
    });
    interFormPassword.addEventListener("input", (event) => {
        event.preventDefault();
        checkDisabledInter();
    });

    const errorReg = document.querySelector("#error-reg");
    const errorRegLogin = document.querySelector("#error-reg-login");
    const errorRegEmail = document.querySelector("#error-reg-email");
    const errorRegPassword = document.querySelector("#error-reg-password");
    const errorRegPasswordAgain = document.querySelector(
        "#error-reg-password-again"
    );
    const errorRegCheckbox = document.querySelector("#error-reg-checkbox");
    const hintPassword = document.querySelector("#hint-password");
    const regForm = document.querySelector("#form-reg");
    const regFormLogin = regForm.formreglogin;
    const regFormEmail = regForm.formregemail;
    const regFormPassword = regForm.formregpassword;
    const regFormPasswordAgain = regForm.formregpasswordagain;
    const regFormChekbox = regForm.formregchagree;
    const regFormSpanFake = document.querySelector("#checkboxspanfake");
    const regFormSubmit = regForm.formregsubmit;

    regFormSubmit.disabled = true;

    regForm.addEventListener("submit", handleFormSubmit);

    //regForm.addEventListener("input", checkValidity);
    regFormLogin.addEventListener("input", (event) => {
        event.preventDefault();
        console.log(regFormLogin.value);
        checkDisabledReg();
    });
    regFormLogin.addEventListener("blur", (event) => {
        event.preventDefault();
        if (regFormLogin.value == "") {
            errorRegLogin.textContent = "Введите логин";
            regFormLogin.classList.add("border-red");
        } else if (regFormLogin.value !== "") {
            errorRegLogin.textContent = "";
            regFormLogin.classList.remove("border-red");
        }
    });
    regFormEmail.addEventListener("input", (event) => {
        event.preventDefault();
        checkDisabledReg();
    });
    regFormEmail.addEventListener("blur", (event) => {
        event.preventDefault();
        if (regFormEmail.value == "") {
            errorRegEmail.textContent = "Введите почту";
            regFormEmail.classList.add("border-red");
        } else if (emailValidate(regFormEmail.value) == false) {
            errorRegEmail.textContent = "Некорректная почта";
            regFormEmail.classList.add("border-red");
        } else if (emailValidate(regFormEmail.value) == true) {
            errorRegEmail.textContent = "";
            regFormEmail.classList.remove("border-red");
        } else if (regFormEmail.value !== "") {
            errorRegEmail.textContent = "";
            regFormEmail.classList.remove("border-red");
        }
    });
    regFormPassword.addEventListener("input", (event) => {
        event.preventDefault();
        checkDisabledReg();
    });
    regFormPassword.addEventListener("blur", (event) => {
        event.preventDefault();
        if (regFormPassword.value == "") {
            errorRegPassword.textContent = "Введите пароль";
            regFormPassword.classList.add("border-red");
        } else if (passwordValidate(regFormPassword.value) == false) {
            errorRegPassword.textContent = "Некорректнай пороль";
            regFormPassword.classList.add("border-red");
        } else if (passwordValidate(regFormPassword.value) == true) {
            errorRegPassword.textContent = "";
            regFormPassword.classList.remove("border-red");
        } else if (regFormPassword.value !== "") {
            errorRegPassword.textContent = "";
            regFormPassword.classList.remove("border-red");
        }
    });
    regFormPassword.addEventListener("mouseover", (event) => {
        event.preventDefault();
        addHintPassword();
    });
    regFormPassword.addEventListener("mouseout", (event) => {
        event.preventDefault();
        removeHintPassword();
    });
    regFormPasswordAgain.addEventListener("input", (event) => {
        event.preventDefault();
        checkDisabledReg();
    });
    regFormPasswordAgain.addEventListener("blur", (event) => {
        event.preventDefault();
        if (regFormPasswordAgain.value == "") {
            errorRegPasswordAgain.textContent = "Введите пароль";
            regFormPasswordAgain.classList.add("border-red");
        } else if (regFormPasswordAgain.value !== regFormPassword.value) {
            errorRegPasswordAgain.textContent = "Пороль не совпадает";
            regFormPasswordAgain.classList.add("border-red");
        } else if (regFormPasswordAgain.value == regFormPassword.value) {
            errorRegPasswordAgain.textContent = "";
            regFormPasswordAgain.classList.remove("border-red");
        } else if (regFormPasswordAgain.value !== "") {
            errorRegPasswordAgain.textContent = "";
            regFormPasswordAgain.classList.remove("border-red");
        }
    });
    regFormChekbox.addEventListener("input", (event) => {
        event.preventDefault();
        checkDisabledReg();
    });

    function addHintPassword() {
        if (hintPassword) {
            if (hintPassword.classList.contains("none")) {
                hintPassword.classList.remove("none");
            }
        }
    }
    function removeHintPassword() {
        if (hintPassword) {
            if (!hintPassword.classList.contains("none")) {
                hintPassword.classList.add("none");
            }
        }
    }
    function serializeForm(formNode) {
        const { elements } = formNode;

        const data = Array.from(elements)
            .filter((item) => !!item.name)
            .map((element) => {
                const { name, value } = element;
                return { name, value };
            });
        console.log(data);
        checkboxValue(data);
        return data;
    }
    function checkValidity(event) {
        const formNode = event.target.form;
        const isValid = formNode.checkValidity();
        console.log(isValid);

        formNode.querySelector("button").disabled = !isValid;
    }
    function checkboxValue(data) {
        for (let i = 0; i < data.length; i++) {
            let el = data[i];
            if (
                (el.name == "forminterchremme" ||
                    el.name == "formregchagree") &&
                document.getElementById(el.name)
            ) {
                if (document.getElementById(el.name).checked) {
                    el.value = "true";
                    return true;
                } else if (!document.getElementById(el.name).checked) {
                    el.value = "false";
                    return false;
                }
            }
        }
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        const formId = event.target
            .closest(".form-entrance")
            .getAttribute("id");
        if (formId == "form-inter") {
            const interFormData = serializeForm(interForm);
            console.log(interFormData);
            interForm.reset();
            interFormSubmit.disabled = true;
        } else if (formId == "form-reg") {
            const regFormData = serializeForm(regForm);
            console.log(regFormData);
            regForm.reset();
            regFormSubmit.disabled = true;
        }
    }
    function emailValidate(email) {
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (checkString(email)) {
            if (reg.test(email) == false) {
                getMessage("Введите корректную эл. почту");
                return false;
            } else {
                getMessage("Корректная эл. почта");
                return true;
            }
        }
        return false;
    }
    function passwordValidate(password) {
        let reg =
            /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g;
        if (checkString(password)) {
            if (reg.test(password) == false) {
                getMessage("Введите корректный пароль");
                return false;
            } else {
                getMessage("Корректный пароль");
                return true;
            }
        }
        return false;
    }
    function passwordsValidate(password1, password2) {
        if (password1 && password2) {
            if (password1 !== password2) {
                getMessage(`Пароли не совпадают ${password1} - ${password2}`);
                return false;
            } else {
                getMessage(`Пароли совпадают ${password1} - ${password2}`);
                return true;
            }
        } else {
            return false;
        }
    }
    function getMessage(message) {
        console.log(message);
    }
    function redError(message) {
        if (errorInter.textContent !== "") {
            errorInter.textContent = "";
            errorInter.textContent = message;
        }
        if (errorReg.textContent !== "") {
            errorReg.textContent = "";
            errorReg.textContent = message;
        }
    }
    function checkString(str) {
        if (str === "" || str === null) {
            // redError("Поле ввода пусто");
            //console.log("Поле ввода пусто");
            return false;
        }
        return str;
    }
    function checkDisabledInter() {
        if (emailValidate(interFormEmail.value) && interFormPassword.value) {
            // console.log(emailValidate(interFormEmail.value));
            // console.log(passwordValidate(interFormPassword.value));
            interFormSubmit.disabled = false;
            interFormSubmit.classList.add("form-entrance__button-active");
        } else {
            // console.log(emailValidate(interFormEmail.value));
            // console.log(passwordValidate(interFormPassword.value));
            interFormSubmit.disabled = true;
        }
    }
    function checkDisabledReg() {
        if (
            checkString(regFormLogin.value) &&
            emailValidate(regFormEmail.value) &&
            passwordValidate(regFormPassword.value) &&
            passwordsValidate(
                regFormPassword.value,
                regFormPasswordAgain.value
            ) &&
            regFormChekbox.checked
        ) {
            // removeHintPassword();
            // console.log(regFormEmail.value);
            // console.log(emailValidate(regFormEmail.value));
            // console.log(regFormPassword.value);
            // console.log(passwordValidate(regFormPassword.value));
            // console.log(regFormPasswordAgain.value);
            // console.log(passwordValidate(regFormPasswordAgain.value));
            regFormSubmit.disabled = false;
            // if (
            //     regFormSubmit.classList.contains(
            //         "form-entrance__button-disable"
            //     ) != null
            // ) {
                regFormSubmit.classList.add("form-entrance__button-active");
            //}
        } else {
            // addHintPassword();
            // console.log(emailValidate(regFormEmail.value));
            // console.log(passwordValidate(regFormPassword.value));
            regFormSubmit.disabled = true;
            // if (
            //     regFormSubmit.classList.contains(
            //         "form-entrance__button-disable"
            //     ) == null
            // ) {
            //     regFormSubmit.classList.add("form-entrance__button-disable");
            // }
        }
    }
}

//---------------------------------------------------------------------------------------
