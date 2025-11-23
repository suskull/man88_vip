# Task 11 Implementation: Bet Confirmation and Validation

## Overview
Successfully implemented comprehensive bet validation and confirmation system for the Vietnamese lottery betting website clone. Users now receive real-time validation feedback and success/error notifications when placing bets.

## Components Created/Modified

### 1. Notification Component (`src/components/common/Notification.tsx`)
A reusable notification component for displaying success, error, warning, and info messages.

**Key Features:**
- ✅ Four notification types: success, error, warning, info
- ✅ Auto-dismiss after configurable duration (default: 3000ms)
- ✅ Manual close button
- ✅ Font Awesome icons for each type
- ✅ Fixed position (top-right corner)
- ✅ Bootstrap alert styling
- ✅ Smooth fade-in animation

**Component Structure:**
```typescript
export const Notification = ({ message, type, onClose, duration = 3000 }: NotificationProps) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div className={`alert ${getAlertClass()} alert-dismissible fade show`}>
      <i className={`fas ${getIcon()}`}></i>
      {message}
      <button type="button" className="close" onClick={onClose}>
        <span>&times;</span>
      </button>
    </div>
  );
};
```

**Notification Types:**

| Type | CSS Class | Icon | Use Case |
|------|-----------|------|----------|
| success | alert-success | fa-check-circle | Bet submitted successfully |
| error | alert-danger | fa-exclamation-circle | Validation errors, submission failures |
| warning | alert-warning | fa-exclamation-triangle | Warnings |
| info | alert-info | fa-info-circle | Informational messages |

**Visual Example:**
```
┌────────────────────────────────────────┐
│ ✓ Đặt cược thành công!            ×   │
└────────────────────────────────────────┘
```

### 2. Validation Utility (`src/utils/validation.ts`)
Comprehensive validation logic for bet data.

**Key Features:**
- ✅ Category validation
- ✅ Number selection validation
- ✅ Amount per number validation (min: 1K)
- ✅ Total amount validation (min_amount, max_amount)
- ✅ User balance validation
- ✅ Max number limit validation
- ✅ Exact number requirement validation
- ✅ Detailed error messages in Vietnamese

**Validation Function:**
```typescript
export const validateBet = (
  selectedNumbers: string[],
  amountPerNumber: number,
  totalAmount: number,
  category: GameCategory | null,
  userBalance: number
): BetValidationResult => {
  const errors: ValidationError[] = [];

  // Check if category is selected
  if (!category) {
    errors.push({
      field: 'category',
      message: 'Vui lòng chọn loại cược',
    });
    return { isValid: false, errors };
  }

  // Check if numbers are selected
  if (selectedNumbers.length === 0) {
    errors.push({
      field: 'numbers',
      message: 'Vui lòng chọn ít nhất một số',
    });
  }

  // ... more validations

  return {
    isValid: errors.length === 0,
    errors,
  };
};
```

**Validation Rules:**

| Rule | Condition | Error Message |
|------|-----------|---------------|
| Category Required | !category | Vui lòng chọn loại cược |
| Numbers Required | length === 0 | Vui lòng chọn ít nhất một số |
| Max Numbers | length > max_number | Bạn chỉ được chọn tối đa {max_number} số |
| Exact Numbers | length !== max_number (when required) | Bạn phải chọn đúng {max_number} số |
| Min Amount Per Number | amountPerNumber < 1 | Số tiền 1 con phải lớn hơn hoặc bằng 1K |
| Min Total Amount | totalAmount < min_amount | Tổng tiền phải lớn hơn hoặc bằng {min_amount}K |
| Max Total Amount | totalAmount > max_amount | Tổng tiền không được vượt quá {max_amount}K |
| Sufficient Balance | totalAmount > userBalance | Số dư không đủ. Số dư hiện tại: {balance}K |
| Positive Amount | totalAmount <= 0 | Tổng tiền phải lớn hơn 0 |

**Error Formatting:**
```typescript
export const formatValidationErrors = (errors: ValidationError[]): string => {
  if (errors.length === 0) return '';
  if (errors.length === 1) return errors[0].message;
  
  return errors.map((error, index) => `${index + 1}. ${error.message}`).join('\n');
};
```

### 3. Updated BettingSlip Component (`src/components/betting/BettingSlip.tsx`)
Enhanced with validation and bet submission.

**Changes:**
- ✅ Replaced `onSubmit` prop with `onSuccess` and `onError` callbacks
- ✅ Integrated `useUserInfo` hook to get user balance
- ✅ Integrated `useSubmitBet` mutation hook
- ✅ Added comprehensive validation before submission
- ✅ Auto-clear betting slip on successful submission
- ✅ Display validation errors via notification system
- ✅ Update UI error states based on validation

**Updated handleSubmit:**
```typescript
const handleSubmit = async () => {
  // Get user balance
  const userBalance = userInfo?.balance || 0;

  // Validate bet
  const validationResult = validateBet(
    selectedNumbers,
    amountPerNumber,
    totalAmount,
    category,
    userBalance
  );

  if (!validationResult.isValid) {
    const errorMessage = formatValidationErrors(validationResult.errors);
    onError(errorMessage);
    
    // Update UI errors
    setErrors({
      one: hasNumberError || hasAmountPerNumberError,
      amount: hasAmountError,
    });
    
    return;
  }

  // Clear errors
  setErrors({});

  // Submit bet
  try {
    await submitBetMutation.mutateAsync({
      numbers: selectedNumbers,
      amountPerNumber,
      totalAmount,
      category,
    });

    // Success
    onSuccess('Đặt cược thành công!');
    
    // Clear betting slip
    handleClear();
  } catch (error) {
    onError('Đặt cược thất bại. Vui lòng thử lại.');
  }
};
```

### 4. Updated useSubmitBet Hook (`src/hooks/useSubmitBet.ts`)
Fixed to invalidate correct query key.

**Changes:**
- ✅ Changed from `['userBalance']` to `['userInfo']` query key
- ✅ Ensures user balance refreshes after successful bet submission

```typescript
export const useSubmitBet = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: mockApi.submitBet,
    onSuccess: () => {
      // Invalidate user info query to refresh balance
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    },
  });
};
```

### 5. Updated HomePage (`src/routes/index.tsx`)
Integrated notification system.

**Changes:**
- ✅ Added notification state management
- ✅ Added `handleSuccess` and `handleError` callbacks
- ✅ Rendered `Notification` component when notification state is set
- ✅ Passed callbacks to BettingSlip and LeftSidebar
- ✅ Auto-dismiss notification after 3 seconds

**Notification State:**
```typescript
const [notification, setNotification] = useState<{
  message: string;
  type: NotificationType;
} | null>(null);

const handleSuccess = (message: string) => {
  setNotification({ message, type: 'success' });
};

const handleError = (message: string) => {
  setNotification({ message, type: 'error' });
};

const handleCloseNotification = () => {
  setNotification(null);
};
```

**Render:**
```typescript
return (
  <>
    <NotificationBar ... />
    {notification && (
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={handleCloseNotification}
      />
    )}
    <div className="container-fluid">
      ...
    </div>
  </>
);
```

## Data Flow

### Bet Submission Flow
```
User clicks "XÁC NHẬN"
    ↓
handleSubmit() called
    ↓
Get user balance from useUserInfo
    ↓
validateBet() checks all rules
    ↓
┌─────────────────┐
│ Validation Pass?│
└─────────────────┘
    ↓           ↓
   YES         NO
    ↓           ↓
Submit bet   Show error notification
    ↓           ↓
useSubmitBet  Update UI error states
mutation      
    ↓
┌─────────────────┐
│ Submission OK?  │
└─────────────────┘
    ↓           ↓
   YES         NO
    ↓           ↓
Success      Error
notification notification
    ↓
Clear betting slip
    ↓
Invalidate userInfo query
    ↓
Balance refreshes
```

### Validation Flow
```
validateBet(numbers, amount, total, category, balance)
    ↓
Check category exists
    ↓
Check numbers selected
    ↓
Check max_number limit
    ↓
Check exact number requirement
    ↓
Check amountPerNumber >= 1
    ↓
Check totalAmount >= min_amount
    ↓
Check totalAmount <= max_amount
    ↓
Check totalAmount <= userBalance
    ↓
Check totalAmount > 0
    ↓
Return { isValid, errors }
```

## Testing

### Notification Tests (`src/components/common/__tests__/Notification.test.tsx`)
- ✅ Renders notification with message
- ✅ Renders success notification with correct class
- ✅ Renders error notification with correct class
- ✅ Renders warning notification with correct class
- ✅ Renders info notification with correct class
- ✅ Displays correct icon for each type
- ✅ Calls onClose when close button clicked
- ✅ Auto-closes after duration
- ✅ Does not auto-close if duration is 0

### Validation Tests (`src/utils/__tests__/validation.test.ts`)
- ✅ Returns valid for correct bet
- ✅ Returns error when no category selected
- ✅ Returns error when no numbers selected
- ✅ Returns error when amount per number < 1
- ✅ Returns error when total amount exceeds max_amount
- ✅ Returns error when total amount < min_amount
- ✅ Returns error when balance is insufficient
- ✅ Returns error when total amount is 0 or negative
- ✅ Returns error when exceeding max_number
- ✅ Returns error when not matching exact number requirement
- ✅ Formats single error correctly
- ✅ Formats multiple errors as numbered list

### Updated BettingSlip Tests
- ✅ All existing tests updated to use onSuccess/onError
- ✅ All tests wrapped with QueryClientProvider
- ✅ Tests pass with new validation system

## Files Created/Modified

### Created:
- `src/components/common/Notification.tsx` - Notification component
- `src/components/common/__tests__/Notification.test.tsx` - Notification tests
- `src/utils/validation.ts` - Validation utility
- `src/utils/__tests__/validation.test.ts` - Validation tests
- `TASK_11_IMPLEMENTATION.md` - This documentation

### Modified:
- `src/components/common/index.ts` - Export Notification
- `src/components/betting/BettingSlip.tsx` - Integrated validation and submission
- `src/components/betting/__tests__/BettingSlip.test.tsx` - Updated tests
- `src/components/layout/LeftSidebar.tsx` - Updated props
- `src/hooks/useSubmitBet.ts` - Fixed query key
- `src/routes/index.tsx` - Integrated notification system
- `.kiro/specs/lottery-website-clone/tasks.md` - Marked Task 11 complete

## Requirements Satisfied

✅ **Requirement 9.1:** Display "HỦY" and "XÁC NHẬN" buttons  
✅ **Requirement 9.2:** Clear all selected numbers when cancel clicked  
✅ **Requirement 9.3:** Validate bet amounts against min_amount and max_amount  
✅ **Requirement 9.4:** Submit bet to API if validation passes  
✅ **Requirement 9.5:** Display error message with validation reason if validation fails  

## TypeScript Compilation

✅ No TypeScript errors  
✅ All types properly defined  
✅ Proper use of `import type` for type-only imports  

## User Benefits

1. **✅ Real-time Validation:** Immediate feedback on bet validity
2. **💰 Balance Protection:** Cannot bet more than available balance
3. **📊 Clear Error Messages:** Understand exactly what's wrong
4. **🎯 Success Confirmation:** Know when bet is successfully placed
5. **🔄 Auto-refresh Balance:** Balance updates after successful bet
6. **⚡ Smart Validation:** Checks all rules before submission
7. **🎨 Visual Feedback:** Color-coded notifications (green/red)
8. **⏱️ Auto-dismiss:** Notifications disappear automatically

## Next Steps

The bet confirmation and validation system is fully functional! Possible next tasks:
- Implement bet history display
- Add bet cancellation functionality
- Implement statistics tracking
- Add more detailed bet confirmation modal
- Implement multi-bet submission

The validation system provides comprehensive protection and user feedback for the betting process!

