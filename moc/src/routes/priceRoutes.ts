import express from 'express';
import { fetchPrice, getHighPrice, getLowPrice } from '../utils/price';
import { walletManager } from '../server';
import { BigNumber, ethers } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // update price
    const { lowPrice, highPrice } = await fetchPrice();
    const highUsdc = highPrice.toFixed(6);
    const highOne = (1 / highPrice).toFixed(6);
    const lowUsdc = lowPrice.toFixed(6);
    const lowOne = (1 / lowPrice).toFixed(6);

    // const oneToToken = await walletManager.convertOneToToken(parseUnits('1', 18));
    // const formattedToken = ethers.utils.formatUnits(oneToToken, 6); // format to USDC (6 decimal places)

    // const tokenToOne = await walletManager.convertTokenToOne(parseUnits('1', 6));
    // const formattedOne = ethers.utils.formatUnits(tokenToOne, 18); // format to ONE (18 decimal places)

    const conversionText = `
      <p>High Price (Base -> Harmony)</p>
      <p>1 ONE = ${highUsdc} USDC</p>
      <p>1 USDC = ${highOne} ONE</p>
      <br/>
      <p>Low Price (Harmony -> Base)</p>
      <p>1 ONE = ${lowUsdc} USDC</p>
      <p>1 USDC = ${lowOne} ONE</p>
      `;

    res.send(conversionText);
  } catch (error) {
    res.status(404).send('Price data not available');
  }
});

router.get('/data', async (req, res) => {
  try {
    const priceData = await fetchPrice();
    res.json(priceData);
  } catch (error) {
    res.status(500).send('Error fetching price data');
  }
});

router.get('/high', (req, res) => {
  const high = getHighPrice();
  if (high !== null) {
    res.json({ highPrice: high });
  } else {
    res.status(404).send('High price not available');
  }
});

router.get('/low', (req, res) => {
  const low = getLowPrice();
  if (low !== null) {
    res.json({ lowPrice: low });
  } else {
    res.status(404).send('Low price not available');
  }
});

export default router;
