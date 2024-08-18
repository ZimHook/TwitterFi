import { useState } from "react";
import styles from "./index.module.scss";

const config = [
  { level: "mock", quantity: "mock", price: "mock", increased: "mock" },
  { level: "mock", quantity: "mock", price: "mock", increased: "mock" },
  { level: "mock", quantity: "mock", price: "mock", increased: "mock" },
  { level: "mock", quantity: "mock", price: "mock", increased: "mock" },
];

const MachineSelect = () => {
  const [current, setCurrent] = useState(0);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: 40,
      }}
    >
      {config.map((item, index) => {
        const active = index === current;
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
              setCurrent(index);
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
              Level{item.level}
            </div>
            <div className={styles.desc}>Unit price:: {item.price}</div>
            <div className={styles.desc}>Quantity: {item.quantity}</div>
            <div className={styles.desc}>
              Computing power:mining computing power increased by{" "}
              {item.increased} times
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MachineSelect;
