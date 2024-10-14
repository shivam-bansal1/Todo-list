import "../css/style.css";
import { addToStorage, getFromStorage } from "./storage";

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
        function capitalize(string) {
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        }

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
