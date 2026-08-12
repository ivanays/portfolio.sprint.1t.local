import { auth, db } from "../init.js";

export class TodoModel {
    // Событие изменения записи для оповешения контроллера об изменении списка
    onChange = () => {};

    constructor(onChange) {
        this.onChange = onChange;

        auth.onAuthStateChanged((user) => {
            if (user) {
                // Загрузка списка из FireBase
                db.collection(user.uid).onSnapshot((snapshot) => {
                    let changes = snapshot.docChanges();
                    changes.forEach((change) => {
                        if (change.type === "added") {
                            this.onChange("add", change.doc);
                        } else if (change.type === "removed") {
                            this.onChange("remove", change.doc);
                        }
                    });
                });
            } else reject("Пользователь не авторизован");
        });
    }

    // Добавление записи
    async add(id, text) {
        auth.onAuthStateChanged((user) => {
            if (user) {
                db.collection(user.uid)
                    .doc("_" + id)
                    .set({
                        id: "_" + id,
                        text,
                        completed: false,
                    })
                    .then(() => {
                        console.log("todo added");
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
            }
        });
    }

    // Удаление записи
    remove(id) {
        auth.onAuthStateChanged((user) => {
            if (user) db.collection(user.uid).doc(id).delete();
        });
    }

    // Переключение состояния завершено / не завершено
    toggle(id) {
        auth.onAuthStateChanged((user) => {
            let item = db.collection(`${user.uid}`).doc(id);
            item.get().then((doc) => {
                item.update({ completed: !doc.data().completed });
            });
        });
    }
}
