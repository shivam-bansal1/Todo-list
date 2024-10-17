import "../css/style.css";
import "../css/todooperations.css";
import { ProjectManager } from "./projects";
import { createTodoSection } from "./TodoSection";
import { setNoActiveButton } from "./helper ";
import { todoViewer } from "./expandTodo";

const projectManagerObject = new ProjectManager();

export function projectActions() {
    document.querySelector("#add-project").
        addEventListener("click", (event)=> {
            setNoActiveButton()
            event.target.classList.add("selected");
            const dialog = addNewProjectDialog();
            document.querySelector("body").style.opacity = 0.3;
            dialog.showModal();
    })
    
    deleteProject();
    projectTodos();
}

function addNewProjectDialog() {

    const dialog = document.createElement("dialog");
    dialog.className = "add-project-dialog";

    const dialogDiv = document.createElement("div");
    dialogDiv.className = "add-project-dialog-div";
    dialog.appendChild(dialogDiv);

    const dialogForm = document.createElement("form");
    dialogForm.className = "add-project-form";
    dialogDiv.appendChild(dialogForm);

    const dialogText = document.querySelector("p");
    dialogText.textContent = "Add new project";
    dialogText.className = "dialog-title";
    dialogForm.appendChild(dialogText);

    const projectName = document.createElement("input");
    projectName.setAttribute("id", "add-project-name");
    projectName.placeholder = "Project Name";
    projectName.required = true;
    dialogForm.appendChild(projectName);

    const addButton = document.createElement("button");
    addButton.textContent = "Add Project";
    addButton.type = "submit";
    addButton.className = "add-project-button";
    dialogForm.appendChild(addButton);

    dialogForm.addEventListener("submit", (event) => {
        if(!dialogForm.checkValidity()) {
            event.preventDefault();
            alert("All the fields are required");
        }
        else {
            console.log("Project added successfully");
            const name = document.querySelector("#add-project-name").value;
            projectManagerObject.createProject(name);
            document.querySelector(".add-project-dialog").remove();
            document.querySelector("body").style.opacity = 1;
            window.location.reload();
        }
    });

    // Close dialog if outside is clicked
    dialog.addEventListener("click", (event) => {
        const parentDiv = document.querySelector(".add-project-dialog");
        const clickedElement = event.target;

        if(!(parentDiv.contains(clickedElement)) || clickedElement == parentDiv) {
            document.querySelector(".add-project-dialog").remove();
            document.querySelector("body").style.opacity = 1;
        }
    });

    document.querySelector("#content").appendChild(dialog);
    return dialog
}

export function deleteProject() {
    const deleteProjectButtons = document.querySelectorAll(".delete-project-button");
    deleteProjectButtons.forEach((btn) => {
        btn.addEventListener("click", (event) =>  {
            const projectName  = event.target.parentElement.value;
            projectManagerObject.deleteProject(projectName);
            window.location.reload();
        });
    } );
}

export function projectTodos() {
    const projectButtons = document.querySelectorAll(".project-tag");

    projectButtons.forEach((project) => {
        project.addEventListener("click", (event) => {
            setNoActiveButton();
            const projectName = event.target.textContent;
            createTodoSection(projectName);
            event.target.classList.add("selected");
            todoViewer();
        });
    });
}