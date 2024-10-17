import "../css/style.css";
import "../css/expandtodo.css";
import { TodoManager } from "./todos";
import { ProjectManager } from "./projects";

const todoManagerObject = new TodoManager();
const projectManagerObject = new ProjectManager();

export function todoViewer() {
    const mainSection = document.querySelector(".main-section");

    const todoItemList = document.querySelectorAll(".todo-item");
    todoItemList.forEach((todoItem) => {
        todoItem.addEventListener("click", (event)=> {
            if(event.target.classList.contains('slider')) {
                console.log("Slider Present");
                event.stopPropagation();
            }
            else {
                mainSection.style.gridTemplateColumns = "1fr 450px";
                expandTodo(todoItem.dataset.todoId);
            }
        });
    });
}

function expandTodo(todoId) {
    const mainSection = document.querySelector(".main-section");
    const outerContainer = document.createElement("div");
    outerContainer.className = "outer-container";

    // Header 
    const header = document.createElement("div");
    header.className = "header";
    outerContainer.appendChild(header);
    const heading = document.createElement("h1");
    heading.textContent = "Task";
    header.appendChild(heading);
    const closeButton = document.createElement("button");
    closeButton.classList.add("close-button");
    const fontIcon = document.createElement("i");
    fontIcon.classList.add("fa-solid", "fa-xmark");
    closeButton.appendChild(fontIcon);
    header.appendChild(closeButton);

    // Todo Info Section 
    const expandedTodo = document.createElement("div");
    expandedTodo.className = "todo-viewer-div";
    outerContainer.appendChild(expandedTodo);

    // Get Todo
    const todoInfo = todoManagerObject.getTodos().filter((todo) => todo.id === todoId)[0];

    const title = document.createElement("input");
    title.setAttribute("id", "expanded-todo-title");
    title.value = todoInfo.title;
    title.required = true;
    expandedTodo.appendChild(title);
    
    const Description = document.createElement("textarea");
    Description.setAttribute("id", "expanded-todo-description");
    Description.value = todoInfo.description;
    Description.required = true;
    expandedTodo.appendChild(Description);

    const projectOptions = projectManagerObject.getProjects();
    const projectSelectBox = createSelectBox(todoInfo.projectTag, projectOptions, "Todos");
    projectSelectBox.setAttribute("id", "expanded-todo-project");
    expandedTodo.appendChild(projectSelectBox);

    const priorotyOptions = ["Low", "Medium", "High"];
    const prioritySelectBox = createSelectBox(todoInfo.priority, priorotyOptions, null);
    prioritySelectBox.setAttribute("id", "expanded-todo-priority");
    expandedTodo.appendChild(prioritySelectBox);

    const dueDate = document.createElement("input");
    dueDate.type =  "date";
    dueDate.name =  "dueDate";
    dueDate.required = true;
    dueDate.value = todoInfo.dueDate;
    dueDate.setAttribute("id", "expanded-todo-due-date");
    expandedTodo.appendChild(dueDate);

    // Header 
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "action-buttons";
    expandedTodo.appendChild(buttonContainer);
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.setAttribute("data-todo-id", todoInfo.id);
    deleteButton.textContent = "Delete";
    buttonContainer.appendChild(deleteButton);

    const updateButton = document.createElement("button");
    updateButton.classList.add("update-button");
    updateButton.setAttribute("data-todo-id", todoInfo.id);
    updateButton.textContent = "Update";
    buttonContainer.appendChild(updateButton);

    // Remove existing Expanded Todo
    const childElement = document.querySelector(".outer-container");
    if(mainSection.contains(childElement)) {
        childElement.remove();
    }

    mainSection.appendChild(outerContainer);
    // Close Expanded Todo
    closeExpandedTodo();
    deleteTodo();
    updateTodo();
}

function closeExpandedTodo() {
    document.querySelector(".close-button").
    addEventListener("click", () => {
        document.querySelector(".outer-container").remove();
        document.querySelector(".main-section").style.gridTemplateColumns = "1fr";
    });
}

function createSelectBox(selectedValue, selectOptions, defaultValue) {
    const selectElement = document.createElement("select");

    const option = document.createElement("option");
    option.text = selectedValue;
    option.value = selectedValue;
    selectElement.appendChild(option);

    selectOptions.forEach(choice => {
        if(choice !== selectedValue && choice !== defaultValue) {
            const option = document.createElement("option");
            option.text = `${choice}`;
            option.value = `${choice}`;
            selectElement.appendChild(option);
        }
    });

    if(defaultValue) {
        const option = document.createElement("option");
        option.text = defaultValue;
        option.value = defaultValue;
        selectElement.appendChild(option);
    }

    return selectElement;
}

function deleteTodo() {
    const deleteButton = document.querySelector(".delete-button");
    deleteButton.addEventListener("click" , ()=> {
        const todoId = deleteButton.dataset.todoId;
        todoManagerObject.removeTodo(todoId);
        window.location.reload();
    });
}

function updateTodo() {
    const updateButton = document.querySelector(".update-button");
    updateButton.addEventListener("click" , ()=> {
        const todoId = updateButton.dataset.todoId;
        const title = document.querySelector("#expanded-todo-title").value;
        const description = document.querySelector("#expanded-todo-description").value;
        const dueDate = document.querySelector("#expanded-todo-due-date").value;
        const project = document.querySelector("#expanded-todo-project").value;
        const priority = document.querySelector("#expanded-todo-priority").value;

        todoManagerObject.updateTodo(todoId, title, description, dueDate, priority, project);
        window.location.reload();
    });
}