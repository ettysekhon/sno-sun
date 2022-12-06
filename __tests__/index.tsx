import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '@/pages/index';
import { mockNavigatorGeolocation } from '../test-utils';

describe('Home', () => {
  it('renders a device location button', () => {
    render(<Home />);

    const button = screen.getByRole('button', {
      name: /Use device location/i,
    });

    expect(button).toBeInTheDocument();
  });

  it('displays an error message if unable to get current position', async () => {
    const message = 'An error occurred!';
    const { getCurrentPositionMock } = mockNavigatorGeolocation();
    getCurrentPositionMock.mockImplementation((success, rejected) =>
      rejected({
        message,
      })
    );

    render(<Home />);

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => screen.findByRole('alert'));

    expect(screen.getByText(message)).toBeInTheDocument();
  });
});
