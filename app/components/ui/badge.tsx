import { ReactNode } from "react";

type BadgeVariant = "primary" | "secondary" | "outline" | "gold";

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  icon?: ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: "bg-primary/15 text-primary border border-primary backdrop-blur-sm",
  secondary:
    "bg-secondary text-secondary border border-secondary backdrop-blur-sm",
  outline:
    "bg-transparent text-foreground border border-foreground/30 backdrop-blur-sm",
  gold: "bg-gradient-to-r from-secondary to-orange-400 text-black font-semibold shadow-lg shadow-secondary/20",
};

export default function Badge({
  label,
  variant = "primary",
  icon,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide transition-all duration-200 hover:scale-105 ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {label}
    </span>
  );
}
