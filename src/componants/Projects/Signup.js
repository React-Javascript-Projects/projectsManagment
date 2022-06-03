import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "./Sign.module.css";
import { addUser } from "../../data/api";
import axios from "axios";

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setrePassword] = useState("");

  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [repasswordError, setrePasswordError] = useState();
  const [error, setError] = useState();

  const [add, setAdd] = useState();

  const signForm = () => {
    props.formToggle((prevType) => {
      return !prevType;
    });
  };
  const signUPHandler = async (e) => {
    e.preventDefault();
    if (email.trim().length === 0) setEmailError("Email is requered");
    else setEmailError();

    if (password.trim().length === 0) setPasswordError("Password is requered");
    else {
      setPasswordError();
      if (password !== repassword) setrePasswordError("Passwords not match");
      else {
        setrePasswordError();
        if (email && password) {
          let user = {
            userInformation: { email: email, password: password },
            projects: [{}],
          };
          if (
            (await axios.get(`http://localhost:8000/users`).then((response) => {
              return response.data.find((user) => user.email === email);
            })) !== undefined
          ) {
            setError("This Email already sign up");
          } else {
            setError();
            await addUser(user);
            setAdd(true);
          }
        }
      }
    }
  };
  return (
    <>
      {add && <Redirect to={"/"} />}
      <Card style={{ marginTop: "5rem", width: "330px", height: "450px" }}>
        <form>
          <h2 style={{ color: "black" }}>Sign up</h2>
          <hr />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className={classes.error}>{emailError}</p>

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className={classes.error}>{passwordError}</p>

          <input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setrePassword(e.target.value)}
          />
          <p className={classes.error}>{repasswordError}</p>
          <p className={classes.error}>{error}</p>
          <Button style={{ marginTop: "5rem" }} onClick={signUPHandler}>
            Sign up
          </Button>
          <p className={classes.text}>
            Have an account ?{" "}
            <span style={{ color: "red" }} onClick={signForm}>
              Sign in
            </span>
          </p>
        </form>
      </Card>
    </>
  );
};

export default Signup;
