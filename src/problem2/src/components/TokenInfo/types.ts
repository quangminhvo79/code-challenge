import Decimal from 'decimal.js';

export interface Token {
  currency: string;
  token_address: string;
  date: string;
  price: Decimal;
  balance: Decimal;
}

export interface TokenInfoProps {
  currency: string;
  address: string;
  price: Decimal;
  priceChange: number;
}
