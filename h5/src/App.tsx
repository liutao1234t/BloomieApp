import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useKeyboardInset } from "./hooks/useKeyboardInset";
import { NavStage } from "./shells/NavStage";
import { OverlayHost } from "./shells/OverlayHost";
import { useHostsStore } from "./store/hostsStore";
import { useReelsStore } from "./store/reelsStore";
import { IncomingCallLayer } from "./shells/IncomingCallLayer";
import { IncomingCallGate, startIncomingCallDispatch } from "./store/incomingCallStore";
import { startSayHiDispatch, useSayHiStore } from "./store/sayHiStore";

export function App() {
  useKeyboardInset();
  useEffect(() => {
    void useHostsStore.getState().refreshHosts().then(() => {
      useSayHiStore.getState().ensureOnlineNow();
    });
    void useReelsStore.getState().refreshReels();
    startSayHiDispatch();
    startIncomingCallDispatch();
  }, []);

  return (
    <BrowserRouter>
      <div className="app-root">
        <NavStage />
        <IncomingCallLayer />
        <OverlayHost />
        <IncomingCallGate />
      </div>
    </BrowserRouter>
  );
}
