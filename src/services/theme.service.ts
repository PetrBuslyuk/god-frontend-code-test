import { ThemeBreakpointName } from "vcc-ui/dist/types/shared";

/**
 * Theme helper service
 */
export class ThemeService {

  /**
   * Extract theme breakpoint name from window width
   *
   * @param width - window width
   * @returns {string} Theme breakpoint name
   */
  public static extractThemeBreakpoint(width: number): ThemeBreakpointName | never {
    switch (true) {
      case width < 480:
        return 'untilM';
      case width < 1024:
        return 'untilL';
      case width < 1600:
        return 'untilXL';
      case width >= 1600:
        return 'onlyXL';
    }

    throw new Error('No such dimension');
  }
}
