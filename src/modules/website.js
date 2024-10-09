import "../css/style.css";
import "../css/sidebar.css";
import { createSidebar } from "./sidebar";

export function ScreenController() {
    const contentDiv = document.querySelector("#content");
    contentDiv.appendChild(createSidebar());
}