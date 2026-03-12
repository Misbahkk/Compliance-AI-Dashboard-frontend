import { useState } from 'react';
import { PartyPopper } from 'lucide-react';
import { C, font } from '../../../styles/designTokens';
import GlassCard from '../../../components/GlassCard';
import Btn from '../../../components/Btn';
import { StepIndicator } from '../../../components/ui';
import StepOrganization from './StepOrganization';
import StepPlan from './StepPlan';
import StepAdmin from './StepAdmin';
import StepConfirm from './StepConfirm';

const STEPS = ['Organisation', 'Plan', 'Admin', 'Confirm'];

const INITIAL_FORM = {
  org: '',
  domain: '',
  plan: 'Enterprise',
  adminName: '',
  adminEmail: '',
  adminRole: ''
};

const OnboardingWizard = ({ onComplete, onSwitchToLogin }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(INITIAL_FORM);
  const [done, setDone] = useState(false);

  const updateForm = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleProvision = () => {
    setDone(true);
  };

  const handleReset = () => {
    setDone(false);
    setStep(1);
    setForm(INITIAL_FORM);
  };

  // Success Screen
  if (done) {
    return (
      <div style={{
        minHeight: '100vh',
        background: C.navy,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px'
      }}>
        <div style={{ textAlign: 'center', maxWidth: 500 }}>
          <div style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            background: `${C.green}20`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px'
          }}>
            <PartyPopper size={40} color={C.green} strokeWidth={1.5} />
          </div>
          
          <h1 style={{
            fontFamily: font.display,
            fontSize: 32,
            fontWeight: 700,
            color: C.white,
            marginBottom: 12
          }}>
            You're All Set!
          </h1>
          
          <p style={{
            color: C.slateLight,
            fontSize: 15,
            lineHeight: 1.6,
            marginBottom: 32
          }}>
            <strong style={{ color: C.white }}>{form.org}</strong> has been provisioned 
            on ReviewReady. Admin credentials have been sent to{' '}
            <strong style={{ color: C.teal }}>{form.adminEmail}</strong>.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <Btn onClick={onComplete}>
              Open Organisation Portal →
            </Btn>
            <Btn variant="ghost" onClick={handleReset}>
              Onboard Another
            </Btn>
          </div>
        </div>
      </div>
    );
  }

  // Wizard Steps
  return (
    <div style={{
      minHeight: '100vh',
      background: C.navy,
      padding: '60px 20px'
    }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{
            fontFamily: font.display,
            fontSize: 28,
            fontWeight: 700,
            color: C.white,
            marginBottom: 8
          }}>
            Onboard New Organisation
          </h1>
          <p style={{ color: C.slate, fontSize: 14 }}>
            Set up a new organisation on ReviewReady in minutes
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator steps={STEPS} currentStep={step} />

        {/* Form Card */}
        <GlassCard style={{ padding: 36 }}>
          {step === 1 && (
            <StepOrganization
              form={form}
              updateForm={updateForm}
              onNext={handleNext}
            />
          )}

          {step === 2 && (
            <StepPlan
              form={form}
              updateForm={updateForm}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {step === 3 && (
            <StepAdmin
              form={form}
              updateForm={updateForm}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {step === 4 && (
            <StepConfirm
              form={form}
              onProvision={handleProvision}
              onBack={handleBack}
            />
          )}
        </GlassCard>

        {/* Login Link */}
        <p style={{
          textAlign: 'center',
          color: C.slate,
          fontSize: 13,
          marginTop: 24
        }}>
          Already registered?{' '}
          <button
            onClick={onSwitchToLogin}
            style={{
              background: 'none',
              border: 'none',
              color: C.teal,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: font.body,
              fontSize: 13
            }}
          >
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
};

export default OnboardingWizard;
