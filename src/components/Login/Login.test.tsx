import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Login } from './Login';
import { renderWithRouter } from '../../test-utils';
import { registerUser } from '../../services/auth.service';

describe('Login', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('deve renderizar campos de email e senha', () => {
    renderWithRouter(<Login />, { initialEntries: ['/login'] });

    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Senha')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
  });

  it('deve exibir link para cadastro', () => {
    renderWithRouter(<Login />, { initialEntries: ['/login'] });

    expect(screen.getByText('Cadastre-se')).toBeInTheDocument();
  });

  it('deve exibir erro ao submeter campos vazios', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Login />, { initialEntries: ['/login'] });

    await user.click(screen.getByRole('button', { name: 'Entrar' }));

    expect(screen.getByText('Preencha todos os campos.')).toBeInTheDocument();
  });

  it('deve exibir erro com credenciais invalidas', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Login />, { initialEntries: ['/login'] });

    await user.type(screen.getByLabelText('E-mail'), 'naoexiste@test.com');
    await user.type(screen.getByLabelText('Senha'), 'senha1234');
    await user.click(screen.getByRole('button', { name: 'Entrar' }));

    expect(screen.getByText('E-mail ou senha inválidos.')).toBeInTheDocument();
  });

  it('deve fazer login com credenciais validas', async () => {
    registerUser({
      email: 'user@test.com',
      password: 'senha1234',
      fullName: 'Teste User',
    });

    const user = userEvent.setup();
    renderWithRouter(<Login />, { initialEntries: ['/login'] });

    await user.type(screen.getByLabelText('E-mail'), 'user@test.com');
    await user.type(screen.getByLabelText('Senha'), 'senha1234');
    await user.click(screen.getByRole('button', { name: 'Entrar' }));

    expect(screen.queryByText('E-mail ou senha inválidos.')).not.toBeInTheDocument();
  });
});
