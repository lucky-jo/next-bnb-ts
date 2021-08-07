import React, { useState } from "react";
import styled from "styled-components";
import palette from "../../styles/palette";
import Button from "../commons/Button";
import Input from "../commons/Input";
import { Close, Mail, VisibilityOff, Visibility } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/auth";
import { loginAPI } from "../../lib/auth";

const Container = styled.form`
  width: 568px;
  padding: 32px;
  background-color: #fff;
  z-index: 11;

  .modal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 40px auto;
  }

  .login-iuput-wrapper {
    position: relative;
    margin-bottom: 16px;
  }

  .login-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }

  .login-modal-submit-button-wrapper {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${palette.gray_eb};
  }

  .login-modal-set-sign-up {
    color: ${palette.dark_cyan};
    margin-left: 8px;
    cursor: pointer;
  }
`;

interface IProps {
  closeModal: () => void;
}

const LoginModal: React.FC<IProps> = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordHide, setIsPasswordHide] = useState(true);

  const dispatch = useDispatch();

  // 이메일 주소 변경시
  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  // 비밀번호 변경시
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  // 비밀번호 아이콘 상태 변경
  const toggleHidePassword = () => {
    setIsPasswordHide(!isPasswordHide);
  };
  // 회원가입 모달로 변경하기
  const changeToSignUpModal = () => {
    dispatch(authActions.setAuthMode("signup"));
  };
  // 로그인 클릭시
  const onSubmitLogin = async (event: React.FormEvent<HTMLFontElement>) => {
    event.preventDefault();
    if (!email || !password) {
      alert("Please enter email and password");
    } else {
      const loginBody = { email: email, password: password };

      try {
        await loginAPI(loginBody);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Container>
      <Close></Close>
      <div className="login-input-wrapper">
        <Input
          placeholder="이메일 주소"
          name="email"
          type="email"
          icon={<Mail></Mail>}
          onChange={onChangeEmail}
        ></Input>
      </div>
      <div className="login-input-wrapper login-password-input-wrapper">
        <Input
          placeholder="비밀번호 설정하기"
          icon={
            isPasswordHide ? (
              <VisibilityOff onClick={toggleHidePassword}></VisibilityOff>
            ) : (
              <Visibility onClick={toggleHidePassword}></Visibility>
            )
          }
          type={isPasswordHide ? `password` : `text`}
          value={password}
          onChange={onChangePassword}
        ></Input>
      </div>
      <div className="login-modal-submit-button-wrapper">
        <Button type="submit">로그인</Button>
      </div>
      <p>
        이미 에어비앤비 계정이 있으신가요?
        <span
          className="login-modal-set-sign-up"
          role="presentation"
          onClick={changeToSignUpModal}
        >
          회원가입
        </span>
      </p>
    </Container>
  );
};

export default LoginModal;
