import React from 'react'
import SelectDStop from './SelectDStop'
import SelectOStop from './SelectOStop'

function SelectStop() {
  return (
    <div>
        <div>
            <SelectOStop />
        </div>
            
        <div>
            <SelectDStop />
        </div>
       
    </div>
  )
}

export default SelectStop