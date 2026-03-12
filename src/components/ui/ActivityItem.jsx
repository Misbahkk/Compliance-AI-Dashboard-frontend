import { C } from '../../styles/designTokens';

const ActivityItem = ({ icon: Icon, text, time, color = C.teal }) => {
  return (
    <div style={{ 
      display: 'flex', 
      gap: 12, 
      alignItems: 'flex-start',
      padding: '12px 0',
      borderBottom: `1px solid ${C.border}`
    }}>
      <div style={{
        width: 32,
        height: 32,
        borderRadius: 8,
        background: `${color}18`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        <Icon size={16} color={color} strokeWidth={1.5} />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ 
          fontSize: 13, 
          color: C.slateLight,
          margin: 0,
          lineHeight: 1.4
        }}>
          {text}
        </p>
        <p style={{ 
          fontSize: 11, 
          color: C.slate, 
          marginTop: 4,
          marginBottom: 0 
        }}>
          {time}
        </p>
      </div>
    </div>
  );
};

export default ActivityItem;
