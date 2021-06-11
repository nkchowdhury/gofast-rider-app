import firebase from "firebase/app";
import "firebase/auth";
import { useContext, useState } from 'react';
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../App";
import firebaseConfig from "../../firebase.config";
import './Login.css'


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);  
 }else {
    firebase.app(); // if already initialized, use that one
 }






function Login() {

   const[newUser, setNewUser] = useState(false);
   const [user,setUser] = useState({

    isSignedIn: false,
    name:'',
    photo:'',
    email:'',
    error:''

  });




const [loggedInUser,setLoggedInUser] = useContext(UserContext);
const history = useHistory();
const location = useLocation();

let { from } = location.state || { from: { pathname: "/" } };

 const googleProvider = new firebase.auth.GoogleAuthProvider();
 const fbProvider = new firebase.auth.FacebookAuthProvider();

  const handleSignIn = () => {

    firebase.auth().signInWithPopup(googleProvider)


    .then(res => {
      const {displayName,photoURL,email} = res.user;
       const signedInUser ={
         isSignedIn:true,
         name:displayName,
         photo:photoURL,
         email:email

       }

      setUser(signedInUser);
      console.log(displayName, photoURL, email);

    })

    .catch(err => {
      console.log(err);
      console.log(err.message)
    })


  }

const handleFbSignIn = () => {

  firebase.auth().signInWithPopup(fbProvider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // The signed-in user info.
    const user = result.user;

    

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var accessToken = credential.accessToken;

    console.log('fb user after sign in', user);
    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

    // ...
  });

}



  const handleSignOut = () => {

    firebase.auth().signOut()
    .then(res => {
      const signOutUser={
        isSignedIn: false,
        name:'',
        photo: '',
        password:'',
        email: '',
        success:false,

      }
     
    setUser(signOutUser)

    })
    .catch(err => {
      console.log(err)


    })


  }


const handleBlur = (event) => {

 let isFieldValid = true;

  if( event.target.name === "email"){

    isFieldValid = /\S+@\S+\.\S+/.test(event.target.value)

  }

  if( event.target.name === "password"){
    const isPasswordValid = event.target.value.length >= 6;
    const hasPasswordNum = /\d{1,}/.test(event.target.value)
    isFieldValid = isPasswordValid && hasPasswordNum;
  }

  if (isFieldValid){
    const newUserInfo = {...user};
    newUserInfo [event.target.name] = event.target.value;
    setUser(newUserInfo);
  }
}


const handleSubmit = (event) => {
  
  // console.log(user.email, user.password);
  if(newUser && user.email && user.password){
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    // ...
  })
  .then(res =>{
    const newUserInfo = {...user}
    newUserInfo.error = '';
    newUserInfo.success = true;
    setUser(newUserInfo);
    updateUserName (user.name)
    // updateUserName(user.name);
  })
  .catch(error => {
    const newUserInfo = {...user}
    newUserInfo.error = error.message;
    newUserInfo.success = false;
    setUser(newUserInfo)
    
  });

  }





  if(!newUser && user.email && user.password){

  firebase.auth().signInWithEmailAndPassword(user.email, user.password)
  // .then((userCredential) => {
  //   var user = userCredential.user;
  // })

  .then(res =>{
    const newUserInfo = {...user}
    newUserInfo.error = '';
    newUserInfo.success = true;
    setUser(newUserInfo);
    setLoggedInUser(newUserInfo);
    history.replace(from);
    console.log('sign in user info', res.user)
    // console.log("sign in user info",  res.user)
  })
  .catch((error) => {
    const newUserInfo = {...user}
    newUserInfo.error = error.message;
    newUserInfo.success = false;
    setUser(newUserInfo)
  });

  }

  event.preventDefault();
}


const updateUserName = name => {

  var user = firebase.auth().currentUser;

  user.updateProfile({
    displayName: name
  }).then(function() {
    console.log('Update successfully')
  }).catch(function(error) {
    console.log(error)
  });

}


  return (
    <div className="login-container">

            {
              user.isSignedIn ? <button onClick={handleSignOut}>Sign out</button> :
               <button onClick={handleSignIn}>Sign in with google</button>
            }

            <br/>

            <button onClick={handleFbSignIn}>Sign in with facebook</button>
            {
              user.isSignedIn && 
              <div> 

              <p>Welcome,{user.name}</p>
              <p>{user.email}</p>
              </div>
            }
            <br/>
            <input type="checkbox"  onChange={() => setNewUser(!newUser)} name="newUser"  id="" />
            <label htmlFor="newUser">New User Sign Up</label>            
             <form onSubmit={handleSubmit}>

             {newUser && <input type="text" name="name" onBlur={handleBlur}   placeholder="Enter your name" />}
             <br/>
             <input type="text" name="email" onBlur={handleBlur}  required placeholder="Enter your email" />
             <br/>

            <input type="password" name="password" onBlur={handleBlur} required placeholder="Enter pasword" />
            <br/>
            <input type="submit" value={newUser ? 'Sign up' : 'Sign in'} />
             </form>

             <p style={{color: 'red'}}> {user.error}</p>

            {
              user.success &&  <p style={{color: 'green'}}>  account {newUser ? 'created' : 'loggedIn'} successfully</p>
            }
               
           
   
    </div>
  );
}

export default Login;
