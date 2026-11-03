import clsx from "clsx";

export default function SkeletonBlock({ className }) {
  return (
    <div className={clsx("animate-pulse rounded-xl bg-slate-200", className)} />
  );
}