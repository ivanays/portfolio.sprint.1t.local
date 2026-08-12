export class SignupView {
    // Колбек регистрации пользвоателя
    onSignup;

    // Объект формы
    #signupForm;

    constructor() {
        this.#signupForm = document.querySelector("#signup-form");

        // Регистрация колбека на событие клика на кнопку регистрации
        this.#signupForm.addEventListener("submit", (e) => {
            // Избегаем отправки формы браузером
            e.preventDefault();

            // Получение данных формы
            const email = this.#signupForm["signup-email"].value;
            const password = this.#signupForm["signup-password"].value;
            console.log(email);
            console.log(password);
            // Вызов колбека регистрации пользователя
            this.onSignup(email, password);
        });
    }

    // Сброс формы на начальное состояние
    resetForm() {
        this.#signupForm.reset();
    }
}
