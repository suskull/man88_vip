interface RoundSelectorProps {
  selectedRoundId: string;
  onRoundChange: (roundId: string) => void;
}

/**
 * RoundSelector Component
 * 
 * Dropdown selector for choosing which lottery round to view results for.
 * Generates a list of recent round IDs based on the current time.
 */
export const RoundSelector = ({ selectedRoundId, onRoundChange }: RoundSelectorProps) => {
  // Generate list of recent round IDs (last 10 rounds)
  const generateRecentRounds = (): string[] => {
    const rounds: string[] = [];
    const now = new Date();
    
    for (let i = 0; i < 10; i++) {
      const roundTime = new Date(now.getTime() - i * 60 * 1000); // Go back 1 minute each time
      const year = roundTime.getFullYear();
      const month = String(roundTime.getMonth() + 1).padStart(2, '0');
      const day = String(roundTime.getDate()).padStart(2, '0');
      const hours = String(roundTime.getHours()).padStart(2, '0');
      const minutes = String(roundTime.getMinutes()).padStart(2, '0');
      
      rounds.push(`${year}${month}${day}-${hours}${minutes}`);
    }
    
    return rounds;
  };

  const recentRounds = generateRecentRounds();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onRoundChange(e.target.value);
  };

  return (
    <div className="sphien">
      <select
        className="form-control"
        value={selectedRoundId}
        onChange={handleChange}
      >
        {recentRounds.map((roundId) => (
          <option key={roundId} value={roundId}>
            {roundId}
          </option>
        ))}
      </select>
    </div>
  );
};

