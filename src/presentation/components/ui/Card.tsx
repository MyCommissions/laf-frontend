import React from "react";

type CardProps = {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  href?: string;
  className?: string;
};

const Card: React.FC<CardProps> = ({ title, description, icon, href, className = "" }) => {
  const content = (
    <div
      className={`flex flex-col items-start gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}
    >
      {icon && (
        <div className="text-indigo-600">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {description && <p className="text-sm text-gray-600">{description}</p>}
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block hover:no-underline">
        {content}
      </a>
    );
  }

  return content;
};

export default Card;
