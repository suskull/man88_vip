# Task 5 Implementation: Betting Slip Functionality

## Overview
Successfully implemented the betting slip functionality for the Vietnamese lottery betting website clone. The betting slip displays selected numbers, allows amount input with bidirectional calculation, and shows potential winnings.

## Components Created

### 1. BettingSlip Component (`src/components/betting/BettingSlip.tsx`)
Main betting slip component that displays:
- Selected numbers as clickable chips (click to remove)
- Category name and odds rate
- Input field for "amount per number" (Số tiền 1 con)
- Input field for "total amount" (Tổng tiền)
- Potential winnings display (TIỀN THẮNG 1 CON)
- Clear (HỦY) and Submit (XÁC NHẬN) buttons

**Key Features:**
- ✅ Bidirectional calculation between amount per number and total amount
- ✅ Automatic calculation based on `pay_number` and `multi` properties
- ✅ Validation for min/max amounts
- ✅ Validation for max number of selections
- ✅ Error states for invalid inputs
- ✅ Currency formatting with thousand separators
- ✅ Responsive to category changes

**Calculation Logic:**
```typescript
// Amount per number → Total amount
if (category.multi && selectedNumbers.length > 1) {
  totalAmount = amountPerNumber * category.pay_number * selectedNumbers.length;
} else {
  totalAmount = amountPerNumber * category.pay_number;
}

// Total amount → Amount per number
if (category.multi && selectedNumbers.length > 1) {
  amountPerNumber = totalAmount / category.pay_number / selectedNumbers.length;
} else {
  amountPerNumber = totalAmount / category.pay_number;
}

// Potential winnings
potentialWinnings = amountPerNumber * category.rate;
```

### 2. LeftSidebar Component (`src/components/layout/LeftSidebar.tsx`)
Container component for the left sidebar with:
- Tab navigation (BIÊN ĐỀ / BẢNG CƯỢC)
- Tab content area
- Active tab highlighting

### 3. Updated Components

#### MainLayout (`src/components/layout/MainLayout.tsx`)
- Added `leftSidebar` and `rightSidebar` props
- Allows passing custom content to sidebars

#### GameArea (`src/components/betting/GameArea.tsx`)
- Added props: `selectedNumbers`, `onNumbersChange`, `onCategoryChange`
- Lifted state management to parent component
- Notifies parent of category changes
- Uses parent's number selection state

#### HomePage (`src/routes/index.tsx`)
- Manages global state for selected numbers and current category
- Coordinates between GameArea and BettingSlip
- Handles number removal, clear, and submit actions

## CSS Classes Used
Following the original site's CSS structure:
- `biende` - Main betting slip container
- `bd-items` - Items container
- `biende-group` - Group of betting items
- `bd-head` - Header showing category name and rate
- `bd-content` - Content area with selected numbers
- `bd-foot` - Footer with input fields
- `biende-foot` - Bottom footer with winnings and buttons
- `igroup` - Input group wrapper
- `btn-group` - Button group container
- `btn btn-huy` - Clear button
- `btn btn-submit` - Submit button
- `cur` - Currency display
- `num` - Number chip
- `msg` - Message display

## State Management
State is managed at the HomePage level and passed down:
```
HomePage (state owner)
├── selectedNumbers: string[]
├── currentCategory: GameCategory | null
│
├── LeftSidebar
│   └── BettingSlip
│       ├── receives: selectedNumbers, category
│       └── emits: onRemoveNumber, onClear, onSubmit
│
└── GameArea
    ├── receives: selectedNumbers, onNumbersChange, onCategoryChange
    └── NumberGrid
        └── emits: onNumberToggle
```

## Validation Rules
1. **Number Selection:**
   - Must have at least 1 number selected
   - If `max_number` is set, must select exactly that many numbers

2. **Amount Per Number:**
   - Must be >= 1
   - Shows error state if < 1

3. **Total Amount:**
   - Must be <= `category.max_amount`
   - Shows error state if exceeds limit

4. **Submit:**
   - Validates all rules before submission
   - Shows alert for validation errors
   - Prevents submission if errors exist

## Testing
Created comprehensive unit tests (`src/components/betting/__tests__/BettingSlip.test.tsx`):
- ✅ Shows message when no numbers selected
- ✅ Displays selected numbers correctly
- ✅ Displays category name and rate
- ✅ Calls onRemoveNumber when clicking a number
- ✅ Calls onClear when clicking HỦY button
- ✅ Calculates potential winnings correctly
- ✅ Displays input fields for amounts

## Files Created/Modified

### Created:
- `src/components/betting/BettingSlip.tsx`
- `src/components/layout/LeftSidebar.tsx`
- `src/components/betting/__tests__/BettingSlip.test.tsx`
- `TASK_5_IMPLEMENTATION.md`

### Modified:
- `src/components/layout/MainLayout.tsx` - Added sidebar props
- `src/components/betting/GameArea.tsx` - Added props for state lifting
- `src/routes/index.tsx` - Added state management and coordination
- `src/components/betting/index.ts` - Added BettingSlip export
- `.kiro/specs/lottery-website-clone/tasks.md` - Marked Task 5 as complete

## Requirements Satisfied
✅ **Requirement 3.1:** Display selected numbers in betting slip  
✅ **Requirement 3.2:** Allow removal of individual numbers (click to remove)  
✅ **Requirement 3.3:** Input field for amount per number  
✅ **Requirement 3.4:** Input field for total bet amount  
✅ **Requirement 3.5:** Bidirectional calculation between amounts  
✅ **Requirement 3.6:** Display potential winnings based on odds  
✅ **Requirement 3.7:** Clear and confirm buttons  

## TypeScript Compilation
✅ No TypeScript errors  
✅ All types properly defined  
✅ Proper use of `import type` for type-only imports  

## Next Steps
Ready to proceed to **Task 6: Add manual number input functionality**, which will add:
- Text input field for manual number entry
- Number parsing and validation
- Support for various input formats (comma-separated, space-separated, ranges)
- Integration with existing number selection

