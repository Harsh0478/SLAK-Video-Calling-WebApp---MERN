import { createContext, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { getToken } = useAuth();

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        try {
          const token = await getToken();

          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (error) {
          console.log("Error getting token:", error);

          if (
            error?.message?.toLowerCase().includes("auth") ||
            error?.message?.toLowerCase().includes("token")
          ) {
            toast.error("Authentication failed");
          }
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    // cleanup interceptor (VERY IMPORTANT) to prevent memory leaks
    return () => {
      axiosInstance.interceptors.request.eject(interceptor);
    };
  }, [getToken]);

 
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
