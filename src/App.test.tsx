// src/App.test.tsx
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('renders portfolio name', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: /Kisakye Paul/i, level: 1 })
    ).toBeInTheDocument();
  });
});
