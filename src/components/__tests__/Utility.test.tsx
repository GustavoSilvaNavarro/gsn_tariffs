import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi, beforeEach, type Mock } from 'vitest';
import { mockListUtilities } from '@/components/__mocks__/utilitiesDataMocks';
import { Utility } from '../Utility';

// Mock the Redux hook
vi.mock('@/state/genability/genabilitySlice', () => ({
  useGetAllUtilityDataQuery: vi.fn(),
}));

import { useGetAllUtilityDataQuery } from '@/state/genability/genabilitySlice';

// Type the mock
const mockUseGetAllUtilityDataQuery = useGetAllUtilityDataQuery as Mock;

describe('Utility Component tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Should render loading state', () => {
    mockUseGetAllUtilityDataQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    render(<Utility />);

    const loader = screen.getByText('Loading...');

    expect(loader).toBeInTheDocument();
  });

  test('should render error state', () => {
    mockUseGetAllUtilityDataQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });

    render(<Utility />);

    expect(screen.getByText('Error...')).toBeInTheDocument();
  });

  test('should render data table when fetch is successful', () => {
    mockUseGetAllUtilityDataQuery.mockReturnValue({
      data: mockListUtilities,
      isLoading: false,
      isError: false,
    });

    render(<Utility />);

    const rowsData = screen.getAllByTestId(/^cy-row-/);

    expect(screen.getByText('List of Utilities')).toBeInTheDocument();
    expect(rowsData).toHaveLength(mockListUtilities.results.length);
  });
});
