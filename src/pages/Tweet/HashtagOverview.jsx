import { DatePicker } from "antd";
import dayjs from "dayjs";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import { TwitterIcon } from "../../components/icon";
import * as echarts from "echarts";

const HashtagOverview = ({ tags = [] }) => {
  const [date, setDate] = useState();
  const [activeTag, setActiveTag] = useState();

  const disabledDate = (current) => {
    return current && current >= dayjs().startOf("day");
  };
  useEffect(() => {
    setDate(dayjs().startOf("day").add(-1));
  }, []);

  useEffect(() => {
    if (!activeTag && tags[0]) {
      setActiveTag(tags[0]);
    }
  }, [tags, activeTag]);

  useEffect(() => {
    const container = document.getElementById("tag_chart");
    if (activeTag?.twitter_tag_counts_daily?.length && container) {
      const myChart = echarts.init(container);
      myChart.setOption({
        tooltip: {
          show: true,
          trigger: 'axis',
        },
        xAxis: {
          type: "category",
          data: activeTag.twitter_tag_counts_daily.map(item => item.date || '-'),
          show: false
        },
        yAxis: {
          type: "value",
          show: false,
        },
        series: [
          {
            data: activeTag.twitter_tag_counts_daily.map(item => item.total_count || 0),
            type: "line",
            smooth: true,
          },
        ],
        color: '#03FFF8',
      });
    }
  }, [activeTag]);

  return (
    <div style={{ marginTop: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 24,
        }}
      >
        <div style={{ fontSize: 48, color: "#03FFF9" }}>Hashtag Overview</div>
        <div style={{ pointerEvents: "none" }}>
          <DatePicker
            disabledDate={disabledDate}
            style={{
              background: "#000",
              borderColor: "#03FFF9",
              color: "#03FFF9",
            }}
            className={styles.range_picker}
            allowClear={false}
            value={date}
            onChange={setDate}
          />
        </div>
      </div>

      <div style={{ display: "flex", gap: 16, height: 320 }}>
        <div
          style={{
            height: "100%",
            background: "#171C1E",
            width: "35%",
            borderRadius: 24,
            padding: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              color: "#03FFF9",
              fontSize: 16,
              marginBottom: 16,
            }}
          >
            Hashtag Count
          </div>
          <div
            style={{ overflowY: "auto", height: 240 }}
            className={styles.scroll_bar}
          >
            {tags.map((tag) => {
              const active = activeTag?.id === tag.id;
              return (
                <div
                  key={tag.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px 16px",
                    borderRadius: 16,
                    background: active ? "#023155" : "transparent",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setActiveTag(tag);
                  }}
                >
                  <div style={{ color: active ? "#0275FF" : "#888" }}>
                    {tag?.content}
                  </div>
                  <div style={{ color: "#fff" }}>
                    {tag?.tweet_count?.toLocaleString?.()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div
          style={{
            height: "100%",
            background: "#171C1E",
            width: "30%",
            borderRadius: 24,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 24,
          }}
        >
          <img
            src="/logo.svg"
            style={{ width: 120, height: 120, marginBottom: 16 }}
          />
          <div style={{ color: "#03FFF9", fontSize: 32, marginBottom: 16 }}>
            {activeTag?.content}
          </div>
          <div
            style={{
              background: "#000",
              display: "flex",
              height: 80,
              width: "100%",
              borderRadius: 24,
              alignItems: "center",
              padding: "0 24px",
              gap: 32,
            }}
          >
            <TwitterIcon style={{ width: 60, height: 60, color: "#03FFF9" }} />
            <div>
              <div style={{ color: "#03fff9", fontSize: 16, marginBottom: 8 }}>
                Total Tweets
              </div>
              <div>
                {activeTag?.tweet_count?.toLocaleString?.()}
                <span></span>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            height: "100%",
            background: "#171C1E",
            width: "35%",
            borderRadius: 24,
          }}
        >
          <div id="tag_chart" style={{ width: "100%", height: "100%" }}></div>
        </div>
      </div>
    </div>
  );
};

export default HashtagOverview;
