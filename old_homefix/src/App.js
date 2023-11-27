import "./styles/datnguyen.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SendInformation from "./pages/SendInformation";
import RequestQueue from "./pages/RequestQueue";
import RequestDetail from "./pages/RequestDetail";
import ConfirmPriceSchedule from "./pages/ConfirmPriceSchedule";
import ConfirmPriceScheduleCus from "./pages/ConfirmPriceSchedule_Cus";
import Chat from "./pages/Chat"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FixQueue from "./pages/FixQueue";
import ViewRequest from "./pages/ViewRequest"
import Login from "./pages/Login.js"
import Signup from "./pages/Signup.js"
import HomeProvider from "./pages/HomeProvider.js"
import HomeCustomer from "./pages/HomeCustomer.js"
const App = () => {
  return (
    <Router>
      <Routes>
         <Route path="/" exact Component={Home} /> 
         <Route path="/Login" exact Component={Login} /> 
         <Route path="/HomeProvider" exact Component={HomeProvider} /> 
         <Route path="/HomeCustomer" exact Component={HomeCustomer} /> 
         <Route path="/Signup" exact Component={Signup} /> 
        <Route path="/SendInformation" exact Component={SendInformation} />
        <Route path="/RequestQueue" exact Component={RequestQueue} />
        <Route path="/requestDetail/:requestId" Component={RequestDetail} />
        <Route path="/FixQueue" exact Component={FixQueue} />
        <Route path="/ConfirmPriceSchedule" exact Component={ConfirmPriceSchedule} />
        <Route path="/ConfirmPriceScheduleCus" exact Component={ConfirmPriceScheduleCus} />
        <Route path="/Chat" exact Component={Chat} />
        <Route path= "/ViewRequest" exact Component = {ViewRequest} />
      </Routes>
    </Router>
  );
};
export default App;
