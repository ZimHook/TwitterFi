import { useEffect, useState } from "react";
import { TweetFi } from "@/api/TweetFi";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Address, OpenedContract } from "@ton/core";
import { useSender } from "./useSender";

export function useTwettfiContract() {
  const client = useTonClient();
  const { sender } = useSender();

  const tweetfiContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new TweetFi(
      Address.parse("kQC0koqOyJIjG9IMmG3QjNbseucO9OoW9Zxg6sLzWuRn3WPo")
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

  return tweetfiContract;
}
