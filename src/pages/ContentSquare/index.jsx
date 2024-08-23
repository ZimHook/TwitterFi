import {
  InfoCircleOutlined,
  LoadingOutlined,
  SearchOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Button, Input, message, Image } from "antd";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import { searchTweet, tipTweet, queryUser } from "../../api";
import dayjs from "dayjs";
import { useDispatchStore, useStateStore } from "../../context";
import { useTweetfiWalletContract } from "@/context/useTweetfiWalletContract";
import { useSender } from "@/context/useSender";
import { Address, beginCell, toNano } from "@ton/ton";
import inputNumberCheck from "@/utils/inputNumberCheck";

const TweetContent = ({ tweet, tipValue, walletContract, balance }) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatchStore();
  const { sender } = useSender();

  const tip = async () => {
    if (!Number(tipValue)) {
      message.info("Please Enter Valid Amount First");
      return;
    }
    if (!tweet.user.address) {
      message.info("Wrong Address");
      return;
    }
    if (Number(tipValue) > balance) {
      message.info("Insufficient funds");
      return;
    }
    setLoading(true);
    try {
      await walletContract.send(
        sender,
        { value:  toNano(0.15) },
        {
          $$type: "Tip",
          query_id: 0,
          amount: Number(tipValue) * 1e9,
          destination: Address.parse(tweet.user.address),
          forward_payload: beginCell().asCell(),
          response_destination: Address.parse(tweet.user.address),
        }
      );
      message.success("Transaction Finished");
    } catch (err) {
      console.log(err);
      message.error("Failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={{ height: "fit-content", padding: "24px 0", width: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {tweet?.user?.twitter_avatar ? (
            <img
              src={tweet?.user?.twitter_avatar}
              alt=""
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "1px solid #03fff9",
              }}
            />
          ) : null}
          <div style={{ fontSize: 20, fontWeight: 700, color: "#03fff9" }}>
            {tweet?.user?.user_name}
            <span
              style={{
                fontSize: 14,
                color: "#aaa",
                fontWeight: 400,
                marginLeft: 12,
              }}
            >
              {dayjs(tweet?.created_at).format("YYYY-MM-DD HH:mm:ss")}
            </span>
          </div>
        </div>
        <Button
          type="primary"
          style={{ borderRadius: "20px", height: 40, width: 100, fontSize: 20 }}
          onClick={() => tip()}
          loading={loading}
        >
          Tip
        </Button>
      </div>
      <div style={{ marginBottom: 12 }}>{tweet?.content}</div>
      {tweet?.media_urls?.length ? (
        <div
          style={{
            marginBottom: 12,
            display: "grid",
            gridTemplateColumns: "50% 50%",
            gap: 4,
          }}
        >
          {tweet?.media_urls?.map?.((img) => {
            return (
              <Image
                src={img}
                style={{ objectFit: "cover", height: 240 }}
              ></Image>
            );
          })}
        </div>
      ) : null}
      <div
        style={{ color: "#1EA1F1", fontSize: 12, cursor: "pointer" }}
        onClick={() => {
          window.open(
            "https://x.com/" +
              tweet?.user?.user_name +
              "/status/" +
              tweet.tweet_id
          );
        }}
      >
        Show This Tweet
      </div>
    </div>
  );
};

const ContentSquare = () => {
  const [tipValue, setTipValue] = useState("");
  const [recentTwitter, setRecentTwitter] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const { balance, walletContract, getBalance, balanceLoading } =
    useTweetfiWalletContract();

  const { userinfo } = useStateStore();

  const handleTweetSearch = (search) => {
    if (searchLoading) return;
    setSearchLoading(true);
    searchTweet(search)
      .then((res) => {
        setRecentTwitter(res?.data?.data);
      })
      .catch(console.log)
      .finally(() => {
        setSearchLoading(false);
      });
  };

  useEffect(() => {
    searchTweet()
      .then((res) => {
        setRecentTwitter(res?.data?.data ?? []);
      })
      .catch(console.log);
  }, []);

  return (
    <div style={{ padding: "24px 48px" }}>
      <Input
        prefix={
          <div
            style={{
              marginRight: 12,
              paddingRight: 12,
              borderRight: "1px solid #03fff9",
            }}
          >
            {!searchLoading ? (
              <SearchOutlined
                style={{
                  fontSize: 20,
                }}
              />
            ) : (
              <LoadingOutlined size={20} />
            )}
          </div>
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
        onKeyUp={(e) => {
          if (e.code === "Enter") {
            handleTweetSearch(e.target.value);
          }
        }}
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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
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
            <div
              style={{
                fontSize: 36,
                color: "#03FFF9",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {balance.toLocaleString()}
              <span style={{ color: "#326bfb", marginLeft: 12 }}>TEF</span>
              <SyncOutlined
                style={{ cursor: "pointer", fontSize: 20 }}
                onClick={getBalance}
                spin={balanceLoading}
              />
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
              inputNumberCheck(e.target.value, setTipValue);
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
            <InfoCircleOutlined style={{ marginRight: 4 }} />
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
            padding: "48px 96px",
            overflow: "scroll",
            height: "100%",
          }}
        >
          {recentTwitter.map((tweet, index) => {
            return (
              <TweetContent
                tweet={tweet}
                tipValue={tipValue}
                key={index}
                walletContract={walletContract}
                balance={balance}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContentSquare;
