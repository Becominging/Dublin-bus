import { useEffect, Fragment, useState} from "react";
import { CheckCircleIcon } from '@heroicons/react/outline'
import { SwitchHorizontalIcon } from '@heroicons/react/solid'


// This is a subcomponent from the planner search system.
// Allows the user to enter the Origin stop and the Destination stop
const MainPlanner = ({ selectedLine, setSelectedLine }) => {
  // States for the different fields the user has to enter 
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(new Date());
  // State for the stops passed to the search bars
  const [validOriginStops, setValidOriginStops] = useState(selectedLine.stops);
  const [validDestinationStops, setValidDestinationStops] = useState(selectedLine.stops);
  // State that when true the search can be performed
  const [searchAvailable, setSearchAvailable] = useState(false);
  // State to handle when the search is being performed
  const [searchPending, setSearchPending] = useState(false);
  // State to display the results 
  const [searchResults, setSearchResults] = useState(null);
  // State to handle the error
  const [searchError, setSearchError] = useState(false);

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

  return (
    <>
        {/* Information of Seleced Line  */}
        <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
            <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div className="p-4">
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
                      <span className="sr-only">Close</span>
                      <SwitchHorizontalIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
        </div>
         
    </>
      
    

   

  )
}

export default MainPlanner;