import "../css/style.css";
import "../css/todooperations.css";
import { TodoManager } from "./todos";
import { ProjectManager } from "./projects";
import { createTodoSection } from "./TodoSection";
import { setNoActiveButton } from "./helper ";
import { todoViewer } from "./expandTodo";

const todoManagerObject = new TodoManager();
const projectManagerObject = new ProjectManager();

export function todoActions() {
    // Filter todo events
    document.querySelector("#today-task").
        addEventListener("click", (event)=> {
            setNoActiveButton()
            event.target.classList.add("selected");
            createTodoSection(event.target.id.slice(0,-5));
            markAsDoneTodo();
            todoViewer();
    })
    document.querySelector("#this-week-task").
        addEventListener("click", (event)=> {
            setNoActiveButton()
            event.target.classList.add("selected");
            createTodoSection(event.target.id.slice(0,-5));
            markAsDoneTodo();
            todoViewer();
    })
    document.querySelector("#all-task").
        addEventListener("click", (event)=> {
            setNoActiveButton()
            event.target.classList.add("selected");
            createTodoSection(event.target.id.slice(0,-5));
            markAsDoneTodo();
            todoViewer();
    })
    document.querySelector("#completed-task").
        addEventListener("click", (event)=> {
            setNoActiveButton()
            event.target.classList.add("selected");
            createTodoSection(event.target.id.slice(0,-5));
            markAsDoneTodo();
            todoViewer();
    })
    // Add new task event
    document.querySelector("#add-task").
        addEventListener("click", (event)=> {
            setNoActiveButton()
            event.target.classList.add("selected");
            const dialog = addNewTodoDialog();
            document.querySelector("body").style.opacity = 0.3;
            dialog.showModal();
    })
    // Mark as completed event
    markAsDoneTodo();
    todoViewer();
}

function markAsDoneTodo() {
    const sliders = document.querySelectorAll(".slider");
    sliders.forEach((slider) => {
        slider.addEventListener("click", (event)=> {
            const todoId = event.target.parentElement.dataset.todoId;
            todoManagerObject.toggleComplete(todoId);
        });
    });
}

function addNewTodoDialog() {

    const dialog = document.createElement("dialog");
    dialog.className = "add-todo-dialog";

    const dialogDiv = document.createElement("div");
    dialogDiv.className = "add-todo-dialog-div";
    dialog.appendChild(dialogDiv);

    const dialogForm = document.createElement("form");
    dialogForm.setAttribute("id", "add-todo-form");
    dialogDiv.appendChild(dialogForm);
    
    const dialogText = document.createElement("p");
    dialogText.className = "dialog-title";
    dialogText.textContent = "Add new task";
    dialogForm.appendChild(dialogText);

    const titleInput = document.createElement("input");
    titleInput.setAttribute("id", "add-todo-title");
    titleInput.placeholder = "Title";
    titleInput.required = true;
    dialogForm.appendChild(titleInput);
    
    const DescriptionInput = document.createElement("textarea");
    DescriptionInput.setAttribute("id", "add-todo-description");
    DescriptionInput.placeholder = "Details";
    DescriptionInput.required = true;
    dialogForm.appendChild(DescriptionInput);

    const projectOptions = projectManagerObject.getProjects();
    const projectSelectBox = createSelectBox("Project", "Todos", projectOptions);
    projectSelectBox.setAttribute("id", "add-todo-project");
    dialogForm.appendChild(projectSelectBox);

    const priorotyOptions = ["Low", "Medium", "High"];
    const prioritySelectBox = createSelectBox("Priority", "Low", priorotyOptions);
    prioritySelectBox.setAttribute("id", "add-todo-priority");
    dialogForm.appendChild(prioritySelectBox);

    const dueDate = document.createElement("input");
    dueDate.type =  "date";
    dueDate.name =  "dueDate";
    dueDate.required = true;
    dueDate.setAttribute("id", "add-todo-due-date");
    dialogForm.appendChild(dueDate);

    const addButton = document.createElement("button");
    addButton.textContent = "Add Task";
    addButton.type = "submit";
    addButton.className = "add-todo-button";
    dialogForm.appendChild(addButton)

    dialogForm.addEventListener("submit", (event) => {
        if (!dialogForm.checkValidity()) {
            event.preventDefault();
            alert("All the fields are required");
        }
        else {
            console.log("Task added successfully");
            addNewTodo();   
            window.location.reload();
        }
    });

    // Close dialog if outside is clicked
    dialog.addEventListener("click", (event) => {
        const parentDiv = document.querySelector(".add-todo-dialog");
        const clickedElement = event.target;

        if(!(parentDiv.contains(clickedElement)) || clickedElement == parentDiv) {
            document.querySelector(".add-todo-dialog").remove();
            document.querySelector("body").style.opacity = 1;
        }
    });

    document.querySelector("#content").appendChild(dialog);
    return dialog;
}

function addNewTodo() {
    const title = document.querySelector('#add-todo-title').value;
    const description = document.querySelector('#add-todo-description').value;
    const project = document.querySelector('#add-todo-project').value;
    const priority = document.querySelector('#add-todo-priority').value;
    const dueDate = document.querySelector('#add-todo-due-date').value;
    
    todoManagerObject.addTodo(title, description, dueDate, priority, project);

    document.querySelector(".add-todo-dialog").remove();
    document.querySelector("body").style.opacity = 1;
}

function createSelectBox(defaultText, defaultValue, selectOptions) {
    const selectElement = document.createElement("select");

    const option = document.createElement("option");
    option.text = `Select ${defaultText}`;
    option.value = defaultValue;
    selectElement.appendChild(option);

    selectOptions.forEach(projectName => {
        const option = document.createElement("option");
        option.text = `${projectName}`;
        option.value = `${projectName}`;
        selectElement.appendChild(option);
    });

    return selectElement;
}