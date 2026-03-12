import { C, font } from '../styles/designTokens';

function Gauge({ score = 54 }) {
  const angle = -135 + (score / 100) * 270;
  const col = score >= 70 ? C.green : score >= 40 ? C.amber : C.red;
  const label = score >= 70 ? "LOW RISK" : score >= 40 ? "MODERATE" : "HIGH RISK";
  return (
    <div style={{ textAlign: "center" }}>
      <svg width={160} height={110} viewBox="0 0 160 110">
        <defs>
          <linearGradient id="gg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={C.red} />
            <stop offset="50%" stopColor={C.amber} />
            <stop offset="100%" stopColor={C.green} />
          </linearGradient>
        </defs>
        <path d="M16 95 A64 64 0 0 1 144 95" fill="none" stroke={C.border} strokeWidth="10" strokeLinecap="round" />
        <path d="M16 95 A64 64 0 0 1 144 95" fill="none" stroke="url(#gg)" strokeWidth="10" strokeLinecap="round"
          strokeDasharray="201" strokeDashoffset="0" opacity="0.3" />
        <g transform={`rotate(${angle}, 80, 95)`}>
          <line x1="80" y1="95" x2="80" y2="38" stroke={col} strokeWidth="3" strokeLinecap="round" />
          <circle cx="80" cy="95" r="6" fill={col} />
        </g>
        <text x="80" y="82" textAnchor="middle" fontSize="22" fontWeight="800" fill={col}
          fontFamily={font.body}>{score}</text>
        <text x="80" y="95" textAnchor="middle" fontSize="9" fill={C.slate} fontFamily={font.body}>/100</text>
      </svg>
      <div style={{ fontSize: 11, fontWeight: 700, color: col, letterSpacing: "0.08em" }}>{label}</div>
      <div style={{ fontSize: 11, color: C.slate, marginTop: 3 }}>Compliance Score</div>
    </div>
  );
}

export default Gauge;
