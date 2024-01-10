import axios from 'axios';
import { config } from '../config';
import { ethers, BigNumber } from 'ethers';
import { ExtendedTransactionResponse } from '../indexers/Indexer';
import { HARMONY } from '../server';

const SYMBOL = 'ONEUSDT';
const INTERVAL = '1h';

let priceData: PriceData | null = null;

interface PriceData {
  openTime: number;
  closeTime: number;
  highPrice: number;
  lowPrice: number;
}

async function fetchPrice(): Promise<PriceData> {
  const startTime = Date.now() - (120 * 60 * 1000); // last 2 hours

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

    // update priceData with the fetched one
    priceData = {
      openTime: recentPrice[0],
      closeTime: recentPrice[6],
      highPrice: parseFloat(recentPrice[2]),
      lowPrice: parseFloat(recentPrice[3])
    };

    return priceData;
  } catch (error) {
    console.error('Error fetching price data:', error);
    throw error;
  }
}

function getPrice(): PriceData | null {
  return priceData;
}

function getHighPrice(): number | undefined {
  return priceData?.highPrice;
}

function getLowPrice(): number | undefined {
  return priceData?.lowPrice;
}

function convertOneToToken(amount: BigNumber): BigNumber {
  const lowPrice = getLowPrice();
  if (!lowPrice) {
    throw new Error('Low price data not available');
  }
  const conversionRate = ethers.utils.parseUnits(lowPrice.toString(), 6);
  return amount.mul(conversionRate).div(ethers.utils.parseUnits('1', 18));
}

function convertTokenToOne(amount: BigNumber): BigNumber {
  const highPrice = getHighPrice();
  if (!highPrice) {
    throw new Error('Price data not available');
  }
  const conversionRate = ethers.utils.parseUnits(highPrice.toString(), 6);
  return amount.mul(ethers.utils.parseUnits('1', 18)).div(conversionRate);
}

function getAmount(tx: ExtendedTransactionResponse, chain: string): number {
  let value: string;

  if (chain === HARMONY) {
    value = ethers.utils.formatUnits(tx.value, 18);
  } else {
    value = ethers.utils.formatUnits(tx.amount as BigNumber, 6);
  }

  const numValue = parseFloat(value);
  return parseFloat(numValue.toFixed(6));
}

export { PriceData, fetchPrice, getPrice, getHighPrice, getLowPrice, convertOneToToken, convertTokenToOne, getAmount };