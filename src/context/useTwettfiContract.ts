import { useEffect, useState } from "react";
import { TweetFi } from "../api/TweetFi.ts";
import { useTonClient } from "./useTonClient.ts";
import { useAsyncInitialize } from "./useAsyncInitialize.ts";
import { Address, OpenedContract } from "@ton/core";
import { useSender } from "./useSender.ts";

export function useTwettfiContract() {
  const client = useTonClient();
  const { sender } = useSender();

  const tweetfiContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new TweetFi(
      Address.parse("0QCe6-RwMOHP1DR8ZWaOfCvtGhYW8nqij-t65iqQCSK9cA6k") // replace with your address from tutorial 2 step 8
    );
    return client.open(contract) as OpenedContract<TweetFi>;
  }, [client]);

  // tweetfiContract?.send(
  //   sender,
  //   { value: 1n },
  //   {
  //     $$type: "InternalTweetMint",
  //     txid: 1231n,
  //     origin: Address.parse("0QCe6-RwMOHP1DR8ZWaOfCvtGhYW8nqij-t65iqQCSK9cA6k"),
  //     to: Address.parse("0QCe6-RwMOHP1DR8ZWaOfCvtGhYW8nqij-t65iqQCSK9cA6k"),
  //     amount: 1000n,
  //   }
  // );

  // useEffect(() => {
  //   async function getValue() {
  //     if (!tweetfiContract) return;
  //     setVal(null);
  //     // const val = await counterContract.getCounter();
  //     setVal(Number(val));
  //   }
  //   getValue();
  // }, [tweetfiContract]);

  return {
    getCanMintAmount: tweetfiContract?.getBalance
    // address: tweetfiContract?.address.toString(),
  };
}
