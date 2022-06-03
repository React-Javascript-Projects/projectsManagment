import React from "react";
import classes from "./ProjectCard.module.css";
import { Link } from "react-router-dom";

const ProjectCard = (props) => {
  return (
    <div className={classes.card}>
      <img src={props.project.img} alt="" />
      <h4>{props.project.name}</h4>
      <p className={classes.text}>{props.project.desc}</p>
      <Link to={"" + props.project.id} className={classes.link}>
        More Details
      </Link>
    </div>
  );
};

export default ProjectCard;
