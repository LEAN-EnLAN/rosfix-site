import type { HTMLAttributes } from "react";

import { cn } from "../../utils/cn";

type SectionShellProps = HTMLAttributes<HTMLElement> & {
  as?: "section" | "div" | "aside";
};

export function SectionShell({ as = "section", className, ...props }: SectionShellProps) {
  const Component = as;

  return <Component className={cn("section shell", className)} {...props} />;
}
