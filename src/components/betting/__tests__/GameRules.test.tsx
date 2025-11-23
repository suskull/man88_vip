import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GameRules } from '../GameRules';
import type { GameCategory } from '../../../types/api';

const mockCategory: GameCategory = {
  id: 1,
  name: 'Lô 2 số',
  type: 'baolo',
  guide: 'Đánh 2 chữ số cuối trong lô 27 giải. Thắng gấp {{ODDS}} lần, nếu số đó về N lần thì tính kết quả x N lần.',
  rate: 98,
  pay_number: 27,
  min_amount: 1000,
  max_amount: 10000000000,
  multi: 1,
  code: 'loto_2so',
  max: 100,
  active: 1,
  created_at: '2024-01-01',
  updated_at: '2024-01-01',
  max_number: 0
};

const mockCategory3Digit: GameCategory = {
  id: 10,
  name: '3 càng',
  type: '3cang',
  guide: 'Đánh 3 chữ số cuối của giải ĐB. Thắng gấp {{ODDS}} lần. Ví dụ: đánh 1k cho số 879, Tổng thanh toán: 1k.',
  rate: 980,
  pay_number: 1,
  min_amount: 1000,
  max_amount: 10000000000,
  multi: 1,
  code: '3cang',
  max: 1000,
  active: 1,
  created_at: '2024-01-01',
  updated_at: '2024-01-01',
  max_number: 0
};

describe('GameRules', () => {
  it('should render "Luật chơi" button', () => {
    render(<GameRules category={mockCategory} />);

    const button = screen.getByText(/Luật chơi/i);
    expect(button).toBeInTheDocument();
  });

  it('should display question circle icon', () => {
    render(<GameRules category={mockCategory} />);

    const icon = document.querySelector('.fa-question-circle');
    expect(icon).toBeInTheDocument();
  });

  it('should not display rules content initially', () => {
    render(<GameRules category={mockCategory} />);

    const guideContent = screen.queryByText(/Đánh 2 chữ số cuối/i);
    expect(guideContent).not.toBeInTheDocument();
  });

  it('should display rules content when button is clicked', () => {
    render(<GameRules category={mockCategory} />);

    const button = screen.getByText(/Luật chơi/i);
    fireEvent.click(button);

    const guideContent = screen.getByText(/Đánh 2 chữ số cuối/i);
    expect(guideContent).toBeInTheDocument();
  });

  it('should display category name in rules header', () => {
    render(<GameRules category={mockCategory} />);

    const button = screen.getByText(/Luật chơi/i);
    fireEvent.click(button);

    const header = screen.getByText(/Cược Lô 2 số/i);
    expect(header).toBeInTheDocument();
  });

  it('should display odds rate in rules header', () => {
    render(<GameRules category={mockCategory} />);

    const button = screen.getByText(/Luật chơi/i);
    fireEvent.click(button);

    const oddsText = screen.getByText(/1 ăn 98/i);
    expect(oddsText).toBeInTheDocument();
  });

  it('should replace {{ODDS}} placeholder with actual rate value', () => {
    render(<GameRules category={mockCategory} />);

    const button = screen.getByText(/Luật chơi/i);
    fireEvent.click(button);

    const guideContent = screen.getByText(/Thắng gấp 98 lần/i);
    expect(guideContent).toBeInTheDocument();
  });

  it('should hide rules content when button is clicked again', () => {
    render(<GameRules category={mockCategory} />);

    const button = screen.getByText(/Luật chơi/i);
    
    // Open
    fireEvent.click(button);
    expect(screen.getByText(/Đánh 2 chữ số cuối/i)).toBeInTheDocument();

    // Close
    fireEvent.click(button);
    expect(screen.queryByText(/Đánh 2 chữ số cuối/i)).not.toBeInTheDocument();
  });

  it('should handle 3-digit game rules correctly', () => {
    render(<GameRules category={mockCategory3Digit} />);

    const button = screen.getByText(/Luật chơi/i);
    fireEvent.click(button);

    const header = screen.getByText(/Cược 3 càng/i);
    expect(header).toBeInTheDocument();

    const oddsText = screen.getByText(/1 ăn 980/i);
    expect(oddsText).toBeInTheDocument();

    const guideContent = screen.getByText(/Thắng gấp 980 lần/i);
    expect(guideContent).toBeInTheDocument();
  });

  it('should return null when category is null', () => {
    const { container } = render(<GameRules category={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('should use correct CSS classes', () => {
    render(<GameRules category={mockCategory} />);

    const guideDiv = document.querySelector('.guide');
    expect(guideDiv).toBeInTheDocument();

    const button = guideDiv?.querySelector('.btn');
    expect(button).toBeInTheDocument();

    fireEvent.click(button!);

    const guideContent = document.querySelector('.guide-c');
    expect(guideContent).toBeInTheDocument();

    const guideDes = document.querySelector('.guide-des');
    expect(guideDes).toBeInTheDocument();

    const guideTitle = document.querySelector('.guide-t');
    expect(guideTitle).toBeInTheDocument();
  });
});

