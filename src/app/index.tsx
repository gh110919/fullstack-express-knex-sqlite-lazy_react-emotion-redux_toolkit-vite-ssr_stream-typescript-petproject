import { Signin } from "PAGES/signin";
import { Layout } from "PROCESSES/layout";
import { NotFound } from "PROCESSES/not-found";
// import * as HP from "react-helmet-async";
import { Global, css } from "@emotion/react";
import { Route, Routes, useLocation } from "react-router-dom";

export default function App() {
  const location = useLocation();

  return (
    <>
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
      {/* <HP.Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
        />
      </HP.Helmet> */}

      <Routes location={location}>
        <Route path="*" element={<NotFound></NotFound>}></Route>
        <Route path="/" element={<Layout></Layout>}>
          <Route index element={<Signin></Signin>}></Route>
        </Route>
      </Routes>
    </>
  );
}
