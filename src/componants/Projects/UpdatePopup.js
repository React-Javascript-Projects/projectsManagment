import React from "react";
import ProjectForm from "./ProjectForm";
import classes from "./UpdatePopup.module.css";

const UpdatePopup = (props) => {
  return (
    <>
      <div className={classes.backdrop} onClick={props.onClose} />
      <ProjectForm
        project={props.project}
        className={classes.modal}
        onClose={props.onClose}
        set={props.set}
      />
    </>
  );
};

export default UpdatePopup;
