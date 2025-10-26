import {
  FormattedWalletBalance
} from '../hooks/useWalletBalances/types'
import WalletRow from '../WalletRow/WalletRow'

type ViewProps = {
  formattedBalances: FormattedWalletBalance[]
}

const View = ({
  formattedBalances
}: ViewProps) => {
  return (
    <div>
      {formattedBalances && formattedBalances.map((balance: FormattedWalletBalance) => {
        return (
          <WalletRow
            key={balance.currency}
            balance={balance}
          />
        )
      })}
    </div>
  )
}

export default View;
