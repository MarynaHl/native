import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  const logIn = (name, email) => {
    setIsLoggedIn(true);
    setUsername(name);
    setUserEmail(email);
  };

  const logOut = () => {
    setIsLoggedIn(false);
    setUsername(null);
    setUserEmail(null);
  };

  return (
    <UserContext.Provider
      value={{ isLoggedIn, logIn, logOut, username, userEmail }}
    >
      {children}
    </UserContext.Provider>
  );
};
