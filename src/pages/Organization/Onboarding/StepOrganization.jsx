import { Building2, Globe } from 'lucide-react';
import { C, font } from '../../../styles/designTokens';
import Btn from '../../../components/Btn';
import { Input } from '../../../components/ui';

const StepOrganization = ({ form, updateForm, onNext }) => {
  const canProceed = form.org.trim() !== '';

  return (
    <div>
      <h2 style={{
        fontFamily: font.display,
        fontSize: 22,
        fontWeight: 700,
        color: C.white,
        marginBottom: 6
      }}>
        Organisation Details
      </h2>
      <p style={{
        color: C.slate,
        fontSize: 14,
        marginBottom: 28
      }}>
        Tell us about the organisation being onboarded.
      </p>

      <Input
        label="Organisation Name"
        value={form.org}
        onChange={(e) => updateForm('org', e.target.value)}
        placeholder="e.g. Pfizer UK Limited"
        icon={Building2}
        required
      />

      <Input
        label="Email Domain"
        value={form.domain}
        onChange={(e) => updateForm('domain', e.target.value)}
        placeholder="e.g. pfizer.com"
        icon={Globe}
      />

      <Btn
        onClick={onNext}
        style={{ marginTop: 8, opacity: canProceed ? 1 : 0.5 }}
      >
        Continue →
      </Btn>
    </div>
  );
};

export default StepOrganization;
