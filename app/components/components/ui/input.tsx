import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

const GlassInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          // BASE
          "flex h-10 w-full rounded-md px-3 py-2 text-sm transition",

          // GLASS LOOK
          "bg-black/30 backdrop-blur-xl",
          "text-white placeholder:text-white/50",
          "border border-white/20",

          // FOCUS
          "focus:outline-none",
          "focus:ring-2 focus:ring-blue-400",
          "focus:border-blue-400",
          "focus:ring-offset-0",

          // FILE INPUT (optional)
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white",

          // DISABLED
          "disabled:cursor-not-allowed disabled:opacity-50",

          className
        )}
        {...props}
      />
    )
  }
)

GlassInput.displayName = "GlassInput"


export { Input, GlassInput }
