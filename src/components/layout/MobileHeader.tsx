import { RoundInfo, GameModeSelector } from '../common';

interface MobileHeaderProps {
  selectedGameId: number;
  onGameModeChange: (gameId: number) => void;
}

/**
 * MobileHeader Component
 * 
 * Mobile-optimized header layout without logo
 * - Game mode selector on the left
 * - Round info on the right
 */
export const MobileHeader = ({ selectedGameId, onGameModeChange }: MobileHeaderProps) => {
  return (
    <div className="header-mobile">
      <div className="select-mode">
        <GameModeSelector
          selectedGameId={selectedGameId}
          onGameModeChange={onGameModeChange}
        />
      </div>
      <RoundInfo gameId={selectedGameId} />
    </div>
  );
};

