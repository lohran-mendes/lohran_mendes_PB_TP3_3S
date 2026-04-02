import { render, type RenderOptions } from '@testing-library/react';
import { type ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

export function renderWithRouter(
  ui: ReactElement,
  { initialEntries = ['/'], ...options }: RenderOptions & { initialEntries?: string[] } = {},
) {
  return render(ui, {
    wrapper: ({ children }) => (
      <MemoryRouter initialEntries={initialEntries}>
        <AuthProvider>{children}</AuthProvider>
      </MemoryRouter>
    ),
    ...options,
  });
}

export function seedMockUser() {
  const user = {
    id: 'test-user-id',
    email: 'test@example.com',
    fullName: 'Test User',
    password: btoa('password123'),
  };
  localStorage.setItem('learnflix_users', JSON.stringify([user]));
  localStorage.setItem(
    'learnflix_session',
    JSON.stringify({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
    }),
  );
}
