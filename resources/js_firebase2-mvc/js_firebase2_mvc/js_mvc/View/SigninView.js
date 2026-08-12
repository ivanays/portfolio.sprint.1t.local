export class SigninView {
    // Колбек авторизации пользвоателя
    onSignin;

    // Объект формы
    #loginForm;

    constructor() {
        this.#loginForm = document.querySelector("#login-form");

        // Регистрация колбека на событие клика на кнопку авторизации
        this.#loginForm.addEventListener("submit", (e) => {
            // Избегаем отправки формы браузером
            e.preventDefault();

            // Получение данных формы
            const loginEmail = this.#loginForm["login-email"].value;
            const loginPassword = this.#loginForm["login-password"].value;

            // Вызов колбека авторизации пользователя
            this.onSignin(loginEmail, loginPassword);
        });
    }

    // Сброс формы на начальное состояние
    resetForm() {
        this.#loginForm.reset();
    }
}
