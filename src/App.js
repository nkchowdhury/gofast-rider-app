import { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Blog from "./components/Blog/Blog";
import Contact from "./components/Contact/Contact";
import Destination from "./components/Destination/Destination";
import Home from './components/Home/Home';
import Login from "./components/Login/Login";
import NoMatch from "./components/NoMatch/NoMatch";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import VehicleDetails from "./components/VehicleDetails/VehicleDetails";


export const userContext = createContext();




function App() {




const [loggedInUser,setLoggedInUser] = useState({});



  return (

    <div className="app">
    

    <userContext.Provider value={[loggedInUser,setLoggedInUser]}> 
    
    <Router>

    <Switch>
      <Route path="/home">
      <Home></Home>

      </Route>
      <Route path="/login">
      <Login></Login>
      </Route>
      <PrivateRoute path="/destination/:vehicleType">
      <Destination></Destination>

      </PrivateRoute>

      <PrivateRoute path="/destination">
      <Destination></Destination>

      </PrivateRoute>
      
      <Route path="/blog">
      <Blog></Blog>

      </Route>
      <Route path="/contact">
      <Contact></Contact>

      </Route>
      <Route exact path="/">
      <Home></Home>

      </Route>
      <Route path="*">
      <NoMatch></NoMatch>
    

      </Route>
    </Switch>



    </Router>




    </userContext.Provider>

    </div>
    

 

  );
}

export default App;
