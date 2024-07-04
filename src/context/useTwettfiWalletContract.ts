import { useEffect, useState } from "react";
import { TweetFiWallet } from "../api/TweetFiWallet";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Address, OpenedContract } from "@ton/core";

export function useTwettfiWalletContract({address}: {address: string}) {
  const client = useTonClient();
  const [val, setVal] = useState<null | number>();

  const walletContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new TweetFiWallet(
      Address.parse(address) // replace with your address from tutorial 2 step 8
    );
    return client.open(contract) as OpenedContract<TweetFiWallet>;
  }, [client]);

  return {
    address: walletContract?.address.toString(),
  };
}
