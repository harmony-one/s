import { BigNumber, ethers } from "ethers";
import { getHighPrice } from "./price";

export const CAP = 10; // $10

export function limitToken(tokenAmountBN: BigNumber): [BigNumber, BigNumber] {
  const capBN = ethers.utils.parseUnits(CAP.toString(), 18);

  let actualSendBN;
  let remainderBN;

  if (tokenAmountBN.gt(capBN)) {
    actualSendBN = capBN;
    remainderBN = tokenAmountBN.sub(capBN);
  } else {
    actualSendBN = tokenAmountBN;
    remainderBN = BigNumber.from(0);
  }

  return [actualSendBN, remainderBN];
}

export function limitOne(oneAmountBN: BigNumber): [BigNumber, BigNumber] {
  const capBN = calculateONEAmount(CAP);

  let actualSendBN;
  let remainderBN;

  if (oneAmountBN.gt(capBN)) {
    actualSendBN = capBN;
    remainderBN = oneAmountBN.sub(capBN);
  } else {
    actualSendBN = oneAmountBN;
    remainderBN = BigNumber.from(0);
  }

  return [actualSendBN, remainderBN];
}

export function calculateONEAmount(dollarAmount: number): BigNumber {
  // convert the dollar amount to BigNumber, scaled up to match the 6 decimal places of the ONE price
  const dollarAmountBN = ethers.utils.parseUnits(dollarAmount.toFixed(2), 6);

  // convert the ONE price to BigNumber, assuming the price has 6 decimal places
  const onePriceUSDBN = ethers.utils.parseUnits(getHighPrice()!, 6);

  // calculate the number of ONE tokens as a BigNumber
  // dollar amount is scaled up by 10^18 to maintain precision during division
  return dollarAmountBN.mul(ethers.constants.WeiPerEther).div(onePriceUSDBN);
}