import styled from "@emotion/styled";
import { PageContainer } from "../entities/page-container";
import { ptw } from "SHARED/pixel-recalculate";
import { useDispatch_, useSelector_ } from "SHARED/store";
import { TAuthState, authSlice } from "SHARED/store/slices/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Form = styled.form`
  width: ${ptw(320)};
  height: ${ptw(254)};
  border-radius: ${ptw(5)};
  background: rgba(245, 245, 245, 1);
  border: ${ptw(1)} solid rgba(195, 196, 199, 1);

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${ptw(30)} ${ptw(25)};

  margin-bottom: ${ptw(14)};
  margin-top: ${ptw(23)};
`;

const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: ${ptw(20)};
  border: none;
  margin-bottom: ${ptw(12)};
`;

const Title = styled.strong`
  width: ${ptw(42)};
  height: ${ptw(11)};
  font-family: Montserrat, sans-serif;
  font-size: ${ptw(16)};
  font-weight: 500;
  line-height: ${ptw(19.5)};
  text-align: left;
  margin-bottom: ${ptw(16)};
  transform: translate(0, ${ptw(-5)});
  display: flex;
  justify-content: center;
`;

const Email = styled.input`
  width: ${ptw(270)};
  height: ${ptw(40)};
  border-radius: ${ptw(2)};
  border: ${ptw(1)} solid rgba(30, 30, 32, 1);

  font-family: Montserrat, sans-serif;
  font-size: ${ptw(12)};
  font-weight: 400;
  line-height: ${ptw(14.63)};
  text-align: left;
  padding: ${ptw(16)} ${ptw(8)};
`;

const Password = styled(Email)``;

const Checkbox = styled.input`
  width: ${ptw(16)};
  height: ${ptw(16)};
  border-radius: ${ptw(3)};
  border: ${ptw(1)} solid rgba(30, 30, 32, 1);
`;

const Remember = styled.p`
  width: ${ptw(106)};
  height: ${ptw(8)};

  font-family: Montserrat, sans-serif;
  font-size: ${ptw(12)};
  font-weight: 500;
  line-height: ${ptw(14.63)};
  text-align: left;
  transform: translate(0, ${ptw(-5)});
`;

const RememberBox = styled.div`
  display: flex;
  align-items: center;
  gap: ${ptw(4)};
`;

const Submit = styled.button`
  width: ${ptw(54)};
  height: ${ptw(24)};
  padding: ${ptw(8.5)} ${ptw(10)};
  border-radius: ${ptw(2)};
  border: none;

  background: rgba(254, 204, 25, 1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubmitText = styled.p`
  font-family: Montserrat, sans-serif;
  font-size: ${ptw(10)};
  font-weight: 600;
  line-height: ${ptw(12.19)};
  text-align: center;
`;

const RememberSubmitBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ScoutMode = styled.button`
  width: ${ptw(155)};
  height: ${ptw(37)};
  border-radius: ${ptw(5)};

  background: rgba(81, 81, 81, 1);

  border: ${ptw(1)} solid rgba(108, 108, 108, 1);

  font-family: Montserrat, sans-serif;
  font-size: ${ptw(12)};
  font-weight: 500;
  line-height: ${ptw(14.63)};
  text-align: left;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AdminMode = styled(ScoutMode)``;

const ScoutAdminBox = styled.div<{ $visible: boolean }>`
  display: ${(p) => (p.$visible ? "flex" : "none")};
  gap: ${ptw(10)};
`;

type TSingninProps = { title?: string; visibleModes?: boolean };

export const Signin = ({
  title = "Вход", // значения по умолчанию, если не передать ничего другого будут указаны эти данные
  visibleModes = true,
}: TSingninProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch_();

  const { username, password } = useSelector_((s) => s.authSlice);

  const [state, setState] = useState<TAuthState>({
    username: "",
    password: "",
  });

  const [remember, setRemember] = useState<boolean>(false);

  return (
    <PageContainer>
      <Form onClick={() => navigate("/watch/select_sport")}>
        <Title>{title} </Title>
        <Fieldset>
          <Email
            type="email"
            placeholder="Логин"
            autoSave={remember ? username : ""}
            autoComplete="on"
            onChange={(e) => {
              setState((prev) => ({ ...prev, username: e.target.value }));
            }}
          />
          <Password
            type="password"
            placeholder="Пароль"
            autoSave={remember ? password : ""}
            autoComplete="on"
            onChange={(e) => {
              setState((prev) => ({ ...prev, password: e.target.value }));
            }}
          />
        </Fieldset>
        <RememberSubmitBox>
          <RememberBox>
            <Checkbox
              type="checkbox"
              onChange={() => {
                setRemember(!remember);
              }}
            />
            <Remember>Запомнить меня</Remember>
          </RememberBox>
          <Submit
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                authSlice.actions.authMethod({
                  username: state.username,
                  password: state.password,
                })
              );
            }}
          >
            <SubmitText>Войти</SubmitText>
          </Submit>
        </RememberSubmitBox>
      </Form>
      <ScoutAdminBox $visible={visibleModes}>
        <ScoutMode onClick={() => navigate("/scout_mode")}>
          Скаут-режим
        </ScoutMode>
        <AdminMode onClick={() => navigate("/admin_mode")}>
          Админ-режим
        </AdminMode>
      </ScoutAdminBox>
    </PageContainer>
  );
};
