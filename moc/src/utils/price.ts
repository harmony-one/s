import axios from 'axios';
import { config } from '../config';
import { ethers, BigNumber } from 'ethers';
import { ExtendedTransactionResponse } from '../indexers/Indexer';
import { HARMONY } from '../server';

const SYMBOL = 'ONEUSDT';
const INTERVAL = '1h';
const USDC_DECIMAL = 6;
const ONE_DECIMAL = 18;

let priceData: PriceData | null = null;

interface PriceData {
  openTime: number;
  closeTime: number;
  highPrice: string;
  lowPrice: string;
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
      highPrice: recentPrice[2],
      lowPrice: recentPrice[3]
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

function getHighPrice(): string | undefined {
  return priceData?.highPrice;
}

function getLowPrice(): string | undefined {
  return priceData?.lowPrice;
}

function convertOneToToken(amount: BigNumber): BigNumber {
  const lowPrice = getLowPrice();
  if (!lowPrice) {
    throw new Error('Low price data not available');
  }
  const conversionRate = ethers.utils.parseUnits(lowPrice, USDC_DECIMAL);
  return amount.mul(conversionRate).div(ethers.utils.parseUnits('1', ONE_DECIMAL));
}

function convertTokenToOne(amount: BigNumber): BigNumber {
  const highPrice = getHighPrice();
  if (!highPrice) {
    throw new Error('Price data not available');
  }
  const conversionRate = ethers.utils.parseUnits(highPrice, USDC_DECIMAL);
  return amount.mul(ethers.utils.parseUnits('1', ONE_DECIMAL)).div(conversionRate);
}

function getAmount(tx: ExtendedTransactionResponse, chain: string): number {
  let value: string;

  if (chain === HARMONY) {
    value = ethers.utils.formatUnits(tx.value, ONE_DECIMAL);
  } else {
    value = ethers.utils.formatUnits(tx.amount as BigNumber, USDC_DECIMAL);
  }

  const numValue = parseFloat(value);
  return parseFloat(numValue.toFixed(6));

  // // TODO: check overflow
  // return parseFloat(value);
}

export { PriceData, fetchPrice, getPrice, getHighPrice, getLowPrice, convertOneToToken, convertTokenToOne, getAmount };