import { useEffect } from 'react';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface NotificationProps {
  message: string;
  type: NotificationType;
  onClose: () => void;
  duration?: number; // milliseconds
}

export const Notification = ({ message, type, onClose, duration = 3000 }: NotificationProps) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getAlertClass = (): string => {
    switch (type) {
      case 'success':
        return 'alert-success';
      case 'error':
        return 'alert-danger';
      case 'warning':
        return 'alert-warning';
      case 'info':
        return 'alert-info';
      default:
        return 'alert-info';
    }
  };

  const getIcon = (): string => {
    switch (type) {
      case 'success':
        return 'fa-check-circle';
      case 'error':
        return 'fa-exclamation-circle';
      case 'warning':
        return 'fa-exclamation-triangle';
      case 'info':
        return 'fa-info-circle';
      default:
        return 'fa-info-circle';
    }
  };

  return (
    <div
      className={`alert ${getAlertClass()} alert-dismissible fade show`}
      role="alert"
      style={{
        position: 'fixed',
        top: '80px',
        right: '20px',
        zIndex: 9999,
        minWidth: '300px',
        maxWidth: '500px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <i className={`fas ${getIcon()}`} style={{ marginRight: '10px' }}></i>
      {message}
      <button
        type="button"
        className="close"
        onClick={onClose}
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

