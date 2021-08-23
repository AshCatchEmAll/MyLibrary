import "../App.css";

import "firebase/auth";

import BookListPage from "../components/BookListPage";

function HomePage(props) {
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
