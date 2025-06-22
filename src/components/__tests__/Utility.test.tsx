import { screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { mockListUtilities } from '@/components/__mocks__/utilitiesDataMocks';
import { Utility } from '../Utility';
import { renderWithProviders } from '@/utils/tests/_testStore';
import { server } from '@/mockServer/server';
import { http, HttpResponse } from 'msw';
import { GENABILITY_API_URL } from '@/config';

describe('Utility Component tests', () => {
  test('Should render loading state', () => {
    renderWithProviders(<Utility />);

    const loader = screen.getByText('Loading...');

    expect(loader).toBeInTheDocument();
  });

  test('should render error state', async () => {
    server.use(
      http.get(`${GENABILITY_API_URL}/public/lses`, () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );
    renderWithProviders(<Utility />);

    expect(await screen.findByText('Error...')).toBeInTheDocument();
  });

  test('should render data table when fetch is successful', async () => {
    renderWithProviders(<Utility />);

    const rowsData = await screen.findAllByTestId(/^cy-row-/);

    expect(screen.getByText('List of Utilities')).toBeInTheDocument();
    expect(rowsData).toHaveLength(mockListUtilities.results.length);
  });
});
