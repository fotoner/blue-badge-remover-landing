import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary" | "ghost";

type ButtonBaseProps = {
  variant?: Variant;
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
    "border border-border text-text-primary bg-white/[0.04] shadow-[0_4px_0_0_rgba(255,255,255,0.06)] hover:border-text-secondary active:translate-y-1 active:shadow-none",
  ghost:
    "text-text-secondary hover:text-text-primary bg-transparent",
};

export function Button({ variant = "primary", children, ...props }: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-blue";

  const className = `${baseStyles} ${variantStyles[variant]} ${(props as { className?: string }).className ?? ""}`.trim();

  if ("href" in props && props.href) {
    const { href, ...rest } = props as ButtonAsLink;
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
