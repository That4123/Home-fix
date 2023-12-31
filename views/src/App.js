import React from "react";
import "./App.css";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  Outlet,
} from "react-router-dom";
import $ from "jquery";
import Popper from "popper.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Header from "./components/shared/header";
import Homepage from "./components/homepage/homepage";
import NoPage from "./components/nopage/nopage";
import SignIn from "./components/signin/signin";
import axios from "axios";
import PrivateRoutes from "./components/shared/private_routes";
import ProtectedTest from "./components/(test_only)protected_test/protected_test";
import PublicTest from "./components/(test_only)public_test/public_test";
import SignUp from "./components/signup/signup";
import ConfirmPriceSchedule from "./components/confirm_price_schedule/ConfirmPriceSchedule";
import SendInformation from "./components/SendInformation/SendInformation";
import CustomerOrderQueue from "./components/customer_order_queue/RequestQueue";
import ProviderOrderQueue from "./components/provider_order_queue/RequestQueue";
import Chat from "./components/chat/Chat";
import CustomerOrderDetails from "./components/customer_order_queue/request_detail/RequestDetail";
import ProviderOrderDetails from "./components/provider_order_queue/request_detail/RequestDetail";
import CompletedOrder from "./components/completedOrder/completedOrder.js";
import CompletedOrderDetail from "./components/completedOrderDetail/completedOrderDetail.js";
import ProviderInfo from "./components/providerInfo/providerInfo.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Homepage />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="publicTest" element={<PublicTest />} />
        <Route
          path="confirmPriceSchedule/:order_id"
          element={<ConfirmPriceSchedule />}
        />
        <Route path="chat/:name" element={<Chat />} />
        <Route element={<PrivateRoutes validateRoute={"protectedTest"} />}>
          <Route path="protectedTest" element={<ProtectedTest />} />
        </Route>
        <Route path="sendInformation" element={<SendInformation />} />
        <Route path="CustomerOrderQueue" element={<CustomerOrderQueue />} />
        <Route
          path="CustomerOrderQueue/details/:order_id"
          element={<CustomerOrderDetails />}
        />
        <Route path="ProviderOrderQueue" element={<ProviderOrderQueue />} />
        <Route
          path="ProviderOrderQueue/details/:order_id"
          element={<ProviderOrderDetails />}
        />
        <Route path="providerInfo" element={<ProviderInfo />} />
        <Route path="*" element={<NoPage />} />
        <Route path="CompletedOrder" element={<CompletedOrder />} />
        <Route
          path="CompletedOrder/:order_id"
          element={<CompletedOrderDetail />}
        />
      </Route>
    </Routes>
  );
}

export default App;
