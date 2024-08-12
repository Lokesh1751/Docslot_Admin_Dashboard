import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SideNav from "./components/SideNav";
import Dashboard from "./pages/Dashboard";
import AddDoctor from "./pages/AddDoctor";
import Categories from "./pages/Categories";
import AdminProfile from "./pages/AdminProfile";
import AllAppointments from "./pages/AllAppointments";
import Specialists from "./components/Specialists";

function App() {
  return (
    <BrowserRouter>
      {" "}
      {/* BrowserRouter wraps all routing components */}
      <div className="flex justify-between">
        <SideNav />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/adddoc" element={<AddDoctor />} />
            <Route path="/cat" element={<Categories />} />
            <Route path="/profile" element={<AdminProfile />} />
            <Route path="/allapp" element={<AllAppointments />} />
            <Route path="/cat/:name" element={<Specialists/>}/>

          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
