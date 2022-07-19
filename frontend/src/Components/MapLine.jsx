import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker, Polyline} from '@react-google-maps/api';
import useFetch from "./useFetch.js";
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

// Options for the polyline
const options = {
  strokeColor: '#339900',
  strokeOpacity: 1,
  strokeWeight: 5
};

const MapLine= ({ selectedLine }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAPFUKh9yhgAoe5r0bcJ2CXyLZM2MBKMVU"
  })

  // State to handle the path of the line
  const [path, setPath] = useState();

  // Get the data from the backend
  const {data: shape, loading:loading_shape, error:error_shape} = useFetch("http://127.0.0.1:8000/shape_of_trip/"+ selectedLine['trip_id']+'/')
  const { data: stops, loading:loading_stops, error:error_stops } = useFetch("http://127.0.0.1:8000/stops_in_trip/"+ selectedLine['trip_id']+'/')
  console.log("Trip ID for Makers:",selectedLine['trip_id'])
  console.log("Shape for Makers:",shape)
  console.log("Stops for Makers:",stops)

  // Get the line path
  useEffect(() => {
    if (shape) {
      // Set the path
      const points = shape.map((point) => {
        return { lat: point.shape_pt_lat, lng: point.shape_pt_lon };
      });
     setPath(points);
    }

}, [shape]);
 
  return isLoaded ? (  
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      > 

        { /* Child components, such as markers, info windows, etc. */ }
          
          {/* Display the line path*/}
          <Polyline
            options={options}
            path={path}
            // onLoad={centerMap}
          />

          {/* Display the stops in that line */}
          {stops&&stops.map((stop) => {
            return(
              <Marker
                position={{
                  lat: stop['stop_lat'],
                  lng: stop['stop_lon']
                }}
                onClick={() => {
                        // setSelectedStop(stop);
                  console.log("Selected stop:",stop) 
                }}
                icon={{
                  url: stopIcon,
                  scaledSize: new window.google.maps.Size(15, 15)
                }}
              />
            )
          })}
         
      </GoogleMap>
  ) : <></>
}

export default React.memo(MapLine) 