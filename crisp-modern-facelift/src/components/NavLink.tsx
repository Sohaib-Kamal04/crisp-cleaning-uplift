"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

// 1. Define the props we expect.
// We keep 'to' here so you don't have to refactor your whole app to 'href'.
interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  activeClassName?: string;
  inset?: boolean; // Sometimes used in Shadcn components, adding just in case
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, activeClassName, to, children, ...props }, ref) => {
    const pathname = usePathname();

    // 2. Check if this link is active
    // We check if the current path exactly matches the 'to' prop
    const isActive = pathname === to;

    return (
      <Link
        ref={ref}
        href={to} // Map the old 'to' prop to Next.js 'href'
        className={cn(
          className,
          isActive && activeClassName // Apply the active class if matches
        )}
        {...props}>
        {children}
      </Link>
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink };
