import React, { useState, useRef } from 'react'
import { cn } from '@/lib/utils'
import { useMediaQuery } from '@/hooks/use-media-query'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { ChevronDownIcon } from 'lucide-react'

export interface VietnamNumberGridProps {
  /**
   * Additional classes for the container
   */
  className?: string
  /**
   * Callback when number is selected
   */
  onNumberSelect?: (number: string) => void
  /**
   * Callback when category changes
   */
  onCategoryChange?: (category: string) => void
  /**
   * Selected numbers
   */
  selectedNumbers?: string[]
  /**
   * Selected region (for betting)
   */
  region?: string
  /**
   * Current rate (for betting)
   */
  rate?: number
  /**
   * Callback when bet is placed
   */
  onPlaceBet?: (data: BettingData) => void
  /**
   * Callback to update selected numbers
   */
  onSelectedNumbersChange?: (numbers: string[]) => void
}

export interface BettingData {
  region: string
  category: string
  selectedNumbers: string[]
  betAmount: number
  totalAmount: number
  rate: number
}

// Mock data for categories with Vietnamese lottery types
const categories = [
  { id: 'lo2so', label: 'Lô 2 số', rate: '1 : 98.4' },
  { id: 'lo3so', label: 'Lô 3 số', rate: '1 : 900', active: true },
  { id: 'xien2', label: 'Xiên 2', rate: '1 : 34' },
  { id: 'xien3', label: 'Xiên 3', rate: '1 : 185' },
  { id: 'xien4', label: 'Xiên 4', rate: '1 : 970' },
  { id: 'dau', label: 'Đầu', rate: '1 : 9.5' },
  { id: 'duoi', label: 'Đuôi', rate: '1 : 9.5' },
  { id: 'dedau', label: 'Đề đầu', rate: '1 : 95' },
  { id: 'dedacbiet', label: 'Đề đặc biệt', rate: '1 : 95' },
  { id: '3cangdau', label: '3 càng đầu', rate: '1 : 900' },
  { id: '3cangduoi', label: '3 càng đuôi', rate: '1 : 900' },
  { id: '3cangdauduoi', label: '3 càng đầu - đuôi', rate: '1 : 900' },
]

// Number ranges for 3-digit lottery
const numberRanges = [
  { id: '000-099', label: '000-099', active: true },
  { id: '100-199', label: '100-199' },
  { id: '200-299', label: '200-299' },
  { id: '300-399', label: '300-399' },
  { id: '400-499', label: '400-499' },
  { id: '500-599', label: '500-599' },
  { id: '600-699', label: '600-699' },
  { id: '700-799', label: '700-799' },
  { id: '800-899', label: '800-899' },
  { id: '900-999', label: '900-999' },
]

// Function to determine number type based on category
const getNumberType = (category: string): 'single' | 'double' | 'triple' => {
  const singleDigitCategories = ['dau', 'duoi']
  const doubleDigitCategories = [
    'lo2so',
    'xien2',
    'xien3',
    'xien4',
    'dedau',
    'dedacbiet',
  ]
  const tripleDigitCategories = [
    'lo3so',
    '3cangdau',
    '3cangduoi',
    '3cangdauduoi',
  ]

  if (singleDigitCategories.includes(category)) return 'single'
  if (doubleDigitCategories.includes(category)) return 'double'
  if (tripleDigitCategories.includes(category)) return 'triple'
  return 'triple' // default
}

// Function to check if range selector should be shown
const shouldShowRangeSelector = (category: string): boolean => {
  const tripleDigitCategories = [
    'lo3so',
    '3cangdau',
    '3cangduoi',
    '3cangdauduoi',
  ]
  return tripleDigitCategories.includes(category)
}

// Function to get bet note content based on category
const getBetNote = (category: string): string => {
  const betNotes: { [key: string]: string } = {
    lo2so:
      'Đánh 2 chữ số cuối trong lô 18 giải. Thắng gấp <strong class="text-danger">98.4</strong> lần, nếu số đó về N lần thì tính kết quả x N lần. Ví dụ: đánh lô số 39 - 1 con 1k, Tổng thanh toán: 1k x 18 = 18k. Nếu trong lô có 1 lần 2 chữ số cuối là 39 thì Tiền thắng: 1k x <strong class="text-danger">98.4</strong> = <strong class="text-danger">98.4</strong>k, nếu có N lần 2 chữ số cuối là 39 thì Tiền thắng là: 1k x <strong class="text-danger">98.4</strong> x N',
    lo3so:
      'Đánh 3 chữ số cuối trong lô 17 giải. Thắng gấp <strong class="text-danger">900</strong> lần, nếu số đó về N lần thì tính kết quả x N lần. Ví dụ: đánh lô 789 - 1 con 1k, Tổng thanh toán: 1k x 17 = 17k. Nếu trong lô có 3 chữ số cuối là 789 thì Tiền thắng: 1k x <strong class="text-danger">900</strong> = <strong class="text-danger">900</strong>k, nếu có N lần 3 chữ số cuối là 789 thì Tiền thắng là: 1k x <strong class="text-danger">900</strong> x N',
    xien2:
      'Xiên 2 của 2 chữ số cuối trong lô 18 giải. Thắng gấp <strong class="text-danger">34</strong> lần. Ví dụ : đánh 1k cho xiên 11+13, Tổng thanh toán: 1k. Nếu trong lô có "2 chữ số cuối là 11 và 2 chữ số cuối là 13" thì Tiền thắng: 1k x <strong class="text-danger">34</strong> = <strong class="text-danger">34</strong>k',
    xien3:
      'Xiên 3 của 2 chữ số cuối trong lô 18 giải. Thắng gấp <strong class="text-danger">185</strong> lần. Ví dụ : đánh 1k cho xiên 11+13+15, Tổng thanh toán: 1k. Nếu trong lô có 2 chữ số cuối là 11,13,15 thì Tiền thắng: 1k x <strong class="text-danger">185</strong> = <strong class="text-danger">185</strong>k',
    xien4:
      'Xiên 4 của 2 chữ số cuối trong lô 18 giải. Thắng gấp <strong class="text-danger">970</strong> lần. Ví dụ : đánh 1k cho xiên 11+13+15+20, Tổng thanh toán: 1k. Nếu trong lô có 2 chữ số cuối là 11,13,15,20 thì Tiền thắng: 1k x <strong class="text-danger">970</strong> = <strong class="text-danger">970</strong>k',
    dau: 'Đánh 1 chữ số ở hàng chục của giải ĐB. Thắng gấp <strong class="text-danger">9.5</strong> lần. Ví dụ: đánh 1k cho số 7. Tổng thanh toán: 1K. Nếu giải ĐB là xxx7x thì Tiền thắng: 1k x <strong class="text-danger">9.5</strong> = <strong class="text-danger">9.5</strong>k',
    duoi: 'Đánh 1 chữ số cuối của giải ĐB. Thắng gấp <strong class="text-danger">9.5</strong> lần. Ví dụ: đánh 1k cho số 9. Tổng thanh toán: 1k. Nếu giải ĐB là xxxx9 thì Tiền thắng: 1k x <strong class="text-danger">9.5</strong> = <strong class="text-danger">9.5</strong>k',
    dedau:
      'Đánh giải 8. Thắng gấp <strong class="text-danger">95</strong> lần. Ví dụ: đánh 1k cho số 79. Tổng thanh toán: 1k. Nếu giải 8 là 79 thì Tiền thắng: 1k x <strong class="text-danger">95</strong> = <strong class="text-danger">95</strong>k',
    dedacbiet:
      'Đánh 2 chữ số cuối trong giải ĐB. Thắng gấp <strong class="text-danger">95</strong> lần. Ví dụ: đánh 1k cho số 79. Tổng thanh toán: 1k. Nếu giải ĐB là xxx79 thì Tiền thắng: 1k x <strong class="text-danger">95</strong> = <strong class="text-danger">95</strong>k',
    '3cangdau':
      'Đánh giải 7. Thắng gấp <strong class="text-danger">900</strong> lần. Ví dụ: đánh 1k cho số 879, Tổng thanh toán: 1k. Nếu giải 7 là 879 thì Tiền thắng: 1k x <strong class="text-danger">900</strong> = <strong class="text-danger">900</strong>K',
    '3cangduoi':
      'Đánh 3 chữ số cuối của giải ĐB. Thắng gấp <strong class="text-danger">900</strong> lần. Ví dụ: đánh 1k cho số 879, Tổng thanh toán: 1k. Nếu giải ĐB là xx879 thì Tiền thắng: 1k x <strong class="text-danger">900</strong> = <strong class="text-danger">900</strong>K',
    '3cangdauduoi':
      'Đánh 3 chữ số cuối của giải ĐB và giải 7. Thắng gấp <strong class="text-danger">900</strong> lần. Ví dụ: đánh 1k cho số 879, Tổng thanh toán: 2k. Nếu giải ĐB hoặc giải 7 có 3 chữ số cuối là 879 thì Tiền thắng: 1k x <strong class="text-danger">900</strong> = <strong class="text-danger">900</strong>k',
  }

  return betNotes[category] || betNotes.lo3so
}

// Function to get betting rate display for accordion
const getBetRateDisplay = (category: string): string => {
  const rateDisplays: { [key: string]: string } = {
    lo2so: '1 ĂN 98.4',
    lo3so: '1 ĂN 900',
    xien2: '1 ĂN 34',
    xien3: '1 ĂN 185',
    xien4: '1 ĂN 970',
    dau: '1 ĂN 9.5',
    duoi: '1 ĂN 9.5',
    dedau: '1 ĂN 95',
    dedacbiet: '1 ĂN 95',
    '3cangdau': '1 ĂN 900',
    '3cangduoi': '1 ĂN 900',
    '3cangdauduoi': '1 ĂN 900',
  }

  return rateDisplays[category] || '1 ĂN 900'
}

export function VietnamNumberGrid({
  className,
  onNumberSelect,
  onCategoryChange,
  selectedNumbers = [],
  region = "Miền Nam - Bạc Liêu",
  rate = 98.4,
  onPlaceBet,
  onSelectedNumbersChange
}: VietnamNumberGridProps) {
  const [activeCategory, setActiveCategory] = useState('lo3so')
  const [activeRange, setActiveRange] = useState('000-099')
  const categoryRefs = useRef<{ [key: string]: HTMLLIElement | null }>({})
  const isMobile = useMediaQuery('(max-width: 992px)')

  // Betting component state
  const [betAmount, setBetAmount] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [inputValue, setInputValue] = useState<string>('')

  console.log(activeCategory, 'activeCategory')

  // Betting calculations
  const minimumBet = 180 // 180K minimum
  const numbersCount = selectedNumbers.length
  const betAmountNum = parseFloat(betAmount) || 0
  const totalBetAmount = betAmountNum * numbersCount
  const winAmountPerNumber = betAmountNum * rate / 100

  // Generate numbers based on category type
  const generateNumbers = (category: string, range?: string) => {
    const numberType = getNumberType(category)

    switch (numberType) {
      case 'single':
        // 0-9 for dau, duoi
        return Array.from({ length: 10 }, (_, i) => i.toString())

      case 'double':
        // 00-99 for lo2so, xien2, xien3, xien4, dedau, dedacbiet
        return Array.from({ length: 100 }, (_, i) =>
          i.toString().padStart(2, '0'),
        )

      case 'triple':
        // 000-999 with range selector for lo3so, 3cang categories
        if (range) {
          const [start] = range.split('-')
          const startNum = parseInt(start)
          return Array.from({ length: 100 }, (_, i) => {
            const num = startNum + i
            return num.toString().padStart(3, '0')
          })
        }
        // Default to 000-099 if no range specified
        return Array.from({ length: 100 }, (_, i) =>
          i.toString().padStart(3, '0'),
        )

      default:
        return []
    }
  }

  const numbers = generateNumbers(
    activeCategory,
    shouldShowRangeSelector(activeCategory) ? activeRange : undefined,
  )

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId)
    onCategoryChange?.(categoryId)
    // Reset to first range when switching to a category that uses ranges
    if (shouldShowRangeSelector(categoryId)) {
      setActiveRange('000-099')
    }
  }

  const handleDropdownCategoryClick = (categoryId: string) => {
    handleCategoryClick(categoryId)
    // Scroll to the active category in the main list
    const categoryElement = categoryRefs.current[categoryId]
    if (categoryElement) {
      categoryElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      })
    }
  }

  const handleRangeClick = (rangeId: string) => {
    setActiveRange(rangeId)
  }

  const handleNumberClick = (number: string) => {
    const isSelected = selectedNumbers.includes(number)
    let newNumbers: string[]
    
    if (isSelected) {
      // Remove if already selected
      newNumbers = selectedNumbers.filter(n => n !== number)
    } else {
      // Add if not selected
      newNumbers = [...selectedNumbers, number]
    }
    
    isInternalUpdateRef.current = true
    onSelectedNumbersChange?.(newNumbers)
    onNumberSelect?.(number)
  }

  // Betting functions
  const handleRemoveNumber = (numberToRemove: string) => {
    const newNumbers = selectedNumbers.filter(num => num !== numberToRemove)
    onSelectedNumbersChange?.(newNumbers)
  }

  const handleBetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setBetAmount(value)
    setError('')
    
    const amount = parseFloat(value)
    if (amount && amount * numbersCount < minimumBet) {
      setError(`Cược tối thiểu ${minimumBet}K`)
    }
  }

  const handlePlaceBet = () => {
    if (selectedNumbers.length === 0) {
      setError('Vui lòng chọn số để đánh')
      return
    }

    if (!betAmount || betAmountNum <= 0) {
      setError('Vui lòng nhập số tiền đánh')
      return
    }

    if (totalBetAmount < minimumBet) {
      setError(`Cược tối thiểu ${minimumBet}K`)
      return
    }

    const bettingData: BettingData = {
      region,
      category: activeCategory,
      selectedNumbers,
      betAmount: betAmountNum,
      totalAmount: totalBetAmount,
      rate
    }

    onPlaceBet?.(bettingData)
    setError('')
  }

  const getCurrentCategoryLabel = () => {
    const category = categories.find(cat => cat.id === activeCategory)
    return category ? category.label : 'Lô 3 số'
  }

  // Helper functions for number input formatting
  const getDigitsPerNumber = (category: string): number => {
    const numberType = getNumberType(category)
    switch (numberType) {
      case 'single': return 1
      case 'double': return 2
      case 'triple': return 3
      default: return 2
    }
  }

  const formatNumbersToInput = (numbers: string[]): string => {
    return numbers.join('-')
  }

  const parseInputToNumbers = (input: string, digitsPerNumber: number): string[] => {
    if (!input.trim()) return []

    console.log(input, 'input')
    
    // Remove any existing dashes and spaces
    const cleanInput = input.replace(/[-\s]/g, '')
    
    const numbers: string[] = []
    for (let i = 0; i < cleanInput.length; i += digitsPerNumber) {
      const number = cleanInput.slice(i, i + digitsPerNumber)
      if (number.length === digitsPerNumber) {
        numbers.push(number)
      }
    }
    
    return numbers
  }

  const formatInputWithDashes = (input: string, digitsPerNumber: number): string => {
    // Remove any existing dashes and spaces
    const cleanInput = input.replace(/[-\s]/g, '')
    
    let formatted = ''
    for (let i = 0; i < cleanInput.length; i += digitsPerNumber) {
      if (i > 0) formatted += '-'
      formatted += cleanInput.slice(i, i + digitsPerNumber)
    }
    
    return formatted
  }

  // Track if update is from internal input to prevent loops
  const isInternalUpdateRef = React.useRef(false)
  
  // Update input value when selectedNumbers changes externally
  React.useEffect(() => {
    if (!isInternalUpdateRef.current) {
      const newInputValue = formatNumbersToInput(selectedNumbers)
      console.log('External update - setting input to:', newInputValue)
      setInputValue(newInputValue)
    }
    isInternalUpdateRef.current = false
  }, [selectedNumbers])

  // Update when category changes (reformat existing numbers)
  React.useEffect(() => {
    if (inputValue) {
      const digitsPerNumber = getDigitsPerNumber(activeCategory)
      const numbers = parseInputToNumbers(inputValue, digitsPerNumber)
      const newFormattedInput = formatNumbersToInput(numbers)
      if (newFormattedInput !== inputValue) {
        console.log('Category change - reformatting:', newFormattedInput)
        setInputValue(newFormattedInput)
        isInternalUpdateRef.current = true
        onSelectedNumbersChange?.(numbers)
      }
    }
  }, [activeCategory])

  const handleNumberInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const digitsPerNumber = getDigitsPerNumber(activeCategory)
    
    console.log('Input change:', { value, current: inputValue, digitsPerNumber })
    
    // Allow only digits and dashes
    let cleanValue = value.replace(/[^0-9-]/g, '')
    
    // If user is typing (not deleting), auto-format with dashes
    if (value.length > inputValue.length) {
      // Remove existing dashes to get pure number string
      const pureNumbers = cleanValue.replace(/[-]/g, '')
      
      // Add dashes at appropriate positions
      let formatted = ''
      for (let i = 0; i < pureNumbers.length; i += digitsPerNumber) {
        if (i > 0) formatted += '-'
        formatted += pureNumbers.slice(i, i + digitsPerNumber)
      }
      cleanValue = formatted
    }
    
    console.log('Setting input value to:', cleanValue)
    setInputValue(cleanValue)
    
    // Parse and update selected numbers
    const numbers = parseInputToNumbers(cleanValue, digitsPerNumber)
    console.log('Parsed numbers:', numbers)
    isInternalUpdateRef.current = true
    onSelectedNumbersChange?.(numbers)
  }, [inputValue, activeCategory, onSelectedNumbersChange])

  const handleNumberInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow backspace, delete, arrow keys, etc.
    if (['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab'].includes(e.key)) {
      return
    }
    
    // Only allow numeric input
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault()
      return
    }
  }

  const renderSelectNumbersTab = () => (
    <>
      {/* Number Range Selector (only for categories that need it) */}
      {shouldShowRangeSelector(activeCategory) && (
        <ul className="danhlo-lo3so grid gap-2">
          {numberRanges.map((range) => (
            <li key={range.id} className="nav-item">
              <button
                className={cn(
                  'nav-link w-full',
                  activeRange === range.id && 'active',
                )}
                onClick={() => handleRangeClick(range.id)}
              >
                {range.label}
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Number Grid */}
      <ul className="table-number">
        {numbers.map((number) => {
          const isSelected = selectedNumbers.includes(number)

          return (
            <li
              key={number}
              className={cn('input-num', isSelected && 'active')}
              onClick={() => handleNumberClick(number)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleNumberClick(number)
                }
              }}
            >
              {number}
            </li>
          )
        })}
      </ul>

      {/* Betting Note */}
      <div className="bet-note">
        <div dangerouslySetInnerHTML={{ __html: getBetNote(activeCategory) }} />
      </div>
    </>
  )

  const renderBettingTab = () => (
    <div className="right-panel box-betting">
      <div className="head-panel">Đánh đề</div>
      
      <div className="content-panel">
        {/* Category and Rate Info */}
        <div className="cat-lode">
          <span id="daidanh">
            <span className="capitalize">{region}</span> / {getCurrentCategoryLabel()}
          </span>
          <span className="rate inline-block">&nbsp;@{rate}</span>
        </div>

        {/* Selected Numbers Input */}
        <div id="sodanh" className="number-bet">
          <div className="mb-2 w-full">
            <Input
              type="text"
              placeholder={`Nhập số (${getDigitsPerNumber(activeCategory)} chữ số mỗi con)`}
              value={inputValue}
              onChange={handleNumberInputChange}
              onKeyDown={handleNumberInputKeyDown}
              className="w-full text-sm h-10 pl-4"
            />
          </div>
          {/* Display parsed numbers */}
          {selectedNumbers.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {selectedNumbers.map((number, index) => (
                <div 
                  key={`${number}-${index}`} 
                  className="number-bet__item cursor-pointer"
                  onClick={() => handleRemoveNumber(number)}
                  title="Nhấp để xóa"
                >
                  {number}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Betting Amount Info */}
        <div className="info-amount">
          <span className="info-amount__label">Tổng tiền đánh</span>
          <div className="info-amount__data">
            Cược tối thiểu <span>{minimumBet} K</span>
          </div>
        </div>

        {/* Bet Amount Input */}
        <Input 
          className="form-new-2 h-10 pl-4" 
          type="tel" 
          inputMode="numeric"
          placeholder="Nhập số tiền đánh"
          value={betAmount}
          onChange={handleBetAmountChange}
        />

        {/* Betting Calculations */}
        <div className="block-win-bet text-[0.813rem] leading-loose">
          <div className="form-group">
            <div className="bet-one-money">
              <span className="bet-one-money__text">Tỉ lệ thắng</span>
              <span className="dots-span"></span>
              <span className="bet-one-money__num format_currency">
                <span>@</span>{rate}
              </span>
            </div>
          </div>

          <div className="form-group">
            <div className="bet-one-money">
              <span className="bet-one-money__text">Tiền đánh / 1 con</span>
              <span className="dots-span"></span>
              <span className="bet-one-money__num format_currency">
                {betAmountNum || 0}
              </span>
            </div>
          </div>

          <div className="form-group">
            <div className="win-one">
              <span className="win-one-text">Tiền thắng / 1 con</span>
              <span className="dots-span"></span>
              <span className="win-one-num format_currency tienthang1con">
                {winAmountPerNumber.toFixed(2)}
              </span>
            </div>
          </div>

          {numbersCount > 0 && (
            <div className="form-group">
              <div className="bet-one-money">
                <span className="bet-one-money__text">Số lượng con đánh</span>
                <span className="dots-span"></span>
                <span className="bet-one-money__num format_currency">
                  {numbersCount}
                </span>
              </div>
            </div>
          )}

          {totalBetAmount > 0 && (
            <div className="form-group">
              <div className="win-one">
                <span className="win-one-text">Tổng tiền đánh</span>
                <span className="dots-span"></span>
                <span className="win-one-num format_currency">
                  {totalBetAmount.toFixed(2)} K
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Error Display */}
        <div className="block-error">
          {error && (
            <div className="text-red-500 text-sm mt-2 p-2 bg-red-50 rounded">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Place Bet Button */}
      <button 
        className="btn-bet-now hover-btn" 
        data-text="ĐẶT CƯỢC"
        onClick={handlePlaceBet}
        disabled={selectedNumbers.length === 0 || !betAmount}
      >
        Đặt cược
      </button>
    </div>
  )


  const renderMobileVersion = () => (
    <div className={cn('box-biende box-category', className)}>
      {/* Category List - Shared between tabs */}
      <div className="flex">
        <ul className="category-list">
          {categories.map((category) => (
            <li 
              key={category.id} 
              className="nav-item"
              ref={(el) => {
                categoryRefs.current[category.id] = el
              }}
            >
              <a
                href="#"
                className={cn(
                  'category-list__btn',
                  activeCategory === category.id && 'active',
                )}
                onClick={(e) => {
                  e.preventDefault()
                  handleCategoryClick(category.id)
                }}
              >
                <span className="label">{category.label}</span>
                <span className="rate">{category.rate}</span>
              </a>
            </li>
          ))}
        </ul>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="btn-all lg:hidden">
              Tất cả
              <br />
              {categories.length}
              <br />
              <img
                width="10"
                height="10"
                className="mx-auto block size-2.5"
                src="https://lode88.ai/assets/images/lottery/arrow.svg"
                alt="expand"
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80 p-4" align="end">
            <div className="grid grid-cols-3 gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={cn(
                    'flex flex-col items-center justify-center p-2 rounded-md border text-xs transition-colors',
                    'hover:bg-accent hover:text-accent-foreground',
                    activeCategory === category.id && 'bg-primary text-primary-foreground'
                  )}
                  onClick={() => handleDropdownCategoryClick(category.id)}
                >
                  <span className="font-medium text-center leading-tight mb-1">
                    {category.label}
                  </span>
                  <span className="text-xs opacity-75">
                    {category.rate}
                  </span>
                </button>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Betting Note Accordion */}
      <Tabs defaultValue="select" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="select">Chọn số</TabsTrigger>
          <TabsTrigger value="bet">Nhập số</TabsTrigger>
        </TabsList>
        
        <TabsContent value="select">
          {renderSelectNumbersTab()}
        </TabsContent>
        
        <TabsContent value="bet">
          {renderBettingTab()}
        </TabsContent>
      </Tabs>
    </div>
  )

  return renderMobileVersion()
}

export default VietnamNumberGrid
