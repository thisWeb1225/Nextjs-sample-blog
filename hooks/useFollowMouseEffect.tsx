import { RefObject, MouseEvent, useEffect } from 'react';
import gsap from 'gsap';

const useFollowMouseEffect = (
  parent: RefObject<HTMLElement | null>,
  ...children: RefObject<HTMLElement | null>[]
) => {
  useEffect(() => {
    if (!parent.current || !children[0].current) {
      return; // Exit early if the parent or child references are not available
    }

    function moveEffect(e: MouseEvent<Element, MouseEvent>) {
      const parentRect = parent.current.getBoundingClientRect();
      const x = Math.round(
        (e.clientX - parentRect.x - parentRect.width / 2) / 1.8
      );
      const y = Math.round(
        (e.clientY - parentRect.y - parentRect.height / 2) / 1.8
      );

      children.forEach((child, i) => {
        gsap.to(child.current, {
          x: x / (i + 1),
          y: y / (i + 1),
          duration: 0.5,
        });
      });
    }

    function leaveEffect() {
      children.forEach((child) => {
        gsap.to(child.current, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: 'bounce',
        });
      });
    }

    parent.current.addEventListener('mousemove', moveEffect as any);
    parent.current.addEventListener('mouseout', leaveEffect as any);

    return () => {
      if (parent.current) {
        parent.current.removeEventListener('mousemove', moveEffect as any);
        parent.current.removeEventListener('mouseout', leaveEffect as any);
      }
    };
  }, [parent.current, ...children.map((child) => child.current)]);
};

export default useFollowMouseEffect;
