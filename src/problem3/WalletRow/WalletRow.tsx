import { WalletRowProps } from './types'

const WalletRow = ({
  balance
}: WalletRowProps) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <div>{balance.blockchain} - {balance.currency}: {balance.formattedAmount}</div>
      <div>USD value: {balance.usdValue}</div>
    </div>
  )
}

export default WalletRow;
