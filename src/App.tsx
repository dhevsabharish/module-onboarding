import { useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import OnboardingForm from "./components/form/OnboardingForm";
import ModuleTable from "./components/table/ModuleTable";
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState("myModules");

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <Topbar />
      <div className="container">
        <Sidebar currentPage={currentPage} handlePageChange={handlePageChange} />
        <div className="others">
          {currentPage === "myModules" && <ModuleTable />}
          {currentPage === "addModule" && <OnboardingForm />}
        </div>
      </div>
    </div>
  );
}

export default App;
