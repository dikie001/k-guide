import FirstAid from "@/features/FirstAid";
import ScanDopine from "@/features/ScanDopine";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";
import ProfilePage from "@/pages/ProfilePage";
import WadaPage from "@/pages/WadaPage";
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
          <Route path="/wada" element={<WadaPage />} />

        </Routes>
      </Router>
    </div>
  );
};

export default AppRoutes;
