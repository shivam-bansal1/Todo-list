import "../css/style.css";
import "../css/todosection.css";
import { TodoManager } from "./todos";

export function createTodoSection() {
    const mainSection = document.createElement("div");
    mainSection.classList.add("main");

    const TodoSection = document.createElement("div");
    TodoSection.setAttribute("id", "todos-section");

    const contentHeading = document.createElement("h2");
    contentHeading.setAttribute("id", "content-heading");
    contentHeading.textContent = "Today";

    TodoSection.appendChild(contentHeading);
    TodoSection.appendChild(loadTodoItems());
    mainSection.appendChild(TodoSection);

    return mainSection
}

function createHeader() {
    const header = document.createElement("div");
    header.classList.add("todo-header");

    const titleHeader = document.createElement("p");
    titleHeader.classList.add("header");
    titleHeader.textContent = "Title";
    header.appendChild(titleHeader);
    
    const priorityHeader = document.createElement("p");
    priorityHeader.classList.add("header");
    priorityHeader.textContent = "Priority";
    header.appendChild(priorityHeader);
    
    const tagHeader = document.createElement("p");
    tagHeader.classList.add("header");
    tagHeader.textContent = "Tag";
    header.appendChild(tagHeader);
    
    const dueDateHeader = document.createElement("p");
    dueDateHeader.classList.add("header");
    dueDateHeader.textContent = "Due Date";
    header.appendChild(dueDateHeader);
    
    const finishedHeader = document.createElement("p");
    finishedHeader.classList.add("header");
    finishedHeader.textContent = "Finished";
    header.appendChild(finishedHeader);

    return header;
}

function loadTodoItems() {
    const TodoItemsContainer = document.createElement("div");
    TodoItemsContainer.setAttribute("id", "todos-container");
    TodoItemsContainer.appendChild(createHeader());

    const todoManagerObject = new TodoManager();
    const todosList = todoManagerObject.getTodos();
    console.log(todosList);

    todosList.forEach(todo => {
        const item1 = createTodoItems(todo.title, todo.priority, todo.projectTag, todo.dueDate);
        TodoItemsContainer.appendChild(item1);
    });
    
    return TodoItemsContainer
}

function createTodoItems(title, priority, tag, dueDate) {
    const TodoItem = document.createElement("div");
    TodoItem.classList.add("todo-item");

    TodoItem.appendChild(todoValue(title));
    TodoItem.appendChild(todoValue(priority));
    TodoItem.appendChild(todoValue(tag));
    TodoItem.appendChild(todoValue(dueDate));
    TodoItem.appendChild(createFinishedToggle());

    return TodoItem;
}

function todoValue(value) {
    const paraElement = document.createElement("p");
    paraElement.classList.add("todo-item-value");
    paraElement.textContent = value;
    return paraElement;
}

function createFinishedToggle() {
    const finishedToggle = document.createElement("div");
    finishedToggle.classList.add("todo-item-value");
    const label = document.createElement("label");
    label.classList.add("switch");
    const input = document.createElement("input");
    input.type = "checkbox";
    const span = document.createElement("span");
    span.classList.add("slider");

    label.appendChild(input);
    label.appendChild(span);
    finishedToggle.appendChild(label);

    return finishedToggle;
}