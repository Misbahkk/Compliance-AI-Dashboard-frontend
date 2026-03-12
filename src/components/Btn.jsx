import { useState } from "react";
import { C, font } from '../styles/designTokens';

const Btn = ({ children, variant = "primary", onClick, size = "md", style: s = {} }) => {
  const [hov, setHov] = useState(false);
  const pad = size === "lg" ? "15px 36px" : size === "sm" ? "8px 18px" : "11px 26px";
  const fs  = size === "lg" ? 16 : size === "sm" ? 12 : 14;
  const styles = {
    primary: {
      background: hov ? C.tealDark : C.teal,
      color: C.navy, border: "none",
      boxShadow: hov ? `0 0 32px ${C.tealGlow}, 0 4px 16px ${C.teal}66` : `0 0 20px ${C.tealGlow}`,
    },
    ghost: {
      background: "transparent",
      color: hov ? C.teal : C.slateLight,
      border: `1px solid ${hov ? C.teal : C.border}`,
    },
    dark: {
      background: hov ? C.navyLight : C.navyCard,
      color: C.white, border: `1px solid ${C.border}`,
    },
    danger: {
      background: hov ? "#CC3348" : C.red,
      color: C.white, border: "none",
    },
  }[variant];
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ padding: pad, fontSize: fs, fontWeight: 700, borderRadius: 10, cursor: "pointer",
        transition: "all 0.2s", fontFamily: font.body, ...styles, ...s }}>
      {children}
    </button>
  );
};

export default Btn;
