import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "./Sign.module.css";
import { UserContext } from "../../context/UserContext";
import { signinUser } from "../../context/UserAction";

const Signin = (props) => {
  const { state, dispatch } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error] = useState();

  const signForm = () => {
    props.formToggle((prevType) => {
      return !prevType;
    });
  };
  const signInHandler = async (e) => {
    e.preventDefault();

    signinUser(email, password, dispatch);
  };
  return (
    <>
      {state.userInformation && <Redirect to={"/"} />}
      <Card style={{ marginTop: "5rem", width: "330px", height: "450px" }}>
        <form>
          <h2 style={{ color: "black" }}>Sign in</h2>
          <hr />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className={classes.error}>{email ? "" : "Email is Requered"}</p>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className={classes.error}>
            {password ? "" : "Password is Requered"}
          </p>
          <p className={classes.error}>{error}</p>
          <Button style={{ marginTop: "8.5rem" }} onClick={signInHandler}>
            Sign in
          </Button>
          <p className={classes.text}>
            Don't have an account ?{" "}
            <span style={{ color: "red" }} onClick={signForm}>
              Sign up
            </span>
          </p>
        </form>
      </Card>
    </>
  );
};

export default Signin;
