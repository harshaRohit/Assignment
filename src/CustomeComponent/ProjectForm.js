import React, { useState } from "react";

const ProjectForm = ({ onCreateProject }) => {
  const [projectName, setProjectName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (projectName.trim() !== "") {
      onCreateProject(projectName);
      setProjectName("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create a new Project</h3>
      <input
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        placeholder="Project name"
      />
      <button type="submit">Create Project</button>
    </form>
  );
};

export default ProjectForm;
