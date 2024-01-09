import axios from 'axios';
import { config } from '../config';

const SYMBOL = 'ONEUSDT';
const INTERVAL = '30m';

let highPrice: number | null = null;
let lowPrice: number | null = null;

// https://api.binance.us/api/v3/klines?symbol=ONEUSDT&interval=30m&startTime=1704817800000

interface PriceData {
  openTime: number;
  closeTime: number;
  highPrice: number;
  lowPrice: number;
}

async function fetchPrice(): Promise<PriceData> {
  const startTime = Date.now() - (60 * 60 * 1000); // last hour

  const params = {
    symbol: SYMBOL,
    interval: INTERVAL,
    startTime: startTime
  }

  try {
    const response = await axios.get(config.price.URL, { params: params })
    const data = response.data;
    if (data.length == 0) {
      throw new Error('No price data available');
    }

    const recentPrice = data[data.length - 1];
    const priceData = {
      openTime: recentPrice[0],
      closeTime: recentPrice[6],
      highPrice: parseFloat(recentPrice[2]),
      lowPrice: parseFloat(recentPrice[3])
    };

    highPrice = priceData.highPrice;
    lowPrice = priceData.lowPrice;

    return priceData;
  } catch (error) {
    console.error('Error fetching price data:', error);
    throw error;
  }
}

function getHighPrice(): number | null {
  return highPrice;
}

function getLowPrice(): number | null {
  return lowPrice;
}

export { PriceData, fetchPrice, getHighPrice, getLowPrice };