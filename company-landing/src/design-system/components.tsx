import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility for Tailwind class merging
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Premium Container
 */
export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-7xl px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

/**
 * Section Wrapper with ID and standard padding
 */
export function Section({
  id,
  children,
  className,
  dark = true,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-24 overflow-hidden",
        dark ? "bg-background text-foreground" : "bg-white text-black",
        className
      )}
    >
      {children}
    </section>
  );
}

/**
 * 3F3N Signature Button
 */
export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "glass" | "outline";
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const variants = {
    primary: "bg-brand-blue text-white hover:bg-brand-blue/90 shadow-[0_0_20px_rgba(0,102,255,0.4)]",
    secondary: "bg-white text-black hover:bg-white/90",
    glass: "glass text-white hover:bg-white/10",
    outline: "border border-white/20 text-white hover:bg-white/5",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg font-heading tracking-wide",
    xl: "px-10 py-5 text-xl font-heading tracking-wider",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none rounded-full",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

/**
 * Heading with 3F3N styling
 */
export function Heading({
  children,
  className,
  level = 2,
  glow = false,
}: {
  children: React.ReactNode;
  className?: string;
  level?: 1 | 2 | 3 | 4;
  glow?: boolean;
}) {
  const Tags = {
    1: "h1",
    2: "h2",
    3: "h3",
    4: "h4",
  } as const;
  
  const Tag = Tags[level];

  const sizes = {
    1: "text-5xl md:text-7xl lg:text-8xl font-heading",
    2: "text-4xl md:text-5xl lg:text-6xl font-heading",
    3: "text-2xl md:text-3xl font-heading",
    4: "text-xl md:text-2xl font-heading",
  };

  return (
    <Tag className={cn(sizes[level], glow && "text-glow", className)}>
      {children}
    </Tag>
  );
}
