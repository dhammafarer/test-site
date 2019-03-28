import * as React from "react";
import { Text, Flex } from "primithemes";
import {
  Options,
  Selected,
  InputWrapper,
  InputContainer,
  CloseIcon,
  CancelIcon,
  ExpandIcon,
  Input,
  Item,
  OptionsWrapper,
} from "./styles";

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
  const optionsRef = React.useRef(null);
  const itemRef = React.useRef(null);
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
    // press up
    if (e.which === 40) {
      const newActive = active < selectable.length - 1 ? active + 1 : 0;
      setActive(newActive);
      if (optionsRef.current && itemRef.current) {
        const ir = itemRef.current;
        const parent = ir.offsetParent;
        const {
          top: parentTop,
          height: scrollHeight,
        } = parent.getBoundingClientRect();
        const { top, height } = ir.getBoundingClientRect();
        const offset = top - parentTop + height;
        console.log("***");
        console.log("offset :", offset);
        const hidden = offset + height >= scrollHeight;
        if (hidden) {
          parent.scrollTop =
            parent.scrollTop + (offset - scrollHeight + height);
        }
        if (newActive === 0) {
          parent.scrollTop = 0;
        }
      }
    }
    // press down
    if (e.which === 38) {
      const newActive = active > 0 ? active - 1 : selectable.length - 1;
      setActive(newActive);
      if (optionsRef.current && itemRef.current) {
        const ir = itemRef.current;
        const parent = ir.offsetParent;
        const {
          top: parentTop,
          height: scrollHeight,
        } = parent.getBoundingClientRect();
        const { height, top, bottom } = ir.getBoundingClientRect();
        const offset = top - parentTop;
        if (top - height < parent.scrollTop) {
          parent.scrollTop = parent.scrollTop - height;
        }
        if (newActive === 0) {
          console.log(top);
          parent.scrollTop = 0;
        }
        if (newActive === selectable.length - 1) {
          parent.scrollTop = offset;
        }
      }
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
                placeholder="Select..."
                type="text"
                value={input}
                onFocus={() => toggle(true)}
                ref={inputRef}
              />
              {selected.length > 0 && (
                <Flex alignItems="center" px={2} onClick={reset}>
                  <CloseIcon color="inherit" size={18} />
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
          <Options active={show} ref={optionsRef}>
            {selectable.map((x, i) => (
              <Item
                onMouseOver={() => setActive(i)}
                active={active === i}
                ref={active === i ? itemRef : null}
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
