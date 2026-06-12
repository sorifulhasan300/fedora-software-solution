"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch by rendering a skeleton/uninteractive icon during SSR
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/10 bg-transparent text-muted-foreground">
        <Sun className="h-4 w-4" />
      </span>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative flex h-8 w-8 items-center justify-center rounded-full border border-primary/10 bg-transparent text-muted-foreground hover:bg-accent hover:text-foreground hover:border-primary/20 transition-all duration-200 focus:outline-none cursor-pointer">
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur-md border-border rounded-xl mt-2 w-32">
        <DropdownMenuItem onClick={() => setTheme("light")} className="flex items-center gap-2 focus:bg-primary/10 focus:text-primary rounded-lg cursor-pointer text-sm font-medium">
          <Sun className="h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="flex items-center gap-2 focus:bg-primary/10 focus:text-primary rounded-lg cursor-pointer text-sm font-medium">
          <Moon className="h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="flex items-center gap-2 focus:bg-primary/10 focus:text-primary rounded-lg cursor-pointer text-sm font-medium">
          <Monitor className="h-4 w-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
