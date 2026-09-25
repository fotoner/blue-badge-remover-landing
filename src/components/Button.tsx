import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

type ButtonBaseProps = {
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof ButtonBaseProps> & {
    href?: never;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof ButtonBaseProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-accent-blue text-white font-semibold shadow-[0_4px_0_0_#1a6fb5] hover:brightness-110 active:translate-y-1 active:shadow-none",
  secondary:
    "border border-border text-text-primary hover:bg-bg-muted",
  ghost:
    "text-text-secondary hover:text-text-primary bg-transparent",
};

const sizeStyles: Record<Size, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-10 py-4 text-lg",
};

export function Button({ variant = "primary", size = "md", children, ...props }: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-full transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-blue";

  const className = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${(props as { className?: string }).className ?? ""}`.trim();

  if ("href" in props && props.href) {
    // className은 위에서 기본 스타일과 합쳤으므로 rest에서 빼야 덮어쓰지 않는다
    const { href, className: _className, ...rest } = props as ButtonAsLink;
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...rest}
      >
        {children}
      </a>
    );
  }

  const { className: _, ...rest } = props as ButtonAsButton;
  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
}
