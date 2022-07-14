/* This example requires Tailwind CSS v2.0+ */
import { SearchIcon } from '@heroicons/react/solid'

export default function SearchButton() {
  return (
    <>
      <button
        type="button"
        className="flex place-content-center w-full items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-700 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
      >
      
        <SearchIcon className="-ml-0.5 mr-2 h-4 " aria-hidden="true" />
        Search
       
      </button>
    </>
  )
}
