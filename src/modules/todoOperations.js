import "../css/style.css";
import "../css/todooperations.css";
import { TodoManager } from "./todos";
import { ProjectManager } from "./projects";

export function addNewTodoDialog() {
    const projectManagerObject = new ProjectManager();

    const dialog = document.createElement("dialog");
    dialog.className = "add-todo-dialog";

    const dialogForm = document.createElement("form");
    dialogForm.setAttribute("id", "add-todo-form");
    dialog.appendChild(dialogForm);
    
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
    const projectSelectBox = createSelectBox("Project", "defaultTodos", projectOptions);
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
        else 
            console.log("Task added successfully");
            addNewTodo();   
    });

    document.body.appendChild(dialog);
    return dialog;
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

function addNewTodo() {

    const title = document.querySelector('#add-todo-title').value;
    const description = document.querySelector('#add-todo-description').value;
    const project = document.querySelector('#add-todo-project').value;
    const priority = document.querySelector('#add-todo-priority').value;
    const dueDate = document.querySelector('#add-todo-due-date').value;
    
    const todoManagerObject = new TodoManager();
    todoManagerObject.addTodo(title, description, dueDate, priority, project);
    closeAddTodoDialog();
}

function closeAddTodoDialog() {
    const dialog = document.querySelector(".add-todo-dialog");
    dialog.close();
}