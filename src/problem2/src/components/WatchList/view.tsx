import { TrendingUp } from "lucide-react";
import { Token } from "../TokenInfo/types";
import Decimal from "decimal.js";

const View = ({ tokens }: { tokens: Token[] | null}) => {
  return (
    <div className="relative z-10 bg-gray-900/30 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-gray-400">Watchlist</span>
          <TrendingUp className="w-4 h-4 text-gray-400" />
        </div>
        <div className="overflow-hidden">
          <div className="animate-scroll flex items-center gap-6">
            {tokens && tokens.map((token) => (
              <div key={token.currency} className="flex items-center gap-1">
                <span className="text-white font-semibold">{token.currency}</span>
                <span className="text-white">${ Decimal.add(token.price, new Decimal(Math.random() * 100)).toFixed(4).toString()}</span>
                <span className="text-green-400">{new Decimal(Math.random() * 10).toFixed(2)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
