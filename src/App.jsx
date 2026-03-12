import { useState } from 'react';
import { C, font } from './styles/designTokens';
import { CURRENT_USER } from './data/dummyData';
import Navbar from './components/Navbar';
import UserSwitcher from './components/UserSwitcher';
import LandingPage from './pages/Landing';
import ComplianceApp from './pages/ComplianceApp';
import OrgPortal from './pages/Organization/OrgPortal';
import { AdminPortal } from './pages/Admin';

export default function App() {
  const [page, setPage] = useState("landing");
  const [currentUser, setCurrentUser] = useState(CURRENT_USER);
  
  // Handle going back to landing from admin portal
  const handleBackToLanding = () => {
    setPage("landing");
  };

  // Render pages based on current page state
  const renderPage = () => {
    switch(page) {
      case "landing":
        return <LandingPage setPage={setPage} />;
      case "app":
        return <ComplianceApp />;
      case "onboard":
        return <OrgPortal />;
      case "superadmin":
        return <AdminPortal onBack={handleBackToLanding} />;
      default:
        return <LandingPage setPage={setPage} />;
    }
  };
  
  return (
    <div style={{ fontFamily: font.body, background: C.navy, minHeight: "100vh" }}>
      <Navbar page={page} setPage={setPage} currentUser={currentUser} />
      <div style={{ paddingTop: 60 }}>
        {renderPage()}
      </div>
      <UserSwitcher currentUser={currentUser} onUserChange={setCurrentUser} />
    </div>
  );
}
