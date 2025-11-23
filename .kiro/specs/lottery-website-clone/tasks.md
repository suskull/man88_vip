# Implementation Plan

- [x] 1. Set up project foundation and data layer
  - Create TypeScript type definitions for all API responses (categories, game list, time-left, results)
  - Set up mock API service layer with functions that return data from clone-src JSON files
  - Configure TanStack Query with QueryClient provider in main.tsx
  - Normalize CSS file by removing Vue.js scoped attributes (run scripts/normalize-css.js)
  - Import the normalized CSS file (src/styles/app.css) into the application
  - _Requirements: 11.1, 11.2, 10.1_

- [x] 2. Implement core layout structure
  - Create MainLayout component with three-column structure using CSS classes (ld-container, ld-left, ld-center, ld-right)
  - Implement NotificationBar component at the top with message and links
  - Add responsive sidebar toggle functionality for mobile/tablet views
  - Set up basic routing structure with TanStack Router for the home page
  - _Requirements: 12.1, 12.2, 12.3_

- [x] 3. Build category navigation system
  - Create CategoryTabs component to display main game categories (Bao lô, Lô xiên, etc.)
  - Implement SubcategoryTabs component for subcategories within each main category
  - Add active state styling using the "active" CSS class
  - Connect tabs to TanStack Query hook for fetching categories data
  - Implement tab switching logic to update active category state
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [x] 4. Create number selection grid
  - Build NumberGrid component with dynamic rendering based on game type (2-digit vs 3-digit)
  - Implement checkbox-based number selection with CSS classes (input-num, checkmark)
  - Add column selector functionality to select all numbers in a column
  - Add row selector functionality to select all numbers in a row
  - Organize grid in 10-column layout using danhlo-table CSS classes
  - Reference app.d73df0f8.js for selection/deselection behavior patterns
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

- [x] 5. Implement betting slip functionality
  - Create BettingSlip component in left sidebar with CSS classes (biende, bd-items, bd-head)
  - Display selected numbers as removable chips in the betting slip
  - Add input fields for "amount per number" and "total bet amount"
  - Implement bidirectional calculation between amount per number and total amount
  - Display potential winnings based on odds rate from category data
  - Add clear and confirm buttons (btn-huy, btn-submit)
  - Reference app.d73df0f8.js for calculation formulas
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

- [x] 6. Add manual number input feature
  - Create InputSection component with text input field and confirm button
  - Implement number parsing logic for different game types (2-digit, 3-digit formats)
  - Support multiple input formats (space-separated, comma-separated)
  - Add validation and error messaging for invalid input formats
  - Integrate parsed numbers with the betting slip
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [x] 7. Build game rules display
  - Create rules tooltip/modal component with guide content
  - Add "Luật chơi" button to InputSection component
  - Display game description, odds rate, and examples from category guide field
  - Style using guide, guide-c, and guide-des CSS classes
  - Implement show/hide toggle functionality
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 8. Implement round information and countdown
  - Create RoundInfo component displaying current round ID
  - Build countdown timer showing minutes and seconds
  - Set up TanStack Query hook with 1-second refetch interval for time updates
  - Generate dynamic round IDs based on current time and game mode
  - Implement auto-refresh when countdown reaches zero
  - Style using phien-info, phien, minute, twodot CSS classes
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [x] 9. Create user information display
  - Build UserInfo component in left sidebar
  - Display username and balance in thousands (K) format
  - Add user avatar icon using Font Awesome classes
  - Style using user-area, media, avatar, username, balance CSS classes
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [x] 10. Build results display system
  - Create ResultsDisplay component in collapsible right sidebar
  - Implement ResultTable component with prize tier organization
  - Add dropdown for selecting previous round IDs
  - Create three view modes: Normal, 2 Số, 3 Số with tab switching
  - Display loading indicators while fetching results
  - Style using ld-right, result-table, result-row, result-cell CSS classes
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_

- [x] 11. Implement bet confirmation and validation
  - Add validation logic for bet amounts against min_amount and max_amount
  - Validate number of selected numbers against max limit
  - Create TanStack Query mutation hook for bet submission
  - Implement clear functionality to reset betting slip
  - Add success/error notifications after bet submission
  - Reference app.d73df0f8.js for validation rules
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [x] 12. Add game mode selector
  - Create ModeSelector dropdown component in header
  - Display available game modes (1 phút, 3 phút, 5 phút) from API
  - Implement mode switching that updates the active game ID
  - Update countdown and round info when mode changes
  - Style using select-mode and dropdown CSS classes
  - _Requirements: 6.5_

- [x] 13. Integrate all components and finalize
  - Wire up all components in the main layout
  - Ensure proper data flow between parent and child components
  - Test category switching updates the number grid and betting slip
  - Verify countdown timer updates correctly
  - Test bet submission flow end-to-end
  - Ensure responsive behavior works on different screen sizes
  - _Requirements: 1.1-12.5_

- [x] 14. Purge unused CSS classes (FINAL TASK) ✅
  - ✅ Run CSS analysis script to identify unused classes (node scripts/purge-unused-css.js)
  - ✅ Review the list of unused classes to ensure no false positives
  - ✅ Execute CSS purge with confirmation (PURGE_CSS=true node scripts/purge-unused-css.js)
  - ✅ Test the application thoroughly to ensure no styling is broken
  - ✅ Verify file size reduction and performance improvement (61.09% reduction: 186.83 KB → 72.70 KB)
  - ✅ Keep backup file (app.backup.css) for rollback if needed
  - _Requirements: 10.1 (CSS optimization)_
