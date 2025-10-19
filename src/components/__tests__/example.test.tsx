import { render, screen } from '@testing-library/react';
import React from 'react';

function ButtonComponent() {
  return <button>Click Me</button>;
}

test('renders a button with text', () => {
  render(<ButtonComponent />);
  const button = screen.getByRole('button', { name: /click me/i });
  expect(button).toBeInTheDocument();
});