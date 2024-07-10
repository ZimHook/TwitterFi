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

const MeetWithTweetFi = () => {
  const { userinfo } = useStateStore();
  const { sender } = useSender();
  const tweetfi = useTwettfiContract();

  const { balance, loacked } = useTwettfiWalletContract();

  const [claimLoading, setClaimLoading] = useState(false);

  const handleClaim = async () => {
    try {
      const proofList = await claimProof();
      const proofIndex = proofList.data?.data?.findIndex?.(
        (item) => item?.user?.address === userinfo.address
      );
      const proof = proofList.data?.data?.[proofIndex];
      if (!proof) {
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
      message.info("Please confirm in wallet, extra gas will be refund");
      await tweetfi.send(sender, { value: toNano(0.5) }, args);
      message.info("Contract called, please check status manually");
    } catch (err) {
      console.log(err);
    }
  };

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
            <div style={{ display: "flex", marginTop: 24 }}>
              <div style={{ color: "#aaa" }}>
                Claim token
                <Tooltip
                  title="Tokens that can be withdrawn directly."
                  overlayStyle={{ width: "fit-content", maxWidth: "none" }}
                >
                  <InfoCircleOutlined style={{ marginLeft: 4 }} />
                </Tooltip>
              </div>
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
              <div style={{ color: "#aaa" }}>{loacked}</div>
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
      </div>
    </div>
  );
};

export default MeetWithTweetFi;
