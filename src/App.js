import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SendInformation from "./pages/SendInformation";
import RequestQueue from "./pages/RequestQueue";
import {BrowserRouter as Router,Route, Routes} from "react-router-dom"
const App=()=>{
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" exact Component={Home}/>
                <Route path="/SendInformation" exact Component={SendInformation}/>
                <Route path='/RequestQueue' exact Component={RequestQueue} />
            </Routes>
        </Router>
    );
}
export default App;


