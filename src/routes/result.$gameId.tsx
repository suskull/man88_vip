import { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { NotificationBar } from '../components/layout/NotificationBar';
import { ResultsPageHeader } from '../components/results-page/ResultsPageHeader';
import { ResultCard } from '../components/results-page/ResultCard';
import { Pagination } from '../components/results-page/Pagination';
import { useResultsList } from '../hooks/useResultsList';
import { isMobile } from 'react-device-detect';

export const Route = createFileRoute('/result/$gameId')({
  component: ResultsPage,
});

type DateFilter = 'today' | 'yesterday' | '7days' | 'month' | string;

function ResultsPage() {
  const navigate = useNavigate();
  const { gameId } = Route.useParams();
  const [selectedGameId, setSelectedGameId] = useState<number>(parseInt(gameId) || 60);
  const [dateFilter, setDateFilter] = useState<DateFilter>('today');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Fetch results list
  const { data: resultsData, isLoading } = useResultsList(
    selectedGameId,
    currentPage,
    dateFilter === 'today' ? 1 :
    dateFilter === 'yesterday' ? 2 :

    dateFilter === '7days' ? 3 :
    dateFilter === 'month' ? 4 :
    parseInt(dateFilter) || 1
  );

  const handleGameModeChange = (gameId: number) => {
    setSelectedGameId(gameId);
    setCurrentPage(1);
    navigate({ to: '/result/$gameId', params: { gameId: gameId.toString() } });
  };

  const handleDateFilterChange = (filter: DateFilter) => {
    setDateFilter(filter);
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setDateFilter(searchQuery.trim());
      setCurrentPage(1);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <NotificationBar
        message="Chào mừng đến với hệ thống xổ số trực tuyến"
        showUserInfo
      />
      <div className="container-fluid">
        <div className="container">
          <div className="row">
            <ResultsPageHeader
              selectedGameId={selectedGameId}
              onGameModeChange={handleGameModeChange}
              activeFilter={dateFilter}
              onFilterChange={handleDateFilterChange}
              searchQuery={searchQuery}
              onSearchQueryChange={setSearchQuery}
              onSearch={handleSearch}
            />
          </div>

          <div className="row row2 mt-3">
            {isLoading ? (
              <div className="col-12 text-center">
                <p>Đang tải...</p>
              </div>
            ) : resultsData && resultsData.results.length > 0 ? (
              resultsData.results.map((result, index) => (
                <div key={index} className={isMobile ? 'col-12' : 'col-4 p-2'}>
                  <ResultCard result={result} />
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p>Không có kết quả</p>
              </div>
            )}
          </div>

          {resultsData && resultsData.pagination && (
            <Pagination
              currentPage={currentPage}
              totalPages={resultsData.pagination.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </>
  );
}

