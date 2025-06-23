import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Utility } from '../Utility';
import { server } from './utils/mockServer/server';
import { http, HttpResponse } from 'msw';
import { ReduxTestWrapper } from './utils/store/reduxTestWrapper';
import { GENABILITY_API_URL } from '@/config';

describe('Utility Component tests', () => {
  test('Should render loading state', async () => {
    render(
      <ReduxTestWrapper>
        <Utility />
      </ReduxTestWrapper>,
    );

    const loader = screen.getByText('Loading...');

    expect(loader).toBeInTheDocument();
  });

  test('Should render error state', async () => {
    // Override the handler to return an error for this test
    server.use(
      http.get(`${GENABILITY_API_URL}/public/lses`, () => {
        return HttpResponse.json({ message: 'Error' }, { status: 500 });
      }),
    );

    render(
      <ReduxTestWrapper>
        <Utility />
      </ReduxTestWrapper>,
    );

    const loadingComponent = screen.getByText('Loading...');
    const errorComponent = await screen.findByText('Error...');

    expect(loadingComponent).toBeInTheDocument();
    expect(errorComponent).toBeInTheDocument();
  });

  test('Should render data table when fetch is successful', async () => {
    render(
      <ReduxTestWrapper>
        <Utility />
      </ReduxTestWrapper>,
    );

    const rowsData = await screen.findAllByTestId(/^cy-row-/);

    expect(screen.getByText('List of Utilities')).toBeInTheDocument();
    expect(rowsData).toHaveLength(10);
  });
});
