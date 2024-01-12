import { ethers } from "ethers";

export type TransactionResponse = ethers.providers.TransactionResponse;

export interface DBTransaction {
  address: string
  amount: string
}
