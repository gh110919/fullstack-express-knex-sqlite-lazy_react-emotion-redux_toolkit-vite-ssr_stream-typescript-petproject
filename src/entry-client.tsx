import { rootStore } from "SHARED/store";
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./app";

export const content = (
  <StrictMode>
    <Provider store={rootStore}>
      <App></App>
    </Provider>
  </StrictMode>
);

if (typeof window !== "undefined") {
  hydrateRoot(
    document.getElementById("root")!,
    <BrowserRouter>{content}</BrowserRouter>
  );
}
