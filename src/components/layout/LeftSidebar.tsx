import { useState } from 'react';
import type { GameCategory } from '../../types/api';

interface LeftSidebarProps {
  selectedNumbers: string[];
  category: GameCategory | null;
  onRemoveNumber: (number: string) => void;
  onClear: () => void;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
  bettingSlipContent: React.ReactNode;
}

export const LeftSidebar = ({
  bettingSlipContent
}: LeftSidebarProps) => {
  const [activeTab, setActiveTab] = useState<number>(1); // 1 = Biên đề, 2 = Bảng cược

  return (
    <div className="left-tab">
      <div className="tab-head">
        <a
          href="#"
          className={activeTab === 1 ? 'active' : ''}
          onClick={(e) => {
            e.preventDefault();
            setActiveTab(1);
          }}
        >
          BIÊN ĐỀ
        </a>
        <a
          href="#"
          className={activeTab === 2 ? 'active' : ''}
          onClick={(e) => {
            e.preventDefault();
            setActiveTab(2);
          }}
        >
          BẢNG CƯỢC
        </a>
      </div>
      <div className="tab-content">
        {activeTab === 1 && bettingSlipContent}
        {activeTab === 2 && (
          <div className="msg">
            <p>Chưa có cược nào</p>
          </div>
        )}
      </div>
    </div>
  );
};

