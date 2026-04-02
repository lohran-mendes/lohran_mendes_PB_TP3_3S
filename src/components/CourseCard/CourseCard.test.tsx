import { render, screen } from '@testing-library/react';
import { Card } from './CourseCard';
import type { VideoLesson } from '../../interfaces/api.interface';

const mockLesson: VideoLesson = {
  id: 1,
  number: 3,
  name: 'Introducao ao React',
  season: 1,
  summary: 'Aprenda o basico de React',
  runtime: 45,
  image: { original: 'https://example.com/imagem.jpg' },
};

describe('Card', () => {
  it('deve renderizar o titulo quando a prop title e fornecida', () => {
    render(<Card title="Titulo do Curso" />);
    expect(screen.getByText('Titulo do Curso')).toBeInTheDocument();
  });

  it('deve exibir a duracao quando showDuration e true', () => {
    render(<Card lesson={mockLesson} />);
    expect(screen.getByText('45 min')).toBeInTheDocument();
  });

  it('deve ocultar a duracao quando showDuration e false', () => {
    render(<Card lesson={mockLesson} showDuration={false} />);
    expect(screen.queryByText('45 min')).not.toBeInTheDocument();
  });
});
