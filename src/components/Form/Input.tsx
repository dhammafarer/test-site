import * as React from "react";
import { css, styled, Box } from "primithemes";
import { Label, Required } from "./styles";

interface Props {
  name: string;
  title: React.ReactNode;
  type: "text" | "number" | "date";
  value: string;
  required?: boolean;
  errors: React.ReactNode[];
  placeholder?: string;
  handleChange: any;
  handleBlur?: any;
  min?: any;
  max?: any;
}

const input = css<{ errors?: string[] }>`
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
  ${props =>
    props.errors &&
    props.errors.length > 0 &&
    css`
      border-color: ${props => props.theme.colors.error.main};
      &:focus {
        border-color: ${props => props.theme.colors.error.main};
      }
    `};
`;

const StyledInput = styled.input`
  box-sizing: border-box;
  ${input}
  width: auto;
  max-width: 100%;
`;

const Input: React.SFC<Props> = ({ errors, ...props }) => {
  return (
    <Box>
      <Label htmlFor={props.name}>
        <span>{props.title}</span>
        {errors && <span>{errors[0]}</span>}
        {props.required && <Required>*</Required>}
      </Label>
      <StyledInput
        id={props.name}
        errors={errors}
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={props.handleChange}
        placeholder={props.placeholder}
        min={props.min}
        max={props.max}
        onBlur={props.handleBlur}
      />
    </Box>
  );
};

export { Input };
