import * as LucideIcons from 'lucide-react';
import { C } from '../../../styles/designTokens';
import GlassCard from '../../../components/GlassCard';
import Chip from '../../../components/Chip';
import Btn from '../../../components/Btn';

const TeamMembersList = ({ members = [] }) => {
  return (
    <GlassCard>
      <div style={{
        padding: '16px 22px',
        borderBottom: `1px solid ${C.border}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h3 style={{
          fontWeight: 700,
          color: C.white,
          fontSize: 15,
          margin: 0
        }}>
          Team Members
        </h3>
        <Btn size="sm">+ Add</Btn>
      </div>

      <div style={{ maxHeight: 400, overflowY: 'auto' }}>
        {members.map((member, index) => {
          const IconComponent = LucideIcons[member.badge];
          
          return (
            <div
              key={member.id}
              style={{
                padding: '14px 22px',
                borderBottom: index < members.length - 1 ? `1px solid ${C.border}` : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 14
              }}
            >
              {/* Avatar */}
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: `${C.teal}18`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {IconComponent && (
                  <IconComponent size={18} color={C.teal} strokeWidth={1.5} />
                )}
              </div>

              {/* Info */}
              <div style={{ flex: 1 }}>
                <p style={{
                  fontWeight: 600,
                  color: C.white,
                  fontSize: 14,
                  margin: 0
                }}>
                  {member.name}
                </p>
                <p style={{
                  fontSize: 12,
                  color: C.slate,
                  margin: '4px 0 0'
                }}>
                  {member.role}
                </p>
              </div>

              {/* Status & Docs */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: 6
              }}>
                <Chip color={member.status === 'Active' ? C.green : C.amber}>
                  {member.status}
                </Chip>
                <span style={{ fontSize: 11, color: C.slate }}>
                  {member.docs} docs
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
};

export default TeamMembersList;
