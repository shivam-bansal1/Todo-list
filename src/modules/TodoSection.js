import "../css/style.css";
import "../css/todosection.css";
import { TodoManager } from "./todos";
const { format, parseISO, isToday, startOfWeek, endOfWeek } = require("date-fns");

export function createTodoSection(whichTodos) {
    const main = document.querySelector(".main");
    main.textContent = "";

    const mainSection = document.createElement("div");
    mainSection.classList.add("main-section");

    const TodoSection = document.createElement("div");
    TodoSection.setAttribute("id", "todos-section");

    const contentHeading = document.createElement("h2");
    contentHeading.setAttribute("id", "content-heading");
    contentHeading.textContent = "Today";

    TodoSection.appendChild(contentHeading);
    TodoSection.appendChild(loadTodoItems(whichTodos));
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

function loadTodoItems(whichTodos) {
    const TodoItemsContainer = document.createElement("div");
    TodoItemsContainer.setAttribute("id", "todos-container");
    TodoItemsContainer.appendChild(createHeader());

    const todoManagerObject = new TodoManager();
    let todosList = todoManagerObject.getTodos();
    // console.log(todosList);
    
    todosList = filterTodos(todosList, whichTodos);
    // console.log(todosList);

    if(todosList) {
        // Change due date display format
        todosList = todosList.map((todo) => ({
            ...todo,  // Spread the other properties of the todo object
            dueDate: format(parseISO(todo.dueDate), 'LLLL do, yyyy', { awareOfUnicodeTokens: true })
        }));

        todosList.forEach(todo => {
            const item1 = createTodoItems(todo.title, todo.priority, todo.projectTag, todo.dueDate);
            TodoItemsContainer.appendChild(item1);
        });
    }
    
    return TodoItemsContainer
}

function filterTodos(todosList, whichTodos) {
    
    if(whichTodos.slice(0,-5) === "all") {
        return todosList;
    }
    else if(whichTodos.slice(0,-5) === "today") {
        function filterTodayTodos(dateString) {
            const date = parseISO(dateString);
            const result = isToday(date);
            console.log(result);
            return result;
        }

        todosList = todosList.filter((todo)=> filterTodayTodos(todo.dueDate));
        console.log(todosList);

        return todosList

    }
    else if(whichTodos.slice(0,-5) === "this-week") {

        function filterThisWeekTodos(dateString) {
            const date = parseISO(dateString);
            const start = startOfWeek(new Date(), { weekStartsOn: 1 }); // week starts on Monday
            const end = endOfWeek(new Date(), { weekStartsOn: 1 });
            const result = date >= start && date <= end;
            return result;
        }

        todosList = todosList.filter((todo)=> filterThisWeekTodos(todo.dueDate));
        console.log(todosList);

        return todosList
    }
    else if(whichTodos.slice(0,-5) === "completed") {
        return todosList.filter((todo) => todo.isCompleted === true);
    }
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
    if(value === "defaultTodos")
        paraElement.textContent = "-";
    else
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