import { RefObject, MouseEvent, useEffect } from "react";

const useFollowMouseEffect = (
  parent: RefObject<HTMLElement | null>,
  child: RefObject<HTMLElement | null>,
  isParentMove: boolean = false
) => {

  useEffect(() => {

    if (!parent.current || !child.current) {
      return; // Exit early if the parent or child references are not available
    }

    child.current.style.setProperty('transition', 'transform 0.5s linear');
    child.current.style.setProperty('transform', 'translateX(var(--x)) translateY(var(--y))');
    if (isParentMove) {
      parent.current.style.setProperty('transition', 'transform 0.5s linear');
      parent.current.style.setProperty('transform', 'translateX(var(--x)) translateY(var(--y))');
    }

    function moveEffect (e: MouseEvent<Element, MouseEvent>) {
      const aboutContainerSize = child.current.getBoundingClientRect();
      const x = e.clientX - aboutContainerSize.left - aboutContainerSize.width / 2;
      const y = e.clientY - aboutContainerSize.top - aboutContainerSize.height / 2;
      child.current.style.setProperty('--x', `${x / 2}px`);
      child.current.style.setProperty('--y', `${y / 2}px`);
      if (isParentMove) {
        parent.current.style.setProperty('--x', `${x / 2}px`);
        parent.current.style.setProperty('--y', `${y / 2}px`);
      }
    }

    const leaveEffect = () => {
      child.current.style.setProperty('--x', `${0}px`);
      child.current.style.setProperty('--y', `${0}px`);
      if (isParentMove) {
        parent.current.style.setProperty('--x', `${0}px`);
        parent.current.style.setProperty('--y', `${0}px`);
      }
    }

    parent.current.addEventListener('mousemove', moveEffect as any);
    parent.current.addEventListener('mouseleave', leaveEffect as any);

  }, [parent, child, isParentMove])

}

export default useFollowMouseEffect