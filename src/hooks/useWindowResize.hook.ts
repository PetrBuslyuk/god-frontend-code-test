import {useEffect, useState} from "react";
import {ThemeBreakpointName} from "vcc-ui/dist/types/shared";
import {useDebounce} from "./useDebounce.hook";
import {ThemeService} from "../services/theme.service";

/**
 * Hook to watch if window resized
 */
export const useWindowResize = () => {
  const [windowSize, setWindowSize] = useState<{
    width: number,
    height: number,
    themeBreakpoint: ThemeBreakpointName,
  }>({
    width: 0,
    height: 0,
    themeBreakpoint: 'untilXL'
  });

  // Handler to call on window resize
  const handleResize = () => {
    // Window width/height to state
    const themeBreakpoint = ThemeService.extractThemeBreakpoint(window.innerWidth);

    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
      themeBreakpoint
    });
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Debouncing value of window resize with 500 ms interval
  return useDebounce(windowSize, 500);
}
