import { ArrowUpDown, ChevronDown, Sparkles } from 'lucide-react';
import { SwapFormViewTypes } from './types';
import { memo } from 'react';

const View = ({
  sellingToken,
  buyingToken,
  sellingAmount,
  buyingAmount,
  handleSellingAmountChange,
  handleBuyingAmountChange,
  handleSellingTokenChange,
  handleBuyingTokenChange,
  handleSwitchTokens,
  handleSwapToken,
  getUSDValue,
  sellingTokens,
  buyingTokens,
  isSellingAmountInsufficient,
  disabledSwapButton,
  swapping,
}: SwapFormViewTypes) => {

  return (
    <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1.5 rounded-lg">
          <Sparkles className="w-4 h-4 text-lime-400" />
          <span className="text-sm font-medium">Coding challenge</span>
        </div>
      </div>

      <div className="mb-2">
        <div className="flex flex-row justify-between items-center mb-1">
          <label className="text-gray-400 text-sm mb-2 block">Selling</label>
          <div className="flex justify-between items-center text-sm">
            {sellingToken && (
              <span
                className="text-lime-400 font-semibold mr-1"
                data-testid="balance"
              >Balance: ${sellingToken.balance.toString()}</span>
            )}
          </div>
        </div>

        <div className="bg-gray-800/80 rounded-xl p-4 border border-gray-700 hover:border-lime-400 hover:shadow-lg hover:shadow-lime-400/20 transition-all">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 bg-gray-700/50 px-3 py-2 rounded-lg">
              {sellingToken && (
                <img src={`/images/${sellingToken?.currency}.svg`} alt="" data-testid="sellingTokenImg" />
              )}
              <div className="relative">
                <select
                  value={sellingToken?.currency}
                  onChange={handleSellingTokenChange}
                  className="flex items-center gap-2 pr-6 rounded-lg transition font-semibold text-white border-none outline-none appearance-none cursor-pointer"
                  data-testid="sellingTokenDropdown"
                >
                  {sellingTokens && sellingTokens.map((token) => (
                    <option key={token.currency} value={token.currency}>
                      {token.currency}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <div className="text-right flex-1">
              <input
                type="text"
                value={sellingAmount}
                onChange={handleSellingAmountChange}
                placeholder="0.00"
                data-testid="sellingTokenInput"
                className="w-full text-right text-3xl font-light bg-transparent border-none outline-none text-white placeholder-gray-600"
              />
              <div className="text-sm text-gray-500" data-testid="sellingUSD">{getUSDValue(sellingAmount, sellingToken)}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center relative z-10">
        <button
          onClick={handleSwitchTokens}
          data-testid="switchTokens"
          className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition border border-gray-700 hover:border-lime-400 hover:shadow-lg hover:shadow-lime-400/20"
        >
          <ArrowUpDown className="w-5 h-5" />
        </button>
      </div>

      <div className="mb-6">
        <label className="text-gray-400 text-sm -my-5 mb-2 block">Buying</label>
        <div className="bg-gray-800/80 rounded-xl p-4 border border-gray-700 hover:border-lime-400 hover:shadow-lg hover:shadow-lime-400/20 transition-all">
          <div className="flex items-center justify-between mb-2 ">
            <div className="flex items-center gap-2 bg-gray-700/50 px-3 py-2 rounded-lg">
              {buyingToken && (
                 <img src={`/images/${buyingToken?.currency}.svg`} alt="" data-testid="buyingTokenImg"/>
              )}
              <div className="relative">
                <select
                  value={buyingToken?.currency}
                  onChange={handleBuyingTokenChange}
                  className="flex items-center gap-2 pr-6 rounded-lg transition font-semibold text-white border-none outline-none appearance-none cursor-pointer"
                  data-testid="buyingTokenDropdown"
                >
                  {buyingTokens && buyingTokens.map((token) => (
                    <option key={token.currency} value={token.currency}>
                      {token.currency}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <div className="text-right flex-1">
              <input
                type="text"
                value={buyingAmount}
                onChange={handleBuyingAmountChange}
                placeholder="0.00"
                data-testid="buyingTokenInput"
                className="w-full text-right text-3xl font-light bg-transparent border-none outline-none text-white placeholder-gray-600"
              />
              <div className="text-sm text-gray-500">{getUSDValue(buyingAmount, buyingToken)}</div>
            </div>
          </div>
        </div>
      </div>

      {isSellingAmountInsufficient && (
        <div className="bg-red-800/50 rounded-lg p-3 mb-4 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-red-400">Insufficient balance for selling amount</span>
          </div>
        </div>
      )}

      {sellingToken && buyingToken && (
        <div className="bg-gray-800/50 rounded-lg p-3 mb-4 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Rate</span>
            <span className="text-white">
              1 {sellingToken.currency} ≈ {(buyingToken.price.div(sellingToken.price)).toFixed(6)} {buyingToken.currency}
            </span>
          </div>
        </div>
      )}

      <button
        className={`w-full bg-gradient-to-r flex justify-center items-center from-lime-400 to-lime-500 text-gray-900 py-4 rounded-xl font-bold text-lg hover:from-lime-500 hover:to-lime-600 transition shadow-lg shadow-lime-500/20 ${disabledSwapButton ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handleSwapToken}
        disabled={disabledSwapButton}
      >
        {swapping ? (
          <svg className="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : "Swap"}
      </button>
    </div>
  );
};

export default memo(View);
