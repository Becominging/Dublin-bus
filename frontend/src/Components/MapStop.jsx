import React from "react"
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
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
          onClick={() => {
            // setSelectedStop(stop);
            console.log("Selected stop:",selectedStop) 
          }}
          icon={{
            url: stopIcon,
            scaledSize: new window.google.maps.Size(40, 40)
          }}
        />}
                
      </GoogleMap>
  ) : <></>
}

export default React.memo(MapStop) 