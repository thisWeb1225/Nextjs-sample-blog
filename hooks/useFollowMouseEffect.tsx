import { watch } from "fs";
import { RefObject, MouseEvent, useEffect, useState } from "react";

const useFollowMouseEffect = (
  parent: RefObject<HTMLElement | null>,
  ...children: RefObject<HTMLElement | null>[]
) => {
  const [parentRect, setParentRect] = useState<DOMRect>(null);
  useEffect(() => setParentRect(parent.current.getBoundingClientRect()), [parent]);

  useEffect(() => {
    console.log(parent.current)

    if (!parent.current || !children[0].current) {
      return; // Exit early if the parent or child references are not available
    }

    children.forEach((child) => child.current.style.setProperty('transform', 'translateX(var(--x)) translateY(var(--y))'));

    let parentRect: DOMRect;
    // when enter, set the parentRect and children time function to linear
    function enterEffect() {
      parentRect = parent.current.getBoundingClientRect();
      children.forEach((child) => child.current.style.setProperty('transition', 'transform 0.2s linear'));
    }

    function moveEffect(e: MouseEvent<Element, MouseEvent>) {
      const x = e.clientX - parentRect.x - (parentRect.width / 2);
      const y = e.clientY - parentRect.y - (parentRect.height / 2);

      children.forEach((child, i) => child.current.style.setProperty('--x', `${x / 1.5 / (i + 1)}px`));
      children.forEach((child, i) => child.current.style.setProperty('--y', `${y / 1.5 / (i + 1)}px`));
    }

    function leaveEffect() {
      children.forEach((child) => child.current.style.setProperty('transition', 'transform 0.5s cubic-bezier(.50,1.8,.50,.8)'));

      children.forEach((child) => child.current.style.setProperty('--x', `${0}px`));
      children.forEach((child) => child.current.style.setProperty('--y', `${0}px`));

    }

    parent.current.addEventListener('mouseenter', enterEffect as any);
    parent.current.addEventListener('mousemove', moveEffect as any);
    parent.current.addEventListener('mouseleave', leaveEffect as any);

  }, [parent, ...children])

}

export default useFollowMouseEffect