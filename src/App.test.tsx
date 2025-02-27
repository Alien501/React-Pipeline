import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('increments counter', () => {
  render(<App />);
  const button = screen.getByText(/Increment/i);
  const countDisplay = screen.getByText(/Count: 0/i);
  
  fireEvent.click(button);
  expect(countDisplay).toHaveTextContent('Count: 1');
});