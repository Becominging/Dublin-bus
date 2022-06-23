import React from 'react'

function Header() {
  return (
    <header className='flex items-center justify-between px-4 py-3 h-20 bg-green-800'>
      
      <div className="flex-1 min-w-2">
        <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">Dublin Bus</h2>
      </div>

      <nav className='flex items-center'>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
        >
          Login
        </button>
        <button
          type="button"
          className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
        >
          Map
        </button>
      </nav>
    </header>
  )
}

export default Header