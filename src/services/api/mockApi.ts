import type {
  CategoriesResponse,
  GameListResponse,
  TimeLeftResponse,
  BettingSlipItem,
  LotteryResult,
  UserInfoResponse,
  ResultsListResponse,
  ResultsListItem,
  HistoryListResponse,
  HistoryItem,
} from '../../types/api';

// Import JSON data
import categoriesData from './data/categories.json';
import gameListData from './data/gamelist.json';
import userInfoData from './data/userinfo.json';

// Simulates network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Generate round ID based on current time and game mode
const generateRoundId = (date: Date, _gameId: number): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${year}${month}${day}-${hours}${minutes}`;
};

// Calculate time left until next round
const calculateTimeLeft = (date: Date, gameId: number): number => {
  const seconds = date.getSeconds();
  const currentMinute = date.getMinutes();
  
  if (gameId === 60) {
    // 1 minute game - time left in current minute
    return 60 - seconds;
  } else if (gameId === 180) {
    // 3 minute game
    const minuteInCycle = currentMinute % 3;
    const secondsInCycle = minuteInCycle * 60 + seconds;
    return 180 - secondsInCycle;
  } else if (gameId === 300) {
    // 5 minute game
    const minuteInCycle = currentMinute % 5;
    const secondsInCycle = minuteInCycle * 60 + seconds;
    return 300 - secondsInCycle;
  }
  
  return 60; // default
};

// Generate mock lottery results
const generateMockResults = (roundId: string): LotteryResult => {
  const generateNumber = (digits: number) => {
    return String(Math.floor(Math.random() * Math.pow(10, digits))).padStart(digits, '0');
  };
  
  return {
    roundId,
    prizes: [
      { name: 'Giải ĐB', numbers: [generateNumber(5)] },
      { name: 'Giải Nhất', numbers: [generateNumber(5)] },
      { name: 'Giải Nhì', numbers: [generateNumber(5), generateNumber(5)] },
      { name: 'Giải Ba', numbers: Array(6).fill(0).map(() => generateNumber(5)) },
      { name: 'Giải Tư', numbers: Array(4).fill(0).map(() => generateNumber(4)) },
      { name: 'Giải Năm', numbers: Array(6).fill(0).map(() => generateNumber(4)) },
      { name: 'Giải Sáu', numbers: Array(3).fill(0).map(() => generateNumber(3)) },
      { name: 'Giải Bảy', numbers: Array(4).fill(0).map(() => generateNumber(2)) },
    ],
  };
};

// Mock API functions
export const mockApi = {
  // Fetch categories from JSON file
  getCategories: async (): Promise<CategoriesResponse> => {
    await delay(200);
    return categoriesData as CategoriesResponse;
  },

  // Fetch game modes
  getGameList: async (): Promise<GameListResponse> => {
    await delay(150);
    return gameListData as GameListResponse;
  },

  // Fetch time left for current round
  getTimeLeft: async (gameId: number): Promise<TimeLeftResponse> => {
    await delay(100);
    const now = new Date();
    const roundId = generateRoundId(now, gameId);
    const timeLeft = calculateTimeLeft(now, gameId);
    return { success: true, roundId, timeLeft };
  },

  // Submit bet (mock - just returns success)
  submitBet: async (_bet: BettingSlipItem): Promise<{ success: boolean }> => {
    await delay(300);
    return { success: true };
  },

  // Fetch results for a round (mock - generates random results)
  getResults: async (roundId: string): Promise<LotteryResult> => {
    await delay(250);
    return generateMockResults(roundId);
  },

  // Fetch user information
  getUserInfo: async (): Promise<UserInfoResponse> => {
    await delay(150);
    return userInfoData as UserInfoResponse;
  },

  // Fetch paginated results list
  getResultsList: async (
    gameId: number,
    page: number = 1,
    type: number | string = 1
  ): Promise<ResultsListResponse> => {
    await delay(300);

    const perPage = 6; // 6 results per page (2 rows x 3 columns)
    const now = new Date();

    // Generate results based on filter type
    const generateResultsForDate = (date: Date, count: number): ResultsListItem[] => {
      const results: ResultsListItem[] = [];
      const gameInterval = gameId === 60 ? 1 : gameId === 180 ? 3 : 5; // minutes

      for (let i = 0; i < count; i++) {
        const resultDate = new Date(date.getTime() - i * gameInterval * 60 * 1000);
        const year = resultDate.getFullYear();
        const month = String(resultDate.getMonth() + 1).padStart(2, '0');
        const day = String(resultDate.getDate()).padStart(2, '0');
        const hours = String(resultDate.getHours()).padStart(2, '0');
        const minutes = String(resultDate.getMinutes()).padStart(2, '0');
        const times = `${year}${month}${day}${hours}${minutes}`;

        const generateNumber = (digits: number) => {
          return String(Math.floor(Math.random() * Math.pow(10, digits))).padStart(digits, '0');
        };

        results.push({
          times,
          special: generateNumber(5),
          prize1: generateNumber(5),
          prize2: [generateNumber(5), generateNumber(5)],
          prize3: Array(6).fill(0).map(() => generateNumber(5)),
          prize4: Array(4).fill(0).map(() => generateNumber(4)),
          prize5: Array(6).fill(0).map(() => generateNumber(4)),
          prize6: Array(3).fill(0).map(() => generateNumber(3)),
          prize7: Array(4).fill(0).map(() => generateNumber(2)),
        });
      }

      return results;
    };

    let allResults: ResultsListItem[] = [];

    // Handle search by round ID
    if (typeof type === 'string' && type.length > 0) {
      const searchTimes = type.replace('-', '');
      allResults = generateResultsForDate(now, 100).filter(r => r.times.includes(searchTimes));
    } else {
      // Handle date filters
      const filterType = typeof type === 'number' ? type : 1;

      if (filterType === 1) {
        // Today - generate results for today
        allResults = generateResultsForDate(now, 50);
      } else if (filterType === 2) {
        // Yesterday
        const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        allResults = generateResultsForDate(yesterday, 50);
      } else if (filterType === 3) {
        // Last 7 days
        allResults = generateResultsForDate(now, 200);
      } else if (filterType === 4) {
        // This month
        allResults = generateResultsForDate(now, 500);
      }
    }

    // Paginate results
    const totalResults = allResults.length;
    const totalPages = Math.ceil(totalResults / perPage);
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedResults = allResults.slice(startIndex, endIndex);

    return {
      success: true,
      results: paginatedResults,
      pagination: {
        currentPage: page,
        totalPages,
        totalResults,
        perPage,
      },
    };
  },

  // Fetch paginated bet history
  getHistoryList: async (
    gameId: number,
    page: number = 1
  ): Promise<HistoryListResponse> => {
    await delay(300);

    const perPage = 10; // 10 history items per page
    const now = new Date();

    // Generate mock history items
    const generateHistoryItems = (count: number): HistoryItem[] => {
      const items: HistoryItem[] = [];
      const gameInterval = gameId === 60 ? 1 : gameId === 180 ? 3 : 5; // minutes
      const categories = ['Bao lô', 'Đầu đuôi', 'Lô 2 số', 'Lô 3 số', '3 càng'];
      const statuses = [0, 1, 2, 3]; // 0=Pending, 1=Win, 2=Lose, 3=Cancelled

      for (let i = 0; i < count; i++) {
        const betDate = new Date(now.getTime() - i * gameInterval * 60 * 1000);
        const year = betDate.getFullYear();
        const month = String(betDate.getMonth() + 1).padStart(2, '0');
        const day = String(betDate.getDate()).padStart(2, '0');
        const hours = String(betDate.getHours()).padStart(2, '0');
        const minutes = String(betDate.getMinutes()).padStart(2, '0');
        const times = `${year}${month}${day}${hours}${minutes}`;
        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

        const generateNumber = (digits: number) => {
          return String(Math.floor(Math.random() * Math.pow(10, digits))).padStart(digits, '0');
        };

        const numCount = Math.floor(Math.random() * 5) + 1; // 1-5 numbers
        const numbers: string[] = [];
        for (let j = 0; j < numCount; j++) {
          numbers.push(generateNumber(2));
        }

        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const amount = (Math.floor(Math.random() * 10) + 1) * 10; // 10K-100K
        let amount_win = 0;
        let numbers_win: string[] | undefined = undefined;

        if (status === 1) {
          // Win
          amount_win = amount * (Math.floor(Math.random() * 80) + 20); // 20x-100x
          numbers_win = [numbers[Math.floor(Math.random() * numbers.length)]]; // Random winning number
        }

        items.push({
          id: 1000 + i,
          times,
          date: formattedDate,
          cate: categories[Math.floor(Math.random() * categories.length)],
          numbers,
          numbers_win,
          amount,
          amount_win,
          status,
        });
      }

      return items;
    };

    const allHistory = generateHistoryItems(100);

    // Paginate history
    const totalItems = allHistory.length;
    const totalPages = Math.ceil(totalItems / perPage);
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedHistory = allHistory.slice(startIndex, endIndex);

    return {
      success: true,
      history: paginatedHistory,
      pagination: {
        currentPage: page,
        totalPages,
        totalResults: totalItems,
        perPage,
      },
    };
  },
};
