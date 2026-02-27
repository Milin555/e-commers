/* global test, expect */
import { render, screen } from '@testing-library/react';
import { Shope } from './Shope';

test('renders learn react link', () => {
  render(<Shope />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
