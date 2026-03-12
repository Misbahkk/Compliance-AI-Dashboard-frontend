import { C } from '../styles/designTokens';

const GlassCard = ({ children, style: s = {}, glow }) => (
  <div style={{
    background: `linear-gradient(135deg, ${C.navyCard}ee, ${C.navyMid}aa)`,
    border: `1px solid ${glow ? `${glow}44` : C.border}`,
    borderRadius: 20, backdropFilter: "blur(12px)",
    boxShadow: glow ? `0 0 40px ${glow}22, 0 8px 32px #00000040` : "0 8px 32px #00000040",
    ...s,
  }}>{children}</div>
);

export default GlassCard;
