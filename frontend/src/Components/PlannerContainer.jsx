import React, { useState } from 'react'
import useFetch from "../useFetch.js";
import ComboboxLines from './ComboboxLines'
import MainPlanner from './MainPlanner'

// This component is the main component for the planner section.
// The subcomponents are called from this component
export default function PlannerContainer() {
    // Get the data from the provider
    const { data: lines, loading, error } = useFetch("http://127.0.0.1:8000/lines/");
    
    // This state controls if a line has been selected before displayingthe planner system
    const [selectedLine, setSelectedLine] = useState();
    console.log("Selected Line:", selectedLine) 
    // Error handling when fetching the data
    // if (error) return <CustomError height="60" message="Unable to fetch the data" />;

    // Wait for the data
    // if (loading) return <Waiting size={80} thickness={3} />;

    // if (!lines) return "";

    return (
    <div>
      {/* Combobox for selecting the line */}
      {!selectedLine && <div>
        <ComboboxLines lines={lines} setSelectedLine={setSelectedLine} />
      </div>}
      {/* Display the main part of the planner */}
      {selectedLine && <MainPlanner selectedLine={selectedLine} setSelectedLine={setSelectedLine} />}
    </div>
  )
}