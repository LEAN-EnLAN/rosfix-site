import type { AnchorHTMLAttributes, ReactNode } from "react";

import { WA_NUMBER } from "../app-data";

type WhatsAppLinkProps = {
  className?: string;
  children: ReactNode;
  message?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children" | "className">;

export function WhatsAppLink({ className, children, message, ...anchorProps }: WhatsAppLinkProps) {
  const href = message
    ? `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${WA_NUMBER}`;

  return (
    <a href={href} target="_blank" rel="noreferrer" className={className} {...anchorProps}>
      {children}
    </a>
  );
}
