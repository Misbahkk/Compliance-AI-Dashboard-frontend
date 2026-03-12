import { C, font } from '../../styles/designTokens';
import Chip from '../Chip';

const PageHeader = ({ 
  badge, 
  title, 
  subtitle, 
  actions,
  badgeColor = C.teal 
}) => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'flex-start',
      marginBottom: 28 
    }}>
      <div>
        {badge && (
          <Chip color={badgeColor}>{badge}</Chip>
        )}
        <h1 style={{ 
          fontFamily: font.display, 
          fontSize: 26, 
          fontWeight: 700, 
          color: C.white, 
          margin: badge ? '10px 0 6px' : '0 0 6px' 
        }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ 
            color: C.slate, 
            fontSize: 14,
            margin: 0 
          }}>
            {subtitle}
          </p>
        )}
      </div>
      {actions && (
        <div style={{ display: 'flex', gap: 10 }}>
          {actions}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
