import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi, type Mock } from 'vitest';
import { mockListUtilities } from '@/components/__mocks__/utilitiesDataMocks';

import { Utility } from '../Utility';

vi.mock('@/state/genability/genabilitySlice', () => ({
  useGetAllUtilityDataQuery: vi.fn(),
}));

import { useGetAllUtilityDataQuery } from '@/state/genability/genabilitySlice';

const useGetAllUtilityDataQueryMock = useGetAllUtilityDataQuery as Mock;

describe('Utility Component tests', () => {
  test('Should render loading state', () => {
    useGetAllUtilityDataQueryMock.mockReturnValue({ isLoading: true });

    render(<Utility />);

    const loader = screen.getByText('Loading...');

    expect(loader).toBeInTheDocument();
  });

  test('should render error state', () => {
    useGetAllUtilityDataQueryMock.mockReturnValue({ isError: true, isLoading: false });

    render(<Utility />);

    expect(screen.getByText('Error...')).toBeInTheDocument();
  });

  test('should render data table when fetch is successful', async () => {
    useGetAllUtilityDataQueryMock.mockReturnValue({ data: mockListUtilities, isLoading: false, isError: false });

    render(<Utility />);

    const rowsData = await screen.findAllByTestId(/^cy-row-/);

    expect(screen.getByText('List of Utilities')).toBeInTheDocument();
    expect(rowsData).toHaveLength(mockListUtilities.results.length);
  });
});
