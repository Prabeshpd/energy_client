import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { useSelectedLayoutSegment } from 'next/navigation';

import { useAppDispatch } from '@/hooks/store';

import HeaderComponent from './Header';
import TestWrapper from '../../../test/testWrapper/TestWrapper';

jest.mock('../../hooks/store');
jest.mock('next/navigation', () => ({ useSelectedLayoutSegment: jest.fn() }));

const mockDispatch = jest.fn();

describe('Header', () => {
  describe('renders the component', () => {
    it('renders the header component', async () => {
      (useAppDispatch as jest.Mock).mockImplementation(() => mockDispatch);

      render(
        <TestWrapper>
          <HeaderComponent />
        </TestWrapper>
      );

      expect(useSelectedLayoutSegment as jest.Mock).toHaveBeenCalled();
      expect(screen.getByText('Profile')).toBeInTheDocument();
      expect(screen.getByText('Log out')).toBeInTheDocument();
    });
  });

  describe('given the page is in navbar', () => {
    it('adds active property to class name', async () => {
      (useSelectedLayoutSegment as jest.Mock).mockReturnValue('profile');

      (useAppDispatch as jest.Mock).mockImplementation(() => mockDispatch);

      render(
        <TestWrapper>
          <HeaderComponent />
        </TestWrapper>
      );

      const element = screen.getByText('Profile');

      expect(element.classList.contains('app-header__link--active')).toBe(true);
    });
  });
});
