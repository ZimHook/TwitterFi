import { CopyOutlined } from "@ant-design/icons";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { shortenAddress } from "../../utils/shortenAddress";
const ADDRESS = "UQBXwTDwYwh3XyBYXGA9sx4mq_mgFt3JYLDPia00Rj4IGFBg";
const Invest = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div
        style={{
          fontSize: 64,
          lineHeight: "74px",
          color: "#fff",
          fontWeight: 700,
          maxWidth: 1060,
          margin: "auto",
          textAlign: "center",
          marginTop: 64,
        }}
      >
        TWEETFI is about empowering everyone to be a great content creator and
        rewarding everyone who speaks out on WEB3
      </div>
      <div
        style={{
          marginTop: 64,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 48,
        }}
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
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/");
          }}
        >
          Enter Dapp
        </div>
      </div>
      <div
        style={{
          fontSize: 24,
          color: "#fff",
          width: 924,
          textAlign: "center",
          margin: "auto",
          marginTop: 48,
        }}
      >
        We opened the angel investment round, a total of 100,000 US dollars,
        <br /> 60% will be used to build the DEX bottom pool, 40% for market
        promotion.
      </div>
      <div
        style={{
          fontSize: 24,
          color: "#fff",
          width: 924,
          textAlign: "center",
          margin: "auto",
          marginTop: 24,
        }}
      >
        Each angel investor can receive: a total of 1% token reward,
        <br /> and automatic mining coefficient upgrade.
      </div>
      <div
        style={{
          position: "relative",
          height: "60vw",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img src="/invest/card.svg" style={{ height: "100%" }} />
        <div
          style={{
            position: "absolute",
            bottom: "16vw",
            left: "28.4vw",
            fontSize: ".8vw",
            transform: "rotate(-6deg)",
          }}
        >
          {shortenAddress(ADDRESS, 30)}
          <CopyOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigator.clipboard.writeText(ADDRESS);
              message.success("Address copied");
            }}
          />
        </div>
      </div>
      <div
        style={{ fontSize: 20, margin: "-48px auto 48px", textAlign: "center" }}
      >
        Please join the investment group after completion:[xxxxx]
      </div>
    </div>
  );
};

export default Invest;
