import React, { useState } from "react";
import SignInSide from "../components/SignInComponent";
import SignUp from "../components/SignUpComponent";

function AuthenticatePage(props) {
  const [isLoginState, setIsLoginState] = useState(true);
  console.log("AUTHENTICate page")
function handleChangeAuthState(){
    setIsLoginState(!isLoginState)
}
  return isLoginState === true ? <SignInSide handleChangeAuthState={handleChangeAuthState}/> : <SignUp handleChangeAuthState={handleChangeAuthState}/>;
}

export default AuthenticatePage