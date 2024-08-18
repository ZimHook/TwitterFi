import { useStateStore } from "@/context";
import MachineSelect from "./MachineSelect";
import { useNavigate } from "react-router-dom";

const MiningMachine = () => {
  const { userinfo } = useStateStore();
  const navigate = useNavigate()
  const { connected, address } = userinfo;

  const handleBuy = () => {
    if(!connected || !address) {
      navigate('/')
    }
  }

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
        <MachineSelect />
        <div style={{ marginTop: 34, fontSize: 24, fontWeight: 700 }}>
          You need to pay: mock amount
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
            {connected && address ? 'PAY NOW' : 'LOGIN'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiningMachine;
