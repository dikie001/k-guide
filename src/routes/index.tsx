import Dashboard from "@/pages/Dashboard";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

export const AppRoutes = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>        
      </Router>
    </div>
  );
};

export default AppRoutes;
