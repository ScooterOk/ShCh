import Link from 'next/link';
import React, { forwardRef, useContext } from 'react';

import { mainContext } from '@/providers/MainProvider';

const TransitionLink = forwardRef(
  ({ href, children, theme = 'light', disabled = false, ...props }, ref) => {
    const { setIsTransition } = useContext(mainContext);

    const handleClick = (e) => {
      if (disabled) return;
      e.preventDefault();
      setIsTransition({ href, theme });
    };

    return (
      <Link href={href} onClick={handleClick} ref={ref} {...props}>
        {children}
      </Link>
    );
  }
);

TransitionLink.displayName = 'TransitionLink';

export default TransitionLink;
