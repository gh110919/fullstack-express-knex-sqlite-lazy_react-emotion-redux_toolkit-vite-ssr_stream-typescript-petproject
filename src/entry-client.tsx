import { rootStore } from "SHARED/store";
import { StrictMode, Suspense, lazy } from "react";
import { hydrateRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
// import { HelmetProvider } from "react-helmet-async";

const App = lazy(() => import("./app"));

export const content = (
  <StrictMode>
    <Provider store={rootStore}>
      {/* <HelmetProvider> */}
      <Suspense fallback={<h1>Loading...</h1>}>
        <App></App>
      </Suspense>
      {/* </HelmetProvider> */}
    </Provider>
  </StrictMode>
);

if (typeof window !== "undefined") {
  hydrateRoot(
    document.getElementById("root")!,
    <BrowserRouter>{content}</BrowserRouter>
  );
}
