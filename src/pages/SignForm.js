import React, { useState } from "react";
import Signin from "../componants/Projects/Signin";
import Signup from "../componants/Projects/Signup";

const SignForm = (props) => {
  const [signType, setSignType] = useState(true);
  return (
    <>
      {signType ? (
        <Signin formToggle={setSignType} setUser={props.setUser} />
      ) : (
        <Signup formToggle={setSignType} />
      )}
    </>
  );
};

export default SignForm;
