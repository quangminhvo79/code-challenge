import { Token } from '@/components/TokenInfo/types';
import { useQuery } from '@tanstack/react-query';
import Decimal from 'decimal.js';
import { useCallback, useMemo } from 'react';

export const useTokens = (sellingToken?: Token, buyingToken?: Token) => {
  const { data: tokens = [] } = useQuery<Token[]>({
    queryKey: ['tokens'],
    queryFn: async () => {
      return await fetch("/data/token_prices.json")
        .then((res) => res.json())
        .then((data) => {
          const _tokens = data.map((token) => {
            token.price = new Decimal(token.price);
            token.balance = new Decimal(token.balance);
            return token;
          });
          return _tokens
        })
        .catch((err) => {
          console.error("Error loading tokens:", err)
          return [];
        });
    },
    refetchOnWindowFocus: false,
  })

  const sellingTokens = useMemo(() => {
    if (!buyingToken) return [];

    return tokens.filter(token => token.currency != buyingToken.currency)
  }, [tokens, buyingToken])

  const buyingTokens = useMemo(() => {
    if (!sellingToken) return [];

    return tokens.filter(token => token.currency != sellingToken.currency)
  }, [tokens, sellingToken])

  const filterOutToken = useCallback((currency: string) => {
    return tokens.filter(token => token.currency != currency)
  }, [tokens])

  const getToken = useCallback((currency) => {
    return tokens.find(t => t.currency === currency);
  }, [tokens]);

  const getUSDValue = useCallback((amount, token) => {
    if (!amount || isNaN(amount)) return '$0';
    return `$ ${ token.price.plus(parseFloat(amount)).toFixed(2)}`;
  }, []);

  return {
    tokens,
    sellingTokens,
    buyingTokens,
    filterOutToken,
    getToken,
    getUSDValue,
  }
}
