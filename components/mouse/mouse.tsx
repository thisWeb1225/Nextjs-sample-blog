import { forwardRef } from 'react';

const Mouse = forwardRef<HTMLDivElement>(({}, mouseRef) => {
  return (
    <div
      className="absolute mix-blend-exclusion pointer-events-none z-[999]"
      ref={mouseRef}
    >
      <div className="w-2 -left-[1px] -top-[1px] aspect-square bg-tw-secondary rounded-full"></div>
    </div>
  );
});

export default Mouse;
