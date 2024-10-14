import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export interface BreadcrumbItem {
  label: string; 
  link: string;
}
const Breadcrumbs: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <div className="text-sm breadcrumbs mb-5">
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <Link to={item.link}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
