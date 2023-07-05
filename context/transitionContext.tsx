import { useState, createContext, Dispatch, SetStateAction } from "react"
import gsap from "gsap"

type ContextInitType = {
  timeline: gsap.core.Timeline,
  setTimeline: Dispatch<SetStateAction<gsap.core.Timeline>>,
}

const contextInitVal = {
  timeline: null,
  setTimeline: () => {},
}
const TransitionContext = createContext<ContextInitType>(contextInitVal);

const TransitionProvider = ({ children }) => {
  const [timeline, setTimeline] = useState(() =>
    gsap.timeline()
  )

  return (
    <TransitionContext.Provider
      value={{
        timeline,
        setTimeline,
      }}
    >
      {children}
    </TransitionContext.Provider>
  )
}

export { TransitionContext, TransitionProvider }