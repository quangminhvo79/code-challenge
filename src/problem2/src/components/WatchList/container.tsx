import { useContext } from 'react';
import View from './view';
import WalletContext from '@/contexts/walletContext';
import { useTokens } from '@/hooks/use-tokens';

const Container = () => {
  const { tokens } = useTokens();

  return (
    <View tokens={tokens} />
  )
};

export default Container;
