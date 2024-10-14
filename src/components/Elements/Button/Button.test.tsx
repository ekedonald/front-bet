import { render, screen, describe, it, expect } from '@/test';

import { Button } from './Button';

describe('<Button/>', () => {
  it('should render correctly with initial props', async () => {
    await render(<Button>Click me</Button>, { user: null });
    expect(screen.getByRole('button', { name: /click me/i })).toBeEnabled();
  });

  it('should render link button correctly with initial props', async () => {
    await render(<Button.Link to="/">Click me</Button.Link>, { user: null });
    expect(screen.getByRole('link', { name: /click me/i })).toHaveAttribute('href', '/');
  });
});
