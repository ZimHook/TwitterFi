import { useEffect, useState } from "react";
import { TweetFiWallet } from "../api/TweetFiWallet";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Address, OpenedContract } from "@ton/core";
import { useStateStore } from ".";

export function useTwettfiWalletContract() {
  const client = useTonClient();

  const { userinfo } = useStateStore();

  const [balance, setBalance] = useState(0);
  const [loacked, setLocked] = useState(0)
  const [stake, setStake] = useState(0)

  const walletContract = useAsyncInitialize(async () => {
    if (!client || !userinfo.staking_wallet_address) return;
    const contract = new TweetFiWallet(
      Address.parse(userinfo.staking_wallet_address) // replace with your address from tutorial 2 step 8
    );
    return client.open(contract) as OpenedContract<TweetFiWallet>;
  }, [client, userinfo.staking_wallet_address]);

  const getBalance = () => {
    walletContract
      ?.getGetWalletData?.()
      ?.then?.((res) => {
        setBalance(Number(res.balance) / 1e9);
      })
      ?.catch?.(console.log);
  };

  const getLocked = () => {
    walletContract
      ?.getLockInfo?.()
      ?.then?.((res) => {
        setLocked(Number(res.amount) / 1e9);
      })
      ?.catch?.(console.log);
  };

  const getStake = () => {
    walletContract
      ?.getStakeInfo?.()
      ?.then?.((res) => {
        setStake(Number(res.amount) / 1e9);
      })
      ?.catch?.(console.log);
  };

  useEffect(() => {
    getBalance();
    getLocked();
    getStake();
  }, [walletContract]);

  return { walletContract, getBalance, balance, loacked, getLocked, stake, getStake };
}
