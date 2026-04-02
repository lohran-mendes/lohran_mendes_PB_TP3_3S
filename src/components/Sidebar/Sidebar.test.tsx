import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Sidebar } from './Sidebar';
import { renderWithRouter } from '../../test-utils';

describe('Sidebar', () => {
  it('deve renderizar o logo LearnFlix', () => {
    renderWithRouter(<Sidebar isOpen={false} onClose={vi.fn()} />);
    expect(screen.getByText('LearnFlix')).toBeInTheDocument();
  });

  it('deve renderizar os links de navegacao', () => {
    renderWithRouter(<Sidebar isOpen={false} onClose={vi.fn()} />);
    expect(screen.getByText('My courses')).toBeInTheDocument();
    expect(screen.getByText('My calendar')).toBeInTheDocument();
    expect(screen.getByText('Library')).toBeInTheDocument();
  });

  it('deve chamar onClose ao clicar no botao de fechar', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    renderWithRouter(<Sidebar isOpen={true} onClose={onClose} />);

    await user.click(screen.getByLabelText('Fechar menu'));
    expect(onClose).toHaveBeenCalled();
  });
});
