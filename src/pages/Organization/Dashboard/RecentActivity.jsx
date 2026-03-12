import { CheckCircle, Flag, Upload, UserPlus } from 'lucide-react';
import { C } from '../../../styles/designTokens';
import GlassCard from '../../../components/GlassCard';
import { ActivityItem } from '../../../components/ui';

const ACTIVITIES = [
  {
    icon: CheckCircle,
    text: 'Promotional_Email_v2.docx passed review',
    time: '2m ago',
    color: C.green
  },
  {
    icon: Flag,
    text: 'Congress_Slides_v1.pptx flagged 5 issues',
    time: '18m ago',
    color: C.amber
  },
  {
    icon: Upload,
    text: 'SmPC_Summary_final.pdf uploaded',
    time: '1h ago',
    color: C.teal
  },
  {
    icon: UserPlus,
    text: 'Priya Nair accepted invitation',
    time: '3h ago',
    color: C.indigo
  }
];

const RecentActivity = () => {
  return (
    <GlassCard style={{ padding: 22 }}>
      <h3 style={{
        fontWeight: 700,
        color: C.white,
        fontSize: 15,
        margin: '0 0 12px'
      }}>
        Recent Activity
      </h3>
      
      <div>
        {ACTIVITIES.map((activity, index) => (
          <ActivityItem
            key={index}
            icon={activity.icon}
            text={activity.text}
            time={activity.time}
            color={activity.color}
          />
        ))}
      </div>
    </GlassCard>
  );
};

export default RecentActivity;
