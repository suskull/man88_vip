import { isMobile } from "react-device-detect";
import { useGameList } from "../../hooks/useGameList";

interface ResultsPageHeaderProps {
  selectedGameId: number;
  onGameModeChange: (gameId: number) => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onSearch: () => void;
}

export const ResultsPageHeader = ({
  selectedGameId,
  onGameModeChange,
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchQueryChange,
  onSearch,
}: ResultsPageHeaderProps) => {
  const { data: gameList } = useGameList();

  const handleGameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onGameModeChange(parseInt(e.target.value));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch();
    }
  };

  if (isMobile) {
    return (
      <nav className="navbar navbar-expand-lg">
        <span className="navbar-brand">Kết quả</span>
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
      </nav>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg">
      <span className="navbar-brand">Kết quả</span>
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
        <li className="nav-item mr-2">
          <button
            className={`btn btn-outline-warning ${activeFilter === "today" ? "active" : ""}`}
            onClick={() => onFilterChange("today")}
          >
            Hôm nay
          </button>
        </li>
        <li className="nav-item mr-2">
          <button
            className={`btn btn-outline-warning ${activeFilter === "yesterday" ? "active" : ""}`}
            onClick={() => onFilterChange("yesterday")}
          >
            Hôm qua
          </button>
        </li>
        <li className="nav-item mr-2">
          <button
            className={`btn btn-outline-warning ${activeFilter === "7days" ? "active" : ""}`}
            onClick={() => onFilterChange("7days")}
          >
            7 ngày qua
          </button>
        </li>
        <li className="nav-item mr-2">
          <button
            className={`btn btn-outline-warning ${activeFilter === "month" ? "active" : ""}`}
            onClick={() => onFilterChange("month")}
          >
            Tháng này
          </button>
        </li>
      </ul>
      <form className="form-inline my-2 my-lg-0" onSubmit={handleSearchSubmit}>
        <input
          type="search"
          placeholder="Search"
          className="form-control mr-sm-2"
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          onKeyPress={handleSearchKeyPress}
        />
        <button type="submit" className="btn btn-outline-warning">
          Search
        </button>
      </form>
    </nav>
  );
};
