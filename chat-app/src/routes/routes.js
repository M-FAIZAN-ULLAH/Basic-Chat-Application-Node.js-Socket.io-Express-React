import { Route, Routes } from "react-router-dom";

import Home from "../components/home/home";
import Login from "../components/login/login";
import Signup from "../components/signup/signup";

import Test from "../components/test/test";
// import Chat from "../components/Chat/Chat";

// import PrivateRoutes from "./Protected_Routes";

const Main_Routes = () => {

//     const [loggedIn, setLoggedIn] = useState(true);

//   const handleLogin = () => {
//     setLoggedIn(true);
//   };

  // To use protected routes in when login is authorized pass this in routes tag parameter: 
  // element={<PrivateRoutes status={loggedIn}/>}

    return (
        <Routes >
            <Route exact path="/" element={<Signup/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/test" element={<Test/>} />
            {/* <Route path="/chat" element={<Chat/>} /> */}
        </Routes>
    );
  };
  
  export default Main_Routes;
  