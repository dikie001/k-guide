import FirstAid from "@/features/FirstAid";
import ScanDopine from "@/features/ScanDopine";
import Dashboard from "@/pages/Dashboard";
import ProfilePage from "@/pages/ProfilePage";
import NotFound from "@/pages/NotFound";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

export const AppRoutes = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/scan-dopine" element={<ScanDopine />} />
          <Route path="/first-aid" element={<FirstAid />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Router>
    </div>
  );
};

export default AppRoutes;
