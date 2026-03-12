import { C, font } from '../styles/designTokens';
import { CheckCircle } from 'lucide-react';

function Navbar({ page, setPage, currentUser }) {
  // Filter navigation links based on user role
  let navLinks = ["landing","app"];
  
  // Organization admins can see Org Portal
  if (currentUser.role === "organization_admin" || currentUser.role === "super_admin") {
    navLinks.push("onboard");
  }
  
  // Only super admins can see Super Admin
  if (currentUser.role === "super_admin") {
    navLinks.push("superadmin");
  }
  
  const labels = { landing:"Landing Page", app:"Compliance App", onboard:"Org Portal", superadmin:"Super Admin" };
  return (
    <div style={{ position:"fixed", top:0, left:0, right:0, zIndex:999,
      background:`${C.navy}ee`, backdropFilter:"blur(16px)",
      borderBottom:`1px solid ${C.border}` }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px",
        display:"flex", alignItems:"center", gap:16, height:60 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginRight:"auto" }}>
          <div style={{ width:34, height:34, borderRadius:10,
            background:`linear-gradient(135deg, ${C.teal}, ${C.navyLight})`,
            display:"flex", alignItems:"center", justifyContent:"center" }}>
            <CheckCircle size={20} color={C.white} strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ fontWeight:800, fontSize:16, color:C.white, fontFamily:font.display,
              letterSpacing:"-0.02em" }}>Review<span style={{ color:C.teal }}>Ready</span></div>
            <div style={{ fontSize:9, color:C.slate, letterSpacing:"0.1em" }}>ABPI COMPLIANCE AI</div>
          </div>
        </div>

        {navLinks.map(k => (
          <button key={k} onClick={() => setPage(k)}
            style={{ background: page===k ? `${C.teal}22` : "transparent",
              border: page===k ? `1px solid ${C.teal}44` : "1px solid transparent",
              color: page===k ? C.teal : C.slateLight, borderRadius:8,
              padding:"6px 14px", fontSize:12, fontWeight:700, cursor:"pointer",
              transition:"all 0.2s", fontFamily:font.body }}>
            {labels[k]}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
