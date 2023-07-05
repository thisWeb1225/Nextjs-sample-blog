import { forwardRef } from "react";

const Mouse = forwardRef<HTMLDivElement>(({ }, mouseRef) => {
  return (
    <div className="absolute mix-blend-exclusion pointer-events-none z-[999]" ref={mouseRef}>
      <div className="w-2 -left-[1px] -top-[1px] aspect-square bg-tw-secondary rounded-full absolute translate-x-[var(--x)] translate-y-[var(--y)] ease-linear"></div>
      {/* <div className="w-4 aspect-square rounded-full border-2 border-tw-secondary absolute duration-200 translate-x-[var(--x)] translate-y-[var(--y)] ease-linear -left-1 -top-1"></div> */}
    </div>
  )
})

export default Mouse;