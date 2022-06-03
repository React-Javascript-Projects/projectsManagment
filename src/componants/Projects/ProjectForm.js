import React, { useEffect, useState, useContext } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "./ProjectForm.module.css";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useFetch } from "../../context/UserAction";

const ProjectForm = (props) => {
  let history = useHistory();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState();

  const [nameError, setNameError] = useState();
  const [descError, setDescError] = useState();
  const [imageError, setImageError] = useState();

  const { state } = useContext(UserContext);
  const { addProject, updateProject } = useFetch();
  useEffect(() => {
    const setProject = () => {
      setName(props.project.name);
      setDesc(props.project.desc);
      setImage(props.project.img);
    };
    props.project && setProject();
  }, [props.project]);

  const uploadHandler = (event) => {
    const imageFile = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      setImage(e.target.result);
    });

    reader.readAsDataURL(imageFile);
  };

  const ProjectHandler = async (event) => {
    event.preventDefault();
    if (name.trim().length === 0) setNameError("Project Name is requered");
    else setNameError();

    if (desc.trim().length === 0)
      setDescError("Project Description is requered");
    else setDescError();

    if (!image) setImageError("Project Image is requered");
    else setImageError();

    if (name && desc && image) {
      const project = {
        name: name,
        desc: desc,
        img: image,
        id: props.project
          ? props.project.id
          : Math.random().toString().substring(2),
        userID: state.id,
      };

      if (props.project) {
        updateProject(project);
        props.set(project);
        props.onClose();
      } else {
        addProject(project);
        history.push("/");
      }
    }
  };

  return (
    <>
      <Card
        style={{ width: "400px", height: "580px" }}
        className={`${props.className}`}
      >
        <form>
          <label>Project Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p className={classes.error}>{nameError}</p>
          <label>Description</label>
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
          <p className={classes.error}>{descError}</p>
          <label>Project IMG</label>
          <div>
            <div className={classes.avatarupload}>
              <div className={classes.avataredit}>
                <input
                  type="file"
                  id="imageUpload"
                  accept=".png, .jpg, .jpeg"
                  onChange={uploadHandler} //on Click
                />
                <label htmlFor="imageUpload">
                  <i></i>
                </label>
              </div>
              <div className={classes.avatarpreview}>
                <img
                  id="imagePreview"
                  src={image}
                  className={classes.img}
                  alt=""
                />
                <p className={classes.error}>{imageError}</p>
              </div>
            </div>
          </div>
          <Button
            style={{ marginTop: "1rem" }}
            type="submit"
            onClick={ProjectHandler}
          >
            {props.project ? "Update Project" : "Add Project"}
          </Button>
        </form>
      </Card>
    </>
  );
};

export default ProjectForm;
