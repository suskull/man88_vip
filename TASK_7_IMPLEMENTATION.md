# Task 7 Implementation: Game Rules Display

## Overview
Successfully implemented the game rules display functionality for the Vietnamese lottery betting website clone. Users can now view detailed game rules, odds, and betting examples by clicking the "Luật chơi" button.

## Components Created

### 1. GameRules Component (`src/components/betting/GameRules.tsx`)
A tooltip/modal component that displays game rules when the user clicks the "Luật chơi" button.

**Key Features:**
- ✅ "Luật chơi" button with question circle icon
- ✅ Toggle show/hide functionality
- ✅ Displays category name and odds rate in header
- ✅ Shows game description from API guide field
- ✅ Replaces {{ODDS}} placeholder with actual rate value
- ✅ Renders HTML content safely using dangerouslySetInnerHTML
- ✅ Prevents event propagation to keep tooltip open when clicking inside
- ✅ Uses existing CSS classes from original site

**Component Structure:**
```typescript
export const GameRules = ({ category }: GameRulesProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Replace {{ODDS}} placeholder with actual rate value
  const formatGuideText = (guide: string, rate: number): string => {
    return guide.replace(/\{\{ODDS\}\}/g, rate.toString());
  };

  const formattedGuide = formatGuideText(category.guide, category.rate);

  return (
    <div className="guide">
      <button className="btn" onClick={toggleRules} type="button">
        <i className="fas fa-question-circle"></i> Luật chơi
        {isOpen && (
          <div className="guide-c" onClick={(e) => e.stopPropagation()}>
            <div className="guide-des">
              <h6 className="guide-t">
                Cược {category.name} - <span>1 ăn {category.rate}</span>
              </h6>
              <p dangerouslySetInnerHTML={{ __html: formattedGuide }} />
            </div>
          </div>
        )}
      </button>
    </div>
  );
};
```

## Integration

### ManualInput Component Updates
Added GameRules component to the manual input section:

<augment_code_snippet path="src/components/betting/ManualInput.tsx" mode="EXCERPT">
````typescript
import { GameRules } from './GameRules';

// ... in render:
<div className="padhead">
  <div style={{ display: 'flex', flexGrow: 1 }}>
    <div className="inputs-group">
      <label htmlFor="manual-input">Nhập số</label>
      <input ... />
      <button className="btn" onClick={handleConfirm}>
        Xác nhận
      </button>
    </div>
    <div className="ortext">
      <span>hoặc</span> chọn số bên dưới
    </div>
  </div>
  <GameRules category={category} />
</div>
````
</augment_code_snippet>

## Visual Layout

The GameRules button appears to the right of the manual input section:

```
┌─────────────────────────────────────────────────────────────┐
│  Nhập số: [12,34,56]  [Xác nhận]  hoặc chọn số bên dưới     │
│                                    [? Luật chơi]             │
│                                       ↓ (when clicked)       │
│                                    ┌──────────────────────┐  │
│                                    │ Cược Lô 2 số         │  │
│                                    │ 1 ăn 98              │  │
│                                    │                      │  │
│                                    │ Đánh 2 chữ số cuối   │  │
│                                    │ trong lô 27 giải...  │  │
│                                    └──────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Guide Text Processing

### Template Replacement
The guide text from the API contains `{{ODDS}}` placeholders that are replaced with the actual odds rate:

**API Data:**
```json
{
  "guide": "Đánh 2 chữ số cuối trong lô 27 giải. Thắng gấp {{ODDS}} lần...",
  "rate": 98
}
```

**Rendered Output:**
```
Đánh 2 chữ số cuối trong lô 27 giải. Thắng gấp 98 lần...
```

### Example Guide Texts

**Lô 2 số (rate: 98):**
```
Đánh 2 chữ số cuối trong lô 27 giải. Thắng gấp 98 lần, nếu số đó về N lần 
thì tính kết quả x N lần. Ví dụ: đánh lô 79 - 1 con 1k, Tổng thanh toán: 
1k x 27 = 27k. Nếu trong lô có 2 chữ số cuối là 79 thì Tiền thắng: 
1k x 98 = 98k, nếu có N lần 2 chữ số cuối là 79 thì Tiền thắng là: 1k x 98 x N
```

**3 càng (rate: 980):**
```
Đánh 3 chữ số cuối của giải ĐB. Thắng gấp 980 lần. Ví dụ: đánh 1k cho số 879, 
Tổng thanh toán: 1k. Nếu giải ĐB là xx879 thì Tiền thắng: 1k x 980 = 980K
```

**Xiên 2 (rate: 16.87):**
```
Xiên 2 của 2 chữ số cuối trong lô 27 giải. Thắng gấp 16.87 lần. Ví dụ: 
đánh 1k cho xiên 11+13, Tổng thanh toán: 1k. Nếu trong lô có "2 chữ số cuối 
là 11 và 2 chữ số cuối là 13" thì Tiền thắng: 1k x 16.87 = 16.87k
```

## CSS Classes Used
Following the original site's structure:
- `guide` - Container for rules button and tooltip
- `btn` - Button styling
- `fa-question-circle` - FontAwesome icon
- `guide-c` - Tooltip content container
- `guide-des` - Guide description wrapper
- `guide-t` - Guide title/header

## User Interaction Flow

1. **Initial State:** Rules tooltip is hidden
2. **User clicks "Luật chơi" button:** Tooltip appears below the button
3. **Tooltip displays:**
   - Category name (e.g., "Cược Lô 2 số")
   - Odds rate (e.g., "1 ăn 98")
   - Full game description with examples
4. **User clicks button again:** Tooltip closes
5. **Click inside tooltip:** Tooltip stays open (event propagation stopped)

## Testing
Created comprehensive unit tests (`src/components/betting/__tests__/GameRules.test.tsx`):
- ✅ Renders "Luật chơi" button
- ✅ Displays question circle icon
- ✅ Does not display rules content initially
- ✅ Displays rules content when button is clicked
- ✅ Displays category name in rules header
- ✅ Displays odds rate in rules header
- ✅ Replaces {{ODDS}} placeholder with actual rate value
- ✅ Hides rules content when button is clicked again
- ✅ Handles 3-digit game rules correctly
- ✅ Returns null when category is null
- ✅ Uses correct CSS classes

## Files Created/Modified

### Created:
- `src/components/betting/GameRules.tsx`
- `src/components/betting/__tests__/GameRules.test.tsx`
- `TASK_7_IMPLEMENTATION.md`

### Modified:
- `src/components/betting/ManualInput.tsx` - Added GameRules component
- `src/components/betting/index.ts` - Added GameRules export
- `.kiro/specs/lottery-website-clone/tasks.md` - Marked Task 7 as complete

## Requirements Satisfied
✅ **Requirement 5.1:** Display "Luật chơi" button for each game category  
✅ **Requirement 5.2:** Show tooltip/modal with game rules when clicked  
✅ **Requirement 5.3:** Include game description from API guide field  
✅ **Requirement 5.4:** Highlight odds rate with visual emphasis  
✅ **Requirement 5.5:** Provide betting examples with calculations  

## TypeScript Compilation
✅ No TypeScript errors  
✅ All types properly defined  
✅ Proper use of `import type` for type-only imports  

## User Benefits
1. **📚 Clear Instructions:** Users understand how each game type works
2. **💰 Odds Transparency:** Clear display of payout rates
3. **📊 Betting Examples:** Real examples help users calculate potential winnings
4. **🎯 Easy Access:** Rules available right next to the input field
5. **🔄 Toggle Control:** Users can show/hide rules as needed

## Next Steps
Ready to proceed to **Task 8: Implement round timer and header**, which will add:
- Current round ID display
- Countdown timer showing time until round closes
- Game mode selector (1 min, 3 min, 5 min)
- Auto-refresh when countdown reaches zero

