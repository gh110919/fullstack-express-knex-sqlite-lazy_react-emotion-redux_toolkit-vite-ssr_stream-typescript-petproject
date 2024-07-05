import styled from "@emotion/styled";
import { ptw } from "SHARED/pixel-recalculate";
import { useNavigate } from "react-router-dom";

const ContentBox = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: Raleway;
  font-size: ${ptw(30)};
  font-weight: 900;
  line-height: ${ptw(60)};
  text-align: center;
`;

const Title = styled.h1`
  display: flex;
  gap: ${ptw(8)};
  color: white;
`;

const Link = styled.p`
  color: blue;
`;

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <ContentBox>
      <Title>
        Error 404: Not Found, please return to
        <Link onClick={() => navigate(-1)}>back</Link>
      </Title>
    </ContentBox>
  );
};
