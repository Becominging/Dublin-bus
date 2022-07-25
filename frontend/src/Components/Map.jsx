import React from "react";
import { GoogleMap, useJsApiLoader, Marker, Polyline} from '@react-google-maps/api';
import { useGeolocated } from "react-geolocated";
import CurrentLocationIcon from "../../src/data/current_location.png"

const containerStyle = {
  width: '100%',
  height: '800px',
  position: 'relative',  
  display: 'flex'
};


function Map() {
  // const { isLoaded } = useJsApiLoader({
  //   id: 'google-map-script',
  //   googleMapsApiKey: "AIzaSyAPFUKh9yhgAoe5r0bcJ2CXyLZM2MBKMVU"
  // })

  const {
    coords,
    } = useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    })

    const center = {
      lat: coords&&coords.latitude,
      lng: coords&&coords.longitude
    };
 
  return (  
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
      > 

        { /* Child components, such as markers, info windows, etc. */ }
        {/* Displaying User or Device Position on Maps  */}
        {coords&&
          <Marker
            position={{
              lat: Number(coords.latitude),
              lng: Number(coords.longitude)
            }}
            icon={{
              url: CurrentLocationIcon,
              scaledSize: new window.google.maps.Size(50, 50)
            }}  
          />
        }

      </GoogleMap>
  )
}

export default React.memo(Map) 