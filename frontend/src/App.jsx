import { Route,  BrowserRouter, Router,Routes} from 'react-router-dom';
import Planner from "./pages/Planner";
import Stops from "./pages/Stops";
import Lines from './pages/Lines';
import Weather from './pages/Weather';
import Favorites from "./pages/Favorites";
import Feedback from "./pages/Feedback";
import Alert from "./pages/Alert";



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Planner />} />
        <Route path="/stops" element={<Stops />} />
        <Route path="/lines" element={<Lines />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/alert" element={<Alert />} />
        
      </Routes>
    </BrowserRouter>

  
  );
}

export default App;
