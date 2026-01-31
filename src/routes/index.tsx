import FirstAid from "@/features/FirstAid";
import ProhibitedListPage from "@/features/ProhibitedList";
import RecoveryPage from "@/features/Recovery";
import ScanDopine from "@/features/ScanDopine";
import SubstanceDatabase from "@/features/SubstanceDatabase";
import TueProcess from "@/features/TueProcess";
import Dashboard from "@/pages/Dashboard";
import MapPage from "@/pages/MapPage";
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
          <Route path="/substance-database" element={<SubstanceDatabase />} />
          <Route path="/tue-process" element={<TueProcess />} />
          <Route path="/prohibited-list" element={<ProhibitedListPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/recovery" element={<RecoveryPage />} />

        </Routes>
      </Router>
    </div>
  );
};

export default AppRoutes;
