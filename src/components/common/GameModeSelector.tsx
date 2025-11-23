import { useGameList } from '../../hooks/useGameList';

interface GameModeSelectorProps {
  selectedGameId: number;
  onGameModeChange: (gameId: number) => void;
}

export const GameModeSelector = ({ selectedGameId, onGameModeChange }: GameModeSelectorProps) => {
  const { data: gameListData, isLoading } = useGameList();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const gameId = parseInt(e.target.value, 10);
    onGameModeChange(gameId);
  };

  if (isLoading || !gameListData) {
    return (
      <div className="sphien">
        <select className="form-control" disabled>
          <option>Đang tải...</option>
        </select>
      </div>
    );
  }

  return (
    <div className="sphien">
      <select 
        className="form-control" 
        value={selectedGameId}
        onChange={handleChange}
      >
        {gameListData.rows.map((game) => (
          <option key={game.id} value={game.id}>
            {game.name}
          </option>
        ))}
      </select>
    </div>
  );
};

