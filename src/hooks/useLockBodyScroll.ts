import { useLayoutEffect } from "react";

export const useLockBodyScroll = () => {
  useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).position;
    const scrollPos = window.scrollY;
    document.body.style.position = "fixed";

    return () => {
      document.body.style.position = originalStyle;
      window.scrollTo(0, scrollPos);
    };
  }, []);
};
