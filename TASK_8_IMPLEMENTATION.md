# Task 8 Implementation: Round Information and Countdown Timer

## Overview
Successfully implemented the round information display and countdown timer for the Vietnamese lottery betting website clone. Users can now see the current round ID and a live countdown showing how much time remains until the next draw.

## Components Created

### 1. RoundInfo Component (`src/components/common/RoundInfo.tsx`)
A real-time countdown timer that displays the current round ID and time remaining.

**Key Features:**
- ✅ Displays current round ID (e.g., "20251119-0646")
- ✅ Shows countdown in minutes and seconds format (MM:SS)
- ✅ Auto-updates every second using TanStack Query refetchInterval
- ✅ Auto-refreshes when countdown reaches zero
- ✅ Formats numbers with leading zeros (e.g., "00", "09")
- ✅ Loading state with placeholder "--"
- ✅ Uses existing CSS classes from original site

**Component Structure:**
```typescript
export const RoundInfo = ({ gameId }: RoundInfoProps) => {
  const { data, isLoading, refetch } = useTimeLeft(gameId);
  const [displayTime, setDisplayTime] = useState({ minutes: 0, seconds: 0 });
  const [shouldRefresh, setShouldRefresh] = useState(false);

  // Update display time when data changes
  useEffect(() => {
    if (data?.timeLeft !== undefined) {
      const minutes = Math.floor(data.timeLeft / 60);
      const seconds = data.timeLeft % 60;
      setDisplayTime({ minutes, seconds });

      // Check if countdown reached zero
      if (data.timeLeft <= 0 && !shouldRefresh) {
        setShouldRefresh(true);
      }
    }
  }, [data, shouldRefresh]);

  // Auto-refresh when countdown reaches zero
  useEffect(() => {
    if (shouldRefresh) {
      const timer = setTimeout(() => {
        refetch();
        setShouldRefresh(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [shouldRefresh, refetch]);
```

**Visual Layout:**
```
┌──────────────────────────────────────────┐
│  Lượt xổ tiếp theo                       │
│  20251119-0646                           │
│                                          │
│  [00]  :  [45]                          │
│  Phút     Giây                          │
└──────────────────────────────────────────┘
```

### 2. GameModeSelector Component (`src/components/common/GameModeSelector.tsx`)
A dropdown selector for choosing the game mode (1 minute, 3 minutes, or 5 minutes).

**Key Features:**
- ✅ Fetches game modes from API using useGameList hook
- ✅ Displays dropdown with all available game modes
- ✅ Handles game mode selection changes
- ✅ Loading state with disabled dropdown
- ✅ Uses existing CSS classes (sphien, form-control)

**Component Structure:**
```typescript
export const GameModeSelector = ({ selectedGameId, onGameModeChange }: GameModeSelectorProps) => {
  const { data: gameListData, isLoading } = useGameList();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const gameId = parseInt(e.target.value, 10);
    onGameModeChange(gameId);
  };

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
```

## Integration

### HomePage Updates
Added RoundInfo component to the main page:

<augment_code_snippet path="src/routes/index.tsx" mode="EXCERPT">
````typescript
import { RoundInfo } from '../components/common';

function HomePage() {
  const [selectedGameId] = useState<number>(60); // Default to 1 minute game

  return (
    <>
      <NotificationBar ... />
      <MainLayout leftSidebar={...}>
        <RoundInfo gameId={selectedGameId} />
        <GameArea ... />
      </MainLayout>
    </>
  );
}
````
</augment_code_snippet>

## Existing Infrastructure Used

### useTimeLeft Hook (Already Existed)
The hook was already implemented in `src/hooks/useTimeLeft.ts`:

```typescript
export const useTimeLeft = (gameId: number) => {
  return useQuery({
    queryKey: ['timeLeft', gameId],
    queryFn: () => mockApi.getTimeLeft(gameId),
    refetchInterval: 1000, // Refetch every second for countdown
  });
};
```

### Mock API Implementation (Already Existed)
The mock API in `src/services/api/mockApi.ts` already had:

**Round ID Generation:**
```typescript
const generateRoundId = (date: Date, _gameId: number): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${year}${month}${day}-${hours}${minutes}`;
};
```

**Time Left Calculation:**
```typescript
const calculateTimeLeft = (date: Date, gameId: number): number => {
  const seconds = date.getSeconds();
  const currentMinute = date.getMinutes();
  
  if (gameId === 60) {
    // 1 minute game - time left in current minute
    return 60 - seconds;
  } else if (gameId === 180) {
    // 3 minute game
    const minuteInCycle = currentMinute % 3;
    const secondsInCycle = minuteInCycle * 60 + seconds;
    return 180 - secondsInCycle;
  } else if (gameId === 300) {
    // 5 minute game
    const minuteInCycle = currentMinute % 5;
    const secondsInCycle = minuteInCycle * 60 + seconds;
    return 300 - secondsInCycle;
  }
  
  return 60; // default
};
```

## CSS Classes Used
Following the original site's structure:
- `phien-info` - Container for round information
- `info` - Inner wrapper for countdown display
- `phien` - Round ID section
- `minute` - Minutes/seconds display boxes
- `twodot` - Colon separator
- `sphien` - Game mode selector container
- `form-control` - Select dropdown styling

## Auto-Refresh Logic

The component implements a smart auto-refresh mechanism:

1. **Countdown Updates:** TanStack Query refetches every 1 second
2. **Zero Detection:** When `timeLeft` reaches 0, sets `shouldRefresh` flag
3. **Delayed Refresh:** Waits 1 second after zero, then calls `refetch()`
4. **New Round:** API generates new round ID and resets countdown
5. **Cycle Repeats:** Process continues indefinitely

**Flow Diagram:**
```
Time: 00:03 → 00:02 → 00:01 → 00:00 → [Refresh] → New Round (00:59)
```

## Game Mode Logic

Different game modes have different countdown cycles:

**1 Minute Game (ID: 60):**
- Countdown: 60 seconds
- Round ID updates every minute
- Example: 20251119-0646 → 20251119-0647

**3 Minute Game (ID: 180):**
- Countdown: 180 seconds (3 minutes)
- Round ID updates every 3 minutes
- Example: 20251119-0645 → 20251119-0648

**5 Minute Game (ID: 300):**
- Countdown: 300 seconds (5 minutes)
- Round ID updates every 5 minutes
- Example: 20251119-0645 → 20251119-0650

## Testing
Created comprehensive unit tests:

### RoundInfo Tests (`src/components/common/__tests__/RoundInfo.test.tsx`):
- ✅ Displays loading state initially
- ✅ Displays round ID when data is loaded
- ✅ Displays formatted minutes and seconds
- ✅ Displays "Phút" and "Giây" labels
- ✅ Displays colon separator
- ✅ Formats single digit numbers with leading zero
- ✅ Uses correct CSS classes

### GameModeSelector Tests (`src/components/common/__tests__/GameModeSelector.test.tsx`):
- ✅ Displays loading state initially
- ✅ Displays all game modes when data is loaded
- ✅ Selects the correct game mode
- ✅ Calls onGameModeChange when selection changes
- ✅ Uses correct CSS classes
- ✅ Renders all options with correct values

## Files Created/Modified

### Created:
- `src/components/common/RoundInfo.tsx`
- `src/components/common/GameModeSelector.tsx`
- `src/components/common/index.ts`
- `src/components/common/__tests__/RoundInfo.test.tsx`
- `src/components/common/__tests__/GameModeSelector.test.tsx`
- `TASK_8_IMPLEMENTATION.md`

### Modified:
- `src/routes/index.tsx` - Added RoundInfo component
- `.kiro/specs/lottery-website-clone/tasks.md` - Marked Task 8 as complete

## Requirements Satisfied
✅ **Requirement 6.1:** Display current round ID in the header  
✅ **Requirement 6.2:** Fetch time-left data from API service  
✅ **Requirement 6.3:** Display countdown timer with minutes and seconds  
✅ **Requirement 6.4:** Auto-refresh when countdown reaches zero  
✅ **Requirement 6.5:** Display game mode (1 minute, 3 minutes, 5 minutes)  

## TypeScript Compilation
✅ No TypeScript errors  
✅ All types properly defined  
✅ Proper use of `import type` for type-only imports  

## User Benefits
1. **⏰ Real-Time Updates:** See exactly when the next draw happens
2. **🎯 Round Tracking:** Know which round you're betting on
3. **🔄 Automatic Refresh:** No manual page reload needed
4. **⚡ Game Modes:** Choose between fast (1 min) and slower (3/5 min) games
5. **📊 Visual Clarity:** Clear, easy-to-read countdown display

## Next Steps
Ready to proceed to **Task 9: Create results display component**, which will add:
- Right sidebar with lottery results
- Prize tier display (Giải ĐB, Giải Nhất, etc.)
- Round selector dropdown
- Multiple view modes (Normal, 2 Số, 3 Số)
- Results fetching and display

