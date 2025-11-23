# Task 12 Implementation: Add Game Mode Selector

## Overview

Successfully integrated the game mode selector into the header, allowing users to switch between different lottery game modes (1 phút, 3 phút, 5 phút). The implementation reuses the existing `GameModeSelector` component from Task 8 and creates a new `Header` component to organize the layout.

## Components Created/Modified

### 1. Header Component (`src/components/layout/Header.tsx`) ✨ NEW

A new layout component that combines the logo, game mode selector, and round information in the header.

**Key Features:**
- ✅ Displays logo and title "XỔ SỐ SIÊU TỐC"
- ✅ Integrates GameModeSelector for mode switching
- ✅ Integrates RoundInfo for countdown display
- ✅ Uses proper CSS classes (header, logo, select-mode)
- ✅ Passes selectedGameId to both child components

**Component Structure:**
```typescript
export const Header = ({ selectedGameId, onGameModeChange }: HeaderProps) => {
  return (
    <div className="header">
      <div className="logo">
        <img src="/img/logo.svg" alt="Logo" />
        <h6>XỔ SỐ SIÊU TỐC</h6>
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
```

**Visual Layout:**
```
┌────────────────────────────────────────────────────────────┐
│  [Logo]  XỔ SỐ SIÊU TỐC    [1 phút ▼]    Lượt xổ: 20251119-0646  00:45  │
└────────────────────────────────────────────────────────────┘
```

### 2. Updated HomePage (`src/routes/index.tsx`) 🔄 MODIFIED

**Changes:**
- ✅ Changed `selectedGameId` from constant to state variable
- ✅ Added `handleGameModeChange` function
- ✅ Imported and rendered `Header` component
- ✅ Removed direct `RoundInfo` rendering (now in Header)
- ✅ Clears betting slip when game mode changes

**State Management:**
```typescript
// Before (Task 11)
const [selectedGameId] = useState<number>(60); // Hardcoded

// After (Task 12)
const [selectedGameId, setSelectedGameId] = useState<number>(60); // Dynamic
```

**Game Mode Change Handler:**
```typescript
const handleGameModeChange = (gameId: number) => {
  setSelectedGameId(gameId);
  // Clear betting slip when game mode changes
  setSelectedNumbers([]);
};
```

**Why clear betting slip?**
- Different game modes may have different betting rules
- Prevents confusion when switching between modes
- Ensures clean state for new game mode

**Layout Integration:**
```typescript
<div className="ld-center">
  <Header 
    selectedGameId={selectedGameId} 
    onGameModeChange={handleGameModeChange} 
  />
  <GameArea
    selectedNumbers={selectedNumbers}
    onNumbersChange={setSelectedNumbers}
    onCategoryChange={setCurrentCategory}
  />
</div>
```

### 3. Reused GameModeSelector Component

The `GameModeSelector` component created in Task 8 is now properly integrated:
- ✅ Fetches game modes from API (1 phút, 3 phút, 5 phút)
- ✅ Displays dropdown with all available modes
- ✅ Handles selection changes
- ✅ Updates parent component via callback

## Data Flow

### Game Mode Selection Flow
```
User selects game mode from dropdown
    ↓
GameModeSelector onChange event
    ↓
onGameModeChange(gameId) callback
    ↓
handleGameModeChange in HomePage
    ↓
setSelectedGameId(gameId)
    ↓
Clear betting slip (setSelectedNumbers([]))
    ↓
Header re-renders with new gameId
    ↓
RoundInfo fetches new round data
    ↓
Countdown updates for new game mode
```

### Component Hierarchy
```
HomePage
  ├─ NotificationBar
  ├─ Notification (conditional)
  └─ container-fluid
      └─ ld-container
          ├─ ld-left
          │   └─ LeftSidebar
          │       └─ BettingSlip
          ├─ ld-center
          │   ├─ Header ✨ NEW
          │   │   ├─ logo
          │   │   ├─ select-mode
          │   │   │   └─ GameModeSelector
          │   │   └─ RoundInfo
          │   └─ GameArea
          │       ├─ CategoryTabs
          │       ├─ SubcategoryTabs
          │       ├─ NumberGrid
          │       ├─ ManualInput
          │       └─ GameRules
          └─ ResultsDisplay
```

## Testing

### Header Tests (`src/components/layout/__tests__/Header.test.tsx`) ✨ NEW

**Test Coverage:**
- ✅ Renders logo and title
- ✅ Renders GameModeSelector with all game modes
- ✅ Renders RoundInfo with round ID and countdown
- ✅ Uses correct CSS classes (header, logo, select-mode)
- ✅ Passes selectedGameId to both child components
- ✅ GameModeSelector shows correct selected value

**Example Test:**
```typescript
it('should render GameModeSelector', () => {
  vi.spyOn(useGameListModule, 'useGameList').mockReturnValue({
    data: mockGameListData,
    isLoading: false,
  } as any);

  vi.spyOn(useTimeLeftModule, 'useTimeLeft').mockReturnValue({
    data: mockTimeLeftData,
    isLoading: false,
    refetch: vi.fn(),
  } as any);

  const mockOnChange = vi.fn();
  render(<Header selectedGameId={60} onGameModeChange={mockOnChange} />, {
    wrapper: createWrapper(),
  });

  expect(screen.getByText('1 phút')).toBeInTheDocument();
  expect(screen.getByText('3 phút')).toBeInTheDocument();
  expect(screen.getByText('5 phút')).toBeInTheDocument();
});
```

## Files Created/Modified

### Created:
- ✅ `src/components/layout/Header.tsx` - Header component
- ✅ `src/components/layout/__tests__/Header.test.tsx` - Header tests
- ✅ `TASK_12_IMPLEMENTATION.md` - This documentation

### Modified:
- ✅ `src/routes/index.tsx` - Integrated Header, made gameId dynamic
- ✅ `.kiro/specs/lottery-website-clone/tasks.md` - Marked Task 12 complete

## Requirements Satisfied

✅ **Requirement 6.5:** THE Lottery_System SHALL display the game mode (1 minute, 3 minutes, or 5 minutes) in the header

**How it's satisfied:**
- Header component displays GameModeSelector in the header
- GameModeSelector shows current game mode (1 phút, 3 phút, or 5 phút)
- User can see and change the game mode from the header
- RoundInfo updates when game mode changes

## TypeScript Compilation

✅ **No TypeScript errors**  
✅ All types properly defined  
✅ Proper use of `import type` for type-only imports  

## User Benefits

1. **🎮 Game Mode Selection:** Choose between 1, 3, or 5 minute games
2. **⏱️ Dynamic Updates:** Countdown timer updates when mode changes
3. **🧹 Clean State:** Betting slip clears when switching modes
4. **👁️ Visual Clarity:** Game mode clearly displayed in header
5. **🔄 Seamless Switching:** Smooth transition between game modes
6. **📊 Organized Layout:** All header info in one place

## User Experience Flow

**Switching Game Modes:**
```
1. User sees current mode in header (e.g., "1 phút")
2. User clicks dropdown to see all modes
3. User selects "3 phút"
4. GameModeSelector updates
5. RoundInfo fetches new round data for 3-minute game
6. Countdown updates to show time for 3-minute game
7. Betting slip clears (prevents confusion)
8. User can start betting on 3-minute game
```

**Example Scenario:**
```
Initial State:
- Game Mode: 1 phút
- Round: 20251119-0646
- Time Left: 00:45
- Selected Numbers: [12, 34]

User switches to 3 phút:
- Game Mode: 3 phút ✓
- Round: 20251119-0648 (different round)
- Time Left: 02:30 (3 minutes)
- Selected Numbers: [] (cleared)
```

## Integration with Existing Features

### Works with RoundInfo (Task 8)
- ✅ RoundInfo receives gameId from Header
- ✅ Countdown updates when gameId changes
- ✅ Round ID updates for new game mode

### Works with GameModeSelector (Task 8)
- ✅ GameModeSelector integrated into Header
- ✅ Dropdown shows all available modes
- ✅ Selection triggers mode change

### Works with BettingSlip (Task 11)
- ✅ Betting slip clears when mode changes
- ✅ Prevents invalid bets for wrong game mode
- ✅ Clean state for new game mode

## CSS Classes Used

| Class | Purpose | Location |
|-------|---------|----------|
| header | Main header container | Header component |
| logo | Logo and title section | Header component |
| select-mode | Game mode selector wrapper | Header component |
| sphien | Dropdown container | GameModeSelector |
| form-control | Select element styling | GameModeSelector |
| phien-info | Round info container | RoundInfo |

## Next Steps

The game mode selector is fully functional! Possible next tasks:
- **Task 13:** Integrate all components and finalize
- **Task 14:** Purge unused CSS classes

The game mode selector provides users with flexible game mode selection and seamless switching between different lottery game speeds! 🎉

