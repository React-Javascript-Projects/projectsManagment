import React from "react";
import classes from "./DeletePopup.module.css";
import Button from "./Button";

const DeletePopup = (props) => {
  const deleteHandler = () => {
    console.log("ggggggggg");
    props.onConferm();
  };
  return (
    <>
      <div>
        <div className={classes.backdrop} onClick={props.onClose} />
        <div className={classes.modal}>
          <header className={classes.header}>
            <h3>Are you sure to delete</h3>
          </header>
          <footer>
            <Button style={{ width: "40%" }} onClick={deleteHandler}>
              Yes
            </Button>
            <Button style={{ width: "40%" }} onClick={props.onClose}>
              No
            </Button>
          </footer>
        </div>
      </div>
    </>
  );
};

export default DeletePopup;
