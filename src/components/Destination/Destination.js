import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import GoogleMap from '../GoogleMap/GoogleMap';
import Header from '../Header/Header';
import Picup from '../Picup/Picup';

const Destination = () => {

   const { vehicleType }  = useParams();


    return (
        <div style={{textAlign:'center'}} className="container">
        <Header></Header>
        <Row>
            <Col xs={12} md={12} lg={4}>
                <Picup></Picup>
            </Col>
            <Col xs={12} md={12} lg={8}>

            <GoogleMap></GoogleMap>

            </Col>
        </Row>
            
        </div>
    );
};

export default Destination;