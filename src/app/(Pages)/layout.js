import Navigation from '@/components/(Home)/Navigation/Navigation';
import React from 'react';

const layout = ({ children }) => {
  return (
    <div>
      <Navigation />
      {children}
    </div>
  );
};

export default layout;
