import { createContext, useContext, useState } from "react";

// Create the context: a space to store the data we want to share across components
export const AuthContext = createContext();

// Custom hook to access the context
export const useAuthContext = () => {
  return useContext(AuthContext);
};

// AuthContextProvider is a component that wraps other components to share common data with them
export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("chat-user")) || null
  );

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
