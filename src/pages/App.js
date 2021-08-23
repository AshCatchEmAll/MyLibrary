import "../App.css";

import "firebase/auth";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AuthenticatePage from "./AuthenticatePage";
import HomePage from "./Homepage";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
} from "@react-firebase/auth";
import "firebase/auth";
import firebase from "firebase/app";
import { config } from "../firebase/config";
import Appbar from "../components/Appbar";
import RandomBookPage from "./RandomBookPage";
function App() {

  return (

    <Router>
    <Appbar/>
    <Switch>
    
    <Route  path="/" exact>
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <FirebaseAuthConsumer>
        {({ isSignedIn, user, providerId }) => {
          return (
            <>
              
              {isSignedIn === false ? (
                <AuthenticatePage />
              ) : (
                <HomePage
                  isSignedIn={isSignedIn}
                  user={user}
                  providerId={providerId}
                />
              )}
            </>
          );
        }}
      </FirebaseAuthConsumer>
    </FirebaseAuthProvider>
    </Route>
    <Route path="/randomBook">
        <RandomBookPage/>
    </Route>
    </Switch>
    </Router>

  );
}
export default App;
