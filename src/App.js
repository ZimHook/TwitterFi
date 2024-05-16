import Router from './router';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

function App() {
  return (
    <TonConnectUIProvider manifestUrl={window.location.origin + '/tonconnect-manifest.json'}>
    <Router />
    </TonConnectUIProvider>
  );
}

export default App;
