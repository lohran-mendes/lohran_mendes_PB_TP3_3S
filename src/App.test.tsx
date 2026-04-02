import { screen, waitFor } from '@testing-library/react';
import App from './App';
import { renderWithRouter, seedMockUser } from './test-utils';

const mockShows = [
  {
    id: 1,
    name: 'Show de Teste',
    summary: '<p>Um show de teste</p>',
    image: { original: 'https://example.com/show.jpg' },
  },
];

const mockEpisodes = [
  {
    id: 101,
    number: 1,
    name: 'Piloto',
    season: 1,
    summary: 'Primeiro episodio',
    runtime: 60,
    image: { original: 'https://example.com/ep.jpg' },
  },
];

function mockFetchResponses() {
  vi.spyOn(globalThis, 'fetch').mockImplementation((url) => {
    const urlStr = String(url);
    if (urlStr.includes('/episodes')) {
      return Promise.resolve({
        json: () => Promise.resolve(mockEpisodes),
      } as Response);
    }
    return Promise.resolve({
      json: () => Promise.resolve(mockShows),
    } as Response);
  });
}

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
    seedMockUser();
    mockFetchResponses();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('deve renderizar o Header e o Sidebar', () => {
    renderWithRouter(<App />);
    expect(screen.getByLabelText('Abrir menu')).toBeInTheDocument();
    expect(screen.getByText('LearnFlix')).toBeInTheDocument();
  });

  it('deve exibir a lista de cursos na rota inicial', async () => {
    renderWithRouter(<App />, { initialEntries: ['/'] });
    await waitFor(() => {
      expect(screen.getByText('Show de Teste')).toBeInTheDocument();
    });
  });

  it('deve redirecionar para login quando não autenticado', () => {
    localStorage.clear();
    renderWithRouter(<App />, { initialEntries: ['/'] });
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
  });
});
