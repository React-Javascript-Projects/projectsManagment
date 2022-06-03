// import axios from "axios";

// export const addUser = async (user) => {
//   await axios.post(`http://localhost:8000/users`, user);
// };

// export const getProjects = async (id) => {
//   await axios.get(`http://localhost:8000/projects`).then((response) => {
//     return response.data.filter((project) => project.userID === id);
//   });
// };

// export const getProject = async (id) => {
//   return await axios
//     .get(`http://localhost:8000/projects/${id}`)
//     .then((response) => {
//       return response.data;
//     });
// };

// export const addProject = async (project) => {
//   await axios.post(`http://localhost:8000/projects`, project);
// };

// export const updateProject = async (project, id) => {
//   // await axios.put(`http://localhost:8000/projects/${id}`, project);
// };

// export const deleteProject = async (id) => {
//   // await axios.delete(`http://localhost:8000/projects/${id}`);
// };
