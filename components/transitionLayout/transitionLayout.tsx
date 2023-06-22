import { TransitionContext } from "../../context/transitionContext"
import { useState, useContext } from "react"
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect";

const TransitionLayout = ({ children }: { children: React.ReactNode }) => {
  const [displayChildren, setDisplayChildren] = useState(children);
  const { timeline } = useContext(TransitionContext);

  useIsomorphicLayoutEffect(() => {
    if (children !== displayChildren) {
      if (timeline.duration() === 0) {
        // there are no outro animations, so immediately transition
        setDisplayChildren(children);
      } else {
        timeline.play().then(() => {
          // outro complete so reset to an empty paused timeline
          timeline.pause().clear();
          setDisplayChildren(children);
        })
      }
    }
  }, [children])

  return (
    <div className="bg-tw-dark">
      {displayChildren}
    </div>
  )
}

export default TransitionLayout;