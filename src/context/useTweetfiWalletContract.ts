import { useEffect, useState } from "react";
import { TweetFiWallet } from "../api/TweetFiWallet";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Address, OpenedContract } from "@ton/core";
import { useStateStore } from ".";

const keep2Decimals = (numLike: number | string) => {
  const num = Number(Number(numLike).toFixed(2));
  return num;
};

export function useTweetfiWalletContract() {
  const client = useTonClient();

  const { userinfo } = useStateStore();

  const [balance, setBalance] = useState(0);
  const [locked, setLocked] = useState(0);
  const [stake, setStake] = useState(0);
  const [release, setRelease] = useState(0);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [lockedLoading, setLockedLoading] = useState(false);
  const [stakeLoading, setStakeLoading] = useState(false);
  const [releaseLoading, setReleaseLoading] = useState(false);

  const walletContract = useAsyncInitialize(async () => {
    const address = userinfo.staking_wallet_address;
    if (!client || !address) return;
    const contract = new TweetFiWallet(
      Address.parse(address) // replace with your address from tutorial 2 step 8
    );
    return client.open(contract) as OpenedContract<TweetFiWallet>;
  }, [client, userinfo.staking_wallet_address]);

  const getBalance = () => {
    setBalanceLoading(true);
    return walletContract
      ?.getGetWalletData?.()
      ?.then?.((res) => {
        setBalance(keep2Decimals(Number(res.balance) / 1e9));
      })
      ?.catch?.(console.log)
      ?.finally(() => {
        setBalanceLoading(false);
      });
  };

  const getLocked = () => {
    setLockedLoading(true);
    return walletContract
      ?.getLockAmountMinusAutoUnlock?.()
      ?.then?.((res) => {
        setLocked(keep2Decimals(Number(res) / 1e9));
      })
      ?.catch?.(console.log)
      ?.finally(() => {
        setLockedLoading(false);
      });
  };

  const getStake = () => {
    setStakeLoading(true);
    return walletContract
      ?.getStakeAmountMinusAutoUnstake?.()
      ?.then?.((res) => {
        setStake(keep2Decimals(Number(res) / 1e9));
      })
      ?.catch?.(console.log)
      ?.finally(() => {
        setStakeLoading(false);
      });
  };

  const getRelease = () => {
    setReleaseLoading(true);
    return walletContract
      ?.getClaimAmountNow?.()
      ?.then?.((res) => {
        setRelease(keep2Decimals(Number(res) / 1e9));
      })
      ?.catch?.(console.log)
      ?.finally(() => {
        setReleaseLoading(false);
      });
  };

  useEffect(() => {
    getBalance();
    getLocked();
    getStake();
    getRelease();
  }, [walletContract]);

  return {
    walletContract,
    getBalance,
    balance,
    locked,
    getLocked,
    stake,
    getStake,
    balanceLoading,
    stakeLoading,
    lockedLoading,
    getRelease,
    releaseLoading,
    release,
  };
}
