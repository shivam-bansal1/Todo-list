import "../css/style.css";
import { v4 as uuidv4 } from "uuid";
import { addToStorage, getFromStorage } from "./storage";

class Todo {
    constructor(title, description, dueDate, priority, projectTag, isCompleted) {
        this.id = uuidv4();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.projectTag = projectTag;
        this.isCompleted = isCompleted;
    }
}

export class TodoManager {
    constructor() {
        this.storageName = "todos";
        this.todos = this.loadFromLocalStorage();
    }

    loadFromLocalStorage() {
        const todos = getFromStorage(this.storageName);
        return todos ? JSON.parse(todos) : [] ;
    }

    saveToLocalStorage() {
        addToStorage(this.storageName, JSON.stringify(this.todos));
    }

    addTodo(title, description, dueDate, priority , projectTag="Todos", isCompleted=false) {
        const todo = new Todo(title, description, dueDate, priority, projectTag, isCompleted);
        
        this.todos.some(todo => (todo.title === title && todo.projectTag === projectTag)) ?
                                    alert(`${title} already exists !!!`) :
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

    updateTodo(id, title, description, dueDate, priority, projectTag) {
        this.todos.map((todo) => {
            if(todo.id === id) {
                todo.title = title;
                todo.description = description;
                todo.dueDate = dueDate;
                todo.priority = priority;
                todo.projectTag = projectTag;
            }
        });
        this.saveToLocalStorage();
    }

    getTodos() {                                        
        return this.todos;
    }
}
