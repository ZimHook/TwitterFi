import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { Button, Popover } from "antd";
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
                      maxWidth: 100,
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {userinfo.address}
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
              </div>
            }
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {userinfo.screen_name}
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
