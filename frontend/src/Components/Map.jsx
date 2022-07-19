import React from "react";
import { GoogleMap, useJsApiLoader, Marker, Polyline} from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '800px',
  position: 'relative',  
  display: 'flex'
};

const center = {
    lat: 53.3501,
    lng: -6.2661
  };

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAPFUKh9yhgAoe5r0bcJ2CXyLZM2MBKMVU"
  })

 
  return isLoaded ? (  
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
      > 

        { /* Child components, such as markers, info windows, etc. */ }
                
      </GoogleMap>
  ) : <></>
}

export default React.memo(Map) 