import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SendInformation from "./pages/SendInformation";
import RequestQueue from "./pages/RequestQueue";
import RequestDetail from "./pages/RequestDetail"
import {BrowserRouter as Router,Route, Routes} from "react-router-dom"
import FixQueue from "./pages/FixQueue";
const App=()=>{
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" exact Component={Home}/>
                <Route path="/SendInformation" exact Component={SendInformation}/>
                <Route path='/RequestQueue' exact Component={RequestQueue} />
<Route path="/request/:requestId" Component={RequestDetail} />
                <Route path='/FixQueue' exact Component={FixQueue} />
            </Routes>
        </Router>
    );
}
export default App;


