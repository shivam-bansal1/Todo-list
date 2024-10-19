import "../css/style.css";
import "../css/todosection.css";
import { TodoManager } from "./todos";
import { capitalize } from "./helper ";
const { format, parseISO, isToday, startOfWeek, endOfWeek } = require("date-fns");

export function createTodoSection(whichTodos) {
    const main = document.querySelector(".main");
    main.innerHTML = "";

    const mainSection = document.createElement("div");
    mainSection.className = "main-section";

    const TodoSection = document.createElement("div");
    TodoSection.setAttribute("id", "todos-section");

    const contentHeading = document.createElement("h2");
    contentHeading.setAttribute("id", "content-heading");
    contentHeading.textContent = capitalize(whichTodos);

    TodoSection.appendChild(contentHeading);
    TodoSection.appendChild(loadTodoItems(whichTodos));
    TodoSection.appendChild(getPaginator());
    mainSection.appendChild(TodoSection);
    main.appendChild(mainSection);
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

function loadTodoItems(whichTodos, pageNumber=1) {
    const TodoItemsContainer = document.createElement("div");
    TodoItemsContainer.setAttribute("id", "todos-container");
    TodoItemsContainer.appendChild(createHeader());

    const todoManagerObject = new TodoManager();
    let todosList = todoManagerObject.getTodos();
    todosList = filterTodos(todosList, whichTodos);

    if(todosList) {
        // Pagination Logic
        const todosPerPage = 8;
        if(todosList.length > todosPerPage) {
            const start = (pageNumber-1) * todosPerPage;
            const end = start + todosPerPage;
            todosList = todosList.slice(start, end);
        }

        // Change due date display format
        todosList = todosList.map((todo) => ({
            ...todo,  // Spread the other properties of the todo object
            dueDate: format(parseISO(todo.dueDate), 'LLLL do, yyyy', { awareOfUnicodeTokens: true })
        }));

        todosList.forEach(todo => {
            const item1 = createTodoItems(todo.id, todo.title, todo.priority, todo.projectTag, todo.dueDate, todo.isCompleted);
            TodoItemsContainer.appendChild(item1);
        });
    }
    
    return TodoItemsContainer
}

function filterTodos(todosList, whichTodos) {
    
    if(whichTodos === "all") {
        return todosList;
    }
    else if(whichTodos === "today") {
        function filterTodayTodos(dateString) {
            const date = parseISO(dateString);
            const result = isToday(date);
            return result;
        }

        todosList = todosList.filter((todo)=> filterTodayTodos(todo.dueDate));
        return todosList

    }
    else if(whichTodos === "this-week") {

        function filterThisWeekTodos(dateString) {
            const date = parseISO(dateString);
            const start = startOfWeek(new Date(), { weekStartsOn: 1 }); // week starts on Monday
            const end = endOfWeek(new Date(), { weekStartsOn: 1 });
            const result = date >= start && date <= end;
            return result;
        }
        
        todosList = todosList.filter((todo)=> filterThisWeekTodos(todo.dueDate));
        return todosList
    }
    else if(whichTodos === "completed") {
        return todosList.filter((todo) => todo.isCompleted === true);
    }
    // Filtering todos based on project name
    else {
        todosList = todosList.filter((todo) => todo.projectTag === whichTodos);
        return todosList;
    }
}

function createTodoItems(id, title, priority, tag, dueDate, isCompleted) {
    const TodoItem = document.createElement("div");
    TodoItem.classList.add("todo-item");
    TodoItem.setAttribute("data-todo-id", id);

    TodoItem.appendChild(todoValue(id, truncateTitle(title)));
    TodoItem.appendChild(todoValue(id, priority));
    TodoItem.appendChild(todoValue(id, tag));
    TodoItem.appendChild(todoValue(id, dueDate));
    TodoItem.appendChild(createFinishedToggle(id, isCompleted));

    return TodoItem;
}

function todoValue(id, value) {
    const paraElement = document.createElement("p");
    paraElement.setAttribute("data-todo-id", id);
    
    if(value === "Todos")
        paraElement.textContent = "-";
    else
        paraElement.textContent = value;
    return paraElement;
}

function truncateTitle(title, maxLength=20) {
    return title.length > maxLength ? title.substring(0, maxLength) + "..." : title;
}

function createFinishedToggle(id, isCompleted) {
    const finishedToggle = document.createElement("div");
    finishedToggle.classList.add("todo-item-value");
    const label = document.createElement("label");
    label.classList.add("switch");
    label.setAttribute("data-todo-id", id);

    const input = document.createElement("input");
    input.type = "checkbox";
    input.setAttribute("data-todo-id", id);

    if(isCompleted === true)
        input.checked = true;

    const span = document.createElement("span");
    span.setAttribute("data-todo-id", id);
    span.classList.add("slider");


    label.appendChild(input);
    label.appendChild(span);
    finishedToggle.appendChild(label);

    return finishedToggle;
}

function getPaginator() {
    const paginator = document.createElement("div");
    paginator.className = "paginator";
    
    const prevButton = document.createElement("button");
    prevButton.textContent = "Previous";
    prevButton.className = "prev-button";

    const pageInfo = document.createElement("span");
    pageInfo.textContent = "Page 1 of 2";
    pageInfo.className = "page-info";

    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.className = "next-button";

    paginator.appendChild(prevButton);
    paginator.appendChild(pageInfo);
    paginator.appendChild(nextButton);

    return paginator;
}