import { useStateStore } from "../../context";
import Tweet from "../Tweet";
import Connect from "../Connect";
import { useEffect, useState } from "react";
import ContentSquare from "../ContentSquare";
import PersonalCenter from "../PersonalCenter";

export const tabs = [
  {
    key: "forTweet",
    label: "For Tweet",
    Component: Tweet,
  },
  {
    key: "contentSquare",
    label: "Content Square",
    Component: ContentSquare,
  },
  {
    key: "personalCenter",
    label: "Personal center",
    Component: PersonalCenter,
  },
];

const Home = () => {
  const { userinfo } = useStateStore();
  const { connected, address } = userinfo;

  const [activeTab, setActiveTab] = useState(tabs[0]);

  if (!connected || !address) return <Connect />;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "end", gap: "12px", marginBottom: '24px' }}>
        {tabs.map((tab) => {
          const isActive = activeTab.key === tab.key;
          return (
            <div
              key={tab.key}
              style={{
                padding: "2px 20px",
                background: isActive ? "#03FFF9" : "#326bfb",
                fontSize: isActive ? "26px" : "20px",
                lineHeight: isActive ? "32px" : "24px",
                height: "fit-content",
                color: isActive ? "#000" : "#fff",
                borderRadius: isActive? "14px" : "10px",
                cursor: 'pointer',
                minWidth: '180px',
                textAlign: 'center',
                marginLeft: tab.key === 'personalCenter' ? 'auto' : '0'
              }}
              onClick={() => {
                setActiveTab(tab);
              }}
            >
              {tab.label}
            </div>
          );
        })}
      </div>
      {<activeTab.Component setActiveTab={setActiveTab}/>}
    </div>
  );
};

export default Home;
