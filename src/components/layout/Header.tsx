import { RoundInfo, GameModeSelector } from '../common';

interface HeaderProps {
  selectedGameId: number;
  onGameModeChange: (gameId: number) => void;
}

export const Header = ({ selectedGameId, onGameModeChange }: HeaderProps) => {
  console.log(selectedGameId, 'selectedGameId')

  return (
    <div className="header">
      <div className="logo">
        <img src="/logo.png" alt="Logo" />
        <span className="selectedMode">{selectedGameId / 60} phút</span>
      </div>
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

