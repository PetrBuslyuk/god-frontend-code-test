import { ThemeBreakpointName } from "vcc-ui/dist/types/shared";
import { ICarouselResponsiveOptions } from "../interfaces/CarouselResponsiveOptions.interface";

export type TCarouselResponsiveOptions = {
    [key in ThemeBreakpointName]?: ICarouselResponsiveOptions;
}
