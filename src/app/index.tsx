import { Global, css } from "@emotion/react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Route, Routes, useLocation } from "react-router-dom";
import { Signin } from "../pages/signin";
import { Layout } from "../processes/layout";
import { NotFound } from "../processes/not-found";

export default function App() {
  const location = useLocation();

  return (
    <HelmetProvider>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
        />
      </Helmet>
      <Global
        styles={css`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          html {
            background: black;
          }
        `}
      ></Global>
      <Routes location={location}>
        <Route path="*" element={<NotFound></NotFound>}></Route>
        <Route path="/" element={<Layout></Layout>}>
          <Route index element={<Signin></Signin>}></Route>
        </Route>
      </Routes>
    </HelmetProvider>
  );
}
