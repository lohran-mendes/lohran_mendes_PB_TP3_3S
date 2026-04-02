import type { LoginResult, RegisterData, RegisterResult, StoredUser, User } from "../interfaces/auth.interface";

const USERS_KEY = "learnflix_users";
const SESSION_KEY = "learnflix_session";

function getUsers(): StoredUser[] {
  const data = localStorage.getItem(USERS_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data) as StoredUser[];
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function findUserByEmail(email: string): StoredUser | undefined {
  return getUsers().find((u) => u.email === email);
}

export function registerUser(data: RegisterData): RegisterResult {
  if (findUserByEmail(data.email)) {
    return { success: false, error: "Este e-mail já está cadastrado." };
  }

  const newUser: StoredUser = {
    id: crypto.randomUUID(),
    email: data.email,
    fullName: data.fullName,
    password: btoa(data.password),
  };

  const users = getUsers();
  users.push(newUser);
  saveUsers(users);

  return { success: true };
}

export function authenticateUser(
  email: string,
  password: string,
): LoginResult & { user?: User } {
  const stored = findUserByEmail(email);

  if (!stored) {
    return { success: false, error: "E-mail ou senha inválidos." };
  }

  if (stored.password !== btoa(password)) {
    return { success: false, error: "E-mail ou senha inválidos." };
  }

  const user: User = {
    id: stored.id,
    email: stored.email,
    fullName: stored.fullName,
  };

  return { success: true, user };
}

export function getSession(): User | null {
  const data = localStorage.getItem(SESSION_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data) as User;
  } catch {
    return null;
  }
}

export function saveSession(user: User): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}
