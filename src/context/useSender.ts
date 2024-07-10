import { useTonConnectUI, useTonAddress, CHAIN } from "@tonconnect/ui-react";
import { Sender, SenderArguments, Address } from "@ton/ton";
import { useEffect } from "react";
import { useStateStore } from ".";
import { message } from "antd";

export function useSender(): { sender: Sender; connected: boolean } {
  const [tonConnectUI] = useTonConnectUI();
  const connectedAddress = useTonAddress(false);
  const { userinfo } = useStateStore();
  useEffect(() => {
    if (!userinfo?.address) return;
    if (
      connectedAddress &&
      Address.parse(userinfo?.address).toRawString() !== connectedAddress
    ) {
      message.error("Address Not Binded");
      tonConnectUI.disconnect().then(() => {
        tonConnectUI.openModal();
      });
      return;
    }
    if (!connectedAddress) {
      tonConnectUI.openModal();
    }
  }, [connectedAddress, userinfo, tonConnectUI]);
  return {
    sender: {
      send: async (args: SenderArguments) => {
        tonConnectUI.sendTransaction({
          messages: [
            {
              address: args.to.toString(),
              amount: args.value.toString(),
              payload: args.body?.toBoc().toString("base64"),
            },
          ],
          network: CHAIN.TESTNET,
          validUntil: Date.now() + 60 * 60 * 1000 * 1000, // 5 minutes for user to approve
        });
      },
    },
    connected: tonConnectUI.connected,
  };
}
