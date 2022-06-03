const userReducer = (state, action) => {
  switch (action.type) {
    case "REMOVE_USER":
      return {};

    case "SET_USER":
      return action.payload;

    case "ADD_PRJECT":
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };

    case "EDIT_PRJECT":
      return {
        ...state,
        projects: [
          ...state.projects.map((project) => {
            if (project.id === action.payload.id) {
              project = action.payload;
            }
            return project;
          }),
        ],
      };

    case "DELETE_PROJECT":
      return {
        ...state,
        projects: [
          ...state.projects.filter(
            (project) => Number(project.id) !== action.payload
          ),
        ],
      };

    default:
      return state;
  }
};

export default userReducer;
