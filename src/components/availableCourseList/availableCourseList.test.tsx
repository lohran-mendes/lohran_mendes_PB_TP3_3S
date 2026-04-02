import { screen } from '@testing-library/react';
import { AvailableCourseList } from './availableCourseList';
import { renderWithRouter } from '../../test-utils';
import type { ApiResponse } from '../../interfaces/api.interface';

const mockCourses: ApiResponse[] = [
  {
    id: 1,
    name: 'Fundamentos do React',
    summary: 'Aprenda React',
    image: { original: 'https://example.com/react.jpg' },
    videos: [
      {
        id: 101,
        number: 1,
        name: 'Basico de JSX',
        season: 1,
        summary: '',
        runtime: 30,
        image: { original: 'https://example.com/ep1.jpg' },
      },
    ],
  },
];

describe('AvailableCourseList', () => {
  it('deve renderizar o heading', () => {
    renderWithRouter(<AvailableCourseList course={mockCourses} />);
    expect(
      screen.getByRole('heading', { name: 'Available Course List' }),
    ).toBeInTheDocument();
  });

  it('deve renderizar um card para cada curso', () => {
    renderWithRouter(<AvailableCourseList course={mockCourses} />);
    expect(screen.getByText('Fundamentos do React')).toBeInTheDocument();
  });

  it('deve renderizar sem erros quando course e undefined', () => {
    renderWithRouter(<AvailableCourseList />);
    expect(
      screen.getByRole('heading', { name: 'Available Course List' }),
    ).toBeInTheDocument();
  });
});
