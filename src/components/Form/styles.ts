import { styled } from "primithemes";

export const Label = styled.label`
  font-family: ${props => props.theme.fonts.sans};
  font-size: ${props => props.theme.fontSizes[2]};
  color: ${props => props.theme.colors.text.main};
  display: block;
  margin: ${props => props.theme.sizes[2]} 0;
`;

export const Required = styled.span`
  font-family: ${props => props.theme.fonts.sans};
  font-size: ${props => props.theme.fontSizes[2]};
  color: ${props => props.theme.colors.error.main};
`;
