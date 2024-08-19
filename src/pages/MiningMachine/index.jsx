import { useStateStore } from "@/context";
import MachineSelect from "./MachineSelect";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  createMachineOrder,
  getMachineConfig,
  getMachineOrderHistory,
} from "@/api";
import { message } from "antd";
import History from "./History";
import TonWeb from "tonweb";
import { Address, beginCell, toNano } from "@ton/ton";
import { createJettonTransferBody } from "@/utils/createJettonTransferBody";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useSender } from "@/context/useSender";

const MiningMachine = () => {
  const { userinfo } = useStateStore();
  const [tonConnectUI] = useTonConnectUI();
  const navigate = useNavigate();
  const { check, sender } = useSender();
  const { connected, address } = userinfo;

  const [config, setConfig] = useState({});
  const [current, setCurrent] = useState({});
  const [history, setHistory] = useState([]);

  const handleBuy = async () => {
    if (!connected || !address) {
      navigate("/");
      return;
    }
    const order_type_name = current.name;
    const targetAddress = config?.deposit_address;
    const decimal = Number(config?.order_token?.decimals);
    const price = Number(current.usdt_price);
    const contractAddress = config?.order_token?.friend_address;
    if (!order_type_name) {
      message.info("Select a machine first");
      return;
    }
    if (!targetAddress || !decimal || !contractAddress) {
      message.info("Select a machine first");
      return;
    }
    try {
      check();
      const res = await createMachineOrder(order_type_name);
      const memo = res.data?.data?.memo;
      if (!memo) {
        message.error("Order Create Failed");
        return;
      }
      const tonweb = new TonWeb();
      const jettonMinter = new TonWeb.token.jetton.JettonMinter(
        tonweb.provider,
        { address: contractAddress }
      );
      const jettonWalletContract = await jettonMinter.getJettonWalletAddress(
        new TonWeb.utils.Address(userinfo.address)
      );
      const body = createJettonTransferBody(
        memo,
        price * Math.pow(10, decimal),
        targetAddress,
        targetAddress
      );
      const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 360,
        messages: [
          {
            address: jettonWalletContract, // sender jetton wallet
            amount: toNano(0.05).toString(), // for commission fees, excess will be returned
            payload: body.toBoc().toString("base64"), // payload with jetton transfer body
          },
        ],
      };
      console.log(transaction)
      await tonConnectUI.sendTransaction(transaction);
      await getHistory();
    } catch (err) {
      console.log(err);
    }
  };

  const getHistory = async () => {
    try {
      const res = await getMachineOrderHistory();
      setHistory(res.data?.data ?? []);
    } catch (message) {
      console.log(message);
    }
  };

  useEffect(() => {
    getMachineConfig()
      .then((res) => {
        setConfig(res.data?.data ?? {});
        setCurrent(res.data?.data?.order_type?.[0]);
      })
      .catch(console.log);
    getHistory();
  }, []);

  return (
    <div
      style={{ width: 1154, margin: "auto", padding: "40px 0", color: "#fff" }}
    >
      <div
        style={{
          padding: "40px 72px",
          border: "1px solid #5F5F5F",
          borderRadius: 10,
          background: "#0D1524",
        }}
      >
        <div
          style={{
            fontSize: 35,
            fontWeight: 700,
            textAlign: "center",
            width: "100%",
          }}
        >
          Mining Machine Node Sales
        </div>
        <div
          style={{
            lineHeight: "20px",
            fontSize: 12,
            fontWeight: 700,
            marginTop: 34,
          }}
        >
          Introduction to TweetFI project
          <br />
          TweetFI is a 100% fair launch project, with the vision of making
          everyone a great content creator and rewarding everyone who speaks for
          Web3. The ultimate goal is to stimulate the group sharing economy and
          give fair feedback to every content creator. Expand to various
          industries and create a leading traffic value model. After each user
          joins TweetFI, they will be automatically rated, and each person will
          get a different account level with different scores. Tokens of varying
          values ​​are obtained according to the data of each tweet. The better
          the tweet, the more tokens you get.
          <br />
          <br />
          Introduction to TweetFI node
          <br />
          Since this is a 100% fair launch project, node services are provided
          to allow more users and users who want to join. Like POS, which can
          improve the mining power of buyers, and users who mine in the early
          stage can get more reward in a faster time. In the later stage, we
          will sell hashtag positions as brand advertising positions. Brands
          need to purchase TEF and burn it before they can cooperate with
          TwitterFI. This means that a large number of project parties will pay
          for the user tokens of the early nodes.
          <br />
          <br />
          Team leader's plan:
          <br />
          Our goal is that each community and project can actively participate
          in purchasing nodes. We will provide 10% rebate to disseminators, and
          one free node will be given for every 20 nodes sold.
        </div>
        <div style={{ marginTop: 34, fontSize: 24, fontWeight: 700 }}>
          Node mechanism:Select the level you want to purchase
        </div>
        <MachineSelect
          config={config?.order_type ?? []}
          onChange={setCurrent}
          current={current}
        />
        <div style={{ marginTop: 34, fontSize: 24, fontWeight: 700 }}>
          You need to pay: {current?.usdt_price ?? "-"} amount
        </div>
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 48,
            width: "fit-content",
            marginInline: "auto",
            cursor: "pointer",
            marginTop: "64px",
          }}
          onClick={handleBuy}
        >
          <svg
            width="156"
            height="48"
            viewBox="0 0 156 48"
            style={{ position: "absolute" }}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.5"
              y="0.5"
              width="155"
              height="47"
              rx="23.5"
              fill="url(#paint0_linear_245_5)"
            />
            <rect
              x="0.5"
              y="0.5"
              width="155"
              height="47"
              rx="23.5"
              stroke="url(#paint1_linear_245_5)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_245_5"
                x1="78"
                y1="0"
                x2="78"
                y2="48"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#3E90F0" />
                <stop offset="1" stop-color="#1B6ECF" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_245_5"
                x1="3.79523e-07"
                y1="5.71429"
                x2="143.338"
                y2="97.6077"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="white" stop-opacity="0.4" />
                <stop offset="1" stop-color="white" stop-opacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
          <div
            style={{
              color: "#fff",
              fontWeight: 700,
              fontSize: 18,
              position: "relative",
            }}
          >
            {connected && address ? "PAY NOW" : "LOGIN"}
          </div>
        </div>
      </div>
      <History history={history} />
    </div>
  );
};

export default MiningMachine;
