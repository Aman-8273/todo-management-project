import { createContext, useState, ReactNode, useEffect, useMemo } from 'react';
import { UserContextType } from '../types';

// Create the context
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

// UserProvider
interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  // Getting token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token1');
    if (storedToken) {
      setToken(storedToken);
      setAuthenticated(true);
    }
  }, []);

  // Create values for context
  const values = useMemo(
    () => ({
      authenticated,
      token,
      setAuthenticated,
      setToken,
    }),
    [authenticated, token]
  );

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export default UserProvider;
