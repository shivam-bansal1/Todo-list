import "../css/style.css";
import { addToStorage, getFromStorage } from "./storage";
import { capitalize } from "./helper ";

export class ProjectManager {
    constructor() {
        this.storageName = "projects";
        this.projects = this.loadFromLocalStorage();
    }

    loadFromLocalStorage() {
        const projects = getFromStorage(this.storageName);
        return projects ? JSON.parse(projects) : [] ;
    }

    saveToLocalStorage() {
        addToStorage(this.storageName, JSON.stringify(this.projects));
    }

    createProject(projectName) {
        this.projects.indexOf(capitalize(projectName)) === -1 ? 
                    this.projects.push(capitalize(projectName)) : 
                    alert("Project already exists!!");
        this.saveToLocalStorage();
    }

    deleteProject(projectName) {
        this.projects = this.projects.filter((project) => project !== projectName);
        this.saveToLocalStorage();
    }

    getProjects() {                                        
        return this.projects;
    }
}
