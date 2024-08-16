import { useTonConnectUI, useTonAddress, CHAIN } from "@tonconnect/ui-react";
import { Sender, SenderArguments, Address, Cell } from "@ton/ton";
import { useEffect, useState } from "react";
import { useStateStore } from ".";
import { message } from "antd";
import { getAccountSeqNo, getAccountTransactions } from "@/api";

export function useSenderNotLogin(): { sender: Sender; connected: boolean } {
  const [tonConnectUI] = useTonConnectUI();
  const connectedAddress = useTonAddress(false);

  const checkConnection = () => {
    if (
      !connectedAddress
    ) {
      message.error("Wallet Not Connect");
      tonConnectUI.disconnect().then(() => {
        tonConnectUI.openModal();
      });
      return false;
    } else {
      return true;
    }
  };

  return {
    sender: {
      send: async (args: SenderArguments) => {
        if(!checkConnection()){
          message.info("Connect Wallet First")
          throw new Error("Not Connected")
        }
        const currentSeqNo = await getAccountSeqNo(connectedAddress);
        const { boc } = await tonConnectUI.sendTransaction({
          messages: [
            {
              address: args.to.toString(),
              amount: args.value.toString(),
              payload: args.body?.toBoc().toString("base64"),
            },
          ],
          validUntil: Date.now() + 60 * 60 * 1000 * 1000, // 5 minutes for user to approve
        });
        await new Promise((res, rej) => {
          const interval = setInterval(async () => {
            const txs = await getAccountTransactions(connectedAddress);
            if (
              txs.find(
                (tx) =>
                  tx?.in_msg?.decoded_body?.seqno === currentSeqNo &&
                  tx.success === true
              )
            ) {
              clearInterval(interval);
              res(void 0);
            }
          }, 1500);
        });
      },
    },
    connected: tonConnectUI.connected,
  };
}
