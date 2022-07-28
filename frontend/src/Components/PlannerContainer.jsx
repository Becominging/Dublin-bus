import React, { useState, useEffect } from 'react'
import useFetch from "./useFetch.js";
import ComboboxLines from './ComboboxLines'
import MainPlanner from './MainPlanner'
import MapAllStops from '../Components/MapAllStops'
import MapLine from '../Components/MapLine'


export default function PlannerContainer() {
    const [coordinates, setCoorodinates] = useState({});
  
    // Get the data from backend
    const { data: lines, loading, error } = useFetch("http://127.0.0.1:8000/lines/");
    
    // This state controls if a line has been selected before displayingthe main planner
    const [selectedLine, setSelectedLine] = useState();
    console.log("Selected Line:", selectedLine) 

    // States for the different fields the user has to enter 
    const [origin, setOrigin] = useState();
    const [destination, setDestination] = useState();

    useEffect(() => {
      navigator.geolocation.getCurrentPosition(( {coords: {latitude, longitude}}) => {
          setCoorodinates({lat: latitude, lng: longitude});
      })
  },[]);

    return (
      <>
      {/* Primary column */}
      <main className="overflow-y-auto w-96">
        <section aria-labelledby="primary-heading" className="min-w-0 flex-1 h-full flex flex-col lg:order-last">
          { loading && <div>{loading}</div> }

          {/* Combobox for selecting the line */}
          {lines && !selectedLine && 
            <div className="w-full flex flex-col items-center space-y-8 sm:items-end p-2">
              <div className="max-w-sm mx-auto w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="p-2">
                  {!selectedLine && <ComboboxLines lines={lines} setSelectedLine={setSelectedLine} />}
                </div>
              </div>
            </div>
          }  
          
          {/* Display the main part of the planner */}
          {selectedLine && <MainPlanner selectedLine={selectedLine} setSelectedLine={setSelectedLine} origin={origin} setOrigin={setOrigin} destination={destination} setDestination={setDestination} />}
        </section>
      </main>

      {/* Secondary column (hidden on smaller screens) */}
      <aside className="hidden w-full bg-white border-l border-gray-200 overflow-y-auto lg:block">
        <div className="flex w-full items-stretch overflow-hidden">
          {!selectedLine&&<MapAllStops coordinates={coordinates}/>}  
          {/* {selectedLine&&<MapLine selectedLine={selectedLine}/>} */}
          {selectedLine&&<MapLine selectedLine={selectedLine} origin={origin} destination={destination}/>}
        </div>  
      </aside>
      </>

    // <div>
    //   {/* Combobox for selecting the line */}
    //   {!selectedLine &&
    //     <ComboboxLines lines={lines} setSelectedLine={setSelectedLine} />
    //   }
    //   {/* Display the main part of the planner */}
    //   {selectedLine && <MainPlanner selectedLine={selectedLine} setSelectedLine={setSelectedLine} />}
    // </div>
  )
}