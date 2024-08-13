import { useMediaQuery } from "react-responsive";

export const useResponsive = () => {
  const isMobile = useMediaQuery({
    maxWidth: 768,
  });
  const isTablet = useMediaQuery({
    minWidth: 768,
    maxWidth: 1024,
  });
  const isLaptop = useMediaQuery({
    minWidth: 1024,
    maxWidth: 1440,
  });
  const isDesktop = useMediaQuery({
    minWidth: 1440,
  });

  return {
    isMobile,
    isTablet,
    isLaptop,
    isDesktop,
  };
};
