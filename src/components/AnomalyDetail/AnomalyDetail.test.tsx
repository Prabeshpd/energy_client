import { render, waitFor, screen } from '@testing-library/react';

import { useAppDispatch, useAppSelector } from '@/hooks/store';

import AnomalyDetail from './AnomalyDetail';
import TestWrapper from '../../../test/testWrapper/TestWrapper';

jest.mock('../../hooks/store');

const mockDispatch = jest.fn();

describe('Lists Anomaly Detail', () => {
  describe('given there are no records', () => {
    it('renders the component with empty rows', async () => {
      const store = {
        projectHistory: {
          projectHistoryByAnomaly: [],
          isLoadingFetchProjectHistoryByAnomaly: false,
        },
        projects: {
          projects: [],
          selectedProjects: [],
        },
      };
      (useAppSelector as jest.Mock).mockImplementation((callback) => callback(store));
      (useAppDispatch as jest.Mock).mockImplementation(() => mockDispatch);

      render(
        <TestWrapper>
          <AnomalyDetail />
        </TestWrapper>
      );

      await waitFor(() => {
        const table = screen.queryByTestId('anomaly-table-body');

        expect(table?.children.length).toEqual(0);
      });
      const tableHeaderColumns = screen.getByTestId('table-header-columns');

      expect(screen.queryByText('Project Name')).toBeInTheDocument();
      expect(tableHeaderColumns.children.item(0)?.textContent).toEqual('Project Name');
    });
  });

  describe('given there are records', () => {
    it('renders the table with valid rows', async () => {
      const store = {
        projectHistory: {
          projectHistoryByAnomaly: [{ time: 1, id: 1 }],
          isLoadingFetchProjectHistoryByAnomaly: false,
        },
        projects: {
          projects: [{ id: 1, projectName: 'project' }],
          selectedProjects: [],
        },
      };
      (useAppSelector as jest.Mock).mockImplementation((callback) => callback(store));
      (useAppDispatch as jest.Mock).mockImplementation(() => mockDispatch);

      render(
        <TestWrapper>
          <AnomalyDetail />
        </TestWrapper>
      );

      await waitFor(() => {
        const table = screen.queryByTestId('anomaly-table-body');

        expect(table?.children.length).toEqual(1);
      });
    });
  });
});
