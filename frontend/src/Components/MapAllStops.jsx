import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow} from '@react-google-maps/api';
import stopsData from "../data/stops.json";
import stopIcon from "../../src/data/bus_stop.png"

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


function MapAllStops() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAPFUKh9yhgAoe5r0bcJ2CXyLZM2MBKMVU"
  })
  const [map, setMap ] = React.useState(null)
  const onLoad = React.useCallback(function callback(map) {const bounds = new window.google.maps.LatLngBounds(center); map.fitBounds(bounds); setMap(map)}, [])
  const onUnmount = React.useCallback(function callback(map) {setMap(null)}, [])
  const [selectedStop, setSelectedStop] = useState(null);
  console.log("All Stops:",stopsData)

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
        zoom={14}
        // onLoad={onLoad}
        // onUnmount={onUnmount}
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
                        url: stopIcon,
                        scaledSize: new window.google.maps.Size(15, 15)
                      }}
                    />
                  ))}

                  
      </GoogleMap>
  ) : <></>
}

export default React.memo(MapAllStops) 