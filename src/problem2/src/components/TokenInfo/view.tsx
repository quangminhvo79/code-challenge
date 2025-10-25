import { ExternalLink } from 'lucide-react';
import { TokenInfoProps } from './types';

function generateSmoothRandomPath(points = 5, step = 50, maxY = 50): string {
  let path = `M 0 ${Math.floor(Math.random() * maxY)}`;
  let x = 0;

  for (let i = 1; i <= points; i++) {
    x += step;
    const y = Math.floor(Math.random() * maxY);
    path += ` L ${x} ${y}`;
  }

  return path;
}

const View = ({
  currency,
  address,
  price,
  priceChange,
}: TokenInfoProps) => {
  return (
    <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition">
      <div className="flex items-center gap-2 mb-3 overflow-hidden">
        <img src={`/images/${currency}.svg`} alt="" />
        <div>
          <div className="font-semibold">{currency}</div>
          <div className="text-xs text-gray-500 w-[150px] overflow-hidden text-ellipsis">{address}</div>
        </div>
      </div>
      <div className="mb-3">
        <div className="text-2xl font-bold">${price.toString()}</div>
        <div className="text-green-400 text-sm">{priceChange}%</div>
      </div>
      <svg className="w-full h-12" viewBox="0 0 200 40">
        <path
          d={generateSmoothRandomPath(20, 10, 20)}
          fill="none"
          stroke="#ec4899"
          strokeWidth="2"
        />
      </svg>
      <button className="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm mt-3">
        <span>Open Page</span>
        <ExternalLink className="w-3 h-3" />
      </button>
    </div>
  );
};

export default View;
