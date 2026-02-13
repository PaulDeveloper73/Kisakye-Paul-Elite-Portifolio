import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('renders portfolio name', () => {
    render(<App />);
    expect(screen.getByText(/Kisakye Paul/i)).toBeInTheDocument();
  });
});
