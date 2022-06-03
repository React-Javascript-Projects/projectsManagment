import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "../componants/UI/Button";
import classes from "./Header.module.css";
import { UserContext } from "../context/UserContext";
import { signoutUser } from "../context/UserAction";

const Header = () => {
  const { state, dispatch } = useContext(UserContext);

  const signOutHandler = () => {
    signoutUser(dispatch);
  };

  return (
    <header className={classes.header}>
      <h2>Projects</h2>
      {state.userInformation && (
        <div>
          <Link to="/" className={classes.link}>
            All Projects
          </Link>
          <Link to="/Add" className={classes.link}>
            Add New Project
          </Link>
          <div className={classes.dropdown}>
            {<h5>{state.userInformation.email}</h5>}
            <button className={classes.dropbtn}>
              <i className="fa fa-caret-down" />
            </button>
            <div className={classes.dropdowncontent}>
              <Button
                style={{
                  padding: "1rem",
                  backgroundColor: "white",
                  color: "black",
                  textAlign: "start",
                }}
                onClick={signOutHandler}
              >
                Signout
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
