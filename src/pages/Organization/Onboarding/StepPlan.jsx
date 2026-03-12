import { CheckCircle } from 'lucide-react';
import { C, font } from '../../../styles/designTokens';
import Btn from '../../../components/Btn';
import Chip from '../../../components/Chip';
import { SUBSCRIPTION_PLANS } from '../../../data/dummyData';

const StepPlan = ({ form, updateForm, onNext, onBack }) => {
  return (
    <div>
      <h2 style={{
        fontFamily: font.display,
        fontSize: 22,
        fontWeight: 700,
        color: C.white,
        marginBottom: 6
      }}>
        Choose a Plan
      </h2>
      <p style={{
        color: C.slate,
        fontSize: 14,
        marginBottom: 28
      }}>
        Select the subscription tier for {form.org || 'your organisation'}.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
        {SUBSCRIPTION_PLANS.map((plan) => {
          const isSelected = form.plan === plan.id;
          
          return (
            <div
              key={plan.id}
              onClick={() => updateForm('plan', plan.id)}
              style={{
                border: `2px solid ${isSelected ? C.teal : C.border}`,
                borderRadius: 14,
                padding: '18px 22px',
                cursor: 'pointer',
                background: isSelected ? `${C.teal}10` : `${C.navyLight}44`,
                transition: 'all 0.2s'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginBottom: 8
                  }}>
                    <span style={{
                      fontWeight: 700,
                      color: C.white,
                      fontSize: 16
                    }}>
                      {plan.id}
                    </span>
                    <Chip color={C.slate}>{plan.users}</Chip>
                    {plan.id === 'Enterprise' && (
                      <Chip color={C.amber}>RECOMMENDED</Chip>
                    )}
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 12
                  }}>
                    {plan.features.map((feature) => (
                      <span
                        key={feature}
                        style={{
                          fontSize: 12,
                          color: C.slate,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 5
                        }}
                      >
                        <CheckCircle size={12} color={C.slate} strokeWidth={1.5} />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{
                  fontFamily: font.display,
                  fontSize: 22,
                  fontWeight: 700,
                  color: isSelected ? C.teal : C.slateLight
                }}>
                  {plan.price}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <Btn variant="ghost" onClick={onBack}>← Back</Btn>
        <Btn onClick={onNext}>Continue →</Btn>
      </div>
    </div>
  );
};

export default StepPlan;
