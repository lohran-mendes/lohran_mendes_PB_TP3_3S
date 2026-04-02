import { render, screen } from '@testing-library/react';
import { CourseList } from './CourseList';
import type { ApiResponse } from '../../interfaces/api.interface';

const mockCourses: ApiResponse[] = [
  {
    id: 1,
    name: 'Fundamentos do React',
    summary: '<p>Aprenda React do zero</p>',
    image: { original: 'https://example.com/react.jpg' },
    videos: [
      {
        id: 101,
        number: 1,
        name: 'Basico de JSX',
        season: 1,
        summary: 'Introducao ao JSX',
        runtime: 30,
        image: { original: 'https://example.com/ep1.jpg' },
      },
    ],
  },
];

describe('CourseList', () => {
  it('deve renderizar o nome do curso como heading', () => {
    render(<CourseList courses={mockCourses} />);
    expect(screen.getByRole('heading', { name: 'Fundamentos do React' })).toBeInTheDocument();
  });

  it('deve renderizar o resumo do curso', () => {
    render(<CourseList courses={mockCourses} />);
    expect(screen.getByText('Aprenda React do zero')).toBeInTheDocument();
  });

  it('deve renderizar sem erros com array vazio', () => {
    render(<CourseList courses={[]} />);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });
});
