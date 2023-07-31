import React,{useState, useEffect} from "react";
// import { TimeTrackerProvider } from "./CustomeComponent/TimeTrackerContext";
import ProjectForm from "./CustomeComponent/ProjectForm";
import TaskForm from "./CustomeComponent/TaskForm";
import ProjectList from "./CustomeComponent/ProjectList";
import TaskList from "./CustomeComponent/TaskList";
import { v4 as uuid } from "uuid";


const App = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [dailyTotalHours, setDailyTotalHours] = useState(0);

  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    setProjects(savedProjects);
  }, []);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const handleCreateProject = (name) => {
    const newProject = {
      id: uuid(),
      name,
      tasks: [],
    };
    setProjects([...projects, newProject]);
  };

  const handleCreateTask = (taskName, timeSpent, description) => {
    const newTask = {
      id: uuid(),
      taskName,
      timeSpent: parseFloat(timeSpent),
      description,
    };
    const updatedProjects = projects.map((project) => {
      if (project.id === selectedProject.id) {
        return {
          ...project,
          tasks: [...project.tasks, newTask],
        };
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  const handleProjectSelect = (projectId) => {
    const selectedProject = projects.find((project) => project.id === projectId);
    setSelectedProject(selectedProject);
  };

  useEffect(() => {
    let totalHours = 0;
    if (selectedProject) {
      // Calculate the total hours for the selected project
      totalHours = selectedProject.tasks.reduce((acc, task) => acc + task.timeSpent, 0);
    }
    setDailyTotalHours(totalHours);
  }, [selectedProject]);

  return (
    <div>
      <h1>Time Tracking Application</h1>
      <ProjectForm onCreateProject={handleCreateProject} />
      <ProjectList projects={projects} onSelect={handleProjectSelect} />
      {selectedProject && (
        <div>
          <TaskForm onCreateTask={handleCreateTask} />
          <TaskList tasks={selectedProject.tasks} />
          <p>Daily Total Hours: {dailyTotalHours}</p>
        </div>
      )}
    </div>
  );
};

export default App;
