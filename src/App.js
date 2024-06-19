import { ConfigProvider } from "antd";
import Router from "./router";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import enUS from "antd/es/calendar/locale/en_US";

function App() {
  return (
    <TonConnectUIProvider
      manifestUrl={window.location.origin + "/tonconnect-manifest.json"}
    >
      <ConfigProvider locale={enUS}>
        <Router />
      </ConfigProvider>
    </TonConnectUIProvider>
  );
}

export default App;
