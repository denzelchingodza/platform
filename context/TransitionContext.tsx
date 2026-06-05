"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface TransitionContextType {
  trigger: (cb: () => void) => void;
}

const TransitionContext = createContext<TransitionContextType>({
  trigger: (cb) => cb(),
});

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [animating, setAnimating] = useState(false);

  const trigger = useCallback((cb: () => void) => {
    setAnimating(true);
    setTimeout(() => {
      cb();
      setTimeout(() => setAnimating(false), 500);
    }, 400);
  }, []);

  return (
    <TransitionContext.Provider value={{ trigger }}>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 9998,
          background: "#07070f",
          opacity: animating ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />
      {children}
    </TransitionContext.Provider>
  );
}

export const usePageTransition = () => useContext(TransitionContext);