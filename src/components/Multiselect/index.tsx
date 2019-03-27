import * as React from "react";
import { css, styled, Flex } from "primithemes";

const InputWrapper = styled.div<{ active: boolean }>`
  width: 100%;
  border: 1px solid ${props => props.theme.colors.grey[100]};
  border-radius: ${props => props.theme.radii[2]};
  overflow: hidden;
  ${props =>
    props.active &&
    css`
      border-color: ${props => props.theme.colors.grey[300]};
    `};
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
  border: none;
  &: focus {
    outline: none;
  }
  min-width: 5px;
  flex: 1 1 50%;
`;

const Selected = styled.span`
  padding: ${props => props.theme.sizes[1]} ${props => props.theme.sizes[2]};
  background: ${props => props.theme.colors.grey[100]};
  cursor: pointer;
  margin: ${props => props.theme.sizes[1]};
`;

const Options = styled.div<{ active: boolean }>`
  display: ${props => (props.active ? "block" : "none")};
  border-top: 1px solid ${props => props.theme.colors.grey[400]};
  max-height: 250px;
  overflow: auto;
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
}
const Multiselect: React.SFC<Props> = ({ items }) => {
  const ref = React.useRef(null);
  const [selectable, setSelectable] = React.useState(items);
  const [show, toggle] = React.useState(false);
  const [selected, setSelected] = React.useState([] as Option[]);
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
          <Flex p={2} flexWrap="wrap" style={{ flex: "1 1 auto" }}>
            {selected.map(x => (
              <Selected key={x.value} onClick={() => removeItem(x)}>
                {x.label}
              </Selected>
            ))}
            <Input
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              placeholder="Select variety"
              type="text"
              value={input}
              onFocus={() => toggle(true)}
            />
          </Flex>
          <Flex alignItems="center" px={2} onClick={reset}>
            x
          </Flex>
          <Flex alignItems="center" px={2} onClick={() => toggle(!show)}>
            v
          </Flex>
        </Flex>
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
      </InputWrapper>
    </div>
  );
};

export { Multiselect };
