import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import OnboardingForm from "./components/form/OnboardingForm";
import ModuleTable from "./components/table/ModuleTable";
import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  const Content = () => {
    return (
      <Routes>
        <Route path="/" element={<ModuleTable />} />
        <Route path="/form" element={<OnboardingForm />} />
      </Routes>
    );
  };

  return (
    <div className="App">
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="others">
          <Content />
        </div>
      </div>
    </div>
  );
}

export default App;
