"use strict";

//-------------------------------------------------------------------------------------
//Пупапы для входа, регистрации и меню бургер (popup-enter, popup-reg, popup-burger).

if (true) {
    const popupLinks = document.querySelectorAll(".popup-link");
    const body = document.querySelector("body");
    const lockPadding = document.querySelectorAll(".lock-padding");

    let unlock = true;

    const timeout = 800;

    if (popupLinks.length > 0) {
        for (let index = 0; index < popupLinks.length; index++) {
            const popupLink = popupLinks[index];
            popupLink.addEventListener("click", function (e) {
                const popupName = popupLink
                    .getAttribute("href")
                    .replace("#", "");
                const curentPopup = document.getElementById(popupName);
                popupOpen(curentPopup); // ф-ция для откр-тия popuup
                e.preventDefault(); // запрет на перезагрузку на работу ссылки
            });
        }
    }

    const popupCloseIcon = document.querySelectorAll(".close-popup");
    if (popupCloseIcon.length > 0) {
        for (let index = 0; index < popupCloseIcon.length; index++) {
            const el = popupCloseIcon[index];
            el.addEventListener("click", function (e) {
                popupClose(el.closest(".popup-entrance"));
                e.preventDefault();
            });
        }
    }

    function popupOpen(curentPopup) {
        if (curentPopup && unlock) {
            const popupActive = document.querySelector(".popup-entrance.open");
            if (popupActive) {
                popupClose(popupActive, false);
            } else {
                bodyLock();
            }
            curentPopup.classList.add("open");
            curentPopup.addEventListener("click", function (e) {
                if (!e.target.closest(".popup-entrance__content")) {
                    popupClose(e.target.closest(".popup-entrance"));
                }
            });
        }
    }

    function popupClose(popupActive, doUnlock = true) {
        if (unlock) {
            popupActive.classList.remove("open");
            if (doUnlock) {
                bodyUnlock();
            }
        }
    }

    function bodyLock() {
        const lockPaddingValue =
            window.innerWidth -
            document.querySelector("body").offsetwidth +
            "px";

        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = lockPaddingValue;
            }
        }
        body.style.paddingRight = lockPaddingValue;
        body.classList.add("lock");

        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, timeout);
    }

    function bodyUnlock() {
        setTimeout(function () {
            if (lockPadding.length > 0) {
                for (let index = 0; index < lockPadding.length; index++) {
                    const el = lockPadding[index];
                    el.style.paddingRight = "0px";
                }
            }
            body.style.paddingRight = "0px";
            body.classList.remove("lock");
        }, timeout);

        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, timeout);
    }

    document.addEventListener("keydown", function (e) {
        if (e.which === 27) {
            const popupActive = document.querySelector(".popup-entrance.open");
            popupClose(popupActive);
        }
    });
}

//---------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------
// Валидация форм входа, регистрации (form-inter, form-reg).

if (true) {
    const interForm = document.querySelector("#form-inter");
    const interFormEmail = interForm.forminteremail;
    const interFormPassword = interForm.forminterpassword;
    const interFormChekbox = interForm.forminterchremme;
    const interFormSubmit = interForm.formintersubmit;

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

    const regForm = document.querySelector("#form-reg");
    const regFormLogin = regForm.formreglogin;
    const regFormEmail = regForm.formregemail;
    const regFormPassword = regForm.formregpassword;
    const regFormPasswordAgain = regForm.formregpasswordagain;
    const regFormChekbox = regForm.formregchagree;
    const regFormSubmit = regForm.formregsubmit;

    regFormSubmit.disabled = true;

    regForm.addEventListener("submit", handleFormSubmit);
    //regForm.addEventListener("input", checkValidity);
    regFormLogin.addEventListener("input", (event) => {
        event.preventDefault();
        checkDisabledReg();
    });
    regFormEmail.addEventListener("input", (event) => {
        event.preventDefault();
        checkDisabledReg();
    });
    regFormPassword.addEventListener("input", (event) => {
        event.preventDefault();
        checkDisabledReg();
    });
    regFormPasswordAgain.addEventListener("input", (event) => {
        event.preventDefault();
        checkDisabledReg();
    });
    regFormChekbox.addEventListener("input", (event) => {
        event.preventDefault();
        checkDisabledReg();
    });

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
                } else if (!document.getElementById(el.name).checked) {
                    el.value = "false";
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
                //getMessage("Введите корректный E-MAIL");
                return false;
            } else {
                return true;
            }
            //getMessage("Введите корректный E-MAIL");
        }
        return false;
    }
    function passwordValidate(password) {
        let reg =
            /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g;
        if (checkString(password)) {
            if (reg.test(password) == false) {
                return false;
            } else {
                return true;
            }
            //getMessage("Введите корректный E-MAIL");
        }
        return false;
    }
    function passwordsValidate(password1, password2) {
        if (passwordValidate(password1) && passwordValidate(password2)) {
            if (password1 !== password2) {
                //getMessage("Пароли не совпадают");
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }
    function checkString(str) {
        if (str === "" || str === null) {
            //getMessage("Поле ввода пусто");
            return false;
        }
        return str;
    }
    function checkDisabledInter() {
        if (
            emailValidate(interFormEmail.value) &&
            passwordValidate(interFormPassword.value)
        ) {
            console.log(interFormEmail.valu);
            console.log(emailValidate(interFormEmail.value));
            console.log(interFormPassword.value);
            console.log(passwordValidate(interFormPassword.value));
            interFormSubmit.disabled = false;
        } else {
            console.log(emailValidate(interFormEmail.value));
            console.log(passwordValidate(interFormPassword.value));
            interFormSubmit.disabled = true;
        }
    }
    function checkDisabledReg() {
        if (
            checkString(regFormLogin.value) &&
            emailValidate(regFormEmail.value) &&
            passwordsValidate(
                regFormPassword.value,
                regFormPasswordAgain.value
            ) &&
            regFormChekbox.checked
        ) {
            console.log(regFormEmail.valu);
            console.log(emailValidate(regFormEmail.value));
            console.log(regFormPassword.value);
            console.log(passwordValidate(regFormPassword.value));
            console.log(regFormPasswordAgain.value);
            console.log(passwordValidate(regFormPasswordAgain.value));
            regFormSubmit.disabled = false;
        } else {
            console.log(emailValidate(regFormEmail.value));
            console.log(passwordValidate(regFormPassword.value));
            regFormSubmit.disabled = true;
        }
    }
}

//---------------------------------------------------------------------------------------
