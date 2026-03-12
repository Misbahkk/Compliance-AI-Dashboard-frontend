import { useState } from 'react';
import { C, font } from '../../styles/designTokens';

const Input = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  type = 'text',
  icon: Icon,
  error,
  disabled = false,
  required = false
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ marginBottom: 20 }}>
      {label && (
        <label style={{ 
          display: 'block', 
          fontSize: 12, 
          fontWeight: 600, 
          color: C.slateLight, 
          marginBottom: 8,
          letterSpacing: '0.03em'
        }}>
          {label}
          {required && <span style={{ color: C.red, marginLeft: 4 }}>*</span>}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        {Icon && (
          <div style={{
            position: 'absolute',
            left: 14,
            top: '50%',
            transform: 'translateY(-50%)',
            color: focused ? C.teal : C.slate,
            transition: 'color 0.2s'
          }}>
            <Icon size={18} strokeWidth={1.5} />
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: '100%',
            padding: Icon ? '12px 16px 12px 44px' : '12px 16px',
            background: disabled ? `${C.navyLight}33` : `${C.navyLight}66`,
            border: `1px solid ${error ? C.red : focused ? C.teal : C.border}`,
            borderRadius: 10,
            color: disabled ? C.slate : C.white,
            fontSize: 14,
            fontFamily: font.body,
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'all 0.2s',
            cursor: disabled ? 'not-allowed' : 'text'
          }}
        />
      </div>
      {error && (
        <p style={{ 
          fontSize: 12, 
          color: C.red, 
          marginTop: 6,
          marginBottom: 0 
        }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
