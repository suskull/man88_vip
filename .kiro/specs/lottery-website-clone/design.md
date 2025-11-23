# Design Document

## Overview

This design document outlines the architecture and implementation approach for cloning a Vietnamese lottery betting website. The application will be a single-page application (SPA) built with React, TanStack Router for routing, TanStack Query for data fetching, and TypeScript for type safety. The UI will use pre-existing CSS classes from the original website (app.e55b041b.css) to maintain visual consistency.

**Important**: All component functionality, event handlers, and business logic should reference the built JavaScript file (app.d73df0f8.js) from the clone-src folder to understand the original implementation patterns and behavior.

### Key Design Principles

1. **Component-Based Architecture**: Break down the UI into reusable React components
2. **Mock API Layer**: Use TanStack Query with mock data from JSON files
3. **CSS Preservation**: Use existing CSS classes from app.e55b041b.css without modification
4. **Reference Implementation**: Study the built JavaScript file (app.d73df0f8.js) to understand original functionality and behavior
5. **Type Safety**: Leverage TypeScript for all data structures
6. **State Management**: Use React hooks and TanStack Query for state management

## Architecture

### High-Level Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (Header, Sidebar, etc.)
│   ├── betting/        # Betting-related components
│   ├── results/        # Results display components
│   └── common/         # Shared components
├── hooks/              # Custom React hooks
├── services/           # API service layer (mock)
│   └── api/           # Mock API functions
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── routes/             # TanStack Router route definitions
└── assets/             # Static assets (CSS, images)
```

### Component Hierarchy

```
App
├── Layout
│   ├── NotificationBar
│   ├── MainContainer
│   │   ├── LeftSidebar
│   │   │   ├── UserInfo
│   │   │   └── BettingSlip
│   │   ├── CenterContent
│   │   │   ├── Header
│   │   │   │   ├── Logo
│   │   │   │   ├── ModeSelector
│   │   │   │   └── RoundInfo
│   │   │   └── GameArea
│   │   │       ├── CategoryTabs
│   │   │       ├── SubcategoryTabs
│   │   │       └── GameContent
│   │   │           ├── InputSection
│   │   │           └── NumberGrid
│   │   └── RightSidebar
│   │       └── ResultsDisplay
```

## Components and Interfaces

### 1. Layout Components

#### MainLayout Component
```typescript
interface MainLayoutProps {
  children: React.ReactNode;
}

// Renders the three-column layout structure
// Uses CSS classes: ld-container, ld-left, ld-center, ld-right
```

#### NotificationBar Component
```typescript
interface NotificationBarProps {
  message: string;
  links: Array<{ text: string; href: string }>;
}

// Displays top notification banner
// Uses CSS classes: container-fluid, bg, row, notify
```

### 2. Betting Components

#### BettingSlip Component
```typescript
interface BettingSlipProps {
  selectedNumbers: string[];
  gameCategory: GameCategory;
  onRemoveNumber: (number: string) => void;
  onClear: () => void;
  onConfirm: () => void;
}

// Manages the betting slip in left sidebar
// Uses CSS classes: biende, bd-items, biende-group, bd-head, bd-content, bd-foot
```

#### NumberGrid Component
```typescript
interface NumberGridProps {
  gameType: 'loto_2so' | 'loto_3so' | '3cang' | 'de_dau' | 'de_dacbiet' | 'dauduoi_dau' | 'dauduoi_duoi';
  selectedNumbers: string[];
  onNumberSelect: (number: string) => void;
  onColumnSelect: (column: number) => void;
  onRowSelect: (row: number) => void;
}

// Renders the interactive number selection grid
// Uses CSS classes: danhlo-table, tdscol, tdsrow, input-num, checkmark
```

#### InputSection Component
```typescript
interface InputSectionProps {
  gameCategory: GameCategory;
  onNumbersSubmit: (numbers: string[]) => void;
}

// Provides manual number input and rules display
// Uses CSS classes: padhead, inputs-group, guide, guide-c, guide-des
```

### 3. Results Components

#### ResultsDisplay Component
```typescript
interface ResultsDisplayProps {
  gameMode: number; // 60, 180, or 300
  isVisible: boolean;
  onToggle: () => void;
}

// Shows lottery results in right sidebar
// Uses CSS classes: ld-right, tab-right, result-table
```

#### ResultTable Component
```typescript
interface ResultTableProps {
  roundId: string;
  results: LotteryResult | null;
  viewMode: 'normal' | '2so' | '3so';
}

// Displays results organized by prize tiers
// Uses CSS classes: result-row, result-cell, light, special
```

### 4. Header Components

#### RoundInfo Component
```typescript
interface RoundInfoProps {
  roundId: string;
  timeLeft: { minutes: number; seconds: number };
}

// Shows current round and countdown timer
// Uses CSS classes: phien-info, info, phien, minute, twodot
```

#### CategoryTabs Component
```typescript
interface CategoryTabsProps {
  categories: GameCategory[];
  activeCategory: string;
  onCategoryChange: (categoryType: string) => void;
}

// Renders main category navigation tabs
// Uses CSS classes: cattab, cattab-head, cattab-items, active
```

## Data Models

### TypeScript Interfaces

```typescript
// Category data from API
interface GameCategory {
  id: number;
  name: string;
  type: string;
  guide: string;
  rate: number;
  pay_number: number;
  min_amount: number;
  max_amount: number;
  multi: number;
  code: string;
  max: number;
  active: number;
  max_number: number;
}

interface CategoryGroup {
  type: string;
  name: string;
  children: GameCategory[];
}

interface CategoriesResponse {
  success: boolean;
  rows: CategoryGroup[];
  attrs: any[];
}

// Game mode data
interface GameMode {
  id: number;
  name: string;
}

interface GameListResponse {
  success: boolean;
  rows: GameMode[];
  attrs: any[];
}

// Time and round data
interface TimeLeftResponse {
  success: boolean;
  roundId: string;
  timeLeft: number; // seconds
}

// Betting slip data
interface BettingSlipItem {
  numbers: string[];
  amountPerNumber: number;
  totalAmount: number;
  category: GameCategory;
}

// Results data
interface PrizeTier {
  name: string;
  numbers: string[];
}

interface LotteryResult {
  roundId: string;
  prizes: PrizeTier[];
}

// User data
interface UserInfo {
  username: string;
  balance: number; // in thousands (K)
}
```

## API Service Layer

### Mock API Implementation

```typescript
// services/api/mockApi.ts

// Simulates network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export const mockApi = {
  // Fetch categories from JSON file
  getCategories: async (): Promise<CategoriesResponse> => {
    await delay(200);
    // Import and return data from clone-src/api_categories.json
    return categoriesData;
  },

  // Fetch game modes
  getGameList: async (): Promise<GameListResponse> => {
    await delay(150);
    return gameListData;
  },

  // Fetch time left for current round
  getTimeLeft: async (gameId: number): Promise<TimeLeftResponse> => {
    await delay(100);
    // Generate dynamic round ID and countdown
    const now = new Date();
    const roundId = generateRoundId(now, gameId);
    const timeLeft = calculateTimeLeft(now, gameId);
    return { success: true, roundId, timeLeft };
  },

  // Submit bet (mock - just returns success)
  submitBet: async (bet: BettingSlipItem): Promise<{ success: boolean }> => {
    await delay(300);
    return { success: true };
  },

  // Fetch results for a round (mock - generates random results)
  getResults: async (roundId: string): Promise<LotteryResult> => {
    await delay(250);
    return generateMockResults(roundId);
  }
};
```

### TanStack Query Hooks

```typescript
// hooks/useCategories.ts
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: mockApi.getCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// hooks/useGameList.ts
export const useGameList = () => {
  return useQuery({
    queryKey: ['gameList'],
    queryFn: mockApi.getGameList,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// hooks/useTimeLeft.ts
export const useTimeLeft = (gameId: number) => {
  return useQuery({
    queryKey: ['timeLeft', gameId],
    queryFn: () => mockApi.getTimeLeft(gameId),
    refetchInterval: 1000, // Refetch every second for countdown
  });
};

// hooks/useResults.ts
export const useResults = (roundId: string) => {
  return useQuery({
    queryKey: ['results', roundId],
    queryFn: () => mockApi.getResults(roundId),
    enabled: !!roundId,
  });
};

// hooks/useSubmitBet.ts
export const useSubmitBet = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: mockApi.submitBet,
    onSuccess: () => {
      // Invalidate user balance query
      queryClient.invalidateQueries({ queryKey: ['userBalance'] });
    },
  });
};
```

## State Management

### Local Component State

- **Selected Numbers**: Managed in parent component, passed down to NumberGrid and BettingSlip
- **Sidebar Visibility**: Boolean state for responsive sidebar toggling
- **Active Category/Subcategory**: String state for current game selection
- **View Mode**: String state for results display mode ('normal', '2so', '3so')

### Global State (via TanStack Query)

- **Categories**: Cached category data
- **Game Modes**: Cached game mode list
- **Time Left**: Auto-refreshing countdown data
- **User Balance**: User's current balance
- **Results**: Cached results for different rounds

### Custom Hooks for State Logic

```typescript
// hooks/useBettingSlip.ts
export const useBettingSlip = (category: GameCategory) => {
  const [selectedNumbers, setSelectedNumbers] = useState<string[]>([]);
  const [amountPerNumber, setAmountPerNumber] = useState<number>(0);
  
  const totalAmount = selectedNumbers.length * amountPerNumber * category.pay_number;
  const potentialWinnings = amountPerNumber * category.rate;
  
  const addNumber = (number: string) => {
    if (!selectedNumbers.includes(number)) {
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };
  
  const removeNumber = (number: string) => {
    setSelectedNumbers(selectedNumbers.filter(n => n !== number));
  };
  
  const clear = () => {
    setSelectedNumbers([]);
    setAmountPerNumber(0);
  };
  
  return {
    selectedNumbers,
    amountPerNumber,
    totalAmount,
    potentialWinnings,
    addNumber,
    removeNumber,
    clear,
    setAmountPerNumber,
  };
};

// hooks/useCountdown.ts
export const useCountdown = (gameId: number) => {
  const { data } = useTimeLeft(gameId);
  const [timeLeft, setTimeLeft] = useState({ minutes: 0, seconds: 0 });
  
  useEffect(() => {
    if (data?.timeLeft) {
      const minutes = Math.floor(data.timeLeft / 60);
      const seconds = data.timeLeft % 60;
      setTimeLeft({ minutes, seconds });
    }
  }, [data]);
  
  return { roundId: data?.roundId, timeLeft };
};
```

## Routing Structure

### TanStack Router Configuration

```typescript
// routes/__root.tsx
export const Route = createRootRoute({
  component: RootLayout,
});

// routes/index.tsx
export const Route = createFileRoute('/')({
  component: HomePage,
  loader: async () => {
    // Prefetch categories
    const queryClient = getQueryClient();
    await queryClient.ensureQueryData({
      queryKey: ['categories'],
      queryFn: mockApi.getCategories,
    });
  },
});

// routes/game.$gameId.tsx
export const Route = createFileRoute('/game/$gameId')({
  component: GamePage,
  loader: async ({ params }) => {
    const queryClient = getQueryClient();
    await queryClient.ensureQueryData({
      queryKey: ['timeLeft', parseInt(params.gameId)],
      queryFn: () => mockApi.getTimeLeft(parseInt(params.gameId)),
    });
  },
});
```

## CSS Integration

### Importing Existing CSS

```typescript
// src/main.tsx
import '../clone-src/app.e55b041b.css';
```

### CSS Class Mapping

Key CSS classes to use (extracted from HTML files in clone-src):

- **Layout**: `ld-container`, `ld-left`, `ld-center`, `ld-right`
- **Tabs**: `cattab`, `cattab-head`, `cattab-items`, `subcat`, `subcat-item`
- **Betting**: `biende`, `bd-head`, `bd-content`, `bd-foot`, `btn-huy`, `btn-submit`
- **Grid**: `danhlo-table`, `tdscol`, `tdsrow`, `input-num`, `checkmark`
- **Results**: `result-table`, `result-row`, `result-cell`, `light`, `special`
- **Header**: `header`, `logo`, `select-mode`, `phien-info`
- **User**: `user-area`, `media`, `avatar`, `username`, `balance`
- **States**: `active` for active tabs/selections

### Referencing Built JavaScript

When implementing component logic, refer to app.d73df0f8.js to understand:
- Event handler patterns
- State update logic
- Number selection/deselection behavior
- Bet calculation formulas
- Validation rules
- UI interaction patterns

## Error Handling

### API Error Handling

```typescript
// In components using queries
const { data, isLoading, isError, error } = useCategories();

if (isLoading) {
  return <LoadingSpinner />;
}

if (isError) {
  return <ErrorMessage message={error.message} />;
}
```

### Validation Error Handling

```typescript
// Bet validation
const validateBet = (bet: BettingSlipItem): string | null => {
  if (bet.numbers.length === 0) {
    return 'Vui lòng chọn ít nhất một số';
  }
  
  if (bet.amountPerNumber < bet.category.min_amount) {
    return `Số tiền tối thiểu là ${bet.category.min_amount}K`;
  }
  
  if (bet.amountPerNumber > bet.category.max_amount) {
    return `Số tiền tối đa là ${bet.category.max_amount}K`;
  }
  
  if (bet.numbers.length > bet.category.max) {
    return `Số lượng số tối đa là ${bet.category.max}`;
  }
  
  return null;
};
```

### User Feedback

- **Loading States**: Display loading indicators during API calls
- **Error Messages**: Show user-friendly error messages in Vietnamese
- **Success Notifications**: Confirm successful bet submissions
- **Validation Feedback**: Real-time validation feedback on inputs

## Testing Strategy

### Unit Tests

- **Utility Functions**: Test number parsing, validation, calculation functions
- **Custom Hooks**: Test betting slip logic, countdown logic
- **Mock API**: Test mock data generation functions

### Component Tests

- **NumberGrid**: Test number selection, row/column selection
- **BettingSlip**: Test add/remove numbers, amount calculations
- **CategoryTabs**: Test tab switching, active state
- **ResultsDisplay**: Test result rendering, view mode switching

### Integration Tests

- **Betting Flow**: Test complete flow from number selection to bet submission
- **Results Flow**: Test fetching and displaying results
- **Navigation**: Test routing between game modes

### Test Setup

```typescript
// Use React Testing Library
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Test wrapper with providers
const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};
```

## Performance Considerations

### Optimization Strategies

1. **Query Caching**: Use TanStack Query's caching to minimize API calls
2. **Code Splitting**: Use TanStack Router's auto code splitting
3. **Memoization**: Use React.memo for expensive components
4. **Virtual Scrolling**: Consider for large number grids (if needed)
5. **Debouncing**: Debounce input fields for amount entry

### Bundle Size

- Reuse existing CSS (no Tailwind overhead)
- Tree-shake unused dependencies
- Lazy load routes and heavy components

## Accessibility

### ARIA Labels

- Add aria-labels to interactive elements
- Use semantic HTML elements
- Ensure keyboard navigation works

### Focus Management

- Manage focus for modals and dropdowns
- Visible focus indicators
- Logical tab order

## Responsive Design

The existing CSS includes responsive breakpoints. Key considerations:

- **Desktop (>992px)**: Three-column layout visible
- **Tablet (768px-992px)**: Collapsible sidebars
- **Mobile (<768px)**: Single column, toggle sidebars

Use existing responsive CSS classes and media queries from the original stylesheet.
