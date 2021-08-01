import React, { useState } from "react";
import styled from "styled-components";
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

const Container = styled.div`
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
      flex-grow: 25%;
    }
    .signup-modal-birthday-year-selector {
      width: 33.3333%;
    }
  }
`;

const SignUpModal: React.FC = () => {
  const [email, setEmail] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [birthYear, setBirthYear] = useState<string | undefined>();
  const [birthDay, setBirthDay] = useState<string | undefined>();
  const [birthMonth, setBirthMonth] = useState<string | undefined>();

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

  //

  return (
    <Container>
      <div>
        <Close />
        <div className="input-wrapper">
          <Input
            type="email"
            placeholder="이메일 주소"
            name="email"
            icon={<Mail></Mail>}
            value={email}
            onChange={onChangeEmail}
          />
        </div>
        <div className="input-wrapper">
          <Input
            type="text"
            placeholder="이름"
            icon={<Person />}
            value={lastname}
            onChange={onChangeLastname}
          />
        </div>
        <div className="input-wrapper">
          <Input
            type="text"
            placeholder="성"
            icon={<Person />}
            value={firstname}
            onChange={onChangeFirstname}
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
          />
        </div>
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
            />
          </div>
          <div className="signup-modal-birthday-day-selector">
            <Selector
              options={dayList}
              defaultValue="일"
              disabledOptions={["일"]}
              value={birthDay}
              onChange={onChangeBirthDay}
            />
          </div>
          <div className="signup-modal-birthday-year-selector">
            <Selector
              options={yearList}
              defaultValue="년"
              disabledOptions={["년"]}
              value={birthYear}
              onChange={onChangeBirthYear}
            />
          </div>
        </div>
        <div>
          <Button type="submit"> 가입 하기</Button>
        </div>
      </div>
    </Container>
  );
};

export default SignUpModal;
