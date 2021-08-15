import "../App.css";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
} from "@react-firebase/auth";
import "firebase/auth";
import firebase from "firebase/app";
import { config } from "../firebase/config";

import SignInComponent from "../components/SignInComponent";

import BookListPage from "../components/BookListPage";


import { useHistory } from "react-router-dom";
function HomePage(props) {
    let history = useHistory();
        console.log("HOMEPAge")
  return (
   
      <div>
       
                  <BookListPage
                    isSignedIn={props.isSignedIn}
                    user={props.user}
                    providerId={props.providerId}
                  />
                
      
      </div>
 
  );
}
export default HomePage;
