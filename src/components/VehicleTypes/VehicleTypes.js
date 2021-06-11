import React from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router";
import './VehiclesTypes.css'

const VehicleTypes = (props) => {
    console.log(props.vehicle.vehicleType)

   const {vehicleType,img} = props.vehicle;
    const history = useHistory();

    const handleVehicleTypes = () => { 

     history.push(`/destination/${vehicleType}`)
    } 



  return (
    <div>

      <Card  onClick={() => handleVehicleTypes(vehicleType) } className="card-style">
        <Card.Img  className="img-card"  variant="top" src={img} />
        <Card.Body>
          <Card.Title>{vehicleType}</Card.Title>
          
        </Card.Body>
      </Card>
    </div>
  );
};

export default VehicleTypes;
