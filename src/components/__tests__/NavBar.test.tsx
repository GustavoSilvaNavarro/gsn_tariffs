import { expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { userEvent } from '@testing-library/user-event';

import { NavBar } from '../NavBar'; // Adjust the import path if your file structure is different

vi.mock('@/assets/edf_logo.png', () => ({
  default: 'mocked-gsn-logo.png',
}));

describe('NavBar Component tests', () => {
  test('Component should render the data and take a snapshot', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <NavBar />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });

  test('Should render the GSN logo and title correctly', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>,
    );

    const logoElement = screen.getByAltText(/logo/i);

    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveAttribute('src', 'mocked-gsn-logo.png');
    expect(screen.getByText(/gsn/i)).toBeInTheDocument();
  });

  test('Should renders all navigation links with correct `href` attributes', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>,
    );

    // Find the Home link using its `data-testid` and check its `href`
    const homeLink = screen.getByTestId('cy-home-route');

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');

    const utilitiesLink = screen.getByTestId('cy-utilities-route');

    expect(utilitiesLink).toBeInTheDocument();
    expect(utilitiesLink).toHaveAttribute('href', '/utilities');

    const tariffsLink = screen.getByTestId('cy-tariffs-route');
    const tariffsHeading = within(tariffsLink).getByText('Tariffs', { selector: 'h3' });

    expect(tariffsLink).toBeInTheDocument();
    expect(tariffsLink).toHaveAttribute('href', '/tariffs');
    expect(tariffsHeading).toHaveTextContent('Tariffs');
    expect(tariffsLink).toContainElement(tariffsHeading);
  });

  test('Should navigates to the utilities page when the utilities link is clicked', async () => {
    const user = userEvent.setup();
    const UtilitiesPage = () => <div>Utilities Page</div>;

    render(
      <MemoryRouter initialEntries={['/', '/utilities']}>
        <NavBar />
        <Routes>
          <Route path="/utilities" element={<UtilitiesPage />} />
        </Routes>
      </MemoryRouter>,
    );

    const utilitiesLink = screen.getByRole('link', { name: /utilities/i });
    await user.click(utilitiesLink);

    expect(screen.getByText('Utilities Page')).toBeInTheDocument();
  });

  test('Should render Material-UI icons', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>,
    );

    const icons = screen.getAllByTestId('navbar-mui-icons');

    expect(icons).toHaveLength(2);
  });
});
