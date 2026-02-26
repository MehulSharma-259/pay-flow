/** @format */

import {BrowserRouter, Route, Routes} from "react-router";
import Dashboard from "./pages/Dashboard";
import Payment from "./pages/Payment";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import {ProtectedRoutes} from "./components/ProtectedRoute";
import {AuthProvider} from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/payment"
            element={
              <ProtectedRoutes>
                <Payment />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
