import { useEffect, Fragment, useState} from "react";
import { CheckCircleIcon, SwitchHorizontalIcon, RefreshIcon} from '@heroicons/react/outline'
import SelectStops from './SelectStops'
import ComboboxStops from './ComboboxStops'
import PickTime from './PickTime'
import SearchButton from "./SearchButton";

// This is a subcomponent from the planner search system.
// Allows the user to enter the Origin stop and the Destination stop
const MainPlanner = ({ selectedLine, setSelectedLine }) => {
  // States for the different fields the user has to enter 
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();
  const [selectedTime, setSelectedTime] = useState(new Date());
  // State for the stops passed to the search bars
  const [validOriginStops, setValidOriginStops] = useState(selectedLine.stops);
  const [validDestinationStops, setValidDestinationStops] = useState(selectedLine.stops);
    // State that when true the search can be performed
const [searchAvailable, setSearchAvailable] = useState(false);

  // Only allow the search if the user has entered origin and destination
  useEffect(() => {
    if (origin && destination) {
      setSearchAvailable(true);
    }
    else {
      setSearchAvailable(false);
    }
  }, [origin, destination]);

  // Only allow the user to search for stops that accomplish the line sequence order
  useEffect(() => {
    if (destination) {
      setValidOriginStops(selectedLine.stops.filter((stop) => {
        if (stop.stop_sequence < destination.stop_sequence) {
          return stop;
        }
        return false;
      }));
    }
    // eslint-disable-next-line
  }, [destination]);

  useEffect(() => {
    if (origin) {
      setValidDestinationStops(selectedLine.stops.filter((stop) => {
        if (stop.stop_sequence > origin.stop_sequence) {
          return stop;
        }
        return false;
      }));
    }
    // eslint-disable-next-line
  }, [origin]);

  console.log("Set Origin:",origin)
  console.log("Set Destination:",destination)
  console.log("Set Selected Time:",selectedTime)

  return (
    <>
        {/* Display information of seleced line  */}
        <div className="w-full flex flex-col items-center space-y- sm:items-end p-2">
            <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-auto">
              <div className="p-2">
                <div className="flex items-start">

                  <div className="flex-shrink-0">
                    <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
                  </div>

                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">{selectedLine.route__route_short_name}</p>
                    <p className="mt-1 text-sm text-gray-500">{selectedLine.trip_headsign}</p>
                  </div>

                  <div className="ml-4 flex-shrink-0 flex">
                    <button
                      className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => {
                        setSelectedLine(null)
                      }}
                    >
                      <span className="sr-only">Search line again()</span>
                      <SwitchHorizontalIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>

                </div>
              </div>
            </div>
        </div>

        {/* Select origin stop and destination stop */}
        <div className="w-full flex flex-col items-center space-y-8 sm:items-end p-2">
          <div className="max-w-sm mx-auto w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="p-2">
              <div className="flex items-start">
              
                <div className="w-full">
                  {/* <SelectStops stops={validOriginStops} selected={origin} setSelected={setOrigin} /> */}
                  <ComboboxStops stops={validOriginStops} selected={origin} setSelected={setOrigin} label={"Select your origin stop:"}/> 
                  <div className='pt-4'>
                    {/* <SelectStops stops={validDestinationStops} selected={destination} setSelected={setDestination} /> */}
                    <ComboboxStops stops={validDestinationStops} selected={destination} setSelected={setDestination} label={"Select your destination stop:"}/>      
                  </div>
                </div>

                <div className="ml-3 flex-shrink-0 flex">
                  <button
                    className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => {
                      cleanSearch()
                    }}
                  >
                    <span className="sr-only">Clean Search</span>
                    <RefreshIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
               </div>

              </div>            
            </div>
          </div>
        </div>
        

        {/* Select the departure time  */}
        <div className="w-full flex flex-col items-center space-y-8 sm:items-end p-2">
          <div className="max-w-sm mx-auto w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="p-2">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <PickTime setSelectedTime={setSelectedTime} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-2"><SearchButton/></div>
        

            
    </>
  )
  // Function to clean the search
  function cleanSearch() {
    setOrigin(null);
    setDestination(null);
  }
}

export default MainPlanner;