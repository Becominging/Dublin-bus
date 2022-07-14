import { useState } from "react";
import useFetch from "./useFetch.js";
import ComboboxLines from './ComboboxLines'
import LineInfo from './LineInfo'

export default function Lines() {
  // State to select a line
  const [selectedLine, setSelectedLine] = useState("");

  // Get the data from backend
  const { data: lines, loading, error } = useFetch("http://127.0.0.1:8000/lines/");

  return (
    <>
    <div>
      <ComboboxLines
        lines={lines}
        setSelectedLine={setSelectedLine}
      />
    </div>

    {/* If there is a stop selected display the next buses*/}
    {selectedLine && <LineInfo selectedLine={selectedLine}/>}
    </>
  )
}