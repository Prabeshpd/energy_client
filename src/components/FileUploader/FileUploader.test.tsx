import '@testing-library/jest-dom';

import { render, screen, waitFor } from '@testing-library/react';

import FileUploader from './FileUploader';

describe('Upload', () => {
  const setFileUrl = jest.fn();

  it('renders the component', async () => {
    render(<FileUploader isLoading={false} handleChange={setFileUrl} />);

    await waitFor(() => {
      expect(screen.getByText('Upload Profile Picture')).toBeInTheDocument();
    });
  });
});
