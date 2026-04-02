import { screen } from '@testing-library/react';
import { PrivateRoute } from './PrivateRoute';
import { renderWithRouter, seedMockUser } from '../../test-utils';

describe('PrivateRoute', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('deve redirecionar para /login quando nao autenticado', () => {
    renderWithRouter(
      <PrivateRoute>
        <p>Conteudo protegido</p>
      </PrivateRoute>,
      { initialEntries: ['/'] },
    );

    expect(screen.queryByText('Conteudo protegido')).not.toBeInTheDocument();
  });

  it('deve renderizar children quando autenticado', () => {
    seedMockUser();

    renderWithRouter(
      <PrivateRoute>
        <p>Conteudo protegido</p>
      </PrivateRoute>,
      { initialEntries: ['/'] },
    );

    expect(screen.getByText('Conteudo protegido')).toBeInTheDocument();
  });
});
