import { useState } from 'react';
import { C } from '../../styles/designTokens';

const ActionCard = ({ icon: Icon, label, color = C.teal, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? `${color}25` : `${color}12`,
        border: `1px solid ${color}33`,
        borderRadius: 12,
        padding: '16px 18px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }}
    >
      <Icon size={20} color={color} strokeWidth={1.5} />
      <span style={{ 
        fontSize: 13, 
        fontWeight: 600, 
        color: C.white 
      }}>
        {label}
      </span>
    </div>
  );
};

export default ActionCard;
