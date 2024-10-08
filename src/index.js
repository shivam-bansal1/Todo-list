import "./css/style.css";
import "./css/sidebar.css";
import { TodoManager } from "./modules/todos";
import { ProjectManager } from "./modules/projects";

const todocreator = new TodoManager;
todocreator.addTodo("Test todo x", "This is the testing todo list 1", "2024-10-13", "High");
todocreator.addTodo("Test todo y", "This is the testing todo list 2", "2024-10-09", "Low");

const projectManager = new ProjectManager();
projectManager.createProject("Gym");
projectManager.createProject("Reading");
projectManager.createProject("Workplace");

console.log(todocreator.getTodos());