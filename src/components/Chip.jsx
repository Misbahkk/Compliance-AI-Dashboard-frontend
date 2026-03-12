import { C } from '../styles/designTokens';

const Chip = ({ children, color = C.teal, bg }) => (
  <span style={{
    display: "inline-block", fontSize: 11, fontWeight: 700,
    letterSpacing: "0.08em", padding: "3px 10px", borderRadius: 20,
    background: bg || `${color}22`, color, border: `1px solid ${color}44`,
  }}>{children}</span>
);

export default Chip;
