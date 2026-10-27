import { cn } from "@/lib/utils";

type Props = {
  index: string;
  children: string;
  className?: string;
};

/** Mała etykieta sekcji w stylu „02 — Usługi”. */
export function SectionLabel({ index, children, className }: Props) {
  return (
    <p className={cn("eyebrow flex items-center gap-3", className)}>
      <span>{index}</span>
      <span aria-hidden className="h-px w-8 bg-current opacity-50" />
      <span>{children}</span>
    </p>
  );
}

/** Dyskretny znacznik treści demonstracyjnych. */
export function DemoTag({ className, label = "Demo" }: { className?: string; label?: string }) {
  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center border border-current px-1.5 py-0.5 text-[0.625rem] leading-none tracking-[0.12em]",
        className,
      )}
    >
      {label}
    </span>
  );
}
