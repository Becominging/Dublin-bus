import React, { useState } from 'react';

import { Footer } from './Footer';
import { Navbar } from './Navbar';
// import { Routing} from './Routes';
import { Googleresults } from './Googleresults';

const News = () => {
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <div className={darkTheme ? 'dark' : ''}>
      <div className="dark:bg-gray-900 bg-gray-100 dark:text-gray-200 black min-h-screen w-96">
        <Navbar setDarkTheme={setDarkTheme} darkTheme={darkTheme} />
        <Googleresults/>
        
      </div>
    </div>

  );
};

export default News;