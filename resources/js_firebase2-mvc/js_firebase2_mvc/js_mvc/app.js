import "./init.js";
import { TodoController } from "./Controller/TodoController.js";
import { auth, C_PATH_TO_MODE, db } from "./init.js";

const controller = new TodoController(
    C_PATH_TO_MODE[
        new URL(location.href).pathname.split("/").findLast(() => true)
    ]
);

controller.start();
