import '@testing-library/jest-dom';

import { render, waitFor, screen } from '@testing-library/react';

import { useAppDispatch, useAppSelector } from '@/hooks/store';

import Barchart from './Barchart';
import TestWrapper from '../../../test/testWrapper/TestWrapper';

jest.mock('../../hooks/store');

const mockDispatch = jest.fn();

describe('Lists Bar Chart', () => {
  describe('given there are no records', () => {
    it('renders the component with empty rows', async () => {
      const store = {
        projects: {
          projectEnergyConsumptionDetail: [],
          selectedProjects: [],
        },
      };
      (useAppSelector as jest.Mock).mockImplementation((callback) => callback(store));
      (useAppDispatch as jest.Mock).mockImplementation(() => mockDispatch);

      render(
        <TestWrapper>
          <Barchart />
        </TestWrapper>
      );

      await waitFor(() => {
        const chartComponent = screen.queryByTestId('bar-chart-bottom');

        expect(chartComponent).toEqual(null);
      });

      expect(screen.queryByText('Usage')).toBeInTheDocument();
    });
  });

  describe('given there are records', () => {
    it('renders the bar chart', async () => {
      const store = {
        projects: {
          projectEnergyConsumptionDetail: [{ projectName: 'Random', energyConsumption: 35 }],
          selectedProjects: [],
        },
      };
      (useAppSelector as jest.Mock).mockImplementation((callback) => callback(store));
      (useAppDispatch as jest.Mock).mockImplementation(() => mockDispatch);

      render(
        <TestWrapper>
          <Barchart />
        </TestWrapper>
      );

      await waitFor(() => {
        const chartComponent = screen.queryByTestId('bar-chart-Random');

        expect(chartComponent).not.toEqual(null);
      });

      expect(screen.queryByText('35 kw')).toBeInTheDocument();
      expect(screen.queryByText('Random')).toBeInTheDocument();
    });
  });
});
