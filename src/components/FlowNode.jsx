import { useState } from "react";
import { C } from '../styles/designTokens';
import * as LucideIcons from 'lucide-react';

const FlowNode = ({ icon, label, sub, color, active, onClick }) => {
  const [hov, setHov] = useState(false);
  const lit = hov || active;
  
  // Get the Lucide icon component
  const IconComponent = LucideIcons[icon];
  
  return (
    <div onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: "pointer", transition: "all 0.2s" }}>
      <div style={{
        width: 56, height: 56, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.25s",
        background: lit ? `${color}22` : `${C.border}99`,
        border: `2px solid ${lit ? color : C.border}`,
        boxShadow: lit ? `0 0 24px ${color}55` : "none",
      }}>
        {IconComponent && <IconComponent size={24} color={lit ? color : C.slate} strokeWidth={2} />}
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: lit ? C.white : C.slateLight, transition: "color 0.2s" }}>{label}</div>
        {sub && <div style={{ fontSize: 10, color: C.slate, marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  );
};

export default FlowNode;
