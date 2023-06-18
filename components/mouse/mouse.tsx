import { forwardRef } from "react";

const Mouse = forwardRef<HTMLDivElement>(({ }, mouseRef) => {

  return (
    <div className="absolute mix-blend-exclusion pointer-events-none z-[999]" ref={mouseRef}>
      <div className="w-2 aspect-square bg-tw-secondary rounded-full absolute duration-100 translate-x-[var(--x)] translate-y-[var(--y)] ease-linear "></div>
      <div className="w-4 aspect-square rounded-full border-2 border-tw-secondary absolute duration-300 translate-x-[var(--x)] translate-y-[var(--y)] ease-linear -left-2 -top-2"></div>
      {/* <div className="w-32 aspect-square rounded-full bg-tw-secondary absolute duration-100 translate-x-[var(--x)] translate-y-[var(--y)] ease-linear blur-3xl opacity-30 -left-16 -top-16"></div> */}
    </div>
  )
})

export default Mouse;