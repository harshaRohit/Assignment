import React from "react";

const ProjectList = ({ projects, onSelect }) => {
  return (
    <div>
      <h3>List of Projects</h3>
      <ul>
        {projects.map((project) => (
          <li key={project.id} onClick={() => onSelect(project.id)}>
            {project.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
