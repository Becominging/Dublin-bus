
import ComboboxLines from './ComboboxLines'
import LineInfo from './LineInfo'

const Lines= ({ lines, selectedLine, setSelectedLine }) => {
 

  return (
    <>
    <div>
      <ComboboxLines
        lines={lines}
        setSelectedLine={setSelectedLine}
      />
    </div>

    {/* If there is a stop selected display the next buses*/}
    {selectedLine && <LineInfo selectedLine={selectedLine}/>}
    </>
  )
}

export default Lines;