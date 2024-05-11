import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useStateStore } from "../../context";

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
  const navigate = useNavigate();

  console.log("aaa", userinfo);

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
          <div style={{ display: "flex", alignItems: 'center', gap: 12 }}>
            {userinfo.screen_name}
            <div
              style={{
                width: 36,
                height: 36,
                background: "#aaa",
                borderRadius: "50%",
                overflow: "hidden",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <UserOutlined style={{ fontSize: 24 }} />
            </div>
          </div>
        ) : (
          <div
            className={styles.login_btn}
            onClick={() => {
              navigate("/");
            }}
          >
            Login
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
