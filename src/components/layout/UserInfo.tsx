import { useUserInfo } from '../../hooks/useUserInfo';

/**
 * UserInfo Component
 * 
 * Displays user information in the left sidebar including:
 * - User avatar icon (Font Awesome user-circle)
 * - Username
 * - Balance in thousands (K) format
 * 
 * Uses TanStack Query to fetch user data from the API.
 */
export const UserInfo = () => {
  const { data, isLoading } = useUserInfo();

  // Format balance to show 2 decimal places with K suffix
  const formatBalance = (balance: number): string => {
    return `${balance.toFixed(2)} K`;
  };

  return (
    <div className="user-area">
      <div className="media">
        <div className="avatar align-self-start mr-3">
          <i className="fas fa-user-circle"></i>
        </div>
        <div className="media-body">
          <h5 className="mt-0 username">
            {isLoading ? 'Đang tải...' : data?.username || 'Guest'}
          </h5>
          <p className="balance">
            {isLoading ? '0.00 K' : formatBalance(data?.balance || 0)}
          </p>
        </div>
      </div>
    </div>
  );
};

