/* This example requires Tailwind CSS v2.0+ */
import { SearchIcon } from '@heroicons/react/solid'

export default function HeaderLogo() {
  return (
    <>
      <h2 className=" pt-6 font-serif font-bold text-2xl sm:truncate flex place-content-center w-full items-center px-3 py-2 text-green-700 bg-transparent">
        {/* <SearchIcon className="-ml-0.5 mr-2 h-4 " aria-hidden="true" /> */}
        Dublin Bus
      </h2>
    </>
  )
}
