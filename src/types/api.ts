// TypeScript type definitions for API responses

// Category data types
export interface GameCategory {
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
  created_at: string;
  updated_at: string;
  max_number: number;
}

export interface CategoryGroup {
  type: string;
  name: string;
  children: GameCategory[];
}

export interface CategoriesResponse {
  success: boolean;
  rows: CategoryGroup[];
  attrs: any[];
}

// Game mode data types
export interface GameMode {
  id: number;
  name: string;
}

export interface GameListResponse {
  success: boolean;
  rows: GameMode[];
  attrs: any[];
}

// Time and round data types
export interface TimeLeftResponse {
  success: boolean;
  roundId: string;
  timeLeft: number; // seconds
}

// Betting slip data types
export interface BettingSlipItem {
  numbers: string[];
  amountPerNumber: number;
  totalAmount: number;
  category: GameCategory;
}

// Results data types
export interface PrizeTier {
  name: string;
  numbers: string[];
}

export interface LotteryResult {
  roundId: string;
  prizes: PrizeTier[];
}

// User data types
export interface UserInfo {
  username: string;
  balance: number; // in thousands (K)
}

export interface UserInfoResponse {
  success: boolean;
  username: string;
  balance: number;
}

// Results list data types (for results page)
export interface ResultsListItem {
  times: string; // Round ID without hyphen, e.g., "202511200788"
  special: string; // Giải ĐB
  prize1: string; // Giải Nhất
  prize2?: string[]; // Giải Nhì (array of numbers)
  prize3?: string[]; // Giải Ba
  prize4?: string[]; // Giải Tư
  prize5?: string[]; // Giải Năm
  prize6?: string[]; // Giải Sáu
  prize7?: string[]; // Giải Bảy
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  perPage: number;
}

export interface ResultsListResponse {
  success: boolean;
  results: ResultsListItem[];
  pagination: PaginationInfo;
}

// Bet history data types (for history page)
export interface HistoryItem {
  id: number;
  times: string; // Round ID without hyphen, e.g., "202511200788"
  date: string; // Formatted date, e.g., "2025-11-20 07:88"
  cate: string; // Category name, e.g., "Bao lô", "Đầu đuôi"
  numbers: string[]; // Bet numbers, e.g., ["12", "34", "56"]
  numbers_win?: string[]; // Winning numbers (if any)
  amount: number; // Bet amount in thousands (K)
  amount_win: number; // Win amount in thousands (K)
  status: number; // 0=Pending, 1=Win, 2=Lose, 3=Cancelled
}

export interface HistoryListResponse {
  success: boolean;
  history: HistoryItem[];
  pagination: PaginationInfo;
}
