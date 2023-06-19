import { forwardRef } from "react";

const Mouse = forwardRef<HTMLDivElement>(({ }, mouseRef) => {

  return (
    <div className="absolute mix-blend-exclusion pointer-events-none z-[999]" ref={mouseRef}>
      <div className="w-2 aspect-square bg-tw-secondary rounded-full absolute duration-100 translate-x-[var(--x)] translate-y-[var(--y)] ease-linear blur-[1px]"></div>
      <div className="w-4 aspect-square rounded-full border-2 border-tw-secondary absolute duration-500 translate-x-[var(--x)] translate-y-[var(--y)] ease-linear -left-1 -top-1 blur-[1px]"></div>
    </div>
  )
})

export default Mouse;