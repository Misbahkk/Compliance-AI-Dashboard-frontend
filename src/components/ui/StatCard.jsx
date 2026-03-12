import { C, font } from '../../styles/designTokens';
import GlassCard from '../GlassCard';

const StatCard = ({ icon: Icon, value, label, color = C.teal }) => {
  return (
    <GlassCard style={{ padding: '20px 24px' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'flex-start', 
        justifyContent: 'space-between' 
      }}>
        <div>
          <p style={{ 
            fontSize: 12, 
            color: C.slate, 
            marginBottom: 8,
            marginTop: 0 
          }}>
            {label}
          </p>
          <p style={{ 
            fontFamily: font.display, 
            fontSize: 28, 
            fontWeight: 700, 
            color: color,
            margin: 0 
          }}>
            {value}
          </p>
        </div>
        <div style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: `${color}15`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Icon size={22} color={color} strokeWidth={1.5} />
        </div>
      </div>
    </GlassCard>
  );
};

export default StatCard;
