import React, { useRef, useEffect } from "react";

interface Props {
  onClick(): void;
}

const ClickOutside: React.SFC<Props> = ({ onClick, children }) => {
  const node = useRef() as React.Ref<HTMLDivElement>;

  const handleClick: EventListener = e => {
    if (node.current && node.current.contains(e.target)) return;
    onClick();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  });

  return <div ref={node}>{children}</div>;
};

export { ClickOutside };
