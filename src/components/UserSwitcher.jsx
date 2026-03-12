import { C } from '../styles/designTokens';
import Btn from './Btn';

// Demo users for testing different roles
const DEMO_USERS = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    email: "s.chen@astrazeneca.com",
    role: "organization_admin",
    organization: "AstraZeneca UK",
    organizationId: 1,
    label: "Organization Admin"
  },
  {
    id: 2,
    name: "System Administrator",
    email: "admin@reviewready.com",
    role: "super_admin",
    organization: "ReviewReady Platform",
    organizationId: null,
    label: "Super Admin"
  },
  {
    id: 3,
    name: "John Smith",
    email: "j.smith@pfizer.com",
    role: "user",
    organization: "Pfizer Limited",
    organizationId: 2,
    label: "Regular User"
  }
];

function UserSwitcher({ currentUser, onUserChange }) {
  return (
    <div style={{ 
      position: "fixed", 
      bottom: 20, 
      right: 20, 
      background: `${C.navyCard}ee`, 
      backdropFilter: "blur(12px)",
      border: `1px solid ${C.border}`,
      borderRadius: 16,
      padding: "16px 20px",
      boxShadow: `0 8px 32px #00000040`,
      zIndex: 1000,
      minWidth: 280
    }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: C.slate, letterSpacing: "0.08em", marginBottom: 12 }}>
        DEMO MODE - SWITCH USER
      </div>
      <div style={{ fontSize: 12, color: C.white, fontWeight: 600, marginBottom: 8 }}>
        Current: {currentUser.name}
      </div>
      <div style={{ fontSize: 11, color: C.teal, marginBottom: 16 }}>
        {currentUser.role === "super_admin" ? "🔑 Super Admin" : 
         currentUser.role === "organization_admin" ? "🏢 Org Admin" : "👤 User"}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {DEMO_USERS.map(user => (
          <Btn 
            key={user.id}
            variant={currentUser.id === user.id ? "primary" : "dark"}
            size="sm"
            onClick={() => onUserChange(user)}
            style={{ width: "100%", justifyContent: "flex-start" }}
          >
            {user.label}
          </Btn>
        ))}
      </div>
    </div>
  );
}

export default UserSwitcher;
export { DEMO_USERS };
