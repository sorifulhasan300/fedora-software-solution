"use client"

import * as React from "react"
import { ReactLenis } from "lenis/react"

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root>
      {children}
    </ReactLenis>
  )
}
