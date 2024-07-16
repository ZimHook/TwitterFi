import { Button, Input, Modal, message } from "antd";
import { useState } from "react";
import { useDispatchStore, useStateStore } from "../context";
import { bindRefCode, queryUser } from "../api";

const BindCode = ({ open, onSuccess }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatchStore();

  const paste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
    } catch (err) {
      message.error("Cannot read clipboard");
    }
  };

  const handleBind = async () => {
    if (!input.length) {
      message.error("Invalid Input");
      return;
    }
    setLoading(true);
    try {
      const res = await bindRefCode(input);
      const profile = await queryUser()
      if (profile?.data) {
        dispatch({
          type: "setUserinfo",
          userinfo: {
            ...(res?.data ?? {}),
            ...(profile?.data?.twitter ?? {}),
            ...(profile?.data?.user ?? {}),
            connected: true,
          },
        });
        onSuccess(profile?.data?.parent_address)
      }
    } catch (err) {
      message.error("Something went wrong");
    }
  };

  return (
    <Modal open={open} closable={false} footer={null} width={328}>
      <div
        style={{ color: "#000", textAlign: "center", fontFamily: "TT_Firs" }}
      >
        <div style={{ fontSize: 30 }}>Referral code</div>
        <div style={{ position: "relative", marginTop: 22 }}>
          <Input
            style={{
              border: "1px solid #ECEEFA",
              height: 40,
              width: 279,
              margin: "auto",
              borderRadius: 20,
              padding: "0 60px 0 12px",
              fontFamily: "TT_Firs",
            }}
            placeholder="Enter Code"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 12,
              top: 0,
              lineHeight: "42px",
              textDecoration: "underline",
              cursor: "pointer",
              color: "#0078ff88",
              fontSize: 14,
            }}
            onClick={paste}
          >
            Paste
          </div>
        </div>
        <Button
          style={{
            borderRadius: 8,
            width: 240,
            height: 56,
            margin: "auto",
            marginTop: 34,
            background: "#5046E6",
            fontSize: 18,
            color: "#fff",
            cursor: "pointer",
          }}
          loading={loading}
          onClick={handleBind}
        >
          Confirm
        </Button>
        <Button
          style={{
            borderRadius: 8,
            width: 240,
            height: 56,
            margin: "auto",
            marginTop: 12,
            marginBottom: 24,
            background: "#A6A2F4",
            fontSize: 18,
            color: "#fff",
            cursor: "pointer",
          }}
          onClick={() => onSuccess("")}
        >
          I don't have the code
        </Button>
      </div>
    </Modal>
  );
};

export default BindCode;
