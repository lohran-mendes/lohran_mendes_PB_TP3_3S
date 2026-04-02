import { registerUser, authenticateUser, getSession, saveSession, clearSession } from './auth.service';
import type { User } from '../interfaces/auth.interface';

describe('auth.service', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('registerUser', () => {
    it('deve registrar um usuario com sucesso', () => {
      const result = registerUser({
        email: 'user@test.com',
        password: 'senha1234',
        fullName: 'Teste User',
      });

      expect(result.success).toBe(true);
      expect(result.error).toBeUndefined();

      const stored = JSON.parse(localStorage.getItem('learnflix_users')!);
      expect(stored).toHaveLength(1);
      expect(stored[0].email).toBe('user@test.com');
      expect(stored[0].password).toBe(btoa('senha1234'));
    });

    it('deve retornar erro para email duplicado', () => {
      registerUser({
        email: 'user@test.com',
        password: 'senha1234',
        fullName: 'User 1',
      });

      const result = registerUser({
        email: 'user@test.com',
        password: 'outrasenha',
        fullName: 'User 2',
      });

      expect(result.success).toBe(false);
      expect(result.error).toBe('Este e-mail já está cadastrado.');
    });
  });

  describe('authenticateUser', () => {
    beforeEach(() => {
      registerUser({
        email: 'user@test.com',
        password: 'senha1234',
        fullName: 'Teste User',
      });
    });

    it('deve autenticar com credenciais corretas', () => {
      const result = authenticateUser('user@test.com', 'senha1234');

      expect(result.success).toBe(true);
      expect(result.user).toBeDefined();
      expect(result.user!.email).toBe('user@test.com');
      expect(result.user!.fullName).toBe('Teste User');
    });

    it('deve retornar erro para senha incorreta', () => {
      const result = authenticateUser('user@test.com', 'senhaerrada');

      expect(result.success).toBe(false);
      expect(result.error).toBe('E-mail ou senha inválidos.');
      expect(result.user).toBeUndefined();
    });

    it('deve retornar erro para email inexistente', () => {
      const result = authenticateUser('outro@test.com', 'senha1234');

      expect(result.success).toBe(false);
      expect(result.error).toBe('E-mail ou senha inválidos.');
    });
  });

  describe('session', () => {
    it('deve salvar e recuperar sessao', () => {
      const user: User = {
        id: 'abc-123',
        email: 'user@test.com',
        fullName: 'Teste User',
      };

      saveSession(user);
      const session = getSession();

      expect(session).toEqual(user);
    });

    it('deve retornar null quando nao ha sessao', () => {
      expect(getSession()).toBeNull();
    });

    it('deve limpar sessao', () => {
      const user: User = {
        id: 'abc-123',
        email: 'user@test.com',
        fullName: 'Teste User',
      };

      saveSession(user);
      clearSession();

      expect(getSession()).toBeNull();
    });
  });
});
