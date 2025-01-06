import Link from 'next/link';
import React, { useContext } from 'react';

import { mainContext } from '@/providers/MainProvider';

const TransitionLink = ({ href, children }) => {
  const { setIsTransition } = useContext(mainContext);

  const handleClick = (e) => {
    e.preventDefault();
    setIsTransition(true);
  };

  return (
    <Link href={href} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default TransitionLink;
