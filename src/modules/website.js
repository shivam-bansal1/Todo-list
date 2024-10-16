import "../css/style.css";
import "../css/sidebar.css";
import { createSidebar } from "./sidebar";
import { createTodoSection } from "./TodoSection";
import { todoActions } from "./todoOperations";
import { projectActions } from "./projectOperations";

function createMain() {
    const main = document.createElement("main");
    main.classList.add("main");
    return main;
}

export function ScreenController() {
    const contentDiv = document.querySelector("#content");
    contentDiv.appendChild(createSidebar());
    contentDiv.appendChild(createMain());
    createTodoSection("all");
    document.querySelector("#all-task").classList.add("selected");

    todoActions();
    projectActions();
}