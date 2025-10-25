import { useContext, useMemo } from 'react';
import View from './view';
import Decimal from 'decimal.js';
import WalletContext from '@/contexts/walletContext';

const Container = ({
  side,
}: { side: string }) => {
   const {
    sellingToken,
    buyingToken,
  } = useContext(WalletContext)

  const token = useMemo(() => {
    if (side === 'sell') {
      return sellingToken;
    } else {
      return buyingToken;
    }
  }, [side, sellingToken, buyingToken]);

  return <View {...{
    currency: token?.currency,
    address: token?.token_address || '',
    price: token ? token.price : new Decimal(0),
    priceChange: 0,
  }} />;
};

export default Container;
