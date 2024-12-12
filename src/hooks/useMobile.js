import { useMediaQuery } from 'usehooks-ts';

const useMobile = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return { isMobile };
};

export default useMobile;
