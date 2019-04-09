import React, { useEffect, useRef, useState } from "react";

export const useIntersect = ({
  root = null,
  rootMargin = "0px",
  threshold = 0,
}) => {
  const [entry, updateEntry] = useState({} as IntersectionObserverEntry);
  const [node, setNode] = useState(null);

  const observer = useRef(null) as React.Ref<IntersectionObserver>;

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      ([entry]) => updateEntry(entry),
      { root, rootMargin, threshold }
    );
    const { current: currentObserver } = observer;
    currentObserver.disconnect();

    if (node) currentObserver.observe(node);

    return () => currentObserver.disconnect();
  }, [node, root, rootMargin, threshold]);

  return [setNode, entry] as [
    React.Dispatch<React.SetStateAction<any>>,
    IntersectionObserverEntry
  ];
};
