import React, { useContext } from "react";
import classes from "./AllProjects.module.css";
import ProjectCard from "../componants/Projects/ProjectCard";
import { UserContext } from "../context/UserContext";

const AllProjects = () => {
  const { state } = useContext(UserContext);

  return (
    <>
      <h3>Your Projects</h3>
      {state.projects.length ? (
        <div className={classes.container}>
          {state.projects.map((projectItem) => {
            return <ProjectCard key={projectItem.id} project={projectItem} />;
          })}
        </div>
      ) : (
        <p className={classes.text}>No Project found , you can add Project</p>
      )}
    </>
  );
};

export default AllProjects;
