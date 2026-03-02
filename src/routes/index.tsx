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
import Support from "@/pages/Support";
import WadaPage from "@/pages/WadaPage";
import HydrationPage from "@/pages/HydrationPage";
import LogSymptomsPage from "@/pages/LogSymptomsPage";
import StretchingPage from "@/pages/StretchingPage";
import NotificationsPage from "@/pages/NotificationsPage";
import ActivitiesPage from "@/pages/ActivitiesPage";
import ResourcesPage from "@/pages/ResourcesPage";
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
          <Route path="/wada" element={<WadaPage />} />
          <Route path="/substance-database" element={<SubstanceDatabase />} />
          <Route path="/tue-process" element={<TueProcess />} />
          <Route path="/prohibited-list" element={<ProhibitedListPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/recovery" element={<RecoveryPage />} />
          <Route path="/support" element={<Support />} />
          <Route path="/hydration" element={<HydrationPage />} />
          <Route path="/log-symptoms" element={<LogSymptomsPage />} />
          <Route path="/stretching" element={<StretchingPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default AppRoutes;
