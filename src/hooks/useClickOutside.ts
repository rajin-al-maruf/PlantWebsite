import { useEffect } from "react";
import type { RefObject } from "react";

export default function useClickOutside(
  ref: RefObject<HTMLElement| null>,
  handler: (e: MouseEvent| TouchEvent) => void
) {
  useEffect(() => {
    function handleClick(e: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler(e);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, handler]);
}
