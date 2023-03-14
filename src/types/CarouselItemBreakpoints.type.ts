import { ThemeBreakpointName } from "vcc-ui/dist/types/shared";
import { CarouselNavigationEnum } from "../enums/CarouselNavigation.enum";

export interface ICarouselResponsiveOptions {
    spacing: number;
    navigation: CarouselNavigationEnum;
}

export type TCarouselResponsiveOptions = {
    [key in ThemeBreakpointName]?: ICarouselResponsiveOptions;
}
