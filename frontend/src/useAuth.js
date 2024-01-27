// useAuth.js

import { useState, useEffect } from 'react';
import { isAuthenticated } from './Backend';

const useAuth = () => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const user = isAuthenticated();
      setAuthenticatedUser(user);
    };

    checkAuthentication();
  }, []);

  return authenticatedUser;
};

export default useAuth;
