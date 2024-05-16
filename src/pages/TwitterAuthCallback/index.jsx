import styles from "./index.module.scss";
import { useEffect } from "react";

const TwitterAuthCallback = () => {
  useEffect(() => {
    const [, oauth_token, oauth_verifier] =
      window.location.search.match(
        /^(?=.*oauth_token=([^&]+)|)(?=.*oauth_verifier=([^&]+)|).+$/
      ) || [];
    if (oauth_token && oauth_verifier) {
      localStorage.setItem(
        "twitter_auth_tmp_data",
        JSON.stringify({ oauth_token, oauth_verifier })
      );
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "600px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <div className={styles.loader} style={{ fontSize: 96 }}></div>
      <div style={{ fontSize: 24 }}>Connecting Twitter</div>
    </div>
  );
};

export default TwitterAuthCallback;
