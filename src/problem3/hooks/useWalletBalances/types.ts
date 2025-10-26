export type BlockchainType = 'Osmosis' | 'Ethereum' | 'Arbitrum' | 'Zilliqa' | 'Neo';

export interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: BlockchainType;
}

export interface FormattedWalletBalance extends WalletBalance {
  formattedAmount: string;
  usdValue: number;
}
