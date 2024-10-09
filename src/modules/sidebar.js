import "../css/style.css";
import "../css/sidebar.css";
import { TodoManager } from "./todos";
import { ProjectManager } from "./projects";

export function createSidebar() {
    const sidebar = document.createElement("div");
    sidebar.classList.add("sidebar");

    sidebar.appendChild(createGreetingSection());
    sidebar.appendChild(todoActionSection());
    sidebar.appendChild(projectSection());
    return sidebar
}

function createGreetingSection() {
    const greetingDiv = document.createElement("div");
    greetingDiv.classList.add("greeting-div");

    // Github 
    const githubButton = document.createElement("a");
    githubButton.setAttribute("target", "_blank");
    githubButton.href = "https://github.com/shivam-bansal1/Todo-list";
    githubButton.classList.add('github-button');  

    const githubIcon = document.createElement('i');  
    githubIcon.classList.add('fab', 'fa-github');  
    githubButton.appendChild(githubIcon);

    greetingDiv.appendChild(githubButton);
    greetingDiv.appendChild(document.createTextNode('Hi, Shivam'));

    return greetingDiv;
}

function todoActionSection() {
    const todoActionsContainer = document.createElement("div");
    todoActionsContainer.classList.add("todo-actions-container");

    const listContainer = document.createElement("ul");
    listContainer.appendChild(createTodoActionList("add-task", "fa-plus", "Add Task"));
    listContainer.appendChild(createTodoActionList("today-task", "fa-clipboard-list", "Today"));
    listContainer.appendChild(createTodoActionList("this-week-task", "fa-calendar", "This Week"));
    listContainer.appendChild(createTodoActionList("all-task", "fa-bars", "All Tasks"));
    listContainer.appendChild(createTodoActionList("completed-task", "fa-circle-check", "Completed"));

    todoActionsContainer.appendChild(listContainer);
    return todoActionsContainer;
}

function createTodoActionList(idName, fontIconClass, todoAction) {
    const listItem = document.createElement("li");

    const actionButton = document.createElement("button");
    actionButton.classList.add("task-action-button");
    actionButton.setAttribute("id", idName);

    const fontIcon = document.createElement("i");
    fontIcon.classList.add("fa", fontIconClass);

    actionButton.appendChild(fontIcon);
    actionButton.appendChild(document.createTextNode(todoAction));
    listItem.appendChild(actionButton);

    return listItem;
}

function projectSection() {
    const projectsContainer = document.createElement("div");
    projectsContainer.classList.add("projects-container");

    const heading = document.createElement("h2");
    heading.textContent = "My Projects";
    projectsContainer.appendChild(heading);

    const listContainer = document.createElement("ul");
    listContainer.appendChild(createTodoActionList("add-project", "fa-plus", "Add Project"));
    listContainer.appendChild(createProjectList("Workout"));
    listContainer.appendChild(createProjectList("Self Study"));
    listContainer.appendChild(createProjectList("Office"));
    
    projectsContainer.appendChild(listContainer);
    return projectsContainer;
}

function createProjectList(projectName) {
    const listItem = document.createElement("li");

    // Project Tag
    const projectButton = document.createElement("button");
    projectButton.classList.add("project-tag");
    const fontIcon = document.createElement("i");
    fontIcon.classList.add("fa", "fa-tag");
    projectButton.appendChild(fontIcon);
    projectButton.appendChild(document.createTextNode(projectName));

    // Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-project-button");
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa", "fa-trash-can");
    deleteButton.appendChild(deleteIcon);

    listItem.appendChild(projectButton);
    listItem.appendChild(deleteButton);

    return listItem;
}