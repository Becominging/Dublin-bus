import { RefreshIcon} from '@heroicons/react/outline'
import ComboboxStops from './ComboboxStops'
import BusArrivalInfo from './BusArrivalInfo'

const Stops= ({ stops, selectedStop, setSelectedStop }) => {  


  return (
    <>
    <div className="w-full flex flex-col items-center space-y-8 sm:items-end p-2">
      <div className="max-w-sm mx-auto w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
        <div className="p-2">
          <div className="flex items-start">

            <div className="w-full">
              <ComboboxStops
                stops={stops}
                selectedStop={selectedStop}
                setSelectedStop={setSelectedStop}
                label={"Search for a stop:"}
              />
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

          {/* If there is a stop selected display the upcoming buses*/}
          {selectedStop && <BusArrivalInfo selectedStop={selectedStop} setSelectedStop={setSelectedStop}/>}

        </div>
      </div>
    </div>
    </>
  )

  // Function to clean the search
  function cleanSearch() {
    setSelectedStop(null);
  }

}

export default Stops;
