import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

/**
 * Utility for merging tailwind classes safely
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Section Wrapper
 */
interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export function Section({ children, className, ...props }: SectionProps) {
  return (
    <section className={cn("relative py-20 md:py-32 overflow-hidden", className)} {...props}>
      {children}
    </section>
  );
}

/**
 * Container
 */
export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("max-w-5xl mx-auto px-6 md:px-10", className)}>
      {children}
    </div>
  );
}

/**
 * Heading
 */
interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4;
  glow?: boolean;
}

export function Heading({ level = 2, glow, children, className, ...props }: HeadingProps) {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  const styles = {
    1: "text-5xl md:text-8xl font-heading font-extrabold tracking-tighter leading-[0.9]",
    2: "text-4xl md:text-6xl font-heading font-bold tracking-tight leading-tight",
    3: "text-2xl md:text-3xl font-heading font-bold",
    4: "text-xl font-heading font-semibold",
  };

  return (
    <Tag 
      className={cn(styles[level], glow && "text-glow-blue", className)} 
      {...props}
    >
      {children}
    </Tag>
  );
}

/**
 * AI-First Premium Button
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "conic";
  size?: "md" | "lg" | "xl";
}

export function Button({ variant = "conic", size = "lg", className, children, ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center font-heading font-bold transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none rounded-full px-10";
  
  const variants = {
    primary: "bg-brand-blue text-white hover:bg-brand-blue/90 shadow-[0_0_30px_rgba(16,101,227,0.3)]",
    secondary: "bg-brand-cyan text-black hover:bg-brand-cyan/90 shadow-[0_0_30px_rgba(68,204,255,0.3)]",
    outline: "bg-transparent border border-white/10 hover:border-white/30 text-white hover:bg-white/5",
    conic: "btn-conic text-white border-none",
  };

  const sizes = {
    md: "py-3 text-sm",
    lg: "py-4 text-base",
    xl: "py-5 text-lg",
  };

  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}

/**
 * OS Terminal Component
 */
export function Terminal({ lines }: { lines: string[] }) {
  return (
    <div className="max-w-[440px] w-full mx-auto glass-dark p-6 rounded-2xl border-white/5 font-mono text-xs leading-relaxed text-left shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent" />
      <div className="flex gap-1.5 mb-4">
        <div className="w-2 h-2 rounded-full bg-red-500/20" />
        <div className="w-2 h-2 rounded-full bg-amber-500/20" />
        <div className="w-2 h-2 rounded-full bg-brand-green/20" />
      </div>
      <div className="space-y-2">
        {lines.map((line, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.4 }}
            className="flex items-start gap-2"
          >
            <span className="text-brand-blue font-bold opacity-50">$</span>
            <span className={cn(
               "text-white/70",
               line.includes("✓") && "text-brand-green",
               line.includes("online") && "font-bold text-brand-green/80"
            )}>
              {line}
            </span>
          </motion.div>
        ))}
        <motion.div 
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="w-2 h-4 bg-brand-blue/40 inline-block ml-1 align-middle"
        />
      </div>
    </div>
  );
}
