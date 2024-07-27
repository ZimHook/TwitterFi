import { DatePicker } from "antd";
import dayjs from "dayjs";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import { TwitterIcon } from "../../components/icon";
import * as echarts from "echarts";
import { queryTagsCount } from "@/api";

const HashtagOverview = () => {
  const [date, setDate] = useState([
    dayjs().startOf("day").add(-8, "day"),
    dayjs().startOf("day").add(-1, "day"),
  ]);
  const [tags, setTags] = useState([]);
  const [activeTag, setActiveTag] = useState();

  const disabledDate = (current) => {
    return current && current >= dayjs().startOf("day");
  };

  const renderChart = () => {
    const container = document.getElementById("tag_chart");
    if (activeTag?.dates?.length && container) {
      const myChart = echarts.init(container);
      const data = activeTag.dates;
      myChart.setOption({
        tooltip: {
          show: true,
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: data.map((item) => item.date || "-"),
          show: false,
        },
        yAxis: {
          type: "value",
          show: false,
        },
        series: [
          {
            data: data.map((item) => item.local_total_count || 0),
            type: "line",
            smooth: true,
          },
        ],
        color: "#03FFF8",
      });
    }
  }

  useEffect(() => {
    renderChart()
  }, [activeTag]);

  useEffect(() => {
    queryTagsCount(date[0].format("YYYY-MM-DD"), date[1].format("YYYY-MM-DD"))
      .then((res) => {
        const data = res?.data?.data?.tag_infos?.map?.(item => {
          let totalCount = 0;
          item?.dates?.forEach((item) => {
            totalCount += item.local_total_count;
          });
          return {
            ...item,
            totalCount,
          }
        }) ?? []
        setTags(data);
        setActiveTag(data[0]);
      })
      .catch(console.log);
  }, [date]);

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
        <div>
          <DatePicker.RangePicker
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
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <div style={{ fontWeight: 700 }}>Hashtag Count</div>
            <div style={{ color: "#aaa", fontSize: 14 }}>Post impressions</div>
          </div>
          <div
            style={{ overflowY: "auto", height: 240 }}
            className={styles.scroll_bar}
          >
            {tags.map((tag) => {
              const active = activeTag?.tag_id === tag.tag_id;
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
                    {tag?.tag_name}
                  </div>
                  <div style={{ color: "#fff" }}>
                    {tag?.totalCount?.toLocaleString?.()}
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
                {activeTag?.totalCount?.toLocaleString?.()}
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: 12,
              paddingTop: 16,
            }}
          >
            <div
              style={{
                height: 26,
                borderRadius: 16,
                border: "1px solid #03FFF7",
                color: "#03FFF7",
                fontSize: 12,
                padding: "3px 24px",
                lineHeight: "18px",
              }}
            >
              POST IMPRESSIONS
            </div>
            <div
              style={{
                background: "#1777FF",
                fontSize: 12,
                borderRadius: 16,
                height: 26,
                lineHeight: "18px",
                padding: "4px 12px",
              }}
            >
              {date[0].format("YYYY-MM-DD")}~{date[1].format("YYYY-MM-DD")}
            </div>
          </div>
          <div
            id="tag_chart"
            style={{ width: "100%", height: "80%", marginTop: "-10%" }}
          ></div>
          {activeTag?.tag_name ? (
            <div
              style={{
                color: "#aaa",
                fontSize: 12,
                paddingInline: 12,
                textAlign: "center",
              }}
            >
              This data is the comprehensive POST data of the entire network of{" "}
              {activeTag?.tag_name}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default HashtagOverview;
