import { RefreshIcon} from '@heroicons/react/outline'
import ComboboxLines from './ComboboxLines'
import LineInfo from './LineInfo'

const Lines= ({ lines, selectedLine, setSelectedLine }) => {

  return (
    <> 
    <div className="w-full flex flex-col items-center space-y-8 sm:items-end p-2">
    <div className="max-w-sm mx-auto w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
    <div className="p-2"> 
      <div className="flex items-start">

        <div className="w-full">
          <ComboboxLines
            lines={lines}
            setSelectedLine={setSelectedLine}
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

      {/* If there is a stop selected display the next buses*/}
      {selectedLine && <LineInfo selectedLine={selectedLine}/>}
      </div>
          </div>
         </div>
    </>
  )

  // Function to clean the search
  function cleanSearch() {
    setSelectedLine(null);
  }

}

export default Lines;