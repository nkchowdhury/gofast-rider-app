import React, { useState } from "react";
import Header from "../Header/Header";
import "./Home.css";
import Image from "../../images/Bg.png";
import fakeData from "../../fakeData/fakeData.json"
import VehicleTypes from "../VehicleTypes/VehicleTypes";

const Home = () => {
    console.log(fakeData)
    

  const [vehicle,setVehicle] = useState([]);



  return (
    <div className="home-main">
    <div className="container">
    <Header></Header>

    </div>
      <div className="grid-container container">
        

        {
            fakeData.map (vehicle => <VehicleTypes vehicle={vehicle}> </VehicleTypes>  )
        }
        


      </div>
    </div>
  );
};

export default Home;
