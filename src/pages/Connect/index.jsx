import styles from "./index.module.scss";
import { Button, message } from "antd";
import { UserAddOutlined, WalletOutlined } from "@ant-design/icons";
import { useDispatchStore, useStateStore } from "../../context";
import { useEffect, useRef, useState } from "react";
import {
  register,
  twitterRequestToken,
  twitterAccessToken,
  queryUser,
  bindWallet,
  reigster,
} from "../../api/index.js";
import { openWindow } from "../../utils/window.js";
import {
  TonConnectButton,
  useTonAddress,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import { generateStates } from "../../utils/binaryString.js";

const Step = (props) => {
  return (
    <div className={styles.stepper_item}>
      <props.icon style={{ color: props.finished ? "#03fffb" : "#326bfb" }} />
      <div className={styles.dot}>
        <div className={styles.line} />
        <div className={styles.circle}>
          {props.finished && <div className={styles.fill} />}
        </div>
        <div className={styles.line} />
      </div>
      <div className={styles.desc}>{props.text}</div>
    </div>
  );
};

const Connect = () => {
  const { userinfo } = useStateStore();
  const dispatch = useDispatchStore();
  const { connected, address } = userinfo;
  const [tonConnectUI] = useTonConnectUI();
  const tonaddress = useTonAddress(true);

  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    if (tonaddress) {
      setLoading(true);
      bindWallet({ address: tonaddress })
        .then(() => {
          getUserinfo();
          tonConnectUI.disconnect();
        })
        .catch(console.log)
        .finally(() => {
          setLoading(false);
        });
    }
  }, [tonaddress]);

  useEffect(() => {
    setLoading(true);
    const jwt = localStorage.getItem("twitterfi_jwt");
    console.log("aaa", jwt);
    if (jwt) {
      getUserinfo();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className={styles.connect}>
      <div className={styles.banner}>
        <img src="/logo.svg" alt="logo" className={styles.banner_logo} />
        <div className={styles.banner_text}>
          <div className={styles.banner_text_title}>
            Tweet on Twitter
            <br />
            and earn money
          </div>
          <div className={styles.banner_text_subtitle}>
            For tweet
            <br />
            Take profits on Twitter
          </div>
          <div className={styles.banner_text_desc}>
            Direct income from posting tweets, and you will get reward bonuses
            by interacting with fans.
          </div>
        </div>
      </div>
      <div className={styles.get_start}>
        <div className={styles.stepper}>
          <Step
            finished={connected}
            icon={UserAddOutlined}
            text="Login with Twitter"
          />
          <Step
            finished={address}
            icon={WalletOutlined}
            text="Connect wallet"
          />
        </div>
        <Button
          type="primary"
          className={styles.btn}
          onClick={() => {
            connected ? connectWallet() : linkTwitter();
          }}
          loading={loading}
        >
          {connected ? "Connect wallet" : "Login with Twitter"}
        </Button>
        {/* <TonConnectButton /> */}
      </div>
    </div>
  );
};

export default Connect;
