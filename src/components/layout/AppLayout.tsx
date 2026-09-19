import { Outlet } from "react-router-dom";

import Container from "../ui/Container";
import DesktopSidebar from "./DesktopSidebar";
import MobileNavigation from "./MobileNavigation";

function AppLayout() {
  return (
    <div className="min-h-screen bg-(--bg) text-(--text-primary)">
      <DesktopSidebar />

      <div className="min-h-screen lg:pl-64">
        <main className="min-h-screen pb-24 pt-6 sm:pt-8 lg:pb-10">
          <Container>
            <Outlet />
          </Container>
        </main>
      </div>

      <MobileNavigation />
    </div>
  );
}

export default AppLayout;