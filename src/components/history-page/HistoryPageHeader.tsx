import { useGameList } from '../../hooks/useGameList';

interface HistoryPageHeaderProps {
  selectedGameId: number;
  onGameModeChange: (gameId: number) => void;
}

export const HistoryPageHeader = ({
  selectedGameId,
  onGameModeChange,
}: HistoryPageHeaderProps) => {
  const { data: gameList } = useGameList();

  const handleGameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onGameModeChange(parseInt(e.target.value));
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <span className="navbar-brand">Sao kê</span>
      <div id="navbarSupportedContent" className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item mr-2">
            <select
              className="form-control mr-sm-2"
              value={selectedGameId}
              onChange={handleGameChange}
            >
              {gameList?.rows.map((game) => (
                <option key={game.id} value={game.id}>
                  {game.name}
                </option>
              ))}
            </select>
          </li>
        </ul>
      </div>
    </nav>
  );
};

