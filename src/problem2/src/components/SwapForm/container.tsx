import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import WalletContext from '@/contexts/walletContext';
import View from './view';
import Decimal from 'decimal.js';
import { useTokens } from '@/hooks/use-tokens';

const Container = () => {
  const {
    sellingToken,
    setSellingToken,
    buyingToken,
    setBuyingToken,
  } = useContext(WalletContext)

  const {
    sellingTokens,
    buyingTokens,
    getToken,
    getUSDValue,
  } = useTokens(sellingToken, buyingToken);
  const [sellingAmount, setSellingAmount] = useState('');
  const [buyingAmount, setBuyingAmount] = useState('');
  const [swapping, setSwapping] = useState(false);
  const [isSellingAmountInsufficient, setIsSellingAmountInsufficient] = useState(false);

  const validateAmount = useCallback((value: string) => {
    console.log('value')
    if (!/^\d*\.?\d*$/.test(value)) return false;
    if (/^0{2,}$/.test(value)) return false;

    return true
  }, [])

  const handleSellingAmountChange = useCallback((e) => {
    let value = e.target.value;

    if (!validateAmount(value)) return;

    if (value.includes(".")) {
      const [_, decimals] = value.split(".");
      if (decimals.length > 6) value = new Decimal(value).toFixed(6);
    }

    setSellingAmount(value);

    if (value && !isNaN(value) && new Decimal(value).gt(0)) {
      const rate = sellingToken.price.div(buyingToken.price);
      setBuyingAmount(rate.mul(parseFloat(value)).toFixed(6));
    } else {
      setBuyingAmount('');
    }
  }, [
    sellingToken,
    buyingToken
  ]);

  const handleBuyingAmountChange = useCallback((e) => {
    const value = e.target.value;
    if (!validateAmount(value)) return;

    setBuyingAmount(value);

    if (value && !isNaN(value) && new Decimal(value).gt(0)) {
      const rate = buyingToken.price.div(sellingToken.price);
      setSellingAmount(rate.mul(parseFloat(value)).toFixed(6));
    } else {
      setSellingAmount('');
    }
  }, [
    sellingToken,
    buyingToken
  ]);

  const handleSellingTokenChange = useCallback((e) => {
    setSellingToken(getToken(e.target.value));
    if (sellingAmount) {
      handleSellingAmountChange({ target: { value: sellingAmount } });
    }
  }, [getToken, setSellingToken, sellingAmount]);

  const handleBuyingTokenChange = useCallback((e) => {
    setBuyingToken(getToken(e.target.value));
    if (sellingAmount) {
      handleSellingAmountChange({ target: { value: sellingAmount } });
    }
  }, [getToken, setBuyingToken, sellingAmount]);

  const handleSwapToken = useCallback(() => {
    setSwapping(true)
    setTimeout(() => {
      sellingToken.balance = sellingToken.balance.minus(new Decimal(sellingAmount));
      buyingToken.balance = buyingToken.balance.plus(new Decimal(buyingAmount));
      setSellingAmount('');
      setBuyingAmount('');
      setSellingToken(sellingToken)
      setBuyingToken(buyingToken)
      setSwapping(false)
    }, 1000)
  }, [
    sellingAmount,
    buyingAmount,
  ]);

  const handleSwitchTokens = useCallback(() => {
    setSellingToken(buyingToken);
    setBuyingToken(sellingToken);
    if (sellingAmount) {
      const rate = buyingToken.price.div(sellingToken.price);
      setBuyingAmount(rate.mul(parseFloat(sellingAmount)).toFixed(6));
    }
  }, [
    buyingToken,
    sellingToken,
    sellingAmount,
  ]);

  const disabledSwapButton = useMemo(() => {
    return (new Decimal(sellingAmount || 0).lte(0) || new Decimal(buyingAmount || 0).lte(0) || isSellingAmountInsufficient || swapping)
  }, [
    sellingAmount,
    buyingAmount,
    isSellingAmountInsufficient,
  ])

  useEffect(() => {
    if (sellingToken)
      setIsSellingAmountInsufficient(sellingToken.balance.lt(new Decimal(sellingAmount || 0)));
  }, [sellingAmount, sellingToken]);

  return <View {...{
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
  }}/>;
};

export default Container;
