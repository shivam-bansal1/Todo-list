import "./style.css";
import { v4 as uuidv4 } from "uuid";
import { addToStorage, getFromStorage } from "./storage";


class Todo {
    constructor(title, description, dueDate, priority, isCompleted) {
        this.id = uuidv4();
        // this.id = ++count;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isCompleted = isCompleted;
    }
}

class TodoManager {

    constructor() {
        this.todos = this.loadFromLocalStorage();
    }

    loadFromLocalStorage() {
        const todos = getFromStorage("todos");
        return todos ? JSON.parse(todos) : [] ;
    }

    saveToLocalStorage() {
        addToStorage("todos", JSON.stringify(this.todos));
    }

    addTodo(title, description, dueDate, priority, isCompleted=false) {
        const todo = new Todo(title, description, dueDate, priority, isCompleted);
        this.todos.push(todo);
        this.saveToLocalStorage();
    }

    removeTodo(id) {
        this.todos = this.todos.filter(todo => todo.id != id);
        this.saveToLocalStorage();
    }

    toggleComplete(id) {
        this.todos.map((todo) => {
            if(todo.id === id) {
                todo.isCompleted = !todo.isCompleted;
            }
        });
        this.saveToLocalStorage();
    }

}


const todocreator = new TodoManager;
// todocreator.addTodo("Test todo 1", "This is the testing todo list 1", "12343312", "High");
// todocreator.addTodo("Test todo 2", "This is the testing todo list 2", "234151543", "Low");

todocreator.toggleComplete("e193d852-e8b5-4d63-8a6a-7a53b4de99b5");