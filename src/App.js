import { ConfigProvider } from "antd";
import Router from "./router";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import enUS from "antd/es/calendar/locale/en_US";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TonConnectUIProvider
        manifestUrl={"https://tweetfi.io/tonconnect-manifest.json"}
      >
        <ConfigProvider locale={enUS}>
          <Router />
        </ConfigProvider>
      </TonConnectUIProvider>
    </QueryClientProvider>
  );
}

export default App;
