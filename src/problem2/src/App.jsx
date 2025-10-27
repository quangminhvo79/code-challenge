import { Sparkles } from 'lucide-react';
import { WalletProvider } from '@/contexts/walletContext';
import WatchList from './components/WatchList';
import SwapForm from './components/SwapForm';
import TokenInfo from './components/TokenInfo';
import Loading from './components/Loading';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <WalletProvider>
        <div className="w-full min-h-screen bg-gradient-to-b from-gray-900 via-slate-900 to-teal-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-60">
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500 rounded-full filter blur-3xl"></div>
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
          </div>

          <header className="relative z-10 border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm hidden">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold">Swap</span>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <Loading />
          <WatchList />
          <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
            <div className="max-w-md mx-auto">
              <SwapForm />

              <div className="grid grid-cols-2 gap-4 mt-6">
                <TokenInfo side="sell" />
                <TokenInfo side="buy" />
              </div>
            </div>
          </main>
        </div>
      </WalletProvider>
    </QueryClientProvider>
  );
};

export default App;
