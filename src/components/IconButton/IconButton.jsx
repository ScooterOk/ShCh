import clsx from 'clsx';
import { forwardRef } from 'react';
import TransitionLink from '../TransitionLink/TransitionLink';

import styles from './IconButton.module.scss';

const Component = forwardRef(({ href, children, ...props }, ref) => {
  if (href) {
    return (
      <TransitionLink href={href} ref={ref} {...props}>
        {children}
      </TransitionLink>
    );
  }

  return (
    <button ref={ref} {...props}>
      {children}
    </button>
  );
});

const IconButton = forwardRef(({ className, ...props }, ref) => {
  return (
    <Component
      className={clsx(styles.button, className)}
      ref={ref}
      {...props}
    />
  );
});

Component.displayName = 'Component';
IconButton.displayName = 'IconButton';

export default IconButton;
