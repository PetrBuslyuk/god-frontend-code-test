import {CarouselNavigationEnum} from "../enums/CarouselNavigation.enum";

export const carouselDefaultOptionsMock = {
  untilM: {
    spacing: 1,
    navigation: CarouselNavigationEnum.DOTS,
  },
  untilL: {
    spacing: 2,
    navigation: CarouselNavigationEnum.DOTS,
  },
  untilXL: {
    spacing: 4,
    navigation: CarouselNavigationEnum.ARROWS,
  },
  onlyXL: {
    spacing: 4,
    navigation: CarouselNavigationEnum.ARROWS,
  }
}
