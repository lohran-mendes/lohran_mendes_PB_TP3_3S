export interface User {
  id: string;
  email: string;
  fullName: string;
  profilePhoto?: string;
}

export interface StoredUser extends User {
  password: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => LoginResult;
  register: (data: RegisterData) => RegisterResult;
  logout: () => void;
  updateProfilePhoto: (photo: string) => void;
}

export interface RegisterData {
  email: string;
  password: string;
  fullName: string;
}

export interface LoginResult {
  success: boolean;
  error?: string;
}

export interface RegisterResult {
  success: boolean;
  error?: string;
}
