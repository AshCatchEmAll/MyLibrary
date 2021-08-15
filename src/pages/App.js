import "./App.css";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
} from "@react-firebase/auth";
import "firebase/auth";
import firebase from "firebase/app";
import { config } from "../firebase/config";
import HomePage from "../components/Homepage";
import SignInComponent from "../components/SignInComponent";

import Appbar from "../components/Appbar";

function App() {
  return (
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <div>
        <FirebaseAuthConsumer>
          {({ isSignedIn, user, providerId }) => {
            return (
              <>
                <Appbar />
                {isSignedIn === false ? (
                  <SignInComponent />
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
      </div>
    </FirebaseAuthProvider>
  );
}
export default App;
