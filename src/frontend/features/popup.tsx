import styled from "@emotion/styled";
import { ptw } from "SHARED/pixel-recalculate";
import { ReactNode, useEffect, useRef } from "react";

const Dialog = styled.dialog<{ $visible: boolean; $backdrop: boolean }>`
  display: ${(p) => (p.$visible ? "flex" : "none")};
  justify-content: center;
  align-items: center;

  position: relative;
  top: 0;
  left: 0;
  z-index: 9999;

  min-width: 100vw;
  min-height: 100vh;

  background-color: ${(p) =>
    p.$backdrop ? "rgba(0, 0, 0, 0.5)" : "transparent"};
  backdrop-filter: ${(p) => (p.$backdrop ? `blur(${ptw(15)})` : "none")};
  border: none;
`;

const ContentBox = styled.div`
  position: absolute;
`;

type TPopupProps = {
  state: boolean;
  backdrop?: boolean;
  children?: ReactNode;
};

export const Popup = ({ state, backdrop = true, children }: TPopupProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    state ? ref.current?.showModal() : ref.current?.close();
  }, [state]);

  const handleClose = () => {
    ref.current?.close();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [ref, document]);

  return (
    <Dialog
      $backdrop={backdrop}
      ref={ref}
      $visible={state}
      onClick={(e) => (e.target === e.currentTarget ? handleClose() : null)}
    >
      <ContentBox onClick={(e) => e.preventDefault()}>{children}</ContentBox>
    </Dialog>
  );
};
