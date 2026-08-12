import { SignupView } from "../View/SignupView.js";
import { SigninView } from "../View/SigninView.js";
import { MainView } from "../View/MainView.js";
import { TodoModel } from "../Model/TodoModel.js";
import { auth, C_PATH_TO_MODE } from "../init.js";
import { AuthModel } from "../Model/AuthModel.js";

const C_MODES = Object.values(C_PATH_TO_MODE);

const C_MODE_TO_PATH = Object.fromEntries(
    Object.entries(C_PATH_TO_MODE).map(([key, value]) => [value, key])
);

export class TodoController {
    #mode;
    #model;
    constructor(mode) {
        if (!C_MODES.includes(mode)) {
            throw `Режим "${mode}" не поддерживается`;
        }

        this.#mode = mode;

        if (this.#mode === "main") {
            auth.onAuthStateChanged((user) => {
                if (user) {
                    console.log("user is signed in at users.html");
                } else {
                    alert(
                        "your login session has expired or you have logged out, login again to continue"
                    );
                    this.gotoMode("signin");
                }
            });
        }
    }

    start() {
        this[this.#mode]();
    }

    signup() {
        const view = new SignupView();

        view.onSignup = async (email, password) => {
            try {
                await AuthModel.signup(email, password);
                console.log("success");
                view.resetForm();
                this.gotoMode("signin");
            } catch (err) {
                console.log(err.message);
            }
        };
    }

    signin() {
        const view = new SigninView();

        view.onSignin = async (email, password) => {
            try {
                await AuthModel.signin(email, password);
                console.log("success");
                view.resetForm();

                // Переходим в основной режим работы приложения
                this.gotoMode("main");
            } catch (err) {
                console.log(err.message);
            }
        };
    }

    main() {
        const view = new MainView();

        this.#model = new TodoModel((type, obj) => {
            if (type === "add") {
                view.renderData(obj.data());
            } else if (type === "remove") {
                view.removeItem(obj.id);
            }
        });

        view.onAdd = (id, text) => {
            this.#model.add(id, text);
        };

        view.onRemove = (id) => {
            this.#model.remove(id);
        };

        view.onEdit = (id) => {
            this.#model.toggle(id);
        };

        view.onLogout = () => {
            AuthModel.logout();
        };
    }

    gotoMode(mode) {
        if (!C_MODES.includes(mode)) {
            throw `Режим "${mode}" не поддерживается`;
        }

        window.location = C_MODE_TO_PATH[mode];
    }
}
