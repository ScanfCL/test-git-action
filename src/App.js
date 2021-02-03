import React, { useEffect } from "react";
import {
  FirestoreProvider,
  FirestoreBatchedWrite,
} from "@react-firebase/firestore";
import { FirebaseDatabaseProvider } from "@react-firebase/database";
import { FirebaseAuthProvider } from "@react-firebase/auth";
import firebase from "firebase/app";
import {
  useRoutes,
  BrowserRouter as Router,
  useNavigate,
} from "react-router-dom";

import { configs } from "./config/configs";
import { ListBooking } from "./pages/ListBooking";
import { LoginPage } from "./pages/Login";

function App() {
  const queryString = decodeURIComponent(window.location.search).replace(
    "?liff.state=",
    ""
  );

  const navigate = useNavigate();

  useEffect(() => {
    navigate(queryString);
  }, [navigate, queryString]);
  const routes = useRoutes([
    {
      path: "/login",
      element: (
        <FirestoreBatchedWrite>
          {({ addMutationToBatch, commit }) => (
            <LoginPage
              addMutationToBatch={addMutationToBatch}
              commit={commit}
            />
          )}
        </FirestoreBatchedWrite>
      ),
    },
    {
      path: "/booking",
      element: (
        <FirestoreBatchedWrite>
          {({ addMutationToBatch, commit }) => (
            <ListBooking
              addMutationToBatch={addMutationToBatch}
              commit={commit}
            />
          )}
        </FirestoreBatchedWrite>
      ),
    },
  ]);

  return (
    <FirebaseAuthProvider config={configs.firebase} firebase={firebase}>
      <FirestoreProvider config={configs.firebase} firebase={firebase}>
        <FirebaseDatabaseProvider config={configs.firebase} firebase={firebase}>
          {routes}
        </FirebaseDatabaseProvider>
      </FirestoreProvider>
    </FirebaseAuthProvider>
  );
}

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
