import { describe, it, render, waitFor } from '@/test';

import { Head } from './Head';
import { appName } from '@/config';

describe('<Head/>', () => {
  it('should add proper page title and meta description', async () => {
    const title = 'Hello World';
    const titleSuffix = ` | ${appName}`;
    const description = 'This is a description';

    await render(<Head title={title} description={description} />, { user: null });
    await waitFor(() => expect(document.title).toEqual(title + titleSuffix));

    const metaDescription = document.querySelector("meta[name='description']");

    expect(metaDescription?.getAttribute('content')).toEqual(description);
  });
});
