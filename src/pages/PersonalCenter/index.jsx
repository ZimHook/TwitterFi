import {
  CopyFilled,
  CopyOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Button, Empty, Input, InputNumber, Tooltip, message } from "antd";
import {
  AmountIcon,
  DollerIcon,
  EthIcon,
  InfoIcon,
  SyncIcon,
} from "../../components/icon";
import { useState } from "react";
import BindCode from "../../components/BindCode";

const InfoPanel = () => {
  return (
    <div
      style={{
        width: "100%",
        height: 337,
        padding: 24,
        border: "1px solid #5f5f5f",
        borderRadius: 12,
        boxSizing: "border-box",
        backgroundColor: "#0D1524",
        display: "flex",
        color: "#fff",
        justifyContent: "space-around",
      }}
    >
      <div
        style={{
          width: "60%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: 35, fontWeight: 700, marginBottom: 48 }}>
          Twettfi staking data
        </div>
        <div
          style={{
            display: "flex",
            gap: 36,
            width: "100%",
            textAlign: "center",
          }}
        >
          <div
            style={{
              background: "linear-gradient(155deg, #00B4E7, #00E8AB)",
              padding: 1,
              borderRadius: 8,
              overflow: "hidden",
              width: "100%",
            }}
          >
            <div
              style={{
                backgroundColor: "#0D1524",
                borderRadius: 8,
                position: "relative",
                padding: 16,
              }}
            >
              <div style={{ color: "#888", fontSize: 16, marginBottom: 4 }}>
                Total Staking Balance
              </div>
              <div style={{ fontSize: 48, fontWeight: 700 }}>Mock</div>
              <div
                style={{
                  fontSize: 16,
                  position: "absolute",
                  right: 24,
                  bottom: 10,
                }}
              >
                TEF
              </div>
            </div>
          </div>
          <div
            style={{
              background: "linear-gradient(-45deg, #00B4E7, #00E8AB)",
              padding: 1,
              borderRadius: 8,
              overflow: "hidden",
              width: "100%",
            }}
          >
            <div
              style={{
                backgroundColor: "#0D1524",
                borderRadius: 8,
                position: "relative",
                padding: 16,
              }}
            >
              <div style={{ color: "#888", fontSize: 16, marginBottom: 4 }}>
                My Staking Balance
              </div>
              <div style={{ fontSize: 48, fontWeight: 700 }}>Mock</div>
              <div
                style={{
                  fontSize: 16,
                  position: "absolute",
                  right: 24,
                  bottom: 10,
                }}
              >
                TEF
              </div>
            </div>
          </div>
          <div
            style={{
              background: "linear-gradient(155deg, #00B4E7, #00E8AB)",
              padding: 1,
              borderRadius: 8,
              overflow: "hidden",
              width: "100%",
            }}
          >
            <div
              style={{
                backgroundColor: "#0D1524",
                borderRadius: 8,
                position: "relative",
                padding: 16,
              }}
            >
              <div style={{ color: "#888", fontSize: 16, marginBottom: 4 }}>
                Locked amount
              </div>
              <div style={{ fontSize: 48, fontWeight: 700 }}>Mock</div>
              <div
                style={{
                  fontSize: 16,
                  position: "absolute",
                  right: 24,
                  bottom: 10,
                }}
              >
                TEF
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ width: 400, padding: "0 48px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            <SyncIcon />
            Rebase
          </div>
          <Tooltip title="The score is calculated as a percentage of the total number of individual staking in the total number of tokens, the higher the score the larger the number of tokens that can be divided daily.">
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#22343E",
                cursor: "pointer",
              }}
            >
              <QuestionCircleOutlined size={24} style={{ color: "#58D9F5" }} />
            </div>
          </Tooltip>
        </div>
        <div style={{ marginBottom: 24 }}>
          <div style={{ marginBottom: 12, fontSize: 32, fontWeight: 700 }}>
            in Mock hours
          </div>
          <div style={{ color: "#9c9c9c", fontSize: 24 }}>
            Approx. next rebase
          </div>
        </div>
        <div>
          <div style={{ marginBottom: 12, fontSize: 32, fontWeight: 700 }}>
            Mock
          </div>
          <div style={{ color: "#9c9c9c", fontSize: 24 }}>Current Score</div>
        </div>
      </div>
    </div>
  );
};

const StakePanel = () => {
  const [bindRefModalOpen, setBindRefModalOpen] = useState(false);

  const handleStake = () => {
    setBindRefModalOpen(true);
  };

  return (
    <div
      style={{
        background: "#040E20",
        display: "flex",
        padding: 24,
        borderRadius: 12,
        marginTop: 16,
        height: 433,
      }}
    >
      <div style={{ width: "50%" }}>
        <div
          style={{
            color: "#01D1C7",
            display: "flex",
            alignItems: "center",
            marginBottom: 16,
            fontSize: 15,
          }}
        >
          <DollerIcon style={{ marginRight: 6 }} />
          Staking
        </div>
        <div
          style={{
            width: "100%",
            background: "#D2D7EA33",
            paddingLeft: 24,
            display: "flex",
            alignItems: "center",
            height: 44,
            borderRadius: 22,
            fontSize: 14,
            marginBottom: 16,
          }}
        >
          <InfoIcon style={{ marginRight: 8 }} />
          The current staking release speed is&nbsp;
          <span style={{ color: "#01D1C7" }}>Mock</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 15,
            marginBottom: 12,
            padding: "0 8px",
          }}
        >
          <div>Staking time: Mock</div>
          <div>Balance: Mock</div>
        </div>
        <div
          style={{
            border: "1px solid #2F3A42",
            paddingLeft: 16,
            fontSize: 15,
            height: 50,
            display: "flex",
            alignItems: "center",
            borderRadius: 15,
            marginBottom: 20,
          }}
        >
          <img
            src="/logo.png"
            alt="logo"
            style={{
              width: 24,
              height: 24,
              objectFit: "contain",
              marginRight: 6,
            }}
          />
          TEF
        </div>
        <div
          style={{
            color: "#C9D2D9",
            fontSize: 15,
            display: "flex",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <AmountIcon />
          Amount
        </div>
        <Input
          placeholder="Amount to stake"
          style={{
            height: 50,
            padding: "12px 16px",
            border: "1px solid #2F3A42",
            borderRadius: 15,
            color: "#fff",
            background: "transparent",
          }}
          className="input-placeholder"
        />
        <Button
          style={{
            background: "linear-gradient(to right, #00EFA3, #00AEEE)",
            width: "100%",
            borderRadius: 27,
            height: 54,
            marginTop: 24,
            fontSize: 20,
            fontWeight: 700,
          }}
          type="primary"
          onClick={handleStake}
        >
          Staking Now
        </Button>
      </div>
      <div style={{ width: "50%", paddingLeft: 70 }}>
        <div
          style={{
            background: "#141D2D",
            borderRadius: 10,
            padding: "16px 30px",
            height: 220,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 36,
              fontWeight: 700,
              marginBottom: 24,
            }}
          >
            <EthIcon />
            Claim amount
          </div>
          <div style={{ fontSize: 88, textAlign: "center", fontWeight: 700 }}>
            Mock<span style={{ fontSize: 32, marginLeft: 32 }}>TEF</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: "50%" }}>Number of Claim amount</div>
          <Input
            style={{
              height: 50,
              padding: "12px 16px",
              border: "1px solid #2F3A42",
              borderRadius: 15,
              color: "#fff",
              background: "transparent",
              width: "50%",
            }}
            className="input-placeholder"
          />
        </div>
        <Button
          style={{
            background: "linear-gradient(to right, #00EFA3, #00AEEE)",
            width: "100%",
            borderRadius: 27,
            height: 54,
            marginTop: 24,
            fontSize: 20,
            fontWeight: 700,
          }}
          type="primary"
        >
          Claim
        </Button>
      </div>
      <BindCode
        open={bindRefModalOpen}
        onSuccess={(wallet) => {
          setBindRefModalOpen(false);
        }}
      />
    </div>
  );
};

const PersonalCenter = () => {
  return (
    <div style={{ padding: "24px 0", width: 1154, margin: "auto" }}>
      <InfoPanel />
      <StakePanel />
      <div
        style={{
          marginTop: 25,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: "#141D2D",
            border: "1px solid #2F3A42",
            borderRadius: 15,
            padding: "0 16px",
            height: 50,
            lineHeight: "50px",
            color: "#c9c9c9",
          }}
        >
          Referral list
        </div>
        <div style={{ fontSize: 20 }}>
          Referral code: Mock
          <CopyOutlined
            style={{ cursor: "pointer", marginLeft: 8 }}
            size={18}
            onClick={() => {
              navigator.clipboard.writeText("Mock");
              message.success("Referral code copied");
            }}
          />
        </div>
      </div>
      <div
        style={{
          height: 44,
          borderRadius: 22,
          background: "#352D44",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <InfoIcon style={{ marginRight: 8 }} />
        Invite friends to stake, and unlock 10% of the locked tokens directly
        based on the number of invited users staking
      </div>
      <div
        style={{
          marginTop: 36,
          background: "#0B1830",
          borderRadius: 8,
          fontSize: 18,
          display: "flex",
          textAlign: "center",
          height: "66px",
          alignItems: "center",
        }}
      >
        <div style={{ width: "10%" }}>No</div>
        <div style={{ width: "22.5%" }}>Player</div>
        <div style={{ width: "22.5%" }}>Twitter account</div>
        <div style={{ width: "22.5%" }}>Staking amount</div>
        <div style={{ width: "22.5%" }}>Get the claim quantity</div>
      </div>
      <div
        style={{
          width: "100%",
          height: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 48,
          fontWeight: 700,
        }}
      >
        No Data
      </div>
    </div>
  );
};

export default PersonalCenter;
