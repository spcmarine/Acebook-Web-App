import { render, screen } from '@testing-library/react';
import Feed from './Feed'

test('renders a post with a message', () => {
  render(<Feed />);
  const feed = screen.getByRole("feed")
  expect(feed).toHaveTextContent("Posts")
})