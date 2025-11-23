import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { isMobile } from 'react-device-detect';
import { NotificationBar } from '../components/layout/NotificationBar';
import { Header } from '../components/layout/Header';
import { MobileHeader } from '../components/layout/MobileHeader';
import { LeftSidebar } from '../components/layout/LeftSidebar';
import { GameArea } from '../components/betting/GameArea';
import { MobileGameArea } from '../components/betting/MobileGameArea';
import { BettingSlip } from '../components/betting/BettingSlip';
import { Notification } from '../components/common';
import { ResultsDisplay } from '../components/results';
import type { GameCategory } from '../types/api';
import type { NotificationType } from '../components/common';
import { UserInfo } from '@/components/layout/UserInfo';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const [selectedNumbers, setSelectedNumbers] = useState<string[]>([]);
  const [currentCategory, setCurrentCategory] = useState<GameCategory | null>(null);
  const [selectedGameId, setSelectedGameId] = useState<number>(60); // Default to 1 minute game
  const [notification, setNotification] = useState<{
    message: string;
    type: NotificationType;
  } | null>(null);

  const handleRemoveNumber = (number: string) => {
    setSelectedNumbers(prev => prev.filter(n => n !== number));
  };

  const handleClear = () => {
    setSelectedNumbers([]);
  };

  const handleSuccess = (message: string) => {
    setNotification({ message, type: 'success' });
  };

  const handleError = (message: string) => {
    setNotification({ message, type: 'error' });
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  const handleGameModeChange = (gameId: number) => {
    setSelectedGameId(gameId);
    // Clear betting slip when game mode changes
    setSelectedNumbers([]);
  };

  const bettingSlipContent = (
    <BettingSlip
      selectedNumbers={selectedNumbers}
      category={currentCategory}
      onRemoveNumber={handleRemoveNumber}
      onClear={handleClear}
      onSuccess={handleSuccess}
      onError={handleError}
    />
  );

  // Mobile layout
  if (isMobile) {
    return (
      <>
        <NotificationBar
          message="Chào mừng đến với hệ thống xổ số trực tuyến"
          showUserInfo={true}
        />
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={handleCloseNotification}
          />
        )}
        <div>
          <MobileHeader
            selectedGameId={selectedGameId}
            onGameModeChange={handleGameModeChange}
          />
          <MobileGameArea
            selectedNumbers={selectedNumbers}
            onNumbersChange={setSelectedNumbers}
            onCategoryChange={setCurrentCategory}
            onSuccess={handleSuccess}
            onError={handleError}
          />
        </div>
      </>
    );
  }

  // Desktop layout
  return (
    <>
      <NotificationBar
        message="Chào mừng đến với hệ thống xổ số trực tuyến"
      />
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={handleCloseNotification}
        />
      )}
      <div className="container-fluid">
        <div className="ld-container">
          <div className="ld-left">
            <UserInfo />
            <LeftSidebar
              selectedNumbers={selectedNumbers}
              category={currentCategory}
              onRemoveNumber={handleRemoveNumber}
              onClear={handleClear}
              onSuccess={handleSuccess}
              onError={handleError}
              bettingSlipContent={bettingSlipContent}
            />
          </div>
          <div className="ld-center">
            <Header
              selectedGameId={selectedGameId}
              onGameModeChange={handleGameModeChange}
            />
            <GameArea
              selectedNumbers={selectedNumbers}
              onNumbersChange={setSelectedNumbers}
              onCategoryChange={setCurrentCategory}
            />
          </div>
          <ResultsDisplay />
        </div>
      </div>
    </>
  );
}
