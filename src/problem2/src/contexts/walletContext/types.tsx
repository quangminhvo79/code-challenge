import { Token } from "@/components/TokenInfo/types";
import { Dispatch, SetStateAction } from 'react'

export type WalletContextType = {
  balance: number;
  sellingToken: Token,
  setSellingToken: Dispatch<SetStateAction<Token>>,
  buyingToken: Token,
  setBuyingToken: Dispatch<SetStateAction<Token>>,
};
