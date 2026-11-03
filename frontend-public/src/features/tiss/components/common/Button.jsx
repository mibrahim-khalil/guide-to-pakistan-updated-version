import React from "react";
import { Link } from "react-router-dom";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Unified Button component (pill layout everywhere).
 *
 * Variants:
 *  - soft
 *  - outline
 *  - dark
 *  - primary (dashboard green via CSS vars)
 *  - glass
 *
 * Sizes:
 *  - sm
 *  - md
 *  - lg
 */
export default function Button({
  to,
  href,
  target,
  rel,

  type = "button",
  disabled = false,

  variant = "soft",
  size = "md",

  className = "",
  leftIcon,
  rightIcon,
  children,

  ...rest
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2";

  const sizes = {
    sm: "h-9 px-4 text-[13px]",
    md: "h-11 px-5 text-sm",
    lg: "h-[46px] px-7 text-[15px]",
  };

  const variants = {
    soft:
      "bg-slate-100 text-slate-800 border border-slate-200 hover:bg-slate-200",

    outline:
      "bg-white text-slate-800 border border-slate-200 hover:bg-slate-50",

    dark:
      "bg-slate-900 text-white border border-slate-900 hover:bg-slate-800",

    primary:
      "bg-[color:var(--gti-brand-green-dark)] text-white " +
      "border border-[color:var(--gti-brand-green-dark)] " +
      "hover:bg-[color:var(--gti-brand-green-dark-hover)] hover:border-[color:var(--gti-brand-green-dark-hover)]",

    glass:
      "bg-white/10 text-white border border-white/20 backdrop-blur hover:bg-white/15",
  };

  const disabledCls = disabled ? "opacity-50 pointer-events-none" : "";

  const cls = cn(
    base,
    sizes[size] || sizes.md,
    variants[variant] || variants.soft,
    disabledCls,
    className
  );

  const content = (
    <>
      {leftIcon ? (
        <span className="shrink-0" aria-hidden="true">
          {leftIcon}
        </span>
      ) : null}
      <span>{children}</span>
      {rightIcon ? (
        <span className="shrink-0" aria-hidden="true">
          {rightIcon}
        </span>
      ) : null}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={cls} aria-disabled={disabled} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={cls}
        aria-disabled={disabled}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button type={type} disabled={disabled} className={cls} {...rest}>
      {content}
    </button>
  );
}