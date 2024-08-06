import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import App from '../App';

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText(/STOCKS OVERVIEW/i)).toBeInTheDocument();
  });
});
