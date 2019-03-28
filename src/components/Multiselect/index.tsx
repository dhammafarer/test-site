import * as React from "react";
import { css, styled, Text, Flex } from "primithemes";
import { ExpandMore } from "styled-icons/material/ExpandMore";
import { Close } from "styled-icons/material/Close";
import { Cancel } from "styled-icons/material/Cancel";

const InputWrapper = styled.div<{ active: boolean }>`
  width: 100%;
  font-family: ${props => props.theme.fonts.sans};
`;

const Item = styled.div<{ active: boolean }>`
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

const Input = styled.input`
  -webkit-appearance: none;
  padding: ${props => props.theme.sizes[2]};
  background: transparent;
  border: none;
  font-family: ${props => props.theme.fonts.sans};
  &: focus {
    outline: none;
  }
  min-width: 5px;
  width: 100%;
  flex: 1 1 auto;
`;

const InputContainer = styled.div<{ active: boolean }>`
  display: flex;
  transition: all 400ms ease-out;
  width: 100%;
  border-bottom: ${props => props.theme.borders[1]};
  border-color: ${props => props.theme.colors.grey[300]};
  ${props =>
    props.active &&
    css`
      border-color: ${props => props.theme.colors.secondary.main};
    `};
`;

const ExpandIcon = styled(ExpandMore)``;
const CloseIcon = styled(Close)``;
const CancelIcon = styled(Cancel)`
  cursor: pointer;
`;

const Selected = styled.span`
  padding: ${props => props.theme.sizes[1]} ${props => props.theme.sizes[2]};
  background: ${props => props.theme.colors.grey[200]};
  margin: ${props => props.theme.sizes[1]};
  border-radius: ${props => props.theme.radii[2]};
`;

const OptionsWrapper = styled.div`
  position: relative;
`;

const Options = styled.div<{ active: boolean }>`
  z-index: 99;
  max-height: 100px;
  display: ${props => (props.active ? "block" : "none")};
  overflow: auto;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const ascending = (a: any, b: any) => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
};

interface Option {
  value: string;
  label: string;
}

interface Props {
  items: Option[];
  selected: Option[];
  setSelected: any;
}
const Multiselect: React.SFC<Props> = ({ items, selected, setSelected }) => {
  const ref = React.useRef(null);
  const inputRef = React.useRef(null);
  const [selectable, setSelectable] = React.useState(items);
  const [show, toggle] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [active, setActive] = React.useState(0);

  const clickOutside = (e: any) => {
    if (!show) return;
    if (ref.current && !ref.current.contains(e.target)) {
      toggle(false);
      document.removeEventListener("click", clickOutside);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", clickOutside);
  }, [show]);

  const addItem = (item: Option) => {
    setSelected([...selected, item]);
    setSelectable(items.filter(x => selected.indexOf(x) < 0 && x !== item));
    setInput("");
    toggle(false);
    setActive(0);
  };

  const removeItem = (item: Option) => {
    setSelectable([...selectable, item].sort(ascending));
    setSelected(selected.filter(x => x !== item));
  };

  const filterInput = (val: string) => {
    setInput(val);
    if (val.trim().length === 0) {
      setSelectable(items.filter(x => selected.indexOf(x) < 0));
    } else {
      setSelectable(selectable.filter(x => x.label.indexOf(val) >= 0));
    }
  };

  const handleChange = (e: any) => {
    const val = e.target.value;
    filterInput(val);
  };

  const reset = () => {
    setSelected([]);
    setSelectable(items.sort(ascending));
    setInput("");
    toggle(false);
  };

  const toggleExpand = () => {
    if (show) {
      toggle(false);
    } else {
      toggle(true);
      inputRef.current && inputRef.current.focus();
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.which === 40) {
      setActive(active < selectable.length - 1 ? active + 1 : 0);
    }
    if (e.which === 38) {
      setActive(active > 0 ? active - 1 : selectable.length - 1);
    }
    if (e.which === 13) {
      if (active >= 0 && selectable[active]) {
        addItem(selectable[active]);
      } else {
        toggle(false);
        filterInput("");
      }
    }
    if (e.which === 8 && input.trim().length === 0 && selected.length > 0) {
      removeItem(selected[selected.length - 1]);
    }
    if (e.which === 27) {
      toggle(false);
    }
  };

  return (
    <div ref={ref}>
      <InputWrapper active={show}>
        <Flex flexDirection="row">
          <Flex flexWrap="wrap" style={{ flex: "1 1 auto" }}>
            {selected.map(x => (
              <Selected key={x.value}>
                <Flex alignItems="center">
                  <CancelIcon size={16} onClick={() => removeItem(x)} />
                  <Text ml={2}>{x.label}</Text>
                </Flex>
              </Selected>
            ))}
            <InputContainer active={show}>
              <Input
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                placeholder="Select varieties..."
                type="text"
                value={input}
                onFocus={() => toggle(true)}
                ref={inputRef}
              />
              {selected.length > 0 && (
                <Flex alignItems="center" px={2} onClick={reset}>
                  <Close color="inherit" size={18} />
                </Flex>
              )}
              <Flex alignItems="center" px={2} onClick={toggleExpand}>
                <ExpandIcon
                  style={{
                    transform: show ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                  color="inherit"
                  size={18}
                />
              </Flex>
            </InputContainer>
          </Flex>
        </Flex>
        <OptionsWrapper>
          <Options active={show}>
            {selectable.map((x, i) => (
              <Item
                onMouseOver={() => setActive(i)}
                active={active === i}
                key={x.value}
                onClick={() => addItem(x)}
              >
                {x.label}
              </Item>
            ))}
          </Options>
        </OptionsWrapper>
      </InputWrapper>
    </div>
  );
};

export { Multiselect };
