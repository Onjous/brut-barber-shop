import type { ComponentProps, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "light" | "dark" | "outline-light" | "outline-dark";

const variants: Record<Variant, string> = {
  light: "bg-bone text-ink hover:bg-rust-deep hover:text-bone",
  dark: "bg-ink text-bone hover:bg-rust-deep",
  "outline-light":
    "border border-bone/40 text-bone hover:border-bone hover:bg-bone hover:text-ink",
  "outline-dark":
    "border border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-bone",
};

export function buttonClasses(variant: Variant = "dark", className?: string) {
  return cn(
    "group/btn relative inline-flex min-h-12 items-center justify-between gap-6 px-5 py-3",
    "text-[0.95rem] font-semibold tracking-tight transition-[background-color,color,border-color,transform] duration-300 ease-out-expo",
    "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    className,
  );
}

export function ButtonArrow() {
  return (
    <span
      aria-hidden
      className="relative inline-flex size-4 overflow-hidden"
    >
      <ArrowUpRight
        className="absolute inset-0 size-4 transition-transform duration-500 ease-out-expo group-hover/btn:translate-x-full group-hover/btn:-translate-y-full"
        strokeWidth={2}
      />
      <ArrowUpRight
        className="absolute inset-0 size-4 -translate-x-full translate-y-full transition-transform duration-500 ease-out-expo group-hover/btn:translate-x-0 group-hover/btn:translate-y-0"
        strokeWidth={2}
      />
    </span>
  );
}

type ButtonLinkProps = ComponentProps<"a"> & {
  variant?: Variant;
  children: ReactNode;
  arrow?: boolean;
};

export function ButtonLink({
  variant = "dark",
  arrow = true,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a className={buttonClasses(variant, className)} {...props}>
      <span>{children}</span>
      {arrow && <ButtonArrow />}
    </a>
  );
}
