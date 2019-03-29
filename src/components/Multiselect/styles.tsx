import { css, styled } from "primithemes";
import { ExpandMore } from "styled-icons/material/ExpandMore";
import { Close } from "styled-icons/material/Close";
import { Cancel } from "styled-icons/material/Cancel";

export const Wrapper = styled.div`
  width: 100%;
  font-family: ${props => props.theme.fonts.sans};
  display: flex;
  align-items: flex-start;
`;

export const Buttons = styled.div`
  display: flex;
`;

export const Controls = styled.div`
  flex: 1 1 auto;
`;

export const Select = styled.div<{ active: boolean }>`
  display: flex;
  flex: 1 1 auto;
  flex-wrap: wrap;
  transition: all 400ms ease-out;
  border-bottom: ${props => props.theme.borders[1]};
  border-color: ${props => props.theme.colors.grey[300]};
  ${props =>
    props.active &&
    css`
      border-color: ${props => props.theme.colors.secondary.main};
    `};
`;

export const SelectedContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const InputContainer = styled.div<{ active: boolean }>`
  flex: 1 1 0;
`;

export const Input = styled.input`
  -webkit-appearance: none;
  box-sizing: border-box;
  padding: ${props => props.theme.sizes[2]};
  border: none;
  font-family: ${props => props.theme.fonts.sans};
  &:focus {
    outline: none;
  }
  &:active {
    border: none;
  }
  min-width: 45px;
  width: 100%;
`;

export const ExpandIcon = styled(ExpandMore)`
  cursor: pointer;
  padding: ${props => props.theme.sizes[2]};
`;

export const CloseIcon = styled(Close)`
  cursor: pointer;
  padding: ${props => props.theme.sizes[2]};
`;
export const CancelIcon = styled(Cancel)`
  cursor: pointer;
`;

export const Selected = styled.span`
  padding: ${props => props.theme.sizes[1]} ${props => props.theme.sizes[2]};
  background: ${props => props.theme.colors.grey[200]};
  margin: ${props => props.theme.sizes[1]};
  border-radius: ${props => props.theme.radii[2]};
`;

export const OptionsWrapper = styled.div`
  position: relative;
`;

export const Options = styled.div<{ active: boolean; maxHeight: string }>`
  max-height: ${props => props.maxHeight};
  z-index: 99;
  display: ${props => (props.active ? "block" : "none")};
  overflow: auto;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid;
  border-color: ${props => props.theme.colors.grey[100]};
  border-bottom-left-radius: ${props => props.theme.radii[2]};
  border-bottom-right-radius: ${props => props.theme.radii[2]};
  box-shadow: ${props => props.theme.shadows[1]};
`;

export const Item = styled.div<{ active: boolean }>`
  padding: ${props => props.theme.sizes[2]};
  cursor: pointer;
  color: ${props => props.theme.colors.text.main};
  background: ${props => props.theme.colors.white.main};
  ${props =>
    props.active &&
    css`
      background: ${props => props.theme.colors.grey[200]};
      color: ${props => props.theme.colors.text.dark};
    `};
`;
