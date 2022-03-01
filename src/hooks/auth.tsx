import React, { createContext, useContext, ReactNode } from "react";
import { SignIn } from "../screens/SignIn";

import * as AuthSession from "expo-auth-session";
interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}
interface IAuthContextData {
  user: User;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
}
export const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const user = {
    id: "1",
    name: "Marcelo",
    email: "imarcelo@gmail.com",
    photo: "www.google.com",
  };
  async function signInWithApple() {}

  async function signInWithGoogle() {
    try {
      const CLIENT_ID =
        "1076606786383-46o04aktii93j6q2fcjrn90b9l7gagq5.apps.googleusercontent.com";
      const REDIRECT_URI = "https://auth.expo.io/@mottax97/gofinances";
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI("profile email");
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
      console.log("Teste ");
      const response = AuthSession.startAsync({ authUrl });
      console.log(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signInWithApple }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
export { AuthProvider, useAuth };
