import { Link } from "react-router-dom";

export default function Button({ to, variant = "primary", children, className = "", ...props }) {
  const base = variant === "ghost" ? "btn-ghost" : "btn-primary";
  const cls = `${base} ${className}`;
  if (to) return <Link to={to} className={cls} {...props}>{children}</Link>;
  return <button className={cls} {...props}>{children}</button>;
}