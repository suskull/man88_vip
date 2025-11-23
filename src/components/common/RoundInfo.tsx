import { useEffect, useState } from 'react';
import { useTimeLeft } from '../../hooks/useTimeLeft';

interface RoundInfoProps {
  gameId: number;
}

export const RoundInfo = ({ gameId }: RoundInfoProps) => {
  const { data, isLoading, refetch } = useTimeLeft(gameId);
  const [displayTime, setDisplayTime] = useState({ minutes: 0, seconds: 0 });
  const [shouldRefresh, setShouldRefresh] = useState(false);

  // Update display time when data changes
  useEffect(() => {
    if (data?.timeLeft !== undefined) {
      const minutes = Math.floor(data.timeLeft / 60);
      const seconds = data.timeLeft % 60;
      setDisplayTime({ minutes, seconds });

      // Check if countdown reached zero
      if (data.timeLeft <= 0 && !shouldRefresh) {
        setShouldRefresh(true);
      }
    }
  }, [data, shouldRefresh]);

  // Auto-refresh when countdown reaches zero
  useEffect(() => {
    if (shouldRefresh) {
      const timer = setTimeout(() => {
        refetch();
        setShouldRefresh(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [shouldRefresh, refetch]);

  if (isLoading && !data) {
    return (
      <div className="phien-info">
        <div className="info">
          <div className="phien">
            Lượt xổ tiếp theo
            <h6>--</h6>
          </div>
          <div className="minute">
            <h3>--</h3><span>Phút</span>
          </div>
          <div className="twodot">
            <h3>:</h3>
          </div>
          <div className="minute">
            <h3>--</h3><span>Giây</span>
          </div>
        </div>
      </div>
    );
  }

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className="phien-info">
      <div className="info">
        <div className="phien">
          Lượt xổ tiếp theo
          <h6>{data?.roundId || '--'}</h6>
        </div>
        <div className="minute">
          <h3>{formatNumber(displayTime.minutes)}</h3>
          <span>Phút</span>
        </div>
        <div className="twodot">
          <h3>:</h3>
        </div>
        <div className="minute">
          <h3>{formatNumber(displayTime.seconds)}</h3>
          <span>Giây</span>
        </div>
      </div>
    </div>
  );
};

