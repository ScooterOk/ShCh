import Link from 'next/link';
import React, { useContext } from 'react';

import { mainContext } from '@/providers/MainProvider';

const TransitionLink = ({ href, children, theme = 'light', ...props }) => {
  const { setIsTransition } = useContext(mainContext);

  const handleClick = (e) => {
    e.preventDefault();
    setIsTransition({ href, theme });
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};

export default TransitionLink;
