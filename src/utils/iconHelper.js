import * as LucideIcons from 'lucide-react';

// Helper function to dynamically render Lucide icons
export const renderIcon = (iconName, props = {}) => {
  const Icon = LucideIcons[iconName];
  if (!Icon) {
    console.warn(`Icon "${iconName}" not found in lucide-react`);
    return null;
  }
  return <Icon {...props} />;
};

export default renderIcon;
