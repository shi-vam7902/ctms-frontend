import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/dashboard/DashSidebar";
import DashProfile from "../components/dashboard/DashProfile";
import DashProjects from "../components/dashboard/DashProjects";
import DashUsers from "../components/dashboard/DashUsers";
import DashboardComp from "../components/dashboard/DashboardComp";
import DashTask from "../components/dashboard/DashTask"

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* profile... */}
      {tab === "profile" && <DashProfile />}
      {/* projects... */}
      {tab === "projects" && <DashProjects />}
      {/* tasks... */}
      {tab === "tasks" && <DashTask />}
      {/* users */}
      {tab === "users" && <DashUsers />}
      {/* dashboard comp */}
      {tab === "dash" && <DashboardComp />}
    </div>
  );
}
