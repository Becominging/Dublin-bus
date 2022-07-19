import React, { useState } from 'react'
import useFetch from "./useFetch.js";
import ComboboxLines from './ComboboxLines'
import MainPlanner from './MainPlanner'


export default function PlannerContainer() {
    // Get the data from backend
    const { data: lines, loading, error } = useFetch("http://127.0.0.1:8000/lines/");
    
    // This state controls if a line has been selected before displayingthe main planner
    const [selectedLine, setSelectedLine] = useState();
    console.log("Selected Line:", selectedLine) 
   

    return (
    <div>
      {/* Combobox for selecting the line */}
      {!selectedLine &&
        <ComboboxLines lines={lines} setSelectedLine={setSelectedLine} />
      }
      {/* Display the main part of the planner */}
      {selectedLine && <MainPlanner selectedLine={selectedLine} setSelectedLine={setSelectedLine} />}
    </div>
  )
}