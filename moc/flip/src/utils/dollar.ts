import { BigNumber, ethers } from "ethers";
import { getHighPrice } from "./price";

export const CAP = 10; // $10

export function limitToken(tokenAmountBN: BigNumber): [BigNumber, BigNumber] {
  const capBN = ethers.utils.parseUnits(CAP.toFixed(6), 6);

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
  const oneAmountBN = dollarAmountBN.mul(ethers.constants.WeiPerEther).div(onePriceUSDBN);

  // convert the result back to a number with 18 decimal places
  // return ethers.utils.formatUnits(oneAmountBN, 18);

  // returns the BN in ethers
  return oneAmountBN;
}

// export function capToken(tokenAmount: number): void {
//   const capBN = ethers.utils.parseUnits(CAP.toFixed(6), 6);
//   console.log("capBN: ", capBN.toNumber());

//   const amountBN = ethers.utils.parseUnits(tokenAmount.toFixed(6), 6);
//   console.log("amountBN: ", amountBN.toNumber());

//   if (amountBN.gt(capBN)) {
//     console.log("Too Big");
//     const remainBN = amountBN.sub(capBN);
//     console.log("Actual Send: ", capBN.toNumber());
//     console.log("Remainder: ", remainBN.toNumber());
//   } else if (amountBN.eq(capBN)) {
//     console.log("Equal");
//   } else {
//     console.log("Good enough!")
//   }
// }

// export function capOne(oneAmount: number): void {
//   const amountBN = ethers.utils.parseUnits(oneAmount.toString(), 18);
//   console.log("oneBN: ", amountBN.toString());

//   const capBN = calculateONEAmount(CAP);
//   console.log("capBN: ", capBN.toString());

//   if (amountBN.gt(capBN)) {
//     console.log("Too Big");
//     const remainBN = amountBN.sub(capBN);
//     console.log("Actual Send: ", capBN.toString());
//     console.log("Remainder: ", remainBN.toString());
//   } else if (amountBN.eq(capBN)) {
//     console.log("Equal");
//   } else {
//     console.log("Good enough!")
//   }
// }