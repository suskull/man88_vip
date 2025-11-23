import { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { isMobile } from 'react-device-detect';
import { NotificationBar } from '../components/layout/NotificationBar';
import { HistoryPageHeader } from '../components/history-page/HistoryPageHeader';
import { HistoryTable } from '../components/history-page/HistoryTable';
import { Pagination } from '../components/results-page/Pagination';
import { useHistoryList } from '../hooks/useHistoryList';
import { MobileHeader } from '../components/layout/MobileHeader';

export const Route = createFileRoute('/history/$gameId')({
  component: HistoryPage,
});

function HistoryPage() {
  const navigate = useNavigate();
  const { gameId } = Route.useParams();
  const [selectedGameId, setSelectedGameId] = useState<number>(parseInt(gameId) || 60);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Fetch history list
  const { data: historyData, isLoading } = useHistoryList(selectedGameId, currentPage);

  const handleGameModeChange = (gameId: number) => {
    setSelectedGameId(gameId);
    setCurrentPage(1);
    navigate({ to: '/history/$gameId', params: { gameId: gameId.toString() } });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Mobile layout
  if (isMobile) {
    return (
      <>
        <NotificationBar message="Chào mừng đến với hệ thống xổ số trực tuyến" showUserInfo/>
        <MobileHeader
          selectedGameId={selectedGameId}
          onGameModeChange={handleGameModeChange}
        />
        <div className="container-fluid">
          <div className="container history-container">
            <div className="history-mobile">
              <div className="history-title">
                <h5>Sao kê</h5>
              </div>

              <HistoryTable
                historyItems={historyData?.history || []}
                isLoading={isLoading}
              />

              {historyData && historyData.pagination && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={historyData.pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  // Desktop layout
  return (
    <>
      <NotificationBar message="Chào mừng đến với hệ thống xổ số trực tuyến" showUserInfo/>
      <div className="container-fluid">
        <div className="container">
          <div className="row">
            <HistoryPageHeader
              selectedGameId={selectedGameId}
              onGameModeChange={handleGameModeChange}
            />
          </div>

          <HistoryTable
            historyItems={historyData?.history || []}
            isLoading={isLoading}
          />

          {historyData && historyData.pagination && (
            <Pagination
              currentPage={currentPage}
              totalPages={historyData.pagination.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </>
  );
}

