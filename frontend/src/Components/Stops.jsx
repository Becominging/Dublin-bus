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
    <div className="w-full flex flex-col items-center space-y-8 sm:items-end p-2">
      <div className="max-w-sm mx-auto w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
        <div className="p-2">
          <div>
            <ComboboxStops
              stops={stops}
              selectedStop={selectedStop}
              setSelectedStop={setSelectedStop}
              label={"Search for a stop:"}
          />
          </div>

          {/* If there is a stop selected display the upcoming buses*/}
          {selectedStop && <BusArrivalInfo selectedStop={selectedStop} setSelectedStop={setSelectedStop}/>}

        </div>
      </div>
    </div>
    </>
  )
}

