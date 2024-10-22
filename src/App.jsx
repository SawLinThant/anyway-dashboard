import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/login";
import { useState } from "react";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const ProtectedRoutes = () => {
    return !isLogin && !user ? <Navigate to="/" /> : <Outlet />;
  };
  return (
    <>
      <div className="lg:hidden md:hidden block text-black">
        Not accessable for mobile device
      </div>
      <div className="w-full h-screen overflow-hidden md:flex lg:flex items-center justify-center hidden">
        <Routes>
          <Route path="*" element={<Login setIsLogin={setIsLogin} />} />
          <Route element={<ProtectedRoutes/>}>
            <Route path="dashboard/*" element={<Dashboard />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
