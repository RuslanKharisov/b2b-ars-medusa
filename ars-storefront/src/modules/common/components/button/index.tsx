import { clx, Button as MedusaButton } from "@medusajs/ui"
type ButtonProps = React.ComponentProps<typeof MedusaButton>

const Button = ({
  children,
  className: classNameProp,
  ...props
}: ButtonProps): React.ReactNode => {
  const variant = props.variant ?? "primary"

  const className = clx(classNameProp, {
    "!shadow-borders-base !border-none":
      variant === "secondary" || props.disabled,
    "!shadow-none bg-metallic-bronze-950 text-white":
      variant === "primary" && !props.disabled,
    "!shadow-none bg-transparent text-metallic-bronze-900":
      variant === "transparent",
  })
  return (
    <MedusaButton
      className={`!rounded-full text-sm font-normal ${className}`}
      variant={variant}
      {...props}
    >
      {children}
    </MedusaButton>
  )
}

export default Button
