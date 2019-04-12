import { useLayoutEffect } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

export const useLockBodyScroll = () => {
  useLayoutEffect(() => {
    //const originalOverflow = window.getComputedStyle(document.body).overflow;
    //document.body.style.overflow = "hidden";
    disableBodyScroll(document.body, { reserveScrollBarGap: true });

    return () => {
      //document.body.style.overflow = originalOverflow;
      enableBodyScroll(document.body, { reserveScrollBarGap: true });
    };
  }, []);
};
