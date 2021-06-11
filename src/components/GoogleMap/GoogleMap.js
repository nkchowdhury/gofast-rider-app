import React from 'react';
import {GoogleApiWrapper} from 'google-maps-react';
import googleImage  from '../../images/map.jpg';
import './GoogleMap.css'

const GoogleMap = () => {
    return (
        <div>
         
         <div className="map-part">
         <img className="map-img" src={googleImage} alt="googleImage" />
         </div>


        </div>
    );
};

export default GoogleMap;