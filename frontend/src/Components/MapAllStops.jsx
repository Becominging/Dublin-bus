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


const MapAllStops= ({ setSelectedStop }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAPFUKh9yhgAoe5r0bcJ2CXyLZM2MBKMVU"
  })
  console.log("All Stops:",stopsData)


  // State to Mouseover a stop
  const [hoverStop, setHoverStop] = useState("");
  
  // useEffect(() => {
  //       const listener = e => {
  //         if (e.key === "Escape") {
  //           setSelectedStop(null);
  //         }
  //       };
  //       window.addEventListener("keydown", listener);

  //       return () => {
  //         window.removeEventListener("keydown", listener);
  //       };
  //     }, []);

  return isLoaded ? (  
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}  
      >
        { /* Child components, such as markers, info windows, etc. */ }

        {stopsData.RECORDS.map(stop => (

            <Marker
              key={stop.stop_id}
              position={{
                lat: stop.stop_lat,
                lng: stop.stop_lon
              }}
              onMouseOver={() => {
                setHoverStop(stop);
                console.log("Hover Stop:",stop) 
              }}
              onClick={() => {
                setSelectedStop(stop);
                console.log("Selected Stop:",stop) 
              }}
              icon={{
                url: stopIcon,
                scaledSize: new window.google.maps.Size(15, 15)
              }}                     
            />
                            
          ))}

        {hoverStop && 
          <InfoWindow
              onCloseClick={() => {
                hoverStop(null);
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

export default React.memo(MapAllStops) 