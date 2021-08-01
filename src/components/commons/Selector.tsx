import React from "react";
import styled from "styled-components";
import palette from "../../styles/palette";
import { ExpandMore, SvgIconComponent } from "@material-ui/icons";

const Container = styled.div<SvgIconComponent>`
  width: 100%;
  height: 46px;
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
`;

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: string[];
  disabledOptions?: string[];
  value?: string;
}

const Selector: React.FC<IProps> = ({
  options = [],
  disabledOptions = [],
  ...props
}) => {
  console.log(options);
  return (
    <Container>
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
    </Container>
  );
};

export default Selector;
