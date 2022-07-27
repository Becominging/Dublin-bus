import React, { useState } from "react"
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api'
import { useGeolocated } from "react-geolocated"
import {Paper, Typography } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import CurrentLocationIcon from "../../src/data/current_location.png"
import placeIcon from "../../src/data/place.png"

const containerStyle = {
    width: '100%',
    height: '800px',
    position: 'relative',  
    display: 'flex'
  };


const MapAllPlaces = ({ setSelectedPlace, selectedPlace, coordinates, places}) => {

  console.log("Map Center:",coordinates)

  const { isLoaded } = useJsApiLoader({  
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAPFUKh9yhgAoe5r0bcJ2CXyLZM2MBKMVU"
  })

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

  return isLoaded ? (
      
      <GoogleMap 
        mapContainerStyle={containerStyle}
        zoom={14}
        center={coordinates}
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
        {places && places.map((place, i) =>(
          <Marker
          key={i}
          position={{ lat: Number(place.latitude), lng: Number(place.longitude) }}
          onMouseOver={() => {
            setHoverPlace(place);
            console.log("Hover Place:",place) 
          }}
          onClick={() => {
            setSelectedPlace(place);
            console.log("Selected Place:",place) 
          }}
          icon={{
            url: placeIcon,
            scaledSize: new window.google.maps.Size(35, 35)
          }}                     
        />
                        
      ))}
          
          
       {/*  Display Info windows  */}
       {hoverPlace && 
          <InfoWindow
              onCloseClick={() => {
                setHoverPlace(null);
                setSelectedPlace(null);
                }}
              position={{
                lat: Number(hoverPlace.latitude),
                lng: Number(hoverPlace.longitude)
              }}
              >
              
              <Paper >
                <img className="w-full h-10 object-center object-cover"    
                  src={hoverPlace.photo ? hoverPlace.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                  alt={hoverPlace.name}   
                />
                <Typography  variant='subtitle2'>
                  {hoverPlace.name}
                </Typography>
                <div className="flex items-start">
                  <Rating size="small" value={Number(hoverPlace.rating)} readOnly precision={0.5}/>
                  <Typography variant="caption" className="pt-0.5 pl-3">{hoverPlace.num_reviews} review{hoverPlace.num_reviews > 1 && 's'}</Typography>
                </div>
            </Paper>   
                
          </InfoWindow>
        }
        
      </GoogleMap>
  ) : <></>
}

export default React.memo(MapAllPlaces) 