import { useCallback } from "react";

export interface Prices {
  [key: string]: number
}

export const usePrices = () => {
  const prices: Prices = {};

  const getPriceByCurrency = useCallback((currency: string) => {
    return prices[currency] || 0;
  }, [prices])

  return {
    prices,
    getPriceByCurrency
  }
}
