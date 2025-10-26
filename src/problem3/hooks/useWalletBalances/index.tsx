import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePrices } from '../usePrices';
import {
  WalletBalance,
  BlockchainType,
} from './types';

const BLOCKCHAIN_PRIORITIES: Record<BlockchainType, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
} as const;

export const useWalletBalances = () => {
  const [balances, setBalances] = useState<WalletBalance[]>([])
  const {
    getPriceByCurrency
  } = usePrices()

  const getPriority = (blockchain: BlockchainType): number => {
    return BLOCKCHAIN_PRIORITIES[blockchain] ?? -99;
  };

  const sortedBalances = useMemo(() => {
    if (!balances.length) return [];

    const balancesWithPriority = balances.map((balance: WalletBalance) => ({
      ...balance,
      priority: getPriority(balance.blockchain)
    }));

    return balancesWithPriority
      .filter((balance: WalletBalance & { priority: number }) => {
        return balance.priority > -99 && balance.amount > 0
      }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);

        return rightPriority - leftPriority;
      });
  }, [balances, getPriority]);

  const formattedBalances = useMemo(() => {
    return sortedBalances.map((balance: WalletBalance) => {
      return {
        ...balance,
        formattedAmount: balance.amount.toFixed(),
        usdValue: getPriceByCurrency(balance.currency) * balance.amount
      }
    })
  }, [sortedBalances, getPriceByCurrency])

  useEffect(() => {
    // fetch balances and set balances
  }, [])

  return {
    balances,
    formattedBalances,
    sortedBalances,
  }
}
