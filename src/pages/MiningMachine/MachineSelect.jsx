import { useState } from "react";
import styles from "./index.module.scss";

const MachineSelect = ({ config, onChange, current, decimal }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: 40,
      }}
    >
      {config.map((item, index) => {
        const active = item.name === current.name;
        return (
          <div
            className={styles.machine_item}
            style={{
              width: 188,
              height: 136,
              borderRadius: 12,
              padding: 21,
              background: active ? "#326bfb" : void 0,
            }}
            key={index}
            onClick={() => {
              onChange(item);
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontWeight: 600,
                gap: 16,
                marginBottom: 15,
              }}
            >
              <img
                src="/machine.svg"
                style={{ width: 32, height: 32 }}
                alt=""
              />
              {item.name}
            </div>
            <div className={styles.desc}>Unit price:: {item.usdt_price / Math.pow(10, decimal)}U</div>
            <div className={styles.desc}>Quantity: {item.count}</div>
            <div className={styles.desc}>
              Computing power:mining computing power increased by {item.boost}{" "}
              times
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MachineSelect;
