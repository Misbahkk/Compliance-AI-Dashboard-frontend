import { User, Mail, Briefcase } from 'lucide-react';
import { C, font } from '../../../styles/designTokens';
import Btn from '../../../components/Btn';
import { Input } from '../../../components/ui';

const StepAdmin = ({ form, updateForm, onNext, onBack }) => {
  const canProceed = form.adminEmail.trim() !== '';

  return (
    <div>
      <h2 style={{
        fontFamily: font.display,
        fontSize: 22,
        fontWeight: 700,
        color: C.white,
        marginBottom: 6
      }}>
        Primary Administrator
      </h2>
      <p style={{
        color: C.slate,
        fontSize: 14,
        marginBottom: 28
      }}>
        This person will manage users and settings for {form.org || 'the organisation'}.
      </p>

      <Input
        label="Full Name"
        value={form.adminName}
        onChange={(e) => updateForm('adminName', e.target.value)}
        placeholder="Dr. Sarah Chen"
        icon={User}
        required
      />

      <Input
        label="Work Email"
        type="email"
        value={form.adminEmail}
        onChange={(e) => updateForm('adminEmail', e.target.value)}
        placeholder="s.chen@company.com"
        icon={Mail}
        required
      />

      <Input
        label="Role / Job Title"
        value={form.adminRole}
        onChange={(e) => updateForm('adminRole', e.target.value)}
        placeholder="Head of Medical Affairs"
        icon={Briefcase}
      />

      <div style={{ display: 'flex', gap: 10 }}>
        <Btn variant="ghost" onClick={onBack}>← Back</Btn>
        <Btn
          onClick={onNext}
          style={{ opacity: canProceed ? 1 : 0.5 }}
        >
          Continue →
        </Btn>
      </div>
    </div>
  );
};

export default StepAdmin;
