import React, { useContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import firebaseConfig from "./firebase.config";
import "./Login.css";
import { userContext } from "../../App";
import Header from "../Header/Header";
import { useHistory, useLocation } from "react-router";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const Login = () => {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    photo: "",
    email: "",
    password: "",
    error: "",
    confirmPassword:"",
    success: false,
  });

  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const history = useHistory();
  const location = useLocation();

  var googleProvider = new firebase.auth.GoogleAuthProvider();
  var fbProvider = new firebase.auth.FacebookAuthProvider();

  let { from } = location.state || { from: { pathname: "/" } };

  const handleSignInWithGoogle = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((res) => {
        const { displayName, photoURL, email } = res.user;
        const signInUser = {
          isSignedIn: true,
          name: displayName,
          photo: photoURL,
          email: email,
        };
        setUser(signInUser);
        setLoggedInUser(signInUser);
        history.replace(from);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
  };




  const handleSignInWithFb = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        var credential = result.credential;
        var accessToken = credential.accessToken;
        var user = result.user;
        console.log(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
  };



  const handleBlur = (e) => {
    console.log(e.target.name, e.target.value);
    let isFieldValid;
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length >= 6;
      const hasPasswordNum = /\d{1,}/.test(e.target.value);
      isFieldValid = isPasswordValid && hasPasswordNum;
    }

    if(e.target.name === "confirmPassword"){

      const isReConfirm = e.target.value.length > 6;
      const isRePass = /\d{1}/.test(e.target.value);
      isFieldValid = isReConfirm && isRePass;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };


  const handleSubmit = (e) => {
    if (newUser && user.email && user.password === user.confirmPassword) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }


    if (!newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          console.log(newUserInfo);
          history.replace(from);
          console.log("sign in user info", res.user);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
          console.log(newUserInfo);
        });
    }

    e.preventDefault();
  };


  const updateUserName = (name) => {
    const user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: name,
      })
      .then((res) => {
        console.log("user Updated successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };


  
  return (
    <div style={{ textAlign: "center" }} className="container">
      <Header></Header>
      {/* {user.isSignedIn && (
        <div>
          <p>Welcome,{user.name}</p>
          <p>{user.email}</p>
        </div>
      )} */}

      <Row>
        <Col></Col>
        <Col className="form-part" xs={7}>
          <h3>Registering to this website!</h3>

          <p style={{ color: "red" }}>{user.error}</p>

          {user.success && (
            <p style={{ color: "green" }}>
              {" "}
              account {newUser ? "created" : "logged in"} successfully
            </p>
          )}

          <Form onSubmit={handleSubmit}>
            <input
              type="checkbox"
              onChange={() => setNewUser(!newUser)}
              name="newUser"
            />
            <label for="newUser">New Sign up</label>

           
             <br />
             <br />
            {newUser && (
              <Form.Group controlId="formBasicName">
                {/* <Form.Label>Your Name</Form.Label> */}
                <Form.Control
                  onBlur={handleBlur}
                  name="name"
                  required
                  type="name"
                  placeholder="Your Name"
                />
              </Form.Group>
            )}

            <Form.Group controlId="formBasicEmail">
              {/* <Form.Label className="form-label">Email address</Form.Label> */}
              <Form.Control
                onBlur={handleBlur}
                name="email"
                required
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              {/* <Form.Label>Password</Form.Label> */}
              <Form.Control
                onBlur={handleBlur}
                name="password"
                required
                type="password"
                placeholder="Password"
              />
            </Form.Group>
           { newUser &&
              <Form.Group controlId="formBasicPassword">
              {/* <Form.Label>Password</Form.Label> */}
              <Form.Control
                onBlur={handleBlur}
                name="confirmPassword"
                required
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Group>}
            <button className="btn-form" type="submit">
              {newUser ? "Sign Up" : "Sign In"}
            </button>
          </Form>

          <spain className="spain-form"></spain>
          <b className="or">or</b>
          <spain className="spain-form"></spain>
          <br />
          <br />
          <p>with your social network</p>
          <button className="btn-social" onClick={handleSignInWithGoogle}>
            Continue with google
          </button>
          <br />
          <button className="btn-social" onClick={handleSignInWithFb}>
          Continue with facebook
          </button>
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
};

export default Login;
