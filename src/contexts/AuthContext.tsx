import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { AuthContextType, LoginResult, RegisterData, RegisterResult, User } from "../interfaces/auth.interface";
import {
  authenticateUser,
  clearSession,
  getSession,
  registerUser,
  saveSession,
  updateUserProfile,
} from "../services/auth.service";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => getSession());
  const navigate = useNavigate();

  function login(email: string, password: string): LoginResult {
    const result = authenticateUser(email, password);
    if (result.success && result.user) {
      setUser(result.user);
      saveSession(result.user);
    }
    return { success: result.success, error: result.error };
  }

  function register(data: RegisterData): RegisterResult {
    return registerUser(data);
  }

  function updateProfilePhoto(photo: string): void {
    if (!user) return;
    const updated = updateUserProfile(user.id, { profilePhoto: photo });
    if (updated) {
      setUser(updated);
    }
  }

  function removeProfilePhoto(): void {
    if (!user) return;
    const updated = updateUserProfile(user.id, { profilePhoto: null });
    if (updated) {
      setUser(updated);
    }
  }

  function updateFullName(name: string): void {
    if (!user) return;
    const updated = updateUserProfile(user.id, { fullName: name });
    if (updated) {
      setUser(updated);
    }
  }

  function logout(): void {
    setUser(null);
    clearSession();
    navigate("/login");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        login,
        register,
        logout,
        updateProfilePhoto,
        removeProfilePhoto,
        updateFullName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider.");
  }
  return context;
}
