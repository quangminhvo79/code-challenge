import { useWalletBalances } from '../hooks/useWalletBalances';
import View from './view'

const WalletPage: React.FC<Props> = (props) => {
  const { children, ...rest } = props;
  const {
    formattedBalances,
  } = useWalletBalances();

  return (
    <div {...rest}>
      <View formattedBalances={formattedBalances} />
    </div>
  )
}

export default WalletPage;
