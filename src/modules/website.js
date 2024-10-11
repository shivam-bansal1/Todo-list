import "../css/style.css";
import "../css/sidebar.css";
import { createSidebar } from "./sidebar";
import { createTodoSection } from "./TodoSection";

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

    document.querySelector("#today-task").
        addEventListener("click", (event)=> {
            console.log(event);
            console.log(event.target.id);
            createTodoSection(event.target.id);
    })
    document.querySelector("#this-week-task").
        addEventListener("click", (event)=> {
            console.log(event);
            console.log(event.target.id);
            createTodoSection(event.target.id);
    })
    document.querySelector("#all-task").
        addEventListener("click", (event)=> {
            console.log(event);
            console.log(event.target.id);
            createTodoSection(event.target.id);
    })
    document.querySelector("#completed-task").
        addEventListener("click", (event)=> {
            console.log(event);
            console.log(event.target.id);
            createTodoSection(event.target.id);
    })
}