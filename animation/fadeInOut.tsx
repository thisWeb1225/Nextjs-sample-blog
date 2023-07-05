import { useRef, useContext } from "react"
import { gsap } from "gsap"
import useIsomorphicLayoutEffect from "../hooks/useIsomorphicLayoutEffect"
import { TransitionContext } from "../context/transitionContext"
import { time } from "console"

const FadeInOut = ({ children }) => {
  const { timeline } = useContext(TransitionContext)
  const el = useRef()

  // useIsomorphicLayoutEffect to avoid console warnings
  useIsomorphicLayoutEffect(() => {
    // intro animation will play immediately
    gsap.fromTo(el.current, {
      opacity: 0,
    }, {
      opacity: 1,
      duration: 0.5,
    }).then(() => {
      timeline.pause()
      // add outro animation to top-level outro animation timeline
      timeline.add(
        gsap.to(el.current, {
          opacity: 0,
          duration: 0.5,
        }),
        0
      )
    })
  }, [children])

  // set initial opacity to 0 to avoid FOUC for SSR
  return (
    <div ref={el} className="opacity-0">
      { children }
    </div>
  )
}

export default FadeInOut