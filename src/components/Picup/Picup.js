import React, { useState } from "react";
import { useParams } from "react-router";
import "./Picup.css";
import vehicleData from "./fakedata.json";

const Picup = () => {
  const { vehicleType } = useParams();
  const [search, setSearch] = useState([]);

  console.log(vehicleType, search);



  const handleSearch = (vehicleType) => {
    const vehicleAdd = [];
    // console.log("vehicleAdd ", vehicleAdd);
    const newAdd = vehicleData.filter((vh) => vh.vehicleType === vehicleType);

    const final = [...vehicleAdd, newAdd];
    // console.log("final", final);

    const singleVehicle = newAdd.map(vh=>vh);
    setSearch(singleVehicle);

    const {price,imgUrl} = singleVehicle[0];
    console.log(price,imgUrl);


  };

  return (
    <div>
      <div className="pic-part">
        <label>Pick from</label>
        <br />
        <input className="input-field" type="search" placeholder="Where to" />
        <br />
        <label>Pick to</label>
        <br />
        <input className="input-field" type="search" placeholder="Where to" />
        <br />
        <br />
        <button
          onClick={() => handleSearch(vehicleType)}
          className="search-btn"
        >
          Search
        </button>
         


        {search.map(vh=>
              <div class="search-result" style={{marginTop:'5px'}} >
                <div class="col-6"><img class="ticket-img" style={{width:'50px',height:'50px',marginBottom:'5px'}} src={vh.vehicleImg} alt=""/></div>
                <div class="col-6">
              <p>${vh.ticketPrice} </p></div>
              
              </div>)}









        
      </div>
    </div>
  );
};

export default Picup;
