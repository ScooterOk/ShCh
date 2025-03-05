import Link from 'next/link';

import styles from './IconButton.module.scss';
import clsx from 'clsx';

const Component = ({ href, children, ...props }) => {
  if (href) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  return <button {...props}>{children}</button>;
};

const IconButton = ({ className, ...props }) => {
  return <Component className={clsx(styles.button, className)} {...props} />;
};

export default IconButton;
