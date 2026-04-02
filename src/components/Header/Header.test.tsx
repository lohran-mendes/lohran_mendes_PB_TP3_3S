import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from './Header';
import { renderWithRouter } from '../../test-utils';

describe('Header', () => {
  it('deve renderizar o campo de busca', () => {
    renderWithRouter(<Header onMenuClick={vi.fn()} />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('deve chamar onMenuClick ao clicar no botao de menu', async () => {
    const user = userEvent.setup();
    const onMenuClick = vi.fn();
    renderWithRouter(<Header onMenuClick={onMenuClick} />);

    await user.click(screen.getByLabelText('Abrir menu'));
    expect(onMenuClick).toHaveBeenCalledTimes(1);
  });
});
