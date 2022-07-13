import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow} from '@react-google-maps/api';
import stopsData from "../data/stops.json";

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
  const [map, setMap ] = React.useState(null)
  const onLoad = React.useCallback(function callback(map) {const bounds = new window.google.maps.LatLngBounds(center); map.fitBounds(bounds); setMap(map)}, [])
  const onUnmount = React.useCallback(function callback(map) {setMap(null)}, [])
  const [selectedStop, setSelectedStop] = useState(null);
 
  useEffect(() => {
        const listener = e => {
          if (e.key === "Escape") {
            setSelectedStop(null);
          }
        };
        window.addEventListener("keydown", listener);
    
        return () => {
          window.removeEventListener("keydown", listener);
        };
      }, []);
 
  return isLoaded ? (  
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
    
        {
            stopsData.RECORDS.map(stop => (
                    
                    <Marker
                      key={stop.stop_id}
                      position={{
                        lat: stop.stop_lat,
                        lng: stop.stop_lon
                      }}
                      
                      onClick={() => {
                        setSelectedStop(stop);
                        console.log("Selected Stop:",selectedStop) 
                      }}
                      icon={{
                        url: ".src/data/location.png",
                        scaledSize: new window.google.maps.Size(25, 25)
                      }}
                    />
                  ))}
            
                 {/* {selectedStop && (
                    <InfoWindow
                      onCloseClick={() => {
                        setSelectedStop(null);
                      }}
                      position={{
                        lat: stop.stop_lat,
                        lng: stop.stop_lon
                      }}
                    >
                      <div>
                        <h2>"info"</h2>
                        <p></p>
                      </div>
                    </InfoWindow>
                  )} */}
                    
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(Map)