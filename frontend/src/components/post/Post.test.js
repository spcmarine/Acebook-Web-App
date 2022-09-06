import { render, screen } from '@testing-library/react';
import Post from './Post'

test('renders a post with a message', () => {
  render(<Post message="Hello, world" />);
  const post = screen.getByRole("post")
  expect(post).toHaveTextContent("Hello, world")
})

test('renders a post with another message', () => {
  render(<Post message="Hello again, world" />);
  const post = screen.getByRole("post")
  expect(post).toHaveTextContent("Hello again, world")
})