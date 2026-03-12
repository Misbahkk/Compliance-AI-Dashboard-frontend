import { CheckCircle } from 'lucide-react';
import { C, font } from '../../styles/designTokens';

const StepIndicator = ({ steps, currentStep }) => {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      marginBottom: 40 
    }}>
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isCompleted = currentStep > stepNumber;
        const isActive = currentStep === stepNumber;

        return (
          <div key={label} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: 8 
            }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: isCompleted ? C.green : isActive ? C.teal : C.border,
                color: isCompleted || isActive ? C.navy : C.slate,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 14,
                transition: 'all 0.3s'
              }}>
                {isCompleted ? (
                  <CheckCircle size={18} strokeWidth={2} />
                ) : (
                  stepNumber
                )}
              </div>
              <span style={{ 
                fontSize: 12, 
                color: isActive ? C.white : C.slate, 
                fontWeight: isActive ? 600 : 400,
                fontFamily: font.body
              }}>
                {label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div style={{
                width: 60,
                height: 2,
                background: currentStep > stepNumber ? C.teal : C.border,
                margin: '0 12px 24px',
                transition: 'all 0.3s'
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
