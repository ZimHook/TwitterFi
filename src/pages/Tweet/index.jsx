import { Button, Input, message } from "antd";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import { getAiTweet, getPostTags, postTwitter } from "../../api";

const Tweet = () => {
  const [input, setInput] = useState("");
  const [canTweet, setCanTweet] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState();
  const [aiLoading, setAiLoading] = useState(false);
  const [tweetLoading, setTweetLoading] = useState(false);

  const handleTweet = async() => {
    if (input.length === 0) {
      setCanTweet(false);
      setErrorMsg("Can't Post Empty Tweet");
      return;
    }
    if (selectedTags.length === 0) {
      setCanTweet(false);
      setErrorMsg("Can't Post Without Hashtag");
      return;
    }
    setTweetLoading(true)
    try{
      const res = await postTwitter(input, selectedTags.content, selectedTags.id);
      if(res?.message === 'tweet succ'){
        message.success('Tweet Posted')
      } else {
        message.error(res?.message)
      }
    } catch(e){
      console.log(e)
      message.error('Failed')
    }finally{
      setTweetLoading(false)
    }
  };

  const getTweetTags = async () => {
    return await getPostTags();
  };

  const aiGenerateTweet = async () => {
    if(!selectedTags) {
      message.info('Select a hashtag first')
      return
    }
    setAiLoading(true);
    try {
      const aiTweet = await getAiTweet(selectedTags.content)
      console.log('aaa', aiTweet)
    } catch (e) {
      message.error("Something Went Wrong");
      console.log(e);
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    setCanTweet(true);
  }, [input]);

  useEffect(() => {
    (async () => {
      const tags = await getTweetTags();
      setTags(tags?.data ?? []);
    })();
  }, []);

  return (
    <div style={{ padding: "24px 128px" }}>
      <div style={{ marginBottom: 24 }}>
        <span style={{ color: "#00FFF9", fontSize: 24 }}>Reward Hashtag</span>
        <span style={{ color: "#fff", marginLeft: 8, fontSize: 16 }}>
          🔥Post a tweet and add today's hot tag to get an airdrop reward🔥
        </span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
        {tags.map((tag, index) => {
          const active = selectedTags?.id === tag.id;
          return (
            <div
              style={{
                width: 120,
                height: 80,
                background: active ? "#03FFF9" : "#000",
                color: active ? "#000" : "#03fff9",
                border: "1px solid #03FFF9",
                display: 'flex',
                alignItems: 'center',
                 justifyContent: 'center',
                 borderRadius: 24,
                 cursor: 'pointer'
              }}
               key={index}
              onClick={() => {
                setSelectedTags(tag);
              }}
            >
              {tag?.content}
            </div>
          );
        })}
      </div>
      <div
        style={{
          width: "100%",
          background: "#181D21",
          padding: 24,
          borderRadius: 24,
        }}
      >
        <Button
          type="primary"
          style={{ marginLeft: "auto", display: "block", marginBottom: 16 }}
          loading={aiLoading}
          onClick={aiGenerateTweet}
        >
          AI Generate Tweet
        </Button>
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
          <div style={{ display: "flex", alignItems: "center" }}>
            {!canTweet && (
              <div
                style={{ color: "#CA3000", fontSize: 14, paddingLeft: "24px" }}
              >
                {errorMsg}
              </div>
            )}
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
              <Button
              type="primary"
                style={{
                  height: 40,
                  cursor: canTweet ? "pointer" : "not-allowed",
                  borderRadius: "24px",
                  opacity: canTweet ? "1" : ".5",
                }}
                onClick={handleTweet}
                loading={tweetLoading}
              >
                TWEET
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
