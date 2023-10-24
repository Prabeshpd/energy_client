import '@testing-library/jest-dom';

import { render, waitFor, screen } from '@testing-library/react';

import { useAppDispatch, useAppSelector } from '@/hooks/store';

import ConsumptionOverview from './ConsumptionOverview';
import TestWrapper from '../../../test/testWrapper/TestWrapper';

jest.mock('../../hooks/store');

const mockDispatch = jest.fn();

describe('Renders Consumption Overview', () => {
  describe('given there are no records', () => {
    it('renders the component with record of zero', async () => {
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
          <ConsumptionOverview />
        </TestWrapper>
      );

      await waitFor(() => {
        const consumptionComponent = screen.queryByTestId('consumption-overview-energy');
        expect(consumptionComponent?.children.length).toEqual(2);
      });

      expect(screen.queryByText('Consumption Overview Detail')).toBeInTheDocument();
      expect(screen.queryAllByText('0 kw')).toHaveLength(2);
    });
  });

  describe('given there are records', () => {
    it('renders the component with accumulative sum', async () => {
      const store = {
        projects: {
          projectEnergyConsumptionDetail: [
            { projectName: 'Random', energyConsumption: 35 },
            { projectName: 'The Line', energyConsumption: 45 },
          ],
          selectedProjects: [],
        },
      };
      (useAppSelector as jest.Mock).mockImplementation((callback) => callback(store));
      (useAppDispatch as jest.Mock).mockImplementation(() => mockDispatch);

      render(
        <TestWrapper>
          <ConsumptionOverview />
        </TestWrapper>
      );

      await waitFor(() => {
        const consumptionComponent = screen.queryByTestId('consumption-overview-energy');
        expect(consumptionComponent?.children.length).toEqual(2);
      });

      expect(screen.queryByText('Consumption Overview Detail')).toBeInTheDocument();
      expect(screen.queryAllByText('80 kw')).toHaveLength(2);
    });
  });
});
