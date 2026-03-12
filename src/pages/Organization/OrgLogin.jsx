import { useState } from 'react';
import { Mail, Lock, Building2, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { C, font } from '../../styles/designTokens';
import GlassCard from '../../components/GlassCard';
import Btn from '../../components/Btn';
import { Input } from '../../components/ui';

const OrgLogin = ({ onLogin, onSwitchToOnboard }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    // Simulate login
    setTimeout(() => {
      setLoading(false);
      onLogin({ email, organization: 'AstraZeneca UK' });
    }, 1000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: C.navy,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px'
    }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        {/* Logo/Brand */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            background: `linear-gradient(135deg, ${C.teal}, ${C.tealDark})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: `0 0 40px ${C.tealGlow}`
          }}>
            <Building2 size={28} color={C.navy} strokeWidth={1.5} />
          </div>
          <h1 style={{
            fontFamily: font.display,
            fontSize: 28,
            fontWeight: 700,
            color: C.white,
            margin: '0 0 8px'
          }}>
            Organization Portal
          </h1>
          <p style={{
            color: C.slate,
            fontSize: 14,
            margin: 0
          }}>
            Sign in to access your compliance dashboard
          </p>
        </div>

        {/* Login Card */}
        <GlassCard style={{ padding: 32 }}>
          <form onSubmit={handleSubmit}>
            <Input
              label="Work Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              icon={Mail}
              required
            />

            <div style={{ marginBottom: 20 }}>
              <label style={{
                display: 'block',
                fontSize: 12,
                fontWeight: 600,
                color: C.slateLight,
                marginBottom: 8,
                letterSpacing: '0.03em'
              }}>
                Password <span style={{ color: C.red }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  left: 14,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: C.slate
                }}>
                  <Lock size={18} strokeWidth={1.5} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  style={{
                    width: '100%',
                    padding: '12px 44px',
                    background: `${C.navyLight}66`,
                    border: `1px solid ${C.border}`,
                    borderRadius: 10,
                    color: C.white,
                    fontSize: 14,
                    fontFamily: font.body,
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: 14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: C.slate,
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginBottom: 24
            }}>
              <button
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  color: C.teal,
                  fontSize: 13,
                  cursor: 'pointer',
                  fontFamily: font.body
                }}
              >
                Forgot password?
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div style={{
                background: `${C.red}15`,
                border: `1px solid ${C.red}33`,
                borderRadius: 8,
                padding: '12px 16px',
                marginBottom: 20
              }}>
                <p style={{ color: C.red, fontSize: 13, margin: 0 }}>{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <Btn
              onClick={handleSubmit}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
              {!loading && <ArrowRight size={18} />}
            </Btn>
          </form>

          {/* Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            margin: '28px 0',
            gap: 16
          }}>
            <div style={{ flex: 1, height: 1, background: C.border }} />
            <span style={{ color: C.slate, fontSize: 12 }}>OR</span>
            <div style={{ flex: 1, height: 1, background: C.border }} />
          </div>

          {/* SSO Button */}
          <Btn
            variant="ghost"
            style={{ width: '100%', marginBottom: 16 }}
          >
            Sign in with SSO
          </Btn>

          {/* Register Link */}
          <p style={{
            textAlign: 'center',
            color: C.slate,
            fontSize: 13,
            margin: 0
          }}>
            New organization?{' '}
            <button
              onClick={onSwitchToOnboard}
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
              Register here
            </button>
          </p>
        </GlassCard>

        {/* Footer */}
        <p style={{
          textAlign: 'center',
          color: C.slate,
          fontSize: 12,
          marginTop: 24
        }}>
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default OrgLogin;
