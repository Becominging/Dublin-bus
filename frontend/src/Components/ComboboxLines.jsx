import React, { useState } from 'react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { Combobox } from '@headlessui/react'
import useFetch from "../useFetch.js";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ComboboxLines() {
  const { data: lines, loading, error } = useFetch("http://127.0.0.1:8000/lines/")
  
  const [selectedline, setSelectedLine] = useState("")
  
  const [query, setQuery] = useState('')
  
  const filteredLines =
    query === ''
      ? lines
      : lines.filter((line) => {
          return line && line['route__route_short_name'].toLowerCase().includes(query.toLowerCase())
        })
  console.log("filtered Lines:",filteredLines) 
  console.log("selected Line:",selectedline) 
  
  return (
    lines && 
    <Combobox as="div"  value={selectedline} onChange={setSelectedLine}>
      {/* <Combobox.Label className="block text-sm font-medium text-gray-700">Select a line</Combobox.Label> */}
      <div className="relative mt-1">
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-green-400 sm:text-sm"
          placeholder={"Search for a line"}
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(line) => line && line['route__route_short_name']}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {filteredLines.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredLines.map((lines) => (
              <Combobox.Option
                key={lines['trip_id']}
                value={"Line " + lines['route__route_short_name'] + ", " + lines['trip_headsign']}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-green-600 text-white' : 'text-gray-900'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span className={classNames('block truncate', selected && 'font-semibold')}>{lines['route__route_short_name']+ ", " + lines['trip_headsign']}</span>

                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-white' : 'text-indigo-600'
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        ) 
      //   : (
      //     <p style={{ display: "block", margin: 8, fontSize: "1rem" }}>
      //        No results found
      //     </p>
      //  )
       }
      </div>
    </Combobox>
  )
}


   
