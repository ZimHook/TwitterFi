import { useStateStore } from "@/context";
import { shortenAddress } from "@/utils/shortenAddress";
import { useEffect, useState } from "react";

const History = ({ history }: { history: any[] }) => {
  const { userinfo } = useStateStore();

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          marginBlock: 30,
          fontSize: 15,
          color: "#c9d2d9",
          background: "#141D2D",
          lineHeight: "50px",
          paddingInline: 16,
          borderRadius: 15,
          border: "1px solid #2F3A42",
          width: "fit-content",
        }}
      >
        Purchase History
      </div>
      <div
        style={{
          borderRadius: 8,
          background: "#040E20",
          width: "100%",
          padding: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            borderRadius: 8,
            background: "#0B1830",
            height: 66,
            color: "#fff",
            fontWeight: 700,
            alignItems: "center",
            textAlign: "center",
            marginBottom: 12,
          }}
        >
          <div style={{ width: 1, flexGrow: 1 }}>Buyer Address</div>
          <div style={{ width: 1, flexGrow: 1 }}>Buy Node</div>
          <div style={{ width: 1, flexGrow: 1 }}>Status</div>
        </div>
        {history.map((item) => {
          return (
            <div
              style={{
                display: "flex",
                borderRadius: 8,
                background: "#0D1524",
                height: 66,
                color: "#ababab",
                alignItems: "center",
                textAlign: "center",
                marginBottom: 12,
              }}
              key={item.memo}
            >
              <div style={{ width: 1, flexGrow: 1 }}>
                {shortenAddress(userinfo.address, 20)}
              </div>
              <div style={{ width: 1, flexGrow: 1 }}>{item.mint_code}</div>
              <div style={{ width: 1, flexGrow: 1 }}>{item.status}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default History;
