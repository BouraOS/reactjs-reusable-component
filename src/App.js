import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Home from "./Home";

function RecentActivity() {
  return (
    <>
      <h1>Recent Activity</h1>
    </>
  );
}

function Project() {
  return <h1>Project</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dash" index element={<RecentActivity />} />
        <Route path="/project" element={<Project />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
