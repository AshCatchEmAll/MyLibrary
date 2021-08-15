import "../App.css";

import "firebase/auth";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import BookListPage from "../components/BookListPage";
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
function App() {
  return (
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <FirebaseAuthConsumer>
        {({ isSignedIn, user, providerId }) => {
          return (
            <>
              <Appbar />
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
  );
}
export default App;
