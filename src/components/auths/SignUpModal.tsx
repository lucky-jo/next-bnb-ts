import React, { useMemo, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import {
  Close,
  Mail,
  Person,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";
import Input from "../commons/Input";
import { monthList, dayList, yearList } from "../../lib/staticData";
import palette from "../../styles/palette";
import Selector from "../commons/Selector";
import Button from "../commons/Button";
import { signUpAPI } from "../../lib/auth";
import { useDispatch } from "react-redux";
import { commonActions } from "../../../store/common";
import useValidateMode from "../hooks/useValidateMode";
import PasswordWarning from "./PasswordWarning";
import useModal from "../hooks/useModal";
import { useSelector } from "../../../store";
import { authActions } from "../../../store/auth";

const Container = styled.form`
  width: 568px;
  height: 614px;
  padding: 32px;
  background-color: #fff;
  z-index: 11;

  .modal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 40px auto;
  }

  .input-wrapper {
    position: relative;
    margin-bottom: 16px;
  }
  .signup-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }
  .signup-birthdata-label {
    font-size: 16px;
    font-weight: 600;
    margin-top: 16px;
    margin-bottom: 8px;
  }
  .signup-modal-birthday-selectors {
    display: flex;
    margin-bottom: 24px;
    .signup-modal-birthday-month-selector {
      margin-right: 16px;
      flex-grow: 1;
    }
    .signup-modal-birthday-day-selector {
      margin-right: 16px;
      flex-grow: 1;
    }
    .signup-modal-birthday-year-selector {
      flex-grow: 1;
    }
  }
  .sign-up-modal-set-login {
    color: ${palette.dark_cyan};
    margin-left: 8px;
    cursor: pointer;
  }
`;
interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: string[];
  disabledOptions?: string[];
  value?: string;
  isValid?: boolean;
  closeModal: () => void;
}

const PASSWROD_MIN_LENGTH: number = 8;

const SignUpModal: React.FC<IProps> = ({
  closeModal,
  options = [],
  disabledOptions = [],
  isValid = false,
  value = "",
}) => {
  const [email, setEmail] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [birthYear, setBirthYear] = useState<string | undefined>();
  const [birthDay, setBirthDay] = useState<string | undefined>();
  const [birthMonth, setBirthMonth] = useState<string | undefined>();
  const [passwordFocused, setPasswordFocused] = useState(false);
  const dispatch = useDispatch();
  const { validateMode, setValidateMode } = useValidateMode();

  const isPasswordHasNameOrEmail = useMemo(
    () =>
      !password ||
      !lastname ||
      password.includes(lastname) ||
      password.includes(email.split("@")[0]),
    [password, lastname, email]
  );
  const isPasswordOverMinLength = useMemo(
    () => Boolean(password.length) && password.length >= PASSWROD_MIN_LENGTH,
    [password]
  );
  const isPasswordHasNumberOrSymbol = useMemo(
    () =>
      !(
        /[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('")]/g.test(password) ||
        /[0-9]/g.test(password)
      ),
    [password]
  );
  // 이메일 주소 변경시
  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  // 이메일 이름 변경시
  const onChangeLastname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastname(event.target.value);
  };
  // 이메일 성 변경시
  const onChangeFirstname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstname(event.target.value);
  };
  // 이메일 비밀번호 변경시
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  // 비밀번호 숨김 토글
  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };
  // 생년월일 변경
  const onChangeBirthMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthMonth(event.target.value);
  };
  const onChangeBirthDay = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthDay(event.target.value);
  };
  const onChangeBirthYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthYear(event.target.value);
  };
  const onFocusPassword = () => {
    setPasswordFocused(true);
  };
  // 로그인 모달로 변경
  const changeToLoginModal = () => {
    dispatch(authActions.setAuthMode("login"));
  };

  // 회원가입 폼 유효성 확인
  const validateSignUpform = () => {
    // 입력 값 확인
    if (!email || !password || !lastname || !firstname) return false;

    // 비밀번호 유효성 검사
    if (
      isPasswordHasNameOrEmail ||
      !isPasswordOverMinLength ||
      isPasswordHasNumberOrSymbol
    )
      return false;

    if (!birthDay || !birthMonth || !birthYear) return false;
    return true;
  };

  // 회원가입 폼 제출
  const onSubmitSignUp = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    console.log("1212");

    if (!validateSignUpform()) {
      setValidateMode(true);
      return undefined;
    }

    try {
      const signUpBody = {
        email,
        lastname,
        firstname,
        password,
        birthday: new Date(
          `${birthYear}-${birthMonth!.replace("월", "")}-${birthDay}`
        ).toISOString(),
      };
      // const { data } = await signUpAPI(signUpBody);
      await signUpAPI(signUpBody);
      closeModal();
    } catch (err) {
      console.log(err);
    }
  };

  const closeActions = () => {
    setValidateMode(false);
    closeModal();
  };

  // useEffect(() => {
  //   return () => {
  //     setValidateMode(false);
  //   };
  // });

  return (
    <Container onSubmit={onSubmitSignUp}>
      <div>
        <Close className="modal-close-x-icon" onClick={closeActions} />
        <div className="input-wrapper">
          <Input
            type="email"
            placeholder="이메일 주소"
            name="email"
            icon={<Mail></Mail>}
            value={email}
            onChange={onChangeEmail}
            useValidation
            isValid={Boolean(email.length)}
            errorMessage="이메일이 필요합니다. 필수항목 입니다."
          />
        </div>
        <div className="input-wrapper">
          <Input
            type="text"
            placeholder="이름"
            icon={<Person />}
            value={lastname}
            onChange={onChangeLastname}
            useValidation
            isValid={Boolean(lastname.length)}
            errorMessage="이름을 입력하세요. 필수항목 입니다."
          />
        </div>
        <div className="input-wrapper">
          <Input
            type="text"
            placeholder="성"
            icon={<Person />}
            value={firstname}
            onChange={onChangeFirstname}
            useValidation
            isValid={Boolean(firstname.length)}
            errorMessage="성을 입력하세요. 필수항목 입니다"
          />
        </div>
        <div className="input-wrapper signup-passwrod-input-wrapper">
          <Input
            type={hidePassword ? "password" : "text"}
            placeholder="password"
            icon={
              hidePassword ? (
                <VisibilityOff onClick={toggleHidePassword}></VisibilityOff>
              ) : (
                <Visibility onClick={toggleHidePassword}></Visibility>
              )
            }
            value={password}
            onChange={onChangePassword}
            onFocus={onFocusPassword}
            useValidation
            isValid={
              !isPasswordHasNameOrEmail &&
              isPasswordOverMinLength &&
              !isPasswordHasNumberOrSymbol
            }
            errorMessage="비밀번호를 입력하세요. 필수항목 입니다"
          />
        </div>
        {passwordFocused && (
          <>
            <PasswordWarning
              isValid={isPasswordHasNameOrEmail}
              text="비밀번호에 본인 이름이나 이메일 주소를 포함할 수 없습니다."
            />
            <PasswordWarning
              isValid={!isPasswordOverMinLength}
              text="최소 8자"
            />
            <PasswordWarning
              isValid={isPasswordHasNumberOrSymbol}
              text="숫자나 기호를 포함하세요."
            />
          </>
        )}
        <p className="signup-birthdata-label">생일</p>
        <p className="signup-modal-birthday-info">
          만 18세 이상의 성인만 회원으로 가입할 수 있습니다. 생일은 다른
          에어비앤비 이용자에게 공개되지 않습니다.
        </p>
        <div className="signup-modal-birthday-selectors">
          <div className="signup-modal-birthday-month-selector">
            <Selector
              options={monthList}
              defaultValue="월"
              disabledOptions={["월"]}
              value={birthMonth}
              onChange={onChangeBirthMonth}
              isValid={Boolean(birthMonth)}
            />
          </div>
          <div className="signup-modal-birthday-day-selector">
            <Selector
              options={dayList}
              defaultValue="일"
              disabledOptions={["일"]}
              value={birthDay}
              onChange={onChangeBirthDay}
              isValid={Boolean(birthDay)}
            />
          </div>
          <div className="signup-modal-birthday-year-selector">
            <Selector
              options={yearList}
              defaultValue="년"
              disabledOptions={["년"]}
              value={birthYear}
              onChange={onChangeBirthYear}
              isValid={Boolean(birthYear)}
            />
          </div>
        </div>
        <div>
          <Button type="submit">가입 하기</Button>
        </div>
      </div>
      <p>
        이미 에어비앤비 계정이 있나요?
        <span
          className="sign-up-modal-set-login"
          role="presentation"
          onClick={changeToLoginModal}
        >
          로그인
        </span>
      </p>
    </Container>
  );
};

export default SignUpModal;
