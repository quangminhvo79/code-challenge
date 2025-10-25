import { Wallet } from "lucide-react";
import Decimal from "decimal.js";
import { createContext, ReactElement, use, useEffect, useMemo, useState } from "react";

import { WalletContextType } from "./types";
import { Token } from "@/components/TokenInfo/types";
import { useTokens } from "@/hooks/use-tokens";

const initContextState: WalletContextType = {
  balance: 0,
  sellingToken: null,
  setSellingToken: () => {},
  buyingToken: null,
  setBuyingToken: () => {},
};

const WalletContext = createContext<WalletContextType>(initContextState);

export const WalletProvider = ({ children }: { children: ReactElement | ReactElement[] }): ReactElement => {
  const { tokens } = useTokens();
  const [sellingToken, setSellingToken] = useState<Token>();
  const [buyingToken, setBuyingToken] = useState<Token>();

  useEffect(() => {
    setSellingToken(tokens[0]);
    setBuyingToken(tokens[1]);
  }, [tokens]);

  const contextValue = useMemo(() => {
    return {
      balance: 100.0,
      sellingToken,
      setSellingToken,
      buyingToken,
      setBuyingToken,
    };
  }, [
    sellingToken,
    setSellingToken,
    buyingToken,
    setBuyingToken,
  ]);

  return <WalletContext.Provider value={contextValue}>{children}</WalletContext.Provider>
}

WalletContext.displayName = "WalletContext";
export default WalletContext;
