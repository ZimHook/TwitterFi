import { InfoCircleOutlined, RightOutlined } from "@ant-design/icons";
import { useStateStore } from "../../context";
import { Button, Tooltip, message } from "antd";
import { useTwettfiContract } from "../../context/useTwettfiContract";
import { useEffect, useState } from "react";
import { useSender } from "@/context/useSender";
import { claimProof } from "@/api";
import { Address, toNano } from "@ton/core";
import { createProofCells } from "@/utils/createCell";
import { TweetMint } from "@/api/TweetFi";
import { useTwettfiWalletContract } from "@/context/useTwettfiWalletContract";

const percentageToPos = (ipercentage: number, r: number) => {
  let percentage = ipercentage;
  if (ipercentage === 0) {
    percentage = 0.1;
  }
  if (ipercentage === 100) {
    percentage = 99.9;
  }
  const angle = (percentage / 100) * 2 * Math.PI;
  const x = Math.sin(angle) * r + r;
  const y = Math.cos(angle + Math.PI) * r + r;
  return { x, y };
};

const MeetWithTweetFi = () => {
  const { userinfo } = useStateStore();
  const { sender } = useSender();
  const tweetfi = useTwettfiContract();

  const { balance, locked } = useTwettfiWalletContract();

  const [claimLoading, setClaimLoading] = useState(false);
  const [canClaimAmount, setCanClaimAmount] = useState(0);
  const percentage = Number(userinfo?.score_info?.user_proportion);

  const handleClaim = async () => {
    try {
      setClaimLoading(true);
      const proofList = await claimProof();
      const proofIndex = proofList.data?.data?.findIndex?.(
        (item) => item?.user?.address === userinfo.address
      );
      const proof = proofList.data?.data?.[proofIndex];
      if (!proof) {
        message.error("Proof Not Found");
        throw new Error("no proof found");
      }
      const cellData = JSON.parse(proof.proof);
      const args = {
        $$type: "TweetMint",
        index: BigInt(proof.claim_index),
        to: Address.parse(userinfo.address),
        amount: BigInt(parseInt(proof.amount)),
        proof: createProofCells(cellData),
        proof_length: BigInt(cellData.length),
        to_str: userinfo.address,
      } as TweetMint;
      await tweetfi.send(sender, { value: toNano(0.5) }, args);
      await getCanClaimAmount();
    } catch (err) {
      message.error("Failed")
      console.log(err);
    } finally {
      setClaimLoading(false);
    }
  };

  const getCanClaimAmount = async () => {
    setClaimLoading(true);
    try {
      const res = await claimProof();
      const proof = res.data?.data?.find?.(
        (item) => item?.user?.address === userinfo.address
      );
      setCanClaimAmount(parseInt(proof?.amount ?? 0));
    } finally {
      setClaimLoading(false);
    }
  };

  useEffect(() => {
    getCanClaimAmount();
  }, []);

  return (
    <div style={{ marginTop: 24 }}>
      <div
        style={{
          fontSize: 52,
          color: "#fff",
          fontWeight: 700,
          width: "100%",
          textAlign: "center",
          marginTop: 48,
        }}
      >
        Meet With TweetFI
      </div>
      <div style={{ display: "flex", gap: 16, height: 320, marginTop: 24 }}>
        <div
          style={{
            width: "35%",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              background: "#171C1E",
              borderRadius: 24,
              height: "fit-content",
              padding: 24,
              paddingBlock: 48,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <div style={{ color: "#00FEFB", fontSize: 16, fontWeight: 700 }}>
                Your Current Balance
              </div>
              <div
                style={{
                  color: "#0476FF",
                  fontSize: 12,
                  cursor: "not-allowed",
                }}
              >
                Details{" ( Coming Soon ) "}
                <RightOutlined />
              </div>
            </div>
            <div
              style={{
                fontSize: 24,
                color: "#fff",
                fontWeight: 700,
                marginTop: 24,
              }}
            >
              {balance}
              <span style={{ marginLeft: 12 }}>TEF</span>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 24,
                justifyContent: "space-between",
              }}
            >
              <div style={{ color: "#aaa" }}>
                Claim token
                <Tooltip
                  title="Tokens that can be withdrawn directly."
                  overlayStyle={{ width: "fit-content", maxWidth: "none" }}
                >
                  <InfoCircleOutlined style={{ marginLeft: 4 }} />
                </Tooltip>
              </div>
              <div style={{ color: "#aaa" }}>{canClaimAmount / 1e9}</div>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 12,
                justifyContent: "space-between",
              }}
            >
              <div style={{ color: "#aaa" }}>
                Locked token
                <Tooltip title="The locked token will be marketed 1% every day. The release rate can be increased by inviting friends.">
                  <InfoCircleOutlined style={{ marginLeft: 4 }} />
                </Tooltip>
              </div>
              <div style={{ color: "#aaa" }}>{locked}</div>
            </div>
          </div>
          <Button
            type="primary"
            style={{
              width: "100%",
              flexGrow: 1,
              fontSize: 28,
              fontWeight: 700,
              borderRadius: 16,
            }}
            onClick={handleClaim}
            loading={claimLoading}
          >
            Claim Token
          </Button>
        </div>
        <div
          style={{
            background: "#171C1E",
            borderRadius: 24,
            height: "100%",
            padding: 24,
            width: "20%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ color: "#00FEFA", fontSize: 24, fontWeight: 700 }}>
            Account
          </div>
          <img
            src={userinfo.profile_image_url}
            alt="avatar"
            style={{
              width: 64,
              height: 64,
              border: "1px solid #00FEFA",
              borderRadius: "50%",
              marginTop: 24,
            }}
          />
          <div
            style={{
              color: "#00FEFA",
              fontSize: 18,
              fontWeight: 700,
              marginTop: 32,
            }}
          >
            @{userinfo.user_name}
          </div>
          <div
            style={{
              background: "#000",
              width: "100%",
              height: 64,
              borderRadius: 16,
              marginTop: 24,
              textAlign: "center",
              padding: 12,
            }}
          >
            <div style={{ color: "#fff" }}>{userinfo.screen_name}</div>
            <div style={{ color: "#aaa", fontSize: 12, marginTop: 4 }}>
              {userinfo.twitter_bio}
            </div>
          </div>
        </div>
        <div
          style={{
            background: "#171C1E",
            borderRadius: 24,
            height: "100%",
            padding: 24,
            width: "25%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ color: "#00FEFA", fontSize: 18, fontWeight: 700 }}>
            Comprehensive Proportion
          </div>
          <div
            style={{
              marginTop: 24,
              width: 100,
              height: 100,
              position: "relative",
            }}
          >
            <svg
              viewBox="0 0 32 32"
              width={100}
              height={100}
              style={
                percentage < 50
                  ? {
                      position: "absolute",
                      top: 0,
                      left: 0,
                      transform: "scale(.9)",
                    }
                  : { position: "absolute" }
              }
            >
              <path
                d={`M16 16V0A16 16 0 ${percentage > 50 ? "1" : "0"} 1 ${
                  percentageToPos(percentage, 16).x
                } ${percentageToPos(percentage, 16).y}Z`}
                fill="#03FFF7"
              />
            </svg>
            <svg
              viewBox="0 0 32 32"
              width={100}
              height={100}
              style={
                percentage > 50
                  ? {
                      position: "absolute",
                      top: 0,
                      left: 0,
                      transform: "scale(.9)",
                    }
                  : { position: "absolute" }
              }
            >
              <path
                d={`M16 16L${percentageToPos(percentage, 16).x} ${
                  percentageToPos(percentage, 16).y
                }A16 16 0 ${100 - percentage >= 50 ? "1" : "0"} 1 16 0Z`}
                fill="#0076FE"
              />
            </svg>
          </div>
          <div style={{ marginTop: 12 }}>{percentage}%</div>
          <div
            style={{
              background: "#000",
              width: "100%",
              height: "fit-content",
              borderRadius: 16,
              marginTop: 24,
              textAlign: "left",
              padding: 12,
            }}
          >
            <div style={{ color: "#fff", fontSize: 12 }}>
              The proportion of the weight of tweets posted on the day in the
              entire network.
            </div>
          </div>
        </div>
        <div
          style={{
            background: "#171C1E",
            borderRadius: 24,
            height: "100%",
            padding: 24,
            width: "15%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ color: "#00FEFA", fontSize: 18, fontWeight: 700 }}>
            Tip Amount
          </div>
          <div style={{ color: "#0076FE", fontSize: 20, marginTop: 48 }}>
            <span style={{ color: "#03FFF6" }}>{balance}</span> TEF
          </div>
          <div
            style={{
              background: "#000",
              width: "100%",
              height: "fit-content",
              borderRadius: 16,
              marginTop: 24,
              textAlign: "center",
              padding: 12,
            }}
          >
            <div style={{ color: "#fff", fontSize: 12 }}>
              Tips for all tweets at the day
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetWithTweetFi;
