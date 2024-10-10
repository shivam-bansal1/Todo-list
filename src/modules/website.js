import "../css/style.css";
import "../css/sidebar.css";
import { createSidebar } from "./sidebar";
import { createTodoSection } from "./TodoSection";

export function ScreenController() {
    const contentDiv = document.querySelector("#content");
    contentDiv.appendChild(createSidebar());
    contentDiv.appendChild(createTodoSection());
}