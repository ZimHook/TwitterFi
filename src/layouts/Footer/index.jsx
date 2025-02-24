import { TelegramIcon } from "../../components/icon";
import styles from "./index.module.scss";
import { XOutlined } from "@ant-design/icons";

const linksConfig = [
  {
    title: "Community",
    links: [
      {
        link: "https://twitter.com/tweetfi_office",
        icon: <XOutlined />,
        label: "X",
      },
      {
        link: "https://t.me/tweetficommunity",
        icon: (
          <TelegramIcon
            style={{
              color: "#03FFFB",
              width: "18px",
              height: "18px",
              marginRight: 4,
            }}
          />
        ),
        label: "Telegram",
      },
    ],
  },
];

const LinkNav = (props) => {
  return (
    <div className={styles.links}>
      <div className={styles.title}>{props.title}</div>
      {props.links.map((link) => {
        return (
          <div
            className={styles.link_item}
            onClick={() => {
              window.open(link.link);
            }}
          >
            {link.icon}
            {link.label}
          </div>
        );
      })}
    </div>
  );
};

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <img src="/logo.svg" alt="logo" />
          TWEETFI
        </div>
        <div className={styles.copy_right}>Copy Right © 2024</div>
      </div>
      <div className={styles.right}>
        {linksConfig.map((item) => (
          <LinkNav {...item} />
        ))}
      </div>
    </div>
  );
};

export default Footer;
