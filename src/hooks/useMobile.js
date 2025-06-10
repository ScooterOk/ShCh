import { useMediaQuery } from 'usehooks-ts';

const useMobile = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTouch = useMediaQuery('(hover: none) and (pointer: coarse)');
  return { isMobile, isTouch };
};

export default useMobile;
