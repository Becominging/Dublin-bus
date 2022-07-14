import { useState } from "react";
import useFetch from "./useFetch.js";
import ComboboxStops from './ComboboxStops'
import BusArrivalInfo from './BusArrivalInfo'

export default function Stops() {
  // State to select a stop
  const [selectedStop, setSelectedStop] = useState("");

  // Get the data from backend
  const { data: stops, loading, error } = useFetch("http://127.0.0.1:8000/stops/");

  return (
    <>
    <div>
      <ComboboxStops
        stops={stops}
        selectedStop={selectedStop}
        setSelectedStop={setSelectedStop}
        label={"Search for a stop:"}
      />
    </div>

    {/* If there is a stop selected display the upcoming buses*/}
    {selectedStop && <BusArrivalInfo selectedStop={selectedStop}/>}
    </>
  )
}

