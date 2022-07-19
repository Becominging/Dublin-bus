import React from 'react'
import { useState } from "react";
import useFetch from "./useFetch.js";
import MapAllStops from './MapAllStops';
import Stops from './Stops.jsx';
import MapStop from './MapStop.jsx';

function StopsContainer() {
  // State to select a stop
  const [selectedStop, setSelectedStop] = useState("");

  // Get the data from backend
  const { data: stops, loading, error } = useFetch("http://127.0.0.1:8000/stops/");

  return (
    <>        
     {/* Primary column */}
     <main className="overflow-y-auto w-96">
       <section aria-labelledby="primary-heading" className="min-w-0 flex-1 h-full flex flex-col lg:order-last">
       <Stops stops={stops} selectedStop={selectedStop} setSelectedStop={setSelectedStop}/>
       </section>
     </main>

     {/* Secondary column (hidden on smaller screens) */}
     <aside className="hidden w-full bg-white border-l border-gray-200 overflow-y-auto lg:block">
       <div className="flex w-full items-stretch overflow-hidden">
         {!selectedStop&&<MapAllStops setSelectedStop={setSelectedStop}/>}  
         {selectedStop&&<MapStop selectedStop={selectedStop}/>}
       </div>  
     </aside>
     
   </>
  )
}

export default StopsContainer