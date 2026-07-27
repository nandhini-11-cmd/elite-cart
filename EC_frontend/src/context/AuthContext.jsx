import { createContext, useEffect, useState } from "react";

import { jwtDecode } from "jwt-decode";

import {
  loginUser,
  registerUser,
  getProfile,
} from "../services/authService";

import {
  getToken,
  setToken,
  removeToken,
} from "../utils/token";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const login = async (values) => {
    const response = await loginUser(values);

    const token = response.data.token;

    setToken(token);

    const decoded = jwtDecode(token);

    setUser(decoded);

    return {
      ...response,
      user: decoded,
    };
  };

  const register = async (values) => {
    return await registerUser(values);
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        const token = getToken();

        if (!token) {
          setLoading(false);
          return;
        }

        const decoded = jwtDecode(token);
       console.log("Decoded User:", decoded);
        setUser(decoded);

        await getProfile();
      } catch (error) {
        removeToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;