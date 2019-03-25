import { styled } from "primithemes";

export const Wrapper = styled.div`
  display: block;
  width: 100%;
  box-shadow: none;
  background-color: rgb(255, 255, 255);
  color: rgb(68, 74, 87);
  position: relative;
  padding: 16px 20px;
  margin: 0px;
  border-width: 2px;
  border-style: solid;
  border-color: rgb(223, 223, 227);
  border-image: initial;
  border-radius: 0px 5px 5px;
  outline: 0px;
  transition: border-color 0.2s ease 0s;
  &:focus {
    border-color: rgb(58, 105, 199);
  }
`;

export const Label = styled.label<{ active?: boolean }>`
  background-color: ${props =>
    props.active ? "rgb(58, 105, 199)" : "rgb(223, 223, 227)"};
  color: ${props => (props.active ? "rgb(255,255,255)" : "rgb(122, 130, 145)")};
  display: inline-block;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 600;
  position: relative;
  border-width: 0px;
  border-style: initial;
  border-color: initial;
  border-image: initial;
  border-radius: 3px 3px 0px 0px;
  padding: 3px 6px 2px;
  margin: 0px;
  transition: all 0.2s ease 0s;
`;

export const TextInput = styled.input`
  display: block;
  width: 100%;
  box-shadow: none;
  background-color: rgb(255, 255, 255);
  color: rgb(68, 74, 87);
  font-size: 15px;
  font-family: Roboto, sans-serif;
  position: relative;
  padding: 16px 20px;
  margin: 0px;
  border-width: 2px;
  border-style: solid;
  border-color: rgb(223, 223, 227);
  border-image: initial;
  border-radius: 0px 5px 5px;
  outline: 0px;
  transition: border-color 0.2s ease 0s;
  &:focus {
    border-color: rgb(58, 105, 199);
  }
`;

export const Textarea = styled.textarea`
  display: block;
  width: 100%;
  box-shadow: none;
  background-color: rgb(255, 255, 255);
  color: rgb(68, 74, 87);
  font-size: 15px;
  font-family: Roboto, sans-serif;
  position: relative;
  padding: 16px 20px;
  margin: 0px;
  border-width: 2px;
  border-style: solid;
  border-color: rgb(223, 223, 227);
  border-image: initial;
  border-radius: 0px 5px 5px;
  outline: 0px;
  transition: border-color 0.2s ease 0s;
  &:focus {
    border-color: rgb(58, 105, 199);
  }
`;
