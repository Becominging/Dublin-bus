import React from 'react';

import { Search } from './Search';

export const Navbar = ({ setDarkTheme, darkTheme }) => (
  <div className="w-80 p-5 pb-0 flex flex-wrap sm:justify-between justify-center items-center border-b dark:border-gray-700 border-gray-200 ">
    <div className="flex justify-between items-center space-x-5">
      <a target="_blank" rel="noreferrer" href="https://twitter.com/dublinbusnews">
        <p className="text-2xl bg-green-700 font-bold text-white py-1 px-2 rounded dark:bg-gray-50 dark:text-gray-900">
          Twitter🔎 
        </p>
      </a>
      <button type="button" onClick={() => setDarkTheme(!darkTheme)} className="text-2xl dark:bg-gray-50 dark:text-gray-900 bg-white border rounded-full px-2 py-1 hover:shadow-lg">{darkTheme ? '💡 Light' : '🌙 Dark'}</button>
    </div>
    <Search />
  </div>
);
