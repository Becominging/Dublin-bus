import React, { useState, useEffect } from "react"
import { GoogleMap, Marker, Polyline, InfoWindow, useJsApiLoader } from '@react-google-maps/api'
import { useGeolocated } from "react-geolocated"
import useFetch from "./useFetch.js"
import stopIcon from "../../src/data/bus_stop.png"
import CurrentLocationIcon from "../../src/data/current_location.png"


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

const MapLine = ({ selectedLine, origin, destination }) => {
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

  // State to handle the path of the line
  const [path, setPath] = useState();
  // State to Mouseover a stop
  const [hoverStop, setHoverStop] = useState("");

  // Get the data from the backend
  const { data: shape, loading: loading_shape, error: error_shape } = useFetch("http://ec2-54-170-219-111.eu-west-1.compute.amazonaws.com:8000/shape_of_trip/" + selectedLine['trip_id'] + '/')
  const { data: stops, loading: loading_stops, error: error_stops } = useFetch("http://ec2-54-170-219-111.eu-west-1.compute.amazonaws.com:8000/stops_in_trip/" + selectedLine['trip_id'] + '/')
  //   console.log("Trip ID for Makers:",selectedLine['trip_id'])
  //   console.log("Shape for Makers:",shape)
  //   console.log("Stops for Makers:",stops)
  //   console.log("Path:",path)
  //   console.log("Origin:",origin)


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

      { /* Child components, such as markers, info windows, etc. */}
      {/* Displaying User or Device Position on Maps  */}
      {coords &&
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

      {/* Display the line path*/}
      {<Polyline
        options={options}
        path={path}
      // onLoad={centerMap}
      />}

      {/* Display the stops in that line */}
      {stops && stops.map((stop) => {
        return (
          <Marker
            position={{
              lat: stop['stop_lat'],
              lng: stop['stop_lon']
            }}
            onMouseOver={() => {
              setHoverStop(stop);
              console.log("Hover Stop:", stop)
            }}
            onClick={() => {
              // setSelectedStop(stop);
              console.log("Selected stop:", stop)
            }}
            icon={{
              url: stopIcon,
              scaledSize: new window.google.maps.Size(15, 15)
            }}
          />
        )
      })}


      {/* Display the origin stop in that line */}
      {origin &&
        <Marker
          position={{
            lat: origin['stop_lat'],
            lng: origin['stop_lon']
          }}
          onMouseOver={() => {
            setHoverStop(origin);
            console.log("Hover Stop:", origin)
          }}
          onClick={() => {
            // setSelectedStop(stop);
            console.log("Selected stop:", origin)
          }}
          icon={{
            url: stopIcon,
            scaledSize: new window.google.maps.Size(30, 30)
          }}
        />
      }

      {/* Display the destination stop in that line */}
      {destination &&
        <Marker
          position={{
            lat: destination['stop_lat'],
            lng: destination['stop_lon']
          }}
          onMouseOver={() => {
            setHoverStop(destination);
            console.log("Hover Stop:", destination)
          }}
          onClick={() => {
            // setSelectedStop(stop);
            console.log("Selected stop:", destination)
          }}
          icon={{
            url: stopIcon,
            scaledSize: new window.google.maps.Size(30, 30)
          }}
        />
      }

      {hoverStop &&
        <InfoWindow
          onCloseClick={() => {
            setHoverStop(null);
          }}
          position={{
            lat: hoverStop.stop_lat + 0.00004,
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

export default React.memo(MapLine)