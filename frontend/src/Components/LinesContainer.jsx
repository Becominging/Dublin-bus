import React from 'react'
import { useState } from "react";
import useFetch from "./useFetch.js";
import Lines from '../Components/Lines'
import MapLine from './MapLine'
import MapAllStops from './MapAllStops';

function LinesContainer() {

  // State to select a line
  const [selectedLine, setSelectedLine] = useState("");

  // Get the data from backend
  const { data: lines, loading, error } = useFetch("http://127.0.0.1:8000/lines/");
  return (
    <>        
     {/* Primary column */}
     <main className="overflow-y-auto w-96">
       <section aria-labelledby="primary-heading" className="min-w-0 flex-1 h-full flex flex-col lg:order-last">
       <Lines lines={lines} selectedLine={selectedLine} setSelectedLine={setSelectedLine}/>
       </section>
     </main>

     {/* Secondary column (hidden on smaller screens) */}
     <aside className="hidden w-full bg-white border-l border-gray-200 overflow-y-auto lg:block">
       <div className="flex w-full items-stretch overflow-hidden">
         {!selectedLine&&<MapAllStops/>}  
         {selectedLine&&<MapLine selectedLine={selectedLine}/>}
       </div>  
     </aside>
   
   </>
  )
}

export default LinesContainer