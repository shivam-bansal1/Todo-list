import "./style.css";
import { TodoManager } from "./modules/todos";
import { ProjectManager } from "./modules/projects";

const todocreator = new TodoManager;
todocreator.addTodo("Test todo x", "This is the testing todo list 1", "12343312", "High");
todocreator.addTodo("Test todo y", "This is the testing todo list 2", "234151543", "Low");

const projectManager = new ProjectManager();
projectManager.createProject("Gym");
projectManager.createProject("Reading");
projectManager.createProject("Workplace");