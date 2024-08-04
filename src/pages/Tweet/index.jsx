import { Button, Image, Input, Popover, Upload, message } from "antd";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import { getAiTweet, getPostTags, postTwitter } from "../../api";
import HashtagOverview from "./HashtagOverview";
import {
  CloseCircleFilled,
  CloseCircleOutlined,
  FileGifOutlined,
  FileImageOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import MeetWithTweetFi from "./MeetWithTweetFi";
import { useStateStore } from "../../context";
import InvestBanner from "../Invest/InvestBanner";

const Tweet = ({ setActiveTab }) => {
  const [input, setInput] = useState("");
  const [canTweet, setCanTweet] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState();
  const [aiLoading, setAiLoading] = useState(false);
  const [tweetLoading, setTweetLoading] = useState(false);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [images, setImages] = useState([]);
  const { userinfo } = useStateStore();

  const checkFileSize = () => {
    const MaxSize = 219136;
    let current = 0;
    images.forEach((file) => {
      current += file.size;
    });
    return current > MaxSize;
  };

  const handleTweet = async () => {
    if (input.length === 0) {
      setCanTweet(false);
      setErrorMsg("Can't Post Empty Tweet");
      return;
    }
    if (!selectedTags) {
      setCanTweet(false);
      setErrorMsg("Can't Post Without Hashtag");
      return;
    }
    if (checkFileSize()) {
      setCanTweet(false);
      setErrorMsg("Images Size Too Large");
      return;
    }
    setTweetLoading(true);
    try {
      const res = await postTwitter(
        input  + "\nhttps://tweetfi.io?ref=" + userinfo.ref_code,
        selectedTags.content,
        selectedTags.id,
        images
      );
      if (res?.message?.includes("succ")) {
        await getTweetTags();
        message.success("Tweet Posted");
        setInput("");
      } else {
        message.error(res?.message);
      }
    } catch (e) {
      console.log(e);
      message.error("Failed");
    } finally {
      setTweetLoading(false);
    }
  };

  const getTweetTags = async () => {
    const tags = await getPostTags();
    setTags(tags?.data ?? []);
  };

  const aiGenerateTweet = async () => {
    if (!selectedTags) {
      message.info("Select a hashtag first");
      return;
    }
    setAiLoading(true);
    try {
      const aiTweet = await getAiTweet(selectedTags.content);
    } catch (e) {
      message.error("Something Went Wrong");
      console.log(e);
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    setCanTweet(true);
  }, [input, images, selectedTags]);

  useEffect(() => {
    getTweetTags();
  }, []);

  return (
    <div
      style={{ padding: "24px 128px" }}
      onClick={() => {
        setEmojiOpen(false);
      }}
    >
      <div style={{ marginBottom: 24 }}>
        <span style={{ color: "#00FFF9", fontSize: 24 }}>Reward Hashtag</span>
        <span style={{ color: "#fff", marginLeft: 8, fontSize: 16 }}>
          🔥Post a tweet and add today's hot tag to get an airdrop reward🔥
        </span>
      </div>
      <InvestBanner />
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBlock: 24 }}
      >
        {tags.map((tag, index) => {
          const active = selectedTags?.id === tag.id;
          const disabled = tag?.user_day_count >= tag?.user_day_limit;
          return (
            <div
              style={{
                width: 160,
                height: 80,
                background: active ? "#03FFF9" : "#000",
                color: active ? "#000" : "#03fff9",
                border: "1px solid #03FFF9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 24,
                cursor: disabled ? "not-allowed" : "pointer",
              }}
              key={index}
              onClick={() => {
                if (disabled) {
                  return;
                }
                setSelectedTags(tag);
              }}
            >
              {tag?.content}&nbsp;{tag?.user_day_count}/{tag?.user_day_limit}
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
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#888', marginBottom: 16}}>
        The weekly tweet data will be counted, allowing the value of your tweets to be quickly reflected!
        <Button
          type="primary"
          style={{
            display: "block",
            cursor: "not-allowed",
          }}
          loading={aiLoading}
          // onClick={aiGenerateTweet}
        >
          AI Generate Tweet
        </Button>
        </div>
        <div
          style={{
            background: "#000",
            borderRadius: 18,
            display: "flex",
            paddingTop: 8,
          }}
        >
          {userinfo?.profile_image_url ? (
            <div
              style={{
                width: "64px",
                flexShrink: 0,
                paddingLeft: 16,
                paddingTop: 8,
              }}
            >
              <img
                src={userinfo.profile_image_url}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  objectFit: "cover",
                }}
              />
            </div>
          ) : null}
          <div style={{ width: "100%", flexShrink: 1 }}>
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
            <div style={{ display: "flex", gap: 12, paddingInline: 12 }}>
              {images.map((file) => {
                const url = URL.createObjectURL(file);
                return (
                  <div style={{ position: "relative" }}>
                    <Image
                      src={url}
                      height={100}
                      width={100}
                      style={{ objectFit: "cover", borderRadius: 8 }}
                    />
                    <CloseCircleFilled
                      style={{
                        position: "absolute",
                        top: -6,
                        right: -6,
                        cursor: "pointer",
                        color: "#ff4d4f",
                      }}
                      size={24}
                      onClick={() => {
                        setImages((i) =>
                          i.filter((item) => file.uid !== item.uid)
                        );
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <div
              style={{
                justifyContent: "space-between",
                display: "flex",
                width: "100%",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  paddingInline: 12,
                  alignItems: "center",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <Upload
                  accept="image/png,image/jpg"
                  beforeUpload={(file) => {
                    setImages((i) => [...i, file]);
                    return false;
                  }}
                  showUploadList={false}
                >
                  <svg
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    style={{
                      color: "#1777FF",
                      cursor: "pointer",
                      marginTop: "6px",
                    }}
                  >
                    <path
                      d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </Upload>
                <Upload
                  accept="image/gif"
                  beforeUpload={(file) => {
                    setImages((i) => [...i, file]);
                    return false;
                  }}
                  showUploadList={false}
                >
                  <svg
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    style={{
                      color: "#1777FF",
                      cursor: "pointer",
                      marginTop: "6px",
                    }}
                  >
                    <path
                      d="M3 5.5C3 4.119 4.12 3 5.5 3h13C19.88 3 21 4.119 21 5.5v13c0 1.381-1.12 2.5-2.5 2.5h-13C4.12 21 3 19.881 3 18.5v-13zM5.5 5c-.28 0-.5.224-.5.5v13c0 .276.22.5.5.5h13c.28 0 .5-.224.5-.5v-13c0-.276-.22-.5-.5-.5h-13zM18 10.711V9.25h-3.74v5.5h1.44v-1.719h1.7V11.57h-1.7v-.859H18zM11.79 9.25h1.44v5.5h-1.44v-5.5zm-3.07 1.375c.34 0 .77.172 1.02.43l1.03-.86c-.51-.601-1.28-.945-2.05-.945C7.19 9.25 6 10.453 6 12s1.19 2.75 2.72 2.75c.85 0 1.54-.344 2.05-.945v-2.149H8.38v1.032H9.4v.515c-.17.086-.42.172-.68.172-.76 0-1.36-.602-1.36-1.375 0-.688.6-1.375 1.36-1.375z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </Upload>
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  style={{
                    color: "#1777FF70",
                    cursor: "not-allowed",
                    fill: "currentcolor",
                  }}
                >
                  <path d="M6 5c-1.1 0-2 .895-2 2s.9 2 2 2 2-.895 2-2-.9-2-2-2zM2 7c0-2.209 1.79-4 4-4s4 1.791 4 4-1.79 4-4 4-4-1.791-4-4zm20 1H12V6h10v2zM6 15c-1.1 0-2 .895-2 2s.9 2 2 2 2-.895 2-2-.9-2-2-2zm-4 2c0-2.209 1.79-4 4-4s4 1.791 4 4-1.79 4-4 4-4-1.791-4-4zm20 1H12v-2h10v2zM7 7c0 .552-.45 1-1 1s-1-.448-1-1 .45-1 1-1 1 .448 1 1z"></path>
                </svg>
                <Popover
                  content={
                    <EmojiPicker
                      theme="dark"
                      emojiStyle={EmojiStyle.TWITTER}
                      onEmojiClick={(emoji) => {
                        setInput((i) => i + emoji.emoji);
                        setEmojiOpen(false);
                      }}
                    />
                  }
                  arrow={false}
                  overlayInnerStyle={{ background: "transparent" }}
                  open={emojiOpen}
                >
                  <div
                    style={{ color: "#1777FF", cursor: "pointer" }}
                    onClick={() => setEmojiOpen(true)}
                  >
                    <SmileOutlined />
                  </div>
                </Popover>
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  style={{
                    color: "#1777FF70",
                    cursor: "not-allowed",
                    fill: "currentcolor",
                  }}
                >
                  <path d="M6 3V2h2v1h6V2h2v1h1.5C18.88 3 20 4.119 20 5.5v2h-2v-2c0-.276-.22-.5-.5-.5H16v1h-2V5H8v1H6V5H4.5c-.28 0-.5.224-.5.5v12c0 .276.22.5.5.5h3v2h-3C3.12 20 2 18.881 2 17.5v-12C2 4.119 3.12 3 4.5 3H6zm9.5 8c-2.49 0-4.5 2.015-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.01-4.5-4.5-4.5zM9 15.5C9 11.91 11.91 9 15.5 9s6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5S9 19.09 9 15.5zm5.5-2.5h2v2.086l1.71 1.707-1.42 1.414-2.29-2.293V13z"></path>
                </svg>
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  style={{
                    color: "#1777FF70",
                    cursor: "not-allowed",
                    fill: "currentcolor",
                  }}
                >
                  <path d="M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5S13.93 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 9 12 9s1.5.673 1.5 1.5S12.827 12 12 12zm0-10c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37c.324-.216 7.945-5.365 7.945-11.332C20.5 5.813 16.687 2 12 2zm0 17.77c-1.665-1.241-6.5-5.196-6.5-9.27C5.5 6.916 8.416 4 12 4s6.5 2.916 6.5 6.5c0 4.073-4.835 8.028-6.5 9.27z"></path>
                </svg>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                  padding: 12,
                  width: "fit-content",
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
            <div style={{ display: "flex", alignItems: "center" }}>
              {!canTweet && (
                <div
                  style={{
                    color: "#CA3000",
                    fontSize: 14,
                    padding: "12px",
                    paddingTop: 0,
                  }}
                >
                  {errorMsg}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <HashtagOverview tags={tags} />
      <MeetWithTweetFi setActiveTab={setActiveTab} />
    </div>
  );
};

export default Tweet;
