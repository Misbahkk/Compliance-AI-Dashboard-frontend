import { useState } from 'react';
import OrgLogin from './OrgLogin';
import { OnboardingWizard } from './Onboarding';
import { OrgDashboard } from './Dashboard';

const OrgPortal = () => {
  const [view, setView] = useState('login'); // login | onboard | dashboard
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setView('login');
  };

  const handleOnboardComplete = () => {
    setView('dashboard');
  };

  const switchToOnboard = () => {
    setView('onboard');
  };

  const switchToLogin = () => {
    setView('login');
  };

  if (view === 'login') {
    return (
      <OrgLogin
        onLogin={handleLogin}
        onSwitchToOnboard={switchToOnboard}
      />
    );
  }

  if (view === 'onboard') {
    return (
      <OnboardingWizard
        onComplete={handleOnboardComplete}
        onSwitchToLogin={switchToLogin}
      />
    );
  }

  return (
    <OrgDashboard
      organization={user?.organization || 'AstraZeneca UK'}
      onLogout={handleLogout}
    />
  );
};

export default OrgPortal;
