import { useState } from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
  leftSidebar?: React.ReactNode;
  rightSidebar?: React.ReactNode;
}

export const MainLayout = ({ children, leftSidebar, rightSidebar }: MainLayoutProps) => {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);

  return (
    <div className="ld-container">
      <div className={`ld-left ${isLeftSidebarOpen ? 'open' : ''}`}>
        {leftSidebar}
        <button
          className="toggle-btn"
          onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
          aria-label="Toggle left sidebar"
        >
          {isLeftSidebarOpen ? '◀' : '▶'}
        </button>
      </div>

      <div className="ld-center">
        {children}
      </div>

      <div className={`ld-right ${isRightSidebarOpen ? 'open' : ''}`}>
        {rightSidebar}
        <button
          className="arrow-btn"
          onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
          aria-label="Toggle right sidebar"
        >
          {isRightSidebarOpen ? '▶' : '◀'}
        </button>
      </div>
    </div>
  );
};
