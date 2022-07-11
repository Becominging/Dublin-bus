import useFetch from "../useFetch.js";
import { Listbox, Transition } from '@headlessui/react'
import { Combobox } from '@headlessui/react'


export default function TestuseFetch() {
  const { data: lines, loading, error } = useFetch("http://127.0.0.1:8000/lines/")
  
  return (
    <div className="TestuseFetch">
      { loading && <p>{loading}</p> }
      { lines && <p>{lines[0]['trip_id']}</p> }
      { error && <p>{error}</p> }

      { lines && <p>{lines.map((line) => (
            line['trip_headsign']  
        ))}</p> }

      { lines && <Listbox>{lines.map((line) => (
            line['trip_headsign']  
        ))}</Listbox> }  
      
    </div>
    
  );
}
