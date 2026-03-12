import { Upload, BarChart3, Users, Settings } from 'lucide-react';
import { C } from '../../../styles/designTokens';
import GlassCard from '../../../components/GlassCard';
import { ActionCard } from '../../../components/ui';

const ACTIONS = [
  { icon: Upload, label: 'Upload Document', color: C.teal },
  { icon: BarChart3, label: 'View Reports', color: C.indigo },
  { icon: Users, label: 'Manage Users', color: C.purple },
  { icon: Settings, label: 'Integrations', color: C.amber }
];

const QuickActions = ({ onAction }) => {
  return (
    <GlassCard style={{ padding: 22 }}>
      <h3 style={{
        fontWeight: 700,
        color: C.white,
        fontSize: 15,
        margin: '0 0 16px'
      }}>
        Quick Actions
      </h3>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 12
      }}>
        {ACTIONS.map((action) => (
          <ActionCard
            key={action.label}
            icon={action.icon}
            label={action.label}
            color={action.color}
            onClick={() => onAction?.(action.label)}
          />
        ))}
      </div>
    </GlassCard>
  );
};

export default QuickActions;
