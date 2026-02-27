import * as React from "react"
import { cn } from "../../lib/utils"

const Card = React.forwardRef(({ className, children, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "group relative rounded-lg border shadow-sm transition-all duration-300 hover:scale-[1.02] hover:-translate-y-2 hover:shadow-2xl",
            className
        )}
        {...props}
    >
        <div className="absolute -inset-[3px] rounded-xl bg-gradient-to-r from-[#0061ff] to-[#60efff] opacity-0 blur-lg transition-all duration-500 group-hover:opacity-70 -z-10" />
        <div className="relative h-full w-full rounded-lg bg-card text-card-foreground overflow-hidden">
            {children}
        </div>
    </div>
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 p-6", className)}
        {...props}
    />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
        {...props}
    />
))
CardTitle.displayName = "CardTitle"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

export { Card, CardHeader, CardTitle, CardContent }
