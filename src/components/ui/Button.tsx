import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-(--brand) text-white hover:bg-(--brand-hover) focus-visible:outline-(--brand)",
  secondary:
    "border border-(--border) bg-(--surface) text-(--text-primary) hover:bg-(--surface-subtle) focus-visible:outline-(--brand)",
  ghost:
    "text-(--text-secondary) hover:bg-(--surface-subtle) hover:text-(--text-primary) focus-visible:outline-(--brand)",
};

function Button({
  variant = "primary",
  children,
  className = "",
  type = "button",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={[
        "inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-semibold",
        "transition-colors duration-150",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variantClasses[variant],
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;