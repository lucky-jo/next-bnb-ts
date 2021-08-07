import React from "react";
import styled, { css } from "styled-components";
import palette from "../../styles/palette";
import { ExpandMore } from "@material-ui/icons";
import { useSelector } from "../../../store";

const Container = styled.div<{ isValid: boolean; validateMode: boolean }>`
  position: relative;
  width: 100%;
  height: 46px;
  /* display: flex; */
  select {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border: 1px solid ${palette.gray_eb};
    padding: 0 11px;
    border-radius: 4px;
    outline: none;
    -webkit-appearance: none;
    background-position: right 11px center;
    background-repeat: no-repeat;
    font-size: 16px;
    &:focus {
      border-color: ${palette.dark_cyan};
    }
  }
  svg {
    position: absolute;
    right: 11px;
  }
  .select-icon-wrapper {
    position: absolute;
    top: 0;
    right: 11px;
    height: 46px;
    display: flex;
    align-items: center;
  }

  // validateMode
  ${({ isValid, validateMode }) =>
    validateMode &&
    css`
      select {
        border-color: ${isValid ? palette.dark_cyan : palette.tawny} !important;
        background-color: ${isValid ? "#fff" : palette.snow};
      }
    `}
`;

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: string[];
  disabledOptions?: string[];
  value?: string;
  isValid?: boolean;
}

const Selector: React.FC<IProps> = ({
  options = [],
  disabledOptions = [],
  isValid = false,
  ...props
}) => {
  const validateMode = useSelector((state) => state.common.validateMode);
  return (
    <Container isValid={Boolean(isValid)} validateMode={validateMode}>
      <select {...props}>
        <option value={props.defaultValue} disabled>
          {props.defaultValue}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="select-icon-wrapper">
        <ExpandMore />
      </div>
    </Container>
  );
};

export default React.memo(Selector);
