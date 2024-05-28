import { InfoCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import { getRecentTwitter, tipTweet } from "../../api";

const TweetContent = ({tweet, tipValue}) => {

  const tip = () => {
    tipTweet(tipValue, tweet?.user?.twitter)
  }

  return <div style={{height: 300, width:  '100%'}}>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <div>{tweet?.user?.user_name}</div>
      <Button type="primary" style={{borderRadius: '20px', height: 40, width: 100, fontSize: 20}} onClick={tip}>Tip</Button>
    </div>
    <div>{tweet?.twitter_text}</div>
  </div>
}

const ContentSquare = () => {
  const [tipValue, setTipValue] = useState("");
  const [recentTwitter, setRecentTwitter] = useState([])

  useEffect(() => {
    getRecentTwitter().then(res => {
      setRecentTwitter(res?.data?.data?.data ?? [])
    })
  }, [])

  return (
    <div style={{ padding: "24px 48px" }}>
      <Input
        prefix={
          <SearchOutlined
            style={{
              fontSize: 20,
              paddingRight: 12,
              marginRight: 12,
              borderRight: "1px solid #03FFF9",
            }}
          />
        }
        style={{
          borderRadius: 40,
          height: 40,
          border: "1px solid #03FFF9",
          color: "#03FFF9",
          background: "#000",
        }}
        placeholder="search twitter"
        className={styles.input}
      />
      <div
        style={{
          display: "flex",
          width: "100%",
          height: 600,
          gap: 24,
          marginTop: 24,
        }}
      >
        <div
          style={{
            width: "calc(30% - 12px)",
            background: "#171C1E",
            borderRadius: 48,
            padding: 24,
            flexGrow: 0,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              height: 100,
              width: "100%",
              border: "2px solid #03FFF9",
              padding: "12px",
              borderRadius: 40,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 18, marginBottom: 8 }}>
              Total Amount For Tip
            </div>
            <div style={{ fontSize: 36, color: "#03FFF9", fontWeight: 700 }}>
              3000<span style={{ color: "#326bfb", marginLeft: 24 }}>TEF</span>
            </div>
          </div>
          <Input
            className={styles.input}
            style={{
              border: "1px solid #03FFF9",
              color: "#03FFF9",
              height: 60,
              fontSize: 30,
              background: "#03FFF922",
              borderRadius: 30,
              marginTop: 24,
              textAlign: "center",
              marginBottom: "16px",
            }}
            value={tipValue}
            onChange={(e) => {
              setTipValue(e.target.value);
            }}
            placeholder="Enter Tip Quantity (upper limit 1000)"
          />
          <div
            style={{
              display: "flex",
              height: 30,
              fontSize: 14,
              color: "#03fff9",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div
              style={{
                background: "#003A39",
                borderRadius: 15,
                height: 30,
                lineHeight: "30px",
                padding: "0 10px",
                cursor: "pointer",
              }}
              onClick={() => {
                setTipValue("250");
              }}
            >
              250<span style={{ color: "#326bfb", marginLeft: 6 }}>TEF</span>
            </div>
            <div
              style={{
                background: "#003A39",
                borderRadius: 15,
                height: 30,
                lineHeight: "30px",
                padding: "0 10px",
                cursor: "pointer",
              }}
              onClick={() => {
                setTipValue("500");
              }}
            >
              500<span style={{ color: "#326bfb", marginLeft: 6 }}>TEF</span>
            </div>
            <div
              style={{
                background: "#003A39",
                borderRadius: 15,
                height: 30,
                lineHeight: "30px",
                padding: "0 10px",
                cursor: "pointer",
              }}
              onClick={() => {
                setTipValue("750");
              }}
            >
              750<span style={{ color: "#326bfb", marginLeft: 6 }}>TEF</span>
            </div>
            <div
              style={{
                background: "#003A39",
                borderRadius: 15,
                height: 30,
                lineHeight: "30px",
                padding: "0 10px",
                cursor: "pointer",
              }}
              onClick={() => {
                setTipValue("1000");
              }}
            >
              1000<span style={{ color: "#326bfb", marginLeft: 6 }}>TEF</span>
            </div>
          </div>
          <div style={{ color: "#03fff9", marginTop: 24, fontSize: 14 }}>
            <InfoCircleOutlined style={{marginRight: 4}}/>
            Note:{" "}
            <span style={{ color: "#fff" }}>
              10% of the tip amount will be burned
            </span>
          </div>
        </div>
        <div
          style={{
            width: "calc(70% - 12px)",
            background: "#171C1E",
            borderRadius: 48,
            flexGrow: 0,
            flexShrink: 0,
            padding: '48px 96px'
          }}
        >
          {recentTwitter.map((tweet, index) => {
            return <TweetContent tweet={tweet} key={index}/>
          })}
        </div>
      </div>
    </div>
  );
};

export default ContentSquare;
