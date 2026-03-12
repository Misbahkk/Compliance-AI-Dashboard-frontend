import { C } from '../styles/designTokens';
import Chip from './Chip';

const SeverityBadge = ({ sev }) => {
  const map = { HIGH: [C.red, "HIGH RISK"], MED: [C.amber, "MODERATE"], LOW: [C.green, "LOW RISK"] };
  const [col, lbl] = map[sev] || [C.slate, sev];
  return <Chip color={col}>{lbl}</Chip>;
};

export default SeverityBadge;
