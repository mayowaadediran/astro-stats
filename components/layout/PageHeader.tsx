import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  actions?: ReactNode;
}

export function PageHeader({ title, description, icon, actions }: PageHeaderProps) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <div className="mb-2 flex items-center gap-3">
          {icon}
          <h1 className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-3xl font-extrabold text-transparent">
            {title}
          </h1>
        </div>
        {description && <p className="text-gray-600">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
}
