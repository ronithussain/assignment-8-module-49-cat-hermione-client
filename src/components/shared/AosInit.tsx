"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AosInit() {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const initializeAOS = () => {
      // Wait until hydration is completed
      timer = setTimeout(() => {
        AOS.init({
          duration: 800,
          once: true,
          offset: 100,
          easing: "ease-out-quart",
          disableMutationObserver: false,
        });

        AOS.refreshHard();
      }, 1000);
    };

    if (document.readyState === "complete") {
      initializeAOS();
    } else {
      window.addEventListener("load", initializeAOS, { once: true });
    }

    return () => {
      window.removeEventListener("load", initializeAOS);
      clearTimeout(timer);
    };
  }, []);

  return null;
}