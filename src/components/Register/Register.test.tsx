import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Register } from './Register';
import { renderWithRouter } from '../../test-utils';
import { registerUser } from '../../services/auth.service';

describe('Register', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('deve renderizar todos os campos do formulario', () => {
    renderWithRouter(<Register />, { initialEntries: ['/register'] });

    expect(screen.getByLabelText('Nome completo')).toBeInTheDocument();
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Senha')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cadastrar' })).toBeInTheDocument();
  });

  it('deve exibir link para login', () => {
    renderWithRouter(<Register />, { initialEntries: ['/register'] });

    expect(screen.getByText('Entrar')).toBeInTheDocument();
  });

  it('deve validar campos obrigatorios', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Register />, { initialEntries: ['/register'] });

    await user.click(screen.getByRole('button', { name: 'Cadastrar' }));

    expect(screen.getByText('Nome completo é obrigatório.')).toBeInTheDocument();
    expect(screen.getByText('E-mail é obrigatório.')).toBeInTheDocument();
    expect(screen.getByText('Senha é obrigatória.')).toBeInTheDocument();
  });

  it('deve validar tamanho minimo da senha', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Register />, { initialEntries: ['/register'] });

    await user.type(screen.getByLabelText('Senha'), '1234567');
    await user.click(screen.getByRole('button', { name: 'Cadastrar' }));

    expect(screen.getByText('A senha deve ter no mínimo 8 caracteres.')).toBeInTheDocument();
  });

  it('deve exibir erro para email ja cadastrado', async () => {
    registerUser({
      email: 'user@test.com',
      password: 'senha1234',
      fullName: 'Existing User',
    });

    const user = userEvent.setup();
    renderWithRouter(<Register />, { initialEntries: ['/register'] });

    await user.type(screen.getByLabelText('Nome completo'), 'Novo User');
    await user.type(screen.getByLabelText('E-mail'), 'user@test.com');
    await user.type(screen.getByLabelText('Senha'), 'senha1234');

    await user.click(screen.getByRole('button', { name: 'Cadastrar' }));

    expect(screen.getByText('Este e-mail já está cadastrado.')).toBeInTheDocument();
  });
});
