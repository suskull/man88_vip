# Requirements Document

## Introduction

This document outlines the requirements for cloning a Vietnamese lottery betting website. The system SHALL provide a web-based interface for users to place bets on various lottery game types, view results, and manage their betting slips. The application will be built using React, TanStack Router, TanStack Query, TypeScript, and will use the existing CSS classes from the built files (app.e55b041b.css) rather than Tailwind CSS. All API calls will be mocked using fake data.

## Glossary

- **Lottery_System**: The complete web application that enables lottery betting functionality
- **Game_Category**: A type of lottery game (e.g., Bao lô, Lô xiên, Đầu đuôi, etc.)
- **Betting_Slip**: A collection of user-selected numbers and bet amounts for a specific game
- **Game_Round**: A specific lottery draw session identified by a unique ID (e.g., 20251119-0651)
- **Number_Grid**: An interactive table displaying selectable numbers for betting
- **Result_Display**: A component showing lottery draw results organized by prize tiers
- **User_Balance**: The amount of virtual currency available to the user (displayed in thousands - K)
- **Odds_Rate**: The multiplier applied to winning bets (e.g., 98x, 980x)
- **API_Service**: Mock service providing fake category data, game lists, and time information using TanStack Query
- **CSS_Classes**: Pre-built CSS classes from app.e55b041b.css file that define the visual styling

## Requirements

### Requirement 1: Display Game Categories

**User Story:** As a user, I want to see all available lottery game categories, so that I can choose which game type to play

#### Acceptance Criteria

1. WHEN the Lottery_System loads, THE Lottery_System SHALL fetch category data from the API_Service using TanStack Query
2. WHEN category data is received, THE Lottery_System SHALL display six main Game_Category tabs in the header navigation
3. THE Lottery_System SHALL render each Game_Category with its name and subcategories according to the API data structure
4. WHEN a Game_Category has multiple subcategories, THE Lottery_System SHALL display subcategory tabs below the main category tabs
5. THE Lottery_System SHALL highlight the active Game_Category and subcategory using the existing CSS_Classes (e.g., "active" class)

### Requirement 2: Render Number Selection Grid

**User Story:** As a user, I want to select numbers from an interactive grid, so that I can place my bets easily

#### Acceptance Criteria

1. WHEN a Game_Category is selected, THE Lottery_System SHALL display a Number_Grid appropriate for that game type
2. THE Number_Grid SHALL render checkboxes for each selectable number based on the game type (2-digit: 00-99, 3-digit: 000-999)
3. WHEN a user clicks a number checkbox, THE Lottery_System SHALL toggle the selection state and update the visual appearance
4. THE Lottery_System SHALL organize the Number_Grid in a 10-column layout with row and column selection helpers
5. WHEN a user clicks a column selector, THE Lottery_System SHALL select all numbers in that column
6. WHEN a user clicks a row selector, THE Lottery_System SHALL select all numbers in that row

### Requirement 3: Manage Betting Slip

**User Story:** As a user, I want to see my selected numbers and bet amounts in a betting slip, so that I can review before confirming

#### Acceptance Criteria

1. WHEN a user selects numbers, THE Lottery_System SHALL add them to the Betting_Slip in the left sidebar
2. THE Betting_Slip SHALL display the Game_Category name and Odds_Rate at the top
3. THE Betting_Slip SHALL show all selected numbers as removable chips
4. THE Lottery_System SHALL provide input fields for "amount per number" and "total bet amount"
5. WHEN a user enters an amount per number, THE Lottery_System SHALL calculate and display the total bet amount
6. WHEN a user enters a total bet amount, THE Lottery_System SHALL calculate and display the amount per number
7. THE Betting_Slip SHALL display the potential winnings based on the Odds_Rate and bet amount

### Requirement 4: Handle Manual Number Input

**User Story:** As a user, I want to type numbers directly instead of clicking the grid, so that I can place bets faster

#### Acceptance Criteria

1. THE Lottery_System SHALL provide a text input field above the Number_Grid
2. WHEN a user types numbers in the input field, THE Lottery_System SHALL parse the input according to the game type format
3. WHEN a user clicks the confirm button, THE Lottery_System SHALL add the parsed numbers to the Betting_Slip
4. IF the input format is invalid, THEN THE Lottery_System SHALL display an error message
5. THE Lottery_System SHALL support multiple number entry formats (space-separated, comma-separated)

### Requirement 5: Display Game Rules

**User Story:** As a user, I want to view the rules for each game type, so that I understand how to play and win

#### Acceptance Criteria

1. THE Lottery_System SHALL display a "Luật chơi" (Rules) button for each Game_Category
2. WHEN a user clicks the rules button, THE Lottery_System SHALL show a tooltip or modal with the game rules
3. THE rules display SHALL include the game description from the API guide field
4. THE rules display SHALL highlight the Odds_Rate using visual emphasis
5. THE rules display SHALL provide betting examples with calculations

### Requirement 6: Show Current Round Information

**User Story:** As a user, I want to see the current game round and countdown timer, so that I know when betting closes

#### Acceptance Criteria

1. THE Lottery_System SHALL display the current Game_Round ID in the header
2. THE Lottery_System SHALL fetch time-left data from the API_Service
3. THE Lottery_System SHALL display a countdown timer showing minutes and seconds until the round closes
4. WHEN the countdown reaches zero, THE Lottery_System SHALL refresh to load the next Game_Round
5. THE Lottery_System SHALL display the game mode (1 minute, 3 minutes, or 5 minutes) in the header

### Requirement 7: Display User Information

**User Story:** As a user, I want to see my username and balance, so that I know how much I can bet

#### Acceptance Criteria

1. THE Lottery_System SHALL display the username in the left sidebar user area
2. THE Lottery_System SHALL display the User_Balance in thousands (K) format
3. THE Lottery_System SHALL update the User_Balance display when bets are placed or winnings are received
4. THE Lottery_System SHALL use an icon to represent the user avatar

### Requirement 8: Show Lottery Results

**User Story:** As a user, I want to view lottery results for past rounds, so that I can check if I won

#### Acceptance Criteria

1. THE Lottery_System SHALL provide a collapsible right sidebar for the Result_Display
2. THE Result_Display SHALL show results organized by prize tiers (Giải ĐB, Giải Nhất, Giải Nhì, etc.)
3. THE Lottery_System SHALL provide a dropdown to select previous Game_Round IDs
4. WHEN a Game_Round is selected, THE Lottery_System SHALL fetch and display the results for that round
5. THE Result_Display SHALL provide three view modes: Normal, 2 Số (2 digits), and 3 Số (3 digits)
6. WHILE results are loading, THE Lottery_System SHALL display loading indicators

### Requirement 9: Handle Bet Confirmation

**User Story:** As a user, I want to confirm or cancel my bets, so that I have control over my betting actions

#### Acceptance Criteria

1. THE Betting_Slip SHALL display "HỦY" (Cancel) and "XÁC NHẬN" (Confirm) buttons at the bottom
2. WHEN a user clicks the cancel button, THE Lottery_System SHALL clear all selected numbers and reset the Betting_Slip
3. WHEN a user clicks the confirm button, THE Lottery_System SHALL validate the bet amounts against min_amount and max_amount from the API
4. IF validation passes, THEN THE Lottery_System SHALL submit the bet to the API_Service
5. IF validation fails, THEN THE Lottery_System SHALL display an error message with the validation reason

### Requirement 10: Use Existing CSS Classes

**User Story:** As a developer, I want to use the pre-built CSS classes from the original website, so that the clone maintains visual consistency

#### Acceptance Criteria

1. THE Lottery_System SHALL import and use the CSS file from clone-src/app.e55b041b.css
2. THE Lottery_System SHALL apply CSS_Classes that match the original HTML structure (e.g., "ld-container", "cattab", "biende")
3. THE Lottery_System SHALL NOT use Tailwind CSS utility classes for styling
4. THE Lottery_System SHALL maintain the same class names and DOM structure as the original HTML files
5. THE Lottery_System SHALL preserve all visual styling including colors, spacing, and typography from the original CSS

### Requirement 11: Mock API with TanStack Query

**User Story:** As a developer, I want to use fake API data with TanStack Query, so that the application works without a real backend

#### Acceptance Criteria

1. THE Lottery_System SHALL use TanStack Query for all data fetching operations
2. THE Lottery_System SHALL create mock API functions that return data from the JSON files in clone-src folder
3. THE Lottery_System SHALL implement query hooks for categories, game lists, and time-left data
4. THE Lottery_System SHALL simulate network delays in mock API responses (100-300ms)
5. THE Lottery_System SHALL handle loading and error states using TanStack Query's built-in state management

### Requirement 12: Implement Responsive Layout

**User Story:** As a user, I want the website to work on different screen sizes, so that I can bet from any device

#### Acceptance Criteria

1. THE Lottery_System SHALL use a three-column layout on desktop screens (left sidebar, center content, right sidebar) using existing CSS_Classes
2. THE Lottery_System SHALL collapse sidebars on tablet and mobile screens using the responsive CSS_Classes from the built file
3. THE Lottery_System SHALL provide toggle buttons to show/hide sidebars on smaller screens
4. THE Number_Grid SHALL adjust its column count based on screen width using existing responsive CSS_Classes
5. THE Lottery_System SHALL maintain usability and readability across all supported screen sizes using the pre-built CSS_Classes
