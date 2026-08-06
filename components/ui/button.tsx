import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Two button roles only: solid for the single primary action on a page, and
 * outline for everything else. Labels say what happens — "Send an email",
 * not "Submit".
 */
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-mono text-micro uppercase transition-colors duration-300 ease-swift disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        solid: 'bg-ink text-porcelain hover:bg-accent',
        outline: 'border border-ink/25 text-ink hover:border-accent hover:text-accent',
        ghost: 'text-graphite hover:text-ink',
      },
      size: {
        default: 'h-12 px-6',
        lg: 'h-16 px-9 text-caption tracking-widest',
        sm: 'h-9 px-4',
      },
    },
    defaultVariants: { variant: 'solid', size: 'default' },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
  ),
)
Button.displayName = 'Button'

export { Button, buttonVariants }
