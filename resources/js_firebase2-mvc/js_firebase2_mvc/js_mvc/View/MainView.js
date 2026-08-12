export class MainView {
    // События приложения на которые контроллер будет задавать внешние колбеки для связи
    // представление => контроллер
    onAdd;
    onEdit;
    onRemove;
    onLogout;

    constructor() {
        // Получаем экземпляры формы и контейнера списка
        this.form = document.querySelector("#task-form");
        this.todoContainer = document.querySelector("#pet-container");

        // Начальное значкние для счетчика ID
        const date = new Date();
        const time = date.getTime();
        this.counter = time;

        // Обработка события отправки формы
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();

            // Получение значений формы и генерация id
            const time = this.form["time"].value;
            const task = this.form["task"].value;
            const text = `${time} ${task}`;
            let id = (this.counter += 1);

            // Сброс формы
            this.form.reset();

            // Вызов колбека добавления записи
            this.onAdd(id, text);
        });

        // Устанавливаем обработчик для фильтра по статусам на основе css классов
        document.querySelectorAll(".filterHandler[data-status]").forEach(
            (btn) =>
                (btn.onclick = () => {
                    // Получаем атрибут data-status
                const statusString = btn.dataset.status;
                console.log(statusString);

                    // устанавливаем на контейнер класс onlyopen если атрибут data-status равен open иначе удаляет onlyopen
                    this.todoContainer.classList.toggle(
                        "onlyopen",
                        statusString === "open"
                    );

                    // устанавливаем на контейнер класс onlycompleted если атрибут data-status равен completed иначе удаляет onlycompleted
                    this.todoContainer.classList.toggle(
                        "onlycompleted",
                        statusString === "completed"
                    );
                })
        );

        // Генерируем логаут событие по клику на кнопку logout
        document.querySelector("#exit").onclick = () => {
            this.onLogout();
        };
    }

    // Завершение сессии хендлер кнопки
    logout() {
        this.onLogout();
    }

    // Удаление из UI записи
    removeItem(id) {
        let li = this.todoContainer.querySelector(`#${id}`);
        this.todoContainer.removeChild(li);
    }

    // Добавление записи в список
    renderData(todoObj) {
        let parentDiv = document.createElement("li");
        parentDiv.classList.add("item");
        parentDiv.setAttribute("id", todoObj.id);
        parentDiv.classList.add(todoObj.completed ? "completed" : "inprogress");

        let todoDiv = document.createElement("p");
        todoDiv.textContent =
            todoObj.text.length <= 40
                ? todoObj.text
                : todoObj.text.slice(0, 40);

        let trashButton = document.createElement("button");
        trashButton.textContent = "X";
        trashButton.className = "pet__task pet__task-button";

        let completeButton = document.createElement("button");
        completeButton.textContent = "V";
        completeButton.className = "pet__task pet__task-button";

        let buttonDiv = document.createElement("div");
        buttonDiv.className = "button_div";
        buttonDiv.appendChild(trashButton);
        buttonDiv.appendChild(completeButton);

        parentDiv.appendChild(todoDiv);
        parentDiv.appendChild(buttonDiv);
        this.todoContainer.appendChild(parentDiv);

        // Обработка клика на "удалить"
        trashButton.addEventListener("click", (e) => {
            // Вызов колбека о событии удаления
            this.onRemove(todoObj.id);
        });

        completeButton.addEventListener("click", (e) => {
            // Вызов колбека о событии редактирования
            this.onEdit(todoObj.id);

            // Отмечаем элемент списка
            document
                .querySelector(`#${todoObj.id}`)
                .classList.toggle("completed");
            document
                .querySelector(`#${todoObj.id}`)
                .classList.toggle("inprogress");
        });
    }
}
