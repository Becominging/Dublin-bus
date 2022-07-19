import React from "react";
import { GoogleMap, useJsApiLoader, Marker} from '@react-google-maps/api';
import stopIcon from "../../src/data/location.png"

const containerStyle = {
  width: '100%',
  height: '800px',
  position: 'relative',  
  display: 'flex'
};

// const center = {
//     lat: 53.3501,
//     lng: -6.2661
//   };

const MapStop= ({ selectedStop }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAPFUKh9yhgAoe5r0bcJ2CXyLZM2MBKMVU"
  })
  
  const center = {
    lat: selectedStop['stop_lat'],
    lng: selectedStop['stop_lon']
  };

  return isLoaded ? (  
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={16}
      > 

        { /* Child components, such as markers, info windows, etc. */ }       
        <Marker
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
        />
                
      </GoogleMap>
  ) : <></>
}

export default React.memo(MapStop) 