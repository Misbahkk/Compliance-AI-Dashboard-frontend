import { FileText, Flag, CheckCircle, Clock, Settings, UserPlus } from 'lucide-react';
import { C } from '../../../styles/designTokens';
import { ORG_USERS } from '../../../data/dummyData';
import Btn from '../../../components/Btn';
import { PageHeader, StatCard } from '../../../components/ui';
import TeamMembersList from './TeamMembersList';
import QuickActions from './QuickActions';
import RecentActivity from './RecentActivity';

const STATS = [
  { icon: FileText, value: '312', label: 'Docs Reviewed', color: C.teal },
  { icon: Flag, value: '1,204', label: 'Issues Caught', color: C.amber },
  { icon: CheckCircle, value: '89%', label: 'First-Pass Rate', color: C.green },
  { icon: Clock, value: '3.2d', label: 'Avg Time Saved', color: C.purple }
];

const OrgDashboard = ({ organization = 'AstraZeneca UK', onLogout }) => {
  const handleAction = (action) => {
    console.log('Action clicked:', action);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: C.navy,
      padding: '80px 32px 40px'
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <PageHeader
          badge="ORGANISATION PORTAL"
          title={organization}
          subtitle="Enterprise Plan · 48 users · 312 documents reviewed"
          actions={
            <>
              <Btn variant="ghost" size="sm" onClick={onLogout}>
                <Settings size={16} style={{ marginRight: 6 }} />
                Settings
              </Btn>
              <Btn size="sm">
                <UserPlus size={16} style={{ marginRight: 6 }} />
                Invite User
              </Btn>
            </>
          }
        />

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
          marginBottom: 24
        }}>
          {STATS.map((stat) => (
            <StatCard
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              color={stat.color}
            />
          ))}
        </div>

        {/* Main Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 20
        }}>
          {/* Left Column - Team Members */}
          <TeamMembersList members={ORG_USERS} />

          {/* Right Column - Actions & Activity */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <QuickActions onAction={handleAction} />
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgDashboard;
