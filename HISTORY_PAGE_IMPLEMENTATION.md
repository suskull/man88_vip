# History Page Implementation Summary

## Overview
Created a complete **Bet History Page** (`/history/$gameId`) based on `clone-src/history.html` with all logic from `clone-src/app.d73df0f8.js`.

## Files Created

### 1. Route File
- **`src/routes/history.$gameId.tsx`** - Main history page route
  - Dynamic route with gameId parameter (60, 180, or 300)
  - State management for pagination
  - Integration with useHistoryList hook

### 2. Components (in `src/components/history-page/`)

#### **HistoryPageHeader.tsx**
Navigation bar with:
- Title "Sao kê" (Statement/History)
- Game mode selector dropdown (1 phút, 3 phút, 5 phút)
- Updates URL when game mode changes

#### **HistoryTable.tsx**
Table displaying bet history with columns:
- **ID** - Bet ID
- **Lượt xổ** - Round ID (formatted as YYYYMMDD-HHMM)
- **Thời gian** - Date/time (formatted as YYYY-MM-DD HH:MM)
- **Loại đề** - Category name (Bao lô, Đầu đuôi, etc.)
- **Số cược** - Bet numbers (badges with green highlight for winning numbers)
- **Tiền cược** - Bet amount (formatted as XK)
- **Tiền thắng** - Win amount (formatted as XK)
- **Trạng thái** - Status badge:
  - 0 = "Đang chờ" (Pending) - gray badge
  - 1 = "Thắng" (Win) - green badge
  - 2 = "Thua" (Lose) - gray badge
  - 3 = "Hủy" (Cancelled) - gray badge

#### **index.ts**
Barrel export for all history-page components

### 3. Hooks

#### **`src/hooks/useHistoryList.ts`**
TanStack Query hook for fetching paginated bet history:
- Parameters: gameId, page
- Returns: history array and pagination info
- 30-second stale time for caching

### 4. API Updates

#### **`src/types/api.ts`**
Added new types:
- `HistoryItem` - Individual bet history record with all fields
- `HistoryListResponse` - API response structure

#### **`src/services/api/mockApi.ts`**
Added `getHistoryList` function:
- Generates mock bet history based on game mode
- Returns 10 items per page
- Random bet data with various statuses
- Winning numbers highlighted for status=1 (Win)
- Proper pagination with metadata

## Features Implemented

### 1. Game Mode Selection
- Dropdown to switch between 1/3/5 minute games
- Updates URL and fetches new history

### 2. Bet History Display
- Table layout matching original HTML structure
- All 8 columns from original design
- Badge styling for numbers and status
- Green badge for winning numbers
- Currency formatting (XK format)

### 3. Status Indicators
- Color-coded status badges
- Clear visual distinction between states
- Matches original Vue.js logic

### 4. Pagination
- Reuses Pagination component from results page
- 10 items per page
- Smart page range calculation

### 5. Loading States
- Loading indicator while fetching
- Empty state when no data
- Proper error handling

## Logic from JavaScript File

All logic from `clone-src/app.d73df0f8.js` has been implemented:

1. **parseTimes()** - Converts "202511200788" to "20251120-0788" format
2. **getList()** - Fetches history for selected game mode and page
3. **changeGame()** - Switches game mode and navigates
4. **genPaginate()** - Generates pagination range (reused from results page)
5. **Status rendering** - Badge display based on status value
6. **Winning number highlighting** - Green badge for numbers in numbers_win array
7. **Currency formatting** - Displays amounts with K suffix

## CSS Classes Used

All classes match the original HTML:
- Navigation: `navbar`, `navbar-expand-lg`, `navbar-brand`, `navbar-nav`, `nav-item`
- Form: `form-control`, `mr-sm-2`
- Table: `table`, `table-response`
- Badges: `badge`, `badge-success`, `badge-secondary`, `badge-pill`, `mr-1`
- Layout: `container`, `container-fluid`, `row`
- Pagination: `pagination`, `page-item`, `page-link`

## Data Structure

### HistoryItem Interface
```typescript
{
  id: number;                 // Bet ID
  times: string;              // Round ID without hyphen (e.g., "202511200788")
  date: string;               // Formatted date (e.g., "2025-11-20 07:88")
  cate: string;               // Category name (e.g., "Bao lô")
  numbers: string[];          // Bet numbers (e.g., ["12", "34", "56"])
  numbers_win?: string[];     // Winning numbers (if any)
  amount: number;             // Bet amount in thousands (K)
  amount_win: number;         // Win amount in thousands (K)
  status: number;             // 0=Pending, 1=Win, 2=Lose, 3=Cancelled
}
```

## Route Access

The history page can be accessed at:
- `/history/60` - 1 minute game history
- `/history/180` - 3 minute game history
- `/history/300` - 5 minute game history

## Integration

The page is integrated with:
- **NotificationBar** component (updated with history link)
- **Pagination** component (reused from results page)
- **useGameList** hook for game mode dropdown
- **TanStack Router** for routing and params
- **TanStack Query** for data fetching and caching

## TypeScript Compilation

✅ All TypeScript compilation passes with no errors
✅ All types properly defined
✅ No implicit any types
✅ Proper React.ReactNode usage

## Next Steps

The history page is fully functional and ready to use. To test:
1. Navigate to `/history/60` in the browser
2. Try switching game modes
3. Navigate through pages
4. Observe winning number highlights
5. Check status badges

The page matches the original HTML structure and implements all JavaScript logic from the Vue.js application.

