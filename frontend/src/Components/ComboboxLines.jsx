import React, { useState } from 'react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { Combobox } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const ComboboxLines = ({ lines, setSelectedLine }) => {
  
  console.log("Lines:",lines) 
  
  const [query, setQuery] = useState('')
  
  const filteredLines =
    query === ''
      ? lines
      : lines.filter((line) => {
          return line && line['route__route_short_name'].toLowerCase().includes(query.toLowerCase())
        })

  console.log("Query:",query)      
  console.log("Filtered Lines:",filteredLines) 
  
  return (
    lines && 
      <Combobox as="div" onChange={(line) => handleSubmit(line)}>
        {/* <Combobox.Label className="block text-sm font-medium text-gray-700">Select a line</Combobox.Label> */}
        <div className="relative mt-1 p-2">
          <Combobox.Input
            className="w-full font-light rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-green-400 sm:text-sm"
            placeholder={"Search for a line"}
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(line) => line && line['route__route_short_name']} />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </Combobox.Button>

          {filteredLines.length > 0 && (
            <Combobox.Options className="relative font-light z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredLines.map((line) => (
                <Combobox.Option
                  key={line['trip_id']}
                  value={line}
                  className={({ active }) => classNames(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-green-600 text-white' : 'text-gray-900'
                  )}
                >
                  {({ active, selected }) => (
                    <>
                      <span className={classNames('block truncate', selected && 'font-semibold')}>{line['route__route_short_name'] + ", " + line['trip_headsign']}</span>

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
          )}
        </div>
      </Combobox>     
 ) 

 function handleSubmit(line) {
  setSelectedLine(line);
  console.log("Set Selected Line:",line)
}

}

export default ComboboxLines;