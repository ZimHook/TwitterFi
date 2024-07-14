import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { Button, Popover, message } from "antd";
import { CopyOutlined, LoadingOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatchStore, useStateStore } from "../../context";
import { shortenAddress } from "../../utils/shortenAddress";
import {
  register,
  twitterRequestToken,
  twitterAccessToken,
  queryUser,
  bindWallet,
  reigster,
} from "../../api/index.js";
import {
  TonConnectButton,
  useTonAddress,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import { openWindow } from "../../utils/window.js";
import { useState } from "react";

const navConfig = [
  {
    label: "DOCS",
    url: "/docs",
  },
  {
    label: "NFT",
  },
  {
    label: "CAMPAIGN",
  },
];

const Header = () => {
  const { userinfo } = useStateStore();
  const { connected } = userinfo;
  const dispatch = useDispatchStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tonConnectUI] = useTonConnectUI();

  const connectWallet = () => {
    tonConnectUI
      .disconnect()
      .then(console.log)
      .catch(console.log)
      .finally(() => {
        tonConnectUI.openModal();
      });
  };

  const getUserinfo = async () => {
    await queryUser()
      .then((res) => {
        if (res?.data) {
          dispatch({
            type: "setUserinfo",
            userinfo: {
              ...(res?.data ?? {}),
              ...(res?.data?.twitter ?? {}),
              ...(res?.data?.user ?? {}),
              connected: true,
            },
          });
        }
      })
      .catch(console.log)
      .finally(() => {
        setLoading(false);
      });
  };

  const linkTwitter = async () => {
    setLoading(true);
    try {
      const requestTokenResult = await twitterRequestToken({
        callbackUrl: `${window.location.origin}/twitter_auth_callback`,
      });
      if (requestTokenResult?.data?.request_token) {
        const url = `https://api.twitter.com/oauth/authorize?oauth_token=${requestTokenResult.data.request_token}`;
        const popup = openWindow({ url, name: "Auth Twitter" });
        const authResult = await new Promise((resolve) => {
          const twitterAuthKey = "twitter_auth_tmp_data";
          const interval = setInterval(function () {
            if (popup.closed) {
              clearInterval(interval);
              resolve({ errMsg: "Canceled by user" });
            }
          }, 500);
          const checkTwitterAuthed = () => {
            const authData = localStorage.getItem(twitterAuthKey);
            if (!authData) return;
            clearInterval(interval);
            localStorage.removeItem(twitterAuthKey);
            window.removeEventListener("storage", checkTwitterAuthed);
            popup?.close();
            resolve(JSON.parse(authData));
          };
          window.addEventListener("storage", checkTwitterAuthed);
        });
        if (authResult.errMsg) {
          message.error(authResult.errMsg);
        } else {
          const accessTokenResult = await twitterAccessToken({
            request_token: authResult.oauth_token,
            oauth_verifier: authResult.oauth_verifier,
          });
          const accessToken = accessTokenResult?.data?.access_token;
          if (accessToken) {
            // localStorage.setItem("twitterfi_access_token", accessToken);
            const userinfo = await reigster({ access_token: accessToken });
            localStorage.setItem("twitterfi_jwt", userinfo?.data?.token);
            await getUserinfo();
          } else {
            message.error("Access Token Failed");
          }
        }
      } else {
        message.error("Request Token Failed");
      }
    } catch (err) {
      message.error("twitter auth failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.header}>
      <div
        className={styles.logo}
        onClick={() => {
          navigate("/");
        }}
      >
        <img src="/logo.svg" alt="logo" />
        TWEETFI
      </div>
      <div className={styles.nav}>
        {navConfig.map((item) => {
          return (
            <div
              className={styles.nav_item}
              onClick={() => {
                if (!item.url) return;
                navigate(item.url);
              }}
            >
              {item.label}
              <span style={{ opacity: 0.5, marginLeft: 6 }}>
                {item.url ? "" : "(Coming Soon)"}
              </span>
            </div>
          );
        })}
      </div>
      <div className={styles.action}>
        {userinfo.screen_name ? (
          <Popover
            title={
              <>
                <div style={{ width: 240, padding: 12 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <div style={{ fontWeight: 700, color: "#000" }}>
                      Address
                    </div>
                    <div
                      style={{
                        color: "#8c8c8c",
                      }}
                    >
                      {shortenAddress(userinfo.address)}
                      <CopyOutlined onClick={() => {
                        message.success("Address copied")
                        navigator.clipboard.writeText(userinfo.address)
                      }}/>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <div style={{ fontWeight: 700, color: "#000" }}>
                      Twitter
                    </div>
                    <div
                      style={{
                        color: "#8c8c8c",
                        maxWidth: 100,
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {userinfo.screen_name}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <div style={{ fontWeight: 700, color: "#000" }}>
                    Referral code
                    </div>
                    <div
                      style={{
                        color: "#8c8c8c",
                        maxWidth: 100,
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {userinfo.ref_code}
                      <CopyOutlined onClick={() => {
                        message.success("Referral code copied")
                        navigator.clipboard.writeText(userinfo.ref_code)
                      }}/>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <div style={{ fontWeight: 700, color: "#000" }}>
                      Referral link
                    </div>
                    <div
                      style={{
                        color: "#8c8c8c",
                      }}
                    >
                      {shortenAddress(window.location.origin + '?ref=' + userinfo.ref_code)}
                      <CopyOutlined
                        onClick={() => {
                          message.success("Referral code copied");
                          navigator.clipboard.writeText(window.location.origin + '?ref=' + userinfo.ref_code);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <Button
                  style={{ width: "100%" }}
                  onClick={() => {
                    localStorage.removeItem("twitterfi_jwt");
                    dispatch({
                      type: "setUserinfo",
                      userinfo: {
                        connected: false,
                      },
                    });
                  }}
                >
                  LOG OUT
                </Button>
              </>
            }
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{textAlign: 'center', color: '#fff', fontSize: 14}}>
                <div>
                <span style={{ color: "#03FFF9" }}>Hi,&nbsp;</span>
                {userinfo.screen_name}
                </div>
                <div>
                  AccountLevel: {userinfo?.level ?? '-'}
                </div>
              </div>
              <div
                style={{
                  width: 36,
                  height: 36,
                  background: "#aaa",
                  borderRadius: "50%",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {userinfo?.profile_image_url ? (
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    src={userinfo.profile_image_url}
                  />
                ) : (
                  <UserOutlined style={{ fontSize: 24 }} />
                )}
              </div>
            </div>
          </Popover>
        ) : (
          <div
            className={styles.login_btn}
            onClick={() => {
              connected ? connectWallet() : linkTwitter();
            }}
          >
            {loading && <LoadingOutlined style={{ marginRight: 6 }} />}Login
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
