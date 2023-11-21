//src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SendInformation from "./pages/SendInformation";
import RequestQueue from "./pages/RequestQueue";
import RequestDetail from "./pages/RequestDetail";
import SendRequest from "./pages/SendRequest";
import ConfirmPriceSchedule from "./pages/ConfirmPriceSchedule";
import Chat from "./pages/Chat";
import FixQueue from "./pages/FixQueue";
import ViewRequest from "./pages/ViewRequest";
import FinancialMan from "./pages/FinancialMan";
import "./styles/datnguyen.css";

const App = () => {
  const [user, setUser] = useState([]);
  const [request, setRequest] = useState([]);
  const [self_payment, setSelf_payment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateUserMoney = async (newUser) => {
    try {
      const response = await fetch(`http://localhost:3001/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: newUser.id, money: newUser.money }),
      });
      if (response.ok) {
        console.log("User updated");
        setUser(newUser);
      }
    } catch (error) {
      console.error("Error adding request:", error);
      alert("Internal Server Error. Please try again later.");
    }
  };

  useEffect(() => {
    fetch(`http://localhost:3001/api/user?id=1`)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((user) => {
        setUser(user[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
    fetch(`http://localhost:3001/api/request?id=1`)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((request) => {
        setRequest(request[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <Router>
      <Navbar user={user} />
      <div style={{ paddingTop: "100px" }}>
        <Routes>
          {/* <Route path="/" exact Component={Home} /> */}
          <Route path="/SendInformation" exact Component={SendInformation} />
          <Route path="/RequestQueue" exact Component={RequestQueue} />
          <Route path="/requestDetail/:requestId" Component={RequestDetail} />
          <Route
            path="/FixQueue"
            exact
            Component={(props) => (
              <FixQueue
                {...props}
                request={request}
                user={user}
                updateUserMoney={updateUserMoney}
              />
            )}
          />
          <Route path="/SendRequest" exact Component={SendRequest} />
          <Route
            path="/ConfirmPriceSchedule"
            exact
            Component={ConfirmPriceSchedule}
          />
          <Route path="/Chat" exact Component={Chat} />
          <Route path="/ViewRequest" exact Component={ViewRequest} />
          <Route
            path="/FinancialMan"
            exact
            Component={(props) => (
              <FinancialMan
                {...props}
                user={user}
                updateUserMoney={updateUserMoney}
              />
            )}
          />
        </Routes>
      </div>
    </Router>
  );
};
export default App;
