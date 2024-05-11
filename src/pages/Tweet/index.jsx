import { Input } from "antd";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";

const Tweet = () => {
  const [input, setInput] = useState("");
  const [canTweet, setCanTweet] = useState(true);
  const [errorMsg, setErrorMsg] = useState('')

  const handleTweet = () => {
    if(input.length === 0) {
      setCanTweet(false)
      setErrorMsg("Can't Post Empty Tweet")
      return
    }
  }

  useEffect(() => {
    setCanTweet(true)
  }, [input]);

  return (
    <div style={{ padding: "24px 128px" }}>
      <div
        style={{
          width: "100%",
          background: "#181D21",
          padding: 24,
          borderRadius: 24,
        }}
      >
        <div style={{ background: "#000", borderRadius: 18 }}>
          <Input.TextArea
            style={{ resize: "none" }}
            maxLength={280}
            className={styles.tweet}
            placeholder="What is happening?!"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={input}
          />
          <div style={{ display: "flex", alignItems: 'center' }}>
            {!canTweet && <div style={{color: '#CA3000', fontSize: 14, paddingLeft: '24px'}}>{errorMsg}</div>}
            <div
              style={{
                marginLeft: "auto",
                display: "flex",
                width: "fit-content",
                padding: 12,
                alignItems: "center",
                gap: 12,
              }}
            >
              <div>{input.length}/280</div>
              <div
                style={{
                  background: "#027FFF",
                  cursor: canTweet ? "pointer" : "not-allowed",
                  padding: "12px 24px",
                  borderRadius: "24px",
                  opacity: canTweet ? "1" : ".5",
                }}
                onClick={handleTweet}
              >
                TWEET
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
