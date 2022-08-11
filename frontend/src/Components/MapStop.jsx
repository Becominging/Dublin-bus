import React, { useState } from "react";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api'
import { useGeolocated } from "react-geolocated"
import stopIcon from "../../src/data/location.png"
import CurrentLocationIcon from "../../src/data/current_location.png"


const containerStyle = {
  width: '100%',
  height: '800px',
  position: 'relative',  
  display: 'flex'
};

const MapStop= ({ selectedStop }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAPFUKh9yhgAoe5r0bcJ2CXyLZM2MBKMVU"
  })
  
  const center = {
    lat: selectedStop['stop_lat'],
    lng: selectedStop['stop_lon']
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
  const [hoverStop, setHoverStop] = useState("")

  return isLoaded ? (  
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={16}
      > 

        { /* Child components, such as markers, info windows, etc. */ }       
        
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
        
        
        {selectedStop&&<Marker
          position={{
            lat: selectedStop['stop_lat'],
            lng: selectedStop['stop_lon']
          }}
          onMouseOver={() => {
            setHoverStop(selectedStop);
            console.log("Hover Stop:",selectedStop) 
          }}
          onClick={() => {
            // setSelectedStop(stop);
            console.log("Selected stop:",selectedStop) 
          }}
          icon={{
            url: stopIcon,
            scaledSize: new window.google.maps.Size(40, 40)
          }}
        />}

        {/*  Display Info windows  */}
        {hoverStop && 
          <InfoWindow
              onCloseClick={() => {
                setHoverStop(null);
                }}
              position={{
                lat: hoverStop.stop_lat+0.00004,
                lng: hoverStop.stop_lon
              }}
              >
              <div>
                <h2>{hoverStop['stop_name']}</h2>
                </div>
          </InfoWindow>
        }

      </GoogleMap>
  ) : <></>
}

export default React.memo(MapStop) 