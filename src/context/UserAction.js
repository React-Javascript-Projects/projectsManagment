import axios from "axios";
import { useContext } from "react";
import { UserContext } from "./UserContext";

export const getUser = async (dispatch) => {
  const id = localStorage.getItem("userID");
  if (id) {
    await axios.get(`http://localhost:8000/users/${id}`).then((response) => {
      const user = response.data;
      dispatch({ type: "SET_USER", payload: user });
    });
  }
};

export const signinUser = async (email, password, dispatch) => {
  await axios.get(`http://localhost:8000/users`).then((response) => {
    const userSign = response.data.find(
      (user) =>
        user.userInformation.email === email &&
        user.userInformation.password === password
    );

    localStorage.setItem("userID", userSign.id);
    dispatch({ type: "SET_USER", payload: userSign });
  });
};

export const signupUser = async (email, password, dispatch) => {
  let userSign = {
    userInformation: { email: email, password: password },
    projects: [{}],
  };
  await axios.get(`http://localhost:8000/users`).then((response) => {
    const user = response.data.find(
      (user) => user.userInformation.email === email
    );
    if (user === undefined) axios.post(`http://localhost:8000/users`, userSign);
  });
};

export const signoutUser = (dispatch) => {
  localStorage.clear();
  dispatch({ type: "REMOVE_USER" });
};

export const useFetch = () => {
  const { state, dispatch } = useContext(UserContext);

  const addProject = async (project) => {
    dispatch({ type: "ADD_PRJECT", payload: project });
    await axios.put(`http://localhost:8000/users/${state.id}`, {
      ...state,
      projects: [...state.projects, project],
    });
  };

  const updateProject = async (project) => {
    dispatch({ type: "EDIT_PRJECT", payload: project });
    await axios.put(`http://localhost:8000/users/${state.id}`, {
      ...state,
      projects: [
        ...state.projects.map((item) => {
          if (item.id === project.id) {
            item = project;
          }
          return item;
        }),
      ],
    });
  };

  const deleteProject = async (ID) => {
    dispatch({ type: "DELETE_PROJECT", payload: ID });
    await axios.put(`http://localhost:8000/users/${state.id}`, {
      ...state,
      projects: [
        ...state.projects.filter((project) => Number(project.id) !== ID),
      ],
    });
  };

  return { addProject, updateProject, deleteProject };
};
