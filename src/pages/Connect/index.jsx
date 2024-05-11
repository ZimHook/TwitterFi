import styles from "./index.module.scss";
import { Button, Steps } from "antd";
import { UserAddOutlined, WalletOutlined } from "@ant-design/icons";
import { useDispatchStore, useStateStore } from "../../context";
import { openWindow, observeWindow } from "../../utils/window.ts";
import {
  obtainOauthRequestToken,
  obtainOauthAccessToken,
} from "../../utils/oauth1.ts";
import { useEffect, useRef } from "react";
import { register } from "../../api/index.js";

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
  const { connected, twitterLinked, walletConnected, user_id } = userinfo;

  const popup = useRef();

  const linkTwitter = async () => {
    const consumerKey = "GLmjMYadi4YF9FHBrwGjIUf01";
    const consumerSecret = "yKXNMdAktxz2eVjyC8gguPDvBC4j5MDEXawTcMgxNRhQXdpzPs";
    popup.current = openWindow({
      url: ``,
      name: "Log in with Twitter",
    });

    const obtainRequestTokenConfig = {
      apiUrl: "https://api.twitter.com/oauth/request_token",
      callbackUrl: window.location.href,
      consumerKey,
      consumerSecret,
      method: "POST",
    };
    const requestTokenData = await obtainOauthRequestToken(
      obtainRequestTokenConfig
    );
    if (
      requestTokenData.oauth_callback_confirmed === "true" &&
      popup.current !== null
    ) {
      popup.current.location.href = `https://api.twitter.com/oauth/authorize?oauth_token=${requestTokenData.oauth_token}`;
    } else {
      this.handleError(
        `Callback URL "${window.location.href}" is not confirmed. Please check that is whitelisted within the Twitter app settings.`
      );
    }
  };

  const connectWallet = async () => {
    await window.bitkeep.ton.send("ton_requestAccounts")
    const requestWallet = await window.bitkeep.ton.send("ton_requestWallets")
    await window.bitkeep.ton.send("ton_requestAccounts")
    const check_message = 'Sign this message to login to Twitterfi'
    const signature = await window.bitkeep.ton.send("ton_personalSign", [
      {
        data: check_message,
      },
    ]);
    register({twitter: user_id, address: requestWallet[0].address, check_message, signature })
  };

  useEffect(() => {
    if (window.opener) {
      const [, oauthToken, oauthVerifier] =
        window.location.search.match(
          /^(?=.*oauth_token=([^&]+)|)(?=.*oauth_verifier=([^&]+)|).+$/
        ) || [];
      window.opener.postMessage(
        {
          type: "authorized",
          data: {
            oauthToken,
            oauthVerifier,
          },
        },
        window.origin
      );
    } else {
      const consumerKey = "GLmjMYadi4YF9FHBrwGjIUf01";
      const consumerSecret =
        "yKXNMdAktxz2eVjyC8gguPDvBC4j5MDEXawTcMgxNRhQXdpzPs";
      window.onmessage = async ({ data: { type, data } }) => {
        if (type === "authorized") {
          const accessTokenData = await obtainOauthAccessToken({
            apiUrl: "https://api.twitter.com/oauth/access_token",
            consumerKey,
            consumerSecret,
            oauthToken: data.oauthToken,
            oauthVerifier: data.oauthVerifier,
            method: "POST",
          });
          dispatch({
            type: "setUserinfo",
            userinfo: {
              ...accessTokenData,
              twitterLinked: true,
            },
          });
          popup.current.close();
        }
      };
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
            finished={twitterLinked}
            icon={UserAddOutlined}
            text="Login with Twitter"
          />
          <Step
            finished={walletConnected}
            icon={WalletOutlined}
            text="Connect wallet"
          />
        </div>
        <Button
          type="primary"
          className={styles.btn}
          onClick={() => {
            twitterLinked ? connectWallet() : linkTwitter();
          }}
        >
          {twitterLinked ? "Connect wallet" : "Login with Twitter"}
        </Button>
      </div>
    </div>
  );
};

export default Connect;
