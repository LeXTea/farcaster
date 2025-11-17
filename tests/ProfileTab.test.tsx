// imports
import React from 'react';
import {describe, it, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import {ProfileTab} from '~/components/ui/tabs/ProfileTab.tsx';
import {useWallet} from '~/lib/wallet-context.tsx';
import {toast} from 'sonner';

vi.mock('~/lib/wallet-context', () => ({
  useWallet: vi.fn(),
}));

vi.mock('sonner', () => ({
  toast: vi.fn(),
}));

describe('ProfileTab', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the user profile information', () => {
    (useWallet as vi.Mock).mockReturnValue({
      balance: 1000,
      bets: [],
      stats: { totalWins: 5, totalBets: 10, winRate: 50, totalWon: 5000 },
      addCoins: vi.fn(),
      updateBetStatus: vi.fn(),
    });

    render(<ProfileTab />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('@johndoe')).toBeInTheDocument();
    expect(screen.getByText('Level 1')).toBeInTheDocument();
  });

  it('renders wallet balance and allows adding coins', () => {
    const addCoinsMock = vi.fn();
    (useWallet as vi.Mock).mockReturnValue({
      balance: 1000,
      bets: [],
      stats: { totalWins: 5, totalBets: 10, winRate: 50, totalWon: 5000 },
      addCoins: addCoinsMock,
      updateBetStatus: vi.fn(),
    });

    render(<ProfileTab />);

    expect(screen.getByText('1,000')).toBeInTheDocument();
    screen.getByText('Add Coins').click();
    expect(addCoinsMock).toHaveBeenCalledWith(500);
    expect(toast).toHaveBeenCalledWith('Coins Added!', {
      description: '500 test coins have been added to your wallet.',
    });
  });

  it('renders statistics correctly', () => {
    (useWallet as vi.Mock).mockReturnValue({
      balance: 1000,
      bets: [],
      stats: { totalWins: 5, totalBets: 10, winRate: 50, totalWon: 5000 },
      addCoins: vi.fn(),
      updateBetStatus: vi.fn(),
    });

    render(<ProfileTab />);

    expect(screen.getByText('Total Wins')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Total Bets')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('Win Rate')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.getByText('Total Won')).toBeInTheDocument();
    expect(screen.getByText('5,000')).toBeInTheDocument();
  });

  it('renders recent activity and handles bet simulation', () => {
    const updateBetStatusMock = vi.fn();
    (useWallet as vi.Mock).mockReturnValue({
      balance: 1000,
      bets: [
        {
          id: '1',
          raceName: 'Race 1',
          horseName: 'Horse 1',
          odds: 2,
          timestamp: Date.now(),
          amount: 100,
          status: 'pending',
          potentialWin: 200,
        },
      ],
      stats: { totalWins: 5, totalBets: 10, winRate: 50, totalWon: 5000 },
      addCoins: vi.fn(),
      updateBetStatus: updateBetStatusMock,
    });

    render(<ProfileTab />);

    expect(screen.getByText('Recent Activity')).toBeInTheDocument();
    expect(screen.getByText('Race 1')).toBeInTheDocument();
    expect(screen.getByText('Horse 1')).toBeInTheDocument();
    expect(screen.getByText('100 coins')).toBeInTheDocument();

    screen.getByText('Simulate Win').click();
    expect(updateBetStatusMock).toHaveBeenCalledWith('1', 'won');
    expect(toast).toHaveBeenCalledWith('Congratulations!', {
      description: 'Your bet won!',
    });

    screen.getByText('Simulate Loss').click();
    expect(updateBetStatusMock).toHaveBeenCalledWith('1', 'lost');
    expect(toast).toHaveBeenCalledWith('Better luck next time', {
      description: 'Your bet lost.',
    });
  });
});
