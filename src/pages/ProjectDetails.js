import React, { useState, useEffect, useContext } from "react";
import classes from "./ProjectDetails.module.css";
import Button from "../componants/UI/Button";
import DeletePopup from "../componants/UI/DeletePopup";
import { useParams } from "react-router-dom";
import UpdatePopup from "../componants/Projects/UpdatePopup";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useFetch } from "../context/UserAction";

const ProjectDetails = () => {
  let history = useHistory();
  const [deletePopup, setDeletePopup] = useState();
  const [updatePopup, setUpdatePopup] = useState();
  const [project, setProject] = useState("");

  const { deleteProject } = useFetch();

  const { state } = useContext(UserContext);

  const projectID = Number(useParams().projectID);

  useEffect(() => {
    setProject(state.projects.find((item) => Number(item.id) === projectID));
  }, [projectID, state.projects]);

  const displayDeltePopup = () => setDeletePopup(true);
  const closedisplayDeltePopup = () => setDeletePopup(false);

  const displayUpdatePopup = () => setUpdatePopup(true);

  const closedisplayUpdatePopup = async () => {
    setUpdatePopup(false);
  };

  const deleteData = () => {
    console.log("ffffffffffffffffffffff");
    deleteProject(projectID);
    closedisplayDeltePopup();
    history.push("/");
  };

  return (
    <>
      {updatePopup && (
        <UpdatePopup
          project={project}
          onClose={closedisplayUpdatePopup}
          set={setProject}
        />
      )}
      <div className={classes.container}>
        <div className={classes.row}>
          <img src={project.img} className={classes.img} alt="" />
          <div>
            <h1>{project.name}</h1>
            <p className={classes.text}>{project.desc}</p>
          </div>
        </div>
        <div className={classes.row} style={{ gap: "1rem" }}>
          <Button style={{ width: "15%" }} onClick={displayDeltePopup}>
            Delete Project
          </Button>
          <Button style={{ width: "28%" }} onClick={displayUpdatePopup}>
            Edit Project
          </Button>
        </div>
      </div>
      {deletePopup && (
        <DeletePopup onClose={closedisplayDeltePopup} onConferm={deleteData} />
      )}
    </>
  );
};

export default ProjectDetails;
