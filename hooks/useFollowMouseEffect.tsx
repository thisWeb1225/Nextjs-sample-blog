import { RefObject, MouseEvent, useEffect } from "react";

const useFollowMouseEffect = (
  parent: RefObject<HTMLElement | null>,
  ...children: RefObject<HTMLElement | null>[]
) => {

  useEffect(() => {
    if (!parent.current || !children[0].current) {
      return; // Exit early if the parent or child references are not available
    }

    // set the transform for every child
    children.forEach((child) => child.current.style.setProperty('transform', 'translateX(var(--x)) translateY(var(--y))'));

    // when enter, set the parentRect and children time function to linear
    function enterEffect() {
      children.forEach((child) => child.current.style.setProperty('transition', `transform 0.5s linear`));
    }

    function moveEffect(e: MouseEvent<Element, MouseEvent>) {
      const parentRect = parent.current.getBoundingClientRect();
      const x = (e.clientX - parentRect.x - (parentRect.width / 2)) / 1.8;
      const y = (e.clientY - parentRect.y - (parentRect.height / 2)) / 1.8;

      children.forEach((child, i) => {
        child.current.style.setProperty('transform', `translate(${x / (i + 1)}px, ${y / (i + 1)}px)`);
      });
    }

    function leaveEffect() {
      children.forEach((child) => {
        child.current.style.setProperty('transition', 'transform 0.8s cubic-bezier(.50,1.8,.50,.8)');
        child.current.style.setProperty('transform', `translate(${0}px, ${0}px)`);
      });
    }

    parent.current.addEventListener('mouseenter', enterEffect as any);
    parent.current.addEventListener('mousemove', moveEffect as any);
    parent.current.addEventListener('mouseout', leaveEffect as any);

  }, [parent, ...children])

}

export default useFollowMouseEffect