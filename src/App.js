import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import TaskManager from "./permissions/TaskManager";

function Home() {
  return <h1>Home</h1>;
}
function RecentActivity() {
  return (
    <>
      <h1>Recent Activity</h1>
      <Dashboard />
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

const Dashboard = () => {
  return <TaskManager />;
};

export default App;
