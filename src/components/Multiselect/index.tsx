import * as React from "react";
import { isNil } from "ramda";
import { Text, Flex } from "primithemes";
import {
  Options,
  Selected,
  Buttons,
  Wrapper,
  Controls,
  Select,
  InputContainer,
  SelectedContainer,
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

const sortFn = (a: Option, b: Option) => {
  const af = a.index;
  const bf = b.index;
  if (!af || !bf) return 0;
  return ascending(af, bf);
};

interface Option {
  value: string;
  label: string;
  index?: number;
}

interface Props {
  items: Option[];
  selected: Option[];
  setSelected: any;
  placeholder?: string;
  maxHeight?: string;
}
const Multiselect: React.SFC<Props> = ({
  items,
  selected,
  setSelected,
  ...props
}) => {
  const ref = React.useRef(null as (HTMLDivElement | null));
  const inputRef = React.useRef(null as (HTMLInputElement | null));
  const optionsRef = React.useRef(null as (HTMLDivElement | null));
  const [options, setOptions] = React.useState([] as Option[]);
  const [selectable, setSelectable] = React.useState([] as Option[]);
  const [show, toggle] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [active, setActive] = React.useState(0);
  const [scrollTo, setScrollTo] = React.useState(0);

  React.useEffect(() => {
    console.log("sorting");
    const ops = items.map((x, i) => {
      return Object.assign({ index: i }, x);
    });
    setOptions(ops);
    setSelectable(ops);
  }, [items]);

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

  const updateScroll = () => {
    const parent = optionsRef.current;
    if (isNil(scrollTo) || !parent) return;
    setActive(scrollTo);
    if (scrollTo === 0) {
      parent.scrollTop = 0;
      return;
    }
    const ir = parent.children[scrollTo];
    const {
      top: parentTop,
      height: scrollHeight,
    } = parent.getBoundingClientRect();
    const { top, height } = ir.getBoundingClientRect();
    const offset = top - parentTop;
    const hiddenBelow = offset + height >= scrollHeight;
    const hiddenAbove = offset < 0;
    if (hiddenBelow) {
      parent.scrollTop = parent.scrollTop + (offset - scrollHeight + height);
    } else if (hiddenAbove) {
      parent.scrollTop = parent.scrollTop + offset;
    }
  };

  React.useEffect(() => updateScroll(), [scrollTo]);

  const updateSelectable = (xs: Option[]) => {
    setSelectable(xs);
  };

  const resetInput = () => {
    setInput("");
    setScrollTo(active - 1 < 0 ? 0 : active - 1);
    toggle(false);
  };

  const addItem = (item: Option) => {
    setSelected([...selected, item]);
    updateSelectable(
      options.filter(x => selected.indexOf(x) < 0 && x !== item)
    );
    resetInput();
  };

  const removeItem = (item: Option) => {
    updateSelectable([...selectable, item].sort(sortFn));
    setSelected(selected.filter(x => x !== item));
  };

  const filterInput = (val: string) => {
    setInput(val);
    const s = val.trim();
    updateSelectable(
      options
        .filter(x => selected.indexOf(x) < 0)
        .filter(x => x.label.indexOf(s) >= 0)
    );
  };

  const handleChange = (e: any) => {
    const val = e.target.value;
    filterInput(val);
  };

  const reset = () => {
    setSelected([]);
    updateSelectable(options);
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
      const newActive = active < selectable.length - 1 ? active + 1 : 0;
      setScrollTo(newActive);
    }
    // press down
    if (e.which === 38) {
      const newActive = active > 0 ? active - 1 : selectable.length - 1;
      setScrollTo(newActive);
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
    <Wrapper ref={ref}>
      <Controls>
        <Select active={show}>
          <SelectedContainer>
            {selected.map(x => (
              <Selected key={x.value}>
                <Flex alignItems="center">
                  <CancelIcon size={16} onClick={() => removeItem(x)} />
                  <Text ml={2}>{x.label}</Text>
                </Flex>
              </Selected>
            ))}
          </SelectedContainer>
          <InputContainer active={show}>
            <Input
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              placeholder={props.placeholder || "Search..."}
              type="text"
              value={input}
              onFocus={() => toggle(true)}
              ref={inputRef}
            />
          </InputContainer>
        </Select>
        <OptionsWrapper>
          <Options
            maxHeight={props.maxHeight || "300px"}
            active={show}
            ref={optionsRef}
          >
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
      </Controls>
      <Buttons>
        {selected.length > 0 && (
          <Flex alignItems="center" onClick={reset}>
            <CloseIcon color="inherit" size={18} />
          </Flex>
        )}
        <Flex alignItems="center" onClick={toggleExpand}>
          <ExpandIcon
            style={{
              transform: show ? "rotate(180deg)" : "rotate(0deg)",
            }}
            color="inherit"
            size={18}
          />
        </Flex>
      </Buttons>
    </Wrapper>
  );
};

export { Multiselect };
