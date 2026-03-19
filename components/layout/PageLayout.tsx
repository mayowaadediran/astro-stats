import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export function PageLayout({ children, className = "" }: PageLayoutProps) {
  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 ${className}`}
    >
      {children}
    </div>
  );
}

export function PageContent({ children, className = "" }: PageLayoutProps) {
  return (
    <main className={`mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 ${className}`}>{children}</main>
  );
}
