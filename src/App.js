import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SendInformation from "./pages/SendInformation";
import RequestQueue from "./pages/RequestQueue";
import RequestDetail from "./pages/RequestDetail";
import SendRequest from "./pages/SendRequest";
import ConfirmPriceSchedule from "./pages/ConfirmPriceSchedule";
import Chat from "./pages/Chat";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FixQueue from "./pages/FixQueue";
import ViewRequest from "./pages/ViewRequest";
import Testing from "./pages/Testing";
import AddRequest from "./pages/AddRequest";
import MyAppliedRequest from "./pages/MyAppliedRequest";

const App = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/user")
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  console.log(user);
  return (
    <Router>
      <Navbar />
      {/* <h1>DatNguyen-{user[0].Id}</h1> */}
      <Routes>
        {/* <Route path="/" exact Component={Home} /> */}
        <Route path="/SendInformation" exact Component={SendInformation} />
        <Route path="/RequestQueue" exact Component={RequestQueue} />
        <Route path="/requestDetail/:requestId" Component={RequestDetail} />
        <Route path="/FixQueue" exact Component={FixQueue} />
        <Route path="/SendRequest" exact Component={SendRequest} />
        <Route
          path="/ConfirmPriceSchedule"
          exact
          Component={ConfirmPriceSchedule}
        />
        <Route path="/Chat" exact Component={Chat} />
        <Route path="/ViewRequest" exact Component={ViewRequest} />
        <Route path="/MyAppliedRequest" exact Component={MyAppliedRequest} />

        <Route path="/Testing" exact Component={Testing} />
        <Route path="/AddRequest" exact Component={AddRequest} />
      </Routes>
    </Router>
  );
};
export default App;
