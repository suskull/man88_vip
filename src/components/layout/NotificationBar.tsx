import { Link } from "@tanstack/react-router";
import { useUserInfo } from '../../hooks/useUserInfo';

interface NotificationLink {
  text: string;
  href: string;
}

interface NotificationBarProps {
  message: string;
  links?: NotificationLink[];
  showUserInfo?: boolean; // For mobile layout
}

export const NotificationBar = ({
  message,
  showUserInfo = false,
}: NotificationBarProps) => {
  const { data: userInfo } = useUserInfo();

  return (
    <div className="container-fluid bg">
      <div className="row notify">
        {showUserInfo ? (
          // Mobile layout with user info
          <>
            <div className="col-4">
              <div className="users">
                <strong>{userInfo?.username || 'Guest'}</strong>
                <span>{userInfo?.balance.toFixed(2) || '0.00'}</span>
              </div>
            </div>
            <div className="col-8 text-right">
              <Link to="/" className="text-warning">
                Đánh đề
              </Link>{" "}
              |{" "}
              <a href="/history/60" className="text-warning">
                Sao kê
              </a>{" "}
              |{" "}
              <a href="/result/60" className="text-warning">
                Kết quả
              </a>
            </div>
          </>
        ) : (
          // Desktop layout with notification message
          <>
            <div className="col-8">
              <i className="fas fa-bullhorn text-warning"></i>{message}
            </div>
            <div className="col-4 text-right">
              <Link to="/" className="text-warning">
                Đánh đề
              </Link>{" "}
              |{" "}
              <a href="/history/60" className="text-warning">
                Sao kê
              </a>{" "}
              |{" "}
              <a href="/result/60" className="text-warning">
                Kết quả
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
