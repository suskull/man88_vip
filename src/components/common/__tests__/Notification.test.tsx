import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Notification } from '../Notification';
import type { NotificationType } from '../Notification';

describe('Notification', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render notification with message', () => {
    const mockOnClose = vi.fn();
    render(
      <Notification
        message="Test notification"
        type="success"
        onClose={mockOnClose}
        duration={0}
      />
    );

    expect(screen.getByText('Test notification')).toBeInTheDocument();
  });

  it('should render success notification with correct class', () => {
    const mockOnClose = vi.fn();
    const { container } = render(
      <Notification
        message="Success message"
        type="success"
        onClose={mockOnClose}
        duration={0}
      />
    );

    const alert = container.querySelector('.alert');
    expect(alert).toHaveClass('alert-success');
  });

  it('should render error notification with correct class', () => {
    const mockOnClose = vi.fn();
    const { container } = render(
      <Notification
        message="Error message"
        type="error"
        onClose={mockOnClose}
        duration={0}
      />
    );

    const alert = container.querySelector('.alert');
    expect(alert).toHaveClass('alert-danger');
  });

  it('should render warning notification with correct class', () => {
    const mockOnClose = vi.fn();
    const { container } = render(
      <Notification
        message="Warning message"
        type="warning"
        onClose={mockOnClose}
        duration={0}
      />
    );

    const alert = container.querySelector('.alert');
    expect(alert).toHaveClass('alert-warning');
  });

  it('should render info notification with correct class', () => {
    const mockOnClose = vi.fn();
    const { container } = render(
      <Notification
        message="Info message"
        type="info"
        onClose={mockOnClose}
        duration={0}
      />
    );

    const alert = container.querySelector('.alert');
    expect(alert).toHaveClass('alert-info');
  });

  it('should display correct icon for success', () => {
    const mockOnClose = vi.fn();
    const { container } = render(
      <Notification
        message="Success"
        type="success"
        onClose={mockOnClose}
        duration={0}
      />
    );

    const icon = container.querySelector('.fa-check-circle');
    expect(icon).toBeInTheDocument();
  });

  it('should display correct icon for error', () => {
    const mockOnClose = vi.fn();
    const { container } = render(
      <Notification
        message="Error"
        type="error"
        onClose={mockOnClose}
        duration={0}
      />
    );

    const icon = container.querySelector('.fa-exclamation-circle');
    expect(icon).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', () => {
    const mockOnClose = vi.fn();
    render(
      <Notification
        message="Test"
        type="success"
        onClose={mockOnClose}
        duration={0}
      />
    );

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should auto-close after duration', () => {
    const mockOnClose = vi.fn();
    render(
      <Notification
        message="Test"
        type="success"
        onClose={mockOnClose}
        duration={3000}
      />
    );

    expect(mockOnClose).not.toHaveBeenCalled();

    vi.advanceTimersByTime(3000);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should not auto-close if duration is 0', () => {
    const mockOnClose = vi.fn();
    render(
      <Notification
        message="Test"
        type="success"
        onClose={mockOnClose}
        duration={0}
      />
    );

    vi.advanceTimersByTime(5000);

    expect(mockOnClose).not.toHaveBeenCalled();
  });
});

