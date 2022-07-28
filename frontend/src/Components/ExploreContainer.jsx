import React from 'react'
import { useState, useEffect } from "react";
import getPlacesData from "../Components/PlacesProvider";
import Explore from '../Components/Explore'
import MapAllPlaces from './MapAllPlaces';


function ExploreContainer() {

    const [places, setPlaces] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [coordinates, setCoorodinates] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState(0);
    // State to select a place
    const [selectedPlace, setSelectedPlace] = useState("");

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(( {coords: {latitude, longitude}}) => {
            setCoorodinates({lat: latitude, lng: longitude});
        })
    },[]);


    useEffect(() => {
        const filtered = places.filter((place) => Number(place.rating) > rating);
    
        setFilteredPlaces(filtered);
      }, [rating]);

    useEffect(() => {
        setIsLoading(true);
        getPlacesData(type, coordinates.lat, coordinates.lng)
        .then((data) => { 
            setPlaces(data?.filter((place) => place.name && place.num_reviews>0));
            setFilteredPlaces([]);
            setIsLoading(false);
        });  
    }, [type, coordinates]);


  return (
    <>        
     {/* Primary column */}
     <main className="overflow-y-auto w-96">
       <section aria-labelledby="primary-heading" className="min-w-0 flex-1 h-full flex flex-col lg:order-last">
       <Explore 
        places={filteredPlaces.length ? filteredPlaces : places}
        isLoading={isLoading}
        type={type}
        setType={setType}
        rating={rating}
        setRating={setRating}
        selectedPlace={selectedPlace}
        setSelectedPlace={setSelectedPlace}
       />
       </section>
     </main>

     {/* Secondary column (hidden on smaller screens) */}
     <aside className="hidden w-full bg-white border-l border-gray-200 overflow-y-auto lg:block">
       <div className="flex w-full items-stretch overflow-hidden">
        
        <MapAllPlaces 
        setSelectedPlace={setSelectedPlace}
        selectedPlace={selectedPlace}
        coordinates={coordinates}
        places={filteredPlaces.length ? filteredPlaces : places}
        /> 
        
       </div>  
     </aside>
   
   </>
  )
}

export default ExploreContainer