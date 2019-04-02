import * as React from "react";
import { css, styled, Box } from "primithemes";
import { Label, Required } from "./styles";

interface Props {
  name: string;
  title: React.ReactNode;
  type: "text" | "number" | "date";
  value: string;
  required?: boolean;
  invalid?: boolean;
  placeholder?: string;
  handleChange: any;
  min?: any;
  max?: any;
}

const input = css`
  display: block;
  border: ${props => props.theme.borders[1]};
  font-family: ${props => props.theme.fonts.sans};
  border-color: ${props => props.theme.colors.grey[200]};
  padding: ${props => props.theme.sizes[2]} ${props => props.theme.sizes[3]};
  border-radius: ${props => props.theme.radii[2]};
  transition: 400ms ease-out;
  background: ${props => props.theme.colors.background.light};
  &:focus {
    border-color: ${props => props.theme.colors.primary.main};
    outline: none;
  }
`;

const StyledInput = styled.input`
  box-sizing: border-box;
  ${input}
  width: auto;
  max-width: 100%;
`;

const Input: React.SFC<Props> = props => {
  return (
    <Box>
      <Label htmlFor={props.name}>
        <span>{props.title}</span>
        {props.required && <Required>*</Required>}
      </Label>
      <StyledInput
        id={props.name}
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={props.handleChange}
        placeholder={props.placeholder}
        min={props.min}
        max={props.max}
      />
    </Box>
  );
};

export { Input };
