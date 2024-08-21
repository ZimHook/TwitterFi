import { useEffect, useState } from "react";
import { TweetFi } from "@/api/TweetFi";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Address, OpenedContract } from "@ton/core";
import { useSender } from "./useSender";

export function useTweetfiContract() {
  const client = useTonClient();
  const { sender } = useSender();

  const tweetfiContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new TweetFi(
      Address.parse("EQB3zR7tgrNjVKa9JubBoFbe77GeUVzYfFsJIpprll9xbvbE")
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
