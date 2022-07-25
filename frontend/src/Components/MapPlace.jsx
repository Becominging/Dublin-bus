import React, { useState } from "react";
import { GoogleMap, Marker, InfoWindow} from '@react-google-maps/api';
import { useGeolocated } from "react-geolocated";
import {Paper, Typography, useMediaQuery } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import CurrentLocationIcon from "../../src/data/current_location.png"
import stopIcon from "../../src/data/location.png"

const containerStyle = {
    width: '100%',
    height: '800px',
    position: 'relative',  
    display: 'flex'
  };



const MapPlace = ({ selectedPlace }) => {
    const center = {
        lat: Number(selectedPlace.latitude),
        lng: Number(selectedPlace.longitude)
      };
  const {
    coords,
    } = useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    })
  
  
  // State to Mouseover a stop
  const [hoverPlace, setHoverPlace] = useState("");

  return (
      
      <GoogleMap 
        mapContainerStyle={containerStyle}
        zoom={14}
        center={center}
      >
        {/* Displaying User or Device Position on Maps  */}
        {coords&&
          <Marker
            position={{
              lat: coords.latitude,
              lng: coords.longitude
            }}
            icon={{
              url: CurrentLocationIcon,
              scaledSize: new window.google.maps.Size(50, 50)
            }}  
          />
        }

        {/* Displaying Recommended Places on Maps  */}
        {selectedPlace && 
          <Marker
          
          position={{ lat: Number(selectedPlace.latitude), lng: Number(selectedPlace.longitude) }}
          onMouseOver={() => {
            setHoverPlace(selectedPlace);
            console.log("Hover Place:",selectedPlace) 
          }}
        //   onClick={() => {
        //     setSelectedPlace(place);
        //     console.log("Selected Place:",place) 
        //   }}
          icon={{
            url: stopIcon,
            scaledSize: new window.google.maps.Size(50, 50)
          }}                     
        />
        }              
          
          
       {/*  Display Info windows  */}
       {hoverPlace && 
          <InfoWindow
              onCloseClick={() => {
                setHoverPlace(null);
                }}
              position={{
                lat: Number(hoverPlace.latitude),
                lng: Number(hoverPlace.longitude)
              }}
              >
              
              <Paper >
              <Typography  variant='subtitle2' gutterBottom>
                {hoverPlace.name}
              </Typography>
              <img className="w-full h-10 object-center object-cover"    
                src={hoverPlace.photo ? hoverPlace.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                alt={hoverPlace.name}   
              />
              <Rating size="small" value={Number(hoverPlace.rating)} readOnly/>
            </Paper>   
                
          </InfoWindow>
        }
        
      </GoogleMap>

    
  
  );
};

export default React.memo(MapPlace) 