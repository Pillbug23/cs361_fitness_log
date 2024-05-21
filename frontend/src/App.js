/*Import basic react hooks and router */
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* Component webpages to import */
import Homepage from './Components/Homepage.js';
import Navigation from './Components/Navigation.js';
import SignUp from './Components/SignUp.js';
import Calorie from './Components/Calorie.js';
import Weight from './Components/Weight.js';
import Signin from './Components/Signin.js';
import Water from './Components/Water.js';


/*Import bootstrap styles */
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation/>
        <Routes>
          <Route path = "/" element= {<Homepage />}/>
          <Route path = "/signup" element= {<SignUp />}/>
          <Route path = "/calorie" element= {<Calorie />}/>
          <Route path = "/weight" element= {<Weight />}/>
          <Route path = "/signin" element= {<Signin />}/>
          <Route path = "/water" element= {<Water />}/>
        </Routes>
        </Router>
    </div>
  );
}

export default App;