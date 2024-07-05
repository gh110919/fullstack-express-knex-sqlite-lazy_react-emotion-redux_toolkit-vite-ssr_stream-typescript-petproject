import styled from "@emotion/styled";
import { ptw } from "SHARED/pixel-recalculate";
import { Outlet } from "react-router-dom";

const ContentBox = styled.section<{ $background: boolean }>`
  width: ${ptw(1920)};
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
  &::before {
    content: "";
    position: absolute;
    background-image: ${(p) =>
      p.$background ? `url("/assets/honeycomb.png")` : "none"};
    background-size: ${ptw(1920)} ${ptw(987)};
    width: 100vw;
    height: 100%;
    z-index: -1;
  }
`;

export const Layout = () => {
  return (
    <ContentBox $background={false}>
      <Outlet></Outlet>
    </ContentBox>
  );
};
