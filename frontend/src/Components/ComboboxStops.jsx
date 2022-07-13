import React, { useState } from 'react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { Combobox } from '@headlessui/react'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const ComboboxLines = ({ stops, selected, setSelected, label}) => {
  
  const [query, setQuery] = useState('')
  
  const filteredStops =
    query === ''
      ? stops
      : stops.filter((stop) => {
          return stop && stop['stop_name'].toLowerCase().includes(query.toLowerCase())
        })
  
  return (
    stops && 
      <Combobox as="div" onChange={(stop) => handleSubmit(stop)}>
        <Combobox.Label className="block text-sm font-light text-gray-700">{label}</Combobox.Label>
        <div className="relative mt-1">
          <Combobox.Input
            className="w-full font-extralight rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-green-400 sm:text-sm"
            placeholder={selected&&selected['stop_name']}
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(stop) => stop && stop['stop_name']} />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </Combobox.Button>

          {filteredStops.length > 0 && (
            <Combobox.Options className="relative z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredStops.map((stop) => (
                <Combobox.Option
                  key={stop['stop_id']}
                  value={stop}
                  className={({ active }) => classNames(
                    'relative cursor-default select-none font-extralight py-2 pl-3 pr-9',
                    active ? 'bg-green-600 text-white' : 'text-gray-900'
                  )}
                >
                  {({ active, selected }) => (
                    <>
                      <span className={classNames('block truncate', selected && 'font-extralight')}>{stop['stop_name']}</span>

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

 function handleSubmit(stop) {
  setSelected(stop);
}

}

export default ComboboxLines;

   
