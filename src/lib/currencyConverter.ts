// New file - currency conversion utility
const EXCHANGE_RATE_API = "https://api.exchangerate-api.com/v4/latest/USD";

let cachedRate: number | null = null;
let cacheTime: number = 0;
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

export const getUSDToNairaRate = async (): Promise<number> => {
  const now = Date.now();
  
  // Return cached rate if still valid
  if (cachedRate && (now - cacheTime) < CACHE_DURATION) {
    return cachedRate;
  }

  try {
    const response = await fetch(EXCHANGE_RATE_API);
    const data = await response.json();
    cachedRate = data.rates.NGN;
    cacheTime = now;
    return cachedRate || 1200; // Fallback rate
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    // Return a reasonable fallback rate (approximate current rate)
    return cachedRate || 1200;
  }
};

export const convertUSDToNGN = async (usdAmount: number): Promise<number> => {
  const rate = await getUSDToNairaRate();
  return Math.round(usdAmount * rate);
};
