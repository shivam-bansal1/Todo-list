import "../css/style.css";
import "../css/sidebar.css";
import { createSidebar } from "./sidebar";
import { createTodoSection } from "./TodoSection";
import { addNewTodoDialog } from "./todoOperations";

function createMain() {
    const main = document.createElement("main");
    main.classList.add("main");
    return main;
}

export function ScreenController() {
    const contentDiv = document.querySelector("#content");
    contentDiv.appendChild(createSidebar());
    contentDiv.appendChild(createMain());
    createTodoSection("all-task");
    document.querySelector("#all-task").classList.add("selected");

    document.querySelector("#today-task").
        addEventListener("click", (event)=> {
            setNoActiveButton()
            event.target.classList.add("selected");
            createTodoSection(event.target.id);
    })
    document.querySelector("#this-week-task").
        addEventListener("click", (event)=> {
            setNoActiveButton()
            event.target.classList.add("selected");
            createTodoSection(event.target.id);
    })
    document.querySelector("#all-task").
        addEventListener("click", (event)=> {
            setNoActiveButton()
            event.target.classList.add("selected");
            createTodoSection(event.target.id);
    })
    document.querySelector("#completed-task").
        addEventListener("click", (event)=> {
            setNoActiveButton()
            event.target.classList.add("selected");
            createTodoSection(event.target.id);
    })
    document.querySelector("#add-task").
        addEventListener("click", (event)=> {
            setNoActiveButton()
            event.target.classList.add("selected");
            const dialog = addNewTodoDialog();
            document.querySelector("body").style.opacity = 0.3;
            dialog.showModal();
    })
}

function setNoActiveButton() {
    const buttons = document.querySelectorAll(".task-action-button");
    buttons.forEach((btn) => btn.classList.remove("selected"));
}