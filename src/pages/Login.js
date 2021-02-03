import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "firebase/app";

import { Field } from "../components/Field";

const liff = window.liff;

const LoginPage = ({ className, addMutationToBatch, commit }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    liff.init(async () => {
      let profile = await liff.getProfile();
      setUserProfile(profile);
    });
  }, []);

  useEffect(() => {
    firebase.auth().onIdTokenChanged((user) => {
      if (!user) {
        setToken(null);
        return;
      }

      user.getIdToken().then((id) => {
        setToken(id);
      });
    });
  }, []);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    if (token) {
      firebase.auth().signOut();
      return;
    }

    const email = e.target[0].value;
    const password = e.target[1].value;
    // const name = e.target[2].value;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        addMutationToBatch({
          path: `/trainers/${res.user.uid}`,
          value: {
            line_uid: userProfile.userId || "",
            user_info: [
              {
                access_token: "",
                email: userProfile.email || "",
                uid: userProfile.userId || "",
                name: userProfile.displayName || "",
                photo_url: userProfile.pictureUrl || "",
                provider_id: "line",
              },
            ],
          },
          type: "update",
        });
        commit().then(() => {
          setLoading(false);
          window.alert("Login successfully.");
          liff.closeWindow();
        });
      })
      .catch((e) => {
        setLoading(false);
        window.alert("Something went wrong. Incorrect email or password.");
      });
  };

  return (
    <div className={className}>
      <div className="title">STAGE TRAINER</div>
      <form onSubmit={handleSubmit}>
        <Field label="Username" name="username" type="text" />
        <Field label="Password" name="password" type="password" />
        {/*<Field label="Name" name="email" type="text" />*/}
        <button className="btn-login">
          {loading ? <Spinner className="loader" /> : "LOGIN"}
        </button>
      </form>
    </div>
  );
};

const StyledLoginPage = styled(LoginPage)`
  background: rgb(29, 29, 29);
  height: 100vh;
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 40px);

  > .title {
    color: white;
    font-weight: bold;
    font-size: 36px;
    margin-top: 50px;
    border: 2px solid white;
    height: fit-content;
    padding: 10px;
    margin-bottom: 20px;
  }

  > form {
    width: calc(100% - 40px);
  }

  > form > .btn-login {
    background: rgb(255, 88, 0);
    padding: 10px 20px;
    font-size: 18px;
    font-weight: bold;
    border-radius: 5px;
    color: white;
    width: 100%;
    height: 50px;
    margin-top: 20px;
    border: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .loader,
    .loader:before,
    .loader:after {
      border-radius: 50%;
      width: 2.5em;
      height: 2.5em;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
      -webkit-animation: load7 1.8s infinite ease-in-out;
      animation: load7 1.8s infinite ease-in-out;
    }
    .loader {
      color: #ffffff;
      font-size: 5px;
      text-indent: -9999em;
      -webkit-transform: translateZ(0);
      -ms-transform: translateZ(0);
      transform: translateZ(0);
      -webkit-animation-delay: -0.16s;
      animation-delay: -0.16s;
      margin-top: -20px;
    }
    .loader:before,
    .loader:after {
      content: "";
      position: absolute;
      top: 0;
    }
    .loader:before {
      left: -3.5em;
      -webkit-animation-delay: -0.32s;
      animation-delay: -0.32s;
    }
    .loader:after {
      left: 3.5em;
    }
    @-webkit-keyframes load7 {
      0%,
      80%,
      100% {
        box-shadow: 0 2.5em 0 -1.3em;
      }
      40% {
        box-shadow: 0 2.5em 0 0;
      }
    }
    @keyframes load7 {
      0%,
      80%,
      100% {
        box-shadow: 0 2.5em 0 -1.3em;
      }
      40% {
        box-shadow: 0 2.5em 0 0;
      }
    }
  }
`;

const Spinner = styled.div``;

export { StyledLoginPage as LoginPage };
