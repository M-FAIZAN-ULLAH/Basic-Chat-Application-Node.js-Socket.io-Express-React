
import React from "react"
import { BrowserRouter as Router} from "react-router-dom"
import Mainroutes from "./routes/routes";

function App() {
  return (
    <Router>
      <Mainroutes/>
    </Router>
  );
}

export default App;
