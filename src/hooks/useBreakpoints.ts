import { useAppSelector } from '../store';

export const useBreakpoints = () => {
  const {isMobile, isTablet, isLaptop} = useAppSelector(state => state.screen);
  return {isMobile, isTablet, isLaptop};
};
