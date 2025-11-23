import { useState, useEffect } from 'react';
import { useResults } from '../../hooks/useResults';
import { ResultTable } from './ResultTable';
import { RoundSelector } from './RoundSelector';

const ChevronsLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevrons-left-icon lucide-chevrons-left"><path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/></svg>
)

const ChevronsRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevrons-right-icon lucide-chevrons-right"><path d="m6 17 5-5-5-5"/><path d="m13 17 5-5-5-5"/></svg>
)

/**
 * ResultsDisplay Component
 * 
 * Collapsible right sidebar that displays lottery results.
 * Features:
 * - Toggle button to show/hide sidebar
 * - Tab navigation (Kết quả xổ số / Thống kê)
 * - Round selector dropdown
 * - Result table with multiple view modes
 */
export const ResultsDisplay = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>(1); // 1 = Kết quả xổ số, 2 = Thống kê
  const [selectedRoundId, setSelectedRoundId] = useState<string>('');

  // Initialize with current round ID
  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const currentRoundId = `${year}${month}${day}-${hours}${minutes}`;
    setSelectedRoundId(currentRoundId);
  }, []);

  // Fetch results for selected round
  const { data: results, isLoading } = useResults(selectedRoundId);

  // Calculate sidebar styles based on open state
  const sidebarStyle = {
    right: isOpen ? '0px' : '0px',
    width: isOpen ? '400px' : '0px',
    padding: isOpen ? '10px 10px 10px 20px' : '0px',
  };

  const contentStyle = {
    display: isOpen ? 'block' : 'none',
  };

  return (
    <div className="ld-right" style={sidebarStyle}>
      <div className="arrow-btn">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(!isOpen);
          }}
          style={{ display: 'block', padding: '20px 10px' }}
        >
          {
            isOpen ? <ChevronsRight /> : <ChevronsLeft />
          }
        </a>
      </div>
      <div className="tab-right" style={contentStyle}>
        <div className="tab-head">
          <a
            href="#"
            className={activeTab === 1 ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab(1);
            }}
          >
            Kết quả xổ số
          </a>
          <a
            href="#"
            className={activeTab === 2 ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab(2);
            }}
          >
            Thống kê
          </a>
        </div>
        <h6 className="text-center">1 phút xổ 1 lần</h6>
        <div className="tab-content">
          {activeTab === 1 && (
            <>
              <RoundSelector
                selectedRoundId={selectedRoundId}
                onRoundChange={setSelectedRoundId}
              />
              <ResultTable results={results} isLoading={isLoading} />
            </>
          )}
          {activeTab === 2 && (
            <div className="text-center" style={{ padding: '20px' }}>
              <p>Thống kê chưa có dữ liệu</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

