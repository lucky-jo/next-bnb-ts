import React from "react";
import styled from "styled-components";
import palette from "../../styles/palette";
import { Close, Check } from "@material-ui/icons";

const Container = styled.p<{ isValid: boolean }>`
  color: ${({ isValid }) =>
    isValid ? palette.davidson_orange : palette.green};
  display: flex;
  align-items: center;
  svg {
    margin-right: 8px;
  }
`;

type PasswordWarning = {
  isValid: boolean;
  text: string;
};

const PasswordWarning: React.FC<PasswordWarning> = ({ isValid, text }) => {
  return (
    <Container isValid={isValid}>
      {isValid ? <Close></Close> : <Check></Check>}
      {text}
    </Container>
  );
};

export default PasswordWarning;
