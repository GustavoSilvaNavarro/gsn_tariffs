import type { JSX } from 'react';

type TabPanelProps = {
  children: JSX.Element;
  index: number;
  value: number;
};

export const TabPanel = ({ children, index, value }: TabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className="px-4 py-2">
      {children}
    </div>
  );
};
