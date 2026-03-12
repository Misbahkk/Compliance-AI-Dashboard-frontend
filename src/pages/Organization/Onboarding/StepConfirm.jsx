import { CheckCircle } from 'lucide-react';
import { C, font } from '../../../styles/designTokens';
import Btn from '../../../components/Btn';

const StepConfirm = ({ form, onProvision, onBack }) => {
  const summaryItems = [
    { label: 'Organisation', value: form.org },
    { label: 'Domain', value: form.domain },
    { label: 'Plan', value: form.plan },
    { label: 'Admin', value: form.adminName },
    { label: 'Admin Email', value: form.adminEmail },
    { label: 'Admin Role', value: form.adminRole }
  ];

  return (
    <div>
      <h2 style={{
        fontFamily: font.display,
        fontSize: 22,
        fontWeight: 700,
        color: C.white,
        marginBottom: 24
      }}>
        Confirm & Provision
      </h2>

      {/* Summary List */}
      <div style={{ marginBottom: 24 }}>
        {summaryItems.map(({ label, value }) => (
          <div
            key={label}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '14px 0',
              borderBottom: `1px solid ${C.border}`
            }}
          >
            <span style={{ color: C.slate, fontSize: 14 }}>{label}</span>
            <span style={{
              color: C.white,
              fontWeight: 600,
              fontSize: 14
            }}>
              {value || '—'}
            </span>
          </div>
        ))}
      </div>

      {/* Info Box */}
      <div style={{
        background: `${C.green}12`,
        border: `1px solid ${C.green}33`,
        borderRadius: 10,
        padding: '14px 18px',
        marginBottom: 28,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12
      }}>
        <CheckCircle size={18} color={C.green} strokeWidth={1.5} style={{ flexShrink: 0, marginTop: 2 }} />
        <p style={{
          fontSize: 13,
          color: C.green,
          margin: 0,
          lineHeight: 1.5
        }}>
          Organisation will be provisioned immediately. Admin will receive an email 
          with login credentials and setup instructions.
        </p>
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <Btn variant="ghost" onClick={onBack}>← Back</Btn>
        <Btn onClick={onProvision}>Provision Organisation</Btn>
      </div>
    </div>
  );
};

export default StepConfirm;
