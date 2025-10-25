import Decimal from 'decimal.js';
import { Token } from '../TokenInfo/types';

export interface SwapFormViewTypes {
  sellingToken: Token;
  buyingToken: Token;
  sellingAmount: string;
  buyingAmount: string;
  handleSellingAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBuyingAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSellingTokenChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleBuyingTokenChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSwitchTokens: () => void;
  handleSwapToken: () => void;
  getUSDValue: (amount: string, token: Token) => string;
  sellingTokens: Token[];
  buyingTokens: Token[];
  isSellingAmountInsufficient: boolean;
  disabledSwapButton: boolean;
  swapping;
}
